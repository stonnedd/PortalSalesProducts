var mongoose = require('mongoose');
var BannerSchema = require('../../schemas/ecommerce/bannerSchema.js');

var Banner = mongoose.model('Banner', BannerSchema);
module.exports = Banner;