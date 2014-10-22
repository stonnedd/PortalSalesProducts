var authSvc  = require("../../services/account/auth.js");
var BrandModel = require("../../models/ecommerce/brandModel.js");
var jqgridUtil = require("../../infrastructure/jqgrid/jqgridUtil.js");
var CatalogSvc = require("../../services/management/catalogService.js");
var brandUpdateSvc = require("../../services/management/brandUpdatedService.js");

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
                            subCategories: catalog[1],
                            subCatKey: JSON.stringify([])
                        });
                    } else {
                        var subCatKey = [];
                        for (var i = 0, len = brand.subCategory.length; i < len; i++) {
                            subCatKey.push({ name: brand.subCategory[i], category: brand.category[i]});
                        }

                        brand.user = req.user;
                        brand.categories = catalog[0];
                        brand.subCategories = catalog[1];
                        brand.subCatKey = JSON.stringify(subCatKey);
                        res.render("management/brandsUpsert", brand);
                    }
                });
            }
        });
    });
    
    
    app.post("/management/brands/doUpsert", authSvc.checkAuth, function (req, res) {

        var categories = [];
        var subCategories = [];

        for (var i = 0, len = req.body.subCategories.length; i < len; i++) {
            var item = req.body.subCategories[i];
            categories.push(item.category);
            subCategories.push(item.name);
        }

        var brandNew = new BrandModel({
            id: req.body.id,
            name: req.body.name,
            category: categories,
            subCategory: subCategories
        });
        
        if (!req.body.id) {
            brands.save(function (err, brandSaved) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información. Revise que no haya ingresado una subcategoría con el mismo nombre.' });
                } else {
                    res.json({ success: true });
                }
            });
        } else {
            BrandModel.findOne({ _id: req.body.id }, { _id: 0, name: 1 }, function (err, brandOld) {
                if (err || !brandOld) {
                    res.json({ success: false, msg: 'No fue posible guardar la información. Revise que no haya ingresado una marca con el mismo nombre.' });
                    
                } else {
                    brandNew = brandNew.toObject();
                    delete brandNew._id;
                    BrandModel.update({ _id: req.body.id }, brandNew, { upsert: true }, function (err) {
                        if (err) {
                            res.json({ success: false, msg: 'No fue posible guardar la información. Revise que no haya ingresado una marca con el mismo nombre.' });
                        } else {
                            if (brandOld.name !== brandNew.name) {
                                brandUpdateSvc.updateObjects(brandOld.name, req.body.name, function (err) {
                                    if (err) {
                                        res.json({ success: false, msg: 'No fue posible actulizar la información de la marca. Revise que no haya ingresado una marca con el mismo nombre.' });
                                    } else {
                                        res.json({ success: true });
                                    }
                                });
                            } else {
                                res.json({ success: true });
                            }
                        }
                    });
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
