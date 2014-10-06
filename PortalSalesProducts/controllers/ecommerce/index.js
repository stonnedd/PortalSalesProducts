var homeController = require("./homeController");

var controllers = {};

controllers.init = function(app) {
    homeController.init(app);
};

module.exports = controllers;