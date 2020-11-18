var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
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
        default: "consumer"
    },
    email: {
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