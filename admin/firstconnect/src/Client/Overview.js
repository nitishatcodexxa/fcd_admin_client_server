import React, { Component } from 'react'
import { Box,Grid ,Typography,Paper,LinearProgress,Divider} from '@mui/material'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LoginIcon from '@mui/icons-material/Login';
import { io } from "socket.io-client";
import base from '../base'
import CountUp from 'react-countup';
const socket = io(base.base_url,{
  withCredentials:true
});


export class Overview extends Component {

constructor(props) {
  super(props)

  this.state = {
     total_client:0,
     total_campaign:0,
     total_client_logdin_today:0,
     total_client_logdin_in_week:0,
     /// for campaign
     hold_camapign :0,
     open_campaign :0,
     Canceled_campaign :0,
     completed_campaign :0,

   ////// for invioice
   parcially_Paid_invoice : 0,
   fully_paid_invice : 0,
   due_invoice :0,
   pending_invoice : 0,

////// for performas  ////////




  }
}


componentDidMount(){
  fetch(`${base.base_url}/AllClientINnumberandcampaign`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
    }),
  }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({
    total_client:result.total_client,
    total_campaign:result.total_campaign,
    hold_camapign :result.hold_camapign,
    open_campaign :result.open_campaign,
    Canceled_campaign :result.Canceled_campaign,
    completed_campaign :result.completed_campaign,
  })})
}



  render() {
    return (
      <div>
<Box sx={{height:'100%',width:'100%',mt:2}}>

<Grid container spacing={{xs:2,sm:2}}>
  <Grid item xs={12} sm={6} md={3}>
<Paper  sx={{height:100,backgroundColor:'#fff',width:'100%',borderRadius:2}}>

<Box sx={{padding:1.5,display:'flex',justifyContent:'space-between'}}>
<Box sx={{width:'100%',height:45}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ccedff',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<PeopleAltIcon sx={{height:35,width:35,color:'#00a3ff'}}/>
  </Box>
</Box>

<Box sx={{mt:2}}>
     <Typography sx={{fontSize:20,fontWeight:'600',fontFamily:'sans-serif',color:'#3e3e40',textAlign:'right'}}>
     <CountUp start={0} end={this.state.total_client}  />
     </Typography>
</Box>
</Box>

<Typography sx={{paddingLeft:1.5,textAlign:'right',paddingRight:1.5,fontSize:14,fontWeight:'500',color:'grey'}}>Total clients</Typography>


</Paper>
  </Grid>


  <Grid item xs={12} sm={6} md={3}>
  <Paper  sx={{height:100,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5,display:'flex',justifyContent:'space-between'}}>
<Box sx={{width:'100%',height:45}}>
  <Box sx={{height:45,width:45,backgroundColor:'#fff0d3',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<TaskAltIcon sx={{height:35,width:35,color:'#ffb621'}}/>
  </Box>
</Box>
<Box sx={{mt:2}}>
     <Typography sx={{fontSize:20,fontWeight:'600',fontFamily:'sans-serif',color:'#3e3e40',textAlign:'right'}}>
     <CountUp start={0} end={this.state.total_campaign}  />
     </Typography>
</Box>
</Box>
<Typography sx={{paddingLeft:1.5,textAlign:'right',paddingRight:1.5,fontSize:14,fontWeight:'500',color:'grey'}}>Total Campaign</Typography>
</Paper>
  </Grid>


  <Grid item xs={12} sm={6} md={3}>
  <Paper  sx={{height:100,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5,display:'flex',justifyContent:'space-between'}}>
<Box sx={{width:'100%',height:45}}>
  <Box sx={{height:45,width:45,backgroundColor:'#ffd7e4',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LoginIcon sx={{height:35,width:35,color:'#fe3879'}}/>
  </Box>
</Box>
<Box sx={{mt:2}}>
     <Typography sx={{fontSize:20,fontWeight:'600',fontFamily:'sans-serif',color:'#3e3e40',textAlign:'right'}}>500</Typography>
</Box>
</Box>
<Typography sx={{paddingLeft:1.5,textAlign:'right',paddingRight:1.5,fontSize:14,fontWeight:'500',color:'grey'}}>LoggedIn today</Typography>
</Paper>
  </Grid>


  <Grid item xs={12} sm={6} md={3}>
  <Paper  sx={{height:100,backgroundColor:'#fff',width:'100%',borderRadius:2}}>
<Box sx={{padding:1.5,display:'flex',justifyContent:'space-between'}}>
<Box sx={{width:'100%',height:45}}>
  <Box sx={{height:45,width:45,backgroundColor:'#d4e3ed ',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center'}}>
<LoginIcon sx={{height:35,width:35,color:'#05507a'}}/>
  </Box>
</Box>
<Box sx={{mt:2}}>
     <Typography sx={{fontSize:20,fontWeight:'600',fontFamily:'sans-serif',color:'#3e3e40',textAlign:'right'}}>500</Typography>
</Box>
</Box>
<Typography sx={{paddingLeft:1.5,textAlign:'right',paddingRight:1.5,fontSize:14,fontWeight:'500',color:'grey'}}>Logged in 7 day</Typography>
</Paper>
  </Grid>
</Grid>











<Grid container spacing={2}>
<Grid item xs={12} sm={12} md={6}>
<Box sx={{height:290,width:'100%',mt:{xs:1,sm:1,md:2}}}>
<Paper sx={{height:'100%'}}>
<Box sx={{marginLeft:3,marginRight:3,paddingTop:4}}>



<Grid container>
<Grid  item xs={10}>
  <Typography sx={{fontSize:15,fontWeight:'550',padding:0.5,color:'#848383',fontFamily:'sans-serif'}}>Client has unpaid invoice</Typography>
<LinearProgress
                variant="determinate"
                value={60}
                sx={{
                  height: 6,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f72b2b",
                    borderRadius: "10px",
                  },
                }}
              />
   <Typography sx={{fontSize:12,color:'grey',padding:0.5,fontFamily:'sans-serif',color:'#c6c6c6'}}>60% of total</Typography>            
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:22,fontWeight:'700',mt:1.5}}>18</Typography>
</Grid>
</Grid>


<Grid container>
<Grid  item xs={10}>
  <Typography sx={{fontSize:15,fontWeight:'550',padding:0.5,color:'#848383',fontFamily:'sans-serif'}}>Client has partially paid invoice</Typography>
<LinearProgress
                variant="determinate"
                value={90}
                sx={{
                  height: 6,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "pink",
                    borderRadius: "10px",
                  },
                }}
              />
   <Typography sx={{fontSize:12,color:'grey',padding:0.5,fontFamily:'sans-serif',color:'#c6c6c6'}}>60% of total</Typography>            
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:22,fontWeight:'700',mt:1.5}}>18</Typography>
</Grid>
</Grid>


<Grid container>
<Grid  item xs={10}>
  <Typography sx={{fontSize:15,fontWeight:'550',padding:0.5,color:'#848383',fontFamily:'sans-serif'}}>Client has overdue invoice</Typography>
<LinearProgress
                variant="determinate"
                value={60}
                sx={{
                  height: 6,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "yellow",
                    borderRadius: "10px",
                  },
                }}
              />
   <Typography sx={{fontSize:12,color:'grey',padding:0.5,fontFamily:'sans-serif',color:'#c6c6c6'}}>60% of total</Typography>            
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:22,fontWeight:'700',mt:1.5}}>18</Typography>
</Grid>
</Grid>












</Box>
</Paper>
</Box>
</Grid>
<Grid item xs={12} sm={12} md={6}>
<Box  sx={{height:290,width:'100%',mt:{xs:0,sm:0,md:2}}}>
<Paper sx={{height:'30%'}}>

<Box sx={{marginLeft:3,marginRight:3,paddingTop:1}}>
<Grid container>
<Grid  item xs={10}>
  <Typography sx={{fontSize:15,fontWeight:'550',padding:0.5,color:'#848383',fontFamily:'sans-serif'}}>Client has Completly Paid Invoice</Typography>
<LinearProgress
                variant="determinate"
                value={60}
                sx={{
                  height: 6,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#f72b2b",
                    borderRadius: "10px",
                  },
                }}
              />
   <Typography sx={{fontSize:12,color:'grey',padding:0.5,fontFamily:'sans-serif',color:'#c6c6c6'}}>60% of total</Typography>            
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:22,fontWeight:'700',mt:1}}>18</Typography>
</Grid>
</Grid>
</Box>

</Paper>
<Paper sx={{height:'66%',mt:'2%'}}>
<Box sx={{marginLeft:3,marginRight:3}}>
<Typography sx={{fontSize:17,fontWeight:'600',paddingTop:1,color:'#7f8da1',paddingBottom:1}}>Campaign</Typography>


<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has  Open Campaign</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>{this.state.open_campaign}</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has hold Campaign</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>{this.state.hold_camapign}</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has completed Campaign</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>{this.state.completed_campaign}</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has canceled Campaign</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>{this.state.Canceled_campaign}</Typography>
</Grid>
</Grid>




</Box>
</Paper>
</Box>
</Grid>
</Grid>














<Grid container spacing={{xs:1,sm:1,md:2}}>
<Grid item xs={12} sm={6}>
<Box sx={{height:200,mt:{xs:1,sm:1,md:2}}}>
<Paper sx={{height:'100%',width:'100%'}}>
<Box sx={{marginLeft:3,marginRight:3}}>
<Typography sx={{fontSize:17,fontWeight:'600',paddingTop:1,color:'#7f8da1',paddingBottom:1}}>Performas</Typography>


<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has open Performas</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>18</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has accepted Performas</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>18</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has new  Performas</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>18</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has open Campaign</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>18</Typography>
</Grid>
</Grid>
<Divider/>










</Box>
</Paper>
</Box>
</Grid>
<Grid item xs={12} sm={6}>
<Box sx={{height:200,mt:{xs:1,sm:1,md:2}}}>
<Paper sx={{height:'100%',width:'100%'}}>
<Box sx={{marginLeft:3,marginRight:3}}>
<Typography sx={{fontSize:17,fontWeight:'600',paddingTop:1,color:'#7f8da1',paddingBottom:1}}>Proposals</Typography>


<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has open Proposals</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>18</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has open Proposals</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>18</Typography>
</Grid>
</Grid>
<Divider/>

<Grid container>
<Grid  item xs={10}>
<Typography sx={{fontSize:13,color:'#a0a0a0',padding:0.5}}>Client has open Proposals</Typography>
</Grid>
<Grid  item xs={2}>
<Typography sx={{textAlign:'right',fontSize:14,fontWeight:'700',mt:1}}>18</Typography>
</Grid>
</Grid>
<Divider/>












</Box>
</Paper>
</Box>
</Grid>
</Grid>










































</Box>
      </div>
    )
  }
}

export default Overview