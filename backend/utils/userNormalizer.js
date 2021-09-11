module.exports = (userToNormalize, customToRemove = []) => {
    const defaultToRemove = ['password', '__v'];

    const normalizedUser = userToNormalize.toObject();

    [...defaultToRemove, ...customToRemove].forEach((key) => { delete normalizedUser[key]; });

    return normalizedUser;
};
