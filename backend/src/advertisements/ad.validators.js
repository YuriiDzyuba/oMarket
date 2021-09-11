const Joi = require('joi');

const { USER_ID_LENGTH } = require('../../consts/userConstants');
const { PRODUCT, PRICE, IS_SALE, QUANTITY, USER } = require('../../consts/dbEnum');
const {
    QUANTITY_MAX,
    QUANTITY_MIN,
    PRICE_VALUE_MAX,
    PRICE_VALUE_MIN,
    PRODUCT_NAME_LENGTH_MAX,
    PRODUCT_NAME_LENGTH_MIN
} = require('../../consts/advtConstants');

module.exports = {
    createNewAd: Joi.object({
        [PRODUCT]: Joi.string()
            .min(PRODUCT_NAME_LENGTH_MIN)
            .max(PRODUCT_NAME_LENGTH_MAX)
            .required()
            .trim(),
        [QUANTITY]: Joi.number()
            .integer()
            .min(QUANTITY_MIN)
            .max(QUANTITY_MAX),
        [PRICE]: Joi.number()
            .integer()
            .min(PRICE_VALUE_MIN)
            .max(PRICE_VALUE_MAX)
            .required(),
        [IS_SALE]: Joi.boolean()
            .required(),
        [USER]: Joi.string()
            .min(USER_ID_LENGTH)
            .max(USER_ID_LENGTH)
            .required()
            .trim(),
    }),

    updateAd: Joi.object({
        [PRODUCT]: Joi.string()
            .min(PRODUCT_NAME_LENGTH_MIN)
            .max(PRODUCT_NAME_LENGTH_MAX)
            .trim(),
        [QUANTITY]: Joi.number()
            .integer()
            .min(QUANTITY_MIN)
            .max(QUANTITY_MAX),
        [PRICE]: Joi.number()
            .integer()
            .min(PRICE_VALUE_MIN)
            .max(PRICE_VALUE_MAX),
        [IS_SALE]: Joi.boolean(),
        [USER]: Joi.string()
            .min(USER_ID_LENGTH)
            .max(USER_ID_LENGTH)
            .trim(),
    }),
};
