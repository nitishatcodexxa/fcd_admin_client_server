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
import ViewListIcon from '@mui/icons-material/ViewList';
import TimelineIcon from '@mui/icons-material/Timeline';
import { ToastContainer, toast } from 'react-toastify';
import {SyncLoader} from 'react-spinners'
import moment from 'moment'
const drawerWidth = 240;

export class ManageLeads extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,

campaign_list:[],

    }
    this.handleChange = this.handleChange.bind();
  }




handleChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

  componentDidMount(){
    fetch(`${base.base_url}/retriveCampaignForManageLeadPage`,{
        headers:{
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
         page:this.state.page,
         rowsPerPage:this.state.rowsPerPage
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({campaign_list:result.data,campaignSize:result.length,is_loader_open:false})
      })
  }








handleChangePage = (event, newPage) => {
  this.setState({page:newPage},()=>{

    fetch(`${base.base_url}/retriveCampaignForManageLeadPage`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({campaign_list:result.data,campaignSize:result.length})
    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0},()=>{

    fetch(`${base.base_url}/retriveCampaignForManageLeadPage`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({campaign_list:result.data,campaignSize:result.length})
    })

  })
};




succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Campaign Deleted</Typography>, {
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
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mt:{xs:2,sm:2,md:1},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Leads : Manage Leads</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Manage Leads</Typography>
</Box>

<Box sx={{display:'flex',justifyContent:'right',alignItems:'center',mr:{xs:1,sm:2,md:3}}}>
<Button onClick={()=>this.props.navigate("/compaign/add")} sx={{textTransform:'none',height:30,backgroundColor:'#008ffb',fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon sx={{color:'#fff'}}/>}>
Add Campaign
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
      <Table sx={{minWidth:1320 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}> Client Id</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Campaign Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Uploaded Leads</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Lead Target</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Start Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>View</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>View</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>

            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.campaign_list.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
            {row.client_id}
              </TableCell> 
              <TableCell align='center' sx={{color:'#42526e'}}>{row.campaign_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.total_upoaded_Leads}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.lead_target}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.start_date).format('YYYY-MM-DD')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.end_date).format('YYYY-MM-DD')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Button disableElevation variant='contained' onClick={()=>this.props.navigate('/manageLeads/:' + `${row.campaign_id}`)} startIcon={<TimelineIcon/>} sx={{height:20,minWidth:25,fontSize:11,textTransform:'none',backgroundColor:'#008ffb'}}>History</Button></TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Button disableElevation variant='contained' onClick={()=>this.props.navigate('/manageLeads/campaign/:' + `${row.campaign_id}`)} startIcon={<ViewListIcon/>} sx={{height:20,minWidth:25,fontSize:11,textTransform:'none',backgroundColor:'#008ffb'}}>Leads</Button></TableCell>
              
              <TableCell align='center' sx={{color:'#42526e'}}>{row.status}</TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small' onClick={()=>{
    }}>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete">
  <IconButton size='small' onClick={()=>{
        fetch(`${base.base_url}/deleteCamapign`,{
          headers:{
            'content-type':'application/json',
          },
          method:'delete',
          body:JSON.stringify({
           campaign_id:row.campaign_id
          })
        }).then((res)=>{return res.json()}).then((result)=>{
        this.succes()
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

export default ManageLeads





export function ManageLeadsc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<ManageLeads location={location} navigate={navigate}></ManageLeads>)
}





