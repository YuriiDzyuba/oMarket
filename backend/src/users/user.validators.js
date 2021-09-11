const Joi = require('joi');
const userRoles = require('../../consts/userRoles');

const { NAME_REGEXP } = require('../../consts/regExp');
const { CURRENT_YEAR, AGE_LIMIT_MAX, AGE_LIMIT_MIN } = require('../../consts/userConstants');
const { NAME, BORN_YEAR, ROLE } = require('../../consts/dbEnum');

module.exports = {
    updateUserValidator: Joi.object({
        [NAME]: Joi.string()
            .alphanum()
            .regex(NAME_REGEXP)
            .trim(),
        [BORN_YEAR]: Joi.number()
            .integer()
            .min(CURRENT_YEAR - AGE_LIMIT_MAX)
            .max(CURRENT_YEAR - AGE_LIMIT_MIN),
        [ROLE]: Joi.string()
            .allow(...Object.values(userRoles))
    })
};
