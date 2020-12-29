const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const CartItem = new Schema({
  name: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  store: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
  },
  item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
  },
  quantity: {
      type: Number,
      default: 1
  },
}, {
  timestamps: true
});

const User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    roles:   {
      type: [{
        type: String,
        lowercase: true,
        enum: ['consumer', 'seller', 'admin']
      }],
      default: ['consumer']
    },
    email: {
      type: String,
      default: '',
      required: true,
      lowercase: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
      type: String,
      default: '',
      required: true,
      unique: true
    },
    status: {
        type: String,
        default: "pending"
    },
    cart: [CartItem]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);