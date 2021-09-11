const CustomError = require('../../exeptions/customError');

const accountService = require('./account.service');
const authService = require('../auth/auth.service');
const userService = require('../users/user.service');

const emailPageType = require('../../consts/emailPageTypes');
const code = require('../../consts/statusCodes');
const message = require('../../consts/responseMessages');
const authConstant = require('../../consts/authConstants');
const dbEnum = require('../../consts/dbEnum');

const accountController = {

    sendLinkToEmail: (pageType, resMessage) => async (req, res, next) => {
        try {
            const { currentUser, actionLink } = req;

            await accountService.sendMail(currentUser.email, pageType, { actionLink });

            res.json({ message: resMessage });

        } catch (e) {
            next(e);
        }
    },

    setUserPassword: async (req, res, next) => {
        try {
            const { currentUser, body: { password } } = req;
            const token = req.get(authConstant.AUTHORIZATION);

            const hashedPassword = await authService.hashPassword(password);

            await userService.updateUser(currentUser._id, { [dbEnum.PASSWORD]: hashedPassword });
            await accountService.deleteField(dbEnum.FORGOT_PASSWORD, { [dbEnum.FORGOT_PASSWORD_TOKEN]: token });
            await authService.deleteAllTokens({ USER: currentUser._id });

            res.json({ message: message.PASSWORD_CHANGED });

        } catch (e) {
            next(e);
        }
    },

    activateAccount: async (req, res, next) => {
        try {
            const { currentUser } = req;
            const token = req.get(authConstant.AUTHORIZATION);

            await userService.updateUser(currentUser._id, { [dbEnum.IS_ACTIVATED]: true });
            await accountService.deleteField(dbEnum.ACCESS_TOKEN, { [dbEnum.ACTIVATE_ACCOUNT_TOKEN]: token });

            res.json({ message: message.ACCOUNT_ACTIVATED });

        } catch (e) {
            next(e);
        }
    },

    changeBanStatus: (toBan = true) => async (req, res, next) => {
        try {
            const { userId } = req.body;

            const modifiedUser = await accountService.modifyUserAccount(userId, toBan);

            if (!modifiedUser) throw new CustomError(code.NOT_FOUND, message.NO_USER);

            await accountService.sendMail(modifiedUser.email, toBan
                ? emailPageType.BAN_PAGE
                : emailPageType.UN_BAN_PAGE);

            await authService.deleteAllTokens({ USER: userId });

            res.json({ message: `user ${modifiedUser.email} has been ${toBan ? 'banned' : 'unbanned'}` });

        } catch (e) {
            next(e);
        }
    },
};

module.exports = accountController;
