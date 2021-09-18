const { Schema, model } = require('mongoose');
const { dbEnum: { USER, ACTIVATE_ACCOUNT, ACTIVATE_ACCOUNT_TOKEN } } = require('../../consts');

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
