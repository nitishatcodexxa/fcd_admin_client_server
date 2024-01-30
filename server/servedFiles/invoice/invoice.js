const mongoose = require('mongoose')
const invoice_modal = require('../../model/invoice/invoice')
const client_modal = require('../../model/client/client')
const payment_modal = require('../../model/payment/payment')


exports.addInvoice =(req,res)=>{
 let billing_info = {}
 client_modal.clientModel.findOne({client_id:req.body.client_id}).then((rf)=>{
billing_info = rf.billing_info
 }).then(()=>{
    const addInvoice  = new invoice_modal.invoice_modal({
        invoice_id: "CBS"+Math.round(Math.random() * 1000) + Math.round(Math.random() * 3000) ,  
        client_id:req.body.client_id,
        client_name:req.body.client_name,
        campaign_id:req.body.campaign_id,
        campaign_name:req.body.campaign_name,
        bill_date:req.body.bill_date,
        due_date:req.body.due_date,
        billing_info:billing_info,
        po_no:req.body.po_no,
        notes:req.body.notes,
        items:req.body.items,
        payment_received:"0",
        status:'Pending'
    });

addInvoice.save().then((data)=>{
        res.send({"data":"data inserted successfully"})
    })
 })

}


/////////// item section ////////////

exports.addItem =(req,res)=>{
    invoice_modal.invoice_modal.updateOne({invoice_id:req.body.invoice_id}, {'$push': {items:{
      id:req.body.id,
      campaignName:req.body.campaignName,
      campaignId:req.body.campaignId,
      costPerLead:req.body.costPerLead,
      quentity:req.body.quentity,
         }}
        }).then((e)=>{  
            invoice_modal.invoice_modal.findOne({invoice_id:req.body.invoice_id}).then((data)=>{
                res.send({data:data.items})
            })   
    }) 
}


exports.updateItem=(req,res)=>{

}

/// rough work
exports.deleteItem=(req,res)=>{
    invoice_modal.invoice_modal.updateMany({'invoice_id':req.body.invoice_id}, {'$pull': {'items': { id:req.body.id}}}).then((e)=>{
invoice_modal.invoice_modal.findOne({'invoice_id':req.body.invoice_id}).then((a)=>{
    res.send({data:a.items})
})
    })
}



exports.editInvoice=(req,res)=>{   //// universal invoice edit
    console.log(req.body)
    invoice_modal.invoice_modal.updateOne({invoice_id:req.body.invoice_id, client_id:req.body.client_id},{
        client_id:req.body.client_id,
        client_name:req.body.client_name,
        campaign_id:req.body.campaign_id,
        campaign_name:req.body.campaign_name,
        bill_date:req.body.bill_date,
        due_date:req.body.due_date,
        po_no:req.body.po_no,
        notes:req.body.notes,
    }).then((r)=>{
        res.send({data:"terms edited"})
    })
}





exports.retriveInvoice = (req,res)=>{
       //// for all invoice
invoice_modal.invoice_modal.countDocuments({invoice_id:{$regex:req.body.search.toUpperCase()}}).then((l)=>{
   invoice_modal.invoice_modal.find({invoice_id:{$regex:req.body.search.toUpperCase()}}).sort('-_id').skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage + req.body.rowsPerPage).then((data)=>{
        res.send({data:data,length:l})
    }) 
})
}


exports.retriveSingleInvoiceData=(req,res)=>{
    invoice_modal.invoice_modal.findOne({invoice_id:req.body.invoice_id}).then((data)=>{
        res.send({data:data})
    })
}


exports.deleteInvoice = (req,res)=>{
    invoice_modal.invoice_modal.deleteOne({invoice_id:req.body.invoice_id}).then((data)=>{
    }).then(()=>{
payment_modal.payment_model.deleteMany({invoice_id:req.body.invoice_id}).then(()=>{
res.send({data:"deleted"})
})
    })
}


exports.retriveAllInvoiceForSingleClient = async(req,res)=>{
   await invoice_modal.invoice_modal.countDocuments({client_id:req.body.client_id,invoice_id: { $regex: req.body.search.toUpperCase() }}).then((ss)=>{
    invoice_modal.invoice_modal.find({client_id:req.body.client_id,invoice_id: { $regex: req.body.search.toUpperCase()}}).sort('-_id').skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage + req.body.rowsPerPage).then((data)=>{
        res.send({data:data, length:ss})
    });
    
    })
    
}



exports.singleClientTotalInvoice=async(req,res)=>{
    let totalInvoice = 0;
    let total_Payment = 0;
    invoice_modal.invoice_modal.find({client_id:req.body.client_id}).then(async(data)=>{
        for (let j = 0; j < data.length; j++) {  
            total_Payment = total_Payment + parseInt(data[j].payment_received)
            let itemArray = [];
            itemArray = data[j].items
        for (let i = 0; i < data[j].items.length; i++) {
          totalInvoice = totalInvoice + parseInt(data[j].items[i].quentity) *  parseInt(data[j].items[i].costPerLead)
        }}
        res.send({invoice:totalInvoice,payment:total_Payment})
    })
}




exports.allInvoiceForSingleClientForclientSide=async(req,res)=>{
    console.log(req.body)
    await invoice_modal.invoice_modal.countDocuments({client_id:req.body.client_id,invoice_id: { $regex: req.body.search.toUpperCase() }}).then((ss)=>{
        invoice_modal.invoice_modal.find({client_id:req.body.client_id,invoice_id: { $regex: req.body.search.toUpperCase()}}).sort('-_id').skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage + req.body.rowsPerPage).then((data)=>{
            res.send({data:data, length:ss})
        });
        
        })
}



exports.updateInvoiceStatus=(req,res)=>{
    invoice_modal.invoice_modal.updateOne({invoice_id:req.body.invoice_id},{status:req.body.status}).then(()=>{
        res.send({
            invoiceStatus:"updated"
        })
    })
}
  
  
  
