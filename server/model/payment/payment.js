
const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const payment_schema = new Schema({
    payment_id:String,  //// c
    client_id:String,  //// c
     invoice_id:String, //// c
    client_name:String,
    payment_method:String,
    payment_date:Date,
    payment_amount:String,
    note:String,
   

})

exports.payment_model = new mongoose.model('payments',payment_schema)