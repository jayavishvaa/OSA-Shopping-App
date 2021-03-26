const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const { itemSchema } = require('./item');

function validateUser(user) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).default('New User'),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
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
  emailId : {
    type : String,
    minlength : 5,
    maxlength : 100
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
  dateJoined: {
    type: Date,
    default: Date.now
  },
  cartItems: {
    type: [new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      description: String,
      mrp: {
        type: Number,
        min: 0
      },
      price: Number,
      quantity: Number,
      perQty: String,
      shop: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
      },
      keptAt: {
        type: Date,
        required: true
      }
    })]
  },
  savedLists: {
    type: [new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      items: [new mongoose.Schema({
        name: {
          type: String,
          required: true
        },
        description: String,
        mrp: {
          type: Number,
          min: 0
        },
        price: Number,
        quantity: Number,
        perQty: String,
        shop: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        keptAt: {
          type: Date,
          required: true
        }
      })]
    })]
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({
    _id: this._id,
    phoneNumber: this.phoneNumber,
    pinCode: this.pinCode
  }, config.get('jwtPrivateKey'));
  return token;
}

userSchema.methods.generateSellerAuthToken = function(shopId) {
  const token = jwt.sign({
    _id: this._id,
    phoneNumber: this.phoneNumber,
    pinCode: this.pinCode,
    shop: shopId
  }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

module.exports.validate = validateUser;
module.exports.userSchema = userSchema;
module.exports.User = User;
