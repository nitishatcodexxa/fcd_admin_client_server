import React, { Component } from 'react'
//import {Paper} from '@mui/material'
import { Avatar, Box, Container,Link, Paper,Modal ,Typography ,MenuItem,IconButton,Button, Divider, AppBar, Card} from '@mui/material'
import man from '../img/man.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Toolbar from '@mui/material/Toolbar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import logo from '../img/logo.jpeg'

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DnsIcon from '@mui/icons-material/Dns';
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BugReportIcon from '@mui/icons-material/BugReport';
import DescriptionIcon from '@mui/icons-material/Description';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import TimelineIcon from '@mui/icons-material/Timeline';

export class Appheader extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       open:false,
       data:"",
       textcolor:"#33339c",
       bgcolor:"",
       credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),
       id:1,
       pathname:this.props.location.pathname,
 
       opencompaign:false,

    }
  }

  first=()=>{
    this.setState({id:1},()=>{
       this.props.navigate('/clientDashboard');
    });
   
  }
  
  second = ()=>{
    this.setState({id:2},()=>{
      this.props.navigate('/client');
    });
    
  }
  
  third=()=>{
    this.state.opencompaign? this.setState({opencompaign:false}):this.setState({opencompaign:true})
    this.setState({id:3},()=>{
      this.props.navigate('/compaign')
    },()=>{
      
    })
    
  }
  

  render() {
    return (
      <div>
      <Container maxWidth='lg'>
<Paper elevation={1}  sx={{height:60,backgroundColor:'#fff',borderRadius:2,position:'fixed',width:'100%',marginLeft:{xs:-2,sm:0}}}>
<Box sx={{display:'flex',justifyContent:'space-between',backgroundColor:'#fff',borderRadius:2}}>


<Box onClick={()=>this.setState({open:true})} sx={{display:'flex',justifyContent:'center',height:60,alignItems:'center'}}>
<IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ ml:1,display:{xs:'block',sm:'none',mt:2} }}
        >
          <MenuIcon sx={{}} />
        </IconButton>

</Box>



<Box sx={{display:'flex',justifyContent:'center',height:60,alignItems:'center'}}>



<Box sx={{marginRight:{xs:1,sm:35},display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>


<Stack spacing={2} direction="row" sx={{display:{xs:'none',sm:'block'}}}>
    <Badge badgeContent={0} color="secondary" anchorOrigin={{
  vertical: 'top',
  horizontal: 'left',
}}>
    <EmailOutlinedIcon  sx={{color:'#42526e'}} />
    </Badge>
    <Badge badgeContent={2} color="success" size='small' anchorOrigin={{
  vertical: 'top',
  horizontal: 'left',
}}>
      <NotificationsActiveOutlinedIcon  sx={{color:'#42526e'}} />
    </Badge>
  </Stack>

<Divider sx={{ height: 32, ml:2,mt:1,mb:1,mr:2,display:{xs:'none',sm:'block' }}} orientation="vertical" />

<Avatar alt="Travis Howard"  >
  <PersonOutlinedIcon sx={{height:30,width:30,color:'#0088cc'}}/>
</Avatar>
<Box>
  <Typography sx={{paddingLeft:0.5,paddingRight:0.5,fontSize:13,fontFamily:'sans-serif',fontWeight:'700'}}>Nitish kumar </Typography>
  <Typography sx={{paddingLeft:0.5,paddingRight:0.5,fontSize:11,fontFamily:'sans-serif',color:'#42526e'}}>Admin</Typography>
</Box>

</Box>


</Box>



</Box>
</Paper>
</Container>




<Box sx={{display:{xs:'block',sm:'none'}}}>
<Modal
  open={this.state.open}
  sx={{
    display:{xs:'block',sm:'none'}
  }}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'left',alignItems:'center',height:'100%',width:'100%'}} onClick={()=>this.setState({open:false})}>
<Paper sx={{width:'70%',height:'100vh',backgroundColor:'white',borderRight:3,borderColor:'#b0b0b0'}}>


<br/>
<br/>


<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientDashboard"?'#ebebf5':"#fff",display:'flex',justifyContent:'left',mt:1,borderRadius:2,alignItems:'center'}} onClick={this.first}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DashboardIcon  sx={{marginLeft:2,color:this.state.pathname=="/clientDashboard"?'#33339c':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/clientDashboard"?'#33339c':"#212121",marginLeft:-4}}>Dashboard</Typography>
        </Link>
      </Box>
  </Box>
</Box>





<Box   sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientCampaign"?'#ebebf5':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={this.third}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <TaskAltIcon  sx={{marginLeft:2,color:this.state.pathname=="/clientCampaign"?'#33339c':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/clientCampaign"?'#33339c':"#212121",marginLeft:-4}}>Campaign</Typography>
        </Link>
      </Box>
  </Box>
</Box>




<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/campaignListwithleads"?'#ebebf5':this.state.pathname=="/campaignListwithleads"?'#ebebf5':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/campaignListwithleads')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DnsIcon  sx={{marginLeft:2,color:this.state.pathname=="/campaignListwithleads"?'#33339c':this.state.pathname=="/campaignListwithleads"?"#33339c":"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/campaignListwithleads"?'#33339c':this.state.pathname=="/campaignListwithleads"?"#33339c":"#212121",marginLeft:-4}}>Leads</Typography>
        </Link>
      </Box>
  </Box>
</Box>



<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientRFP"?'#ebebf5':"#fff",display:'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/clientRFP')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <FactCheckIcon  sx={{marginLeft:2,color:this.state.pathname=="/clientRFP"?'#33339c':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:14,fontWeight:'600',color:this.state.pathname=="/clientRFP"?'#33339c':"#212121",marginLeft:-4}}>RFP</Typography>
        </Link>
      </Box>
  </Box>
</Box>


<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientInvoice"?'#ebebf5':"#fff",display:this.state.credential_type.is_admin?'flex':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/clientInvoice')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DescriptionIcon  sx={{marginLeft:2,color:this.state.pathname=="/clientInvoice"?'#33339c':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:14,fontWeight:'600',color:this.state.pathname=="/clientInvoice"?'#33339c':"#212121",marginLeft:-4}}>Invoice</Typography>
        </Link>
      </Box>
  </Box>
</Box>

<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientDepartment"?'#ebebf5':"#fff",display:this.state.credential_type.is_admin?'flex':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/clientDepartment')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Diversity2Icon  sx={{marginLeft:2,color:this.state.pathname=="/clientDepartment"?'#33339c':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/clientDepartment"?'#33339c':"#212121",marginLeft:-4}}>Department</Typography>
        </Link>
      </Box>
  </Box>
</Box>

<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientReport"?'#ebebf5':this.state.pathname=="/clientReport/singleReportView"?'#ebebf5':"#fff",display:this.state.credential_type.is_admin?'flex':'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/clientReport')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <TimelineIcon  sx={{marginLeft:2,color:this.state.pathname=="/clientReport"?'#33339c':this.state.pathname=="/clientReport/singleReportView"?'#33339c':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/clientReport"?'#33339c':this.state.pathname=="/clientReport/singleReportView"?'#33339c':"#212121",marginLeft:-4}}>Report</Typography>
        </Link>
      </Box>
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

export default Appheader

export function Appheaderc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Appheader location={location} navigate={navigate}></Appheader>)
}


/*
 <div>
        <Container maxWidth='lg'>
<Paper elevation={1}  sx={{height:60,backgroundColor:'#fff',borderRadius:2,position:'fixed',width:'100%',marginLeft:{xs:-2,sm:0}}}>
<Box sx={{display:'flex',justifyContent:'space-between',backgroundColor:'#fff',borderRadius:2}}>


<Box sx={{display:'flex',justifyContent:'center',height:60,alignItems:'center'}}>
<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml:1,display:{xs:'block',sm:'none',mt:2} }}
          >
            <MenuIcon sx={{}} />
          </IconButton>

</Box>



<Box sx={{display:'flex',justifyContent:'center',height:60,alignItems:'center'}}>



<Box sx={{marginRight:{xs:1,sm:35},display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>


<Stack spacing={2} direction="row" sx={{display:{xs:'none',sm:'block'}}}>
      <Badge badgeContent={0} color="secondary" anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}>
      <EmailOutlinedIcon  sx={{color:'#42526e'}} />
      </Badge>
      <Badge badgeContent={2} color="success" size='small' anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}>
        <NotificationsActiveOutlinedIcon  sx={{color:'#42526e'}} />
      </Badge>
    </Stack>

<Divider sx={{ height: 32, ml:2,mt:1,mb:1,mr:2,display:{xs:'none',sm:'block' }}} orientation="vertical" />

  <Avatar alt="Travis Howard" src={man} />
  <Box>
    <Typography sx={{paddingLeft:0.5,paddingRight:0.5,fontSize:13,fontFamily:'sans-serif',fontWeight:'700'}}>Nitish kumar </Typography>
    <Typography sx={{paddingLeft:0.5,paddingRight:0.5,fontSize:11,fontFamily:'sans-serif',color:'#42526e'}}>Admin</Typography>
  </Box>
  
</Box>


</Box>



</Box>
</Paper>
</Container>
      </div>

      */