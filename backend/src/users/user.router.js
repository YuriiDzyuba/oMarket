const Router = require('express');

const usersController = require('./user.controller');
const userMiddleware = require('./user.middleware');

const dbEnum = require('../../consts/dbEnum');

const userRouter = new Router();

userRouter.use('/:id', userMiddleware.checkId,);

userRouter.get('/',
    userMiddleware.isReqQueryEmpty,
    usersController.getAllUsers);

userRouter.get('/:id',
    userMiddleware.isReqQueryEmpty,
    userMiddleware.getUserById,
    usersController.getOneUser([dbEnum.CREATED_AT, dbEnum.UPDATED_AT]));

userRouter.patch('/:id',
    userMiddleware.checkUpdateUserInputs,
    userMiddleware.checkToken(),
    userMiddleware.isAccountActivated,
    userMiddleware.checkUserPermission,
    usersController.updateUser);

userRouter.delete('/:id',
    userMiddleware.checkToken(),
    userMiddleware.isAccountActivated,
    userMiddleware.isAccountUnBanned,
    userMiddleware.checkUserPermission,
    usersController.deleteUser);

module.exports = userRouter;
