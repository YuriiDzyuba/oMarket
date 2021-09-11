const { Schema, model } = require('mongoose');
const { USER, ACTIVATION_LINK } = require('../../consts/dbEnums');

const OAuthSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    [USER]: {
        ref: USER,
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

module.exports = model(ACTIVATION_LINK, OAuthSchema);
