const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

// const { v4: uuidv4 } = require('uuid');
// dont do this part

// mongoose.connect(`mongodb://localhost:27017/myEcommerceWeb`, {useNewUrlParser: true, useFindAndModify: false});

const password= '1qaz2wsx'
const dbname= 'myEcommerceWeb'
mongoose.connect(`mongodb+srv://saramunir011:${password}@cluster0.df4lk.mongodb.net/${dbname}?retryWrites=true&w=majority`, {useNewUrlParser: true, useFindAndModify: false});


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