const code = require('./statusCodes');

module.exports = {
    CANT_CREATE_USER_LINK: {
        code: code.INTERNAL_SERVER_ERROR,
        message: 'cant create user activation link',
        customCode: '500.2'
    },
    CANT_CREATE_ADMIN_LINK: {
        code: code.INTERNAL_SERVER_ERROR,
        message: 'cant create admin activation link',
        customCode: '500.3'
    },
    WRONG_USER_PASSWORD: {
        code: code.NOT_ACCEPTABLE,
        message: 'wrong password',
        customCode: '406.1'
    }
};
