const CustomError = require('../../../exeptions/customError');
const adService = require('../ad.service');

const code = require('../../../consts/statusCodes');
const message = require('../../../consts/responseMessages');
const dbEnum = require('../../../consts/dbEnum');

const { createNewAd, updateAd } = require('../ad.validators');

const adMiddleware = {
    checkCreateNewAdInputs: (req, res, next) => {
        try {
            const { error, value } = createNewAd.validate(req.body);

            if (error) throw new CustomError(400, error.details[0].message);

            req.body = value;

            next();

        } catch (e) {
            next(e);
        }
    },

    checkUserIdQuery: (req, res, next) => {
        try {
            const { error, value } = updateAd.validate(req.body);

            if (error) throw new CustomError(400, error.details[0].message);

            req.body = value;

            next();

        } catch (e) {
            next(e);
        }
    },

    checkUserAccess: async (req, res, next) => {
        try {
            const { currentUser } = req;
            const { id } = req.params;

            const usersAd = await adService.getUserAd(id, currentUser._id);

            if (usersAd) throw new CustomError(code.FORBIDDEN, message.FORBIDDEN);

            next();

        } catch (e) {
            next(e);
        }
    },
    getAdsByQueries: () => async (req, res, next) => {
        try {
            const values = {};
            const params = req.query;

            for (const param in params) {

                switch (param) {
                    case dbEnum.PRICE:
                    case dbEnum.QUANTITY:
                        values[param] = +params[param];
                        break;
                    case dbEnum.IS_SALE:
                        values[param] = Boolean(params[param] !== 'false');
                        break;
                    case dbEnum.PRODUCT:
                    case dbEnum.USER:
                        values[param] = params[param];
                        break;
                    default:
                        break;
                }
            }

            if (!Object.keys(values).length) throw new CustomError(code.BAD_REQUEST, message.NO_QUERIES);

            const chosenAds = await adService.getAdsByDynamicParam(values);

            if (!chosenAds.length) throw new CustomError(code.NOT_FOUND, message.CANT_FIND_ADS);

            req.chosenAds = chosenAds;

            next();

        } catch (e) {

            next(e);
        }
    }
};

module.exports = adMiddleware;
