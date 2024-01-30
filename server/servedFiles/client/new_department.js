const new_department_model = require('../../model/client/department_new')
const contactmodal = require('../../model/client/contacts')
const { v4: uuidv4 } = require('uuid');



exports.add_new_department =(req,res)=>{
const add_dept = new new_department_model.new_department_model({
    department_name : req.body.department_name,
    department_id : Date.now(),
    created_at : Date(),
    client_id:req.body.client_id,
}) 
add_dept.save().then((s)=>{
    res.send({"data":"added data"})
})
}



exports.deleteDepartment=(req,res)=>{
    new_department_model.new_department_model.deleteOne({department_id:req.body.department_id}).then(()=>{
        res.send({data:"deleted"})
    }).then(()=>{
        contactmodal.contactmodel.deleteMany({department_id:req.body.department_id}).then((data)=>{
            //// alll contact deleted of specific department id
        })
    })
}


exports.editDepartment=(req,res)=>{
    new_department_model.new_department_model.updateOne({department_id:req.body.department_id,client_id:req.body.client_id},{
        department_name : req.body.department_name,
    }).then((data)=>{
        res.send({"data":"updated"})
    })
}


exports.retriveAllDepartment=(req,res)=>{
    new_department_model.new_department_model.find({client_id:req.body.client_id}).sort('-_id').then((data)=>{
        res.send({data:data,status:"succesfull"})
    })
}


exports.retriveAllDepartmentForAdminClientContactPage=(req,res)=>{
    new_department_model.new_department_model.find({client_id:req.body.client_id},{department_name:1,department_id:1}).sort('-_id').then((data)=>{
        res.send({data:data})
    })
}








//////////////// add department from client side //////////////////////////////