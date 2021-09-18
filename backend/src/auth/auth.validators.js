const Joi = require('joi');
const userRoles = require('../../consts/userRoles');

const { EMAIL, NAME, BORN_YEAR, PASSWORD, ROLE } = require('../../consts/dbEnum');
const { PASSWORD_REGEXP, EMAIL_REGEXP, NAME_REGEXP } = require('../../consts/regExp');
const {
    CURRENT_YEAR,
    AGE_LIMIT_MAX,
    AGE_LIMIT_MIN,
    PASSWORD_LENGTH_MAX,
    PASSWORD_LENGTH_MIN
} = require('../../consts/userConstants');

module.exports = {
    createNewUserValidator: Joi.object({
        [EMAIL]: Joi.string()
            .regex(EMAIL_REGEXP)
            .trim()
            .required(),
        [NAME]: Joi.string()
            .alphanum()
            .regex(NAME_REGEXP)
            .trim()
            .required(),
        [BORN_YEAR]: Joi.number()
            .integer()
            .min(CURRENT_YEAR - AGE_LIMIT_MAX)
            .max(CURRENT_YEAR - AGE_LIMIT_MIN),
        [PASSWORD]: Joi.string()
            .regex(PASSWORD_REGEXP)
            .trim()
            .min(PASSWORD_LENGTH_MIN)
            .max(PASSWORD_LENGTH_MAX)
            .required()
    }),
    createNewAdminValidator: Joi.object({
        [EMAIL]: Joi.string()
            .regex(EMAIL_REGEXP)
            .trim()
            .required(),
        [NAME]: Joi.string()
            .alphanum()
            .regex(NAME_REGEXP)
            .trim()
            .required(),
        [BORN_YEAR]: Joi.number()
            .integer()
            .min(CURRENT_YEAR - AGE_LIMIT_MAX)
            .max(CURRENT_YEAR - AGE_LIMIT_MIN),
        [PASSWORD]: Joi.string()
            .regex(PASSWORD_REGEXP)
            .trim()
            .min(PASSWORD_LENGTH_MIN)
            .max(PASSWORD_LENGTH_MAX)
            .required(),
        [ROLE]: Joi.string()
            .allow(...Object.values(userRoles))
            .required(),
    }),
    checkAuthInputs: Joi.object({
        [EMAIL]: Joi.string()
            .regex(EMAIL_REGEXP)
            .trim()
            .required(),
        [PASSWORD]: Joi.string()
            .regex(PASSWORD_REGEXP)
            .trim()
            .min(PASSWORD_LENGTH_MIN)
            .max(PASSWORD_LENGTH_MAX)
            .required(),
    })
};
