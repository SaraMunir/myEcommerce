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

//Tees list
app.get('/api/Tees/Women', async( req,res) => {
    const womens = JSON.parse( fs.readFileSync( "./productData.json" ) );
    let womensArr=[]
    womens.map(women=>{
      if(women.type==="Women"){
        womensArr.push(women)
      }
    })
    res.send( womensArr );
  });

app.get('/*', function( req,res ){
    console.log("redirect to index page!");
    res.sendFile( path.join(__dirname, 'build', 'index.html') );
});