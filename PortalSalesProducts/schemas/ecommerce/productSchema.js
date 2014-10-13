var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema   = new Schema({

    name: { type: String },
    category: { type: String },
    subcategory:{type: String},
    model:      {type: String},
    brand:      {type: String},
    size:       {type: String},
    price:      {type: Number},
    description:{type: String},
    color :     {type: String},
    quantity:   {type: Number},
    imgPath:   {type: String},
    uploadDate: {type: Date, default: Date.now},
    isOutlet:   {type: Boolean}
});
module.exports = productSchema;

