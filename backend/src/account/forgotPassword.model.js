const { Schema, model } = require('mongoose');
const { dbEnum: { USER, FORGOT_PASSWORD, FORGOT_PASSWORD_TOKEN } } = require('../../consts');

const schema = new Schema({
    [FORGOT_PASSWORD_TOKEN]: {
        type: String,
        required: true
    },
    [USER]: {
        ref: USER,
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

module.exports = model(FORGOT_PASSWORD, schema);
