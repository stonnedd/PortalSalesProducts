var authSvc = require("../../services/account/auth.js");
var SubCategoryModel = require("../../models/ecommerce/subCategoryModel.js");
var jqgridUtil = require("../../infrastructure/jqgrid/jqgridUtil.js");
var CatalogSvc = require("../../services/management/catalogService.js");
var uploadCtrl = require("../../controllers/management/uploadController.js");
var subCategoriesController = {};


subCategoriesController.init = function (app,categories) {
    
    app.get("/management/subCategories", authSvc.checkAuth, function (req, res) {
        res.render("management/subCategories", { user: req.user });
    });
    
    app.post("/management/subCategories/list", authSvc.checkAuth, function (req, res) {
        var toSelect = { _id: 1, name: 1, category: 1, imgPath: 1, uploadDate: 1 };
        jqgridUtil.doQuery(req, res, SubCategoryModel, toSelect);
    });
    
    app.get("/management/subCategories/upsert", authSvc.checkAuth, function (req, res) {
        
        CatalogSvc.getCategories(function (err, result) {
            if (err) {
                res.json({ msg: "No hay datos en el sistema" });
            } else {
                SubCategoryModel.findOne({ _id: req.query.id }, function (err2, subCategory) {
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
        
        var subCategory = new SubCategoryModel({
            id: req.body.id,
            name: req.body.name,
            category: req.body.category.name,
            imgPath: req.body.image,
            uploadDate: req.body.uploadDate
        });
        
        if (!req.body.id) {
            subCategory.save(function (err, subCategorySaved) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información' });
                } else {
                    res.json({ success: true });
                }
            });
        } else {
            subCategory = subCategory.toObject();
            delete subCategory._id;
            SubCategoryModel.update({ _id: req.body.id }, subCategory, { upsert: true }, function (err) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información' });
                } else {
                    res.json({ success: true });
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
        
        SubCategoryModel.findOneAndRemove({ _id: req.body.id }, function (err) {
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
