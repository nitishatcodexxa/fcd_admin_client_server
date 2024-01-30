import React, { Component, useEffect, useState } from 'react'
import {Box, Card, Paper,Grid,Divider, Typography,IconButton,Checkbox, Button,Stack ,Alert} from '@mui/material'

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../img/logo.jpeg'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import checkbox from 'rc-checkbox';
import base from '../base'
import { useNavigate,useLocation, Link, json } from 'react-router-dom';
//import base_url from '../base'
function Login(props) {
  const navigate = useNavigate()
  const location = useLocation()

  const [showpassword,SetshowPassword] =useState(true);
  const [username,Setusername] =useState("");
  const [password,Setpassword] =useState("");
  const [showAlert,SetshowAlert] = useState(false)


useEffect(()=>{
 
if(location.pathname==="/"){
//props.cl();
}
},[])




function autoCloseWarning(){
  setTimeout(()=>{
  SetshowAlert(false)
  },4000)
}


 function login(){

    fetch(`${base.base_url}/login`, {
      headers:{
        'authorization': `Bewindow.sessionStorage.getItem('token')}`,
    'content-type':'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
          method: "post",
          body:JSON.stringify({
       user_name:username,
       password:password,
            })
  
        }).then(function(response) {
          return response.json();
        })
        .then(async(data)=> {
  
if(data.data!=="error"){

  if(data.crm_admin){

    //// roles setting
window.sessionStorage.setItem('client_role',JSON.stringify(data.roles.client))   //// for client model roles
window.sessionStorage.setItem('campaign_role',JSON.stringify(data.roles.campaign))
window.sessionStorage.setItem('user_and_roles',JSON.stringify(data.roles.User_And_Roles))
window.sessionStorage.setItem('lead_role',JSON.stringify(data.roles.lead))
window.sessionStorage.setItem('rfp_role',JSON.stringify(data.roles.rfp))
window.sessionStorage.setItem('invoice_role',JSON.stringify(data.roles.invoice))
window.sessionStorage.setItem('report_role',JSON.stringify(data.roles.report))
///// for token setting
window.sessionStorage.setItem('token',data.token)
//// type setting 
window.sessionStorage.setItem('credential_type',JSON.stringify({Crm_Admin:data.crm_admin,client:data.client,is_client_admin:data.is_client_admin}))

window.open('/dashboard',"_self")

//    navigate('/dashboard')

   }else{
 

  sessionStorage.setItem('token_client',data.token)
  sessionStorage.setItem('credential_type_client',JSON.stringify({Crm_Admin:data.crm_admin,client:data.client,client_id:data.client_id,is_admin:data.is_client_admin}))
  
  sessionStorage.setItem('AllClientData',JSON.stringify({'client_id':data.client_id,'department_id':data.department_id,'department_name':data.department_name,'email_id':data.email_id,'phone_no':data.phone_no,is_admin:data.is_client_admin}))
  sessionStorage.setItem('payload',JSON.stringify(data.payload))
  sessionStorage.setItem('client_id',data.client_id)
  sessionStorage.setItem('department_id',data.department_id)
  sessionStorage.setItem('department_name',data.department_name)
  sessionStorage.setItem('email_id',data.email_id)
  sessionStorage.setItem('phone_no',data.phone_no)

    //  navigate('/clientDashboard')
      window.open('/clientDashboard',"_self")
   }

}else{
SetshowAlert(true);
autoCloseWarning();
}
 
});
}



  return (
    <div>
    <Box sx={{backgroundColor:"#f8f9ff",width:'100%',height:'100vh'}}>
    <Box sx={{display:'flex',justifyContent:'center'}}>
    <Box sx={{display:'flex',alignItems:'center',height:{xs:500,sm:500},width:{xs:'90%',sm:600,md:800},position:'absolute',top:80}}>
    <Card sx={{height:'100%',width:'100%',borderRadius:3}}>
    
    <Grid container spacing={2}>
      <Grid item xs={0} sm={5} md={5} lg={5} sx={{display:{xs:'none',sm:'block'}}}>
      <Box sx={{display:'flex',justifyContent:'center'}}>
    <Box sx={{display:'flex',alignItems:'center'}}>
    
    <img src={logo} style={{height:500,width:'100%',objectFit:'contain',padding:10}}/>
    <Divider orientation="vertical" flexItem style={{marginTop:70,marginBottom:70}} />
    </Box>
      </Box>
      </Grid>
    
      <Grid item xs={12} sm={7} md={7} lg={7}>
      <Box sx={{display:'flex',justifyContent:'center',width:'100%'}}>
    <Box sx={{display:'flex',alignItems:'center',width:'100%'}}>
      <Box sx={{display:'flex',flexDirection:'column',width:'100%'}}>
    
    <Box sx={{height:500,marginLeft:3,marginRight:{xs:3,sm:8}}}>
    <Typography sx={{textAlign:'left',fontSize:{xs:16,sm:20},fontWeight:'800',marginTop:9}}>Login</Typography>
    
    
    <Typography sx={{textAlign:'left',fontSize:{xs:11,sm:13},fontWeight:'600',marginTop:3,marginBottom:0.1}}>User Name</Typography>
    <Box sx={{border:1,borderRadius:1,borderColor:'#a2a2a6'}}>
    <TextField
    size='small'
    sx={{padding:0.5,"& input::placeholder": {
        fontSize: "13px"
      }}}
    fullWidth
            id="input-with-icon-textfield"
            placeholder='Email Id'
            name='user_name'
            onChange={(e)=>Setusername(e.target.value)}
            value={username}
            InputProps={{
                disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon style={{color:'#a2a2a6'}} />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
    
    </Box>
    
    
    
    
    <Typography sx={{textAlign:'left',fontSize:{xs:11,sm:13},fontWeight:'600',marginTop:1,marginBottom:0.1}}>Password</Typography>
    <Box sx={{border:1,borderRadius:1,borderColor:'#a2a2a6'}}>
    <TextField
              id="filled-start-adornment"
              sx={{padding:0.5,"& input::placeholder": {
                fontSize: "13px"
              }}}
              name="password"
              value={password}
            onChange={(e)=>Setpassword(e.target.value)}
              placeholder='Your Password'
              size='small'
              fullWidth
              type= {showpassword?'text':'password'}
              InputProps={{  
               
                disableUnderline: true,
                endAdornment:(
                    <InputAdornment position="start">
                     {
                      showpassword? <Visibility style={{color:'#a2a2a6'}} onClick={()=>SetshowPassword(false)}/>:<VisibilityOff onClick={()=>SetshowPassword(true)} style={{color:'#a2a2a6'}}/> 
                     } 
                    </InputAdornment>
                  ),
                startAdornment: (
                    <InputAdornment position="start">
                     <LockIcon style={{color:'#a2a2a6'}} />
                    </InputAdornment>
                  ),
              }}
              variant="standard"
            />
    
    </Box>
    
    
    
    <Typography sx={{textAlign:'right',color:'red',fontSize:'13px',marginTop:2}}></Typography>
    
    <Box sx={{display:'flex',flexDirection:'row',marginTop:1,justifyContent:'left',alignItems:'center'}}>
    <Checkbox defaultChecked size='small' style={{color:'#2f84cf '}}/>
    <Typography sx={{fontSize:'13px'}}>Remember me</Typography>
    </Box>
    
    
    <Box sx={{marginTop:6,marginLeft:4,marginRight:4}}>
     
        <Button onClick={login}  type='submit'   variant="contained" fullWidth size='small' sx={{backgroundColor:'#2f84cf '}}>Login</Button>
 
    </Box>
    
    
    
    
  
    
    
    </Box>
      </Box>
    </Box>
    </Box>
      </Grid>

    </Grid>
    </Card>
    </Box>
    </Box>
    </Box>


<Box>
    <Paper elevation={2} sx={{display:showAlert?'flex':'none',position:'absolute',top:8,right:15}}>
    <Alert severity="warning" sx={{fontSize:12,fontWeight:'600',paddingLeft:2}} onClose={() => {SetshowAlert(false)}}>
     User Not Exists .....    
    </Alert>
    </Paper>
</Box>
          </div>
  )
}

export default Login






























