var mongoose = require('mongoose');
var ProductModel = require('../../models/ecommerce/productModel.js');
var categoryModel = require('../../models/ecommerce/categoryModel.js');
var brandModel = require('../../models/ecommerce/brandModel.js');
var subCategoryModel = require('../../models/ecommerce/subCategoryModel.js');


(function (databaseInitService) {
    databaseInitService.init = function (app) {
        /*
        var product = new ProductModel({
            category: 'Tenis',
            subcategory: '',
            product: 'Tenis',
            model: 'NYC',
            brand: 'Osiris',
            size: '8,7,5',
            price: '870',
            description: 'aqui va una descripción del producto',
            color: 'Rojo/negro',
            imgPath1: 'images/products/Osiris-NYC.jpg',
            quantity: 3,
            isOutlet: true
        });

        product.save(function (err, products) {
            if (err) return console.error(err);
            console.dir(products);
            return null;
        });//*/
        
        /*
 var brand = new brandModel({
 name: 'Osiris',
 category: ['Skate','Accesorios'],
 subCategory:['']
 });
 brand.save(function(err, brands) {
 if (err) return console.error(err);
 console.dir(brands);
 });//*/


        /*
         var subCategory = new subCategoryModel({
         name :  'Playeras',
         category: 'Ropa',
         ImgPath: '/images/subCategoriasRopa/Playeras.jpg'
         });
         subCategory.save(function(err, subCategories) {
         if (err) return console.error(err);
         console.dir(subCategories);
         });//*/


        /*
         var category = new categoryModel({
         name :  'Otros'
         });
         category.save(function(err, categories) {
         if (err) return console.error(err);
         console.dir(categories);
         });//*/

    };
})(module.exports);
