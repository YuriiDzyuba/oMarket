const fs = require('fs').promises;
const path = require('path');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const userService = require('../src/users/user.service');

const { CRON_DOCS_PATH, CURRENT_YEAR } = require('../config');

dayjs.extend(utc);

module.exports = async () => {

    const previousDay = dayjs.utc(new Date().toISOString())
        .subtract(1, 'day');

    const newUsers = await userService.getFilteredUsers({ createdAt: { $gte: previousDay } });

    if (!newUsers.length) {
        await fs.appendFile(path.join(CRON_DOCS_PATH, 'newUsers.txt'), `
        ${previousDay}
        no users today
        `);
        return;
    }

    await fs.appendFile(path.join(CRON_DOCS_PATH, 'newUsers.txt'), `
    ${previousDay}
    userNumber - ${Object.values(newUsers).length}
    averageAge - ${Object.values(newUsers)
        .reduce((prevAge, currentUser) => (prevAge) + (CURRENT_YEAR - parseInt(currentUser.born_year, 10)), 0)
    / Object.values(newUsers).length}
    `);
};
