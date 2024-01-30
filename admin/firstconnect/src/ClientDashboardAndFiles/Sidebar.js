import React, { Component } from 'react'
import {Box, Card, Paper, SvgIcon, Typography } from '@mui/material'
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
import { useNavigate,useLocation,useMatch,Link } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DnsIcon from '@mui/icons-material/Dns';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BugReportIcon from '@mui/icons-material/BugReport';
import DescriptionIcon from '@mui/icons-material/Description';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import TimelineIcon from '@mui/icons-material/Timeline';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
export class Sidebar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      data:"",
      textcolor:"#33339c",
      bgcolor:"",
      credential_type : JSON.parse(sessionStorage.getItem('credential_type_client')),

      id:1,
      pathname:this.props.location.pathname,

      opencompaign:true,
      openrole:true,
      is_expand_department:false,

    }
  }
 



  first=()=>{
    this.setState({id:1},()=>{
       this.props.navigate('/clientDashboard');
    });
   
  }
  

  
  third=()=>{
    this.setState({id:3},()=>{
      this.props.navigate('/clientCampaign')
    },()=>{
      
    })
    
  }
  
  
  
  componentDidMount(){
  
  }




  render() {
   
    return (
      <div>
        <Box sx={{display:{xs:'none',sm:'flex'},width:240,bottom:0,height:'100vh',position:'sticky'}}>



        <Box sx={{width:240,marginLeft:1,marginRight:1,borderRadius:2,position:'fixed',height:'100vh',overflowY:'scroll', scrollbarWidth:'none','&::-webkit-scrollbar': {
        display: 'none',
    }, }}>



<Paper elevation={1} sx={{height:60,backgroundColor:'white'}}>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<img src={logo} style={{height:60,objectFit:'cover',width:100}}/>
  </Box>
</Paper>


<Paper elevation={1} sx={{minHeight:'100vh',backgroundColor:'#fff',mt:1.5}}>

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





<Box   sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/clientCampaign"?'#ebebf5':this.state.pathname=="/clientCampaign/add"?'#ebebf5':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={this.third}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <TaskAltIcon  sx={{marginLeft:2,color:this.state.pathname=="/clientCampaign"?'#33339c':this.state.pathname=="/clientCampaign/add"?'#33339c':"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/clientCampaign"?'#33339c':this.state.pathname=="/clientCampaign/add"?'#33339c':"#212121",marginLeft:-4}}>Campaign</Typography>
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



<Box  sx={{marginLeft:1,marginRight:2,height:40,backgroundColor:this.state.pathname=="/overviewControllers"?'#ebebf5':this.state.pathname=="/overviewControllers"?'#ebebf5':"#fff",display:'none',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/overviewControllers')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DnsIcon  sx={{marginLeft:2,color:this.state.pathname=="/overviewControllers"?'#33339c':this.state.pathname=="/overviewControllers"?"#33339c":"#8e8e93"}}/>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/overviewControllers"?'#33339c':this.state.pathname=="/campaignListwithleads"?"#33339c":"#212121",marginLeft:-4}}>Overviews</Typography>
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





<Box sx={{display:this.state.is_expand_department?'block':'block'}}>
<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/clientDepartmentAdd"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/clientDepartmentAdd')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',fontSize:13,ml:5,fontWeight:'700',color:this.state.pathname=="/clientDepartmentAdd"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1}}/> Add Department</Typography>
        </Link>
      </Box>
  </Box>
</Box>


<Box  sx={{marginLeft:1,marginRight:2,height:25,backgroundColor:this.state.pathname=="/clientConatctAdd"?'#fff':"#fff",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/clientConatctAdd')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <Box  sx={{width:'100%',marginLeft:'25%'}}>
       <Link style={{textDecoration:'none'}}>
         <Typography  sx={{textDecoration:'none',textAlign:'left',ml:5,fontSize:13,fontWeight:'700',color:this.state.pathname=="/clientConatctAdd"?'#008ffb':this.state.pathname=="/clientConatctAdd/profile"?'#008ffb':"#212121",marginLeft:-4}}><PanoramaFishEyeIcon sx={{height:10,width:10,mr:1}}/>Add Contact</Typography>
        </Link>
      </Box>
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
<br/>

        </Box>
        </Box>
        
        </div>
    )
  }
}

export default Sidebar


export function Sidebarc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Sidebar location={location} navigate={navigate}></Sidebar>)
}