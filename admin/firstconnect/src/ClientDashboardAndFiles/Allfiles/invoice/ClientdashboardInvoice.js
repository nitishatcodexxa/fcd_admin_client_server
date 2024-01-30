import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../../ClientDashboardAndFiles/Appheader'
import Sidebar from '../../../ClientDashboardAndFiles/Appheader'
import Chat from '../../../Chat'
import { Sidebarc } from '../../../ClientDashboardAndFiles/Sidebar'
import { Button, Paper, Typography } from '@mui/material'
import {Box,Backdrop,CircularProgress} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {Tooltip,IconButton,TableBody,Table,Modal,MenuItem,TableContainer,TablePagination,Divider,TableCell,TableHead,TableRow,TextField,InputAdornment} from '@mui/material'
import { useNavigate,useLocation,useMatch,Link } from 'react-router-dom';
import base from '../../../base'
import moment from 'moment'
const drawerWidth = 240;

export class ClientdashboardInvoice extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,
       search:'',
       departmentData : JSON.parse(sessionStorage.getItem('AllClientData')),
       credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),
       invoiceList:[],
    }
    this.handleChangeSearch = this.handleChangeSearch.bind(this)
  }

  componentDidMount(){
   
      fetch(`${base.base_url}/allInvoiceForSingleClientForClientSide`,{
        headers:{
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
          search:this.state.search,
          page:this.state.page,
          rowsPerPage:this.state.rowsPerPage,
          client_id:this.state.departmentData.client_id,
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({invoiceList:result.data})
      })
  }



handleChangeSearch=(e)=>{
this.setState({
  [e.target.name] :e.target.value,page:0
},()=>{
  fetch(`${base.base_url}/allInvoiceForSingleClientForClientSide`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search:this.state.search,
      page:this.state.page,
      rowsPerPage:this.state.rowsPerPage,
      client_id:this.state.departmentData.client_id,
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({invoiceList:result.data})
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
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Invoice</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Invoice List</Typography>
</Box>

</Paper>






<Paper sx={{width:'100%',minHeight:600,mt:2}}>

<Box sx={{display:'flex',flexDirection:'row',padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:2,height:30}}>
<TextField onChange={this.handleChangeSearch} name='search'  variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true}}  placeholder='search'/>
</Box>
</Box>



<Box sx={{mt:0,padding:2}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1220 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Invoice ID</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Compaign Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Bill Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Total Invoice</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Payment Received</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Due</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>SAC CODE</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.invoiceList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
               {row.invoice_id}
              </TableCell> 
              
              <TableCell align='center' sx={{color:'#42526e'}}>{row.campaign_name}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}> {moment(row.bill_date).format('DD-MM-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{moment(row.due_date).format('DD-MM-YYYY')}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>Rs {row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0)   }</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>RS {row.payment_received}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>RS {row.items.reduce( ( sum , cur ) => sum + parseInt(cur.quentity) * parseInt(cur.costPerLead) , 0)  - parseInt(row.payment_received)}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.po_no}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Typography>Pending</Typography></TableCell>
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
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Compaign</Typography>
<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'76vh'}}>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Compaign Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Client<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField value='--' type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Department<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="date" fullWidth size='small'>
<MenuItem  sx={{fontSize:12,fontWeight:'600'}}>
---
</MenuItem>
{[1,2,3].map((option) => (
            <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option}>
              {option}
            </MenuItem>
          ))}
</TextField>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Allocation<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='number' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Start Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>End Date<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>



<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Campaign Budget<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'},  endAdornment: <Typography sx={{fontSize:12,fontWeight:'600',color:'#65aacf',width:100,textAlign:'right'}}>Per Lead</Typography>,}}  name="first_name" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Total Spend<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'/>


<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Description<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  type='text' maxRows={10} InputProps={{sx:{fontSize:12,fontWeight:'600',minHeight:70}}}  name="first_name" fullWidth size='small'/>


<Box sx={{minHeight:120,width:'100%',mt:4}}>
  <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
    <Typography sx={{fontWeight:'bold',fontSize:16}}>Question</Typography>
    <Button size='small' disableElevation sx={{textTransform:'none'}} variant='contained'>Add Question</Button>
  </Box>


<Divider sx={{padding:0.5}}/>


  <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:1,display:'flex',flexDirection:'row'}}>Question Type<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField  select maxRows={10} InputProps={{sx:{fontSize:12,fontWeight:'600'}}}  name="first_name" fullWidth size='small'>
{['type-1','type-2','type-33'].map((option) => (
            <MenuItem key={option} sx={{fontSize:12}} value={option}>
              {option}
            </MenuItem>
          ))}
</TextField>
<TextField  placeholder='Type Question' InputProps={{sx:{fontSize:12,fontWeight:'600',mt:1}}}  name="first_name" fullWidth size='small'/>



<Box sx={{width:'100%',display:'flex',flexDirection:'row',mt:2,mb:1,justifyContent:'space-between',alignItems:'center'}}>
    <Typography sx={{fontWeight:'bold',fontSize:16}}>Question</Typography>
    <Button size='small' disableElevation sx={{textTransform:'none'}} variant='contained'>Add Option</Button>
  </Box>

</Box>



<br/>
<br/>




<Button variant='contained' disableElevation size='small' sx={{backgroundColor:'#2486bb',mt:2,textTransform:'none'}}>
  save
</Button>
<br/>
<br/>
</Box>
</Box>
</Paper>
  </Box>
</Modal>
</Box>




     </div>
    )
  }
}

export default ClientdashboardInvoice
export function ClientdashboardInvoicec(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<ClientdashboardInvoice location={location} navigate={navigate}></ClientdashboardInvoice>)
}
















