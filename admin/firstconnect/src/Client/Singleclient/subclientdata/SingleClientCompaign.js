import React, { Component } from 'react'
import {Box,Paper,Backdrop,Tooltip,IconButton,Tab,Tabs,Chip,Grid,MenuItem,Autocomplete,Checkbox,TablePagination,Divider,TextField,Button ,Modal,Typography,TableBody,Link,Table,TableContainer,TableCell,TableHead,TableRow, LinearProgress,} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate,useLocation, useParams } from 'react-router-dom';
import AdjustIcon from '@mui/icons-material/Adjust';
import base from '../../../base'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { SyncLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import Textarea from '@mui/joy/Textarea';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const password = require('secure-random-password');


export class SingleClientCompaign extends Component {

constructor(props) {
  super(props)

  this.state = {
    is_loader_open:true,
     first:"",
     password:"",
     form_open:false,
page: 0,
rowsPerPage:10,
search:"",
     campaignList:[],
     totalCampaignsize:0,
     client_list:[],
     departmentList:[],
     delete_confirmation:false,

     form_open_add_geo:false,
     open_job_title:false,
     open_job_function:false,
     job_title_text:"",
     job_function_text:"",

////////////////////////////////// edit wala section
tab_value:'general_info',

/////////////////////  general info
campaign_id:"",
campaign_name:"",
client_name:"",
client_id:"",
campaign_type:"",
end_client:'',
campaign_manager:"",
campaign_manager_id:"",
lead_target:"",
cost_per_lead:"",
cpl_currency:"",
campaign_budget:"",
start_date:"",
end_date:"",

duration:"",
day:"",
required_lead:"",
general_info_geography:[],


is_spacing_required:false,
spacingArray:[],

//////////////// campaign specification

job_title:[],
job_function:[],
job_level:[],
compaign_specification_geography:[],
employee_size:[],
revenue_size:[],
industry_list:[],

////////////////// attachment
account_or_domain_list:"",
contact_per_company:"",
note:"",
supression_or_excusion:"",


any_other_attachment_doc_name:"",         ///All reddy attached file name
supression_or_excusion_docs_name:"",        ///All reddy attached file name
assets_link_docs_name:"",                   ///All reddy attached file name
account_or_domain_list_docs_name:"",         ///All reddy attached file name




any_other_attachment:"",
supression_or_excusion_docs:"",
assets_link_docs:"",
account_or_domain_list_docs:"",

///////////// question

questionList:[],
question_type:'',
question_name:'',
options:[],
option_name:"",


/////////////////////////other data
counrty_name_manual_add:"",
file:"",

  }

  this.handleChange= this.handleChange.bind()
  this.handleChangeSearch = this.handleChangeSearch.bind();
  this.handleChangeMultipleFile = this.handleChangeMultipleFile.bind()
}


handleChange = (e)=>{
  this.setState({[e.target.name]:e.target.value})
}

handleChangeMultipleFile=(e)=>{
  if(e.target.files[0]){
  if(e.target.files[0].size > 0 && e.target.files[0].size < 204800){
   this.setState({
      [e.target.name]:e.target.files[0]
    })  
  }else{
  this.fileMoreSize();
  }
  
  }
  }


  fileMoreSize=()=>{
    toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>File size is more than 2mb</Typography>, {
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

  succes=()=>{
    toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Campaign Updated</Typography>, {
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


  
pacing_added=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Pacing Added</Typography>, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    icon: "😃",
    theme: "colored",
    });
}




fieldunfilled=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Fill All Fields </Typography>, {
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


handleChangeSearch=(e)=>{
this.setState({
  [e.target.name]:e.target.value
},()=>{

  fetch(`${base.base_url}/retriveCampaignForCrmAdminClientPage`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search : this.state.search,
      client_id:this.props.param.singleclient.replace(/:/g,''),
      page:this.state.page,
      rowsPerPage:this.state.rowsPerPage
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.setState({campaignList:result.data,totalCampaignsize:result.length})
  })
})
}

removeQuestion=(id)=>{
const l = this.state.questionList.filter((item)=>item.id!=id)
this.setState({questionList:l})
}

removeOption=(data)=>{
  let m = this.state.options.filter((i)=>(i!==data));
  this.setState({options:m});
}


retriveDepartment=()=>{
  fetch(`${base.base_url}/retriveDepartmentForCamapaignPage`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
  client_id:this.state.client_id
    })
  }).then((res)=>{return res.json()}).then((result)=>{
    this.setState({departmentList:result.data})
  })
}


componentDidMount(){
  //retriveCampaignForCrmAdminClientPage
  fetch(`${base.base_url}/retriveCampaignForCrmAdminClientPage`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search : this.state.search,
      client_id:this.props.param.singleclient.replace(/:/g,''),
      page:this.state.page,
      rowsPerPage:this.state.rowsPerPage
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.setState({campaignList:result.data,totalCampaignsize:result.length,is_loader_open:false})
  }).then(()=>{
    fetch(`${base.base_url}/retriveDepartmentForCamapaignPage`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
    client_id:this.props.param.singleclient.replace(/:/g,'')
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({departmentList:result.data})
    })

  })

}



instantUpdate=()=>{
  fetch(`${base.base_url}/retriveCampaignForCrmAdminClientPage`,{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
      search : this.state.search,
      client_id:this.props.param.singleclient.replace(/:/g,''),
      page:this.state.page,
      rowsPerPage:this.state.rowsPerPage
    })
  }).then((res)=>{return res.json()}).then((result)=>{
this.setState({campaignList:result.data,totalCampaignsize:result.length})
  })
}







edit=()=>{
  const formdata = new FormData();

/// campaign info
formdata.append('campaign_id',this.state.campaign_id)
formdata.append('campaign_name',this.state.campaign_name)
formdata.append('client_name',this.state.client_name)
formdata.append('client_id',this.state.client_id)
formdata.append('campaign_type',this.state.campaign_type)
formdata.append('end_client',this.state.end_client)
formdata.append('campaign_manager',this.state.campaign_manager)
formdata.append('campaign_manager_id',this.state.campaign_manager_id)
formdata.append('lead_target',this.state.lead_target)
formdata.append('cost_per_lead',this.state.cost_per_lead)
formdata.append('cpl_currency',this.state.cpl_currency)
formdata.append('campaign_budget',parseInt(this.state.required_lead) * parseInt(this.state.cost_per_lead))
formdata.append('campaign_budget',this.state.campaign_budget)
formdata.append('start_date',this.state.start_date)
formdata.append('end_date',this.state.end_date)
formdata.append('spacing',JSON.stringify(this.state.spacingArray))
formdata.append('is_spacing_required',this.state.is_spacing_required)

/////campaign specification
formdata.append('job_title',JSON.stringify(this.state.job_title)) 
formdata.append('job_function',JSON.stringify(this.state.job_function))
formdata.append('job_level',JSON.stringify(this.state.job_level))
formdata.append('compaign_specification_geography',JSON.stringify(this.state.compaign_specification_geography))
formdata.append('employee_size',JSON.stringify(this.state.employee_size))
formdata.append('revenue_size',JSON.stringify(this.state.revenue_size))
formdata.append('industry_list',JSON.stringify(this.state.industry_list))

////// attachments

formdata.append('account_or_domain_list',this.state.account_or_domain_list)
formdata.append('assets_link',this.state.assets_link)
formdata.append('contact_per_company',this.state.contact_per_company)
formdata.append('note',this.state.note)
formdata.append('supression_or_excusion',this.state.supression_or_excusion,)


///// document added
formdata.append('any_other_attachment',this.state.any_other_attachment)
formdata.append('supression_or_excusion_docs',this.state.supression_or_excusion_docs)
formdata.append('assets_link_docs',this.state.assets_link_docs)
formdata.append('account_or_domain_list_docs',this.state.account_or_domain_list_docs)

////////// question List
formdata.append('questionList',JSON.stringify(this.state.questionList))


 fetch(`${base.base_url}/editCampaign`,{
  method:'put',
  body: formdata
}).then((res)=>{return res.json()}).then((result)=>{
  this.succes();
  this.instantUpdate();
this.setState({
  tab_value:'general_info',
  form_open:false,
campaign_id:"",
campaign_name:"",
client_name:"",
client_id:"",
campaign_type:"",
end_client:'',
campaign_manager:"",
campaign_manager_id:"",
lead_target:"",
cost_per_lead:"",
cpl_currency:"",
campaign_budget:"",
start_date:"",
end_date:"",

duration:"",
day:"",
required_lead:"",
general_info_geography:[],


is_spacing_required:false,
spacingArray:[],


//////////////// camapign specification
job_title:[],
job_function:[],
job_level:[],
compaign_specification_geography:[],
employee_size:[],
revenue_size:[],
industry_list:[],

////////////////// attachment 


account_or_domain_list:"",
contact_per_company:"",
note:"",
supression_or_excusion:"",


any_other_attachment_doc_name:"",         ///All reddy attached file name
supression_or_excusion_docs_name:"",        ///All reddy attached file name
assets_link_docs_name:"",                   ///All reddy attached file name
account_or_domain_list_docs_name:"",         ///All reddy attached file name




any_other_attachment:"",
supression_or_excusion_docs:"",
assets_link_docs:"",
account_or_domain_list_docs:"",


///////////// question
questionList:[],
question_type:'',
question_name:'',
options:[],
option_name:"",


/////////////////////////other data
counrty_name_manual_add:"",
})
})

}




handleChangePage = (event, newPage) => {
  this.setState({page:newPage},()=>{

    fetch(`${base.base_url}/retriveCampaignForCrmAdminClientPage`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search : this.state.search,
        client_id:this.props.param.singleclient.replace(/:/g,''),
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({campaignList:result.data,totalCampaignsize:result.length})
    })


  })
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0},()=>{

    fetch(`${base.base_url}/retriveCampaignForCrmAdminClientPage`,{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
        search : this.state.search,
        client_id:this.props.param.singleclient.replace(/:/g,''),
        page:this.state.page,
        rowsPerPage:this.state.rowsPerPage
      })
    }).then((res)=>{return res.json()}).then((result)=>{
  this.setState({campaignList:result.data,totalCampaignsize:result.length})
    })
  })
};




succesDelete=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Campaign deleted</Typography>, {
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

fail=()=>{
  toast.error(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Fill All Fields</Typography>, {
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


successFullUpdate=()=>{
  toast.info(<Typography sx={{fontSize:13,fontWeight:'bold'}}>Campaign Updated</Typography>, {
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
<Box sx={{minHeight:300,backgroundColor:'#fff',mt:1,ml:1,mr:1}}>

<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},justifyContent:'space-between'}}>
<Box sx={{display:'flex',flexDirection:'row',mt:{xs:1,sm:1,md:1},ml:{xs:2,sm:2,md:2}}}>
<Box>
<Typography sx={{fontSize:17,fontWeight:'500',color:'#515151',mt:1,mb:1,ml:2}}>Campaign</Typography>
</Box>

</Box>



<Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row',md:'row'},mr:2,ml:2}}>
<Box sx={{backgroundColor:'#f8f9ff',borderRadius:1,mt:{xs:1,sm:1,md:1},height:30,marginRight:{xs:2,sm:2,md:2},ml:{xs:2,sm:2,md:2}}}>
    <TextField type='text' fullWidth value={this.state.search}  name='search' onChange={this.handleChangeSearch} variant='standard' InputProps={{startAdornment:<SearchIcon sx={{color:'#919191'}}/>, disableUnderline:true,sx:{fontSize:"13px",fontWeight:'600',color:'#666666'}}}   placeholder='Search' sx={{"& input::placeholder": {
      fontSize: "13px",
      marginLeft:"2px"
    }}}/>
</Box>

<Box sx={{mt:{xs:1,sm:1,md:1}}}>
<Button onClick={()=>{this.props.navigate('/compaign/add')}} component="label" sx={{textTransform:'none',fontSize:13,height:30,backgroundColor:'#008ffb',ml:{xs:0,sm:0,md:2},fontWeight:'600'}} disableElevation variant="contained" startIcon={<AddIcon  sx={{color:'#fff'}}/>}>
Add Campaign
</Button>
</Box>
</Box>
</Box>




<Box sx={{mt:1,padding:1}}>
<TableContainer component={Box}>
      <Table sx={{minWidth:1320 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='left' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Campaign Name</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Required Leads</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Uploaded Leads</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Campaign Budget</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Start Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>End Date</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Progress</TableCell>
            <TableCell align='center' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Status</TableCell>
            <TableCell align='right' sx={{fontSize:14,fontWeight:'600',color:'#919191'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.campaignList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"  scope="row" sx={{color:'#42526e',textTransform:'capitalize'}}  >
            {row.campaign_name}
              </TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.lead_target}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}> {row.total_upoaded_Leads}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.campaign_budget}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.start_date}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>{row.end_date}</TableCell>
              <TableCell align='center' sx={{color:'#42526e'}}>
<Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<LinearProgress
                variant="determinate"
                value={ parseInt(row.total_upoaded_Leads)/parseInt(row.lead_target)*100}
                sx={{
                  height:3,
                  width:'60%',
                  mr:1,
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#3793ff",
                    borderRadius: "10px",
                  },
                }}
              />
              <Typography sx={{fontWeight:'bold',fontSize:12}}>{ parseInt(row.total_upoaded_Leads)/parseInt(row.lead_target)*100} %</Typography>
            </Box>

              </TableCell>
              <TableCell align='center' sx={{color:'#42526e' ,minWidth:100}}>

<TextField size='small' variant='standard' defaultValue={row.status} InputProps={{sx:{fontSize:12,fontWeight:'600'},disableUnderline:true}} sx={{height:15,ml:1}} select>
  {
    campaignStatus.map((p)=>(
      <MenuItem key={p.id} value={p.status} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>{
        fetch(`${base.base_url}/updateCamapaignStatus`,{
          headers:{
            'content-type':'application/json',
          },
          method:'put',
          body:JSON.stringify({
          campaign_id:row.campaign_id,
          status:p.status,
          })
        }).then((res)=>{return res.json()}).then((result)=>{
        this.successFullUpdate()
        })
      }}>
      {p.status}
      </MenuItem>
    ))
  }
</TextField>

              </TableCell>
              <TableCell align='right'>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'right'}}>
<Tooltip title="Edit">
  <IconButton size='small' 
  onClick={()=>{
    this.setState({
form_open:true,
///////////// value set hare
campaign_id:row.campaign_id,
campaign_name:row.campaign_name,
client_name:row.client_name,
client_id:row.client_id,
campaign_type:row.campaign_type,
end_client:row.end_client,
campaign_manager:row.campaign_manager,
campaign_manager_id:row.campaign_manager_id,
lead_target:row.lead_target,
cost_per_lead:row.cost_per_lead,
cpl_currency:row.cpl_currency,
campaign_budget:row.campaign_budget,
start_date:row.start_date,
end_date:row.end_date,

is_spacing_required:row.is_spacing_required,
spacingArray:row.spacing,

//////////////// camapign specification
job_title:row.job_title,
job_function:row.job_function,
job_level:row.job_level,
compaign_specification_geography:row.compaign_specification_geography,
employee_size:row.employee_size,
revenue_size:row.revenue_size,
industry_list:row.industry_list,

////////////////// attachment 


account_or_domain_list:row.account_or_domain_list,
contact_per_company:row.contact_per_company,
note:row.note,
supression_or_excusion:row.supression_or_excusion,

any_other_attachment:row.any_other_attachment,        ///doc name
supression_or_excusion_docs:row.supression_or_excusion_docs,///doc name
assets_link_docs:row.assets_link_docs,  ///doc name
account_or_domain_list_docs:row.account_or_domain_list_docs, ///doc name



any_other_attachment_doc_name:row.any_other_attachment,         ///All reddy attached file name
supression_or_excusion_docs_name:row.supression_or_excusion_docs,        ///All reddy attached file name
assets_link_docs_name:row.assets_link_docs,                   ///All reddy attached file name
account_or_domain_list_docs_name:row.account_or_domain_list_docs,


///////////// question
questionList:row.questionList,

    },()=>{
      fetch(`${base.base_url}/retriveDepartmentForCamapaignPage`,{
        headers:{
          'content-type':'application/json',
        },
        method:'post',
        body:JSON.stringify({
      client_id:row.client_id
        })
      }).then((res)=>{return res.json()}).then((result)=>{
        this.setState({departmentList:result.data})
      })
    })
    }}
  >
<DriveFileRenameOutlineIcon sx={{color:'#8787c5',height:15,width:15}}/>
</IconButton>
</Tooltip>

<Tooltip title="Delete">
  <IconButton size='small' onClick={()=>{
    this.setState({campaign_id:row.campaign_id,delete_confirmation:true})
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
          count={this.state.totalCampaignsize}
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

  <Paper sx={{width:{xs:'90%',sm:'90%',md:'80%',lg:'80%'},height:'90vh',backgroundColor:'white',borderRadius:2}}>
  <Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>
    <Typography sx={{fontSize:18,fontWeight:'700',ml:{xs:'4%',sm:'17%',md:'12%'},mr:{xs:'2%',sm:'5%',md:'10%'},mt:2}}>Edit Campaign</Typography>
<Box sx={{width:'100%',height:50,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
<Tabs
  value={this.state.tab_value}
  //onChange={this.handleChange}
  textColor="primary"
  indicatorColor="primary"
  aria-label="tab-selector"
>
  <Tab value="general_info" sx={{fontSize:14,fontWeight:'550',textTransform:'none',color:''}} label="Campaign Info"  onClick={()=>this.setState({tab_value:"general_info"})}/>
  <Tab value="campaign_info" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Campaign Specification" onClick={()=>{
    if(this.state.is_spacing_required? this.state.campaign_name!=="" && this.state.client_name!=="" && this.state.client_id!=="" && this.state.campaign_type!=="" && this.state.end_client!=='' && this.state.campaign_manager!=="" && this.state.campaign_manager_id!=="" && this.state.cost_per_lead!=="" && this.state.cpl_currency!==""&& this.state.pre_QA_target!=="" && this.state.start_date!=="" && this.state.end_date!==""  &&  (this.state.spacingArray.length > 0 ) :  this.state.campaign_name!==""  && this.state.lead_target!=="" && this.state.client_name!=="" && this.state.client_id!=="" && this.state.campaign_type!=="" && this.state.end_client!=='' && this.state.campaign_manager!=="" && this.state.campaign_manager_id!=="" && this.state.cost_per_lead!=="" && this.state.cpl_currency!==""&& this.state.pre_QA_target!=="" && this.state.start_date!=="" && this.state.end_date!==""  &&  (this.state.spacingArray.length == 0 ))
    { this.setState({tab_value:'campaign_info'})}
    else{ this.fieldunfilled()}}} />
  <Tab value="attachment" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Attachment" onClick={()=>
  {
    if( this.state.job_title.length > 0 && this.state.job_function.length > 0 && this.state.job_level.length > 0 && (this.state.is_spacing_required?this.state.compaign_specification_geography.length == 0 : this.state.compaign_specification_geography.length > 0)  && this.state.employee_size.length > 0 && this.state.revenue_size.length > 0 && this.state.industry_list.length > 0 ){
      this.setState({tab_value:'attachment'})
   }else{
     this.fieldunfilled()
   } 
  }
  }/>
  <Tab value="question" sx={{fontSize:14,fontWeight:'550',textTransform:'none'}} label="Question" onClick={()=>{
      if( this.state.account_or_domain_list!=="" && this.state.contact_per_company!=="" && this.state.supression_or_excusion!=="" && (this.state.account_or_domain_list=="Attachment if there is TAL"? this.state.account_or_domain_list_docs!=="" : this.state.account_or_domain_list=="Domain List if there is TAL"? this.state.account_or_domain_list_docs!=="" : this.state.account_or_domain_list_docs=="")  && (this.state.supression_or_excusion=="Attachment if there is no supression/exclusion"? this.state.supression_or_excusion_docs!=="" : this.state.supression_or_excusion=="Domain List if there is no supression/exclusion"? this.state.supression_or_excusion_docs!=="" :this.state.supression_or_excusion=="Hashed supression file"? this.state.supression_or_excusion_docs!=="": this.state.supression_or_excusion_docs=="")  ){
        this.setState({tab_value:'question'})
         }else{
           this.fieldunfilled();
         }
  }}/>
</Tabs>
</Box>
<br/>

<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},height:'65vh'}}>

{
<Box sx={{ml:{xs:'3%',sm:'5%',md:'10%'},mr:{xs:'2%',sm:'5%',md:'10%'},display:this.state.tab_value==="general_info"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Campaign Name<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}   sx={{textTransform:'capitalize'}}  value={this.state.campaign_name} name='campaign_name' InputProps={{sx:{fontSize:12,fontWeight:'600'}}}   fullWidth size='small'/>
</Box>
</Grid>



<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Campaign Type<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}  select InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.campaign_type}  name="campaign_type" fullWidth size='small'>
  { 
 [{id:0,compaign_type:"Email (newsletter + souls)"},{id:13,compaign_type:"Telemarketing"},{id:1,compaign_type:"BANT"},{id:2,compaign_type:"Hybrid(Email + TM)"},{id:3,compaign_type:"HQL"},{id:4,compaign_type:"SQL"},{id:5,compaign_type:"Webinar"},{id:6,compaign_type:"Survey"},{id:7,compaign_type:"Data Enrichment"},{id:8,compaign_type:"Data cleansing"},{id:9,compaign_type:"Display"}].map((e)=>(
<MenuItem key={e.id} sx={{fontSize:12,fontWeight:'600'}} value={e.compaign_type}>
{e.compaign_type}
</MenuItem>
    ))
  }
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>End Client<Typography sx={{color:'red'}}></Typography></Typography>
< TextField onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.end_client}  name="end_client" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Campaign Manager<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField select onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.campaign_manager}  name="campaign_manager" fullWidth size='small'>
{
this.state.departmentList.map((e)=>(
<MenuItem key={e.department_id} sx={{fontSize:12,fontWeight:'600'}} onClick={()=>this.setState({campaign_manager:e.department_name,campaign_manager_id:e.department_id})} value={e.department_name}>
{e.department_name}
</MenuItem>
    ))
  }
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} sx={{display:this.state.is_spacing_required?'none':'block'}} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Lead Target<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.lead_target}  name="lead_target" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Cost Per Lead<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}   InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.cost_per_lead}  name="cost_per_lead" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>CPL Currency<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField select onChange={this.handleChange}   InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.cpl_currency} name="cpl_currency" fullWidth size='small'>
  {[{ id:1,currency:"INR",currency_symbole:"₹"},{id:2,currency:"USD",currency_symbole:"$"},{id:3,currency:"Pounds",currency_symbole:"₤"},{id:4,currency:"Australian Dollar",currency_symbole:"AU$"}].map((s)=>(
    <MenuItem sx={{fontSize:12,fontWeight:'600'}} key={s.id} value={s.currency}>
    {s.currency}
    </MenuItem>
  ))

  }
</TextField>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Campaign Budget<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.lead_target * this.state.cost_per_lead} name="campaign_budget" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Start Date<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.start_date}  name="start_date" fullWidth size='small'/>
</Box>
</Grid>

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>End Date<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}  type='date' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.end_date}  name="end_date" fullWidth size='small'/>
</Box>
</Grid>
</Grid>


<Box sx={{height:20,mt:3,width:'100%',display:'flex',flexDirection:'row'}}>
<Checkbox checked={this.state.is_spacing_required} onChange={()=>{this.state.is_spacing_required?this.setState({is_spacing_required:false,lead_target:"",compaign_specification_geography:[],spacingArray:[]}):this.setState({is_spacing_required:true,lead_target:"",spacingArray:[]})}} size="medium"/>
<Typography sx={{fontSize:13,fontWeight:'600',ml:1}}>is  pacing required</Typography>
</Box>
<br/>

{
this.state.is_spacing_required?
<Box>
<Box sx={{width:'100%',mt:1}}>
<Grid container spacing={2} columnSpacing={2}>
<Grid item xs={12} sm={6}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Geography<Typography sx={{color:'red'}}>*</Typography></Typography>
<Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
<Autocomplete
sx={{fontSize:10,mr:1}}
ListboxProps={{
  sx: { fontSize:12,fontWeight:'600',maxHeight:150 },
  }}
fullWidth
        multiple
        id="tags-filled"
        onChange={(e,data)=>{this.setState({general_info_geography:data})}}
        value={this.state.general_info_geography}
        options={country.map((option) => option )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip sx={{height:26,fontSize:12,fontWeight:'600',backgroundColor:'#eff0f0'}} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{width:'100%'}}
            variant='outlined'
            size='small'
            fullWidth
          />
        )}
      />
<Paper onClick={()=>this.setState({form_open_add_geo:true})} sx={{height:35,width:36,backgroundColor:'#2987c8',display:'flex',justifyContent:'center',alignItems:'center'}}>
<AddIcon sx={{color:'#fff'}}/>
</Paper>
</Box>
</Grid>

<Grid item xs={12} sm={2}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Required Lead<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}   type='number' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  value={this.state.required_lead} name="required_lead" fullWidth size='small'/>
</Grid>

<Grid item xs={12} sm={2}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Duration<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}  select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.duration}  name="duration" fullWidth size='small'>
{duration.map((option) => (
            <MenuItem onClick={()=>option.name=="Daily"?this.setState({day:""}):null} key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
</ TextField >
</Grid>


<Grid item xs={12} sm={2}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:this.state.duration=="Daily"?'none':"flex",flexDirection:'row'}}>Day<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}  select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize',display:this.state.duration=="Daily"?'none':'block'}}} value={this.state.day}  name="day" fullWidth size='small'>
{day.map((option) => (
            <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
</ TextField >
</Grid>


</Grid>
</Box>

<br/>
<Box sx={{width:'100%',display:'flex',justifyContent:'left',alignItems:'right'}}>
  <Button variant='contained' size='small' onClick={()=>{ 
  if(this.state.required_lead!=="" && this.state.duration!=="" && this.state.general_info_geography.length > 0){
    this.setState(prevState => ({
    spacingArray: [...prevState.spacingArray,{required_lead:this.state.required_lead,duration:this.state.duration,general_info_geography:this.state.general_info_geography,day:this.state.day,id:Math.round(Math.random() * 1000000000000000)}] 
   }),async()=>{
    let lead_target = 0;
for (let i = 0; i < this.state.spacingArray.length; i++) {
 lead_target = lead_target + this.state.spacingArray[i].required_lead
  
}
    this.pacing_added();
    this.setState({
      lead_target:lead_target,
      required_lead:0,
      duration:"",
      general_info_geography:[],
      day:"",
    })
   }) 
  }else{
    this.fieldunfilled();
  }
  }} disableElevation  sx={{width:60,textTransform:'none'}}>Add</Button>
</Box>
<br/>
  </Box>:null
}



{this.state.spacingArray.map((ee,index)=>(
  <Box>
<Box sx={{width:'100%',mt:1}}>
<Grid container spacing={2} columnSpacing={2}>
<Grid item xs={12} sm={6}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Geography<Typography sx={{color:'red'}}>*</Typography></Typography>
<Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>


<Autocomplete
sx={{fontSize:10,mr:1}}
fullWidth
ListboxProps={{
  sx: { fontSize:12,fontWeight:'600',maxHeight:150 },
  }}
        multiple
        id="tags-filled"
        onChange={(e,data)=>{ 
         let m = this.state.spacingArray;
        let n = {id:ee.id,day:ee.day,required_lead:ee.required_lead,general_info_geography:data, duration:ee.duration}
          m[index] = n;
          this.setState({spacingArray:m})
             }}
        value={ee.general_info_geography}
        options={country.map((option) => option )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip sx={{height:26,fontSize:12,fontWeight:'600',backgroundColor:'#eff0f0'}} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{width:'100%'}}
            variant='outlined'
            size='small'
            fullWidth
          />
        )}
      />


</Box>
</Grid>

<Grid item xs={12} sm={2}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Required Lead<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField  onChange={(e)=>{ 
         let m = this.state.spacingArray;
          m[index].required_lead = e.target.value;
          this.setState({spacingArray:m})
             }}  type='number' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  value={ee.required_lead}  fullWidth size='small'/>
</Grid>

<Grid item xs={12} sm={2}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Duration<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField select type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={ee.duration}   fullWidth size='small'>
{duration.map((option) => (
            <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.name} onClick={async()=>{
                let m = this.state.spacingArray;
                 m[index].duration = option.name;
                 this.setState({spacingArray:m},()=>{

                  if(ee.duration=="Daily"){
                    let ss = this.state.spacingArray;
                    ss[index].day = "";
                    this.setState({spacingArray:ss})
                   }

                 })
            }
            
            }>
              {option.name}
            </MenuItem>
          ))}
</TextField>
</Grid>


<Grid item xs={12} sm={2}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:ee.duration=="Daily"?'none':'flex',flexDirection:'row'}}>Day<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField select  type='text' InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize',display:ee.duration=="Daily"?'none':'block'}}} value={ee.day}   fullWidth size='small'>
{day.map((option) => (
            <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.name} onClick={()=>{
                let m = this.state.spacingArray;
                 m[index].day = option.name;
                 this.setState({spacingArray:m})
            }}>
              {option.name}
            </MenuItem>
          ))}
</TextField>
</Grid>


</Grid>
</Box>
  </Box>
))
}



<br/>

<Box sx={{width:'100%',display:'flex',justifyContent:'right',alignItems:'right'}}>
  <Button variant='contained' size='small' onClick={()=>{
    if(this.state.is_spacing_required? this.state.campaign_name!=="" && this.state.client_name!=="" && this.state.client_id!=="" && this.state.campaign_type!==""  && this.state.campaign_manager!=="" && this.state.campaign_manager_id!=="" && this.state.cost_per_lead!=="" && this.state.cpl_currency!==""&& this.state.pre_QA_target!=="" && this.state.start_date!=="" && this.state.end_date!==""  &&  (this.state.spacingArray.length > 0 ) :  this.state.campaign_name!==""  && this.state.lead_target!=="" && this.state.client_name!=="" && this.state.client_id!=="" && this.state.campaign_type!==""  && this.state.campaign_manager!=="" && this.state.campaign_manager_id!=="" && this.state.cost_per_lead!=="" && this.state.cpl_currency!==""&& this.state.pre_QA_target!=="" && this.state.start_date!=="" && this.state.end_date!==""  &&  (this.state.spacingArray.length == 0 ))
    {
       this.setState({tab_value:'campaign_info'})
    }else{
     this.fieldunfilled()
    }
     
    }}  sx={{width:100,textTransform:'none'}}>Next</Button>
</Box>

<br/>
<br/>
<br/>
<br/>

</Box>
}


{
    <Box sx={{ml:{xs:'3%',sm:'5%',md:'10%'},mr:{xs:'2%',sm:'5%',md:'10%'},display:this.state.tab_value==="campaign_info"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Job Title<Typography sx={{color:'red'}}>*</Typography></Typography>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'center'}}>
<Box sx={{width:'92%'}}>
<Autocomplete
       fullWidth
       ListboxProps={{
       sx: { fontSize:12,fontWeight:'600',maxHeight:150 },
       }}

        multiple
        id="tags-filled"
        onChange={(e,data)=>{this.setState({job_title:data})}}
       value={this.state.job_title}
        options={this.state.job_title}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip sx={{height:26,fontSize:12,fontWeight:'600',backgroundColor:'#eff0f0'}} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
          InputProps={{ sx: { fontSize: 10 } }}
          {...params}
            sx={{width:'100%'}}
            variant='outlined'
            size='small'
            fullWidth
          />
        )}
      />
</Box>


<Box onClick={()=>this.setState({open_job_title:true})} sx={{height:35,p:0.2,borderRadius:0.8,width:35,backgroundColor:'#08c',ml:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<AddIcon sx={{color:'white'}}/>
</Box>


</Box>
</Grid>

<Grid item xs={12} sm={6} >

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Job Function<Typography sx={{color:'red'}}>*</Typography></Typography>
<Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'center'}}>
<Box sx={{width:'92%'}}>
<Autocomplete
       fullWidth
       ListboxProps={{
       sx: { fontSize:12,fontWeight:'600',maxHeight:150 },
       }}

        multiple
        id="tags-filled"
        onChange={(e,data)=>{this.setState({job_function:data})}}
       value={this.state.job_function}
        options={this.state.job_function}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip sx={{height:26,fontSize:12,fontWeight:'600',backgroundColor:'#eff0f0'}} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
          InputProps={{ sx: { fontSize: 10 } }}
          {...params}
            sx={{width:'100%'}}
            variant='outlined'
            size='small'
            fullWidth
          />
        )}
      />
</Box>


<Box onClick={()=>this.setState({open_job_function:true})} sx={{height:35,p:0.2,borderRadius:0.8,width:35,backgroundColor:'#08c',ml:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<AddIcon sx={{color:'white'}}/>
</Box>


</Box>

</Grid>
<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Job Level<Typography sx={{color:'red'}}>*</Typography></Typography>
<Autocomplete
       fullWidth
       ListboxProps={{
       sx: { fontSize:12,fontWeight:'600',maxHeight:150 },
       }}

        multiple
        id="tags-filled"
        onChange={(e,data)=>{this.setState({job_level:data})}}
      value={this.state.job_level}  /// 
        options={[{ id:1,job_level:"President"},{id:2,job_level:"Founder"}, {id:3,job_level:"Co-Founder"}, {id:4,job_level:"C-Level"} , {id:5,job_level:"Vice-President"} ,{id:6,job_level:"Director"} ,{id:7,job_level:"Head"} ,{id:8,job_level:"Manager"},{id:9,job_level:"Staff"},{id:9,job_level:'All'}].map((option) => option.job_level )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip sx={{height:26,fontSize:12,fontWeight:'600',backgroundColor:'#eff0f0'}} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
          InputProps={{ sx: { fontSize: 10 } }}
          {...params}
            sx={{width:'100%'}}
            variant='outlined'
            size='small'
            fullWidth
          />
        )}
      />
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Employee Size<Typography sx={{color:'red'}}>*</Typography></Typography>

<Autocomplete
sx={{fontSize:10,mr:1}}
fullWidth
        multiple
        ListboxProps={{
          sx: { fontSize:12,fontWeight:'600',maxHeight:150 },
          }}
        id="tags-filled"
        onChange={(e,data)=>{this.setState({employee_size:data})}}
      value={this.state.employee_size}
        options={[{ id:1,emp_size:"self-employeed"},{id:2,emp_size:"1-10"}, {id:3,emp_size:"11-50"}, {id:4,emp_size:"51-200"} , {id:5,emp_size:"201-500"} ,{id:6,emp_size:"501-1000"} ,{id:7,emp_size:"1001-5000"} ,{id:8,emp_size:"5001-10000"},{id:9,emp_size:"10001+"},{id:9,emp_size:'All'}].map((option) => option.emp_size )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip sx={{height:26,fontSize:12,fontWeight:'600',backgroundColor:'#eff0f0'}} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{width:'100%'}}
            variant='outlined'
            size='small'
            fullWidth
          />
        )}
      />
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Revenue Size<Typography sx={{color:'red'}}>*</Typography></Typography>

<Autocomplete
sx={{fontSize:10,mr:1}}
fullWidth
        multiple
        ListboxProps={{
          sx: { fontSize:12,fontWeight:'600',maxHeight:150 },
          }}
        id="tags-filled"
        onChange={(e,data)=>{this.setState({revenue_size:data})}}
       value={this.state.revenue_size}
        options={[{ id:1,rev_size:"<1M"},{id:2,rev_size:"1M-10M"}, {id:3,rev_size:"11M-25M"}, {id:4,rev_size:"25M-50M"} , {id:5,rev_size:"50M-100M"} ,{id:6,rev_size:"100M-250M"} ,{id:7,rev_size:"250M-500M"} ,{id:8,rev_size:"500M-1B"},{id:9,rev_size:"1B-5B"},{id:9,rev_size:'5B-10B'},{id:9,rev_size:'10B-25B'},{id:9,rev_size:'25B-Above'}].map((option) => option.rev_size )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip sx={{height:26,fontSize:12,fontWeight:'600',backgroundColor:'#eff0f0'}} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{width:'100%'}}
            variant='outlined'
            size='small'
            fullWidth
          />
        )}
      />
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Industry<Typography sx={{color:'red'}}>*</Typography></Typography>
<Autocomplete
sx={{fontSize:10,mr:1}}
fullWidth
        multiple
        ListboxProps={{
          sx: { fontSize:12,fontWeight:'600',maxHeight:150 },
          }}
        id="tags-filled"
        onChange={(e,data)=>{this.setState({industry_list:data})}}
        value={this.state.industry_list}
        options={industry.map((option) => option )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip sx={{height:26,fontSize:12,fontWeight:'600',backgroundColor:'#eff0f0'}} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{width:'100%'}}
            variant='outlined'
            size='small'
            fullWidth
          />
        )}
      />
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box sx={{display:this.state.is_spacing_required?'none':'block'}}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:this.state.is_spacing_required?'none':'flex',flexDirection:'row'}}>Geography<Typography sx={{color:'red'}}>*</Typography></Typography>
 <Autocomplete
sx={{fontSize:10,}}
        multiple
        ListboxProps={{
          sx: { fontSize:12,fontWeight:'600',maxHeight:150 },
          }}
        id="tags-filled"
        onChange={(e,data)=>{this.setState({compaign_specification_geography:data})}}
        options={country.map((option) => option )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip sx={{height:26,fontSize:12,fontWeight:'600',backgroundColor:'#eff0f0'}} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            size='small'
            fullWidth
          />
        )}
      />
</Box>
</Grid>
</Grid>
<br/>


<Box sx={{width:'100%',display:'flex',justifyContent:'left',alignItems:'right'}}>
<Button variant='contained' size='small' onClick={()=>{


console.log(this.state.job_title, this.state.job_function, this.state.job_level, this.state.employee_size, this.state.revenue_size, this.state.industry_list,this.state.is_spacing_required,this.state.compaign_specification_geography.length)


if(this.state.job_title.length > 0 && this.state.job_function.length > 0 && this.state.job_level.length > 0 && (this.state.is_spacing_required?this.state.compaign_specification_geography.length == [] : this.state.compaign_specification_geography.length > 0)  && this.state.employee_size.length > 0 && this.state.revenue_size.length > 0 && this.state.industry_list.length > 0 ){
   this.setState({tab_value:'attachment'})
}else{
  this.fieldunfilled()
} 


}}  sx={{width:100,textTransform:'none'}}>Next</Button>
</Box>
<br/>
<br/>
<br/>
<br/>

</Box>
}



{
    <Box sx={{ml:{xs:'3%',sm:'5%',md:'10%'},mr:{xs:'2%',sm:'5%',md:'10%'},display:this.state.tab_value==="attachment"?"block":"none"}}>
<Grid container spacing={1} columnSpacing={2}> 

<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Account/Domain List<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  select InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.account_or_domain_list}  name="account_or_domain_list" fullWidth size='small'>
  {
    [{id:1,name:"Open if no account list"},{id:2,name:"Attachment if there is TAL"},{id:3,name:"Domain List if there is TAL"}].map((option)=>(
      <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option.name} onClick={()=>{this.setState({account_or_domain_list_docs:""})}}>
      {option.name}
    </MenuItem>
    ))
  }
</ TextField >
</Box>



<Box sx={{display:this.state.account_or_domain_list_docs_name==""?'none':'flex',flexDirection:'row',width:'100%'}}>
<Box sx={{height:25,width:'80%',mt:1,mb:1,border:0.5,borderStyle:'dashed',borderRadius:1,display:'flex',borderColor:'#e0e0e0',backgroundColor:'#fbfcfe',alignItems:'center'}}>
  <Typography  sx={{fontSize:11,padding:0.4,display:'inline-block',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{this.state.account_or_domain_list_docs_name}</Typography>
</Box>
  
<Paper elevation={1} sx={{height:25,width:25,display:'flex',borderRadius:0.5,mt:1,mb:1,ml:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#0088cc'}}>
<RemoveRedEyeIcon sx={{color:'white',height:17,width:17}}/>
</Paper>

<Paper elevation={1} sx={{height:25,width:25,display:'flex',borderRadius:0.5,mt:1,mb:1,ml:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#ea5455'}}>
<CloseIcon sx={{color:'#fff',height:17,width:17}}/>
</Paper>
</Box>


<Box sx={{mt:1,mb:1,display:this.state.account_or_domain_list=='Attachment if there is TAL'?'block':this.state.account_or_domain_list=='Domain List if there is TAL'?'block':'none'}}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Attachment (Max 2mb)<Typography sx={{color:'red'}}>*</Typography></Typography>
<Box sx={{height:33,width:'100%',border:0.5,borderStyle:'dashed',borderRadius:1,display:'flex',borderColor:'#e0e0e0',backgroundColor:'#fbfcfe'}}>
<Box sx={{p:0.4}}>
<input type='file'  name='account_or_domain_list_docs' onChange={this.handleChangeMultipleFile} />
</Box>
</Box>
</Box>
</Grid>



<Grid item xs={12} sm={6}>
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Supression/Exclusion<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange} select InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.supression_or_excusion}  name="supression_or_excusion" fullWidth size='small'>
{
    [{id:1,name:"Open if there is no supression/exclusion"},{id:2,name:"Attachment if there is no supression/exclusion"},{id:3,name:"Domain List if there is no supression/exclusion"},{id:3,name:"Hashed supression file"}].map((option)=>(
      <MenuItem key={option} sx={{fontSize:12,fontWeight:'600'}} value={option.name} onClick={()=>{this.setState({supression_or_excusion_docs:""})}}>
      {option.name}
    </MenuItem>
    ))
  }
</ TextField >
</Box>


 

<Box sx={{display:this.state.supression_or_excusion_docs_name==""?"none":'flex',flexDirection:'row',width:'100%'}}>
<Box sx={{height:25,width:'80%',mt:1,mb:1,border:0.5,borderStyle:'dashed',borderRadius:1,display:'flex',borderColor:'#e0e0e0',backgroundColor:'#fbfcfe',alignItems:'center'}}>
  <Typography  sx={{fontSize:11,padding:0.4,display:'inline-block',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{this.state.supression_or_excusion_docs_name}</Typography>
</Box>
  
<Paper elevation={1} sx={{height:25,width:25,display:'flex',borderRadius:0.5,mt:1,mb:1,ml:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#0088cc'}}>
<RemoveRedEyeIcon sx={{color:'white',height:17,width:17}}/>
</Paper>

<Paper elevation={1} sx={{height:25,width:25,display:'flex',borderRadius:0.5,mt:1,mb:1,ml:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#ea5455'}}>
<CloseIcon sx={{color:'#fff',height:17,width:17}}/>
</Paper>
</Box>

<Box sx={{mt:1,mb:1,display:this.state.supression_or_excusion=="Attachment if there is no supression/exclusion"?'block':this.state.supression_or_excusion=="Domain List if there is no supression/exclusion"?'block':this.state.supression_or_excusion=="Hashed supression file"?'block':'none'}}>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Attachment (Max 2mb)<Typography sx={{color:'red'}}>*</Typography></Typography>
<Box sx={{height:33,width:'100%',border:0.5,borderStyle:'dashed',borderRadius:1,display:'flex',borderColor:'#e0e0e0',backgroundColor:'#fbfcfe'}}>
<Box sx={{p:0.4}}>
<input type='file'  name='supression_or_excusion_docs' onChange={this.handleChangeMultipleFile} />
</Box>
</Box>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Assets Link (Max 2mb)<Typography sx={{color:'red'}}>*</Typography></Typography>

<Box sx={{display:this.state.assets_link_docs_name==""?"none":'flex',flexDirection:'row',width:'100%'}}>
<Box sx={{height:25,width:'80%',mt:1,mb:1,border:0.5,borderStyle:'dashed',borderRadius:1,display:'flex',borderColor:'#e0e0e0',backgroundColor:'#fbfcfe',alignItems:'center'}}>
  <Typography  sx={{fontSize:11,padding:0.4,display:'inline-block',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{this.state.assets_link_docs_name}</Typography>
</Box>
  
<Paper elevation={1} sx={{height:25,width:25,display:'flex',borderRadius:0.5,mt:1,mb:1,ml:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#0088cc'}}>
<RemoveRedEyeIcon sx={{color:'white',height:17,width:17}}/>
</Paper>

<Paper elevation={1} sx={{height:25,width:25,display:'flex',borderRadius:0.5,mt:1,mb:1,ml:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#ea5455'}}>
<CloseIcon sx={{color:'#fff',height:17,width:17}}/>
</Paper>
</Box>



<Box sx={{height:33,width:'100%',border:0.5,borderStyle:'dashed',borderRadius:1,display:'flex',borderColor:'#e0e0e0',backgroundColor:'#fbfcfe'}}>
<Box sx={{padding:0.4}}>
<input type='file'  name='assets_link_docs'  onChange={this.handleChangeMultipleFile}  />
</Box>
</Box>
</Box>
</Grid>



<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Contact per company/Account<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}   InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.contact_per_company}  name="contact_per_company" fullWidth size='small'/>
</Box>
</Grid>


<Grid item xs={12} sm={6}>
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Any Other Attachment (Max 2mb)<Typography sx={{color:'red'}}>*</Typography></Typography>



<Box sx={{display:this.state.any_other_attachment_doc_name==""?'none':'flex',flexDirection:'row',width:'100%'}}>
<Box sx={{height:25,width:'80%',mt:1,mb:1,border:0.5,borderStyle:'dashed',borderRadius:1,display:'flex',borderColor:'#e0e0e0',backgroundColor:'#fbfcfe',alignItems:'center'}}>
  <Typography  sx={{fontSize:11,padding:0.4,display:'inline-block',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{this.state.any_other_attachment_doc_name}</Typography>
</Box>
  
<Paper elevation={1} sx={{height:25,width:25,display:'flex',borderRadius:0.5,mt:1,mb:1,ml:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#0088cc'}}>
<RemoveRedEyeIcon sx={{color:'white',height:17,width:17}}/>
</Paper>

<Paper elevation={1} sx={{height:25,width:25,display:'flex',borderRadius:0.5,mt:1,mb:1,ml:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#ea5455'}}>
<CloseIcon sx={{color:'#fff',height:17,width:17}}/>
</Paper>
</Box>






<Box sx={{height:60,width:'100%',border:0.5,borderStyle:'dashed',borderRadius:1,display:'flex',borderColor:'#e0e0e0',backgroundColor:'#fbfcfe'}}>
<Box sx={{ml:2,mt:2}}>
<input type='file'  name='any_other_attachment' onChange={this.handleChangeMultipleFile} />
</Box>
</Box>
</Box>
</Grid>


<Grid item xs={12} sm={6} >
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Note<Typography sx={{color:'red'}}></Typography></Typography>
<Textarea onChange={this.handleChange} placeholder='Type something......' value={this.state.note} name='note' minRows={5} sx={{width:'100%',fontSize:12,fontWeight:'600'}}/>
</Box>
</Grid>
</Grid>
<br/>



<Box sx={{width:'100%',display:'flex',justifyContent:'left',alignItems:'right'}}>
<Button variant='contained' size='small' onClick={()=>{

  if( this.state.account_or_domain_list!=="" && this.state.contact_per_company!=="" && this.state.supression_or_excusion!=="" && (this.state.account_or_domain_list=="Attachment if there is TAL"? this.state.account_or_domain_list_docs!=="" : this.state.account_or_domain_list=="Domain List if there is TAL"? this.state.account_or_domain_list_docs!=="" : this.state.account_or_domain_list_docs=="")  && (this.state.supression_or_excusion=="Attachment if there is no supression/exclusion"? this.state.supression_or_excusion_docs!=="" : this.state.supression_or_excusion=="Domain List if there is no supression/exclusion"? this.state.supression_or_excusion_docs!=="" :this.state.supression_or_excusion=="Hashed supression file"? this.state.supression_or_excusion_docs!=="": this.state.supression_or_excusion_docs=="")  ){
 this.setState({tab_value:'question'})
  }else{
    this.fieldunfilled();
  }
 }}  sx={{width:100,textTransform:'none'}}>Next</Button>
</Box>
<br/>
<br/>
<br/>


</Box>
}




{
<Box sx={{ml:{xs:'4%',sm:'7%',md:'25%'},mr:{xs:'4%',sm:'7%',md:'25%'},display:this.state.tab_value==="question"?"block":"none"}}>

<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Question Type <Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField select onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.question_type}  name="question_type" fullWidth size='small'>{
  [{id:1,name:"Single choice"},{id:2,name:"Multiple choice"}].map((option)=>(
    <MenuItem key={option.id} sx={{fontSize:12,fontWeight:'600'}} value={option.name} onClick={()=>this.setState({question_name:"",option_name:"",options:[]})}>
      {option.name}
    </MenuItem>
  ))
}
</TextField>
</Box>


    <Box sx={{mt:2,display:this.state.question_type=="Single choice"?'block':'none'}}>
  <Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Question<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.question_name}  name="question_name" fullWidth size='small'/>
</Box>


  <Box sx={{mt:2,display:this.state.question_type=="Multiple choice"?'block':'none'}}>
<Box>
<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Question<Typography sx={{color:'red'}}>*</Typography></Typography>
<TextField onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.question_name}  name="question_name" fullWidth size='small'/>
</Box>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,mt:2}}>Add options</Typography>
<Box sx={{display:'flex',flexDirection:'row'}}>
<TextField onChange={this.handleChange}  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} value={this.state.option_name}  name="option_name" fullWidth size='small'/>
<Paper onClick={()=>{
  if(this.state.option_name!==""){
     this.setState(prevState => ({
    options: [...prevState.options,this.state.option_name] 
   }),()=>{
    this.setState({
      option_name:"",
    })
   }) 
  }else{
    alert('fill all fields')
  }
 
  
}} sx={{height:32,width:35,backgroundColor:'#366e9f',ml:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
<AddIcon sx={{color:'white'}}/>
</Paper>
</Box>

<br/>
<br/>

{
  this.state.options.map((s)=>(
    <Box sx={{display:'flex',flexDirection:'row',mt:1}}>
<TextField  value={s} InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}} fullWidth size='small'/>
<Paper onClick={this.removeOption.bind(this,s)} sx={{height:32,width:35,backgroundColor:'#145180 ',ml:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
  <CloseIcon sx={{color:'white'}}/>
</Paper>
</Box>
  ))

}


</Box>




<br/>
<br/>

<Box>
<Button disableElevation sx={{textTransform:'none'}} startIcon={<AddIcon sx={{color:'white'}}/>} variant='contained' size='small' onClick={()=>{
if(this.state.question_name!=="" && this.state.question_type!==""){
 this.setState(prevState => ({
    questionList: [...prevState.questionList,{question_type:this.state.question_type,question_name:this.state.question_name,option:this.state.options,id:Math.round(Math.random() * 1000000000000000)}] 
   }),()=>{

    this.setState({
      question_type:"",
      option_name:"",
      question_name:"",
      options:[],
    })
   }) 
}else{
  alert('fill all fields')
}
   


  
}}>Add Question</Button>
<br/>
<br/>
<Divider/>
<Divider/>
<Typography sx={{mt:1,mb:1,fontSize:14,fontWeight:'600'}}>Question List Below</Typography>

{
this.state.questionList.map((s,index)=>(
  <Box sx={{mb:1}}>
 <Typography sx={{fontSize:13,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>{index+1}). {s.question_name}<Typography sx={{color:'red'}}></Typography></Typography>
 {s.option.map((t)=>(
 <Typography sx={{fontSize:13,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}><AdjustIcon sx={{height:13,width:13,ml:2,mr:1,mt:0.3}}/> {t}</Typography>
 ))
  }
  <Button disableElevation size='small' onClick={this.removeQuestion.bind(this,s.id)} variant='contained' sx={{textTransform:'none',ml:2,fontSize:12,mt:1,height:25,backgroundColor:'#f29494'}} startIcon={<DeleteForeverIcon/>}>Remove</Button>
  <Divider sx={{mt:0.5,mb:0.5}}/>
</Box>
))
}



<br/>
<br/>
<br/>
<Button variant='contained' onClick={this.edit}>Edit Apply</Button>
</Box>

<br/>
<br/>

<br/>
</Box>

}




</Box>
</Box>
</Paper>


  </Box>
</Modal>
</Box>




<Box> 
<Modal
  open={this.state.open_job_title}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({open_job_title:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Job Title</Typography>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},minHeight:'10vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Name<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange} value={this.state.job_title_text} name='job_title_text'  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  fullWidth size='small'/>
<br/>
<br/>
<Button variant='contained' onClick={()=>{
if(this.state.job_title_text==""){
  alert("not valid")
}else{
 this.setState(prevState => ({
  job_title: [...prevState.job_title,this.state.job_title_text] 
}),()=>{
  this.setState({open_job_title:false,job_title_text:""})
}) 
}
}} size='small' sx={{textTransform:'none'}}>Save</Button>
<br/>
<br/>
</Box>
</Paper>
</Box>
</Modal>
</Box>





<Box> 
<Modal
  open={this.state.open_job_function}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({open_job_title:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Job function</Typography>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},minHeight:'10vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Name<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange} value={this.state.job_function_text} name='job_function_text'  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  fullWidth size='small'/>
<br/>
<br/>
<Button variant='contained' onClick={()=>{
if(this.state.job_function_text==""){
  alert("not valid")
}else{
 this.setState(prevState => ({
  job_function: [...prevState.job_function,this.state.job_function_text] 
}),()=>{
  this.setState({open_job_function:false,job_function_text:""})
}) 
}
}} size='small' sx={{textTransform:'none'}}>Save</Button>
<br/>
<br/>
</Box>
</Paper>
</Box>
</Modal>
</Box>




<Box> 
<Modal
  open={this.state.form_open_add_geo}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'40%'},backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>this.setState({form_open_add_geo:false})} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>

<Typography sx={{fontSize:18,fontWeight:'600',paddingLeft:{xs:2,sm:4},mb:2}}>Add Geography</Typography>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4},minHeight:'10vh'}}>

<Typography sx={{fontSize:12,fontWeight:'600',padding:0.2,display:'flex',flexDirection:'row'}}>Geography<Typography sx={{color:'red'}}>*</Typography></Typography>
< TextField onChange={this.handleChange} value={this.state.counrty_name_manual_add} name='counrty_name_manual_add'  InputProps={{sx:{fontSize:12,fontWeight:'600',textTransform:'capitalize'}}}  fullWidth size='small'/>
<br/>
<br/>
<Button variant='contained' onClick={()=>{
if(this.state.counrty_name_manual_add==""){
  alert("not valid")
}else{
 this.setState(prevState => ({
  general_info_geography: [...prevState.general_info_geography,this.state.counrty_name_manual_add] 
}),()=>{
  this.setState({form_open_add_geo:false,counrty_name_manual_add:""})
}) 
}
}} size='small' sx={{textTransform:'none'}}>Save</Button>
<br/>
<br/>
</Box>
</Paper>
</Box>
</Modal>
</Box>







<Box> 
<Modal
  open={this.state.delete_confirmation}
 // onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'70%',md:'40%',lg:'30%'},height:300,backgroundColor:'white',borderRadius:2}}>

<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>

<Box sx={{display:'flex',justifyContent:'center',mt:3}}>
  <Box sx={{height:50,width:50,backgroundColor:'#ffe2e4',borderRadius:15,display:'flex',justifyContent:'center',alignItems:'center'}}>
<WarningAmberIcon sx={{height:30,width:30,color:'#e11d48'}}/>
  </Box>
</Box>
<Typography sx={{textAlign:'center',fontWeight:'800',padding:1,color:'black',fontSize:13}}>Are You Sure?</Typography>

<Box sx={{ml:{xs:2,sm:4,md:10},mr:{xs:2,sm:4,md:10}}}>
<Typography sx={{fontSize:13,color:'grey',textAlign:'center'}}>This action cannot be undone. All value associate to this field will be deleted</Typography>
</Box>

<Box sx={{ml:{xs:1,sm:3,md:6},mr:{xs:1,sm:3,md:6},mt:3,display:'flex',flexDirection:'column'}}>
<Button size='small'  variant='contained' onClick={()=>{
    

    fetch(`${base.base_url}/deleteCamapign`,{
      headers:{
        'content-type':'application/json',
      },
      method:'delete',
      body:JSON.stringify({
       campaign_id:this.state.campaign_id
      })
    }).then((res)=>{return res.json()}).then((result)=>{
      this.setState({
        campaign_id:"",
        delete_confirmation:false
       })
       this.succesDelete();
      this.instantUpdate();
    })
}} disableElevation sx={{textTransform:'none',background:'#e11d48',color:'white'}}>Delete Fields</Button>

<Button size='small' variant='outlined' onClick={()=>this.setState({delete_confirmation:false,client_id:""})} disableElevation sx={{textTransform:'none',mt:1}}>Cancel</Button>
</Box>

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

export default SingleClientCompaign

export function SingleClientCompaignc(props){
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  return (<SingleClientCompaign location={location} param={param} navigate={navigate}></SingleClientCompaign>)
}





const country= ['Afghanistan',
'Albania',
'Algeria',
'Andorra',
'Angola',
'Antigua and Barbuda',
'Argentina',
'Armenia',
'Australia',
'Austria',
'Azerbaijan',
'The Bahamas',
'Bahrain',
'Bangladesh',
'Barbados',
'Belarus',
'Belgium',
'Belize',
'Benin',
'Bhutan',
'Bolivia',
'Bosnia and Herzegovina',
'Botswana',
'Brazil',
'Brunei',
'Bulgaria',
'Burkina Faso',
'Burundi',
'Cabo Verde',
'Cambodia',
'Cameroon',
'Canada',
'Central African Republic',
'Chad',
'Chile',
'China',
'Colombia',
'Comoros',
'Congo, Democratic Republic of the',
'Congo, Republic of the',
'Costa Rica',
'Côte d’Ivoire',
'Croatia',
'Cuba',
'Cyprus',
'Czech Republic',
'Denmark',
'Djibouti',
'Dominica',
'Dominican Republic',
'East Timor (Timor-Leste)',
'Ecuador',
'Egypt',
'El Salvador',
'Equatorial Guinea',
'Eritrea',
'Estonia',
'Eswatini',
'Ethiopia',
'Fiji',
'Finland',
'France',
'Gabon',
'The Gambia',
'Georgia',
'Germany',
'Ghana',
'Greece',
'Grenada',
'Guatemala',
'Guinea',
'Guinea-Bissau',
'Guyana',
'Haiti',
'Honduras',
'Hungary',
'Iceland',
'India',
'Indonesia',
'Iran',
'Iraq',
'Ireland',
'Israel',
'Italy',
'Jamaica',
'Japan',
'Jordan',
'Kazakhstan',
'Kenya',
'Kiribati',
'Korea, North',
'Korea, South',
'Kosovo',
'Kuwait',
'Kyrgyzstan',
'Laos',
'Latvia',
'Lebanon',
'Lesotho',
'Liberia',
'Libya',
'Liechtenstein',
'Lithuania',
'Luxembourg',
'Madagascar',
'Malawi',
'Malaysia',
'Maldives',
'Mali',
'Malta',
'Marshall Islands',
'Mauritania',
'Mauritius',
'Mexico',
'Micronesia, Federated States of',
'Moldova',
'Monaco',
'Mongolia',
'Montenegro',
'Morocco',
'Mozambique',
'Myanmar (Burma)',
'Namibia',
'Nauru',
'Nepal',
'Netherlands',
'New Zealand',
'Nicaragua',
'Niger',
'Nigeria',
'North Macedonia',
'Norway',
'Oman',
'Pakistan',
'Palau',
'Panama',
'Papua New Guinea',
'Paraguay',
'Peru',
'Philippines',
'Poland',
'Portugal',
'Qatar',
'Romania',
'Russia',
'Rwanda',
'Saint Kitts and Nevis',
'Saint Lucia',
'Saint Vincent and the Grenadines',
'Samoa',
'San Marino',
'Sao Tome and Principe',
'Saudi Arabia',
'Senegal',
'Serbia',
'Seychelles',
'Sierra Leone',
'Singapore',
'Slovakia',
'Slovenia',
'Solomon Islands',
'Somalia',
'South Africa',
'Spain',
'Sri Lanka',
'Sudan',
'Sudan, South',
'Suriname',
'Sweden',
'Switzerland',
'Syria',
'Taiwan',
'Tajikistan',
'Tanzania',
'Thailand',
'Togo',
'Tonga',
'Trinidad and Tobago',
'Tunisia',
'Turkey',
'Turkmenistan',
'Tuvalu',
'Uganda',
'Ukraine',
'United Arab Emirates',
'United Kingdom',
'United States',
'Uruguay',
'Uzbekistan',
'Vanuatu',
'Vatican City',
'Venezuela',
'Vietnam',
'Yemen',
'Zambia',
'Zimbabwe'];



const industry = [
"Abrasives and Nonmetallic Minerals Manufacturing", 
"Accommodation",
"Accounting Domain",
"Administration of Justice",
"Administrative and Support Services",
"Advertising Services",
"Agricultural Chemical Manufacturing",
"Agriculture, Construction, Mining Machinery Manufacturing",
"Air, Water, and Waste Program ",
"Airlines and Aviation",
"Alternative Dispute Resolution",
"Alternative Medicine",
"Ambulance Services",
"Amusement Parks and Arcades",
"Animal Feed Manufacturing",
"Animation and Post-production",
"Apparel Manufacturing",
"Appliances, Electrical, and Electronics Manufacturing",
"Architectural and Structural Metal Manufacturing",
"Architecture and Planning",
"Armed Forces",
"Artificial Rubber and Synthetic Fiber Manufacturing",
"Artists and Writers",
"Audio and Video Equipment Manufacturing",
"Automation Machinery Manufacturing",
"Aviation and Aerospace Component Manufacturing",
"Baked Goods Manufacturing",
"Banking",
"Bars, Taverns, and Nightclubs",
"Bed-and-Breakfasts, Hostels, Homestays",
"Beverage Manufacturing",
"Biomass Electric Power Generation",
"Biotechnology Research",
"Blockchain Services",
"Blogs",
"Boilers, Tanks, and Shipping Container Manufacturing",
"Book and Periodical Publishing",
"Book Publishing",
"Breweries",
"Broadcast Media Production and Distribution",
"Building Construction",
"Building Equipment Contractors",
"Building Finishing Contractors",
"Building Structure and Exterior Contractors",
"Business Consulting and Services",
"Business Content",
"Business Intelligence Platforms",
"Cable and Satellite Programming",
"Capital Markets",
"Caterers",
"Chemical Manufacturing",
"Chemical Raw Materials Manufacturing",
"Child Day Care Services",
"Chiropractors",
"Circuses and Magic Shows",
"Civic and Social Organizations",
"Civil Engineering",
"Claims Adjusting, Actuarial Services",
"Clay and Refractory Products Manufacturing",
"Coal Mining",
"Collection Agencies",
"Commercial and Industrial Equipment Rental",
"Commercial and Industrial Machinery Maintenance",
"Commercial and Service Industry Machinery Manufacturing",
"Communications Equipment Manufacturing",
"Community Development and Urban Planning",
"Community Services",
"Computer and Network Security",
"Computer Games",
"Computer Hardware Manufacturing",
"Computer Networking Products",
"Computers and Electronics Manufacturing",
"Conservation Programs",
"Construction",
"Construction Hardware Manufacturing",
"Consumer Goods Rental",
"Consumer Services",
"Correctional Institutions",
"Cosmetology and Barber Schools",
"Courts of Law",
"Credit Intermediation",
"Cutlery and Handtool Manufacturing",
"Dairy Product Manufacturing",
"Dance Companies",
"Data Infrastructure and Analytics",
"Data Security Software Products",
"Defense and Space Manufacturing",
"Dentists",
"Design Services",
"Desktop Computing Software Products",
"Distilleries",
"Economic Programs",
"Education",
"Education Administration Programs",
"E-Learning Providers",
"Electric Lighting Equipment Manufacturing",
"Electric Power Generation",
"Electric Power Transmission, Control, and Distribution",
"Electrical Equipment Manufacturing",
"Electronic and Precision Equipment Maintenance",
"Embedded Software Products",
"Emergency and Relief Services",
"Engineering Services",
"Engines and Power Transmission Equipment Manufacturing",
"Entertainment Providers",
"Environmental Quality Programs",
"Environmental Services",
"Equipment Rental Services",
"Events Services",
"Executive Offices",
"Executive Search Services",
"Fabricated Metal Products",
"Facilities Services",
"Family Planning Centers",
"Farming",
"Farming, Ranching, Forestry",
"Fashion Accessories Manufacturing",
"Financial Services",
"Fine Arts Schools",
"Fire Protection",
"Fisheries",
"Flight Training",
"Food and Beverage Manufacturing",
"Food and Beverage Retail",
"Food and Beverage Services",
"Footwear and Leather Goods Repair",
"Footwear Manufacturing",
"Forestry and Logging",
"Fossil Fuel Electric Power Generation",
"Freight and Package Transportation",
"Fruit and Vegetable Preserves Manufacturing",
"Fundraising",
"Funds and Trusts",
"Furniture and Home Furnishings Manufacturing",
"Gambling Facilities and Casinos",
"Geothermal Electric Power Generation",
"Glass Product Manufacturing",
"Glass, Ceramics and Concrete Manufacturing",
"Golf Courses and Country Clubs",
"Government Administration",
"Government Relations Services",
"Graphic Design",
"Ground Passenger Transportation",
"Health and Human Services",
"Higher Education",
"Highway, Street, and Bridge Construction",
"Historical Sites",
"Holding Companies",
"Home Health Care Services",
"Horticulture",
"Hospitality",
"Hospitals",
"Hospitals and Health Care",
"Hotels and Motels",
"Household and Institutional Furniture Manufacturing",
"Household Appliance Manufacturing",
"Household Services",
"Housing and Community Development",
"Housing Programs",
"Human Resources Services",
"HVAC and Refrigeration Equipment Manufacturing",
"Hydroelectric Power Generation",
"Individual and Family Services",
"Industrial Machinery Manufacturing",
"Industry Associations",
"Information Services",
"Insurance",
"Insurance Agencies and Brokerages",
"Insurance and Employee Benefit Funds",
"Insurance Carriers",
"Interior Design",
"International Affairs",
"International Trade and Development",
"Internet Marketplace Platforms",
"Internet News",
"Internet Publishing",
"Interurban and Rural Bus Services",
"Investment Banking",
"Investment Advice",
"Investment Management",
"IT Services and IT Consulting",
"IT System Custom Software Development",
"IT System Data Services",
"IT System Design Services",
"IT System Installation and Disposal",
"IT System Operations and Maintenance",
"IT System Testing and Evaluation",
"IT System Training and Support",
"Janitorial Services",
"Landscaping Services",
"Language Schools",
"Laundry and Drycleaning Services",
"Law Enforcement",
"Law Practice",
"Leasing Non-residential Real Estate",
"Leasing Residential Real Estate",
"Leather Product Manufacturing",
"Legal Services",
"Legislative Offices",
"Libraries",
"Lime and Gypsum Products Manufacturing",
"Loan Brokers",
"Machinery Manufacturing",
"Magnetic and Optical Media Manufacturing",
"Manufacturing",
"Maritime Transportation",
"Market Research",
"Marketing Services",
"Mattress and Blinds Manufacturing",
"Measuring and Control Instrument Manufacturing",
"Meat Products Manufacturing",
"Media and Telecommunications",
"Media Production",
"Medical and Diagnostic Laboratories",
"Medical Equipment Manufacturing",
"Medical Practices",
"Mental Health Care",
"Metal Ore Mining",
"Metal Treatments",
"Metal Valve, Ball, and Roller Manufacturing",
"Metalworking Machinery Manufacturing",
"Military and International Affairs",
"Mining",
"Mobile Computing Software Products",
"Mobile Food Services",
"Mobile Gaming Apps",
"Motor Vehicle Manufacturing",
"Motor Vehicle Parts Manufacturing",
"Movies and Sound Recording",
"Movies, Videos, and Sound",
"Museums",
"Museums, Historical Sites, and Zoos",
"Musicians",
"Nanotechnology Research",
"Natural Gas Distribution",
"Natural Gas Extraction",
"Newspaper Publishing",
"Nonmetallic Mineral Mining",
"Non-profit Organizations",
"Nonresidential Building Construction",
"Nuclear Electric Power Generation",
"Nursing Homes and Residential Care Facilities",
"Office Administration",
"Office Furniture and Fixtures Manufacturing",
"Oil and Coal Product Manufacturing",
"Oil and Gas",
"Oil Extraction",
"Oil, Gas, and Mining",
"Online and Mail Order Retail",
"Online Audio and Video Media",
"Operations Consulting",
"Optometrists",
"Outpatient Care Centers",
"Outsourcing and Offshoring Consulting",
"Packaging and Containers Manufacturing",
"Paint, Coating, and Adhesive Manufacturing",
"Paper and Forest Product Manufacturing",
"Pension Funds",
"Performing Arts",
"Performing Arts and Spectator Sports",
"Periodical Publishing",
"Personal and Laundry Services",
"Personal Care Product Manufacturing",
"Personal Care Services",
"Pet Services",
"Pharmaceutical Manufacturing",
"Philanthropic Fundraising Services",
"Photography",
"Physical, Occupational and Speech Therapists",
"Physicians",
"Pipeline Transportation",
"Plastics and Rubber Product Manufacturing",
"Plastics Manufacturing",
"Political Organizations",
"Postal Services",
"Primary and Secondary Education",
"Primary Metal Manufacturing",
"Printing Services",
"Professional Organizations",
"Professional Services",
"Professional Training and Coaching",
"Public Assistance Programs",
"Public Health",
"Public Policy Offices",
"Public Relations and Communications Services",
"Public Safety",
"Racetracks",
"Radio and Television Broadcasting",
"Rail Transportation",
"Railroad Equipment Manufacturing",
"Ranching",
"Ranching and Fisheries",
"Real Estate",
"Real Estate Agents and Brokers",
"Real Estate and Equipment Rental Services",
"Recreational Facilities",
"Religious Institutions",
"Renewable Energy Equipment Manufacturing",
"Renewable Energy Power Generation",
"Renewable Energy Semiconductor Manufacturing",
"Repair and Maintenance",
"Research Services",
"Residential Building Construction",
"Restaurants",
"Retail",
"Retail Apparel and Fashion",
"Retail Appliances, Electrical, and Electronic Equipment",
"Retail Art Dealers",
"Retail Art Supplies",
"Retail Books and Printed News",
"Retail Building Materials and Garden Equipment",
"Retail Florists",
"Retail Furniture and Home Furnishings",

"Retail Groceries",
"Retail Health and Personal Care Products",
"Retail Luxury Goods and Jewelry",
"Retail Motor Vehicles",
"Retail Musical Instruments",
"Office Equipment",
"Retail Office Supplies and Gifts",
"Retail Recyclable Materials & Used Merchandise",
"Reupholstery and Furniture Repair",
"Rubber Products Manufacturing",
"Satellite Telecommunications",
"Savings Institutions",
"School and Employee Bus Services",
"Seafood Product Manufacturing",
"Secretarial Schools",
"Securities and Commodity Exchanges",
"Security and Investigations",
"Security Guards and Patrol Services",
"Security Systems Services",
"Semiconductor Manufacturing",
"Services for Renewable Energy",
"Services for the Elderly and Disabled",
"Sheet Music Publishing",
"Shipbuilding",
"Shuttles and Special Needs Transportation Services",
"Sightseeing Transportation",
"Skiing Facilities",
"Soap and Cleaning Product Manufacturing",
"Social Networking Platforms",
"Software Development",
"Solar Electric Power Generation",
"Sound Recording",
"Space Research and Technology",
"Specialty Trade Contractors",
"Spectator Sports",
"Sporting Goods Manufacturing",
"Sports and Recreation Instruction",
"Sports Teams and Clubs",
"Spring and Wire Product Manufacturing",
"Staffing and Recruiting",
"Steam and Air-Conditioning Supply",
"Strategic Management Services",
"Subdivision of Land",
"Sugar and Confectionery Product Manufacturing",
"Taxi and Limousine Services",
"Technical and Vocational Training",
"Technology, Information and Internet",
"Technology, Information and Media",
"Telecommunications",
"Telecommunications Carriers",
"Telephone Call Centers",
"Temporary Help Services",
"Textile Manufacturing",
"Theater Companies",
"Think Tanks",
"Tobacco Manufacturing",
"Translation and Localization",
"Transportation Equipment Manufacturing",
"Transportation Programs",
"Transportation, Logistics, Supply Chain and Storage",
"Travel Arrangements",
"Truck Transportation",
"Trusts and Estates",
"Turned Products and Fastener Manufacturing",
"Urban Transit Services",
"Utilities",
"Utilities Administration",
"Utility System Construction",
"Vehicle Repair and Maintenance",
"Venture Capital and Private Equity Principals",
"Veterinary Services",
"Vocational Rehabilitation Services",
"Warehousing and Storage",
"Waste Collection",
"Waste Treatment and Disposal",
"Water Supply and Irrigation Systems",
"Water, Waste, Steam, and Air Conditioning Services",
"Wellness and Fitness Services",
"Wholesale",
"Wholesale Alcoholic Beverages",
"Wholesale Apparel and Sewing Supplies",
"Wholesale Appliances, Electrical, and Electronics",
"Wholesale Building Materials",
"Wholesale Chemical and Allied Products",
"Wholesale Computer Equipment",
"Wholesale Drugs and Sundries",
"Wholesale Food and Beverage",
"Wholesale Footwear",
"Wholesale Furniture and Home Furnishings",
"Wholesale Hardware, Plumbing, Heating Equipment",
"Wholesale Import and Export",
"Wholesale Luxury Goods and Jewelry",
"Wholesale Machinery",
"Wholesale Metals and Minerals",
"Wholesale Motor Vehicles and Parts",
"Wholesale Paper Products",
"Wholesale Petroleum and Petroleum Products",
"Wholesale Photography Equipment and Supplies",
"Wholesale Raw Farm Products",
"Wholesale Recyclable Materials",
"Wind Electric Power Generation",
"Wineries",
"Wireless Services",
"Women's Handbag Manufacturing",
"Wood Product Manufacturing",
"Writing and Editing",
"Zoos and Botanical Gardens",
"Other",

]


const duration = [,{id:1,name:'Daily'},{id:1,name:'Weekly'},{id:1,name:'Bi-Weekly'},{id:5,name:'Monthly'},{id:15,name:'Bi-Monthly'},{id:2,name:'Yearly'}]
const day =[
        {id:1,
         name:'Monday'},
        {id:2,
          name:'Tuesday'
        },
        {id:3,
          name:'Wednesday'
        },
        {id:4,
          name:'Thrusday'
        },
        {id:5,
          name:'Friday'
        },
        {id:6,
          name:'Saturday'
        },
        {id:7,
          name:'Sunday'
        },
]

const campaignStatus = [
    {
    id:2,
    status:'Open',
    color:'black'
  }, {
    id:4,
    status:'Live',
    color:'#fcad03'

  }, {
    id:3,
    status:'Completed',
    color:'green'
  },{
    id:1,
    status:'Canceled',
    color:'red'
  },
 

  ]