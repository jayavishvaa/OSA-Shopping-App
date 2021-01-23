const mongoose = require('mongoose');
const Joi = require('joi');

const { Section } = require('./section');
const { itemSchema } = require('./item');

function validateShop(shop) {
    const schema = Joi.object({
        shopName: Joi.string().min(3).max(100).required(),
        description: Joi.string().max(255),
        streetName: Joi.string().max(255).required(),
        pinCode: Joi.string().length(6).required().$_match(/^\d{6}$/),
        locationCoordinates: Joi.object().required(),
        seller: Joi.objectId().required(),
        sections: Joi.array().required()
    })

    return schema.validate(shop);
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
    streetName: {
        type: String,
        maxlength: 255,
    },
    pinCode: {
        type: String,
        required: true,
        match: /^\d{6}$/
    },
    locationCoordinates: Object,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    sections: {
        type: [String],
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    categories: [new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        items: [mongoose.Schema.Types.ObjectId]
    })],
    items: [mongoose.Schema.Types.ObjectId]
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports.validate = validateShop;
module.exports.shopSchema = shopSchema;
module.exports.Shop = Shop;