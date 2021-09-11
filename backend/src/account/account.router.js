const Router = require('express');

const accountController = require('./account.controller');
const accountMiddleware = require('./account.middleware');

const dbEnum = require('../../consts/dbEnum');
const { WELCOME_PAGE, FORGET_PASSWORD_PAGE } = require('../../consts/emailPageTypes');
const { REFRESH_PASSWORD_LINK_SENT, ACTIVATION_LINK_SENT } = require('../../consts/responseMessages');
const { ADMIN, SUPER_ADMIN } = require('../../consts/userRoles');

const accountRouter = new Router();

accountRouter.use('/', accountMiddleware.isReqQueryEmpty);

accountRouter.post('/get_activation_link',
    accountMiddleware.isReqBodyEmpty,
    accountMiddleware.checkToken(),
    accountMiddleware.isAccountUnBanned,
    accountMiddleware.createActionToken(dbEnum.ACTIVATE_ACCOUNT_TOKEN),
    accountController.sendLinkToEmail(WELCOME_PAGE, ACTIVATION_LINK_SENT));

accountRouter.post('/set_activation_link',
    accountMiddleware.isReqBodyEmpty,
    accountMiddleware.checkToken(),
    accountMiddleware.checkActionToken(dbEnum.ACTIVATE_ACCOUNT_TOKEN),
    accountController.activateAccount);

accountRouter.post('/get_forgot_password_link',
    accountMiddleware.getUserByDynamicParam(dbEnum.EMAIL),
    accountMiddleware.isAccountUnBanned,
    accountMiddleware.createActionToken(dbEnum.FORGOT_PASSWORD_TOKEN),
    accountController.sendLinkToEmail(FORGET_PASSWORD_PAGE, REFRESH_PASSWORD_LINK_SENT));

accountRouter.post('/set_forgot_password_link',
    accountMiddleware.getUserByDynamicParam(dbEnum.EMAIL),
    accountMiddleware.checkActionToken(dbEnum.FORGOT_PASSWORD_TOKEN),
    accountController.setUserPassword);

accountRouter.post('/ban',
    accountMiddleware.checkToken(),
    accountMiddleware.checkUserRole([ADMIN, SUPER_ADMIN]),
    accountController.changeBanStatus());

accountRouter.post('/un_ban',
    accountMiddleware.checkToken(),
    accountMiddleware.checkUserRole([ADMIN, SUPER_ADMIN]),
    accountController.changeBanStatus(false));

module.exports = accountRouter;
