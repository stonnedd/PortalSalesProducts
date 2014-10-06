(function (controllers) {
    var databaseInitService = require("./databaseInitService");
    controllers.init = function (app) {
        databaseInitService.init(app);
    };
})(module.exports);