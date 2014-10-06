var mongoose = require('mongoose');
var UserSchema = require('../../schemas/account/userSchema.js');

var User = mongoose.model('User', UserSchema);
module.exports = User;


