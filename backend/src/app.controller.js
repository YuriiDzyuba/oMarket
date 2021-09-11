const CustomError = require('../exeptions/customError');

const code = require('../consts/statusCodes');
const message = require('../consts/responseMessages');

const appController = {
    getHomePage: (req, res) => res.status(code.MOVED_PERMANENTLY)
        .redirect('/auth'),

    notFound: () => {
        throw new CustomError(code.NOT_FOUND, message.NOT_FOUND);
    }
};

module.exports = appController;
