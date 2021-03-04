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

app.get('/api/loadAll', async( req,res) => {
  const category = req.params.category;
    const all = JSON.parse( fs.readFileSync( "./productData.json" ) );
    // let womensArr=[]
    // womens.map(women=>{
    //   if(women.typeOf==="Women" && women.category===category){
    //     womensArr.push(women)
    //   }
    // })
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

//fetching order Number:
app.get('/api/orderNumber/:ordernumber', async(req, res) => {
  const ordernumber = req.params.ordernumber;
  const getOrderNumber = await orm.getOrderNumber( ordernumber );
  res.json( getOrderNumber );
})

app.get('/*', function( req,res ){
    console.log("redirect to index page!");
    res.sendFile( path.join(__dirname, 'build', 'index.html') );
});