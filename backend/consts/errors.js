module.exports = {
    unauthorized: {
        code: 401,
        message: 'Invalid token'
    },
    forbidden: {
        code: 403,
        message: 'you don\'t have permission to access'
    },
    noQueries: {
        code: 403,
        message: 'no queries'
    },
    noToken: {
        code: 403,
        message: 'token no found'
    },
    notFound: {
        code: 404,
        message: 'not found'
    },
    noUser: {
        code: 404,
        message: 'Cant find user'
    },
    noHouse: {
        code: 404,
        message: 'Cant find this house'
    },
    invalidStreet: {
        code: 404,
        message: 'invalid street format'
    },
    invalidIndexType: {
        code: 404,
        message: 'invalid type of Index. Need number'
    },
    invalidIndexValue: {
        code: 404,
        message: 'invalid index value'
    },
    userExist: {
        code: 406,
        message: 'user with this account exists'
    },
    emailExist: {
        code: 406,
        message: 'this account is not available'
    },
    reqQueryNotEmpty: {
        code: 406,
        message: 'http request must be without queries'
    },
    reqBodyNotEmpty: {
        code: 406,
        message: 'body must be empty'
    },
    accountActivated: {
        code: 406,
        message: 'user account is unactivated'
    },
    accountUnActivated: {
        code: 406,
        message: 'user account is activated'
    },
    accountBanned: {
        code: 406,
        message: 'user account is unbanned'
    },
    accountUnbanned: {
        code: 406,
        message: 'user account is banned'
    },
    noActivationLink: {
        code: 406,
        message: 'no Activation Link'
    },
    invalidEmail: {
        code: 409,
        message: 'invalid account format'
    },
    wrongPassword: {
        code: 409,
        message: 'wrong password'
    },
    invalidName: {
        code: 409,
        message: 'invalid name format'
    },
    invalidAge: {
        code: 409,
        message: 'invalid age format'
    },
    invalidIdReq: {
        code: 409,
        message: 'invalid ID in request params'
    },
    noUsers: {
        code: 410,
        message: 'Users deleted'
    },
    noHouses: {
        code: 410,
        message: 'All houses deleted'
    },
    cantFindHouses: {
        code: 410,
        message: 'cant find any houses'
    },

    serverErr: {
        code: 500,
        message: 'server error'
    },
    newUserErr: {
        code: 501,
        message: 'Cant create user'
    },
    tokenPairErr: {
        code: 501,
        message: 'cant generate tokens'
    },
    cantActivateAccount: {
        code: 501,
        message: 'cant Activate Account'
    },
};
