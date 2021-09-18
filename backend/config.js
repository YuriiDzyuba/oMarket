const path = require('path');

module.exports = {
    PORT: process.env.PORT || 5111,
    DB_PATH: process.env.DB_PATH || 'mongodb://localhost:27017/database',

    CURRENT_YEAR: new Date().getFullYear(),

    HASH_SALT: 7,

    USER_PATH: path.join(__dirname, 'src', 'data', 'users.json'),
    STATIC_PATH: path.join(__dirname, 'src', 'static'),
    CRON_DOCS_PATH: path.join(__dirname, 'cron', 'docs'),

    ACCESS_TOKEN_SECRET: 'ehggfhshdyjyhfbgSnsgnfnggngfbn',
    REFRESH_TOKEN_SECRET: 'ehggfhdsdsd65756yjyhSDgdht45y6rjjdnfn89tfhhdgnfnggngfbn',
    ACCOUNT_ACTIVATE_TOKEN_SECRET: 'dfd',
    FORGOT_PASS_TOKEN_SECRET: 'ddsxdsds',

    ACCESS_TOKEN_EXP_IN: '15m',
    REFRESH_TOKEN_EXP_IN: '31d',

    SOURCE_EMAIL: process.env.SOURCE_EMAIL,
    SOURCE_EMAIL_PASSWORD: process.env.SOURCE_EMAIL_PASSWORD,
    TEST_EMAIL: process.env.TEST_EMAIL,

    FRONT_URL: 'https://developer.mozilla.org/ru/',

    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,

    REQ_PERIOD: 1000,
    REQ_INTERVAL: 15 * 60 * 1000,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000 http://localhost:3001',
};
