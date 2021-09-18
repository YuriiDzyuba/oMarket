const nodemailer = require('nodemailer');
const { SOURCE_EMAIL, SOURCE_EMAIL_PASSWORD } = require('../config');

module.exports = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SOURCE_EMAIL,
        pass: SOURCE_EMAIL_PASSWORD
    }
});
