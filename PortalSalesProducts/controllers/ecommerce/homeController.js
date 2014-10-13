var salesService = require("../../services/ecommerce/salesService.js");
var catalogSvc = require("../../services/ecommerce/catalogService.js");

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
    
    app.get("/index", function (req, res) {
        salesService.getMenuInfo(function (err, result) {
            res.render("ecommerce/index", {
                title: "The hhd", 
                error: err, 
                categories: result[0]
            });
        });
    });
    
    
    app.get('/:category', function (req, res) {
        catalogSvc.getCatalogs(req.params.category, function(err, catalog) {
            res.render('ecommerce/categoriesMenu', {
                title: req.params.category,
                categories: catalog[0],
                subCategories: catalog[1],
                brands: catalog[2],
                title: req.params.category
            });
        })
    })
    
};





module.exports = homeController;
