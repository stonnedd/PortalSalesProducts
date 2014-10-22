var async = require('async');
var productModel = require('../../models/ecommerce/productModel.js');
var brandModel = require('../../models/ecommerce/brandModel.js');
var subCategoryUpdateService = {};

subCategoryUpdateService.updateObjects = function (lastName, newName, next) {
    async.parallel([    
        function (callback) {
            productModel.update({ subcategory: lastName }, { subcategory: newName }, { multi: true },
                    function (err, count, status) {
                if (!err) {
                    next(null, count, status)
                } else {
                    next(err)
                }
            });
        },        
        
        function (callback) {
            brandModel.find({ subCategory: lastName }).select({ _id: 1, subCategory: 1 }).exec(function(err, subCategories) {
            if (!err) {
                for (var j = 0; j < subCategories.length; j++) {
                    var subCat = subCategories[j];
                    for (var i = 0; i < subCat.subCategory.length; i++) {
                        var cat = subCat.subCategory[i];
                            if (cat === lastName) {
                                subCat.subCategory[i] = newName;
                            }
                    }
                    brandModel.update({_id:subCat.id},{subCategory: subCat.subCategory });
                }   
            } else {
                next(err);
            }
            });
                    
        }], next);
};
module.exports = subCategoryUpdateService;
