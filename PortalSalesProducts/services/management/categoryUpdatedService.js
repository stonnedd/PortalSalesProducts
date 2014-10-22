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
        brandModel.find({ category: lastName }).select({ _id: 1, category: 1 }).exec(function (err, brands) {
            if (!err) {
                for (var j = 0; j < brands.length; j++) {
                    var brand = brands[j];
                    for (var i = 0; i < brand.category.length; i++) {
                        if (brand.category[i] === lastName) {
                            brand.category[i] = newName;
                        }
                    }
                    brandModel.update({ _id: brand.id }, { category: brand.category }, function (err, count, s) {
                        console.log(err);
                    });
                }
            } else {
                next(err);
            }
        });
    }], next);

};
module.exports = categoryUpdateService;
