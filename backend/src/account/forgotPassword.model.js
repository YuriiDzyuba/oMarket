const { Schema, model } = require('mongoose');
const { USER, FORGOT_PASSWORD, FORGOT_PASSWORD_TOKEN } = require('../../consts/dbEnum');

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
