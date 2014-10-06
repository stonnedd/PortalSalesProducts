var mongoose = require('mongoose');
var BrandSchema = require('../../schemas/ecommerce/brandSchema.js');

var Brand = mongoose.model('Brand',BrandSchema);
module.exports = Brand;


