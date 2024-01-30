import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Checkbox, Paper, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ExploreIcon from '@mui/icons-material/Explore';
import DescriptionIcon from '@mui/icons-material/Description';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {Tooltip,IconButton,Grid,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch,Link } from 'react-router-dom';
import base from '../base'
import Textarea from '@mui/joy/Textarea';
import moment from 'moment'
import {SyncLoader} from 'react-spinners'
const drawerWidth = 240;

export class Invoice extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       edit_form:false,
      page:0,
      search:"",
      rowsPerPage:10,
     ///  invoice form
     clistList:[],
     
campaignList:[],
invoice_list_size:0,
invoiceList:[],
/////////////////////////////
client_id:"",
client_name:"",
campaign_id:"",
campaign_name:"",
bill_date:null,
due_date:null,
po_no:"",
notes:"",
items:[],
payment_received:"",
invoice_id:""

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
  }

handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

handleChangeSearch=(e)=>{
  this.setState({
    [e.target.name]:e.target.value,page:0
  },()=>{
    fetch(`${base.base_url}/retriveInvoice`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_list_size:result.length})
    })
  })
}

  componentDidMount(){

    fetch(`${base.base_url}/retriveInvoice`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search:this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_list_size:result.length,is_loader_open:false})
    }).then(()=>{
  fetch(`${base.base_url}/retriveAllClients`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({clistList:result.data})
    })

    })
  }


instantRetriveInvoice=()=>{
  fetch(`${base.base_url}/retriveInvoice`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search : this.state.search,
      page:this.state.page,
      rowsPerPage:this.state.rowsPerPage
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({invoiceList:result.data,invoice_list_size:result.length})
  })

}


handleChangePage = (event, newPage) => {
  this.setState({page:newPage},()=>{
    fetch(`${base.base_url}/retriveInvoice`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search : this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_list_size:result.length})
    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0},()=>{

    fetch(`${base.base_url}/retriveInvoice`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search : this.state.search,
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({invoiceList:result.data,invoice_list_size:result.length})
    })

  })
};





  addInvoice =()=>{
    fetch(`${base.base_url}/addInvoice`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
client_id:this.state.client_id,
client_name:this.state.client_name,
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
 this.setState({form_open:false})
    })
  }
  


editApply=()=>{
  fetch(`${base.base_url}/editInvoice`,{
    headers:{
      'content-type':'application/json',
    },
    method:'put',
    body:JSON.stringify({
invoice_id:this.state.invoice_id,
client_id:this.state.client_id,
client_name:this.state.client_name,
campaign_id:this.state.campaign_id,
campaign_name:this.state.campaign_name,
bill_date:this.state.bill_date,
due_date:this.state.due_date,
po_no:this.state.po_no,
notes:this.state.notes,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.instantRetriveInvoice();
this.setState({
  edit_form:false,
  invoice_id:"",
client_id:"",
client_name:"",
campaign_id:"",
campaign_name:"",
bill_date:null,
due_date:null,
po_no:"",
notes:"",
})
  })
}



  render() {


    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,mt:{xs:1,sm:1,md:0},paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Invoice</Typography>


<Grid container spacing={{xs:1,sm:2}}>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#00a3ff'}}>

<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<ExploreIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Campaign</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>00</Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#28176f'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<PaidIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Payment</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>00</Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#fe964a'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<DescriptionIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Total invoice</Typography>
</Box>

<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>00</Typography>

</Paper>
</Grid>
<Grid item xs={12} sm={6} md={3}>
<Paper sx={{height:80,backgroundColor:'#fff',borderRight:6,borderRightColor:'#9a5252'}}>
<Box sx={{height:45,width:'100%',borderRadius:2,display:'flex',flexDirection:'row',alignItems:'center'}}>
<AccountBalanceWalletIcon sx={{color:'#33339c',marginLeft:1,height:25,width:25}}/>
<Typography sx={{fontWeight:'700',fontSize:17,marginLeft:0.8,color:'#33339c'}}>Due</Typography>
</Box>
<Typography sx={{textAlign:'right',marginRight:1,fontWeight:'800',fontSize:20}}>00</Typography>
</Paper>
</Grid>
</Grid>



<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',mt:2,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Invoice List</Typography>
</Box>

<Box sx={{mr:{xs:1,sm:2,md:3}}}>
<Button onClick={()=>{this.setState({form_open:true})}} component="label" sx={{textTransform:'none',fontSize:13,height:30,backgroundColor:'#008ffb',ml:{xs:0,sm:0,md:2},fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon  sx={{color:'#fff'}}/>}>
Add Invoice
</Button>
</Box>
</Paper>


<Paper sx={{width:'100%',minHeight:600,mt:2}}>
<Box sx={{display:'flex',flexDirection:'row',padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row'}}>

<Box sx={{height:30,width:30,borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Export PDF">
<PictureAsPdfIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
<Box sx={{height:30,width:30,borderRadius:1,ml:1,mr:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Export Exel">
<DriveFileMoveIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
<Box sx={{height:30,width:30,mr:2,borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#008ffb'}}>
<Tooltip title="Delete All">
<DeleteForeverIcon sx={{color:'#fff',height:20,width:20}}/>
</Tooltip>
</Box>
</Box>

<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30}}>
<TextField  name='search' onChange={this.handleChangeSearch} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search invoice id'/>
</Box>
</Box>



<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1520 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Invoice ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Client Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Bill Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Invoice</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Payment Received</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due </TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>PO No.</TableCell>
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
              <TableCell component="th" onClick={()=>this.props.navigate('/invoice/:'+row.invoice_id)}  scope="row" sx={{color:'#42526e'}}  >
            <Link>{row.invoice_id}</Link>  
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.client_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.bill_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.due_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0)   }</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{parseInt(row.payment_received)}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0)  - parseInt(row.payment_received)}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.po_no}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}} >

              <TextField  size='small' value={row.status} onChange={this.handleChange} variant='standard' InputProps={{sx:{fontSize:12,fontWeight:'600'},disableUnderline:true}} sx={{height:15,ml:1}} select>
     {
     invoiceStaus.map((p)=>(
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
  <IconButton onClick={()=>{
    this.setState({
edit_form:true,
invoice_id:row.invoice_id,
client_id:row.client_id,
client_name:row.client_name,
campaign_id:row.campaign_id,
campaign_name:row.campaign_name,
bill_date:row.bill_date,
due_date:row.due_date,
po_no:row.po_no,
notes:row.notes,
    },()=>{
      fetch(`${base.base_url}/retriveCampaignForLeadPage`,{
        headers:{
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          client_id:row.client_id
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({campaignList:result.data})
      })
    })
    }
  } size='small'>
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
      alert("deleted")
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
          count={this.state.invoice_list_size}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
</Box>


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

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Client Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="client_name" fullWidth size='small'>
{
 this.state.clistList.map((data,index)=>(
<MenuItem key={index} value={data.client_name} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>{
this.setState({client_id:data.client_id,client_name:data.client_name},()=>{
 fetch(`${base.base_url}/retriveCampaignForLeadPage`,{
  headers:{
    'content-type':'application/json',
  },
  method:'post',
  body:JSON.stringify({
    client_id:this.state.client_id
  })
}).then((res)=>{return res.json()}).then((result)=>{
  this.setState({campaignList:result.data})
})
})

}}>
{data.client_name}
</MenuItem>

  ))
}
</TextField>

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
<TextField onChange={this.handleChange}  type='Date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.bill_date} name="bill_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type='Date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.due_date} name="due_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>PO No.<Typography sx={{color:'red'}}></Typography></Typography>
<TextField onChange={this.handleChange}  type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.po_no}  name="po_no" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}>*</Typography></Typography>


<Textarea minRows={3} sx={{fontSize:12,fontWeight:'600',minHeight:70}} placeholder='Type somethings....' size="sm"  variant="outlined" onChange={this.handleChange}  value={this.state.notes} name="notes"/>

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
  open={this.state.edit_form}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({edit_form:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit Invoice</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Client Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.client_name}  name="client_name" fullWidth size='small'>
{
 this.state.clistList.map((data,index)=>(
<MenuItem key={index} value={data.client_name} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>{
this.setState({client_id:data.client_id,client_name:data.client_name},()=>{
 fetch(`${base.base_url}/retriveCampaignForLeadPage`,{
  headers:{
    'content-type':'application/json',
  },
  method:'post',
  body:JSON.stringify({
    client_id:this.state.client_id
  })
}).then((res)=>{return res.json()}).then((result)=>{
  this.setState({campaignList:result.data})
})
})

}}>
{data.client_name}
</MenuItem>

  ))
}
</TextField>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Campaign Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.campaign_name} name="campaign_name" fullWidth size='small'>
{
  this.state.campaignList.map((s,index)=>(
<MenuItem key={index} sx={{fontSize:12,fontWeight:'600'}} value={s.campaign_name} onClick={()=>this.setState({campaign_id:s.campaign_id,campaign_name:s.campaign_name})}>
{s.campaign_name}
</MenuItem>

  ))
}
</TextField>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Bill Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange} type="datetime-local" InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  value={this.state.bill_date} name="bill_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Due Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  onChange={this.handleChange} type="datetime-local" InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.due_date} name="due_date" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>PO No.<Typography sx={{color:'red'}}></Typography></Typography>
<TextField onChange={this.handleChange}  type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}} value={this.state.po_no}  name="po_no" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}>*</Typography></Typography>

<Textarea minRows={3} sx={{fontSize:12,fontWeight:'600',minHeight:70}} placeholder='Type somethings....' size="sm"  variant="outlined" onChange={this.handleChange}  value={this.state.notes} name="notes"/>



<Button variant='contained' onClick={this.editApply} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
 Edit Apply
</Button>

</Box>
</Box>
</Paper>
  </Box>
</Modal>
</Box>





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

export default Invoice


export function Invoicec(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Invoice location={location} navigate={navigate}></Invoice>)
}




const invoiceStaus = [
  {
    id:1,
    status:'Fully Paid'
  },
  {
    id:2,
    status:'Partially Paid'
  },
  {
    id:3,
    status:'OverDue'
  },
  {
    id:4,
    status:'Pending'
  },
]






