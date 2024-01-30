const mongoose  = require('mongoose')
const contactmodel = require('../../model/client/contacts')
const client_model = require('../../model/client/client')
const user_model = require('../../model/userAndRoles/user')
const { v4: uuidv4 } = require('uuid');

exports.addContact=(req,res)=>{

contactmodel.contactmodel.find({email_id:req.body.email_id}).then((dd)=>{
    if(dd.length > 0){
//// user exists
res.send({data:"Contact Already Exists",status:false})
    }else{
       client_model.clientModel.find({user_name:req.body.email_id}).then((dc)=>{
        if(dc.length > 0){
//// user exists
res.send({data:"Contact Already Exists",status:false})
        }else{
            user_model.userModel.find({emailid:req.body.email_id}).then((ddd)=>{
                if(ddd.length > 0){
//// user exists
res.send({data:"Contact Already Exists",status:false})
                }else{
///////////// add contacts ////////////////

const add_contact = new contactmodel.contactmodel({
   contact_id:uuidv4(),
   client_id:req.body.client_id,
   department_id:req.body.department_id,
   department_name:req.body.department_name,
   contact_registered:Date(), 
   first_name:req.body.first_name,
   last_name:req.body.last_name,
   email_id:req.body.email_id,
   phone_no:req.body.phone_no,
   job_title:req.body.job_title,
   password:req.body.password,
   profile_url:"",
   facebook_link:"",
   instagram_link:"",
   whatsapp_no:"",
   linkedin_url:"",
   gender:"",
   login_date:null,
   is_active:true,
})

add_contact.save().then((data)=>{
   res.send({data:"Contact Added",status:true})
})
                }
            })
        }
       })
    }
})
}




exports.retriveAllContacts=(req,res)=>{
    contactmodel.contactmodel.find({client_id:req.body.client_id}).then((data)=>{
        res.send({data:data})
    })
}




exports.editContacts=(req,res)=>{
    contactmodel.contactmodel.updateOne({contact_id:req.body.contact_id},{
        department_id:req.body.department_id,
        department_name:req.body.department_name,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email_id:req.body.email_id,
        phone_no:req.body.phone_no,
        job_title:req.body.job_title,
        password:req.body.password,
        
    }).then((data)=>{
res.send({data:"done"})
    })
}





exports.editContactsFromContactDesPage=(req,res)=>{
    contactmodel.contactmodel.updateOne({contact_id:req.body.contact_id},{
        department_id:req.body.department_id,
        department_name:req.body.department_name,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email_id:req.body.email_id,
        phone_no:req.body.phone_no,
        job_title:req.body.job_title,
        password:req.body.password,
        profile_url:"",
        facebook_link:req.body.facebook,
        instagram_link:req.body.instagram,
        whatsapp_no:req.body.whatsapp_no,
        linkedin_url:req.body.linkedin,
        gender:req.body.gender,
        
    }).then(()=>{
contactmodel.contactmodel.find({contact_id:req.body.contact_id}).then((data)=>{
    res.send({data:data})
})
    })
}







exports.deleteContacts=(req,res)=>{
    contactmodel.contactmodel.deleteOne({contact_id:req.body.contact_id}).then(()=>{
        res.send({data:"deleted"})
    })
}


exports.retriveAllContactByDepartmentId=(req,res)=>{
    contactmodel.contactmodel.find({department_id:req.body.department_id}).sort('-_id').then((data)=>{
    res.send({data:data})
    })
}


exports.changeContactStatus=(req,res)=>{
    console.log(req.body)
    contactmodel.contactmodel.updateOne({contact_id:req.body.contact_id},{is_active:req.body.is_active}).then((s)=>{
        res.send({
            data:"status updated"
        })
    })
}







////////////////////// add contact for client side ///////////////



















































/*

exports.departmentLogedInBetweenDateRange=(req,res)=>{
    let departmentLoginToday = 0;
    let departmentLogInSevenDays = 0;
    departmentModel.departmentModel.countDocuments({login_date : {$gte:moment().format('DD-MM-YYYY'), $lt: moment().subtract(1, "days")}}).then((s)=>{
    departmentLoginToday = s
    }).then(()=>{
        departmentModel.departmentModel.countDocuments({login_date : {$gte:moment().format('DD-MM-YYYY'), $lt: moment().subtract(7, "days")}}).then((p)=>{
            departmentLogInSevenDays = p
        })
    }).then(()=>{
        console.log(departmentLoginToday,departmentLogInSevenDays)
        res.send({
         departmentLoginToday : departmentLoginToday,
         departmentLogInSevenDays : departmentLogInSevenDays
        })
    })

}


mm()

async function mm(){
    let departmentLoginToday = 0;
    let departmentLogInSevenDays = 0;

   
let initialDate = moment().subtract(1,'day').format('YYYY-DD-MM')
let secondInitDate = moment().add(1,'day').format('YYYY-DD-MM')
let after_seven_day = moment().subtract(7,'day').format('YYYY-DD-MM')

console.log(
    initialDate ,
     secondInitDate ,
    after_seven_day
      
)


await departmentModel.departmentModel.countDocuments({login_date : {$gt:new Date(after_seven_day), $lt: new Date()}}).then((p)=>{
    departmentLogInSevenDays = p
})


    departmentModel.departmentModel.countDocuments({login_date : {$gt:new Date(initialDate), $lt: new Date(secondInitDate)}}).then((s)=>{
     departmentLoginToday = s
    }).then(async()=>{
       
    }).then(()=>{
        console.log(departmentLoginToday,departmentLogInSevenDays)
       
    })
}


*/











/*
const client_model = require('../../model/client/client')
const user_model = require('../../model/userAndRoles/user')
const { v4: uuidv4 } = require('uuid');
const moment  = require('moment');
const { requiredNumberForOverViewPage } = require('./client');


exports.addDepartment=(req,res)=>{
    const add_department = new  departmentModel.departmentModel({
        client_id:req.body.client_id,
        department_id:uuidv4(),
        department_registered:Date(), 
        department_name:req.body.department_name,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email_id:req.body.email_id,
        phone_no:req.body.phone_no,
        job_title:req.body.job_title,
        password:req.body.password,
        is_admin:req.body.is_admin,
profile_url:"",

facebook_link:"",
instagram_link:"",
whatsapp_no:"",
linkedin_url:"",
login_date:null
    })
    add_department.save().then(()=>{
        res.send({"data":"done"})
    });

}


exports.editDepartment=(req,res)=>{
departmentModel.departmentModel.updateOne({ client_id:req.body.client_id,department_id:req.body.department_id},{
    department_name:req.body.department_name,
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email_id:req.body.email_id,
    phone_no:req.body.phone_no,
    job_title:req.body.job_title,
    password:req.body.password,
    is_admin:req.body.is_admin
}).then((data)=>{
    res.send({da:"done"}) 
})
}




exports.editDepartmentFromdepartmentdescription=(req,res)=>{
    departmentModel.departmentModel.updateOne({department_id:req.body.department_id},{
        department_name:req.body.department_name,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email_id:req.body.email_id,
        phone_no:req.body.phone_no,
        job_title:req.body.job_title,
        password:req.body.password,
        facebook_link:req.body.facebook,
        instagram_link:req.body.instagram,
        whatsapp_no:req.body.whatsapp_no,
        linkedin_url:req.body.linkedin,
        
    }).then(()=>{
     departmentModel.departmentModel.findOne({department_id:req.body.department_id}).then((data)=>{
        res.send({data:data})
     })
    })
}







exports.retriveDepartment=(req,res)=>{
    departmentModel.departmentModel.find({client_id:req.body.client_id}).sort({department_registered:-1}).then((data)=>{
        res.send({"data":data})
    })
}

exports.deleteDepartment=(req,res)=>{
    departmentModel.departmentModel.deleteOne({department_id:req.body.department_id}).then((data)=>{
        res.send({da:"done"})
    })

}



exports.retriveDepartmentForcampaignPage = (req,res)=>{
    departmentModel.departmentModel.find({client_id:req.body.client_id}).then((data)=>{
        res.send({data:data})
    })
}



/*

exports.departmentLogedInBetweenDateRange=(req,res)=>{
    let departmentLoginToday = 0;
    let departmentLogInSevenDays = 0;
    departmentModel.departmentModel.countDocuments({login_date : {$gte:moment().format('DD-MM-YYYY'), $lt: moment().subtract(1, "days")}}).then((s)=>{
    departmentLoginToday = s
    }).then(()=>{
        departmentModel.departmentModel.countDocuments({login_date : {$gte:moment().format('DD-MM-YYYY'), $lt: moment().subtract(7, "days")}}).then((p)=>{
            departmentLogInSevenDays = p
        })
    }).then(()=>{
        console.log(departmentLoginToday,departmentLogInSevenDays)
        res.send({
         departmentLoginToday : departmentLoginToday,
         departmentLogInSevenDays : departmentLogInSevenDays
        })
    })

}


mm()

async function mm(){
    let departmentLoginToday = 0;
    let departmentLogInSevenDays = 0;

   
let initialDate = moment().subtract(1,'day').format('YYYY-DD-MM')
let secondInitDate = moment().add(1,'day').format('YYYY-DD-MM')
let after_seven_day = moment().subtract(7,'day').format('YYYY-DD-MM')

console.log(
    initialDate ,
     secondInitDate ,
    after_seven_day
      
)


await departmentModel.departmentModel.countDocuments({login_date : {$gt:new Date(after_seven_day), $lt: new Date()}}).then((p)=>{
    departmentLogInSevenDays = p
})


    departmentModel.departmentModel.countDocuments({login_date : {$gt:new Date(initialDate), $lt: new Date(secondInitDate)}}).then((s)=>{
     departmentLoginToday = s
    }).then(async()=>{
       
    }).then(()=>{
        console.log(departmentLoginToday,departmentLogInSevenDays)
       
    })
}


*/