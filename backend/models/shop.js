const mongoose = require('mongoose');
const Joi = require('joi');

const { sectionSchema } = require('./section');

function validateShop(shop) {
    const schema = Joi.object({
        shopName: Joi.string().min(3).max(100).required(),
        description: Joi.string().max(255),
        pinCode: Joi.string().length(6).required().$_match(/^\d{6}$/),
        location: Joi.object().required(),
        seller: Joi.objectId().required(),
        sections: Joi.object().required()
    })
}

const shopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        maxlength: 255,
        default: ''
    },
    pinCode: {
        type: String,
        required: true,
        match: /^\d{6}$/
    },
    location: Object,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    sections: {
        type: [sectionSchema]
    }
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports.validate = validateShop;
module.exports.shopSchema = shopSchema;
module.exports.Shop = Shop;