import React, { Component } from 'react'
import {Box,Paper,Tooltip,IconButton,Backdrop,TextField,Button ,MenuItem,TablePagination,Modal,Typography,TableBody,Link,Table,TableContainer,TableCell,TableHead,TableRow,Divider} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Checkbox from 'rc-checkbox';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import CloseIcon from '@mui/icons-material/Close';
import base from '../../../base'
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import moment from 'moment';
import { SyncLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
const password = require('secure-random-password');


export class SingleClientInvoice extends Component {

constructor(props) {
  super(props)

  this.state = {
     first:"",
     password:"",
     is_loader_open:true,
     form_open:false,
     form_open_edit:false,
     clientList:[],
     search:"",
     page:0,
     rowsPerPage:10,
     invoiceList:[],
     invoice_List_Size:0,
     campaignList:[],
    
//////////////// INVOICE ADD SECTION ///////////////////
invoice_id:"",
client_id:"",
client_name:"",
campaign_id:"",
campaign_name:"",
bill_date:"",
due_date:"",
po_no:"",
notes:"",
items:[],
payment_received:"0",
////////////////// 

  }
  this.handleChange=this.handleChange.bind(this)
  this.handleChangeSearch = this.handleChangeSearch.bind(this)
}

handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}


handleChangeSearch=(e)=>{
  this.setState({
    [e.target.name]:e.target.value,page:0,
  },()=>{
    fetch(`${base.base_url}/retriveAllInvoiceForSingleClient`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search :this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage,
        client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_List_Size:result.length})
    })
  })
}




addInvoice = async()=>{
 if(this.state.campaign_id!=="" && this.state.campaign_name!=="" && this.state.bill_date!=="" && this.state.due_date!=="" && this.state.po_no!==""){
   let client_name =  await localStorage.getItem('client')
  fetch(`${base.base_url}/addInvoice`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
client_id:this.props.param.singleclient.replace(/:/g,''),
client_name:JSON.parse(client_name).client_name,
campaign_id:this.state.campaign_id,
campaign_name:this.state.campaign_name,
bill_date:this.state.bill_date,
due_date:this.state.due_date,
po_no:this.state.po_no,
notes:this.state.notes,
items:this.state.items,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.instantRetriveInvoice();
this.succes()
this.setState({form_open:false})
  })
 }else{
  this.fail();
 }
 
}




componentDidMount(){
    fetch(`${base.base_url}/retriveAllInvoiceForSingleClient`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search :this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage,
        client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_List_Size:result.length,is_loader_open:false})
    }).then(()=>{

      fetch(`${base.base_url}/retriveCampaignForLeadPage`,{
        headers:{
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          client_id:this.props.param.singleclient.replace(/:/g,'')
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({campaignList:result.data})
      })
    })

}



handleChangePage = (event, newPage) => {
  this.setState({page:newPage},()=>{

    fetch(`${base.base_url}/retriveAllInvoiceForSingleClient`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search :this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage,
        client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_List_Size:result.length})
    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0},()=>{

    fetch(`${base.base_url}/retriveAllInvoiceForSingleClient`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search :this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage,
        client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_List_Size:result.length})
    })

  })
};

instantRetriveInvoice=()=>{
  fetch(`${base.base_url}/retriveAllInvoiceForSingleClient`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search :this.state.search,
      page:this.state.page,
      rowsPerPage:this.state.rowsPerPage,
      client_id:this.props.param.singleclient.replace(/:/g,'')
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({invoiceList:result.data,invoice_List_Size:result.length})
  })
}



editInvoice=async()=>{

  if(this.state.campaign_id!=="" && this.state.campaign_name!=="" && this.state.bill_date!=="" && this.state.due_date!=="" && this.state.po_no!=="" ){
    let client_name =  await localStorage.getItem('client')
  fetch(`${base.base_url}/editInvoice`,{
    headers:{
      'content-type':'application/json',
    },
    method:'put',
    body:JSON.stringify({
client_id:this.props.param.singleclient.replace(/:/g,''),
client_name:JSON.parse(client_name).client_name,
campaign_id:this.state.campaign_id,
campaign_name:this.state.campaign_name,
bill_date:this.state.bill_date,
due_date:this.state.due_date,
po_no:this.state.po_no,
notes:this.state.notes,
invoice_id:this.state.invoice_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.instantRetriveInvoice();
this.setState({form_open_edit:false});
this.successUpdate();
  }) 
  }else{
    this.fail();
  }
 

}



succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Invoice Successfully Added</Typography>, {
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

fail=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Fill All Fields</Typography>, {
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


successDelete=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Sucessfully deleted</Typography>, {
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


successUpdate=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Sucessfully Updated</Typography>, {
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


  render() {
    return (
      <div>
<Box sx={{minHeight:300,backgroundColor:'#fff',mt:1,ml:1,mr:1}}>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row',mt:{xs:1,sm:1,md:1},ml:{xs:2,sm:2,md:2}}}>
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151',mt:1,mb:1,ml:1}}>Invoice</Typography>
<Box>
</Box>

</Box>



<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},ml:2,mr:2}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:1,mt:{xs:1,sm:1,md:1},height:30,marginRight:{xs:1,sm:1,md:0}}}>
    <TextField type='text' fullWidth name='search' onChange={this.handleChangeSearch}  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true,sx:{fontSize:"13px",fontWeight:'600',color:'#666666'}}}  placeholder='Invoice Id' sx={{"& input::placeholder": {
      fontSize: "13px",
      marginLeft:"2px"
    }}}/>
</Box>

<Box sx={{mt:{xs:1,sm:1,md:1}}}>
<Button onClick={()=>{this.setState({form_open:true})}} component="label" sx={{textTransform:'none',fontSize:13,height:30,backgroundColor:'#008ffb',ml:{xs:0,sm:0,md:2},fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon  sx={{color:'#fff'}}/>}>
Add Invoice
</Button>
</Box>
</Box>
</Box>








<Box sx={{mt:1,padding:1}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1320 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Invoice ID</TableCell>
           
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Bill Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Invoice</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Payment Received</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Payment</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Po No</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.invoiceList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}} >
            {row.invoice_id}
              </TableCell>
             
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.bill_date).format('DD-MM-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.due_date).format('DD-MM-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0)   }</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{parseInt(row.payment_received)}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0)  - parseInt(row.payment_received)}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.po_no}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>

              <TextField  size='small' value={row.status} onChange={this.handleChange} variant='standard' InputProps={{sx:{fontSize:12,fontWeight:'600'},disableUnderline:true}} sx={{height:15,ml:1}} select>
     {
    invoiceStatus.map((p)=>(
      <MenuItem key={p.id} value={p.status} sx={{fontSize:12,fontWeight:'600', color:'#42526e'}} onClick={()=>{

        fetch(`${base.base_url}/updateInvoiceStatus`,{
          headers:{
            'content-type':'application/json',
          },
          method:'put',
          body:JSON.stringify({
            invoice_id:row.invoice_id,
            status:p.status,
          })
        }).then((res)=>{return res.json()}).then((result)=>{
         this.instantRetriveInvoice()
        })

      }}>
        {p.status}
      </MenuItem>
    ))
  }
</TextField>


              </TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small' onClick={()=>{
this.setState({
form_open_edit:true,
invoice_id:row.invoice_id,
campaign_id:row.campaign_id,
campaign_name:row.campaign_name,
bill_date:row.bill_date,
due_date:row.due_date,
po_no:row.po_no,
notes:row.notes,

})
  }}>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>



<Tooltip title="Delete">
  <IconButton onClick={()=>{
fetch(`${base.base_url}/deleteInvoice`,{
  headers:{
    'content-type':'application/json',
  },
  method:'delete',
  body:JSON.stringify({
    invoice_id:row.invoice_id
  })
}).then((res)=>{return res.json()}).then((result)=>{
 this.successDelete();
  this.instantRetriveInvoice()
})
  }} size='small' >
<DeleteForeverIcon sx={{color:'#f29494',height:15,width:15}}/>
</IconButton>
</Tooltip>

 </Box></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
   <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.invoice_List_Size}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />

</Box>
</Box>







<Box> 
<Modal
  open={this.state.form_open}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Create Invoice</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Campaign Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="campaign_name" fullWidth size='small'>
{
  this.state.campaignList.map((s,index)=>(
<MenuItem key={index} sx={{fontSize:12,fontWeight:'600'}} value={s.campaign_name} onClick={()=>this.setState({campaign_id:s.campaign_id,campaign_name:s.campaign_name})}>
{s.campaign_name}
</MenuItem>
  ))
}
</TextField>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bill Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.bill_date} name="bill_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.due_date} name="due_date" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>PO No.<Typography sx={{color:'red'}}></Typography></Typography>
<TextField onChange={this.handleChange}  type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.po_no}  name="po_no" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}   type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:70}}}  value={this.state.notes} name="notes" fullWidth size='small'/>

<Button variant='contained' onClick={this.addInvoice} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
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
  open={this.state.form_open_edit}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open_edit:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit Invoice</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Campaign Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.campaign_name} name="campaign_name" fullWidth size='small'>
{
  this.state.campaignList.map((s,index)=>(
<MenuItem key={index} sx={{fontSize:12,fontWeight:'600'}} value={s.campaign_name} onClick={()=>this.setState({campaign_id:s.campaign_id,campaign_name:s.campaign_name})}>
{s.campaign_name}
</MenuItem>
  ))
}
</TextField>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bill Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={moment(this.state.bill_date).format('YYYY-MM-DD')} name="bill_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type="date" InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={moment(this.state.due_date).format('YYYY-MM-DD')} name="due_date" fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>PO No.<Typography sx={{color:'red'}}></Typography></Typography>
<TextField onChange={this.handleChange}  type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.po_no}  name="po_no" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}   type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:70}}}  value={this.state.notes} name="notes" fullWidth size='small'/>

<Button variant='contained' onClick={this.editInvoice} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
edit Apply
</Button>

</Box>
</Box>
</Paper>
  </Box>
</Modal>
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



<Box>
<Backdrop
 sx={{  zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'transparent' }}
  open={this.state.is_loader_open}
  //this.state.is_loader_open
>
  <Paper elevation={0} sx={{height:40,width:80,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'transparent'}}>
    <SyncLoader speedMultiplier={1} size={12} color="#0088cc" />
  </Paper>
</Backdrop>
</Box>


      </div>
    )
  }
}

export default SingleClientInvoice

export function SingleClientInvoicec(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<SingleClientInvoice location={location} param={param} navigate={navigate}></SingleClientInvoice>)
}




let invoiceStatus = [
  {
    id:1,
    status:'Fully Paid'
  },
  {
    id:2,
    status:'Partial Paid'
  },
  {
    id:3,
    status:'Due'
  },
  {
    id:4,
    status:'Pending'
  },
]



