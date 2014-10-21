var authSvc = require("../../services/account/auth.js");
var CategoryModel = require("../../models/ecommerce/CategoryModel.js");
var jqgridUtil = require("../../infrastructure/jqgrid/jqgridUtil.js");

//
var categoriesController = {};

categoriesController.init = function (app) {
    
    app.get("/management/categories", authSvc.checkAuth, function (req, res) {
        res.render("management/categories", { user: req.user });
    });
    
    app.post("/management/categories/list", authSvc.checkAuth, function (req, res) {
        var toSelect = { _id: 1, name: 1, description: 1, uploadDate: 1, position: 1, imgPath:1};
        jqgridUtil.doQuery(req, res, CategoryModel, toSelect);
    });
    
    app.get("/management/categories/upsert", authSvc.checkAuth, function (req, res) {
        CategoryModel.findOne({ _id: req.query.id }, function (err, category) {
            if (err || !category) {
                res.render("management/categoriesUpsert", { user: req.user });
            } else {
                category.user = req.user;
                category.image = category.imgPath;
                category.imgPath = "/images/category/" + category.imgPath;  
                res.render("management/categoriesUpsert", category);
            }
        });
    });
    
    
    app.post("/management/categories/doUpsert", authSvc.checkAuth, function (req, res) {
        var category = new CategoryModel({
            id: req.body.id,
            name: req.body.name,
            position: req.body.position,
            description: req.body.description,
            imgPath: req.body.image
        });
        
        if (!req.body.id) {
            category.save(function (err, categorySaved) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información. Revise que no haya ingresado una subcategoría con el mismo nombre.' });
                } else {
                    res.json({ success: true });
                }
            });
        } else {
            category = category.toObject();
            delete category._id;
            CategoryModel.update({ _id: req.body.id }, category, { upsert: true }, function (err) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información. Revise que no haya ingresado una subcategoría con el mismo nombre.' });
                } else {
                    res.json({ success: true });
                }
            });
        }
    });
    
    
    app.post("/management/categories/delete", authSvc.checkAuth, function (req, res) {
        if (!req.body.id) {
            res.json({ success: false, msg: 'No se encontró la categoría para eliminar' });
        }
        
        //TODO
        //Revisar que en las otras colecciones no existe la categforía
        
        CategoryModel.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) {
                res.json({ success: false, msg: 'No fue posible eliminar la categoría.' });
            }
            else {
                res.json({ success: true });
            }
        });

    });

};

module.exports = categoriesController;
