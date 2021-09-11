const { checkId, checkUserRole, getUserById } = require('../../users/user.middleware/user.middleware');
const { checkToken, isReqQueryEmpty } = require('../../auth/auth.middleware');
const {
    checkUserIdQuery,
    checkCreateNewAdInputs,
    getAdsByQueries,
    checkUserAccess
} = require('./ad.middleware');

module.exports = {
    checkUserAccess,
    checkToken,
    isReqQueryEmpty,
    checkId,
    checkUserRole,
    getUserById,
    checkUserIdQuery,
    checkCreateNewAdInputs,
    getAdsByQueries
};
