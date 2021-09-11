const User = require('./user.model');
const { V, PASSWORD } = require('../../consts/dbEnum');

const userService = {
    getAllUsers: async () => {
        const users = await User.find({}).select(`-${PASSWORD} -${V}`);
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

    updateUser: async (id, data) => {
        const updatedUser = await User.findByIdAndUpdate(id, data).select(`-${PASSWORD}`);
        return updatedUser;
    },

    deleteUser: async (id) => {
        const deletedUser = await User.findByIdAndDelete(id).select(`-${PASSWORD}`);
        return deletedUser;
    }
};

module.exports = userService;
