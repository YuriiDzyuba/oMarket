const CustomError = require('../../exeptions/customError');
const userNormalizer = require('../../utils/userNormalizer');
const authService = require('./auth.service');
const accountService = require('../account/account.service');
const userService = require('../users/user.service');
const { code, message, customErrors, dbEnum, authConst, emailPage } = require('../../consts');

const authController = {
    createNewUser: async (req, res, next) => {
        try {
            const applicantData = req.body;

            const hashedPassword = await authService.hashPassword(applicantData.password);

            let newUser = await authService.addNewUser({
                ...applicantData,
                password: hashedPassword
            });

            if (req.files && req.files[dbEnum.AVATAR]) {
                const { _id } = newUser;
                const uploadFile = await authService.uploadImageToAWS(req.files[dbEnum.AVATAR], dbEnum.AVATAR, _id);

                newUser = await userService.updateUser(_id, { [dbEnum.AVATAR]: uploadFile.Location }, true);
            }

            const actionLink = await accountService.generateActionToken(dbEnum.ACTIVATE_ACCOUNT_TOKEN);
            const savedLink = await accountService.addNewLink(
                {
                    [dbEnum.ACTIVATE_ACCOUNT_TOKEN]: actionLink,
                    [dbEnum.USER]: newUser._id
                }
            );

            if (!savedLink) {
                throw new CustomError(customErrors.CANT_CREATE_USER_LINK.code,
                    customErrors.CANT_CREATE_USER_LINK.message,
                    customErrors.CANT_CREATE_USER_LINK.customCode);
            }

            await accountService.sendMail(
                newUser.email,
                emailPage.WELCOME_PAGE,
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

            if (!savedLink) {
                throw new CustomError(customErrors.CANT_CREATE_ADMIN_LINK.code,
                    customErrors.CANT_CREATE_ADMIN_LINK.message,
                    customErrors.CANT_CREATE_ADMIN_LINK.customCode);
            }

            await accountService.sendMail(
                newUser.email,
                emailPage.FORGET_PASSWORD_PAGE,
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
            console.log(currentUser, 'currentUser');
            const isPasswordCorrect = await authService.comparePasswords(password, currentUser.password);

            if (!isPasswordCorrect) {
                throw new CustomError(customErrors.WRONG_USER_PASSWORD.code,
                    customErrors.WRONG_USER_PASSWORD.message,
                    customErrors.WRONG_USER_PASSWORD.customCode);
            }

            const normalizedUser = userNormalizer(currentUser);

            const tokenPair = await authService.generateTokenPair(normalizedUser);

            await authService.addNewTokenPair(tokenPair, currentUser._id);

            res.json({ ...tokenPair });

        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const token = req.get(authConst.AUTHORIZATION);

            const deletedToken = await authService.deleteToken({ accessToken: token });

            if (!deletedToken) throw new CustomError(code.NOT_FOUND, message.NO_TOKEN);

            res.json({ message: message.TOKEN_DELETED });

        } catch (e) {
            next(e);
        }
    },

    refreshTokens: async (req, res, next) => {
        try {
            const refreshToken = req.get(authConst.AUTHORIZATION);
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
