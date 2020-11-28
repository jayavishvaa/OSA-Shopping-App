const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    type:   {
        type: String,
        lowercase: true,
        default: "consumer",
        enum: ['consumer', 'seller', 'admin']
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
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);