const { Schema, model } = require('mongoose');
const { USER, ACTIVATE_ACCOUNT, ACTIVATE_ACCOUNT_TOKEN } = require('../../consts/dbEnum');

const schema = new Schema({
    [ACTIVATE_ACCOUNT_TOKEN]: {
        type: String,
        required: true
    },
    [USER]: {
        ref: USER,
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

module.exports = model(ACTIVATE_ACCOUNT, schema);
