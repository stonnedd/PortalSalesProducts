var salesService = require("../../services/ecommerce/salesService.js");
var homeController = {};

homeController.init = function (app) {
    app.get("/", function (req, res) {
        salesService.getMenuInfo(function(err, result) {
            res.render("ecommerce/index", {
                title: "The hhd", 
                error: err, 
                categories: result[0]
            });
        });
    });
};

module.exports = homeController;
