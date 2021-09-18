const CustomError = require('../exeptions/customError');
const { ALLOWED_ORIGIN } = require('../config');
const { code: { FORBIDDEN }, message: { CORS_NOT_ALLOWED } } = require('../consts');

module.exports = (origin, callback) => {
    const whiteList = ALLOWED_ORIGIN.split(' ');

    if (!origin) return callback(null, true);

    if (!whiteList.includes(origin)) return callback(new CustomError(FORBIDDEN, CORS_NOT_ALLOWED), false);

    return callback(null, true);
};
