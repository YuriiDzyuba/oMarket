const Router = require('express');

const housesController = require('./house.controller');
const housesMiddleware = require('./house.middlewares');

const houseRouter = new Router();

houseRouter.get('/',
    housesMiddleware.isReqQueryEmpty,
    housesController.getAllHouses);

houseRouter.get('/:id',
    housesMiddleware.isReqQueryEmpty,
    housesMiddleware.checkId,
    housesController.getOneHouse);

houseRouter.post('/',
    housesMiddleware.isReqQueryEmpty,
    housesMiddleware.checkToken(),
    housesController.addNewHouse);

houseRouter.get('/params',
    housesMiddleware.getHousesByDynamicParam(),
    housesController.getHousesByParams);

houseRouter.patch('/:id',
    housesMiddleware.isReqQueryEmpty,
    housesMiddleware.checkId,
    housesMiddleware.checkToken(),
    housesMiddleware.checkUserAccess,
    housesController.updateHouse);

houseRouter.delete('/:id',
    housesMiddleware.isReqQueryEmpty,
    housesMiddleware.checkId,
    housesMiddleware.checkToken(),
    housesMiddleware.checkUserAccess,
    housesController.deleteHouse);

module.exports = houseRouter;
