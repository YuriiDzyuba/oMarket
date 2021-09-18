const { Schema, model } = require('mongoose');
const { dbEnum: { USER, ADVERTISEMENT, PRODUCT, PRICE, IS_SALE, QUANTITY } } = require('../../consts');

const schema = new Schema({
    [PRODUCT]: {
        type: String,
        required: true,
        trim: true,
    },
    [PRICE]: {
        type: Number,
        required: true,
        trim: true,
    },
    [QUANTITY]: {
        type: Number,
        required: false,
        trim: true,
    },
    [IS_SALE]: {
        type: Boolean,
        required: true,
    },
    [USER]: {
        ref: USER,
        type: Schema.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });

module.exports = model(ADVERTISEMENT, schema);
