const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const rolesSchema = new Schema({
    role_id:String,
    role_name:String,
    date:Date,
     client:{
        is_create:Boolean,
        is_edit:Boolean,
        is_delete:Boolean,
        is_view:Boolean
     },
     campaign:{
        is_create:Boolean,
        is_edit:Boolean,
        is_delete:Boolean,
        is_view:Boolean
     },
     User_And_Roles:{
        is_create:Boolean,
        is_edit:Boolean,
        is_delete:Boolean,
        is_view:Boolean
     },
     lead:{
        is_create:Boolean,
        is_edit:Boolean,
        is_delete:Boolean,
        is_view:Boolean
     },
     rfp:{
        is_create:Boolean,
        is_edit:Boolean,
        is_delete:Boolean,
        is_view:Boolean
     },
     invoice:{
        is_create:Boolean,
        is_edit:Boolean,
        is_delete:Boolean,
        is_view:Boolean
     },
     expence:{
        is_create:Boolean,
        is_edit:Boolean,
        is_delete:Boolean,
        is_view:Boolean
     },
     ticket:{
        is_create:Boolean,
        is_edit:Boolean,
        is_delete:Boolean,
        is_view:Boolean
     },
     report:{
        is_create:Boolean,
        is_edit:Boolean,
        is_delete:Boolean,
        is_view:Boolean
     },
     
})

exports.rolesModel = new mongoose.model("roles",rolesSchema);

