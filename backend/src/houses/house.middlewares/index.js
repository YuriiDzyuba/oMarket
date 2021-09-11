const { isReqQueryEmpty, checkId, checkUserRole, getUserById } = require('../../users/user.middleware/user.middleware');
const { checkToken } = require('../../auth/auth.middleware');
const {
    checkUpdateHouseInputs,
    checkUserIdQuery,
    checkCreateNewHouseInputs,
    getHousesByDynamicParam,
    checkUserAccess
} = require('./house.middleware');

module.exports = {
    checkUserAccess,
    checkToken,
    isReqQueryEmpty,
    checkId,
    checkUserRole,
    getUserById,
    checkUpdateHouseInputs,
    checkUserIdQuery,
    checkCreateNewHouseInputs,
    getHousesByDynamicParam
};
