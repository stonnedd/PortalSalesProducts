var async = require('async');
var subCategoryModel = require('../../models/ecommerce/subCategoryModel.js');

var subCategoryService = {};

subCategoryService.getSubCategories = function (next) {
    
    async.parallel([
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
        function(callback)
    
    
    
    
    
    ], next);
};

module.exports = subCategoryService;