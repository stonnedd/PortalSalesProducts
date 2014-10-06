var mongoose = require('mongoose');
var ProductSchema = require('../../schemas/ecommerce/productSchema.js');

var Product = mongoose.model('Product',ProductSchema);
module.exports = Product;

