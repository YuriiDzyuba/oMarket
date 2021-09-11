const { WELCOME_PAGE, FORGET_PASSWORD_PAGE, BAN_PAGE, UN_BAN_PAGE } = require('../../../consts/emailPageTypes');

const emailActions = {
    [WELCOME_PAGE]: {
        templateName: [WELCOME_PAGE],
        subject: 'Welcome',
        pageContent: {
            p1: 'we are happy',
            p2: 'congratulations'
        }
    },
    [FORGET_PASSWORD_PAGE]: {
        templateName: [FORGET_PASSWORD_PAGE],
        subject: 'You forget password. It\'s sad',
        pageContent: {
            p1: 'click this link:',
        }
    },
    [BAN_PAGE]: {
        templateName: [BAN_PAGE],
        subject: 'You\'v been banned',
        pageContent: {
            p1: 'You cant register on our site any more',
            p2: ''
        }
    },
    [UN_BAN_PAGE]: {
        templateName: [UN_BAN_PAGE],
        subject: 'You\'v been unbanned',
        pageContent: {
            p1: 'congratulations',
            p2: ''
        }
    },
};

module.exports = emailActions;
