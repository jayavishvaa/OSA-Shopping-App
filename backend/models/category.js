const mongoose = require('mongoose');
const Joi = require('joi');

const { userSchema } = require('./user');

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        sellerId: Joi.objectId().required()
    });

    schema.validate(category);
}

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports.validate = validateCategory;
module.exports.categorySchema = categorySchema;
module.exports.Category = Category;