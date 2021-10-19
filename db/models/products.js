const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let product = new Schema ({
    typeOf: String,
    category: String,
    name: String,
    price: Number,
    rating: Number,
    mainImg: String,
    colours: [
        {
            name: String,
            sizes: [
                {
                    size: {type: String,},
                    qty: {type: Number,default: 50}
                }
            ], 
            imgSrc: [
                {type: String}
            ]
        }
    ]
}, {
        timestamps: true
});

module.exports = mongoose.model('product', product);
