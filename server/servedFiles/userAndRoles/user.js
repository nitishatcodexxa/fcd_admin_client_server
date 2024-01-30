const userModel = require('./../../model/userAndRoles/user');
const { v4: uuidv4 } = require('uuid');

exports.addUser =(req,res)=>{
    console.log(req.body)
    const userAdd = new userModel.userModel({
        user_id:uuidv4(),
        name:req.body.name,
        emailid:req.body.emailid,
        phone:req.body.phone,
        password:req.body.password,
        role_id:req.body.role_id,
        role_name:req.body.role_name,
    });
 
    userAdd.save().then((c)=>{
        console.log("date saved")
        res.send({"dadat":"saved"})
    })
}


exports.retriveUser=(req,res)=>{
userModel.userModel.find().then((data)=>{
    res.send({"data":data})
})
}

exports.deleteUser=(req,res)=>{
    userModel.userModel.deleteOne({user_id:req.body.user_id}).then((s)=>{
        res.send({data:"deleted"})
    })
}

exports.editUser=(req,res)=>{
    console.log(req.body)
    userModel.userModel.updateOne({user_id:req.body.user_id},{
        name:req.body.name,
        emailid:req.body.emailid,
        phone:req.body.phone,
        password:req.body.password,
        role_id:req.body.role_id,
        role_name:req.body.role_name,
    }).then((s)=>{
       res.send({"data":"update"})
    })
}