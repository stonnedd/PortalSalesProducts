var salesService = require("../../services/ecommerce/salesService.js");
var catalogSvc = require("../../services/ecommerce/catalogService.js");
var productSvc = require("../../services/ecommerce/productService.js");
var detailSvc = require("../../services/ecommerce/detailService.js");
var brandSvc = require("../../services/ecommerce/brandService.js");
var tenisSvc = require("../../services/ecommerce/tenisService.js");
var outletSvc = require("../../services/ecommerce/outletService.js");
var categoryModel = require('../../models/ecommerce/categoryModel.js');
var confirmSvc = require("../../services/ecommerce/confirmService.js");

var homeController = {};

homeController.init = function (app) {
    
    app.get('/outlet', function (req, res) {
        req.params.page = req.query.page;
        outletSvc.getCatalogs(req.params,function (err, catalog) {
            res.render('ecommerce/products', {
                categories: catalog[0],
                products: JSON.stringify(catalog[1].products),
                page: catalog[1].page,
                total: catalog[1].total,
                totalPage: parseInt(catalog[1].total / catalog[1].rows + (catalog[1].total % catalog[1].rows === 0 ? 0 : 1)),
                rows: catalog[1].rows,
                brands:catalog[2],
                title: "OUTLET",
                category: "Outlet"
                
            });
        })
    })
    
    app.get('/contact', function (req, res) {
        categoryModel.find().select({ _id: 0, name: 1 }).sort({ position: 1 }).exec(function(err, categories) {
            res.render('ecommerce/contact', {
                categories: categories,
                title: "Contacto"
            });
        });
    })    
    
    app.get('/category/:category', function (req, res) {
        catalogSvc.getCatalogs(req.params.category, function(err, catalog) {
            res.render('ecommerce/categoriesMenu', {
                categories: catalog[0],
                subCategories: catalog[1],
                brands: catalog[2],
                title: req.params.category,
                catImage: catalog[3].imgPath
        });
        })
    })
    

    app.get('/category/:category/:subCategory', function (req, res) {
        req.params.page = req.query.page;
        productSvc.getCatalogs(req.params, function (err, catalog) {
            res.render('ecommerce/products', {  
                categories: catalog[0],
                products: JSON.stringify(catalog[1].products),
                page: catalog[1].page,
                total: catalog[1].total,
                totalPage: parseInt(catalog[1].total / catalog[1].rows + (catalog[1].total % catalog[1].rows === 0 ? 0 : 1)),
                rows: catalog[1].rows,
                brands: catalog[2],
                title: req.params.subCategory,
                category: req.params.category
            });
        })
    })

    app.get('/search/:category/brand/:brand', function (req, res) {
        req.params.page = req.query.page;
        brandSvc.getCatalogs(req.params, function (err, catalog) {
            res.render('ecommerce/products', {
                categories: catalog[0],
                products: JSON.stringify(catalog[1].products),
                page: catalog[1].page,
                total: catalog[1].total,
                totalPage: parseInt(catalog[1].total / catalog[1].rows + (catalog[1].total % catalog[1].rows === 0 ? 0 : 1)),
                rows: catalog[1].rows,
                brands: catalog[2],
                title: req.params.category + '| ' + '|' + req.params.brand,
                category: req.params.category
            });
        })
    })

    app.get('/category/:category/detail/:id', function (req, res) {
        detailSvc.getCatalogs(req.params, function (err, catalog) {
            res.render('ecommerce/detail', {
                categories: catalog[0],
                product: catalog[1],
                brands: catalog[2],
                title: req.params.subCategory,
                category: req.params.category,
                stringId: req.params.id
            });
        })
    })

    app.post('/confirmPurchase', function(req, res) {
        confirmSvc.doConfirm(req.body, function(err) {
            if (err) {
                res.json({ msg: "No fue posible confirmar el pedido debido a:" + err, success: false });
            } else {
                res.json({ success: true });
            }
        })
    })
    
    app.get("/", function (req, res) {
        salesService.getMenuInfo(function (err, result) {
            res.render("ecommerce/index", {
                error: err, 
                categories: result[0],
                banners: result[1]
            });
        });
    });
    
    app.get("/index", function (req, res) {
        salesService.getMenuInfo(function (err, result) {
            res.render("ecommerce/index", {
                error: err, 
                categories: result[0],
                banners: result[1]
            });
        });
    });

};
module.exports = homeController;
