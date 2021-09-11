const { Schema, model } = require('mongoose');
const { USER, AUTH, ACCESS_TOKEN, REFRESH_TOKEN } = require('../../consts/dbEnum');

const schema = new Schema({
    [ACCESS_TOKEN]: {
        type: String,
        required: true
    },
    [REFRESH_TOKEN]: {
        type: String,
        required: true
    },
    [USER]: {
        ref: USER,
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

module.exports = model(AUTH, schema);
