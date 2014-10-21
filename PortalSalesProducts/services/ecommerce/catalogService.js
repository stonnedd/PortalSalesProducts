var async = require('async');
var categoryModel = require('../../models/ecommerce/categoryModel.js');
var subCategoryModel = require('../../models/ecommerce/subCategoryModel.js');
var brandModel = require('../../models/ecommerce/brandModel.js');


var catalogService = {};

catalogService.getCatalogs = function (param, next) {
    async.parallel([
        function (callback) {
        categoryModel.find().select({_id:0, name:1}).sort({position:1}).exec(function (err, categories) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, categories);
            }
        });
    },
        function (callback) {
        subCategoryModel.find({ category: param }).select({_id: 0, name: 1, imgPath: 1})
            .sort('name').exec(function (err, subCategories) {
            if (err) {
                callback(err);
            }   
            else {
                callback(null, subCategories);
            }
        });
    },
        function (callback) {
        brandModel.find({ category: param }).select({ _id: 0, name: 1 }).sort('name').exec(function (err, brands) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, brands);
            }
        }); 
    },
    
    function (callback) {
        categoryModel.findOne({name: param }).select( { _id:0, imgPath: 1 }).sort({ position: 1 }).exec(function (err, image) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, image);
            }
        });
    }], next);
};

module.exports = catalogService;