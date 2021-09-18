const path = require('path');
const uuid = require('uuid').v1;

module.exports = (fileName, itemType, itemId) => {
    const fileExtension = fileName.split('.').pop();

    return path.join(itemType, itemId, `${uuid()}.${fileExtension}`);
};
