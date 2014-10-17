var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subCategorySchema   = new Schema({
    name :  {type: String, required: true, unique: true},
    category: {type: String},
    imgPath:{type: String},
    uploadDate :  {type: Date, default: Date.now}
});
module.exports = subCategorySchema;