var async = require('async');
var productModel = require('../../models/ecommerce/productModel.js');
var subCategoryModel = require('../../models/ecommerce/subCategoryModel.js');
var brandModel = require('../../models/ecommerce/brandModel.js');


//
var categoryUpdateService = {};

categoryUpdateService.updateObjects = function(lastName, newName, next) {
    async.parallel([    
        function (callback) {
        productModel.update({ category: lastName }, { category: newName }, { multi: true },
                function (err, count, status) {
            if (!err) {
                next(null, count, status)
            } else {
                next(err)
            }
        });
    },        
        function(callback) {
            subCategoryModel.update({ category: lastName }, { category: newName }, { multi: true },
                function(err, count, status) {
                    if (!err) {
                        next(null, count, status)
                    } else {
                        next(err)
                    }
                });
        },
        
        function (callback) {
        brandModel.update({ category: lastName }, { category: newName }, { multi: true },
                function (err, count, status) {
            if (!err) {
                next(null, count, status)
            } else {
                next(err)
            }
        });
    }        

    ], next);

};
module.exports = categoryUpdateService;
