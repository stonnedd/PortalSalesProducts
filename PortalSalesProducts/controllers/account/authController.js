var authSvc = require("../../services/account/auth.js");
var hasher = require("../../services/account/hasher.js");

var authController = {};

authController.init = function (app) {

    authSvc.setup(app);

    app.get("/management/login", function (req, res) {
        res.render("account/login", {});
    });
    
    app.post("/management/doLogin", function (req, res) {
        var authFunction = authSvc.passport.authenticate("local", function (err, user) {
            if (err) {
                res.json({ msg: err.message, success: false });
            } else {
                req.logIn(user, function (inErr) {
                    if (inErr) {
                        res.json({ msg: err.message, success: false });
                    } else {
                        res.json({ msg: "", success: true, urlToGo: "/management/index" });
                    }
                });
            }
        });

        authFunction(req, res);
    });
};

module.exports = authController;
