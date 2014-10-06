var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema   = new Schema({

    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        index: true, required: true, unique: true
    },
    category:   {type: String},
    subcategory:{type: String},
    product:    {type: String},
    model:      {type: String},
    brand:      {type: String},
    size:       {type: String},
    price:      {type: String},
    description:{type: String},
    color :     {type: String},
    quantity:   {type: Number},
    imgPath1:   {type: String},
    uploadDate: {type: Date, default: Date.now},
    isOutlet:   {type: Boolean}
});
module.exports = productSchema;

