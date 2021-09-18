const { checkUserRole } = require('../../users/user.middleware/user.middleware');
const { isAccountUnBanned } = require('../../account/account.middleware/account.middleware');
const {
    checkRegistrationInputs,
    checkLoginInputs,
    isUserEmailExist,
    checkToken,
    isReqQueryEmpty,
    isReqBodyEmpty,
    setNewAdminData,
    checkAvatar
} = require('./auth.middleware');

module.exports = {
    checkToken,
    checkRegistrationInputs,
    isReqQueryEmpty,
    isUserEmailExist,
    checkLoginInputs,
    checkUserRole,
    isReqBodyEmpty,
    isAccountUnBanned,
    setNewAdminData,
    checkAvatar
};
