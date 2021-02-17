const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

// const { v4: uuidv4 } = require('uuid');
mongoose.connect(`mongodb://localhost:27017/myEcommerceWeb`, {useNewUrlParser: true, useFindAndModify: false});

const db = require( './models' );
const e = require('express');


async function postOrder( orderData ){
    const dbOrder = new db.orderNo( orderData );
    const postOrder = await dbOrder.save();
    return { 
        postOrder 
    };
}
async function getOrderNumber( orderNumber ){
    const getOrderNumber = await db.orderNo.findOne({
        "_id" : orderNumber
    })
    return getOrderNumber
}

module.exports = {
    postOrder,
    getOrderNumber
}