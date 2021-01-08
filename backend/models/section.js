const mongoose = require('mongoose');
const Joi = require('joi');

function validateSection(section) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });

    return schema.validate(section);
}

const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Section = mongoose.model('Section', sectionSchema);

module.exports.validate = validateSection;
module.exports.sectionSchema = sectionSchema;
module.exports.Section = Section;