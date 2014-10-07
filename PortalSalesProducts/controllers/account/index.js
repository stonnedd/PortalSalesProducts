var authController = require("./authController");
//Controlador
var controllers = {};

controllers.init = function(app) {
    authController.init(app);
};

module.exports = controllers;