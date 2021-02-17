const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let orderNo = new Schema ({
    firstName : { 
        type: String,
        trim: true,
        required: true
    },
    lastName : { 
        type: String,
        trim: true,
        required: true
    },
    emailAddress : { 
        type: String,
        trim: true,
        required: true
    },
    phoneNumber : { 
        type: String,
        trim: true,
        required: true
    },
    shippingAddress : {
        address1: {
            type: String
        },
        address2: {
            type: String
        },
        city: {
            type: String
        },
        province: {
            type: String
        },
        postalCode: {
            type: String
        }
    },
    billingAddress : {
        address1: {
            type: String
        },
        address2: {
            type: String
        },
        city: {
            type: String
        },
        province: {
            type: String
        },
        postalCode: {
            type: String
        }
    },
    shoppingCartItems : [
        {
            typeOf: String,
            category: String,
            id: String,
            productName: String,
            productColor: String,
            productColorId: String,
            size: String,
            price: String,
            mainImg: String,
            quantity: Number
        }
    ],
    basePrice: {
        type: String
    }, 
    taxes: {
        type: String
    }, 
    shipping: {
        type: String
    },
    totalPrice: {
        type: String
    },
}, {
        timestamps: true
});

module.exports = mongoose.model('orderNo', orderNo);
