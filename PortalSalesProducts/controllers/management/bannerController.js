var authSvc = require("../../services/account/auth.js");
var BannerModel = require("../../models/ecommerce/bannerModel.js");
var jqgridUtil = require("../../infrastructure/jqgrid/jqgridUtil.js");
var uploadCtrl = require("../../controllers/management/uploadController.js");
var bannerController = {};


bannerController.init = function (app) {

    app.get("/management/banners", authSvc.checkAuth, function (req, res) {
        res.render("management/banners", { user: req.user });
    });

    app.post("/management/banners/list", authSvc.checkAuth, function (req, res) {
        var toSelect = { _id: 1, titleOne: 1, titleTwo: 1, position: 1, image: 1, uploadDate: 1 };
        jqgridUtil.doQuery(req, res, BannerModel, toSelect);
    });

    app.get("/management/banners/upsert", authSvc.checkAuth, function (req, res) {

        BannerModel.findOne({ _id: req.query.id }, function (err, banner) {
            if (err || !banner) {
                res.render("management/bannersUpsert", { user: req.user });

            } else {
                banner.user = req.user;
                banner.image = banner.image;
                banner.imgPath = "/images/banners/" + banner.image;
                res.render("management/bannersUpsert", banner);
            }
        });
    });


    app.post("/management/banners/doUpsert", authSvc.checkAuth, function (req, res) {

        var banner = new BannerModel({
            id: req.body.id,
            titleOne: req.body.titleOne,
            titleTwo: req.body.titleTwo,
            position: req.body.position,
            image: req.body.image,
            uploadDate: req.body.uploadDate
        });

        if (!req.body.id) {
            banner.save(function (err, bannerSaved) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información' });
                } else {
                    res.json({ success: true });
                }
            });
        } else {
            banner = banner.toObject();
            delete banner._id;
            BannerModel.update({ _id: req.body.id }, banner, { upsert: true }, function (err) {
                if (err) {
                    res.json({ success: false, msg: 'No fue posible guardar la información' });
                } else {
                    res.json({ success: true });
                }
            });
        }
    });


    app.post("/management/banners/delete", authSvc.checkAuth, function (req, res) {
        if (!req.body.id) {
            res.json({ success: false, msg: 'No se encontró el banner para eliminar' });
        }
        //TODO
        //Revisar que en las otras colecciones no existe la categforía
        BannerModel.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) {
                res.json({ success: false, msg: 'No fue posible eliminar el banner.' });
            }
            else {
                res.json({ success: true });
            }
        });
    });

};

module.exports = bannerController;
