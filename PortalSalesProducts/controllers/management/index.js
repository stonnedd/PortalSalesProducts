var mainController = require("./mainController");
var categoriesController = require("./categoriesController");

var controllers = {};

controllers.init = function(app) {
    mainController.init(app);
    categoriesController.init(app);
};

module.exports = controllers;