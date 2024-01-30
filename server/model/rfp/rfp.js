const mongoose = require('mongoose')
const Schema  = mongoose.Schema

let rfp_schema = new Schema({
   rfp_id:String,
   rfp_name:String,
   managed_by:String,
   rfp_owner:String,
   start_date:Date,
   end_date:Date,
   budget:String,
   due_date:Date,
   description:String,
   criteria:[{
id:String,
Name:String,
   }],
   client_id:String,
   department_id:String,
   status:String,
   email_id:String,
   phone_no:String,

})


exports.rfpModal = new mongoose.model('rfp',rfp_schema)