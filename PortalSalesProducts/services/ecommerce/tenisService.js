var async = require('async');
var categoryModel = require('../../models/ecommerce/categoryModel.js');
var productModel = require('../../models/ecommerce/productModel.js');
var brandModel = require('../../models/ecommerce/brandModel.js');


var tenisService = {};

tenisService.getCatalogs = function (param, next) {
    async.parallel([
    
        function (callback) {
        categoryModel.find().select({ _id: 0, name: 1 }).sort({ position: 1 }).exec(function (err, categories) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, categories);
            }
        });
    },
    
        function (callback) {
        productModel.find({ category: "Tenis" }).select({ uploadDate: 0 }).sort('-uploadDate').exec(function (err, products) {
            if (err) {
                callback(err);
            }
            else {
                var productsWitdId = [];
                for (var i = 0, len = products.length; i < len; i++) {
                    var product = products[i];
                    var productToPush = product.toObject();
                    productToPush.id = product.id;
                    delete productToPush._id;
                    productsWitdId.push(productToPush);
                }
                callback(null, productsWitdId);
            }
        });
    },
        function (callback) {
        brandModel.find({ category: "Tenis" }).select({ _id: 0, name: 1 }).sort('name').exec(function (err, brands) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, brands);
            }
        });
    }], next);
};

module.exports = tenisService;