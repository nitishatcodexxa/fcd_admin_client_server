const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lead_schema = new Schema({
    id:String,
    headers:Array,
    leadData : Array,
    campaign_id:String,
    campaign_name:String,
    client_id:String,
    client_name:String,
    added_date:Date,
})

exports.lead_model = new mongoose.model('leads',lead_schema)
