const Router = require('express');

const adController = require('./ad.controller');
const adMiddleware = require('./ad.middlewares');
const { V, USER } = require('../../consts/dbEnum');

const adRouter = new Router();

adRouter.get('/',
    adMiddleware.isReqQueryEmpty,
    adController.getAllAds([V, USER]));

adRouter.post('/',
    adMiddleware.isReqQueryEmpty,
    adMiddleware.checkCreateNewAdInputs,
    adMiddleware.checkToken(),
    adController.createNewAd);

adRouter.get('/params',
    adMiddleware.getAdsByQueries,
    adController.getAdsByParams);

adRouter.get('/:id',
    adMiddleware.isReqQueryEmpty,
    adMiddleware.checkId,
    adController.getOneAd);

adRouter.patch('/:id',
    adMiddleware.isReqQueryEmpty,
    adMiddleware.checkId,
    adMiddleware.checkToken(),
    adMiddleware.checkUserAccess,
    adController.updateAd);

adRouter.delete('/:id',
    adMiddleware.isReqQueryEmpty,
    adMiddleware.checkId,
    adMiddleware.checkToken(),
    adMiddleware.checkUserAccess,
    adController.deleteAd);

module.exports = adRouter;
