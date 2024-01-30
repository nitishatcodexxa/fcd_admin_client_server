const rfpModal = require('../../model/rfp/rfp')
const { v4: uuidv4 } = require('uuid');

exports.addRfp=(req,res)=>{
const addRfp = new rfpModal.rfpModal({
    rfp_id:'RF'+'-'+(Math.round(Math.random() * 100000000)),
    rfp_name:req.body.rfp_name.toLowerCase(),
    managed_by:req.body.managed_by,
    rfp_owner:req.body.rfp_owner,
    start_date:req.body.start_date,
    end_date:req.body.end_date,
    budget:req.body.budget,
    due_date:req.body.due_date,
    description:req.body.description,
    criteria:[],
    email_id:req.body.email_id,
    phone_no:req.body.phone_no,
    client_id:req.body.client_id,
    department_id:req.body.department_id,
    status:'Progress',
});

addRfp.save().then((data)=>{
    res.send({rs:"done"})
})
}


exports.retriveRfp=(req,res)=>{
if(req.body.is_admin){
    rfpModal.rfpModal.countDocuments({client_id:req.body.client_id,rfp_name:{$regex:req.body.search.toLowerCase()}}).then((p)=>{
     rfpModal.rfpModal.find({client_id:req.body.client_id,rfp_name:{$regex:req.body.search.toLowerCase()}}).sort("-_id").skip(req.body.page * req.body.rowPerPage).limit(req.body.page * req.body.rowPerPage + req.body.rowPerPage).then((data)=>{
    res.send({data:data,length:p})
 })   
    })
 
    }else{
        rfpModal.rfpModal.countDocuments({client_id:req.body.client_id,department_id:req.body.department_id,rfp_name:{$regex:req.body.search.toLowerCase()}}).then((s)=>{
                  rfpModal.rfpModal.find({client_id:req.body.client_id,department_id:req.body.department_id,rfp_name:{$regex:req.body.search.toLowerCase()}}).sort("-_id").skip(req.body.page * req.body.rowPerPage).limit(req.body.page * req.body.rowPerPage + req.body.rowPerPage).then((data)=>{
            res.send({data:data,length:s})
         })  
        })

    } 

}


exports.deleteRfp =(req,res)=>{
rfpModal.rfpModal.deleteOne({rfp_id:req.body.rfp_id}).then((r)=>{
    res.send({data:"done"})
})
}


exports.updateRfp = (req,res)=>{
    rfpModal.rfpModal.updateOne({rfp_id:req.body.rfp_id},{
    rfp_name:req.body.rfp_name.toLowerCase(),
    managed_by:req.body.managed_by,
    rfp_owner:req.body.rfp_owner,
    start_date:req.body.start_date,
    end_date:req.body.end_date,
    budget:req.body.budget,
    due_date:req.body.due_date,
    description:req.body.description,
    criteria:[],
    client_id:req.body.client_id,
    department_id:req.body.department_id,
    }).then((r)=>{
        res.send({data:"done"})
    })  
}



exports.updateRfpStatus =(req,res)=>{
    rfpModal.rfpModal.updateOne({rfp_id:req.body.rfp_id},{
        status:req.body.status,
    }).then((data)=>{
        res.send({status:"updated"})
    })
}




exports.retriveAllRfpForCrmAdmin=(req,res)=>{
    rfpModal.rfpModal.countDocuments({client_id:{$regex:req.body.search.toUpperCase()}}).then((d)=>{
      rfpModal.rfpModal.find({client_id:{$regex:req.body.search.toUpperCase()}}).skip(req.body.page * req.body.rowPerPage).limit(req.body.page * req.body.rowPerPage + req.body.rowPerPage).then((data)=>{
     res.send({data:data,length:d})
    })   
    })
   
}


exports.retriveAllRfpForCrmSingleClient=(req,res)=>{
  
    rfpModal.rfpModal.countDocuments({client_id:req.body.client_id,rfp_id: { $regex: req.body.search.toUpperCase()}}).then((e)=>{
        rfpModal.rfpModal.find({client_id:req.body.client_id,rfp_id: { $regex: req.body.search.toUpperCase()}}).sort("-_id").skip(req.body.page * req.body.rowsPerPage).limit(req.body.page * req.body.rowsPerPage + req.body.rowsPerPage).then((data)=>{
res.send({
    data:data,
    length:e
})

        })
    })
}