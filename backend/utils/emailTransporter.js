const nodemailer = require('nodemailer');
const { SOURCE_EMAIL, SOURCE_EMAIL_PASSWORD } = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SOURCE_EMAIL,
        pass: SOURCE_EMAIL_PASSWORD
    }
});

module.exports = transporter;
