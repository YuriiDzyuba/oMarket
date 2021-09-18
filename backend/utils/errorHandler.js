const { code, message } = require('../consts');

// eslint-disable-next-line no-unused-vars
function errHandler(err, req, res, next) {

    res.status(err.status || code.INTERNAL_SERVER_ERROR)
        .json({ message: err.message || message.INTERNAL_SERVER_ERROR,
            customCode: err.customCode,
            data: err.data
        });
}

module.exports = errHandler;
