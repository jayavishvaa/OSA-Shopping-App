const mongoose = require('mongoose');
const Joi = require('joi');

const { categorySchema } = require('./category');
const { userSchema } = require('./user');

function validateItem(item) {
    const schema = Joi.object({
        image: Joi.required(),
        name: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(5).max(255),
        MRP: Joi.number().required().min(0),
        sellingPrice: Joi.required().number().min(0),
        categoryId: Joi.objectId().default(null),
        sellerId: Joi.objectId().required()
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
        minlength: 5,
        maxlength: 255,
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
    category: categorySchema,
});

const Item = mongoose.model('Item', itemSchema);

module.exports.validate = validateItem;
module.exports.itemSchema = itemSchema;
module.exports.Item = Item;