var async = require('async');
var mongoose = require('mongoose');
var productModel = require('../../models/ecommerce/productModel.js');
var emailSvc = require('./emailService.js');

var confirmService = {};

confirmService.doConfirm = function(params, next) {
    productModel.findById(mongoose.Types.ObjectId(params.id)).select({ _id: 0, uploadDate: 0 }).exec(function (err, product) {
        if (err) {
            next("No se encontró el producto");
        } else {
            emailSvc.sendConfirmation(params, product, function (error) {
                if (error) {
                    next("No fue posible enviar el correo. Por favor intente del nuevo");
                } else {
                    next();
                }
            })
        }
    })
}

module.exports = confirmService;