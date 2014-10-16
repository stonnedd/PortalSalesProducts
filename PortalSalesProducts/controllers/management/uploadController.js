var fs = require('fs');
var express = require('express');
var path = require('path');
var util = require('util');
var uploadController = {};
var uuid = require('../../utils/uuid.js');

uploadController.init = function (app, dirname) {
     
    app.post('/upload', function (req, res) {
        var files = util.isArray(req.files.file) ? req.files.file : [req.files.file];
        console.log(files);
        files.forEach(function (file) {
            var pathExtension;
            switch (req.body.upType) {
                case "1":
                    pathExtension = '/subCategory';
                    break;
                case "2":
                    pathExtension = '/products';
                    break;
                case "4":
                    pathExtension = '/banners';
                    break;                
            default: 
                    pathExtension = '/';
            }
            var fileExt = file.name.split('.').pop();
            var uploadPath = path.resolve(dirname + '/public/images' + pathExtension);
            var newName = uuid.generate() + "." + fileExt;
            fs.rename(file.path, path.resolve(uploadPath, newName), function (err) {
                if (err)
                    throw err;
                fs.unlink(file.path, function () {
                    if (err) throw err;
                });
                
                res.json({ realName: newName, src: "/images" + pathExtension});
            });
        });
        //res.contentType('text/html');
    });

};
module.exports = uploadController;