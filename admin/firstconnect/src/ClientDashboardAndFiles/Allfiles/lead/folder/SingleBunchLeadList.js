import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../../Appheader'
import Sidebar from '../../../Sidebar'
import { Sidebarc } from '../../../Sidebar'
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
import { useNavigate,useLocation,useMatch, useParams } from 'react-router-dom';
import Papa from 'papaparse'
import base from '../../../../base'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {SyncLoader} from 'react-spinners'
import { localeData } from 'moment'
import { ToastContainer, toast } from 'react-toastify';
const drawerWidth = 240;

export class SingleBunchLeadList extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:false,
       form_open:false,
       page:0,
       rowsPerPage:10,
       file:"",
       lead_list:[],
      lead_list_size:0,
  

       headers :[],
       minWidth:920,

       lead_list_coming_from_import : []
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


handleChangePage = (event, newPage) => {
  this.setState({page:newPage},()=>{
    fetch(`${base.base_url}/RetriveBunchLeadList`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
       bunch_id:this.props.param.bunchId.replace(/:/g,''),
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({headers:result.data,lead_list:result.list,lead_list_size:result.length,is_loader_open:false},()=>{
        
      });

    })

  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0},()=>{
    fetch(`${base.base_url}/RetriveBunchLeadList`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
       bunch_id:this.props.param.bunchId.replace(/:/g,''),
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({headers:result.data,lead_list:result.list,lead_list_size:result.length,is_loader_open:false},()=>{
      });

    })
   
  })
};



  componentDidMount(){
    this.setState({is_loader_open:true})
    fetch(`${base.base_url}/RetriveBunchLeadList`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
       bunch_id:this.props.param.bunchId.replace(/:/g,''),
       page:this.state.page,
       rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({headers:result.data,lead_list:result.list,lead_list_size:result.length,is_loader_open:false},()=>{
        this.setState({minWidth:result.data.length * 100})
      });

    })
  }


retriveLeads=()=>{
  fetch(`${base.base_url}/RetriveBunchLeadList`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
     bunch_id:this.props.param.bunchId.replace(/:/g,''),
     page:this.state.page,
     rowsPerPage:this.state.rowsPerPage
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({headers:result.data,lead_list:result.list,lead_list_size:result.length,is_loader_open:false},()=>{

    });

  })
}



succes=()=>{
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
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>List of Leads</Typography>
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
      <Table sx={{minWidth:this.state.minWidth }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Sr. no</TableCell>
            
            {
          this.state.headers?this.state.headers.map((e)=>(
             <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191',textTransform:'capitalize'}}>{e}</TableCell>
          )) :null
            }
            
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.lead_list?this.state.lead_list.map((row,index) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
          <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>{ this.state.rowsPerPage * this.state.page +index + 1}</TableCell>

           {
          this.state.headers?this.state.headers.map((e,indexx)=>(
             <TableCell align='center' sx={{color:'#42526e'}}>{row[e]}</TableCell>
          )) :null
            }
           
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small'>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete">
  <IconButton size='small' onClick={()=>{
     fetch(`${base.base_url}/deleteSingleLead`,{
      headers:{
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({
       bunch_id:this.props.param.bunchId.replace(/:/g,''),
       lead_id:row.lead_id,
       campaign_id:row.campaign_id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.retriveLeads();
      this.succes()
      })

  }} >
<DeleteForeverIcon sx={{color:'#f29494',height:15,width:15}}/>
</IconButton>
</Tooltip>

 </Box></TableCell>
            </TableRow>
          )):null
        
        }
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
   <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.lead_list_size}
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




<Box>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor:"transparent"}}
  open={this.state.is_loader_open}
>
  <Box elevation={2} sx={{height:50,width:100,display:'flex',justifyContent:'center',alignItems:'center'}}>
    <SyncLoader speedMultiplier={1} size={13} color="#008ffb" />
  </Box>

</Backdrop>
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

export default SingleBunchLeadList





export function SingleBunchLeadListc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams()
  return (<SingleBunchLeadList location={location} param={param} navigate={navigate}></SingleBunchLeadList>)
}



/*

           {
          this.state.leadData.headers?this.state.leadData.headers.map((e)=>(
             <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>{`${row}`+ '.'+`${e}`}</TableCell>
          )) :null
           
            }

            */






