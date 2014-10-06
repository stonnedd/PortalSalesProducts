var authController = require("./authController");

var controllers = {};

controllers.init = function(app) {
    authController.init(app);
};

module.exports = controllers;