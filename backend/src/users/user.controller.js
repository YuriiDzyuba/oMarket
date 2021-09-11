const userService = require('./user.service');
const CustomError = require('../../exeptions/customError');
const userNormalizer = require('../../utils/userNormalizer');
const code = require('../../consts/statusCodes');
const message = require('../../consts/responseMessages');
const authService = require('../auth/auth.service');

const userController = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();

            if (!Object.keys(users).length) throw new CustomError(code.NOT_FOUND, message.NO_USERS);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getOneUser: (fieldsToRemove) => (req, res, next) => {
        try {
            const { user } = req;

            res.json(userNormalizer(user, fieldsToRemove));

        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userData = req.body;

            const updatedUser = await userService.updateUser(id, userData);

            if (!updatedUser) throw new CustomError(code.NOT_FOUND, message.NO_USER);

            res.json(updatedUser);

        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            const deletedUser = await userService.deleteUser(id);

            if (!deletedUser) throw new CustomError(code.NOT_FOUND, message.NO_USER);

            await authService.deleteAllTokens({ USER: deletedUser._id });

            res.json({ message: `-- ${deletedUser.email} -- ${message.USER_DELETED}` });

        } catch (e) {
            next(e);
        }
    }
};

module.exports = userController;
