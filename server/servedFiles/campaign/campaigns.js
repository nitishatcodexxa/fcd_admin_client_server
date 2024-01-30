const compaign_model  = require('../../model/campaign/campaign')
const { v4: uuidv4 } = require('uuid');
const lead_model = require('../../model/leads/lead')

exports.addCampaign = (req,res) =>{

//// check if file exist or not 
 let any_other_attachment=""
 let supression_or_excusion_docs =""
 let assets_link_docs = ""
 let  account_or_domain_list_docs = ""

 if(req.files.any_other_attachment && req.files.any_other_attachment.length){
   any_other_attachment = req.files.any_other_attachment[0].filename
 }

 if(req.files.supression_or_excusion_docs && req.files.supression_or_excusion_docs.length){
   supression_or_excusion_docs = req.files.supression_or_excusion_docs[0].filename
 }

 if(req.files.assets_link_docs && req.files.assets_link_docs.length){
   assets_link_docs = req.files.assets_link_docs[0].filename
 }

 if(req.files.account_or_domain_list_docs && req.files.account_or_domain_list_docs.length){
   account_or_domain_list_docs = req.files.account_or_domain_list_docs[0].filename
 }

    let addComapaign = new compaign_model.campaign_model({
    total_upoaded_Leads:0,
    campaign_id:req.body.campaign_id,
    campaign_registered_date:Date(),
    campaign_name:req.body.campaign_name.toLowerCase(),
    client_name:req.body.client_name,
    client_id:req.body.client_id,
    campaign_type:req.body.campaign_type,
    end_client:req.body.end_client,
    campaign_manager:req.body.campaign_manager,
    campaign_manager_id:req.body.campaign_manager_id,
    lead_target:req.body.lead_target,
    cost_per_lead:req.body.cost_per_lead,
    cpl_currency:req.body.cpl_currency,
    campaign_budget:parseInt(req.body.cost_per_lead) * parseInt(req.body.lead_target) ,
    start_date:req.body.start_date,
    end_date:req.body.end_date,



    department_name:req.body.department_name,    //// add department name
    department_id:req.body.department_id,        ///// addd department id




    spacing:[],

    is_spacing_required:req.body.is_spacing_required,

    //////////////// compaign specification

    job_title:JSON.parse(req.body.job_title),
    job_function:JSON.parse(req.body.job_function),
    job_level:JSON.parse(req.body.job_level),
    compaign_specification_geography:JSON.parse(req.body.compaign_specification_geography),
    employee_size:JSON.parse(req.body.employee_size),
    revenue_size:JSON.parse(req.body.revenue_size),
    industry_list:JSON.parse(req.body.industry_list),
    
    ////////////////// attachment
    account_or_domain_list:req.body.account_or_domain_list,
    contact_per_company:req.body.contact_per_company,
    note:req.body.note,
    supression_or_excusion:req.body.supression_or_excusion,
          
       /// docs
    any_other_attachment:any_other_attachment,
    supression_or_excusion_docs:supression_or_excusion_docs,
    assets_link_docs:assets_link_docs,
    account_or_domain_list_docs:account_or_domain_list_docs,

    /////////// question 
    questionList:JSON.parse(req.body.questionList),



    status:"Open"
 })

 addComapaign.save().then(async(d)=>{

   let spacing = JSON.parse(req.body.spacing)

   for (let i = 0; i < spacing.length; i++) {
     compaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id}, {'$push': {'spacing': { required_lead:spacing[i].required_lead,duration:spacing[i].duration,general_info_geography:spacing[i].general_info_geography,day:spacing[i].day,id:Math.round(Math.random() * 10000930070000890)}}}).then((e)=>{         
   }) 
   }

   console.log("done")
   res.send({"data":"ok"})
 });


 




}


///// this route function used in admin side campaign Management 

exports.retriveComapaign=(req,res)=>{
  compaign_model.campaign_model.countDocuments({campaign_name:{$regex:req.body.search.toLowerCase()}, client_id:{$regex:req.body.search_client_id}  }).then((e)=>{
     compaign_model.campaign_model.find({campaign_name:{$regex: req.body.search.toLowerCase()}, client_id:{$regex:req.body.search_client_id}}).sort('-_id').skip(req.body.rowsPerPage * req.body.page).limit(req.body.rowsPerPage).then((data)=>{
      res.send({data:data,length:e})
   })
  }) 




} 





exports.deleteComapign =(req,res)=>{
   compaign_model.campaign_model.deleteOne({campaign_id:req.body.campaign_id}).then((data)=>{
      res.send({data:"deleted"})
   }).then(()=>{
lead_model.lead_model.deleteMany({campaign_id:req.body.campaign_id}).then(()=>{
   console.log('lead deleted')
})

   })
}









exports.editComapaign=(req,res)=>{

 let any_other_attachment=""
 let supression_or_excusion_docs =""
 let assets_link_docs = ""
 let  account_or_domain_list_docs = ""

 if(req.files.any_other_attachment && req.files.any_other_attachment.length){
   any_other_attachment = req.files.any_other_attachment[0].filename
 }else{
any_other_attachment = req.body.any_other_attachment
 }

 if(req.files.supression_or_excusion_docs && req.files.supression_or_excusion_docs.length){
   supression_or_excusion_docs = req.files.supression_or_excusion_docs[0].filename
 }else{
   supression_or_excusion_docs  = req.body.supression_or_excusion_docs
 }

 if(req.files.assets_link_docs && req.files.assets_link_docs.length){
   assets_link_docs = req.files.assets_link_docs[0].filename
 }else{
   assets_link_docs = req.body.assets_link_docs
 }

 if(req.files.account_or_domain_list_docs && req.files.account_or_domain_list_docs.length){
   account_or_domain_list_docs = req.files.account_or_domain_list_docs[0].filename
 }else{
   account_or_domain_list_docs = req.body.account_or_domain_list_docs
 }


compaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id},{

//// check if file exist or not 
    total_upoaded_Leads:0,
    campaign_name:req.body.campaign_name.toLowerCase(),
    client_name:req.body.client_name,
    client_id:req.body.client_id,
    campaign_type:req.body.campaign_type,
    end_client:req.body.end_client,
    campaign_manager:req.body.campaign_manager,
    campaign_manager_id:req.body.campaign_manager_id,
    lead_target:req.body.lead_target,
    cost_per_lead:req.body.cost_per_lead,
    cpl_currency:req.body.cpl_currency,
    campaign_budget:parseInt(req.body.cost_per_lead) * parseInt(req.body.lead_target) ,
    start_date:req.body.start_date,
    end_date:req.body.end_date,

    spacing:[],

    is_spacing_required:req.body.is_spacing_required,

    //////////////// compaign specification

    job_title:JSON.parse(req.body.job_title),
    job_function:JSON.parse(req.body.job_function),
    job_level:JSON.parse(req.body.job_level),
    compaign_specification_geography:JSON.parse(req.body.compaign_specification_geography),
    employee_size:JSON.parse(req.body.employee_size),
    revenue_size:JSON.parse(req.body.revenue_size),
    industry_list:JSON.parse(req.body.industry_list),
    
    ////////////////// attachment
    account_or_domain_list:req.body.account_or_domain_list,
    contact_per_company:req.body.contact_per_company,
    note:req.body.note,
    supression_or_excusion:req.body.supression_or_excusion,
          
       /// docs
    any_other_attachment:any_other_attachment,
    supression_or_excusion_docs:supression_or_excusion_docs,
    assets_link_docs:assets_link_docs,
    account_or_domain_list_docs:account_or_domain_list_docs,

    /////////// question 
    questionList:JSON.parse(req.body.questionList),

 }).then(()=>{
   let spacing = JSON.parse(req.body.spacing)
   for (let i = 0; i < spacing.length; i++) {
     compaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id}, {'$push': {'spacing': { required_lead:spacing[i].required_lead,duration:spacing[i].duration,general_info_geography:spacing[i].general_info_geography,day:spacing[i].day,id:Math.round(Math.random() * 10000930070000890)}}}).then((e)=>{         
   }) 
   }
   res.send({"data":"upsated"})
 })
}
   







exports.retriveCampaignForCrmAdminClientPage=(req,res)=>{     ///this.route used in single client campaign page in crm admin
   let m = 0
      compaign_model.campaign_model.countDocuments({client_id:req.body.client_id,campaign_name: { $regex: req.body.search.toLowerCase() }}).then((s)=>{
   m = s
      }).then(()=>{
         compaign_model.campaign_model.find({client_id:req.body.client_id,campaign_name: { $regex: req.body.search.toLowerCase() }}).sort('-_id').skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage+req.body.rowsPerPage).then((data)=>{
         res.send({data:data,length:m})
      }) 
      })
}





































exports.retriveCampaignLeadList=(req,res)=>{
   compaign_model.campaign_model.findOne({campaign_id:req.body.campaign_id}).then((r)=>{
      res.send({"data":r})
     })
}



exports.retriveComapaignForLeadPage=(req,res)=>{
   compaign_model.campaign_model.find({client_id:req.body.client_id},{campaign_name:1,campaign_id:1}).sort("-_id").then((CampaignArray)=>{
      res.send({data:CampaignArray})
   })
}




exports.retriveComapaignForManageLeadPage=(req,res)=>{
   compaign_model.campaign_model.find().then((data)=>{ 
let CampaignArray =  [];
for (let i = 0; i < data.length; i++) {
   CampaignArray.push({campaign_name:data[i].campaign_name,campaign_id:data[i].campaign_id,client_name:data[i].client_name,client_id:data[i].client_id,start_date:data[i].start_date,end_date:data[i].end_date,lead_target:data[i].required_lead,total_upoaded_Leads:data[i].total_upoaded_Leads,lead_target:data[i].lead_target,status:data[i].status})
}
      res.send({data:CampaignArray})
   })
}



exports.retriveCampaignForclientPage=(req,res)=>{
   console.log(req.body)
let m = 0
   compaign_model.campaign_model.countDocuments({client_id:req.body.client_id,campaign_name: { $regex: req.body.search.toLowerCase() }}).then((s)=>{
m = s
   }).then(()=>{
      compaign_model.campaign_model.find({client_id:req.body.client_id,campaign_name: { $regex: req.body.search.toLowerCase() }}).sort('-_id').skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage+req.body.rowsPerPage).then((data)=>{
      res.send({data:data,length:m})
   }) 
   })
}



exports.singleClientTotalCampaign=(req,res)=>{
   compaign_model.campaign_model.countDocuments({client_id:req.body.client_id}).then((campaignSize)=>{
      res.send({data:campaignSize})

   })
}




exports.updateCampaignStatus=(req,res)=>{
      compaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id},{status:req.body.status}).then((data)=>{
         res.send({data:"updated"})
      })
   
}


exports.retriveCampaignForSignleClientUser =(req,res)=>{  

   let m = 0
   compaign_model.campaign_model.countDocuments({client_id:req.body.client_id,campaign_manager_id:req.body.department_id,campaign_name: { $regex: req.body.search.toLowerCase() }}).then((s)=>{
   m = s
   }).then(()=>{
      compaign_model.campaign_model.find({client_id:req.body.client_id,campaign_manager_id:req.body.department_id,campaign_name: { $regex: req.body.search.toLowerCase() }}).sort('-_id').skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage + req.body.rowsPerPage).then((data)=>{
      res.send({data:data,length:m})
   }) 
   })


} 



exports.allCampaignForHoldStatus_for_campaignRequestPage = (req,res)=>{
   console.log(req.body)
   compaign_model.campaign_model.countDocuments({'status':'Hold',campaign_name:{$regex:req.body.search.toLowerCase()}}).then((s)=>{
       compaign_model.campaign_model.find({'status':'Hold',campaign_name:{$regex:req.body.search.toLowerCase()}}).sort('-_id').skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage+req.body.rowsPerPage).then((data)=>{
      res.send({data:data,length:s})
   })  
   })
}





exports.retriveAllCampaignForClientLeadsPage=async(req,res)=>{
   console.log(req.body)
   if(req.body.is_admin){
     await compaign_model.campaign_model.countDocuments({client_id:req.body.client_id,campaign_name:{$regex:req.body.search}}).then((p)=>{
      compaign_model.campaign_model.find({client_id:req.body.client_id,campaign_name:{$regex:req.body.search}},{campaign_id:1,client_id:1,status:1,campaign_name:1,total_upoaded_Leads:1,lead_target:1,start_date:1,end_date:1}).sort('-_id').skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage + req.body.rowsPerPage).then((data)=>{
         res.send({ 
            data:data,
            length:p
         })
      })
   }) 
   }else{
    await  compaign_model.campaign_model.countDocuments({client_id:req.body.client_id,campaign_manager_id:req.body.department_id,campaign_name:{$regex:req.body.search}}).then((p)=>{
         compaign_model.campaign_model.find({client_id:req.body.client_id,campaign_manager_id:req.body.department_id,campaign_name:{$regex:req.body.search}},{campaign_id:1,status:1,client_id:1,campaign_name:1,total_upoaded_Leads:1,lead_target:1,start_date:1,end_date:1}).sort('-_id').skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage + req.body.rowsPerPage).then((data)=>{
            res.send({ 
               data:data,
               length:p
            })
         })
      }) 
   }
  
}




/*
exports.addBulkleadToCampaign=(req,res)=>{
   ////////// reformation of data
let headers = ['id'];  
 let incominHeaders  = [];
if(req.body.headers && req.body.headers.length){
let headertwo = req.body.headers;
incominHeaders = headertwo;
}
let totalHeaders =  headers.concat(incominHeaders);
let totalLeads = req.body.leadList;

totalLeads.forEach((item, i) => {
   item.id = i + 1 + Math.round(Math.random()*1000) + Math.round(Math.random()*100000)  + Math.round(Math.random()*100) ;
 });

/// HEADERS LENGTH
compaign_model.campaign_model.findOne({campaign_id:req.body.campaign_id}).then((data)=>{
   if(data.headers.length > 0){
      for (let i = 0; i < totalLeads.length; i++) {
         compaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id}, {'$push': {'leadList': totalLeads[i]}}).then(async(e)=>{   
         })  
      }
      res.send({data:"done"})
   }else{
        compaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id},{headers:totalHeaders}).then((r)=>{
  }).then(()=>{
   for (let i = 0; i < totalLeads.length; i++) {
      compaign_model.campaign_model.updateOne({campaign_id:req.body.campaign_id}, {'$push': {'leadList': totalLeads[i]}}).then((e)=>{       
      })  
   }
   }).then((dara)=>{res.send({data:"done"})})
}})
}

*/