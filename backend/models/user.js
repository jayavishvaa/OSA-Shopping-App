const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const { itemSchema } = require('./globalItem');

function validateUser(user) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).default('New User'),
    homeAddress: Joi.string().min(5).max(255).default(''),
    landmark: Joi.string().min(3).max(50).default(''),
    pinCode: Joi.string().default('').$_match(/^\d{6}$/),
    city: Joi.string().min(3).max(50).default('')
  });

  return schema.validate(user);
}

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: 'New User',
    minlength: 3,
    maxlength: 100
  },
  homeAddress: {
    type: String,
    default: 'default',
    minlength: 5,
    maxlength: 255
  },
  landmark: {
    type: String,
    default: 'landmark',
    minlength: 3,
    maxlength: 50
  },
  pinCode: {
    type: String,
    default: '000000',
    match: /^\d{6}$/
  },
  city: {
    type: String,
    default: 'city',
    minlength: 3,
    maxlength: 50
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10
  },
  roles: {
    type: String,
    default: 'customer',
    enum: ['customer', 'seller', 'admin'],
  },
  cartItems: {
    type: [itemSchema]
  },

});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, phoneNumber: this.phoneNumber, pinCode: this.pinCode }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

module.exports.validate = validateUser;
module.exports.userSchema = userSchema;
module.exports.User = User;