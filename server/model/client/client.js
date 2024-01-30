const mongoose = require('mongoose');
const Schema  = mongoose.Schema


const client_schema = new Schema({

    client_id:String,   //// must for client
    client_registered:Date,
    client_name:String,
    client_phone:String,
    client_group:String,
    client_address_1:String,
    client_address_2:String,
    client_country:String,
     client_state:String,
    client_city:String,
    client_postal_code:String,
    user_name:String,
    password:String,
    primary_contact:{
     designation:String,
     name:String,
     phone:String,
     email:String,
     address:String,
     postal_code:String,
     country:String,
     state:String,
     city:String
    },
    billing_info:{
        billing_name:String,
        billing_email_id:String,
        billing_phone_no:String,
        billing_address:String,
        billing_postal_code:String,
        billing_country:String,
        billing_state:String,
        billing_city:String,
        billing_gst_no:String,
        billing_currency:String,
        billing_symbole:String
    },

    attachment:[
        {   doc_id:String,
            doc_name:String,
            url:String
        }
    ],

    ///// newly add
    total_invoice:String,
    amount_paid:String,



})

exports.clientModel = new mongoose.model('clients',client_schema)