const { Schema, model } = require('mongoose');
const userRoles = require('../../consts/userRoles');
const { USER, EMAIL, PASSWORD, NAME, BORN_YEAR, IS_ACTIVATED, IS_BANNED, ROLE } = require('../../consts/dbEnum');

const schema = new Schema({
    [EMAIL]: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    [PASSWORD]: {
        type: String,
        required: true,
        trim: true,
    },
    [NAME]: {
        type: String,
        required: false,
        trim: true,
    },
    [BORN_YEAR]: {
        type: String,
        required: false,
        trim: true,
    },
    [IS_ACTIVATED]: {
        type: Boolean,
        required: true,
        default: false,
    },
    [IS_BANNED]: {
        type: Boolean,
        required: true,
        default: false,
    },
    [ROLE]: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.USER
    },
}, { timestamps: true });

module.exports = model(USER, schema);
