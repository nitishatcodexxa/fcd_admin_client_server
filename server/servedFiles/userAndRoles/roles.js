const rolesModel = require('../../model/userAndRoles/roles')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');



exports.addRoles = (req,res)=>{
const addRoles = new rolesModel.rolesModel({
        role_id:uuidv4(),
        role_name:req.body.role_name,
        date:Date(),
         client:req.body.client,
         campaign:req.body.campaign,
         User_And_Roles:req.body.User_And_Roles,
         lead:req.body.lead,
         rfp:req.body.rfp,
         invoice:req.body.invoice,
         expense:req.body.expense,
         ticket:req.body.ticket,
         report:req.body.report,
    });

addRoles.save().then((s)=>{
    res.send({"result":"data saved"})
    console.log("data saved")
})

}



exports.editRoles=(req,res)=>{
rolesModel.rolesModel.updateOne({role_id:req.body.role_id},{
     role_name:req.body.role_name,
     date:Date(),
     client:req.body.client,
     campaign:req.body.campaign,
     User_And_Roles:req.body.User_And_Roles,
     lead:req.body.lead,
     rfp:req.body.rfp,
     invoice:req.body.invoice,
     expense:req.body.expense,
     ticket:req.body.ticket,
     report:req.body.report,
}).then((ds)=>{
    res.send({data:"updated"})
})}


exports.retriveRoles = (req,res)=>{
    rolesModel.rolesModel.find().then((data)=>{
res.send({"data":data})
    })
}

exports.deleteRoles=(req,res)=>{
    rolesModel.rolesModel.deleteOne({role_id:req.body.role_id}).then((data)=>{
        res.send({"data":"deleted"})
    })
}