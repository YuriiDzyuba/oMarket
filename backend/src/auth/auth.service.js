const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Auth = require('./auth.model');
const User = require('../users/user.model');
const config = require('../../config');

const { USER, ACCESS_TOKEN, REFRESH_TOKEN, FORGOT_PASSWORD_TOKEN, ACTIVATE_ACCOUNT_TOKEN } = require('../../consts/dbEnum');

const authService = {
    checkEmail: async (email) => {
        const existingEmail = await User.findOne({ email });
        return existingEmail;
    },

    addNewUser: async (applicantData) => {
        const newUser = await User.create(applicantData);
        return newUser;
    },

    hashPassword: async (password) => {
        const hashedPassword = await bcrypt.hash(password, config.HASH_SALT);
        return hashedPassword;
    },

    comparePasswords: async (applicantPassword, userPassword) => {
        const isEqual = await bcrypt.compare(applicantPassword, userPassword);
        return isEqual;
    },

    generateTokenPair: () => {
        const accessToken = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: config.ACCESS_TOKEN_EXP_IN });
        const refreshToken = jwt.sign({}, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_EXP_IN });

        return {
            accessToken,
            refreshToken
        };
    },

    verifyToken: (token, tokenType = ACCESS_TOKEN) => {
        let secret;

        switch (tokenType) {
            case ACCESS_TOKEN:
                secret = config.ACCESS_TOKEN_SECRET;
                break;
            case REFRESH_TOKEN:
                secret = config.REFRESH_TOKEN_SECRET;
                break;
            case FORGOT_PASSWORD_TOKEN:
                secret = config.FORGOT_PASS_TOKEN_SECRET;
                break;
            case ACTIVATE_ACCOUNT_TOKEN:
                secret = config.ACCOUNT_ACTIVATE_TOKEN_SECRET;
                break;
            default:
                secret = config.ACCESS_TOKEN_SECRET;
                break;
        }

        jwt.verify(token, secret);
    },

    addNewTokenPair: async (tokenPair, userId) => {
        const newAuthToken = await Auth.create({
            ...tokenPair,
            [USER]: userId
        });
        return newAuthToken;
    },

    findToken: async (token) => {
        const savedToken = await Auth.findOne(token)
            .populate(USER);
        return savedToken;
    },

    deleteToken: async (token) => {
        const deletedToken = await Auth.findOneAndDelete(token);
        return deletedToken;
    },

    deleteAllTokens: async (key) => {
        const deletedTokens = await Auth.deleteMany(key);
        return deletedTokens.deletedCount;
    },

    refreshTokenPair: async (oldToken, newTokenPair) => {
        const deletedTokens = await Auth.findOneAndUpdate(oldToken, newTokenPair);
        return deletedTokens;
    }
};

module.exports = authService;
