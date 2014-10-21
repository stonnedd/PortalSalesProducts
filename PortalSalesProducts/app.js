
/**
 * Module dependencies.
 */
var express = require('express');
var ctrlEcommerce = require("./controllers/ecommerce");
var ctrlAccount = require("./controllers/account");
var ctrlManagement = require("./controllers/management");
var svcDatabase = require("./services/database");
var svcAuth = require("./services/account/auth.js");
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.session({ secret: "keyboard cat" }));
app.use(express.bodyParser());
ctrlAccount.init(app);
app.use(express.methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://localhost/Ecommerce');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

ctrlEcommerce.init(app);
svcDatabase.init(app);
ctrlManagement.init(app,__dirname);
//svcAuth.registerAdmin();

app.use(function(req, res) {
    res.redirect("/");
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
