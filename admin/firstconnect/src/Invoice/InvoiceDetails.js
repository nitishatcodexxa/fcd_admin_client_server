import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Grid, Paper, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import logo from '../img/logo.jpeg'
import {Tooltip,IconButton,TableBody,Menu,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch,Link, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import base from '../../src/base'
import moment from 'moment'
import base_url from '../../src/base'
const drawerWidth = 240;

export class InvoiceDetails extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       anchorEl : null,
      open: false,
      form_open_for_invoice_to_client: false,
      singleInvoiceJson:{},
      biliing_address : '',
      client_id:'',
      campaignList:[],
      objectData:{},
      discount:"",
///////////// add  item info ///////
      item_add_form:false,
      items:[],

      campain_name:"",
      campain_id:"",
      quentity:"",
      costPerLead:"",
      notes:"",

//////////////////////////////

payment_method:"",
payment_date:"",
payment_amount:"",


    }
    this.setAnchorEl = this.setAnchorEl.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value});
}


  componentDidMount(){

      fetch(`${base.base_url}/retriveSingleInvoiceData`,{
        headers:{
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
      invoice_id:this.props.param.invoiceid.replace(/:/g,'')
        })
      }).then((res)=>{return res.json()}).then((result)=>{
    
        this.setState({singleInvoiceJson:result.data,biliing_address:result.data.billing_info.billing_address,client_id:result.data.client_id,items:result.data.items,objectData:result.data.billing_info,is_loader_open:false});
      fetch(`${base.base_url}/retriveCampaignForLeadPage`,{
        headers:{
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          client_id:result.data.client_id
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({campaignList:result.data})
      
      })

      })

    
  }




  handleClick(event) {
    this.setAnchorEl(event.currentTarget);
}
    setAnchorEl(value){
        this.setState({
            anchorEl: value,
            open: !this.state.open
        })
    }
handleClose=() =>{
    this.setAnchorEl(null);
    this.setState({form_open_for_invoice_to_client:true})
}

  renderMenu(){
    return(
    <Menu id="fade-menu" anchorEl={this.state.anchorEl} open={this.state.open} onClose={this.handleClose} sx={{mt:1}}>
        <MenuItem onClick={this.handleClose} sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}}>Email Invoice To Client</MenuItem>
        <MenuItem onClick={()=>{

fetch(`${base.base_url}/createInvoice`,{
  headers:{
    'content-type':'application/json',
  },
  method:'post',
  body:JSON.stringify({
    data:"akl"
  })
}).then((res)=>{return res.json()}).then((result)=>{

  window.open(`${base_url.base_url}/${result.path}.pdf`)
})



        }} sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}} >Download PDF</MenuItem>
        <MenuItem onClick={this.handleClose} sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}}>View PDF</MenuItem>
        <MenuItem onClick={this.handleClose} sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}}>Print</MenuItem>
        <MenuItem onClick={this.handleClose} sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}}>Edit Invoice</MenuItem>
        <MenuItem onClick={this.handleClose} sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}}>Mark As Cancel</MenuItem>
        <MenuItem onClick={this.handleClose} sx={{borderBottom:1,borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}}>Create Credit Note</MenuItem>
        <MenuItem onClick={this.handleClose} sx={{borderColor:'#e0e0e0',color:'#404040',fontSize:{xs:11,sm:12,md:12},fontWeight:'600'}}>Close Invoice</MenuItem>
      </Menu>
     )
  }


  render() {
let total_Amount = 0;

for (let i = 0; i < this.state.items.length; i++) {
 total_Amount = total_Amount + (parseInt(this.state.items[i].costPerLead) * parseInt(this.state.items[i].quentity))
}



    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Invoice Details</Typography>

<Paper sx={{height:50,backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between',}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Invoice Details</Typography>
</Box>

<Box sx={{display:'flex',alignItems:'center',mr:{xs:1,sm:2,md:3}}}>
<Box>
<Button aria-owns={this.state.open ? 'fade-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} sx={{textTransform:'none',height:30,backgroundColor:'#008ffb',fontWeight:'600',mr:1}} disableElevation variant="contained">
Action
</Button>
{this.renderMenu()}
</Box>
<Button onClick={()=>this.setState({form_open:true})} sx={{textTransform:'none',height:30,fontWeight:'600',}} disableElevation variant="outlined" startIcon={<AddIcon sx={{color:'primary'}}/>}>
Add Payment
</Button>

</Box>
</Paper>



<Box sx={{mt:2}}>
<Grid container spacing={1} columnSpacing={2}>
<Grid item xs={12} sm={12} md={9}>
<Box sx={{minHeight:400}}>
<Paper component={Grid} sx={{minHeight:800,width:'100%',backgroundColor:'#fff'}}>

<Grid container  columnSpacing={2}>
<Grid item xs={6}>
<Box sx={{backgroundColor:'#fff',minHeight:200,display:'flex',justifyContent:'left',flexDirection:'column'}}>
<Box sx={{minHeight:100,width:'70%',backgroundColor:'#fff',mt:5,ml:{xs:'2%',sm:'5%',md:'8%'},display:'flex',justifyContent:'left',alignItems:'center'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center',ml:2}}>
<img src={logo} style={{height:120,objectFit:'contain'}}/>
  </Box>
</Box>

<Box sx={{minHeight:60,width:'85%',backgroundColor:'#fff',mt:2,ml:'8%',display:'flex',flexDirection:'column'}}>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>Address<Typography sx={{fontSize:{xs:11,sm:12},fontWeight:'700',color:'#404040',ml:0.5}}>: Taluk. 9 DRD, 411014, Pune City. A R Shala, 411004, Pune City. AFMC, 411040, Pune City. Adhale BK, 410506, Maval.</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>Phone<Typography sx={{fontSize:{xs:11,sm:12},fontWeight:'700',color:'#404040',ml:0.5}}>: 7292961250</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>Email ID<Typography sx={{fontSize:{xs:11,sm:12},fontWeight:'700',color:'#404040',ml:0.5}}>: 7292961260no@gmail.com</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>GST No<Typography sx={{fontSize:{xs:11,sm:12},fontWeight:'700',color:'#404040',ml:0.5}}>: 27BCDRHF74HJSJH</Typography></Typography>
</Box>

</Box>
</Grid>
<Grid item xs={6}>
<Box sx={{backgroundColor:'#fff',minHeight:200,width:'100%',display:'flex',justifyContent:'right',flexDirection:'column'}}>
<Box sx={{minHeight:10,backgroundColor:'#fff',mt:5,mr:'8%',display:"flex",justifyContent:'right'}}>
<Box sx={{minWidth:110,height:40,display:'flex',backgroundColor:'#d9d9d9',justifyContent:'center',alignItems:'center'}}>
<Typography sx={{fontWeight:'700',fontSize:16,ml:0.5,mr:0.5}}>{this.state.singleInvoiceJson.invoice_id}</Typography>
</Box>
</Box>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:13,sm:14},mt:2,display:this.state.singleInvoiceJson.po_no==""?'none':'flex',flexDirection:'row',justifyContent:'right',mr:'8%'}}>PO CODE<Typography sx={{fontSize:12,fontWeight:'700',color:'#404040',ml:0.5}}>: {this.state.singleInvoiceJson.po_no}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row',justifyContent:'right',mr:'8%'}}>Bill Date<Typography sx={{fontSize:12,fontWeight:'700',color:'#404040',ml:0.5}}>: {moment(this.state.singleInvoiceJson.bill_date).format('DD-MM-YYYY')}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row',justifyContent:'right',mr:'8%'}}>Due Date<Typography sx={{fontSize:12,fontWeight:'700',color:'#404040',ml:0.5}}>: {moment(this.state.singleInvoiceJson.due_date).format('DD-MM-YYYY')}</Typography></Typography>
   
<Box sx={{minHeight:60,width:'90%',backgroundColor:'#fff',mt:2,ml:'8%',display:'flex',flexDirection:'column'}}>
    <Typography sx={{fontWeight:'600',color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>Bill To,</Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>{this.state.biliing_address}</Typography>
</Box>


</Box>
</Grid>
</Grid>

<br/>
<br/>

<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:13,fontWeight:'600',color:'#919191'}}>No</TableCell>
            <TableCell align='left' sx={{fontSize:13,fontWeight:'600',color:'#919191'}}>Campaign</TableCell>
            <TableCell align='center' sx={{fontSize:13,fontWeight:'600',color:'#919191'}}>C.P.L</TableCell>
            <TableCell align='center' sx={{fontSize:13,fontWeight:'600',color:'#919191'}}>Quantity</TableCell>
            <TableCell align='center' sx={{fontSize:13,fontWeight:'600',color:'#919191'}}>Total Amount</TableCell>
            <TableCell align='right' sx={{fontSize:13,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.items.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#42526e',fontSize:12}}  >
              {i+1}
              </TableCell>
              <TableCell align='left' sx={{color:'#42526e',fontSize:12}}>{row.campaignName}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:12}}>{row.costPerLead}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:12}}>{row.quentity}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:12}}>{row.quentity * row.costPerLead} {this.state.objectData.billing_symbole}</TableCell>
              <TableCell align='center' sx={{color:'#42526e',fontSize:12}}>
              <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small'>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete" >
  <IconButton size='small' onClick={()=>{

fetch(`${base.base_url}/deleteItem`,{
  headers:{
    'content-type':'application/json',
  },
  method:'delete',
  body:JSON.stringify({
    id:row.id,
    invoice_id:this.state.singleInvoiceJson.invoice_id
  })
}).then((res)=>{return res.json()}).then((result)=>{
  alert("deleted")
 this.setState({items:result.data})
})

}}>
<DeleteForeverIcon sx={{color:'#f29494',height:15,width:15}}/>
</IconButton>
</Tooltip>

 </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
</Box>


<Box sx={{display:'flex',justifyContent:'space-between',padding:2}}>
<Button size='small' onClick={()=>this.setState({item_add_form:true})} startIcon={<AddIcon sx={{color:'#fff'}}/>} variant='contained' disableElevation sx={{height:30,textTransform:'none'}}>Add more</Button>
<Box sx={{minHeight:60,backgroundColor:'#fff',mt:2,ml:'8%',display:'flex',flexDirection:'column'}}>
    <Typography sx={{fontWeight:'600',color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>Sub Total<Typography sx={{color:'#4a3e40',fontSize:{xs:13,sm:14},fontWeight:'600',ml:1}}>:Rs {total_Amount} {this.state.objectData.billing_symbole}</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:1,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>Discount<Typography sx={{color:'#4a3e40',fontSize:{xs:13,sm:14},fontWeight:'600',ml:1}}>: Rs {this.state.discount}<IconButton sx={{backgroundColor:'#f2f8ff ',ml:1.5}} size='small'><DriveFileRenameOutlineIcon color='primary' sx={{height:17,width:17}}/></IconButton></Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.2,mb:0.2,color:'#4a3e40',fontSize:{xs:13,sm:14},display:'flex',flexDirection:'row'}}>Due Balence<Typography sx={{color:'#4a3e40',fontSize:{xs:13,sm:14},fontWeight:'600',ml:1}}>: Rs {total_Amount - this.state.discount}</Typography></Typography>
   
</Box>
</Box>

</Paper>
</Box>
</Grid>



<Grid item  xs={12} sm={12} md={3}>
<Box sx={{minHeight:400}}>
<Paper sx={{minHeight:600,width:'100%',backgroundColor:'#fff'}}>
<br/>

<Box sx={{minHeight:60,backgroundColor:'#fff',padding:2,display:'flex',flexDirection:'column'}}>
    <Typography sx={{fontWeight:'600',color:'#4a3e40',mt:0.5,mb:0.5,fontSize:14,display:'flex',flexDirection:'row'}}>Client Name<Typography sx={{color:'#4a3e40',fontSize:13,fontWeight:'500',ml:1}} onClick={()=>this.props.navigate('/client/:' + this.state.singleInvoiceJson.client_id)}>: <Link>{this.state.singleInvoiceJson.client_name}</Link></Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:14,display:'flex',flexDirection:'row'}}>Campaign<Typography sx={{color:'#4a3e40',fontSize:14,fontWeight:'500',ml:1}}>: <Link>{this.state.singleInvoiceJson.campaign_name}</Link></Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:14,display:'flex',flexDirection:'row'}}>Status<Typography sx={{color:'red',fontSize:14,fontWeight:'500',ml:1}}>: Over Due</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:14,display:'flex',flexDirection:'row'}}>Last Email<Typography sx={{color:'#4a3e40',fontSize:14,fontWeight:'500',ml:1}}>: 3 may 2020</Typography></Typography>
    <Typography sx={{fontWeight:'600',mt:0.5,mb:0.5,color:'#4a3e40',fontSize:14,display:'flex',flexDirection:'row'}}>Reminder<Typography sx={{color:'#4a3e40',fontSize:14,fontWeight:'500',ml:1}}>: </Typography></Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'right',padding:2}}>
<Button size='small' startIcon={<AddIcon sx={{color:'primary'}}/>} variant='outlined' disableElevation sx={{height:30,textTransform:'none'}}>Add Payment</Button>
</Box>

</Paper>
</Box> 
</Grid>
</Grid>
</Box>


</Box>
</Box>
</Box>

<Box sx={{display:'flex',position:'fixed',top:0,left:{xs:0,sm:240}}}>
<Appheaderc/>
</Box>

<Box sx={{display:'none',position:'fixed',bottom:40,right:10}}>
 <Chat/> 
</Box>










<Box> 
<Modal
  open={this.state.form_open}  ////    for payments add and serverved
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},height:'80vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Payment</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Payment Method<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.payment_method}  name="payment_method" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Payment Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.payment_date} name="payment_date" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Amount<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.payment_amount} name="payment_amount" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}></Typography></Typography>
<TextField onChange={this.handleChange} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:70}}}  value={this.state.notes} name="notes" fullWidth size='small'/>

<Button onClick={()=>{
   fetch(`${base.base_url}/addPayments`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      client_id:this.state.singleInvoiceJson.client_id,
      invoice_id:this.state.singleInvoiceJson.invoice_id,
      client_name:this.state.singleInvoiceJson.client_name,
      payment_method:this.state.payment_method,
      payment_date:this.state.payment_date,
      payment_amount:this.state.payment_amount,
      note:this.state.notes,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.setState({form_open:false})
  })

}} variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>

</Box>
</Box>
</Paper>
  </Box>
</Modal>
</Box>







<Box> 
<Modal
  open={this.state.form_open_for_invoice_to_client}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open_for_invoice_to_client:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Email Invoice To Client</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'90vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>To<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>CC<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>BCC<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Subject<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:70}}}  name="first_name" fullWidth size='small'/>


<Box sx={{height:100,border:1,borderColor:'#b0b0b0',borderStyle:'dashed',mt:2,borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>

<Button size='small' component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
  Upload file
  <VisuallyHiddenInput type="file" />
</Button>
</Box>

<Button variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  Send
</Button>

</Box>
</Box>
</Paper>
  </Box>
</Modal>
</Box>






<Box> 
<Modal
  open={this.state.item_add_form}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},height:'80vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({item_add_form:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Items</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Campaign Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select type='text' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.campain_name}  name="campain_name" fullWidth size='small'>
  {
    this.state.campaignList.map((w,index)=>(
      <MenuItem  key={index} value={w.campaign_name} onClick={()=>this.setState({campaign_name:w.campaign_name,campain_id:w.campain_id})}>
      {
        w.campaign_name
      }
      </MenuItem>
    ))
  }
</TextField>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Enter Quantity<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField type='number' onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.quentity} name="quentity" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Cost Per Lead<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.costPerLead} name="costPerLead" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:70}}}  value={this.state.notes} name="notes" fullWidth size='small'/>

<Button onClick={()=>{
  this.setState(prevState => ({
    items: [...prevState.items,{   
      id: Math.round(Math.random() * 1000000347764004388),
      campaignName:this.state.campain_name,
      campaignId:this.state.campain_id,
      costPerLead:this.state.costPerLead,
      quentity:this.state.quentity,
         }] 
   }),()=>{
///// send data to save in server 

    fetch(`${base.base_url}/addItem`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        client_id:this.state.singleInvoiceJson.client_id,
        invoice_id:this.state.singleInvoiceJson.invoice_id,
        id: Math.round(Math.random() * 1000000347764004388),
        campaignName:this.state.campain_name,
        campaignId:this.state.campain_id,
        costPerLead:this.state.costPerLead,
        quentity:this.state.quentity,
      })
    }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({item_add_form:false})
    })

   })
}} variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>

</Box>
</Box>
</Paper>
  </Box>
</Modal>
</Box>




<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={this.state.is_loader_open}
  onClick={this.handleClose}
>
  <CircularProgress color="inherit"  />
</Backdrop>

     </div>
    )
  }
}

export default InvoiceDetails
export function InvoiceDetailsc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<InvoiceDetails location={location} param={param} navigate={navigate}></InvoiceDetails>)
}




const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});