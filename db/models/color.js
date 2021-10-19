const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let color = new Schema ({
    productId: String,
    name: String,
    thumbImg: String,
    sizes: [
        {
            size: {type: String,},
            qty: {type: Number}
        }
    ], 
    imgSrc: [
        {type: String}
    ]

}, {
        timestamps: true
});

module.exports = mongoose.model('color', color);
