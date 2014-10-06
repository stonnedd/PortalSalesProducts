var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema   = new Schema({
    name : { type: String, required: true, unique: true },
    description : { type: String },
    position :  {type: Number },
    uploadDate :  {type: Date, default: Date.now}
});

module.exports = categorySchema;