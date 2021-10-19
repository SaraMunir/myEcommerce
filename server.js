require('dotenv').config(); // --> process.env
const multer  = require('multer');
const express = require( 'express' );
const fs = require('fs');
const path = require("path");
const orm = require( './db/orm.mongoose' );
  
// const { kMaxLength } = require('buffer');
const PORT = process.env.PORT || 8080;
const app = express();
var server = app.listen( PORT, function(){ console.log( `[myEcommerceWebsite], http://localhost:${PORT}` ); });

app.use( express.static(path.join(__dirname, 'build'))) ;
app.use(express.static(path.join(__dirname, "client/src/components/WomensWear")));
app.use(express.static(path.join(__dirname, "client/src/components/WomensWear/women")));
app.use(express.static(path.join(__dirname, "client/src/components/assets/productImages/women")));
app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );
const upload = require('multer')({ dest: 'build/uploads/' });


app.get('/api/loadAll', async( req,res) => {
  const category = req.params.category;
    const all = JSON.parse( fs.readFileSync( "./productData.json" ) );
    res.send( all );
  });
app.get('/api/Women/:category', async( req,res) => {
  const category = req.params.category;
    const womens = JSON.parse( fs.readFileSync( "./productData.json" ) );
    let womensArr=[]
    womens.map(women=>{
      if(women.typeOf==="Women" && women.category===category){
        womensArr.push(women)
      }
    })
    res.send( womensArr );
  });
app.get('/api/Men/:category', async( req,res) => {
  const category = req.params.category;
    const mens = JSON.parse( fs.readFileSync( "./productData.json" ) );
    let mensArr=[]
    mens.map(men=>{
      if(men.typeOf==="Men" && men.category===category){
        mensArr.push(men)
      }
    })
    res.send( mensArr );
  });
app.post('/api/postOrder', async function( req,res ){
  const orderObj = req.body;
  const postOrder = await orm.postOrder( orderObj );
  res.send(postOrder);
})
app.post('/api/newProduct', async function( req,res ){
  const newProductObj = req.body;
  const postNewProduct = await orm.postNewProduct( newProductObj );
  res.send(postNewProduct);
})
app.post('/api/newColor', async function( req,res ){
  const newColorObj = req.body;
  const postNewColor = await orm.postNewColor( newColorObj );
  res.send(postNewColor);
})

//fetching order Number:
app.get('/api/orderNumber/:ordernumber', async(req, res) => {
  const ordernumber = req.params.ordernumber;
  const getOrderNumber = await orm.getOrderNumber( ordernumber );
  res.json( getOrderNumber );
})
//fetching order Number:
app.get('/api/laodProducts/:type', async(req, res) => {
  const type = req.params.type;
  const loadProducts = await orm.loadProducts( type );
  res.json( loadProducts );
})
//fetching order Number:
app.get('/api/productDetail/:productId', async(req, res) => {
  const productId = req.params.productId;
  const  getProductDetail= await orm.getProductDetail( productId );
  res.json( getProductDetail );
})
app.get('/api/getColors/:productId', async(req, res) => {
  const productId = req.params.productId;
  const  getColors= await orm.getColors( productId );
  res.json( getColors );
})
app.post('/api/user/signUp', async function( req,res ){
  const userData = req.body;
  const registerUser = await orm.registerUser( userData );
  res.send(registerUser);
})
app.post('/api/colorSizes', async function( req,res ){
  const colorSizeData = req.body;
  const colorSize = await orm.colorSize( colorSizeData );
  res.send(colorSize);
})


//fetching order Number:
app.get('/api/AdminInfo', async(req, res) => {
  const fetchAdminInfo = await orm.fetchAdminInfo();
  res.json( fetchAdminInfo );
})
//Login
app.post('/api/user/login', async function( req,res ){
  const userData = req.body;
  const loginResult = await orm.loginUser( userData.email, userData.password );
  // console.log('in server loginResult: ', loginResult)
  // loginResult.rememberMe = req.body.rememberMe;
  res.send( loginResult );
});

app.put( '/api/uploadImages/:colorId', upload.single('myFile'), async function( req, res ){
  let colorId = req.params.colorId
  const filePath = req.file.path;
  const originalName = req.file.originalname;
  
  const fileExt = originalName.toLowerCase().substr((originalName.lastIndexOf('.'))).replace('jpeg','jpg');
  fs.renameSync( `${__dirname}/${filePath}`, `${__dirname}/${filePath}${fileExt}` );
  const imageUrl = req.file.path.replace(/\\/g, '/').replace('build/','/')+fileExt;
  const imgUploadDb = await orm.addColorImages( colorId, imageUrl );
  res.send( imgUploadDb );
});
app.put( '/api/uploadThmbImage/:colorId', upload.single('myFile'), async function( req, res ){
  let colorId = req.params.colorId
  const filePath = req.file.path;
  const originalName = req.file.originalname;
  
  const fileExt = originalName.toLowerCase().substr((originalName.lastIndexOf('.'))).replace('jpeg','jpg');
  fs.renameSync( `${__dirname}/${filePath}`, `${__dirname}/${filePath}${fileExt}` );
  const imageUrl = req.file.path.replace(/\\/g, '/').replace('build/','/')+fileExt;
  const imgUploadDb = await orm.addColorThmbImages( colorId, imageUrl );
  res.send( imgUploadDb );
});

app.post('/api/deleteImage', async function( req,res ){
  const imageSrc = req.body;
  const path = `build/${imageSrc.img}`
      fs.unlink(path, (err) => {
          if (err) {
          console.error(err)
          return
          }
          //file removed
        })
        const deleteImage = await orm.deleteImage( imageSrc );
        res.send({ message: `Thank you, updated` });
})
app.post('/api/deleteThmbImage', async function( req,res ){
  const imageSrc = req.body;
  const path = `build/${imageSrc.img}`
      fs.unlink(path, (err) => {
          if (err) {
          console.error(err)
          return
          }
          //file removed
        })
        const deleteThmbImage = await orm.deleteThmbImage( imageSrc );
        res.send({ message: `Thank you, updated` });
})


app.get('/*', function( req,res ){
    console.log("redirect to index page!");
    res.sendFile( path.join(__dirname, 'build', 'index.html') );
});