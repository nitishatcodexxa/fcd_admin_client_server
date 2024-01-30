const lead_model = require('../../model/leads/lead');
const { v4: uuidv4 } = require('uuid');
const campaign_model = require('../../model/campaign/campaign')



exports.leadAdd =(req,res)=>{

///// check header list and 
lead_model.lead_model.find({client_id:req.body.client_id,campaign_id:req.body.campaign_id}).sort('-_id').then((data)=>{
let goNext = true;
if(data.length > 0){
let PrevHeaders = data[0].headers;
for (let i = 0; i < PrevHeaders.length; i++) {
  if(PrevHeaders[i] == req.body.headers[i]){
  }else{
 goNext = false
  }
}

if(goNext){
  let bunch_id = uuidv4();
  let totalHeaders =  req.body.headers;
  let totalLeads = req.body.leadList;
  
  totalLeads.forEach((item, i) => {
     item.lead_id = i + 1 + Math.round(Math.random()*10000700009000) + Math.round(Math.random()*10575775) +1  + Math.round(Math.random()*1868677600);
     item.bunch_id = bunch_id;
     item.campaign_id=req.body.campaign_id    
   });
   const addLead = new  lead_model.lead_model({
     id:bunch_id,
     headers : totalHeaders,
     leadData : totalLeads,   //// array typ
     campaign_id:req.body.campaign_id,
     client_id:req.body.client_id,
     campaign_name:req.body.campaign_name,
     client_name:req.body.client_name,
     added_date:Date(),
   })
 
   addLead.save().then(()=>{
     res.send({"data":"done"})
   }).then(()=>{
    campaign_model.campaign_model.findOne({campaign_id:req.body.campaign_id}).then((sss)=>{
  campaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id},{total_upoaded_Leads:totalLeads.length + parseInt(sss.total_upoaded_Leads)}).then(()=>{
      
    })}) })

}else{
  res.send({data:"headers mis - match"})
}

}else{
let bunch_id = uuidv4();
 let totalHeaders =  req.body.headers;
 let totalLeads = req.body.leadList;
 
 totalLeads.forEach((item, i) => {
    item.lead_id = i + 1 + Math.round(Math.random()*100000000000000) + Math.round(Math.random()*10575775) +1  + Math.round(Math.random()*1868677600);
    item.bunch_id = bunch_id;
    item.campaign_id=req.body.campaign_id
  });

  const addLead = new  lead_model.lead_model({
    id:bunch_id,
    headers : totalHeaders,
    leadData : totalLeads,   //// array typ
    campaign_id:req.body.campaign_id,
    client_id:req.body.client_id,
    campaign_name:req.body.campaign_name,
    client_name:req.body.client_name,
    added_date:Date(),
  })

  addLead.save().then(()=>{
    res.send({"data":"done"})
  }).then(()=>{
    campaign_model.campaign_model.findOne({campaign_id:req.body.campaign_id}).then((sss)=>{
      campaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id},{total_upoaded_Leads:totalLeads.length + parseInt(sss.total_upoaded_Leads)}).then(()=>{
          console.log("lead List uploaded")
        })
        })
   })
}
})}


exports.retriveLeads=(req,res)=>{
let skip = 0;
let  m = req.body.page * req.body.rowsPerPage;
skip = m;
let mm = 0;
lead_model.lead_model.countDocuments({}).then((s)=>{
  mm = s
}).then(()=>{
  lead_model.lead_model.find({}).sort('-_id').skip(skip).limit(req.body.rowsPerPage).then((data)=>{
    if(data.length > 0 ){
      let newLeadList = [];
for (let i = 0; i < data.length; i++) {
 newLeadList.push({id:data[i].id,date:data[i].added_date,size:data[i].leadData.length,client_name:data[i].client_name,campaign_name:data[i].campaign_name,campaign_id:data[i].campaign_id})
}
res.send({data:newLeadList,length:mm})
    }else{
      res.send({data:data,length:mm})
    }
  })

})}




exports.retriveBunchLeadList=(req,res)=>{
  lead_model.lead_model.findOne({id:req.body.bunch_id}).then((da)=>{
    let  l = da.leadData.length
 let slice_array = da.leadData.slice(req.body.page * req.body.rowsPerPage, req.body.page * req.body.rowsPerPage + req.body.rowsPerPage )
    res.send({data:da.headers,list:slice_array,length:l})
  })
}




exports.retriveLeadsForSingleCampaign=(req,res)=>{   //// bulk consider
  let skip = 0;
  let  m = req.body.page * req.body.rowsPerPage;
  skip = m;
  let mm = 0;
  lead_model.lead_model.countDocuments({}).then((s)=>{
    mm = s
  }).then(()=>{
    lead_model.lead_model.find({campaign_id:req.body.campaign_id}).sort('-_id').skip(skip).limit(req.body.rowsPerPage).then((data)=>{
      if(data.length > 0 ){
        let newLeadList = [];
  for (let i = 0; i < data.length; i++) {
   newLeadList.push({id:data[i].id,date:data[i].added_date,size:data[i].leadData.length,client_name:data[i].client_name,campaign_name:data[i].campaign_name})
  }
  res.send({data:newLeadList,length:mm})
      }else{
        res.send({data:data,length:mm})
      }
    })
  
  })}










exports.retriveAllLeadsFotCampaign = (req,res) =>{
let AllLeadList = []
let headers = []
lead_model.lead_model.find({campaign_id:req.body.campaign_id}).sort('-_id').then(async(data)=>{
 
headers = data[0]?data[0].headers:[];
for (let i = 0; i < data.length; i++) {
let imaginaryArray = AllLeadList.concat(data[i].leadData);
AllLeadList = imaginaryArray;
 }


}).then((s)=>{
  let startIndex = req.body.page * req.body.rowsPerPage;
let length = req.body.page * req.body.rowsPerPage  +  req.body.rowsPerPage;
let sliceArray = AllLeadList.slice(startIndex,length);
res.send({data:sliceArray,length:AllLeadList.length,headers:headers})
})
}




exports.deleteLeadBunch=async(req,res)=>{
 
let  m = {}
let total_upoaded_Leads = 0
 campaign_model.campaign_model.findOne({campaign_id:req.body.campaign_id}).then((sssr)=>{
 total_upoaded_Leads = sssr.total_upoaded_Leads
}).then(()=>{
  campaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id},{total_upoaded_Leads:total_upoaded_Leads - req.body.size}).then(()=>{
 }).then(()=>{
   lead_model.lead_model.deleteOne({id:req.body.bunch_id}).then((data)=>{
    res.send({data:"deleted"})
  })
}) 
})
 
}
 



exports.deleteSingleLead = (req,res)=>{

  campaign_model.campaign_model.findOne({campaign_id:req.body.campaign_id}).then((sss)=>{
    campaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id},{total_upoaded_Leads:sss.total_upoaded_Leads - 1}).then(()=>{
        
  lead_model.lead_model.updateMany({id:req.body.bunch_id}, {'$pull': {'leadData': { lead_id:req.body.lead_id}}}).then((e)=>{
    res.send({"ok":"kdjk"})
  })

})})

}


/*

exports.deleteLeadnSimendsBunch=(req,res)=>{
  lead_model.lead_model.deleteOne({id:req.body.bunch_id}).then((data)=>{
    res.send({data:"deleted"})
  })
}
*/




 

