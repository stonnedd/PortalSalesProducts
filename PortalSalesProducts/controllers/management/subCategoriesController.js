var authSvc = require("../../services/account/auth.js");
var subCategoryModel = require("../../models/ecommerce/subCategoryModel.js");
var jqgridUtil = require("../../infrastructure/jqgrid/jqgridUtil.js");
var CatalogSvc = require("../../services/management/catalogService.js");
var uploadCtrl = require("../../controllers/management/uploadController.js");
var subCategoryUpdateSvc = require("../../services/management/subCategoryUpdatedService.js");

var subCategoriesController = {};


subCategoriesController.init = function (app, categories) {
    
    app.get("/management/subCategories", authSvc.checkAuth, function (req, res) {
        res.render("management/subCategories", { user: req.user });
    });
    
    app.post("/management/subCategories/list", authSvc.checkAuth, function (req, res) {
        var toSelect = { _id: 1, name: 1, category: 1, imgPath: 1, uploadDate: 1 };
        jqgridUtil.doQuery(req, res, subCategoryModel, toSelect);
    });
    
    app.get("/management/subCategories/upsert", authSvc.checkAuth, function (req, res) {
        
        CatalogSvc.getCategories(function (err, result) {
            if (err) {
                res.json({ msg: "No hay datos en el sistema" });
            } else {
                subCategoryModel.findOne({ _id: req.query.id }, function (err2, subCategory) {
                    if (err2 || !subCategory) {
                        
                        res.render("management/subCategoriesUpsert", { user: req.user, categories: result[0] });
                    
                    } else {
                        subCategory.user = req.user;
                        subCategory.categories = result[0];
                        subCategory.image = subCategory.imgPath;
                        subCategory.imgPath = "/images/subCategory/" + subCategory.imgPath;
                        res.render("management/subCategoriesUpsert", subCategory);
                    }
                });
            }
        });
    });
    
    
    app.post("/management/subcategories/doUpsert", authSvc.checkAuth, function (req, res) {
        
        var subCategoryNew = new subCategoryModel({
            id: req.body.id,
            name: req.body.name,
            category: req.body.category.name,
            imgPath: req.body.image,
            uploadDate: req.body.uploadDate
        });
        
        if (!req.body.id) {
            subCategoryNew.save(function (err, subCategorySaved) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información. Revise que no haya ingresado una subcategoría con el mismo nombre.' });
                } else {
                    res.json({ success: true });
                }
            });
        } else {
            subCategoryModel.findOne({ _id: req.body.id }, { _id: 0, name: 1 }, function (err, subCategoryOld) {
                if (err || !subCategoryOld) {
                    res.json({ success: false, msg: 'No fue posible guardar la información. Revise que no haya ingresado una categoría con el mismo nombre.' });
                } else {
                    subCategoryNew = subCategoryNew.toObject();
                    delete subCategoryNew._id;
                    subCategoryModel.update({ _id: req.body.id }, subCategoryNew, { upsert: true }, function (err) {
                        if (err) {
                            res.json({ success: false, msg: 'No fue posible guardar la información. Revise que no haya ingresado una subcategoría con el mismo nombre.' });
                        } else {
                            if (subCategoryOld.name !== subCategoryNew.name) {
                                subCategoryUpdateSvc.updateObjects(subCategoryOld.name, req.body.name, function (err) {
                                    if (err) {
                                        res.json({ success: false, msg: 'No fue posible actulizar la información. Revise que no haya ingresado un con el mismo nombre.' });
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
    
    
    
    app.post("/management/subcategories/delete", authSvc.checkAuth, function (req, res) {
        if (!req.body.id) {
            res.json({ success: false, msg: 'No se encontró la categoría para eliminar' });
        }
        
        //TODO
        //Revisar que en las otras colecciones no existe la categforía
        
        subCategoryModel.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) {
                res.json({ success: false, msg: 'No fue posible eliminar la categoría.' });
            }
            else {
                res.json({ success: true });
            }
        });

    });

};

module.exports = subCategoriesController;
