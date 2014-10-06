var authSvc = require("../../services/account/auth.js");

var mainController = {};

mainController.init = function (app) {
    app.get("/management/index",
        authSvc.checkAuth,
        function (req, res) {
        res.render("management/index", {user: req.user});
    });
};

module.exports = mainController;
