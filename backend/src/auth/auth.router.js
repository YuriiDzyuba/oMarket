const Router = require('express');

const userRoles = require('../../consts/userRoles');
const { REFRESH_TOKEN } = require('../../consts/dbEnum');
const authController = require('./auth.controller');
const authMiddleware = require('./auth.middleware');

const authRouter = new Router();

authRouter.use('/', authMiddleware.isReqQueryEmpty);

authRouter.post('/registration',
    authMiddleware.checkRegistrationInputs,
    authMiddleware.isUserEmailExist(true),
    authController.createNewUser);

authRouter.post('/login',
    authMiddleware.checkLoginInputs,
    authMiddleware.isUserEmailExist(false),
    authMiddleware.isAccountUnBanned,
    authMiddleware.checkUserRole(Object.values(userRoles)),
    authController.logIn);

authRouter.post('/logout',
    authMiddleware.isReqBodyEmpty,
    authMiddleware.checkToken(),
    authController.logOut);

authRouter.post('/logout/all',
    authMiddleware.isReqBodyEmpty,
    authMiddleware.checkToken(),
    authController.logOutFromAllDevices);

authRouter.post('/refresh',
    authMiddleware.isReqBodyEmpty,
    authMiddleware.checkToken(REFRESH_TOKEN),
    authController.refreshTokens);

authRouter.post('/create_admin_account',
    authMiddleware.checkToken(),
    authMiddleware.checkUserRole([userRoles.SUPER_ADMIN]),
    authMiddleware.setNewAdminData,
    authController.createNewAdmin);

module.exports = authRouter;
