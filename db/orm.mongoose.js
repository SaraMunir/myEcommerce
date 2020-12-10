const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

// const { v4: uuidv4 } = require('uuid');
mongoose.connect(`mongodb://localhost:27017/myEcommerceWeb`, {useNewUrlParser: true, useFindAndModify: false});

const db = require( './models' );
const e = require('express');