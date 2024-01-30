const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const invoice_schema = new Schema({
invoice_id:String ,  
client_id:String,
client_name:String,
campaign_id:String,
campaign_name:String,
bill_date:Date,
due_date:Date,
po_no:String,
notes:String,
billing_info:Object,
items:[{
    id:String,
    campaignName:String,
    campaignId:String,
    costPerLead:String,
    quentity:String,
}],
payment_received:String,
status:String,
})

exports.invoice_modal = new mongoose.model('invoices',invoice_schema)