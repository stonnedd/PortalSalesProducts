var mongoose = require('mongoose');
var CategorySchema = require('../../schemas/ecommerce/categorySchema.js');

var Category = mongoose.model('Category',CategorySchema);
module.exports = Category;