var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bannerSchema   = new Schema({
    titleOne: { type: String },
    titleTwo: { type: String },
    position: { type: Number },
    image: { type: String },
    uploadDate :  {type: Date, default: Date.now}
});

module.exports = bannerSchema;