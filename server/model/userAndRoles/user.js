const mongoose = require('mongoose')
const Schema =  mongoose.Schema


const userSchema = new Schema({
    user_id:String,
    name:String,
    emailid:String,
    phone:String,
    password:String,
    role_id:String,
    role_name:String,
})

exports.userModel = new mongoose.model('users',userSchema);
