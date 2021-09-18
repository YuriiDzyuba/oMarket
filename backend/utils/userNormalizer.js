const { PASSWORD, V } = require('../consts/dbEnum');

module.exports = (userToNormalize, customToRemove = []) => {
    const defaultToRemove = [PASSWORD, V];

    const normalizedUser = userToNormalize.toObject();

    [...defaultToRemove, ...customToRemove].forEach((key) => { delete normalizedUser[key]; });

    return normalizedUser;
};
