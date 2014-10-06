var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subCategorySchema   = new Schema({
    name :  {type: String},
    category: {type: String},
    ImgPath:{type: String},
    uploadDate :  {type: Date, default: Date.now}
});
module.exports = subCategorySchema;