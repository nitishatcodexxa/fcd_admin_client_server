const mongoose = require('mongoose')
const clientModel = require('../../model/client/client')
const campaignModel = require('../../model/campaign/campaign')
const sendMail = require('../../automation/Emailautomation')


exports.addClient = (req,res)=>{
    let client_id='CD0'+ Math.floor(Math.random()*10000);
  const add_client_with_file = new clientModel.clientModel({
    client_id:client_id,   //// must for client
    client_registered:Date(),
    client_name:req.body.client_name,
    client_phone:req.body.client_phone,
    client_group:req.body.client_group,
    client_address_1:req.body.client_address_1,
    client_address_2:req.body.client_address_2,
    client_country:req.body.client_country,
    client_city:req.body.client_city,
    client_state:req.body.client_state,
    client_postal_code:req.body.client_postal_code,
    total_invoice:0,
    amount_paid:0,
    user_name:req.body.client_email,
    password:req.body.client_password,
    primary_contact:{
     designation:req.body.p_client_designation,
     name:req.body.p_name,
     phone:req.body.p_phone,
     email:req.body.p_email,
     address:req.body.p_address,
     postal_code:req.body.p_postal_code,
     country:req.body.p_country,
     state:req.body.p_state,
     city:req.body.p_city,
    },
    billing_info:{
        billing_name:req.body.billing_name,
        billing_email_id:req.body.biling_email_id,
        billing_phone_no:req.body.billing_phone,
        billing_address:req.body.billing_address,
        billing_postal_code:req.body.billing_postal_code,
        billing_country:req.body.billing_country,
        billing_state:req.body.billing_state,
        billing_city:req.body.billing_city,
        billing_gst_no:req.body.billing_gst_no,
        billing_currency:req.body.billing_currency,
        billing_symbole:req.body.billing_symbol,
    },
    attachment:[]
})


add_client_with_file.save().then(async(ress)=>{
    if(req.files.files && req.files.files.length){
    for (let i = 0; i < JSON.parse(req.body.documentNameList).length; i++) {
   clientModel.clientModel.updateOne({'client_id':client_id}, {'$push': {'attachment': { doc_id: Math.round(Math.random() * 100030070680)+'_'+ Math.round(Math.random() * 100800009899) , url:req.files.files[i].filename,doc_name:JSON.parse(req.body.documentNameList)[i]}}}).then((e)=>{
   })}}
res.send({"data":"ok"})
sendMail.sendEmailToNewlyAddedClient(req.body)
})


}



exports.editClient=(req,res)=>{
clientModel.clientModel.updateOne({client_id:req.body.client_id},{
    client_name:req.body.client_name,
    client_phone:req.body.client_phone,
    client_designation:req.body.client_designation,
    client_group:req.body.client_group,
    client_address_1:req.body.client_address_1,
    client_address_2:req.body.client_address_2,
    client_country:req.body.client_country,
    client_city:req.body.client_city,
    client_state:req.body.client_state,
    client_postal_code:req.body.client_postal_code,
    user_name:req.body.client_email,
    password:req.body.client_password,
    primary_contact:{
     designation:req.body.p_client_designation,
     name:req.body.p_name,
     phone:req.body.p_phone,
     email:req.body.p_email,
     address:req.body.p_address,
     postal_code:req.body.p_postal_code,
     country:req.body.p_country,
     state:req.body.p_state,
     city:req.body.p_city,
    },
    billing_info:{
        billing_name:req.body.billing_name,
        billing_email_id:req.body.biling_email_id,
        billing_phone_no:req.body.billing_phone,
        billing_address:req.body.billing_address,
        billing_postal_code:req.body.billing_postal_code,
        billing_country:req.body.billing_country,
        billing_state:req.body.billing_state,
        billing_city:req.body.billing_city,
        billing_gst_no:req.body.billing_gst_no,
        billing_currency:req.body.billing_currency,
        billing_symbole:req.body.billing_symbol,
    },
}).then((ss)=>{
res.send({"data":"ok"})
})

}



exports.addDocumentToClient = (req,res)=>{
    
    clientModel.clientModel.updateOne({'client_id':req.body.client_id}, {'$push': {'attachment': { doc_id: Math.round(Math.random() * 100030000000000000070680)+'_'+ Math.round(Math.random() * 100800009899) , url:req.files.files[0].filename,doc_name:req.body.file_Name}}}).then((e)=>{
    }).then(()=>{
        clientModel.clientModel.findOne({'client_id':req.body.client_id}).then((s)=>{
             res.send({data:s.attachment})
        })
    })

}






exports.retriveClient=(req,res)=>{
    let m = 0 ;
    clientModel.clientModel.countDocuments({client_id:{$regex:`${req.body.search.toUpperCase()}`}}).then((s)=>{
        m = s
    }).then(()=>{
           let skip = req.body.page *  req.body.rowperpage;
    clientModel.clientModel.find({client_id:{$regex:`${req.body.search.toUpperCase()}`}}).sort('-_id').skip(skip).limit(skip + req.body.rowperpage).then((data)=>{
res.send({"data":data,'length':m})
    })
    })
 
} 
 


exports.retriveClientForLeadPage=(req,res)=>{
   clientModel.clientModel.find({},{client_name:1,client_id:1}).then((newClientList)=>{
res.send({data:newClientList})
   })
}


 
exports.singleClientData =(req,res)=>{
    clientModel.clientModel.findOne({client_id:req.body.client_id}).then((data)=>{
        res.send({data:data})
    })
}



exports.deleteClientDocAttachment=(req,res)=>{
    clientModel.clientModel.updateMany({'client_id':req.body.client_id}, {'$pull': {'attachment': { doc_id:req.body.doc_id}}}).then((e)=>{

    }).then(()=>{
        clientModel.clientModel.findOne({'client_id':req.body.client_id}).then((data)=>{
            res.send({data:data})
        })
    })
}


exports.deletClient=(req,res)=>{
    clientModel.clientModel.deleteOne({client_id:req.body.client_id}).then((s)=>{
        res.send({'data':s})
    })
}



exports.retriveClientForCampaignModel = (req,res)=>{
    let clientDataFiltered = [];
    clientModel.clientModel.find({}).then(async(clientData)=>{
        if(clientData.length > 0){
            let  allSelected = []
            for (let i = 0; i < clientData.length; i++) {
                allSelected.push({client_id:clientData[i].client_id,client_name:clientData[i].client_name})
            }
          res.send({data:allSelected})
        }else{
            clientDataFiltered = [];
            res.send({data:clientDataFiltered})
        }

    })
}






exports.deleteAllClients=(req,res)=>{
clientModel.clientModel.deleteMany({}).then(()=>{
    res.send({data:"done"})
})
}

exports.retriveAllClients=(req,res)=>{
    clientModel.clientModel.find({},{client_name:1,client_id:1}).sort('-_id').then((data)=>{
        res.send({data:data})
    }) 
}


exports.retriveAllClientsForExports=(req,res)=>{
    clientModel.clientModel.find({},{client_name:1,client_id:1,client_phone:1,client_address_1:1,client_city:1,client_postal_code:1,client_group:1}).sort('-_id').then((data)=>{
        res.send({data:data})
    }) 
}





///////////////  function for overview page  admin ///////////

exports.requiredNumberForOverViewPage=(req,res)=>{
  let total_client= 0;
  let total_campaign= 0;
  let hold_camapign = 0;
  let open_campaign = 0;
  let Canceled_campaign = 0;
  let completed_campaign = 0;
    clientModel.clientModel.countDocuments({}).then((d)=>{
total_client = d
    }).then(()=>{
campaignModel.campaign_model.countDocuments({}).then((s)=>{
    total_campaign = s
    }).then(async()=>{
      await  campaignModel.campaign_model.countDocuments({status:'Hold'}).then((hold)=>{
         console.log(hold + "w")
            hold_camapign=hold
        });
       await campaignModel.campaign_model.countDocuments({status:'Open'}).then((open_campaign)=>{
        open_campaign=open_campaign
        });
      await  campaignModel.campaign_model.countDocuments({status:'Canceled'}).then((Canceled)=>{
        Canceled_campaign=Canceled
        });
      await  campaignModel.campaign_model.countDocuments({status:'Completed'}).then((completed)=>{
            completed_campaign=completed
        });

    }).then(()=>{

        res.send({
            total_client:total_client,
            total_campaign:total_campaign,
            hold_camapign :hold_camapign,
            open_campaign :open_campaign,
            Canceled_campaign :Canceled_campaign,
            completed_campaign :completed_campaign,

        })
    })



})
}








