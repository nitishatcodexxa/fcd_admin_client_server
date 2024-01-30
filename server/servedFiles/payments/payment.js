const payment_model = require('../../model/payment/payment')
const { v4: uuidv4 } = require('uuid');
const invoice_model = require('../../model/invoice/invoice')

exports.addPayment = (req,res)=>{
 const add_payment = new payment_model.payment_model({
    payment_id:uuidv4(),  
    client_id:req.body.client_id, 
    invoice_id:req.body.invoice_id,
    client_name:req.body.client_name,
    payment_method:req.body.payment_method,
    payment_date:req.body.payment_date,
    payment_amount:req.body.payment_amount,
    note:req.body.note,
 })
 
 add_payment.save().then(()=>{
    invoice_model.invoice_modal.findOne({invoice_id:req.body.invoice_id}).then((data)=>{
        let paid_amt = parseInt(data.payment_received) + parseInt(req.body.payment_amount);
    invoice_model.invoice_modal.updateOne({invoice_id:req.body.invoice_id},{payment_received:paid_amt}).then(()=>{
 res.send({data:"data sucessfully saved"})
    })
    })

 })
}


exports.retrivePayments =(req,res)=>{

    payment_model.payment_model.find({}).sort("-_id").then((data)=>{
        res.send({data:data})
    })
}

exports.deletePayment=(req,res)=>{
payment_model.payment_model.findOne({payment_id:req.body.payment_id}).then((paymentData)=>{
let payment_amount = parseInt(paymentData.payment_amount);
invoice_model.invoice_modal.findOne({invoice_id:paymentData.invoice_id}).then((data)=>{
let paid_amt = parseInt(data.payment_received) - payment_amount;
invoice_model.invoice_modal.updateOne({invoice_id:paymentData.invoice_id},{payment_received:paid_amt}).then(()=>{
payment_model.payment_model.deleteOne({payment_id:req.body.payment_id}).then((d)=>{
        res.send({data:'deleted'})
    })  
})})})}




exports.editPayment=(req,res)=>{

payment_model.payment_model.findOne({payment_id:req.body.payment_id}).then((paymentData)=>{
let amount = parseInt(paymentData.payment_amount)

invoice_model.invoice_modal.findOne({invoice_id:paymentData.invoice_id}).then((data)=>{
    let paid_amt = parseInt(data.payment_received) - amount +  parseInt(req.body.payment_amount);
invoice_model.invoice_modal.updateOne({invoice_id:paymentData.invoice_id},{payment_received:paid_amt}).then(()=>{
payment_model.payment_model.updateOne({payment_id:req.body.payment_id},{ 
        client_id:req.body.client_id, 
        invoice_id:req.body.invoice_id,
        client_name:req.body.client_name,
        payment_method:req.body.payment_method,
        payment_date:req.body.payment_date,
        payment_amount:req.body.payment_amount,
        note:req.body.note,
    }).then((s)=>{
        res.send({data:"edited"})
    })
})})})

}






exports.retrivePaymentForSingleClient = async(req,res)=>{
  await  payment_model.payment_model.countDocuments({client_id:req.body.client_id,invoice_id: { $regex: req.body.search.toUpperCase()}}).then((s)=>{
        payment_model.payment_model.find({client_id:req.body.client_id,invoice_id: { $regex: req.body.search.toUpperCase()}}).sort('-_id').skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage +req.body.rowsPerPage ).then((data)=>{
            res.send({
                data:data,
                length:s
            })
        })
    })
}