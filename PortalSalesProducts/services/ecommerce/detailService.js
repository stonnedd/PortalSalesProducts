var async = require('async');
var mongoose = require('mongoose');
var categoryModel = require('../../models/ecommerce/categoryModel.js');
var productModel = require('../../models/ecommerce/productModel.js');
var brandModel = require('../../models/ecommerce/brandModel.js');


var detailService = {};

detailService.getCatalogs = function (params, next) {
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
            productModel.findById(mongoose.Types.ObjectId(params.id)).select({ _id: 0, uploadDate: 0 }).exec(function (err, product) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, product);
                }
            });
        },
        function (callback) {
            brandModel.find({ category: params.category }).select({ _id: 0, name: 1 }).sort('name').exec(function (err, brands) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, brands);
                }
            });
        }], next);
};

module.exports = detailService;