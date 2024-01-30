import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './Dashboard';
import { Box ,Modal,Paper,Typography} from '@mui/material';
import Login from '../src/security/Login'
import Register from '../src/security/Register'
import Client, { Clientc } from './Client/Client';
import Compaign, { Compaignc } from './Compaign/compaignmanagement/Compaign';
import Singleclientview, { Singleclientviewc } from './Client/Singleclient/Singleclientview';
import Client_Profile, { Contact_Profile } from './Client/Contact_Profile';
import CompaignAnalytics from './Compaign/compaignmanagement/CompaignAnalytics';
import CompaignRequest, { CompaignRequestc } from './Compaign/compaignrequest/CompaignRequest';
import LeadList, { LeadListc } from './Lead/LeadList';
import AddCompaign, { AddCompaignc } from './Compaign/compaignmanagement/AddCompaign';
import ConpaignDescription from './Compaign/compaignrequest/ConpaignDescription';
import Addclient, { Addclientc } from './Client/Addclient';
import Rfp, { Rfpc } from './Rfp/Rfp';
import ViewRfp, { ViewRfpc } from './Rfp/ViewRfp';
import User from './User/User';
import DashboardClient from './ClientDashboardAndFiles/DashboardClient';
import ClientdashboardCompaign, { ClientdashboardCompaignc } from './ClientDashboardAndFiles/Allfiles/compaign/ClientdashboardCompaign';
import { ClientdashboardRFPc } from './ClientDashboardAndFiles/Allfiles/rfp/ClientdashboardRFP';
import { ClientdashboardInvoicec } from './ClientDashboardAndFiles/Allfiles/invoice/ClientdashboardInvoice';
import ClientdashboardTicket from './ClientDashboardAndFiles/Allfiles/ticket/ClientdashboardTicket';
import { ClientdashboardReportc } from './ClientDashboardAndFiles/Allfiles/report/ClientdashboardReport';
import ClientdashboardviewsingleReport from './ClientDashboardAndFiles/Allfiles/report/ClientdashboardviewsingleReport';
import Roles, { Rolesc } from './User/Roles';
import CreateRoles, { CreateRolesc } from './User/CreateRoles';
import Invoice, { Invoicec } from './Invoice/Invoice';
import InvoiceDetails, { InvoiceDetailsc } from './Invoice/InvoiceDetails';
import AddcompainForm, { AddcompainFormc } from './ClientDashboardAndFiles/Allfiles/compaign/AddcompainForm';
import CloseIcon from '@mui/icons-material/Close';
import { ViewLeadsc } from './Lead/ViewLeads';
import ManageLeads, { ManageLeadsc } from './Lead/ManageLeads';
import BunnchLeadList, { BunnchLeadListc } from './Lead/management/BunnchLeadList';
import LeadListForSingleCampaign, { LeadListForSingleCampaignc } from './Lead/management/LeadListForSingleCampaign';
import Error from '../src/security/Error'


import { Component } from 'react'

import CampaignListWithLeads, { CampaignListWithLeadsc } from './ClientDashboardAndFiles/Allfiles/lead/CampaignListWithLeads';
import BunchUploadedHistory, { BunchUploadedHistoryc } from './ClientDashboardAndFiles/Allfiles/lead/folder/BunchUploadedHistory';
import SingleCampaignLeadList, { SingleCampaignLeadListc } from './ClientDashboardAndFiles/Allfiles/lead/folder/SingleCampaignLeadList';
import SingleBunchLeadList, { SingleBunchLeadListc } from './ClientDashboardAndFiles/Allfiles/lead/folder/SingleBunchLeadList';
import AllFilesController from './ClientDashboardAndFiles/Allfiles/alloverview/AllFilesController';
import { ClientdashboardDepartmentAddc } from './ClientDashboardAndFiles/Allfiles/department/ClientdashboardDepartmentAdd';
import ClientDashboardContactAdd, { ClientDashboardContactAddc } from './ClientDashboardAndFiles/Allfiles/department/ClientDashboardContactAdd';
import ClientContactProfile from './ClientDashboardAndFiles/Allfiles/department/ClientContactProfile';


export class App extends Component {

constructor(props) {
  super(props)
  this.state = {
    client_role : JSON.parse(window.sessionStorage.getItem('client_role')) ,  //// for client model roles
    campaign_role : JSON.parse(window.sessionStorage.getItem('campaign_role')),
    user_and_roles : JSON.parse(window.sessionStorage.getItem('user_and_roles')),
    lead_role : JSON.parse(window.sessionStorage.getItem('lead_role')),
    rfp_role : JSON.parse(window.sessionStorage.getItem('rfp_role')),
    invoice_role : JSON.parse(window.sessionStorage.getItem('invoice_role')),
    report_role :  JSON.parse(window.sessionStorage.getItem('report_role')),
  }
}


componentDidMount(){
 
}

  render() {
    return (
      <Box sx={{backgroundColor:'#f8f9ff'}}>
    <React.StrictMode>
    <RouterProvider router={createBrowserRouter([
  
  {
    path: "/",
    element:<Login/>,
  },
  {
    path: "/register",
    element:<Register/>,
  },

  {
    path: "/dashboard",
    element:<Dashboard/>,
  },
  //////////////////////  client
  {
    path: "/client",
    element: this.state.client_role? this.state.client_role.is_view?<Clientc/>:<Error/>:<Error/>,
  }, 



   {
    path: "/client/:singleclient",     ///////////   client id done 
    element:this.state.client_role?this.state.client_role.is_view?<Singleclientviewc/>:<Error/>:<Error/>,
  },


  {
    path: "/client/add",
    element:this.state.client_role?this.state.client_role.is_view?<Addclientc/>:<Error/>:<Error/>,
  },
  {
    path: "/client/singleContact/profile",
    element:this.state.client_role?this.state.client_role.is_view?<Contact_Profile/>:<Error/>:<Error/>,
  },

//////////////////// compaign

  {
    path: "/compaign",
    element:this.state.campaign_role?this.state.campaign_role.is_view?<Compaignc/>:<Error/>:<Error/>,
  },
  {
    path: "/compaign/analytics",
    element:this.state.campaign_role?this.state.campaign_role.is_view?<CompaignAnalytics/>:<Error/>:<Error/>,
  },
  {
    path: "/compaign/request",
    element:this.state.campaign_role?this.state.campaign_role.is_view?<CompaignRequestc/>:<Error/>:<Error/>,
  },
  {
    path: "/compaign/request/description",
    element:this.state.campaign_role?this.state.campaign_role.is_view?<ConpaignDescription/>:<Error/>:<Error/>,
  },
  {
    path: "/compaign/add",
    element:this.state.campaign_role?this.state.campaign_role.is_view?<AddCompaignc/>:<Error/>:<Error/>,
  },
  
//////////// leads
{
  path: "/Lead",
  element:this.state.lead_role?this.state.lead_role.is_view?<LeadListc/>:<Error/>:<Error/>,
},
{
  path:"/manageLeads",
  element:this.state.lead_role?this.state.lead_role.is_view?<ManageLeadsc/>:<Error/>:<Error/>,
},
{
  path:"/Lead/:bunchId",
  element:this.state.lead_role?this.state.lead_role.is_view?<ViewLeadsc/>:<Error/>:<Error/>,       /////  this is for all lead group of all cmpaing
},

{
  path:"/manageLeads/:bunchLeadListId",
  element:this.state.lead_role?this.state.lead_role.is_view?<BunnchLeadListc/>:<Error/>:<Error/>,
},
{
  path:"/manageLeads/campaign/:campaignId",
  element:this.state.lead_role?this.state.lead_role.is_view?<LeadListForSingleCampaignc/>:<Error/>:<Error/>,
},




///// RFP
{
  path: "/Rfp",
  element:this.state.rfp_role?this.state.rfp_role.is_view?<Rfpc/>:<Error/>:<Error/>,
},
{
  path: "/Rfp/:rfpid",
  element:this.state.rfp_role?this.state.rfp_role.is_view?<ViewRfpc/>:<Error/>:<Error/>,
},


//////////// user and roles model
{
  path: "/userManagement",
  element:this.state.user_and_roles?this.state.user_and_roles.is_view?<User/>:<Error/>:<Error/>,
},
{
  path: "/roles",
  element:this.state.user_and_roles?this.state.user_and_roles.is_view?<Rolesc/>:<Error/>:<Error/>,
},
{
  path: "/roles/createRoles",
  element:this.state.user_and_roles?this.state.user_and_roles.is_view?<CreateRolesc/>:<Error/>:<Error/>,
},

//////////////////////// invoices 

{
  path: "/invoice",
  element:this.state.invoice_role?this.state.invoice_role.is_view?<Invoicec/>:<Error/>:<Error/>,
},
{
  path: "/invoice/:invoiceid",
  element:this.state.invoice_role?this.state.invoice_role.is_view?<InvoiceDetailsc/>:<Error/>:<Error/>,
},









/////////////////////////////////////////////////////////////////////////////   //////////////////////////////////////////////////  //////////////////  /////////////////////////
//////////////////////////////////////////////////////////  client dashboard routes

{
  path: "/clientDashboard",
  element:<DashboardClient/>,
},
///////////////////////////////////// client compain section
{
  path: "/clientCampaign",
  element:<ClientdashboardCompaignc/>,
},
{
  path: "/clientCampaign/add",
  element:<AddcompainFormc/>,
},


//////////////////////////////////////// clienrt lead section

{
  path: "/campaignListwithleads",
  element:<CampaignListWithLeadsc/>,
},

{
  path: "/campaignListwithleads/:campaignId",
  element:<BunchUploadedHistoryc/>,
},

{
  path: "/campaignListwithleads/campaign/:campaignId",
  element:<SingleCampaignLeadListc/>,
},

{
  path: "/campaignListwithleads/leadList/:bunchId",
  element:<SingleBunchLeadListc/>,
},




//////////////// overviewfiles ///////////
{
  path: "/overviewControllers",
  element:<AllFilesController/>,
},



//////////// client lead section

{
  path: "/clientRFP",
  element:<ClientdashboardRFPc/>,
},

{
  path: "/clientInvoice",
  element:<ClientdashboardInvoicec/>,
},

{
  path: "/clientTicket",
  element:<ClientdashboardTicket/>,
},

/////// department ///////



{
  path: "/clientDepartmentAdd",
  element:<ClientdashboardDepartmentAddc/>,
},
{
  path: "/clientConatctAdd",
  element:<ClientDashboardContactAddc/>,
},
{
  path: "/clientConatctAdd/profile",
  element:<ClientContactProfile/>,
},
         /////////////////////////






{
  path: "/clientReport",
  element:<ClientdashboardReportc/>,
},
{
  path: "/clientReport/singleReportView",
  element:<ClientdashboardviewsingleReport/>,
},




])} />





<Box> 
<Modal
  open={false}
 // onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'60%'},height:'50vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={this.mm} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>


<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4}}}>



</Box>
</Box>
</Paper>
</Box>
</Modal>
</Box>



  </React.StrictMode>
  </Box>
    )
  }
}

export default App

















/*
function App() {

 const [showPopup,SetshowPopup] = useState(false);




setInterval(()=>{
    if(window.navigator.onLine){
      console.log("online")
    }else{
      console.log("ofline")
    }
},5000)

 


  return (
    <Box sx={{backgroundColor:'#f8f9ff'}}>
    <React.StrictMode>
    <RouterProvider router={createBrowserRouter([
  
  {
    path: "/",
    element:<Login/>,
  },
  {
    path: "/register",
    element:<Register/>,
  },

  {
    path: "/dashboard",
    element:<Dashboard/>,
  },
  //////////////////////  client
  {
    path: "/client",
    element:<Clientc/>,
  }, 



   {
    path: "/client/:singleclient",     ///////////   client id done 
    element:<Singleclientviewc/>,
  },


  {
    path: "/client/add",
    element:<Addclient/>,
  },
  {
    path: "/client/singleclient/profile",
    element:<Client_Profile/>,
  },

//////////////////// compaign
  {
    path: "/compaign",
    element:<Compaignc/>,
  },
  {
    path: "/compaign/analytics",
    element:<CompaignAnalytics/>,
  },
  {
    path: "/compaign/request",
    element:<CompaignRequestc/>,
  },
  {
    path: "/compaign/request/description",
    element:<ConpaignDescription/>,
  },
  {
    path: "/compaign/add",
    element:<AddCompaignc/>,
  },
  
//////////// leads
{
  path: "/Lead",
  element:<LeadListc/>,
},
{
  path:"/manageLeads",
  element:<ManageLeadsc/>,
},
{
  path:"/Lead/:bunchId",
  element:<ViewLeadsc/>,       /////  this is for all lead group of all cmpaing
},

{
  path:"/manageLeads/:bunchLeadListId",
  element:<BunnchLeadListc/>,
},
{
  path:"/manageLeads/campaign/:campaignId",
  element:<LeadListForSingleCampaignc/>,
},




///// RFP
{
  path: "/Rfp",
  element:<Rfpc/>,
},
{
  path: "/Rfp/viewrfp",
  element:<ViewRfpc/>,
},


//////////// user and roles model
{
  path: "/userManagement",
  element:<User/>,
},
{
  path: "/roles",
  element:<Rolesc/>,
},
{
  path: "/roles/createRoles",
  element:<CreateRoles/>,
},

//////////////////////// invoices 

{
  path: "/invoice",
  element:<Invoicec/>,
},
{
  path: "/invoice/:invoiceid",
  element:<InvoiceDetailsc/>,
},



///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////  client dashboard routes

{
  path: "/clientDashboard",
  element:<DashboardClient/>,
},
///////////////////////////////////// client compain section
{
  path: "/clientCampaign",
  element:<ClientdashboardCompaignc/>,
},
{
  path: "/clientCampaign/add",
  element:<AddcompainForm/>,
},


////////////////////////////////////////

{
  path: "/clientLeads",
  element:<ClientdashboardLeads/>,
},
{
  path: "/clientRFP",
  element:<ClientdashboardRFPc/>,
},

{
  path: "/clientInvoice",
  element:<ClientdashboardInvoicec/>,
},

{
  path: "/clientTicket",
  element:<ClientdashboardTicket/>,
},

{
  path: "/clientDepartment",
  element:<ClientdashboardDepartmentc/>,
},

{
  path: "/clientReport",
  element:<ClientdashboardReportc/>,
},
{
  path: "/clientReport/singleReportView",
  element:<ClientdashboardviewsingleReport/>,
},










])} />











<Box> 
<Modal
  open={showPopup}
 // onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
<Paper sx={{width:{xs:'90%',sm:'90%',md:'60%',lg:'60%'},height:'50vh',backgroundColor:'white',borderRadius:2}}>

<Box sx={{width:'100%',display:'flex',justifyContent:'right'}}>
<Paper onClick={()=>SetshowPopup(false)} elevation={5} sx={{height:30,width:30,borderRadius:1,backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center',mr:-1,mt:-1}}>
<CloseIcon sx={{height:20,width:20,color:'#2486bb'}}/>
</Paper>
</Box>


<Box sx={{overflowY:'scroll','&::-webkit-scrollbar': {width:'5px',borderRadius:10 }}}>
<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4}}}>



</Box>
</Box>
</Paper>
</Box>
</Modal>
</Box>



  </React.StrictMode>
  </Box>
  );
}

export default App;
*/