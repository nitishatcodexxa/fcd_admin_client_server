import React, { Component } from 'react'
import Appheader, { Appheaderc } from '../../../ClientDashboardAndFiles/Appheader'
import Sidebar from '../../../ClientDashboardAndFiles/Appheader'
import Chat from '../../../Chat'
import { Sidebarc } from '../../../ClientDashboardAndFiles/Sidebar'
import { Button, Grid, Paper, Typography } from '@mui/material'
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
import Chart from 'react-apexcharts'
const drawerWidth = 240;

export class ClientdashboardReport extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
       is_loader_open:true,
       form_open:false,

       seriesRadialopen: [76],
       optionsRadialopen: {
           plotOptions: {
             radialBar: {
               startAngle: -135,
               endAngle: 225,
               hollow: {
                 margin: 0,
                 size: "70%",
                 background: "#f9efce",
                 image: undefined,
                 imageOffsetX: 0,
                 imageOffsetY: 0,
                 position: "front",
                 dropShadow: {
                   enabled: true,
                   top: 3,
                   left: 0,
                   blur: 4,
                   opacity: 0.24
                 }
               },
               track: {
                 background: "#f9efce",
                 strokeWidth: "70%",
                 margin: 0, // margin is in pixels
                 dropShadow: {
                   enabled: true,
                   top: 0,
                   left: 0,
                   blur: 4,
                   opacity:0
                 }
               },
       
               dataLabels: {
                 showOn: "always",
                 name: {
                   offsetY: -5,
                   show: true,
                   color: "#888",
                   fontSize: "10px"
                 },
                 value: {
                   formatter: function (val) {
                     return val;
                   },
                   color: "#05507a",
                   fontSize: "16px",
                   fontWeight:'800',
                   offsetY: -4,
                   show: true
                 }
               }
             }
           },
           fill: {
             type: "gradient",
             gradient: {
               shade: "dark",
               type: "horizontal",
               shadeIntensity: 0.5,
               gradientToColors: ["#ff7d1e"],
               inverseColors: true,
              
               stops: [0, 100]
             }
           },
           stroke: {
             lineCap: "round"
           },
           labels: ["Open"]
         },
       



         seriesRadialopent: [76],
       optionsRadialopent: {
           plotOptions: {
             radialBar: {
               startAngle: -135,
               endAngle: 225,
               hollow: {
                 margin: 0,
                 size: "70%",
                 background: "#f9efce",
                 image: undefined,
                 imageOffsetX: 0,
                 imageOffsetY: 0,
                 position: "front",
                 dropShadow: {
                   enabled: true,
                   top: 3,
                   left: 0,
                   blur: 4,
                   opacity: 0.24
                 }
               },
               track: {
                 background: "#f9efce",
                 strokeWidth: "70%",
                 margin: 0, // margin is in pixels
                 dropShadow: {
                   enabled: true,
                   top: 0,
                   left: 0,
                   blur: 4,
                   opacity:0
                 }
               },
       
               dataLabels: {
                 showOn: "always",
                 name: {
                   offsetY: -5,
                   show: true,
                   color: "#888",
                   fontSize: "10px"
                 },
                 value: {
                   formatter: function (val) {
                     return val;
                   },
                   color: "#05507a",
                   fontSize: "16px",
                   fontWeight:'800',
                   offsetY: -4,
                   show: true
                 }
               }
             }
           },
           fill: {
             type: "gradient",
             gradient: {
               shade: "dark",
               type: "horizontal",
               shadeIntensity: 0.5,
               gradientToColors: ["#ff7d1e"],
               inverseColors: true,
              
               stops: [0, 100]
             }
           },
           stroke: {
             lineCap: "round"
           },
           labels: ["Open"]
         },
       



         




    }
  }

  componentDidMount(){
    setTimeout(()=>{
this.setState({is_loader_open:false})
    },1000)
  }
  render() {
    return (
  <div>
<Box sx={{display:'flex'}}>
<Sidebarc/>
<Box sx={{width:{ sm: `calc(100% - ${drawerWidth}px)`,xs:'100%' }, }}>
<Box sx={{p:{xs:1,sm:3}, mt:6}}>
<Typography sx={{fontSize:{xs:17,sm:21,marginTop:3,marginBottom:3},mb:1,paddingLeft:{xs:1,sm:2,md:3},fontWeight:'500',color:'#3e3e40'}}>Report</Typography>

<Paper sx={{height:50,width:'100%',backgroundColor:"#fff",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Box sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<Typography sx={{fontSize:17,fontWeight:'500',paddingLeft:{xs:1,sm:2,md:3},color:'#666666'}}>Report</Typography>
</Box>
</Paper>



<Paper sx={{width:'100%',minHeight:600,mt:2}}>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'column',md:'row'},padding:{xs:1,sm:2,md:3},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:{xs:'row'}}}>

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

<Box sx={{backgroundColor:'#fff',borderRadius:2,minHeight:30,width:{xs:'100%',sm:'100%',md:'40%'},display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'}}}>
<TextField  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600',mt:{xs:1,sm:1,md:0},mb:{xs:1,sm:1,md:0},mr:{xs:0,sm:1,md:1}}}}  name="first_name" fullWidth size='small'/>
<TextField select placeholder='Comapaign' InputProps={{sx:{fontSize:12,fontWeight:'600',mt:{xs:1,sm:1,md:0},ml:{xs:0,sm:1,md:1}}}} value='select compaign'  name="first_name" fullWidth size='small'/>
</Box>
</Box>

<Box sx={{mt:0,padding:1}}>

<Box sx={{ml:{xs:'0%',sm:'0%',md:'15%'},mr:{xs:'0%',sm:'0%',md:'15%'}}}>
<Grid container spacing={2} columnSpacing={20}>
<Grid item xs={12} sm={6} md={6}>
<Paper elevation={0}  component={Grid} sx={{height:80,width:'100%',backgroundColor:'#f8f9ff'}}>

<Grid container>
<Grid item xs={7}>
<Box sx={{height:80,width:'100%',display:'flex',justifyContent:'left',alignItems:'center',borderRadius:3}}>

<Box sx={{height:70,width:'100%',padding:2}}>
<Typography sx={{fontWeight:'700',fontSize:16,mt:1}}>Total Spend</Typography>
<Typography sx={{fontWeight:'800',fontSize:19,textAlign:'left',mt:1}}>345</Typography>
</Box>

</Box>
</Grid>
<Grid item xs={5}>
<Box sx={{height:80,width:'100%',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<Chart
              options={this.state.optionsRadialopent}
              series={this.state.seriesRadialopent}
              type="radialBar"
              width="125"
            />  

</Box>
</Grid>
</Grid>
</Paper>
</Grid>


<Grid item xs={12} sm={6} md={6}>
<Paper  elevation={0} sx={{height:80,width:'100%',backgroundColor:'#f8f9ff'}}>
<Grid container>
<Grid item xs={7}>
<Box sx={{height:80,width:'100%',display:'flex',justifyContent:'left',alignItems:'center',borderRadius:3}}>

<Box sx={{height:70,width:'100%',padding:2}}>
<Typography sx={{fontWeight:'700',fontSize:16,mt:1}}>Total Lead</Typography>
<Typography sx={{fontWeight:'800',fontSize:19,textAlign:'left',mt:1}}>345</Typography>
</Box>

</Box>
</Grid>
<Grid item xs={5}>
<Box sx={{height:80,width:'100%',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<Chart
              options={this.state.optionsRadialopen}
              series={this.state.seriesRadialopen}
              type="radialBar"
              width="125"
            />  

</Box>
</Grid>
</Grid>

</Paper>
</Grid>
</Grid>
</Box>

<br/>

<Box sx={{padding:{xs:0,sm:2}}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:720 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Company Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Campaign Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Alloted</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Start Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Department</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[{clientname:"nitish"},{clientname:"nitish"}].map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e'}}  >
               CD00123 
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}} onClick={()=>this.props.navigate('/clientReport/singleReportView')}>Nitish</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>NITISH</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>KUMAR</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>KUMAR</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>72929237@gmailcom</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}><Box sx={{height:20,backgroundColor:'#fceaea',borderRadius:5,display:'flex',justifyContent:"center",alignItems:'center',minWidth:100}}><Typography sx={{color:'pink',fontSize:12,fontWeight:'600'}}>In Progress</Typography></Box></TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small'>
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete">
  <IconButton size='small' >
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

export default ClientdashboardReport
export function ClientdashboardReportc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<ClientdashboardReport location={location} navigate={navigate}></ClientdashboardReport>)
}






