import React, { Component } from 'react'
import {Box,Paper,Tooltip,Backdrop,IconButton,TextField,Button ,TablePagination,Modal,Typography,TableBody,Link,Table,TableContainer,TableCell,TableHead,TableRow,Divider} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Checkbox from 'rc-checkbox';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate,useLocation,useMatch, useParams } from 'react-router-dom';
import moment from 'moment';
import { SyncLoader } from 'react-spinners';
import base from '../../../base'
import Textarea from '@mui/joy/Textarea';
import { ToastContainer, toast } from 'react-toastify';
const JsonSearch = require('search-array').default

const password = require('secure-random-password');
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


export class SingleClientNotes extends Component {

constructor(props) {
  super(props)

  this.state = {
     first:"",
     password:"",
     form_open:false,
     edit_open:false,
     rowsPerPage:10,
     page:0,
  search:"",

     title:"",
     description:"",
note_id:"",
     NoteList:[]

  }
  this.handleChange = this.handleChange.bind()
}

handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

componentDidMount(){
  this.retriveNote();
}

retriveNote=()=>{
  fetch(`${base.base_url}/retriveNote`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
       client_id:this.props.param.singleclient.replace(/:/g,'')
    })
  }).then((res)=>{return res.json()}).then((result)=>{
   this.setState({
    NoteList:result.data,
    is_loader_open:false,
  });
   
  })
}


save=()=>{

  if(this.state.title=="" || this.state.description==""){
    alert("not founund")
  }else{
    fetch(`${base.base_url}/addNotes`,{
  headers:{
    'content-type':'application/json',
  },
  method:'post',
  body:JSON.stringify({
    title:this.state.title,
    description:this.state.description,
     client_id:this.props.param.singleclient.replace(/:/g,'')
  })
}).then((res)=>{return res.json()}).then((result)=>{
 this.setState({
  form_open:false,
  title:"",
  description:""
});
 this.retriveNote();
 this.succes()
})
  }

  
}


edit=()=>{

if(this.state.title=="" || this.state.description=="" || this.state.note_id==""){
  alert("data runi")
}else{
 fetch(`${base.base_url}/editNotes`,{
  headers:{
    'content-type':'application/json',
  },
  method:'put',
  body:JSON.stringify({
    title:this.state.title,
    description:this.state.description,
     client_id:this.props.param.singleclient.replace(/:/g,''),
     note_id:this.state.note_id,
  })
}).then((res)=>{return res.json()}).then((result)=>{
 this.setState({
  edit_open:false,
  title:"",
  description:"",
  note_id:""
});
 this.retriveNote();
 this.succes()
}) } 
}



handleChangePage = (event, newPage) => {
  this.setState({page:newPage})
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0})
};



succes=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Notes Successfully Added</Typography>, {
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





deletess=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Notes Deletet SuccesFull</Typography>, {
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
    const searcher = new JsonSearch(this.state.NoteList, {
      indice: {
        'title':'title', // search the `title`
        'description': 'description', // search the `author` but it's renamed as `name` in queries
      }
    })

    let filtered_data = searcher.query(this.state.search)

    let mm =   stableSort(filtered_data, getComparator(this.state.order, this.state.orderBy)).slice(
      this.state.page * this.state.rowsPerPage,
      this.state.page * this.state.rowsPerPage + this.state.rowsPerPage,
    )


    return (
      <div>
<Box sx={{minHeight:300,backgroundColor:'#fff',mt:1,ml:1,mr:1}}>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row',mt:{xs:1,sm:1,md:1},ml:{xs:0,sm:0,md:1}}}>
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151',mt:1,mb:1}}>Notes</Typography>

</Box>



<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'}}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:1,mt:{xs:1,sm:1,md:1},height:30,marginRight:{xs:1,sm:1,md:0}}}>
    <TextField type='text' fullWidth name='search' onChange={this.handleChange} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191',mt:0.5}}/>, disableUnderline:true,sx:{fontSize:"13px",fontWeight:'600',color:'#666666'}}}  placeholder='Search' sx={{"& input::placeholder": {
      fontSize: "13px",
      marginLeft:"2px",mt:0.5
    }}}/>
</Box>

<Box sx={{mt:{xs:1,sm:1,md:1}}}>
<Button onClick={()=>{this.setState({form_open:true})}} component="label" sx={{textTransform:'none',fontSize:13,height:30,mr:1,backgroundColor:'#008ffb',ml:{xs:0,sm:0,md:2},fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon  sx={{color:'#fff'}}/>}>
Add Notes
</Button>
</Box>
</Box>
</Box>



<Box sx={{mt:1,padding:1}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Modified Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Title</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mm.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  component="th"  scope="row" align='center' sx={{color:'#42526e'}}  >
              {moment(row.modified_date).format('yyyy-mm-dd hh:mm:ss')}
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.title}</TableCell>
              <TableCell align='center'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
<Tooltip title="Edit">
  <IconButton size='small' onClick={()=>{
    this.setState({
      edit_open:true,
      title:row.title,
      description:row.description,
      note_id:row.note_id,
    })
  }}>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete">
  <IconButton size='small'  onClick={()=>{
      fetch(`${base.base_url}/deleteNotes`,{
      headers:{
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({
        note_id:row.note_id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
     this.retriveNote();
     this.deletess()
    })
  }}>
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
          rowsPerPageOptions={[1, 10, 25]}
          component="div"
          count={filtered_data.length}
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
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'50%'},minHeight:'20vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  form_open:false,
  title:"",
  description:"",
  note_id:""
})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Notes</Typography>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},maxHeight:'80vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Title<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.title} name="title" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Description<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:80}}} onChange={this.handleChange}  value={this.state.description} name="description" fullWidth size='small'/>


<Button variant='contained' onClick={this.save} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>

<br/>
<br/>
<br/>
</Box>
</Paper>
  </Box>
</Modal>
</Box>




<Box>
<Modal
  open={this.state.edit_open}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'50%'},minHeight:'20vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({
  edit_open:false,
 
  title:"",
  description:"",
  note_id:""
})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Edit Notes</Typography>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},maxHeight:'80vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Title<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600'}}} onChange={this.handleChange}  value={this.state.title} name="title" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Description<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:80}}} onChange={this.handleChange}  value={this.state.description} name="description" fullWidth size='small'/>
<Textarea minRows={2} />

<Button variant='contained' onClick={this.edit} disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>

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

export default SingleClientNotes
export function SingleClientNotesc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<SingleClientNotes location={location} param={param} navigate={navigate}></SingleClientNotes>)
}




















































