var async = require('async');
var productModel = require('../../models/ecommerce/productModel.js');

var brandUpdateService = {};

brandUpdateService.updateObjects = function (lastName, newName, next) {
    async.parallel([    
        function (callback) {
        productModel.update({ brand: lastName }, { brand: newName }, { multi: true },
                function (err, count, status) {
            if (!err) {
                next(null, count, status)
            } else {
                next(err)
            }
        });
    }], next);
};
module.exports = brandUpdateService;
