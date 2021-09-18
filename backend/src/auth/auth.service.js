const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const S3 = require('aws-sdk/clients/s3');

const Auth = require('./auth.model');
const User = require('../users/user.model');
const config = require('../../config');
const fileNameBuilder = require('../../utils/fileNameBuilder');

const { USER, ACCESS_TOKEN, REFRESH_TOKEN, FORGOT_PASSWORD_TOKEN, ACTIVATE_ACCOUNT_TOKEN } = require('../../consts/dbEnum');
const { AWS_S3_NAME, AWS_S3_SECRET_KEY, AWS_S3_ACCESS_KEY, AWS_S3_REGION } = require('../../config');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

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

    generateTokenPair: (currentUser) => {
        const accessToken = jwt.sign(currentUser, config.ACCESS_TOKEN_SECRET, { expiresIn: config.ACCESS_TOKEN_EXP_IN });
        const refreshToken = jwt.sign(currentUser, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_EXP_IN });

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
    },

    uploadImageToAWS: (file, dbModel, itemId) => {

        const { name, data, mimetype } = file;

        const uploadPath = fileNameBuilder(name, dbModel, itemId.toString());

        return bucket
            .upload({
                Bucket: AWS_S3_NAME,
                Body: data,
                Key: uploadPath,
                ContentType: mimetype
            })
            .promise();
    }
};

module.exports = authService;
