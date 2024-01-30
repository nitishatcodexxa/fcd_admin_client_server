
const roleModal = require('../model/userAndRoles/roles')
const userModal = require('../model/userAndRoles/user')
const clientModel = require('../model/client/client')
const contactModal = require('../model/client/contacts')
var jwt = require('jsonwebtoken');

exports.login= (req,res)=>{
let userName = req.body.user_name.replace(/ /g,'')
let password = req.body.password.replace(/ /g,'')
userModal.userModel.find({emailid:userName,password:password}).then((adminData)=>{ 
if(adminData.length > 0){
roleModal.rolesModel.findOne({role_id:adminData[0].role_id}).then((roles)=>{
let user_data = {user_id:adminData[0].user_id,email_id:adminData[0].emailid,phone_no:adminData[0].phone,password:adminData[0].password,role_id:adminData[0].role_id}
  jwt.sign(user_data, process.env.SECURITY_KEY, function(err, token) {
  if(token){
   res.send({roles:roles,token:token,crm_admin:true,client:false,is_client_admin:false}) 
  }else{
    console.log(err)
    res.send({"message":"Failed login"})
  }
  });
})
}else{

contactModal.contactmodel.find({email_id:userName,password:password}).then((contactData)=>{
    if(contactData.length > 0){
      
      jwt.sign({dept_id:contactData[0].department_id}, process.env.SECURITY_KEY, function(err, token) {
        if(token){

          res.send({token:token,is_client_admin:false,client_id:contactData[0].client_id ,   department_id:contactData[0].department_id, department_name:contactData[0].department_name,  email_id:contactData[0].email_id, phone_no:contactData[0].phone_no ,crm_admin:false  ,client:true,payload:contactData[0]}) ;

          departmentModel.departmentModel.updateOne({department_id:contactData[0].department_id},{login_date:Date()}).then((p)=>{
         
          })
        }
        });
   
      //  res.send({roles:s,token:'676gu1y7gr7g7r7',admin:false,client:true}) 
    }else{

    clientModel.clientModel.find({user_name:userName,password:password}).then((clientData)=>{
    if(clientData.length > 0){
      
    jwt.sign({client_id:clientData[0].client_id}, process.env.SECURITY_KEY, function(err, token) {
    
      if(token){
      res.send({token:token,is_client_admin:true,client_id:clientData[0].client_id,department_id:"",department_name:"",email_id:"",phone_no:"",crm_admin:false,client:true,payload:clientData[0]}) ;
    }

    });

}else{
res.send({data:"error",status:"user not exists"})
}


})}
})




}})
}