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

app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );
app.use( express.static(path.join(__dirname, 'build'))) ;



// app.get('/*', function( req,res ){
//     console.log("redirect to index page!");
//     res.sendFile( path.join(__dirname, 'build', 'index.html') );
// });