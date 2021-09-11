const Ad = require('./ad.model');
const { USER, ID } = require('../../consts/dbEnum');

const adService = {

    getAllAds: async (fieldsToRemove = []) => {
        const ads = await Ad.find({})
            .select(fieldsToRemove.join(' '));
        return ads;
    },

    getAdsByDynamicParam: async (param) => {
        const ads = await Ad.find(param);
        return ads;
    },

    getOneAd: async (id) => {
        const ad = await Ad.findById(id);
        return ad;
    },

    getUserAd: async (adId, userId) => {
        const usersAd = await Ad.findOne({
            [ID]: adId,
            [USER]: userId
        });
        return usersAd;
    },

    createNewAd: async (newAdDate, userId) => {
        const newAds = await Ad.create({
            ...newAdDate,
            [USER]: userId
        });
        return newAds;
    },

    updateAdvertisement: async (id, data) => {
        const updatedAd = await Ad.findByIdAndUpdate(id, data);
        return updatedAd;
    },

    deleteAd: async (id) => {
        const deletedAd = await Ad.findByIdAndDelete(id);
        return deletedAd;
    }
};

module.exports = adService;
