const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

// const { v4: uuidv4 } = require('uuid');
// dont do this part upward

mongoose.connect(`mongodb://localhost:27017/myEcommerceWeb`, {useNewUrlParser: true, useFindAndModify: false});

// const password= '1qaz2wsx'
// const dbname= 'myEcommerceWeb'
// mongoose.connect(`mongodb+srv://saramunir011:${password}@cluster0.df4lk.mongodb.net/${dbname}?retryWrites=true&w=majority`, {useNewUrlParser: true, useFindAndModify: false});

const db = require( './models' );
const e = require('express');

async function postOrder( orderData ){
    const dbOrder = new db.orderNo( orderData );
    const postOrder = await dbOrder.save();
    return { 
        postOrder 
    };
}
async function postNewProduct( productData ){
    const dbNewProduct = new db.products( productData );
    const postNewProduct = await dbNewProduct.save();
    return { 
        postNewProduct 
    };
}
async function postNewColor( colorData ){
    const dbNewColor = new db.color( colorData );
    const postNewColor = await dbNewColor.save();
    return { 
        postNewColor 
    };
}
async function colorSize( colorData ){
    colorId = colorData.colorId;
    let colorArr = [
        {size: "xs",qty: colorData.xs, }, 
        {size: "s",qty: colorData.s}, 
        {size: "m",qty: colorData.m}, 
        {size: "l",qty: colorData.l},
        {size: "xl",qty: colorData.xl}
    ]
    const postColorSize = await db.color.findOneAndUpdate(
        { _id: colorId},
        { "$push": {sizes: colorArr}}
    );
    return { 
        postColorSize 
    };
}
async function getOrderNumber( orderNumber ){
    const getOrderNumber = await db.orderNo.findOne({
        "_id" : orderNumber
    })
    return getOrderNumber
}
async function fetchAdminInfo( ){
    const adminInfo = await db.adminInfo.findOne({
        "category" : "Admin"
    })
    return adminInfo
}
async function loadProducts( type ){
    const loadProducts = await db.products.find({
        "typeOf" : type
    })
    return loadProducts
}
async function getColors( productId ){
    const loadColors = await db.color.find({
        "productId" : productId
    })
    return loadColors
}
async function getProductDetail( id ){
    const loadProductDetail = await db.products.findOne({
        "_id" : id
    })
    return loadProductDetail
}
async function registerUser( userData ){
    console.log('in orm : ', userData)
    if( !userData.password || !userData.adminName || !userData.adminEmail ){
        return { message: "Invalid user data", id: "", name: "" };
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);    
    const saveData = {
        adminName: userData.adminName,
        adminEmail: userData.adminEmail,
        category: "Admin",
        password: passwordHash
    };
    const dbAdmin = new db.adminInfo( saveData );
    const saveAdmin = await dbAdmin.save();
    return { 
        message: "Admin successfully saved", 
        id: saveAdmin._id,
        adminEmail: saveAdmin.adminEmail,
        adminName: saveAdmin.adminName 
    };
}

async function loginUser( email, password ) {
    const userData = await db.adminInfo.findOne({ adminEmail
        : email });
    if( !userData ) {
        return { error: "Couldn't find that email. Register or try again!" };
    }
    const isValidPassword = await bcrypt.compare( password, userData.password );
    if( !isValidPassword ) {
        return { error: "Invalid password" };
    }
    // remap the data into the specified fields as we are using camelCase
    console.log("in orm Logged userData: ", userData)
    return {
        message: "user successfully loggedin",
        id: userData._id,
        name: userData.adminName,
        email: userData.adminEmail,
    };
}
//uploading image
async function addColorImages( colorId, imageUrl ){
    // const dbResult = await db.members.findOneAndUpdate(
    //     {_id: colorId}, {"$set": imageData});
        const colorImgs = await db.color.findOneAndUpdate(
            { _id: colorId},
            { "$push": {imgSrc: imageUrl}}
        );
    return { message: `Thank you, updated` }
}
async function deleteImage( imgObj ){
    // const dbResult = await db.members.findOneAndUpdate(
    //     {_id: colorId}, {"$set": imageData});

        const colorImgs = await db.color.findOneAndUpdate(
            { _id: imgObj.colorId},
            { "$pull": {imgSrc: imgObj.img}}
        );
    return { message: `Thank you, deleted` }
}
async function deleteThmbImage( imgObj ){
    // const dbResult = await db.members.findOneAndUpdate(
    //     {_id: colorId}, {"$set": imageData});

        const colorImgs = await db.color.findOneAndUpdate(
            { _id: imgObj.colorId},
            { "$unset": {thumbImg: imgObj.img}}
        );
    return { message: `Thank you, deleted` }
}
async function addColorThmbImages( colorId, imageUrl ){
    // const dbResult = await db.members.findOneAndUpdate(
    //     {_id: colorId}, {"$set": imageData});
        const postColorSize = await db.color.findOneAndUpdate(
            { _id: colorId},
            { "$set": {thumbImg: imageUrl}}
        );
    return { message: `Thank you, updated` }
}

module.exports = {
    postOrder,
    getOrderNumber,
    registerUser,
    fetchAdminInfo,
    loginUser,
    postNewProduct,
    loadProducts,
    getProductDetail,
    postNewColor,
    getColors,
    colorSize,
    addColorImages,
    addColorThmbImages,
    deleteImage,
    deleteThmbImage
}