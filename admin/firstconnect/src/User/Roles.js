import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Paper, Typography,Switch } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate,useLocation,useMatch,Link } from 'react-router-dom';
import {Tooltip,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import base from '../base'
const drawerWidth = 240;

export class Roles extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,

       allRolles:[],

//// edit form for roles
role_id:"",
role_name:"",

client:{
 is_create:true,
 is_edit:true,
 is_delete:true,
 is_view:true
},
campaign:{
 is_create:true,
 is_edit:true,
 is_delete:true,
 is_view:true
},
User_And_Roles:{
 is_create:true,
 is_edit:true,
 is_delete:true,
 is_view:true
},
lead:{
 is_create:true,
 is_edit:true,
 is_delete:true,
 is_view:true
},
rfp:{
 is_create:true,
 is_edit:true,
 is_delete:true,
 is_view:true
},
invoice:{
 is_create:true,
 is_edit:true,
 is_delete:true,
 is_view:true
},
expence:{
 is_create:true,
 is_edit:true,
 is_delete:true,
 is_view:true
},
ticket:{
 is_create:true,
 is_edit:true,
 is_delete:true,
 is_view:true
},
report:{
 is_create:true,
 is_edit:true,
 is_delete:true,
 is_view:true
},

    }
  }

  componentDidMount(){
    fetch(`${base.base_url}/retriveRoles`,{
      headers:{
        'content-type':'application/json',
      },
     method:'post'
    }).then((response)=>{return response.json()}).then((data)=>{
     this.setState({allRolles:data.data})
    
    })
  }

  retriveRoles=()=>{
    fetch(`${base.base_url}/retriveRoles`,{
      headers:{
        'content-type':'application/json',
      },
     method:'post'
    }).then((response)=>{return response.json()}).then((data)=>{
     this.setState({allRolles:data.data})
   
    })
  }



  render() {
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>User & Role</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>List of Roles</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'right',alignItems:'center',mr:{xs:1,sm:2,md:3}}}>
<Button  onClick={()=>this.props.navigate('/roles/createRoles')} sx={{textTransform:'none',height:30,backgroundColor:'#008ffb',fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon sx={{color:'#fff'}}/>}>
Add Role
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
<TextField  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search'/>
</Box>
</Box>



<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>ID</TableCell>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Role</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.allRolles.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#42526e'}}  >
            CD001
              </TableCell> 
              <TableCell align='left' sx={{color:'#42526e'}}>{row.role_name}</TableCell>
              <TableCell align='center'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
<Tooltip title="Edit">
  <IconButton size='small' onClick={()=>{
    this.setState({
       form_open:true,
       role_id:row.role_id,
       role_name:row.role_name,
       client:row.client,
       campaign:row.campaign,
       User_And_Roles:row.User_And_Roles,
       lead:row.lead,
       rfp:row.rfp,
       invoice:row.invoice,
       ticket:row.ticket,
       report:row.report,

    })
  }}>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete" >
  <IconButton size='small' onClick={()=>{

fetch(`${base.base_url}/deleteRoles`,{
  headers:{
    'content-type':'application/json',
  },
 method:'delete',
 body:JSON.stringify({
role_id:row.role_id
 })
}).then((response)=>{return response.json()}).then((data)=>{
alert("Roles Deleted");
this.retriveRoles();
})
  }} >
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
          count={2}
          rowsPerPage={10}
          page={0}
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
<Paper sx={{width:{xs:'90%',sm:'90%',md:'80%',lg:'70%'},height:'80vh',backgroundColor:'white',borderRadius:2,padding:3}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>


<Typography sx={{fontWeight:'bold',fontSize:20,ml:2}}>Edit Roles</Typography>

<TableContainer component={Box}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Module/Permission</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Create</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>View</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Edit</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
           <TableRow
              key={1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Client</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
        client:{
        is_create:e.target.checked,
        is_edit:this.state.client.is_edit,
        is_delete:this.state.client.is_delete,
        is_view:this.state.client.is_view
     },}))
     
     } checked={this.state.client.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                client:{
                is_create:this.state.client.is_create,
                is_edit:this.state.client.is_edit,
                is_delete:this.state.client.is_delete,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.client.is_view}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 client:{
 is_create:this.state.client.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.client.is_delete,
 is_view:this.state.client.is_view
},}))

         } size='small' checked={this.state.client.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                client:{
                is_create:this.state.client.is_create,
                is_edit:this.state.client.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.client.is_view
               },})) 
              } checked={this.state.client.is_delete}/></TableCell>
            </TableRow>

           



            <TableRow
              key={12}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Campaign</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
        campaign:{
        is_create:e.target.checked,
        is_edit:this.state.campaign.is_edit,
        is_delete:this.state.campaign.is_delete,
        is_view:this.state.campaign.is_view
     },}))
     
     } checked={this.state.campaign.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                campaign:{
                is_create:this.state.campaign.is_create,
                is_edit:this.state.campaign.is_edit,
                is_delete:this.state.campaign.is_delete,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.campaign.is_view}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 campaign:{
 is_create:this.state.campaign.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.campaign.is_delete,
 is_view:this.state.campaign.is_view
},}))
} size='small' checked={this.state.campaign.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                campaign:{
                is_create:this.state.campaign.is_create,
                is_edit:this.state.campaign.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.campaign.is_view
               },})) 
              } checked={this.state.campaign.is_delete}/></TableCell>
            </TableRow>




            <TableRow
              key={13}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          User & Roles</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          User_And_Roles:{
        is_create:e.target.checked,
        is_edit:this.state.User_And_Roles.is_edit,
        is_delete:this.state.User_And_Roles.is_delete,
        is_view:this.state.User_And_Roles.is_view
     },}))
     
     } checked={this.state.User_And_Roles.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                User_And_Roles:{
                is_create:this.state.User_And_Roles.is_create,
                is_edit:this.state.User_And_Roles.is_edit,
                is_delete:this.state.User_And_Roles.is_delete,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.User_And_Roles.is_view}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 User_And_Roles:{
 is_create:this.state.User_And_Roles.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.User_And_Roles.is_delete,
 is_view:this.state.User_And_Roles.is_view
},}))
} size='small' checked={this.state.User_And_Roles.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                User_And_Roles:{
                is_create:this.state.User_And_Roles.is_create,
                is_edit:this.state.User_And_Roles.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.User_And_Roles.is_view
               },})) 
              } checked={this.state.User_And_Roles.is_delete}/></TableCell>
            </TableRow>




            <TableRow
              key={14}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Leads</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          lead:{
        is_create:e.target.checked,
        is_edit:this.state.lead.is_edit,
        is_delete:this.state.lead.is_delete,
        is_view:this.state.lead.is_view
     },}))
     
     } checked={this.state.lead.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                lead:{
                is_create:this.state.lead.is_create,
                is_edit:this.state.lead.is_edit,
                is_delete:this.state.lead.is_delete,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.lead.is_view}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 lead:{
 is_create:this.state.lead.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.lead.is_delete,
 is_view:this.state.lead.is_view
},}))
} size='small' checked={this.state.lead.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                lead:{
                is_create:this.state.lead.is_create,
                is_edit:this.state.lead.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.lead.is_view
               },})) 
              } checked={this.state.lead.is_delete}/></TableCell>
            </TableRow>



            <TableRow
              key={15}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          RFP</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          rfp:{
        is_create:e.target.checked,
        is_edit:this.state.rfp.is_edit,
        is_delete:this.state.rfp.is_delete,
        is_view:this.state.rfp.is_view
     },}))
     
     } checked={this.state.rfp.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                rfp:{
                is_create:this.state.rfp.is_create,
                is_edit:this.state.rfp.is_edit,
                is_delete:this.state.rfp.is_delete,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.rfp.is_view}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 rfp:{
 is_create:this.state.rfp.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.rfp.is_delete,
 is_view:this.state.rfp.is_view
},}))
} size='small' checked={this.state.rfp.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                rfp:{
                is_create:this.state.rfp.is_create,
                is_edit:this.state.rfp.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.rfp.is_view
               },})) 
              } checked={this.state.rfp.is_delete}/></TableCell>
            </TableRow>




            <TableRow
              key={16}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Invoice</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          invoice:{
        is_create:e.target.checked,
        is_edit:this.state.invoice.is_edit,
        is_delete:this.state.invoice.is_delete,
        is_view:this.state.invoice.is_view
     },}))
     
     } checked={this.state.invoice.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                invoice:{
                is_create:this.state.invoice.is_create,
                is_edit:this.state.invoice.is_edit,
                is_delete:this.state.invoice.is_delete,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.invoice.is_view}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 invoice:{
 is_create:this.state.invoice.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.invoice.is_delete,
 is_view:this.state.invoice.is_view
},}))
} size='small' checked={this.state.invoice.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                invoice:{
                is_create:this.state.invoice.is_create,
                is_edit:this.state.invoice.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.invoice.is_view
               },})) 
              } checked={this.state.invoice.is_delete}/></TableCell>
            </TableRow>



            <TableRow
              key={17}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Expence</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          expence:{
        is_create:e.target.checked,
        is_edit:this.state.expence.is_edit,
        is_delete:this.state.expence.is_delete,
        is_view:this.state.expence.is_view
     },}))
     
     } checked={this.state.expence.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                expence:{
                is_create:this.state.expence.is_create,
                is_edit:this.state.expence.is_edit,
                is_delete:this.state.expence.is_delete,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.expence.is_view}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 expence:{
 is_create:this.state.expence.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.expence.is_delete,
 is_view:this.state.expence.is_view
},}))
} size='small' checked={this.state.expence.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                expence:{
                is_create:this.state.expence.is_create,
                is_edit:this.state.expence.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.expence.is_view
               },})) 
              } checked={this.state.expence.is_delete}/></TableCell>
            </TableRow>



            <TableRow
              key={18}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Ticket</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          ticket:{
        is_create:e.target.checked,
        is_edit:this.state.ticket.is_edit,
        is_delete:this.state.ticket.is_delete,
        is_view:this.state.ticket.is_view
     },}))
     
     } checked={this.state.ticket.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                ticket:{
                is_create:this.state.ticket.is_create,
                is_edit:this.state.ticket.is_edit,
                is_delete:this.state.ticket.is_delete,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.ticket.is_view}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 ticket:{
 is_create:this.state.ticket.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.ticket.is_delete,
 is_view:this.state.ticket.is_view
},}))
} size='small' checked={this.state.ticket.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                ticket:{
                is_create:this.state.ticket.is_create,
                is_edit:this.state.ticket.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.ticket.is_view
               },})) 
              } checked={this.state.ticket.is_delete}/></TableCell>
            </TableRow>





            <TableRow
              key={19}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" align='left'  scope="row" sx={{color:'#919191',ml:5,fontSize:12,fontWeight:'750'}}  >
          Report</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
        (e)=>
        this.setState(prevState => ({...prevState,  
          report:{
        is_create:e.target.checked,
        is_edit:this.state.report.is_edit,
        is_delete:this.state.report.is_delete,
        is_view:this.state.report.is_view
     },}))
     
     } checked={this.state.report.is_create} sx={{color:'green'}}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                report:{
                is_create:this.state.report.is_create,
                is_edit:this.state.report.is_edit,
                is_delete:this.state.report.is_delete,
                is_view:e.target.checked
             },}))
              } size='small' checked={this.state.report.is_view}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch onChange={
 (e)=>
 this.setState(prevState => ({...prevState,  
 report:{
 is_create:this.state.report.is_create,
 is_edit:e.target.checked,
 is_delete:this.state.report.is_delete,
 is_view:this.state.report.is_view
},}))
} size='small' checked={this.state.report.is_edit}/></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Switch size='small' onChange={
                (e)=>
                this.setState(prevState => ({...prevState,  
                report:{
                is_create:this.state.report.is_create,
                is_edit:this.state.report.is_edit,
                is_delete:e.target.checked,
                is_view:this.state.report.is_view
               },})) 
              } checked={this.state.report.is_delete}/></TableCell>
            </TableRow>


        </TableBody>
      </Table>
    </TableContainer>


<Button variant='contained' size='small' onClick={()=>{

fetch(`${base.base_url}/editRoles`,{
  method:"put",
  headers:{
    'content-type':'application/json',
  },
  body:JSON.stringify({
role_id: this.state.role_id,
role_name:this.state.role_name,
client:this.state.client,
 campaign:this.state.campaign,
 User_And_Roles:this.state.User_And_Roles,
 lead:this.state.lead,
 rfp:this.state.rfp,
 invoice:this.state.invoice,
 expence:this.state.expence,
 ticket:this.state.ticket,
 report:this.state.report
  })
}).then((res)=>{return res.json()}).then((s)=>{
this.setState({form_open:false})
alert('roles updated')
})


}}>Edit Apply</Button>




</Paper>
  </Box>
</Modal>
</Box>






     </div>
    )
  }
}

export default Roles

export function Rolesc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Roles location={location} navigate={navigate}></Roles>)
}





