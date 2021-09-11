const { Schema, model } = require('mongoose');
const { USER, REFRESH_PASSWORD } = require('../../consts/dbEnums');

const OAuthSchema = new Schema({
    [REFRESH_PASSWORD]: {
        type: String,
        required: true
    },
    [USER]: {
        ref: USER,
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

module.exports = model(REFRESH_PASSWORD, OAuthSchema);
