const authService = require('../auth.service');

const CustomError = require('../../../exeptions/customError');
const { checkAuthInputs, createNewUserValidator, createNewAdminValidator } = require('../auth.validators');

const code = require('../../../consts/statusCodes');
const message = require('../../../consts/responseMessages');
const dbEnum = require('../../../consts/dbEnum');
const { AUTHORIZATION } = require('../../../consts/authConstants');

const authMiddleware = {
    isReqQueryEmpty: (req, res, next) => {
        try {
            if (Object.keys(req.query).length) throw new CustomError(code.NOT_ACCEPTABLE, message.REQ_QUERIES_NOT_EMPTY);

            next();

        } catch (e) {
            next(e);
        }
    },

    isReqBodyEmpty: (req, res, next) => {
        try {
            if (Object.keys(req.body).length) throw new CustomError(code.NOT_ACCEPTABLE, message.REQ_BODY_NOT_EMPTY);

            next();

        } catch (e) {
            next(e);
        }
    },

    checkLoginInputs: (req, res, next) => {
        try {
            const { error, value } = checkAuthInputs.validate(req.body);

            if (error) throw new CustomError(code.BAD_REQUEST, error.details[0].message);

            req.body = value;

            next();

        } catch (e) {
            next(e);
        }
    },

    checkRegistrationInputs: (req, res, next) => {
        try {
            const { error, value } = createNewUserValidator.validate(req.body);

            if (error) throw new CustomError(code.BAD_REQUEST, error.details[0].message);

            req.body = value;

            next();

        } catch (e) {
            next(e);
        }
    },

    isUserEmailExist: (addNewEmail = false) => async (req, res, next) => {
        try {
            const applicantData = req.body;

            const user = await authService.checkEmail(applicantData.email);

            if (user && addNewEmail) throw new CustomError(code.CONFLICT, message.EMAIL_EXISTS);

            if (!user && !addNewEmail) throw new CustomError(code.CONFLICT, message.USER_EXISTS);

            req.currentUser = user;

            next();

        } catch (e) {
            next(e);
        }
    },

    checkToken: (tokenType = dbEnum.ACCESS_TOKEN) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) throw new CustomError(code.UNAUTHORIZED, message.CANT_FIND_TOKEN);

            try {
                await authService.verifyToken(token, tokenType);

            } catch (e) {
                throw new CustomError(code.UNAUTHORIZED, message.INVALID_TOKEN);
            }

            const savedToken = await authService.findToken({ [tokenType]: token });

            if (!savedToken) throw new CustomError(code.UNAUTHORIZED, message.ACCOUNT_UNACTIVATED);

            req.currentUser = savedToken.user;

            next();

        } catch (e) {
            next(e);
        }
    },

    setNewAdminData: (req, res, next) => {
        try {

            const { error, value } = createNewAdminValidator.validate(req.body);

            if (error) throw new CustomError(code.BAD_REQUEST, error.details[0].message);

            req.newAdmin = value;

            next();

        } catch (e) {
            next(e);
        }
    },

};

module.exports = authMiddleware;
