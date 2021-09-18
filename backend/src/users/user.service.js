const User = require('./user.model');
const { V, PASSWORD } = require('../../consts/dbEnum');

const userService = {
    getAllUsers: async () => {
        const users = await User.find({}).select(`-${PASSWORD} -${V}`);
        return users;
    },

    getFilteredUsers: async (filter) => {
        const users = await User.find(filter).select(`-${PASSWORD} -${V}`).lean();
        return users;
    },

    getOneUserById: async (id) => {
        const user = await User.findById(id).select(`-${PASSWORD}`);
        return user;
    },

    getOneUserByParam: async (param) => {
        const user = await User.findOne(param).select(`-${PASSWORD}`);
        return user;
    },

    updateUser: async (id, data, returnNew = false) => {
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: returnNew }).select(`-${PASSWORD}`);
        return updatedUser;
    },

    deleteUser: async (id) => {
        const deletedUser = await User.findByIdAndDelete(id).select(`-${PASSWORD}`);
        return deletedUser;
    }
};

module.exports = userService;
