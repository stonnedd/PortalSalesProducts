var hasher = require("./hasher");
var UserModel = require('../../models/account/userModel.js');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var auth = {};
auth.registerAdmin = function () {
    var salt = hasher.createSalt();
    var user = new UserModel({        
        username : 'administrator',
        passwordHash: hasher.computeHash("admin123", salt),
        salt: salt,
        fullName: 'Administrador principal'
    });
    user.save();
};

auth.userVerify = function (username, password, next) {
    UserModel.findOne({ username: username }, function (err, user) {
        if (!err && user) {
            var testHash = hasher.computeHash(password, user.salt);
            if (testHash === user.passwordHash) {
                next(null, {username: user.username, fullName: user.fullName});
                return;
            }
        }
        next({ message: "El usuario y/o contraseña son incorrectos." });
    });
};

auth.setup = function(app) {
    // setup passport authentication
    passport.use(new LocalStrategy(auth.userVerify));
    passport.serializeUser(function (user, next) {
        next(null, user.username);
    });
    passport.deserializeUser(function (key, next) {
        UserModel.findOne({ username: key }, function (err, user) {
            if (err || !user) {
                next(null, false, { message: "No se encontró al usuario" });
            } else {
                next(null, { username: user.username, fullName: user.fullName });
            }
        });
    });
    app.use(passport.initialize());
    app.use(passport.session());
};

auth.checkAuth = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/management/login");
    }
};

auth.passport = passport;

module.exports = auth;