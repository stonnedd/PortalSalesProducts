var async = require('async');
var categoryModel = require('../../models/ecommerce/categoryModel.js');
var bannerModel = require('../../models/ecommerce/bannerModel.js');

var salesService = {};

salesService.getMenuInfo = function (next) {
    async.parallel([
        function (callback) {
        categoryModel.find().select({ _id: 0, name: 1 }).sort({position:1}).exec(function (err, categories) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, categories);
            }
        });
    },
        function (callback) {
        bannerModel.find().select({ _id: 0, titleOne: 1, titleTwo: 1, image: 1 }).sort({ position: 1 }).exec(function (err, banners) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, banners);
            }
        });
    }], next);
};

module.exports = salesService;