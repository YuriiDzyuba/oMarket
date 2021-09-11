const { checkToken, isReqBodyEmpty, isReqQueryEmpty } = require('../../auth/auth.middleware/auth.middleware');
const { isAccountActivated, isAccountUnBanned } = require('../../account/account.middleware/account.middleware');
const { getUserById, checkId, checkUpdateUserInputs, checkUserRole, checkUserPermission } = require('./user.middleware');

module.exports = {
    checkToken,
    isReqQueryEmpty,
    isReqBodyEmpty,
    checkId,
    getUserById,
    checkUpdateUserInputs,
    checkUserRole,
    checkUserPermission,
    isAccountActivated,
    isAccountUnBanned
};
