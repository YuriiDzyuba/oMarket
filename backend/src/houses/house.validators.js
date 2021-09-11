const Joi = require('joi');

const { USER_ID_LENGTH } = require('../../consts/userConsts');
const {
    INDEX_MAX,
    INDEX_MIN,
    PRICE_VALUE_MAX,
    PRICE_VALUE_MIN,
    STREET_NAME_LENGTH_MAX,
    STREET_NAME_LENGTH_MIN
} = require('../../consts/houseConsts');

module.exports = {
    createNewHouse: Joi.object({
        street: Joi.string()
            .min(STREET_NAME_LENGTH_MIN)
            .max(STREET_NAME_LENGTH_MAX)
            .required()
            .trim(),
        index: Joi.number()
            .integer()
            .min(INDEX_MIN)
            .max(INDEX_MAX)
            .required(),
        price: Joi.number()
            .integer()
            .min(PRICE_VALUE_MIN)
            .max(PRICE_VALUE_MAX)
            .required(),
        isSale: Joi.boolean()
            .required(),
        user: Joi.string()
            .min(USER_ID_LENGTH)
            .max(USER_ID_LENGTH)
            .required()
            .trim(),
    }),
    updateHouse: Joi.object({
        street: Joi.string()
            .min(STREET_NAME_LENGTH_MIN)
            .max(STREET_NAME_LENGTH_MAX)
            .trim(),
        index: Joi.number()
            .integer()
            .min(INDEX_MIN)
            .max(INDEX_MAX),
        price: Joi.number()
            .integer()
            .min(PRICE_VALUE_MIN)
            .max(PRICE_VALUE_MAX),
        isSale: Joi.boolean(),
        user: Joi.string()
            .min(USER_ID_LENGTH)
            .max(USER_ID_LENGTH)
            .trim(),
    }),
    getUserHouseQuery: Joi.object({
        user_id: Joi.string()
            .min(USER_ID_LENGTH)
            .max(USER_ID_LENGTH)
    }),
};
