var async = require('async');
var categoryModel = require('../../models/ecommerce/categoryModel.js');
//
var categoryService = {};

categoryService.getCategories = function (next) {
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
    }], next);
};

module.exports = categoryService;