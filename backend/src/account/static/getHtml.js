const { WELCOME_PAGE, BAN_PAGE, UN_BAN_PAGE, FORGET_PASSWORD_PAGE } = require('../../../consts/emailPageTypes');
const banPage = require('./banPage');
const unbanPage = require('./unbanPage');
const forgetPasswordPage = require('./forgetPasswordPage');
const welcomePage = require('./welcomePage');

module.exports = (currentPage, context) => {

    const pageTypes = {
        [BAN_PAGE]: banPage,
        [UN_BAN_PAGE]: unbanPage,
        [FORGET_PASSWORD_PAGE]: forgetPasswordPage,
        [WELCOME_PAGE]: welcomePage
    };
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
    <body style="background: aquamarine; display: block">
        <div style="background: palevioletred; height: 120px">
             <a href="${context.frontendURL}">${context.frontendURL}</a>
        </div>
        ${pageTypes[currentPage.templateName](currentPage.pageContent, context)}
        <div style="background: darkcyan; height: 120px">
             <p>(c)</p>
        </div>
        </div>
    </body>
</html>

    `;
};
