const mongoose = require('mongoose');
const Joi = require('joi');

function validatePINCode(pinCode) {
    const schema = Joi.object({
        code: Joi.string().required().$_match(/^\d{6}$/)
    });

    return schema.validate(pinCode);
}

const pinCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        match: /^\d{6}$/
    }
})

const PINCode = mongoose.model('PINCode', pinCodeSchema);

module.exports.validate = validatePINCode;
module.exports.pinCodeSchema = pinCodeSchema;
module.exports.PINCode = PINCode;