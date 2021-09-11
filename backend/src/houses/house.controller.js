const houseService = require('./house.service');
const CustomError = require('../../exeptions/customError');
const { noHouses, noHouse } = require('../../consts/errors');

const houseController = {
    getAllHouses: async (req, res, next) => {
        try {
            const { user_id } = req.query;

            if (user_id) {
                const userHouses = await houseService.getUserHouses(user_id);
                return res.json(userHouses);
            }

            const houses = await houseService.getAllHouses();

            if (!Object.keys(houses).length) throw new CustomError(noHouses.message, noHouses.code);

            res.json(houses);
        } catch (e) {
            next(e);
        }
    },
    getHousesByParams: (req, res, next) => {
        try {
            const { chosenHouses } = req;

            res.json(chosenHouses);
        } catch (e) {
            next(e);
        }
    },

    getOneHouse: async (req, res, next) => {
        try {
            const { id } = req.params;

            const chosenHouse = await houseService.getOneHouse(id);

            if (!chosenHouse) throw new CustomError(noHouse.message, noHouse.code);

            res.json(chosenHouse);

        } catch (e) {
            next(e);
        }
    },

    addNewHouse: async (req, res, next) => {
        try {
            console.log('skdsllsd');
            const applicantData = req.body;

            const newHouse = await houseService.addNewHouse(applicantData);

            if (!newHouse) throw new CustomError(noHouse.message, noHouse.code);

            res.json(applicantData);

        } catch (e) {
            next(e);
        }
    },

    updateHouse: async (req, res, next) => {
        try {
            const { id } = req.params;
            const houseData = req.body;

            const updatedHouse = await houseService.updateHouse(id, houseData);

            if (!updatedHouse) throw new CustomError(noHouse.message, noHouse.code);

            res.json(updatedHouse);

        } catch (e) {
            next(e);
        }
    },

    deleteHouse: async (req, res, next) => {
        try {
            const { id } = req.params;

            const deletedHouse = await houseService.deleteHouse(id);

            if (!deletedHouse) throw new CustomError(noHouse.message, noHouse.code);

            res.json(deletedHouse);

        } catch (e) {
            next(e);
        }
    }
};

module.exports = houseController;
