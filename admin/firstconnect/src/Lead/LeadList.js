import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../Appheader'
import Sidebar from '../Sidebar'
import Chat from '../Chat'
import { Sidebarc } from '../Sidebar'
import { Button, Input, Paper, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import {Tooltip,Link,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import Papa from 'papaparse'
import base from '../base'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import {SyncLoader} from 'react-spinners'
const drawerWidth = 240;

export class LeadList extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:false,
       form_open:false,
       file:"",
       rowsPerPage:10,
       page:0,
       leadList:[],
       leadListSize:0,


       campaign_list:[],
       client_list:[],

       client_id:"",
       campaign_id:"",
       client_name:"",
       campaign_name:"",
       headers:[],
    }
    this.handleChange = this.handleChange.bind();
    this.handleChangee = this.handleChangee.bind();
  }



handleChangee=(e)=>{
  this.setState({
    [e.target.name]:e.target.files[0]
  })
}

handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

  componentDidMount(){  
    this.setState({is_loader_open:true})
    fetch(`${base.base_url}/retriveLeads`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({leadList:result.data,leadListSize:result.length,is_loader_open:false})
    }).then(()=>{

  fetch(`${base.base_url}/retriveClientForLeadPage`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({client_list:result.data})
    })

    })


  }





  retriveLeads=()=>{
  fetch(`${base.base_url}/retriveLeads`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      page:this.state.page,
      rowsPerPage:this.state.rowsPerPage
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({leadList:result.data,leadListSize:result.length})
  })
}




 
convertCsvToJson=()=>{
  let client_id  = this.state.client_id
  let campaign_id = this.state.campaign_id
  let campaign_name = this.state.campaign_name
  let client_name = this.state.client_name
 let fileee = this.state.file
if(client_id!=="" && client_name!=="" && campaign_id!=="" && campaign_name!=="" && campaign_id!==""){
 
if(this.state.file.type=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  || this.state.file.type=='text/csv'){

  Papa.parse( this.state.file, {
    download: true,
    complete:(results, file)=>{
    let gvmHeaders = results.data[0];

  
     let filee = fileee
if(results.errors.length > 0 ){
  alert('data mismatch or delimeter detected')
}else{
 Papa.parse(filee, {
 header: true,
 complete:async(results, file)=>{
 
          fetch(`${base.base_url}/addLeads`,{
            headers:{
              'content-type':'application/json',
            },
            method:'post',
            body:JSON.stringify({
             client_id:client_id,
             campaign_id:campaign_id,
             leadList:results.data,
             headers:gvmHeaders,
             client_name:client_name,
             campaign_name:campaign_name
            })
          }).then((res)=>{return res.json()}).then((result)=>{
           // alert(result.data)
           if(result.data=="done"){
           this.succes();
           this.setState({
          form_open:false,
          client_id:"",
          campaign_id:"",
          campaign_name:"",
          client_name:"",
         file:""
          })
           }else{
             this.uploadingError(result.data);
           }
           
           this.retriveLeads();
          })
          
        }

        
    });

}}
})



  }else{
    this.documentNotsupport()
    
  }

}else{
this.failed()
}}




succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Lead Successfully Uploaded</Typography>, {
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


deleteLeads=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Lead Successfully Deleted</Typography>, {
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


failed=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>All Fields Required</Typography>, {
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


documentNotsupport=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>ONLY CSV document</Typography>, {
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



findCamapaignList=()=>{
  fetch(`${base.base_url}/retriveCampaignForLeadPage`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
    client_id: this.state.client_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({campaign_list:result.data})
  })
}


handleChangePage = (event, newPage) => {
  this.setState({page:newPage},()=>{

    fetch(`${base.base_url}/retriveLeads`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({leadList:result.data,leadListSize:result.length})
    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0},()=>{

    fetch(`${base.base_url}/retriveLeads`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({leadList:result.data,leadListSize:result.length})
    })

  })
};


succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Lead List Add Successfully</Typography>, {
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



deletedd=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Leads Deleted</Typography>, {
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


uploadingError=(r)=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>{r}</Typography>, {
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
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Leads</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Import Leads</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',mr:{xs:1,sm:2,md:3}}}>
<Button onClick={()=>this.setState({form_open:true})} component="label" sx={{textTransform:'none',height:27,backgroundColor:'#008ffb',fontWeight:'600'}} disableElevation variant="contained" startIcon={<ImportExportIcon sx={{color:'#fff'}}/>}>
Import Leads
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




<Box sx={{ overflow: "auto" }}>

<Box sx={{mt:0,padding:2,minWidth:720}}>

<Paper elevation={2} sx={{height:40,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Import Date</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Client Name</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Campaign Name</Typography>
</Box>


<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'600',textAlign:'center',paddingRight:{xs:1,sm:2,md:3},color:'#666666'}}>Uploaded Leads</Typography>
</Box>


<Box sx={{display:'flex',justifyContent:'right',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:14,fontWeight:'600',paddingRight:{xs:1,sm:2,md:3},color:'#666666'}}>Action</Typography>
</Box>


</Paper>


<br/>



{
  this.state.leadList.map((s)=>(
    <Paper sx={{height:40,width:'100%',mt:1,mb:1.3,backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:13,fontWeight:'600',paddingLeft:{xs:1,sm:2,md:3},color:'#737579' }}>{moment(s.date).format('MM-DD-YYYY hh:mm:ss')}</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:13,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#737579' }}>{s.client_name}</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:13,fontWeight:'600',textAlign:'center',paddingLeft:{xs:1,sm:2,md:3},color:'#737579' }}>{s.campaign_name}</Typography>
</Box>


<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
<Typography sx={{fontSize:13,fontWeight:'600',textAlign:'center',paddingRight:{xs:1,sm:2,md:3},color:'#737579' }}>{s.size}</Typography>
</Box>


<Box sx={{display:'flex',justifyContent:'right',alignItems:'right',width:'100%',flexDirection:'row',mr:2}}>
<IconButton onClick={()=>{
fetch(`${base.base_url}/deleteLeadBunch`,{
  headers:{
    'content-type':'application/json',
  },
  method:'delete',
  body:JSON.stringify({
   bunch_id:s.id,
   campaign_id:s.campaign_id,
   size:parseInt(s.size)
  })
}).then((res)=>{return res.json()}).then((result)=>{
 this.retriveLeads();
 this.deletedd()
})

}} sx={{padding:0.2}} aria-label="delete" size="medium">
  <DeleteForeverIcon sx={{color:'#f29494',height:20,width:20}} fontSize="inherit" />
</IconButton>
<IconButton onClick={()=>this.props.navigate('/Lead/:' + `${s.id}`)} sx={{padding:0.2}} aria-label="delete" size="medium">
  <ShortcutIcon sx={{color:'#66b4da',height:20,width:20}} fontSize="inherit" />
</IconButton>
</Box>
</Paper>
  ))
}


<br/>
<Paper sx={{height:50}}>
<TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.leadListSize}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
</Paper>
</Box>
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
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},minHeight:'10vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Import Leads</Typography>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},minHeight:'20vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Client Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600'}}}   name="client_name" fullWidth size='small'>
 {this.state.client_list.map((s)=>(
  <MenuItem onClick={()=>this.setState({client_id:s.client_id,client_name:s.client_name,campaign_id:"",campaign_name:""},()=>{this.findCamapaignList()})} sx={{fontSize:12,fontWeight:'600'}} key={s.client_id} value={s.client_name}>{s.client_name}</MenuItem>
 ))
 }
</TextField>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Campaign Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select onChange={this.handleChange} InputProps={{sx:{fontSize:12,fontWeight:'600'}}}   name="campaign_name" fullWidth size='small'>
{this.state.campaign_list.map((s)=>(
  <MenuItem onClick={()=>this.setState({campaign_id:s.campaign_id,campaign_name:s.campaign_name})} sx={{fontSize:12,fontWeight:'600'}} key={s.campaign_id} value={s.campaign_name}>{s.campaign_name}</MenuItem>
 ))
 }
</TextField>

<Typography sx={{fontSize:12,fontWeight:'600',display:'flex',flexDirection:'row',mt:2}}>Import File(.csv only)<Typography sx={{color:'red'}}>*</Typography></Typography>
<Box sx={{border:1,borderStyle:'dotted',backgroundColor:'#eff0f0',minHeight:80,borderColor:'#c6c6c9',borderRadius:1,display:"flex",justifyContent:'center',alignItems:'center'}}>
<input type='file' accept=".csv" name='file' onChange={this.handleChangee} style={{height:'100%',width:'100%',padding:10}}/>
</Box>

<br/>
<br/>

<Button disableElevation variant='contained' onClick={this.convertCsvToJson} size='small' sx={{mr:1,textTransform:'none'}}>Save</Button>

<br/>
<br/>
<br/>
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

export default LeadList





export function LeadListc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<LeadList location={location} navigate={navigate}></LeadList>)
}


