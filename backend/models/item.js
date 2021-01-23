const mongoose = require('mongoose');
const Joi = require('joi');

const { userSchema } = require('./user');

function validateItem(item) {
    const schema = Joi.object({
        // image: Joi.required(),
        name: Joi.string().min(3).max(100).required(),
        description: Joi.string().max(255),
        MRP: Joi.number().required().min(0),
        sellingPrice: Joi.required().number().min(0),
        shop: Joi.objectId().required()
    });

    return schema.validate(item);
}

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        maxlength: 255,
    },
    dated: {
        type: Date,
        default: Date.now()
    },
    MRP: {
        type: Number,
        required: true,
        min: 0
    },
    sellingPrice: {
        type: Number,
        required: true,
        min: 0
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports.validate = validateItem;
module.exports.itemSchema = itemSchema;
module.exports.Item = Item;