var authSvc = require("../../services/account/auth.js");
var ProductModel = require("../../models/ecommerce/productModel.js");
var jqgridUtil = require("../../infrastructure/jqgrid/jqgridUtil.js");
var CatalogSvc = require("../../services/management/catalogService.js");
var productsController = {};

productsController.init = function (app) {
    
    
    app.get("/management/products", authSvc.checkAuth, function (req, res) {
        res.render("management/products", { user: req.user });
    });
    
    app.post("/management/products/list", authSvc.checkAuth, function (req, res) {
        var toSelect = {
                    _id: 1, 
                    category: 1,
                    subcategory: 1,
                    name: 1,
                    model: 1,
                    brand: 1,
                    size: 1,
                    price: 1,
                    description: 1,
                    color : 1,
                    quantity:1,
                    imgPath1: 1,
        };
        jqgridUtil.doQuery(req, res, ProductModel, toSelect);
    });
    
    
    app.get("/management/products/upsert", authSvc.checkAuth, function (req, res) {
        CatalogSvc.getCategories(function (err, catalog) {
            if (err) {
                res.json({ msg: "No hay datos en el sistema" });
            } else {
                ProductModel.findOne({ _id: req.query.id }, function (err, product) {
                    if (err || !product) {
                        res.render("management/productsUpsert", {
                            user: req.user,
                            categories: catalog[0],
                            subCategories: catalog[1],
                            brands: catalog[2]
                        });
                    } else {
                        product.user = req.user;
                        product.categories = catalog[0];
                        product.subCategories = catalog[1];
                        product.brands = catalog[2];
                        res.render("management/productsUpsert", product);
                    }
                });
            }
        });
    });
    
    
    app.post("/management/products/doUpsert", authSvc.checkAuth, function (req, res) {
        
        var product = new ProductModel({
            name: req.body.name,
            category: req.body.category.name,
            subcategory: req.body.subCategory.name,
            model: req.body.model,
            brand: req.body.brand.name,
            size: req.body.size,
            price: req.body.price,
            description: req.body.description,
            color : req.body.color,
            quantity: req.body.quantity,
            imgPath: req.body.image,
            isOutlet: req.body.isOutlet
        });
        
        if (!req.body.id) {
            product.save(function (err, productSaved) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información' });
                } else {
                    res.json({ success: true });
                }
            });
        } else {
            product = product.toObject();
            delete product._id;
            ProductModel.update({ _id: req.body.id }, product, { upsert: true }, function (err) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información' });
                } else {
                    res.json({ success: true });
                }
            });
        }
    });
    
    
    app.post("/management/products/delete", authSvc.checkAuth, function (req, res) {
        if (!req.body.id) {
            res.json({ success: false, msg: 'No se encontró el producto para eliminar' });
        }
        
        //TODO
        //Revisar que en las otras colecciones no existe la categforía
        
        ProductModel.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) {
                res.json({ success: false, msg: 'No fue posible eliminar el producto.' });
            }
            else {
                res.json({ success: true });
            }
        });

    });

};

module.exports = productsController;
