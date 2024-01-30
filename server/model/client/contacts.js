const mongoose =  require('mongoose')
const Schema  =  mongoose.Schema


const contact_schema = new Schema({
    client_id:String, 
    contact_id:String,
    contact_registered:Date,    
    department_id:String,
    department_name:String,
    first_name:String,
    last_name:String,
    email_id:String,
    phone_no:String,
    job_title:String,
    password:String,
    profile_url:String,
    facebook_link:String,
    instagram_link:String,
    whatsapp_no:String,
    linkedin_url:String,
    login_date:Date,
    is_active:Boolean,
    gender:String,
})

exports.contactmodel = new mongoose.model('contact',contact_schema)