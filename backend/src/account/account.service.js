const jwt = require('jsonwebtoken');

const User = require('../users/user.model');
const ActivateAccount = require('./activateAccount.model');
const ForgotPassword = require('./forgotPassword.model');

const transporter = require('../../utils/emailTransporter');
const getHtml = require('./static/getHtml');
const CustomError = require('../../exeptions/customError');

const emailActions = require('./static/emailActions');
const config = require('../../config');
const dbEnum = require('../../consts/dbEnum');

const accountService = {

    addNewLink: async (param) => {
        const link = await ActivateAccount.create(param);
        return link;
    },

    addNewActionToken: async (tokenType, param) => {
        let link;

        if (tokenType === dbEnum.ACTIVATE_ACCOUNT_TOKEN) link = await ActivateAccount.create(param);

        if (tokenType === dbEnum.FORGOT_PASSWORD_TOKEN) link = await ForgotPassword.create(param);

        return link;
    },

    findActionToken: async (tokenType, param) => {
        let link;

        if (tokenType === dbEnum.ACTIVATE_ACCOUNT_TOKEN) link = await ActivateAccount.findOne(param);

        if (tokenType === dbEnum.FORGOT_PASSWORD_TOKEN) link = await ForgotPassword.findOne(param);

        return link;
    },

    sendMail: async (userMail, action, context = {}) => {

        context = {
            ...context,
            frontendURL: config.FRONT_URL
        };

        const emailInfo = await transporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject: emailActions[action].subject,
            html: getHtml(emailActions[action], context)
        });

        return emailInfo;
    },

    modifyUserAccount: async (_id, banStatus) => {
        const modifiedUser = await User.findOneAndUpdate(_id, { [dbEnum.IS_BANNED]: banStatus });
        return modifiedUser;
    },

    deleteField: async (model, field) => {
        let deletedField;

        if (model === dbEnum.ACTIVATE_ACCOUNT) deletedField = await ActivateAccount.findOneAndDelete(field);

        if (model === dbEnum.FORGOT_PASSWORD) deletedField = await ForgotPassword.findOneAndDelete(field);

        return deletedField;
    },

    generateActionToken: (actionType) => {
        let word = '';

        switch (actionType) {
            case dbEnum.FORGOT_PASSWORD_TOKEN:
                word = config.FORGOT_PASS_TOKEN_SECRET;
                break;
            case dbEnum.ACTIVATE_ACCOUNT_TOKEN:
                word = config.ACCOUNT_ACTIVATE_TOKEN_SECRET;
                break;
            default:
                throw new CustomError('Wrong actionType', 500);
        }

        return jwt.sign({ actionType }, word, { expiresIn: '7d' });
    },
};

module.exports = accountService;
