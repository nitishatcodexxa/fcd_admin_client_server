import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Grid, Paper, Typography, FormControl,Select,touchRippleClasses } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,Link,IconButton,TableBody,Table,Modal,MenuItem,Tab,Tabs,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import Checkbox from 'rc-checkbox';
import { Form } from 'react-router-dom'
import base from '../base'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate,useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

export class Addclient extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       tab_value:'general_info',

/////////////////// data for client add       (general innfo) ////////////////

client_name:"",
client_phone:"",
client_group:"",
client_address_1:"",
client_address_2:"",
client_postal_code:"",
client_country:"",
client_state:"",
client_city:"",
client_email:"",
client_password:"",
////////////////// primary_contact
p_client_designation:"",
p_name:"",
p_phone:"",
p_email:"",
p_address:"",
p_postal_code:"",
p_country:"",
p_state:"",
p_city:"",

///////////////////// billing info

billing_name:"",
biling_email_id:"",
billing_phone:"",
billing_address:"",
billing_postal_code:"",
billing_country:"",
billing_state:"",
billing_city:"",
billing_gst_no:"",
billing_currency:"",
billing_symbol:"",

//////////////////////// doc descriopm and set up 
document:[],
documentName:[],
doc_name:"",
doc_id:"",
files:'',

    }
    this.handleChange=this.handleChange.bind()
    this.handleChangeee = this.handleChangeee.bind()
  }

handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

handleChangeee=(e)=>{
  this.setState({[e.target.name]:e.target.files[0]})
}
  componentDidMount(){
    setTimeout(()=>{
this.setState({is_loader_open:false})
    },1000) 
  }

  succes=()=>{
    toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Client Successfully Added</Typography>, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      icon: "🚀",
      theme: "colored",
      });
  }
  

  fieldunfilled=()=>{
    toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Fill All Fields </Typography>, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      icon: "🚀",
      theme: "colored",
      });
  }

  ////////// send data to server
submit=()=>{
  /// this.state.client_name=="" || this.state.client_phone=="" || this.state.client_designation=="" || this.state.client_group=="" || this.state.client_address_1=="" || this.state.client_address_2=="" || this.state.client_postal_code=="" || this.state.client_country=="" || this.state.client_state=="" || this.state.client_city=="" || this.state.p_name=="" || this.state.p_phone=="" || this.state.p_email=="" || this.state.p_address=="" || this.state.p_postal_code=="" || this.state.p_country=="" || this.state.p_state=="" || this.state.p_city=="" || this.state. billing_name=="" || this.state.biling_email_id=="" || this.state. billing_phone=="" || this.state.billing_address=="" || this.state.billing_postal_code=="" || this.state.billing_country=="" || this.state.billing_state=="" || this.state.billing_city=="" || this.state.billing_gst_no=="" || this.state. billing_currency==""|| this.state. billing_symbol==""
  if(this.state.client_name=="" || this.state.client_phone=="" || this.state.client_designation=="" || this.state.client_group=="" || this.state.client_address_1=="" || this.state.client_address_2=="" || this.state.client_postal_code=="" || this.state.client_country=="" || this.state.client_state=="" || this.state.client_city=="" || this.state.p_name=="" || this.state.p_phone=="" || this.state.p_email=="" || this.state.p_address=="" || this.state.p_postal_code=="" || this.state.p_country=="" || this.state.p_state=="" || this.state.p_city=="" || this.state. billing_name=="" || this.state.biling_email_id=="" || this.state. billing_phone=="" || this.state.billing_address=="" || this.state.billing_postal_code=="" || this.state.billing_country=="" || this.state.billing_state=="" || this.state.billing_city==""  || this.state. billing_currency==""|| this.state. billing_symbol==""){
this.fieldunfilled();
  }else{
    const documentNameArray=[]
    let formData = new FormData();
    
    for (let i = 0; i < this.state.document.length; i++) {
    formData.append('files',this.state.document[i].doc_url);
    documentNameArray.push(this.state.document[i].doc_name)
    }
    
    formData.append('documentNameList',JSON.stringify(documentNameArray))
    formData.append('client_name',this.state.client_name)
    formData.append('client_phone',this.state.client_phone)
    formData.append('client_group',this.state.client_group)
    formData.append('client_address_1',this.state.client_address_1)
    formData.append('client_address_2',this.state.client_address_2)
    formData.append('client_postal_code',this.state.client_postal_code)
    formData.append('client_country',this.state.client_country)
    formData.append('client_state',this.state.client_state)
    formData.append('client_city',this.state.client_city)
    formData.append('client_email',this.state.client_email)
    formData.append('client_password',this.state.client_password)
    ////////// primary content
    formData.append('p_client_designation',this.state.p_client_designation)
    formData.append("p_name",this.state.p_name)
    formData.append('p_phone',this.state.p_phone)
    formData.append('p_email',this.state.p_email)
    formData.append('p_address',this.state.p_address)
    formData.append('p_postal_code',this.state.p_postal_code)
    formData.append('p_country',this.state.p_country)
    formData.append('p_state',this.state.p_state)
    formData.append('p_city',this.state.p_city)
    
    ///////////////// billing info 
    
    formData.append("billing_name",this.state.billing_name)
    formData.append('biling_email_id',this.state.biling_email_id)
    formData.append('billing_phone',this.state.billing_phone)
    formData.append('billing_address',this.state.billing_address)
    formData.append('billing_postal_code',this.state.billing_postal_code)
    formData.append('billing_country',this.state.billing_country)
    formData.append('billing_state',this.state.billing_state)
    formData.append('billing_city',this.state.billing_city)
    formData.append('billing_gst_no',this.state.billing_gst_no)
    formData.append('billing_currency',this.state.billing_currency)
    formData.append('billing_symbol',this.state.billing_symbol)
    
    fetch(`${base.base_url}/addClient`,{
      method:'post',
      body:formData,
    }).then((res)=>{return res.json()}).then((result)=>{
      this.props.navigate('/client')
     
      this.setState({
      form_open:false,
client_name:"",
client_phone:"",
client_designation:"",
client_group:"",
client_address_1:"",
client_address_2:"",
client_postal_code:"",
client_country:"",
client_state:"",
client_city:"",
client_email:"",
client_password:"",
////////////////// primary_contact

p_client_designation:"",
p_name:"",
p_phone:"",
p_email:"",
p_address:"",
p_postal_code:"",
p_country:"",
p_state:"",
p_city:"",
///////////////////// billing info

billing_name:"",
biling_email_id:"",
billing_phone:"",
billing_address:"",
billing_postal_code:"",
billing_country:"",
billing_state:"",
billing_city:"",
billing_gst_no:"",
billing_currency:"",
billing_symbol:"",
/////////////////// files
document:[],
documentName:[],
doc_name:"",
doc_id:"",
files:"",

      })

    })
  }
  }


  removeDoc=(id)=>{
  let filterData = this.state.document.filter((e)=> e.id!==id);
   this.setState({document:filterData});
  }


  render() {

    
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Add Client</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Add Client</Typography>
</Box>
</Paper>
<Paper sx={{width:'100%',minHeight:600,mt:2}}>
<Box sx={{width:'100%',height:50,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
<Tabs
  value={this.state.tab_value}
  //onChange={this.handleChange}
  textColor="primary"
  indicatorColor="primary"
  aria-label="tab-selector"
>
  <Tab value="general_info" sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:''}} label="General Info"  onClick={()=>this.setState({tab_value:"general_info"})}/>
  <Tab value="billing_info" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Billing Info" onClick={()=>this.setState({tab_value:"billing_info"})}/>
  <Tab value="attachment" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Attachment" onClick={()=>this.setState({tab_value:"attachment"})}/>
</Tabs>
</Box>


<br/>



{
<Box sx={{ml:{xs:'1%',sm:'3%',md:'10%'},mr:{xs:'1%',sm:'3%',md:'10%'},display:this.state.tab_value==="general_info"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client Group<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' select onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.client_type}  name="client_type" fullWidth size='small'>
  {
    [{id:1,name:'Direct'},{id:2,name:"Agency"},{id:3,name:'Publisher'}].map((s)=>(
      <MenuItem sx={{fontSize:12,fontWeight:'600'}} key={s.id} value={s.name} onClick={()=>this.setState({client_group:s.name})}>
      {s.name}
      </MenuItem>
    ))
  }
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.client_name} name="client_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Phone No<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.client_phone} name="client_phone" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address 1<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.client_address_1} name="client_address_1" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address 2<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} name="client_address_2" value={this.state.client_address_2} fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Postal Code <Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.client_postal_code}  name="client_postal_code" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField   select InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.client_country} name="client_country" fullWidth size='small'>
{country.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))
  
 }
</TextField>

</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.client_state} name="client_state" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.client_city} name="client_city" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client Email (For Login)<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.client_email} name="client_email" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Password<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.client_password} name="client_password" fullWidth size='small'/>
</Box>
</Grid>
</Grid>
<br/>
<br/>
<Typography sx={{fontSize:15,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Primary Contact<Typography sx={{color:'red'}}>*</Typography></Typography>
<br/>


<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  name="p_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Phone No<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_phone}  name="p_phone" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Designation<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.p_client_designation}  name="p_client_designation" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Email ID<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_email}  name="p_email" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address 1<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.p_address} name="p_address" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Postal Code<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_postal_code}  name="p_postal_code" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.p_country} name="p_country" fullWidth size='small'>
{country.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))
  
 }
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_state} name="p_state" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.p_city}  name="p_city" fullWidth size='small'/>
</Box>
</Grid>


</Grid>

<br/>
<br/>
<Button variant='contained' size='small' onClick={()=>this.setState({tab_value:'billing_info'})}  sx={{width:100,textTransform:'none',mr:1}}>Next</Button>
<br/>
<br/>
<br/>
<br/>

</Box>
}









{
    <Box sx={{ml:{xs:'1%',sm:'3%',md:'10%'},mr:{xs:'1%',sm:'3%',md:'10%'},display:this.state.tab_value==="billing_info"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Billing Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.billing_name}  name="billing_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
 <Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Email ID<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.biling_email_id} name="biling_email_id" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Phone Number<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_phone}  name="billing_phone" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Address 1<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_address}  name="billing_address" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Country<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.billing_country} name="billing_country" fullWidth size='small'>
{country.map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))
  
 }
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Postal Code<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_postal_code}  name="billing_postal_code" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>State<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  onChange={this.handleChange} value={this.state.billing_state} name="billing_state" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
< Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>City<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_city}  name="billing_city" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Currency<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.billing_currency} name="billing_currency" fullWidth size='small'>
{[{ id:1,currency:"INR",currency_symbole:"₹"},{id:2,currency:"USD",currency_symbole:"$"},{id:3,currency:"Pounds",currency_symbole:"₤"},{id:4,currency:"Australian Dollar",currency_symbole:"AU$"}].map((option) => (
            <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.currency} onClick={()=>this.setState({billing_currency:option.currency,billing_symbol:option.currency_symbole})}>
              {option.currency}
            </MenuItem>
          ))}
</TextField>
</Box>
</Grid>



<Grid item xs={12} sm={6} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Currency Symbol<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.billing_symbol}  name="billing_symbol" fullWidth size='small'>
</TextField>
</Box>
</Grid>
</Grid>


<br/>

<Button variant='contained' size='small' onClick={()=>this.setState({tab_value:'attachment'})}  sx={{width:100,textTransform:'none'}}>Next</Button>

<br/>
<br/>
<br/>
<br/>

</Box>
}




{
    <Box sx={{ml:{xs:'3%',sm:'5%',md:'25%'},mr:{xs:'2%',sm:'5%',md:'25%'},display:this.state.tab_value==="attachment"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={12} >
<Box >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Documents<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange} value={this.state.doc_name} name="doc_name" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={12} >
<Box >
<input type='file'   name='files' onChange={this.handleChangeee}/>
</Box>
</Grid>
<br/>
<br/>
<br/>
<Button size='small' onClick={()=> 

 this.setState(prevState => ({
    document: [...prevState.document, {id:Math.round(Math.random() * 10000000000),doc_url:this.state.files,doc_name:this.state.doc_name}] 
  }),()=>{
    this.setState({
    doc_name:"",
    doc_id:"",
    files:""})
  })



   }  disableElevation variant='contained' startIcon={<AddIcon/>} sx={{textTransform:"none",ml:2,height:30}}>Add More</Button>
<br/>
<br/>
<br/>
<Divider/>
<br/>
{
  this.state.document.map((e)=>(
    <Grid item xs={12} sm={12} >
    <Box >
    <TextField  value={e.doc_name}  InputProps={{sx:{fontSize:12,fontWeight:'600'},endAdornment:<IconButton onClick={this.removeDoc.bind(this,e.id)}><CloseIcon sx={{color:'red'}}/></IconButton>}}  name="first_name" fullWidth size='small' />
    </Box>
    </Grid>
  ))
}

</Grid>


<br/>

<Button variant='contained' disableElevation size='small' onClick={this.submit}  sx={{width:100,textTransform:'none'}}>Save</Button>

<br/>
<br/>
<br/>


</Box>
}














</Paper>
</Box>
</Box>
</Box>

<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
</Box>

<Box sx={{display:'none',position:'fixed',bottom:40,right:10}}>
 <Chat/> 
</Box>



<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>


     </div>
    )
  }
}

export default Addclient



export function Addclientc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Addclient location={location} navigate={navigate}></Addclient>)
}


















const country= ['Afghanistan',
'Albania',
'Algeria',
'Andorra',
'Angola',
'Antigua and Barbuda',
'Argentina',
'Armenia',
'Australia',
'Austria',
'Azerbaijan',
'The Bahamas',
'Bahrain',
'Bangladesh',
'Barbados',
'Belarus',
'Belgium',
'Belize',
'Benin',
'Bhutan',
'Bolivia',
'Bosnia and Herzegovina',
'Botswana',
'Brazil',
'Brunei',
'Bulgaria',
'Burkina Faso',
'Burundi',
'Cabo Verde',
'Cambodia',
'Cameroon',
'Canada',
'Central African Republic',
'Chad',
'Chile',
'China',
'Colombia',
'Comoros',
'Congo, Democratic Republic of the',
'Congo, Republic of the',
'Costa Rica',
'Côte d’Ivoire',
'Croatia',
'Cuba',
'Cyprus',
'Czech Republic',
'Denmark',
'Djibouti',
'Dominica',
'Dominican Republic',
'East Timor (Timor-Leste)',
'Ecuador',
'Egypt',
'El Salvador',
'Equatorial Guinea',
'Eritrea',
'Estonia',
'Eswatini',
'Ethiopia',
'Fiji',
'Finland',
'France',
'Gabon',
'The Gambia',
'Georgia',
'Germany',
'Ghana',
'Greece',
'Grenada',
'Guatemala',
'Guinea',
'Guinea-Bissau',
'Guyana',
'Haiti',
'Honduras',
'Hungary',
'Iceland',
'India',
'Indonesia',
'Iran',
'Iraq',
'Ireland',
'Israel',
'Italy',
'Jamaica',
'Japan',
'Jordan',
'Kazakhstan',
'Kenya',
'Kiribati',
'Korea, North',
'Korea, South',
'Kosovo',
'Kuwait',
'Kyrgyzstan',
'Laos',
'Latvia',
'Lebanon',
'Lesotho',
'Liberia',
'Libya',
'Liechtenstein',
'Lithuania',
'Luxembourg',
'Madagascar',
'Malawi',
'Malaysia',
'Maldives',
'Mali',
'Malta',
'Marshall Islands',
'Mauritania',
'Mauritius',
'Mexico',
'Micronesia, Federated States of',
'Moldova',
'Monaco',
'Mongolia',
'Montenegro',
'Morocco',
'Mozambique',
'Myanmar (Burma)',
'Namibia',
'Nauru',
'Nepal',
'Netherlands',
'New Zealand',
'Nicaragua',
'Niger',
'Nigeria',
'North Macedonia',
'Norway',
'Oman',
'Pakistan',
'Palau',
'Panama',
'Papua New Guinea',
'Paraguay',
'Peru',
'Philippines',
'Poland',
'Portugal',
'Qatar',
'Romania',
'Russia',
'Rwanda',
'Saint Kitts and Nevis',
'Saint Lucia',
'Saint Vincent and the Grenadines',
'Samoa',
'San Marino',
'Sao Tome and Principe',
'Saudi Arabia',
'Senegal',
'Serbia',
'Seychelles',
'Sierra Leone',
'Singapore',
'Slovakia',
'Slovenia',
'Solomon Islands',
'Somalia',
'South Africa',
'Spain',
'Sri Lanka',
'Sudan',
'Sudan, South',
'Suriname',
'Sweden',
'Switzerland',
'Syria',
'Taiwan',
'Tajikistan',
'Tanzania',
'Thailand',
'Togo',
'Tonga',
'Trinidad and Tobago',
'Tunisia',
'Turkey',
'Turkmenistan',
'Tuvalu',
'Uganda',
'Ukraine',
'United Arab Emirates',
'United Kingdom',
'United States',
'Uruguay',
'Uzbekistan',
'Vanuatu',
'Vatican City',
'Venezuela',
'Vietnam',
'Yemen',
'Zambia',
'Zimbabwe'];


const industry = [
    "Abrasives and Nonmetallic Minerals Manufacturing", 
    "Accommodation",
    "Accounting Domain",
    "Administration of Justice",
    "Administrative and Support Services",
    "Advertising Services",
    "Agricultural Chemical Manufacturing",
    "Agriculture, Construction, Mining Machinery Manufacturing",
    "Air, Water, and Waste Program ",
    "Airlines and Aviation",
    "Alternative Dispute Resolution",
    "Alternative Medicine",
    "Ambulance Services",
    "Amusement Parks and Arcades",
    "Animal Feed Manufacturing",
    "Animation and Post-production",
    "Apparel Manufacturing",
    "Appliances, Electrical, and Electronics Manufacturing",
    "Architectural and Structural Metal Manufacturing",
    "Architecture and Planning",
    "Armed Forces",
    "Artificial Rubber and Synthetic Fiber Manufacturing",
    "Artists and Writers",
    "Audio and Video Equipment Manufacturing",
    "Automation Machinery Manufacturing",
    "Aviation and Aerospace Component Manufacturing",
    "Baked Goods Manufacturing",
    "Banking",
    "Bars, Taverns, and Nightclubs",
    "Bed-and-Breakfasts, Hostels, Homestays",
    "Beverage Manufacturing",
    "Biomass Electric Power Generation",
    "Biotechnology Research",
    "Blockchain Services",
    "Blogs",
    "Boilers, Tanks, and Shipping Container Manufacturing",
    "Book and Periodical Publishing",
    "Book Publishing",
    "Breweries",
    "Broadcast Media Production and Distribution",
    "Building Construction",
    "Building Equipment Contractors",
    "Building Finishing Contractors",
    "Building Structure and Exterior Contractors",
    "Business Consulting and Services",
    "Business Content",
    "Business Intelligence Platforms",
    "Cable and Satellite Programming",
    "Capital Markets",
    "Caterers",
    "Chemical Manufacturing",
    "Chemical Raw Materials Manufacturing",
    "Child Day Care Services",
    "Chiropractors",
    "Circuses and Magic Shows",
    "Civic and Social Organizations",
    "Civil Engineering",
    "Claims Adjusting, Actuarial Services",
    "Clay and Refractory Products Manufacturing",
    "Coal Mining",
    "Collection Agencies",
    "Commercial and Industrial Equipment Rental",
    "Commercial and Industrial Machinery Maintenance",
    "Commercial and Service Industry Machinery Manufacturing",
    "Communications Equipment Manufacturing",
    "Community Development and Urban Planning",
    "Community Services",
    "Computer and Network Security",
    "Computer Games",
    "Computer Hardware Manufacturing",
    "Computer Networking Products",
    "Computers and Electronics Manufacturing",
    "Conservation Programs",
    "Construction",
    "Construction Hardware Manufacturing",
    "Consumer Goods Rental",
    "Consumer Services",
    "Correctional Institutions",
    "Cosmetology and Barber Schools",
    "Courts of Law",
    "Credit Intermediation",
    "Cutlery and Handtool Manufacturing",
    "Dairy Product Manufacturing",
    "Dance Companies",
    "Data Infrastructure and Analytics",
    "Data Security Software Products",
    "Defense and Space Manufacturing",
    "Dentists",
    "Design Services",
    "Desktop Computing Software Products",
    "Distilleries",
    "Economic Programs",
    "Education",
    "Education Administration Programs",
    "E-Learning Providers",
    "Electric Lighting Equipment Manufacturing",
    "Electric Power Generation",
    "Electric Power Transmission, Control, and Distribution",
    "Electrical Equipment Manufacturing",
    "Electronic and Precision Equipment Maintenance",
    "Embedded Software Products",
    "Emergency and Relief Services",
    "Engineering Services",
    "Engines and Power Transmission Equipment Manufacturing",
    "Entertainment Providers",
    "Environmental Quality Programs",
    "Environmental Services",
    "Equipment Rental Services",
    "Events Services",
    "Executive Offices",
    "Executive Search Services",
    "Fabricated Metal Products",
    "Facilities Services",
    "Family Planning Centers",
    "Farming",
    "Farming, Ranching, Forestry",
    "Fashion Accessories Manufacturing",
    "Financial Services",
    "Fine Arts Schools",
    "Fire Protection",
    "Fisheries",
    "Flight Training",
    "Food and Beverage Manufacturing",
    "Food and Beverage Retail",
    "Food and Beverage Services",
    "Footwear and Leather Goods Repair",
    "Footwear Manufacturing",
    "Forestry and Logging",
    "Fossil Fuel Electric Power Generation",
    "Freight and Package Transportation",
    "Fruit and Vegetable Preserves Manufacturing",
    "Fundraising",
    "Funds and Trusts",
    "Furniture and Home Furnishings Manufacturing",
    "Gambling Facilities and Casinos",
    "Geothermal Electric Power Generation",
    "Glass Product Manufacturing",
    "Glass, Ceramics and Concrete Manufacturing",
    "Golf Courses and Country Clubs",
    "Government Administration",
    "Government Relations Services",
    "Graphic Design",
    "Ground Passenger Transportation",
    "Health and Human Services",
    "Higher Education",
    "Highway, Street, and Bridge Construction",
    "Historical Sites",
    "Holding Companies",
    "Home Health Care Services",
    "Horticulture",
    "Hospitality",
    "Hospitals",
    "Hospitals and Health Care",
    "Hotels and Motels",
    "Household and Institutional Furniture Manufacturing",
    "Household Appliance Manufacturing",
    "Household Services",
    "Housing and Community Development",
    "Housing Programs",
    "Human Resources Services",
    "HVAC and Refrigeration Equipment Manufacturing",
    "Hydroelectric Power Generation",
    "Individual and Family Services",
    "Industrial Machinery Manufacturing",
    "Industry Associations",
    "Information Services",
    "Insurance",
    "Insurance Agencies and Brokerages",
    "Insurance and Employee Benefit Funds",
    "Insurance Carriers",
    "Interior Design",
    "International Affairs",
    "International Trade and Development",
    "Internet Marketplace Platforms",
    "Internet News",
    "Internet Publishing",
    "Interurban and Rural Bus Services",
    "Investment Banking",
    "Investment Advice",
    "Investment Management",
    "IT Services and IT Consulting",
    "IT System Custom Software Development",
    "IT System Data Services",
    "IT System Design Services",
    "IT System Installation and Disposal",
    "IT System Operations and Maintenance",
    "IT System Testing and Evaluation",
    "IT System Training and Support",
    "Janitorial Services",
    "Landscaping Services",
    "Language Schools",
    "Laundry and Drycleaning Services",
    "Law Enforcement",
    "Law Practice",
    "Leasing Non-residential Real Estate",
    "Leasing Residential Real Estate",
    "Leather Product Manufacturing",
    "Legal Services",
    "Legislative Offices",
    "Libraries",
    "Lime and Gypsum Products Manufacturing",
    "Loan Brokers",
    "Machinery Manufacturing",
    "Magnetic and Optical Media Manufacturing",
    "Manufacturing",
    "Maritime Transportation",
    "Market Research",
    "Marketing Services",
    "Mattress and Blinds Manufacturing",
    "Measuring and Control Instrument Manufacturing",
    "Meat Products Manufacturing",
    "Media and Telecommunications",
    "Media Production",
    "Medical and Diagnostic Laboratories",
    "Medical Equipment Manufacturing",
    "Medical Practices",
    "Mental Health Care",
    "Metal Ore Mining",
    "Metal Treatments",
    "Metal Valve, Ball, and Roller Manufacturing",
    "Metalworking Machinery Manufacturing",
    "Military and International Affairs",
    "Mining",
    "Mobile Computing Software Products",
    "Mobile Food Services",
    "Mobile Gaming Apps",
    "Motor Vehicle Manufacturing",
    "Motor Vehicle Parts Manufacturing",
    "Movies and Sound Recording",
    "Movies, Videos, and Sound",
    "Museums",
    "Museums, Historical Sites, and Zoos",
    "Musicians",
    "Nanotechnology Research",
    "Natural Gas Distribution",
    "Natural Gas Extraction",
    "Newspaper Publishing",
    "Nonmetallic Mineral Mining",
    "Non-profit Organizations",
    "Nonresidential Building Construction",
    "Nuclear Electric Power Generation",
    "Nursing Homes and Residential Care Facilities",
    "Office Administration",
    "Office Furniture and Fixtures Manufacturing",
    "Oil and Coal Product Manufacturing",
    "Oil and Gas",
    "Oil Extraction",
    "Oil, Gas, and Mining",
    "Online and Mail Order Retail",
    "Online Audio and Video Media",
    "Operations Consulting",
    "Optometrists",
    "Outpatient Care Centers",
    "Outsourcing and Offshoring Consulting",
    "Packaging and Containers Manufacturing",
    "Paint, Coating, and Adhesive Manufacturing",
    "Paper and Forest Product Manufacturing",
    "Pension Funds",
    "Performing Arts",
    "Performing Arts and Spectator Sports",
    "Periodical Publishing",
    "Personal and Laundry Services",
    "Personal Care Product Manufacturing",
    "Personal Care Services",
    "Pet Services",
    "Pharmaceutical Manufacturing",
    "Philanthropic Fundraising Services",
    "Photography",
    "Physical, Occupational and Speech Therapists",
    "Physicians",
    "Pipeline Transportation",
    "Plastics and Rubber Product Manufacturing",
    "Plastics Manufacturing",
    "Political Organizations",
    "Postal Services",
    "Primary and Secondary Education",
    "Primary Metal Manufacturing",
    "Printing Services",
    "Professional Organizations",
    "Professional Services",
    "Professional Training and Coaching",
    "Public Assistance Programs",
    "Public Health",
    "Public Policy Offices",
    "Public Relations and Communications Services",
    "Public Safety",
    "Racetracks",
    "Radio and Television Broadcasting",
    "Rail Transportation",
    "Railroad Equipment Manufacturing",
    "Ranching",
    "Ranching and Fisheries",
    "Real Estate",
    "Real Estate Agents and Brokers",
    "Real Estate and Equipment Rental Services",
    "Recreational Facilities",
    "Religious Institutions",
    "Renewable Energy Equipment Manufacturing",
    "Renewable Energy Power Generation",
    "Renewable Energy Semiconductor Manufacturing",
    "Repair and Maintenance",
    "Research Services",
    "Residential Building Construction",
    "Restaurants",
    "Retail",
    "Retail Apparel and Fashion",
    "Retail Appliances, Electrical, and Electronic Equipment",
    "Retail Art Dealers",
    "Retail Art Supplies",
    "Retail Books and Printed News",
    "Retail Building Materials and Garden Equipment",
    "Retail Florists",
    "Retail Furniture and Home Furnishings",
    
    "Retail Groceries",
    "Retail Health and Personal Care Products",
    "Retail Luxury Goods and Jewelry",
    "Retail Motor Vehicles",
    "Retail Musical Instruments",
    "Office Equipment",
    "Retail Office Supplies and Gifts",
    "Retail Recyclable Materials & Used Merchandise",
    "Reupholstery and Furniture Repair",
    "Rubber Products Manufacturing",
    "Satellite Telecommunications",
    "Savings Institutions",
    "School and Employee Bus Services",
    "Seafood Product Manufacturing",
    "Secretarial Schools",
    "Securities and Commodity Exchanges",
    "Security and Investigations",
    "Security Guards and Patrol Services",
    "Security Systems Services",
    "Semiconductor Manufacturing",
    "Services for Renewable Energy",
    "Services for the Elderly and Disabled",
    "Sheet Music Publishing",
    "Shipbuilding",
    "Shuttles and Special Needs Transportation Services",
    "Sightseeing Transportation",
    "Skiing Facilities",
    "Soap and Cleaning Product Manufacturing",
    "Social Networking Platforms",
    "Software Development",
    "Solar Electric Power Generation",
    "Sound Recording",
    "Space Research and Technology",
    "Specialty Trade Contractors",
    "Spectator Sports",
    "Sporting Goods Manufacturing",
    "Sports and Recreation Instruction",
    "Sports Teams and Clubs",
    "Spring and Wire Product Manufacturing",
    "Staffing and Recruiting",
    "Steam and Air-Conditioning Supply",
    "Strategic Management Services",
    "Subdivision of Land",
    "Sugar and Confectionery Product Manufacturing",
    "Taxi and Limousine Services",
    "Technical and Vocational Training",
    "Technology, Information and Internet",
    "Technology, Information and Media",
    "Telecommunications",
    "Telecommunications Carriers",
    "Telephone Call Centers",
    "Temporary Help Services",
    "Textile Manufacturing",
    "Theater Companies",
    "Think Tanks",
    "Tobacco Manufacturing",
    "Translation and Localization",
    "Transportation Equipment Manufacturing",
    "Transportation Programs",
    "Transportation, Logistics, Supply Chain and Storage",
    "Travel Arrangements",
    "Truck Transportation",
    "Trusts and Estates",
    "Turned Products and Fastener Manufacturing",
    "Urban Transit Services",
    "Utilities",
    "Utilities Administration",
    "Utility System Construction",
    "Vehicle Repair and Maintenance",
    "Venture Capital and Private Equity Principals",
    "Veterinary Services",
    "Vocational Rehabilitation Services",
    "Warehousing and Storage",
    "Waste Collection",
    "Waste Treatment and Disposal",
    "Water Supply and Irrigation Systems",
    "Water, Waste, Steam, and Air Conditioning Services",
    "Wellness and Fitness Services",
    "Wholesale",
    "Wholesale Alcoholic Beverages",
    "Wholesale Apparel and Sewing Supplies",
    "Wholesale Appliances, Electrical, and Electronics",
    "Wholesale Building Materials",
    "Wholesale Chemical and Allied Products",
    "Wholesale Computer Equipment",
    "Wholesale Drugs and Sundries",
    "Wholesale Food and Beverage",
    "Wholesale Footwear",
    "Wholesale Furniture and Home Furnishings",
    "Wholesale Hardware, Plumbing, Heating Equipment",
    "Wholesale Import and Export",
    "Wholesale Luxury Goods and Jewelry",
    "Wholesale Machinery",
    "Wholesale Metals and Minerals",
    "Wholesale Motor Vehicles and Parts",
    "Wholesale Paper Products",
    "Wholesale Petroleum and Petroleum Products",
    "Wholesale Photography Equipment and Supplies",
    "Wholesale Raw Farm Products",
    "Wholesale Recyclable Materials",
    "Wind Electric Power Generation",
    "Wineries",
    "Wireless Services",
    "Women's Handbag Manufacturing",
    "Wood Product Manufacturing",
    "Writing and Editing",
    "Zoos and Botanical Gardens",
    "Other",
    
    ]
      







