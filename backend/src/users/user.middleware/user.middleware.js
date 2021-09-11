const CustomError = require('../../../exeptions/customError');
const userService = require('../user.service');

const code = require('../../../consts/statusCodes');
const message = require('../../../consts/responseMessages');

const { updateUserValidator } = require('../user.validators');
const { USER_ID_REGEXP } = require('../../../consts/regExp');

const userMiddleware = {
    checkId: (req, res, next) => {
        try {
            const { id } = req.params;
            const regEx = USER_ID_REGEXP;
            const testResult = regEx.test(id);

            if (!testResult) throw new CustomError(code.BAD_REQUEST, message.INVALID_ID);

            next();

        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const chosenUser = await userService.getOneUserById(id);

            if (!chosenUser) throw new CustomError(code.BAD_REQUEST, message.NO_USER);

            req.user = chosenUser;

            next();

        } catch (e) {
            next(e);
        }
    },

    checkUpdateUserInputs: (req, res, next) => {
        try {
            const { error, value } = updateUserValidator.validate(req.body);

            if (error) throw new CustomError(error.details[0].message, 400);

            req.body = value;

            next();

        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (availableRoleArr = []) => (req, res, next) => {
        try {
            const { role } = req.currentUser;
            if (!availableRoleArr.length) return next();

            if (!availableRoleArr.includes(role)) throw new CustomError(code.FORBIDDEN, message.FORBIDDEN);

            next();

        } catch (e) {
            next(e);
        }
    },

    checkUserPermission: (req, res, next) => {
        try {
            const { id } = req.params;
            const { currentUser } = req;

            const currentUserId = currentUser._id.toString();

            if (currentUserId !== id) throw new CustomError(code.FORBIDDEN, message.FORBIDDEN);

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await userService.getOneUserByParam({ [dbField]: value });

            if (!user) throw new CustomError(code.NOT_FOUND, message.NO_USER);

            req.currentUser = user;

            next();
        } catch (e) {
            next(e);
        }
    }

};

module.exports = userMiddleware;
