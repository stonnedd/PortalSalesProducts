var async = require('async');
var categoryModel = require('../../models/ecommerce/categoryModel.js');
var subCategoryModel = require('../../models/ecommerce/subCategoryModel.js');
var brandModel = require('../../models/ecommerce/brandModel.js');


var catalogService = {};

catalogService.getCategories = function (next) {
    async.parallel([
        function (callback) {
            categoryModel.find({}, { _id: 0, name: 1 }, function (err, categories) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, categories);
                }
            });
        },
        function (callback) {
            subCategoryModel.find({}, { _id: 0, name: 1 }, function (err, subCategories) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, subCategories);
                }
            });
        },
        function (callback) {
        brandModel.find({}, { _id: 0, name: 1 }, function (err, brands) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, brands);
            }
        });
    }], next);
};

module.exports = catalogService;