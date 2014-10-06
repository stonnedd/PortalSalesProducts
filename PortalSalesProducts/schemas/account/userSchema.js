var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username :  {type: String, required: true, unique: true},
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    fullName: { type: String, required: true }
});
module.exports = userSchema;



