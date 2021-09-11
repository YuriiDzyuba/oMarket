const adService = require('./ad.service');
const CustomError = require('../../exeptions/customError');

const code = require('../../consts/statusCodes');
const message = require('../../consts/responseMessages');

const adController = {
    getAllAds: (fieldsToRemove) => async (req, res, next) => {
        try {
            const ads = await adService.getAllAds(fieldsToRemove);

            if (!Object.keys(ads).length) throw new CustomError(code.NOT_FOUND, message.NO_ADS);

            res.json(ads);

        } catch (e) {
            next(e);
        }
    },

    createNewAd: async (req, res, next) => {
        try {
            const adData = req.body;
            const { currentUser } = req;

            const newAdData = await adService.createNewAd(adData, currentUser._id);

            if (!newAdData) throw new CustomError(code.INTERNAL_SERVER_ERROR, message.CANT_CREATE_AD);

            res.json({ message: message.AD_CREATED });

        } catch (e) {
            next(e);
        }
    },

    getAdsByParams: (req, res, next) => {
        try {
            const { chosenAds } = req;

            res.json(chosenAds);

        } catch (e) {
            next(e);
        }
    },

    getOneAd: async (req, res, next) => {
        try {
            const { id } = req.params;

            const chosenAd = await adService.getOneAd(id);

            if (!chosenAd) throw new CustomError(code.NOT_FOUND, message.NO_AD);

            res.json(chosenAd);

        } catch (e) {
            next(e);
        }
    },

    updateAd: async (req, res, next) => {
        try {
            const { adId } = req.params;
            const adDataToUpdate = req.body;

            const updatedAd = await adService.updateAdvertisement(adId, adDataToUpdate);

            if (!updatedAd) throw new CustomError(code.INTERNAL_SERVER_ERROR, message.CANT_UPDATE_AD);

            res.json(updatedAd);

        } catch (e) {
            next(e);
        }
    },

    deleteAd: async (req, res, next) => {
        try {
            const { id } = req.params;

            const deletedAd = await adService.deleteAd(id);

            if (!deletedAd) throw new CustomError(code.INTERNAL_SERVER_ERROR, message.CANT_DELETE_AD);

            res.json({ message: message.AD_DELETED });

        } catch (e) {
            next(e);
        }
    }
};

module.exports = adController;
