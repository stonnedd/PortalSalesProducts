var authSvc  = require("../../services/account/auth.js");
var BrandModel = require("../../models/ecommerce/brandModel.js");
var jqgridUtil = require("../../infrastructure/jqgrid/jqgridUtil.js");
var CatalogSvc = require("../../services/management/catalogService.js");
var brandsController = {};

brandsController.init = function (app) {
    
    app.get("/management/brands", authSvc.checkAuth, function (req, res) {
        res.render("management/brands", { user: req.user });
    });
    
    app.post("/management/brands/list", authSvc.checkAuth, function (req, res) {
        var toSelect = { _id: 1, name: 1, category: 1, subCategory: 1, uploadDate: 1};
        jqgridUtil.doQuery(req, res, BrandModel, toSelect);
    });
    
    app.get("/management/brands/upsert", authSvc.checkAuth, function (req, res) {
        CatalogSvc.getCategories(function (err, catalog) {
            if (err) {
                res.json({ msg: "No hay datos en el sistema" });
            } else {
                BrandModel.findOne({ _id: req.query.id }, function (err, brand) {
                    if (err || !brand) {
                        res.render("management/brandsUpsert", {
                            user: req.user,
                            categories: catalog[0],
                            subCategories: catalog[1]
                        });
                    } else {
                        brand.user = req.user;
                        brand.categories = catalog[0];
                        brand.subCategories = catalog[1];
                        res.render("management/brandsUpsert", brand);
                    }
                });
            }
        });
    });
    
    
    app.post("/management/brands/doUpsert", authSvc.checkAuth, function (req, res) {
        var brands = new BrandModel({
            id: req.body.id,
            name: req.body.name,
            category: req.body.categories,
            subCategory: req.body.subCategories
        });
        
        if (!req.body.id) {
            brands.save(function (err, brandSaved) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información' });
                } else {
                    res.json({ success: true });
                }
            });
        } else {
            brands = brands.toObject();
            delete brands._id;
            BrandModel.update({ _id: req.body.id }, brands, { upsert: true }, function (err) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información' });
                } else {
                    res.json({ success: true });
                }
            });
        }
    });
    
    
    app.post("/management/brands/delete", authSvc.checkAuth, function (req, res) {
        if (!req.body.id) {
            res.json({ success: false, msg: 'No se encontró la maraca para eliminar' });
        }
        
        //TODO
        //Revisar que en las otras colecciones no existe la categforía
        
        BrandModel.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) {
                res.json({ success: false, msg: 'No fue posible eliminar la marca.' });
            }
            else {
                res.json({ success: true });
            }
        });

    });
};

module.exports = brandsController;
