var async = require('async');
var categoryModel = require('../../models/ecommerce/categoryModel.js');

var salesService = {};

salesService.getMenuInfo = function (next) {
    async.parallel([
        function (callback) {
        categoryModel.find({}, {_id:0, name:1}, function(err, categories) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, categories);
            }
        });
    }], next);
};

module.exports = salesService;