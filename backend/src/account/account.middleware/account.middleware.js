const CustomError = require('../../../exeptions/customError');

const authService = require('../../auth/auth.service');

const code = require('../../../consts/statusCodes');
const message = require('../../../consts/responseMessages');
const accountService = require('../account.service');
const dbEnum = require('../../../consts/dbEnum');

const accountMiddleware = {
    isAccountUnActivated: (req, res, next) => {
        try {
            if (req.currentUser[dbEnum.IS_ACTIVATED]) {
                throw new CustomError(code.NOT_ACCEPTABLE, message.ACCOUNT_ACTIVATED);
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    isAccountActivated: (req, res, next) => {
        try {
            if (!req.currentUser[dbEnum.IS_ACTIVATED]) {
                throw new CustomError(code.NOT_ACCEPTABLE, message.ACCOUNT_UNACTIVATED);
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    isAccountUnBanned: (req, res, next) => {
        try {
            if (req.currentUser[dbEnum.IS_BANNED]) {
                throw new CustomError(code.NOT_ACCEPTABLE, message.ACCOUNT_BANNED);
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (tokenType) => async (req, res, next) => {
        try {
            const { actionToken } = req.body;

            if (!actionToken) throw new CustomError(code.NOT_FOUND, message.CANT_FIND_TOKEN);

            try {
                await authService.verifyToken(actionToken, tokenType);

            } catch (e) {
                throw new CustomError(code.UNAUTHORIZED, message.INVALID_TOKEN);
            }

            const savedToken = await accountService.findActionToken(tokenType, { [tokenType]: actionToken });

            if (!savedToken) throw new CustomError(code.UNAUTHORIZED, message.ACCOUNT_UNACTIVATED);

            next();

        } catch (e) {
            next(e);
        }
    },

    createActionToken: (tokenType) => async (req, res, next) => {
        try {
            const { currentUser } = req;

            const actionToken = await accountService.generateActionToken(tokenType);
            console.log(actionToken);
            const savedToken = await accountService.addNewActionToken(
                tokenType,
                {
                    [tokenType]: actionToken,
                    [dbEnum.USER]: currentUser._id
                }
);

            if (!savedToken) throw new CustomError(code.INTERNAL_SERVER_ERROR, message.CANT_CREATE_LINK);

            req.actionLink = actionToken;

            next();

        } catch (e) {
            next(e);
        }
    }
};

module.exports = accountMiddleware;
