const House = require('./house.model');

const houseService = {
    getUserHouses: async (userID) => {
        const userHouses = await House.find({ user: userID });
        return userHouses;
    },

    getAllHouses: async () => {
        const houses = await House.find({});
        return houses;
    },

    getHousesByDynamicParam: async (param) => {
        const houses = await House.find(param);
        return houses;
    },

    getOneHouse: async (id) => {
        const house = await House.findById(id);
        return house;
    },

    addNewHouse: async (applicantData) => {
        const newHouse = await House.create(applicantData);
        return newHouse;
    },

    updateHouse: async (id, data) => {
        const updatedHouse = await House.findByIdAndUpdate(id, data);
        return updatedHouse;
    },

    deleteHouse: async (id) => {
        const deletedHouse = await House.findByIdAndDelete(id);
        return deletedHouse;
    }
};

module.exports = houseService;
