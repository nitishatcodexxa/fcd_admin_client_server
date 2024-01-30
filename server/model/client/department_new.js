const mongoose  = require('mongoose')
const Schema = mongoose.Schema


const new_department = new Schema({
    department_name : String,
    department_id : String,
    created_at : Date,
    client_id:String,

})

exports.new_department_model = new mongoose.model('new_department',new_department)