const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let adminInfo = new Schema ({
    adminName: { 
        type: String,
        trim: true,
        required: true
    },
    category: String,
    address: String,
    phoneNumber: String,
    homeNumber: String,
    status: String,
    adminEmail : { 
        type: String, 
        required: true, 
        trim: true, 
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'] 
    },
    password : { 
        type: String, 
        required: true, 
        trim: true
    },
}, {
        timestamps: true
});

module.exports = mongoose.model('adminInfo', adminInfo);
