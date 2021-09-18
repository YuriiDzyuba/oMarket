const cron = require('node-cron');
const getNewUserStatistics = require('./getNewUserStatistics');

module.exports = () => {
    cron.schedule('0 0 4 * * *', () => {
        console.log(`Cron start at ${new Date().toISOString()}`);
        getNewUserStatistics();
        console.log(`Cron finished at ${new Date().toISOString()}`);
    });
};
