const CustomError = require('../../exeptions/customError');
const userNormalizer = require('../../utils/userNormalizer');

const authService = require('./auth.service');
const accountService = require('../account/account.service');

const code = require('../../consts/statusCodes');
const message = require('../../consts/responseMessages');
const dbEnum = require('../../consts/dbEnum');
const { AUTHORIZATION } = require('../../consts/authConstants');
const { WELCOME_PAGE, FORGET_PASSWORD_PAGE } = require('../../consts/emailPageTypes');

const authController = {
    createNewUser: async (req, res, next) => {
        try {
            const applicantData = req.body;

            const hashedPassword = await authService.hashPassword(applicantData.password);

            const newUser = await authService.addNewUser({
                ...applicantData,
                password: hashedPassword
            });
            const actionLink = await accountService.generateActionToken(dbEnum.ACTIVATE_ACCOUNT_TOKEN);

            const savedLink = await accountService.addNewLink(
                {
                    [dbEnum.ACTIVATE_ACCOUNT_TOKEN]: actionLink,
                    [dbEnum.USER]: newUser._id
                }
            );

            if (!savedLink) throw new CustomError(code.INTERNAL_SERVER_ERROR, message.CANT_CREATE_LINK);

            await accountService.sendMail(
                newUser.email,
                WELCOME_PAGE,
                { activationLink: savedLink[dbEnum.ACTIVATE_ACCOUNT_TOKEN] }
            );

            const normalizedUser = userNormalizer(newUser);

            res.json({ user: normalizedUser });

        } catch (e) {
            next(e);
        }
    },

    createNewAdmin: async (req, res, next) => {
        try {
            const { newAdmin } = req;

            const user = await authService.checkEmail(newAdmin.email);

            if (user) throw new CustomError(code.CONFLICT, message.EMAIL_EXISTS);

            const hashedPassword = await authService.hashPassword(newAdmin.password);

            const newUser = await authService.addNewUser({
                ...newAdmin,
                password: hashedPassword
            });
            const actionLink = await accountService.generateActionToken(dbEnum.FORGOT_PASSWORD_TOKEN);

            const savedLink = await accountService.addNewActionToken(
                dbEnum.FORGOT_PASSWORD_TOKEN,
                {
                    [dbEnum.FORGOT_PASSWORD_TOKEN]: actionLink,
                    [dbEnum.USER]: newUser._id
                }
            );
            console.log(savedLink);
            if (!savedLink) throw new CustomError(code.INTERNAL_SERVER_ERROR, message.CANT_CREATE_LINK);

            await accountService.sendMail(
                newUser.email,
                FORGET_PASSWORD_PAGE,
                {
                    activationLink: savedLink[dbEnum.FORGOT_PASSWORD],
                    header: message.ADMIN_ACCOUNT_CREATED
                }
            );

            const normalizedUser = userNormalizer(newUser);

            res.json({ user: normalizedUser });

        } catch (e) {
            next(e);
        }
    },

    logIn: async (req, res, next) => {
        try {
            const { currentUser, body: { password } } = req;

            const isPasswordCorrect = await authService.comparePasswords(password, currentUser.password);

            if (!isPasswordCorrect) throw new CustomError(code.NOT_ACCEPTABLE, message.WRONG_PASSWORD);

            const tokenPair = await authService.generateTokenPair();

            await authService.addNewTokenPair(tokenPair, currentUser._id);

            res.json({
                tokenPair,
                user: userNormalizer(currentUser)
            });

        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            const deletedToken = await authService.deleteToken({ accessToken: token });

            if (!deletedToken) throw new CustomError(code.NOT_FOUND, message.NO_TOKEN);

            res.json({ message: message.TOKEN_DELETED });

        } catch (e) {
            next(e);
        }
    },

    refreshTokens: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);
            const { currentUser } = req;

            const tokenPair = authService.generateTokenPair();

            await authService.refreshTokenPair({ refreshToken }, tokenPair);

            res.json({
                tokenPair,
                user: userNormalizer(currentUser)
            });

        } catch (e) {
            next(e);
        }
    },

    logOutFromAllDevices: async (req, res, next) => {
        try {
            const { currentUser } = req;

            const deletedTokens = await authService.deleteAllTokens({ USER: currentUser._id });

            if (!deletedTokens) throw new CustomError(code.NOT_FOUND, message.NO_TOKEN);

            res.json({ message: message.TOKENS_DELETED });

        } catch (e) {
            next(e);
        }
    },
};

module.exports = authController;
