const express  = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const jwt = require("jsonwebtoken")
const  mongoose  = require("mongoose")
const multer  = require('multer')
const url = require('./connection/connect')
const addRoles = require('./servedFiles/userAndRoles/roles')    //// for role section
const user  = require('./servedFiles/userAndRoles/user');
const client = require('./servedFiles/client/client')
const contact  = require('../server/servedFiles/client/contact')
const note = require('./servedFiles/Notes/notes')
const campaign  = require('./servedFiles/campaign/campaigns')
const leads  = require('./servedFiles/lead/leads')
const invoice  = require('./servedFiles/invoice/invoice')
const payment = require('./servedFiles/payments/payment');
const  login  = require("./servedFiles/login");
const rfp = require("./servedFiles/rfp/rfpFile")
const emailAutomation  = require('./automation/Emailautomation')
require('dotenv').config()
const { Server} = require("socket.io");
require('dotenv').config() 
const puppeteer = require('puppeteer'); 
const hbs = require('handlebars')
const fs = require('fs-extra')
app.use(express.static('./uploads'))
app.use(express.static('./zipFileFolder'))
app.use(express.static('./report'))   
app.use(express.static('./assets'))
const { v4: uuidv4 } = require('uuid'); 
const createZip = require('../server/zipcreate')
const new_department = require('../server/servedFiles/client/new_department')



////// import all model here ////

const client_model = require('./model/client/client')
const campaign_model = require('./model/campaign/campaign')




///////////////////////////////////////////////////////



////////// function calling for connection

 try {

   mongoose.connect(url.url).then((e)=>{
        console.log("connected to mongo db")
    })   /// url passed for 
} catch (error) {
    console.log(error)
} 




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
  });


  const upload = multer({ storage: storage });
  const cpUpload = upload.fields([{ name: 'files', maxCount: 100 },{ name: 'any_other_attachment', maxCount: 100 },{ name: 'supression_or_excusion_docs', maxCount: 100 },{ name:'assets_link_docs', maxCount: 100 },{ name: 'account_or_domain_list_docs', maxCount: 100 }])



app.get('/',(req,res)=>{
    res.send("listening")   ///// just for testing and solenoid
})



//////// roles and user section 
app.post('/addRoles',addRoles.addRoles)
app.put('/editRoles',addRoles.editRoles)
 app.delete('/deleteRoles',addRoles.deleteRoles)


app.post('/addUsers',user.addUser)
app.post('/retrive',user.retriveUser)    /// retrive all user in from db
app.post('/retriveRoles',addRoles.retriveRoles)
app.delete('/deleteUser',user.deleteUser)
app.put('/editUser',user.editUser)

//////////////////// //////////////////////////////////////////



/////////// client model////////////////////////////////////
app.post('/addClient',cpUpload,client.addClient)
app.delete('/clientDelete',client.deletClient)
app.put('/updateClientInfo',cpUpload,client.editClient)
app.delete('/deleteDocuments',client.deleteClientDocAttachment)
app.put('/addMoreDocument',cpUpload,client.addDocumentToClient)
app.delete('/deleteAllClient',client.deleteAllClients)
app.post('/retriveAllClients',client.retriveAllClients)
app.post('/retriveAllClientForExport',client.retriveAllClientsForExports)

app.post('/retriveClient',client.retriveClient)
app.post('/retriveclintforcompaign',client.retriveClientForCampaignModel)

app.post('/getSingleClientData',client.singleClientData)
app.post('/AllClientINnumberandcampaign',client.requiredNumberForOverViewPage)
 



/*
app.post('/addDepartment',department.addDepartment)  
app.post('/retriveDepartment',department.retriveDepartment)

app.put('/editDepartment',department.editDepartment)
app.put('/editDepartmentfromprofilepage',department.editDepartmentFromdepartmentdescription)
app.delete('/deleteDepartment',department.deleteDepartment)
app.post('/retriveDepartmentForCamapaignPage',department.retriveDepartmentForcampaignPage)

*/


////////// everty things belong to contact  /////////////

app.post('/addContact',contact.addContact)
app.post('/retriveContactAll',contact.retriveAllContacts)
app.put('/editContact',contact.editContacts)
app.delete('/deleteContact',contact.deleteContacts)
app.post('/retriveAllContactByDepartmentId',contact.retriveAllContactByDepartmentId)
app.put('/changeContactStatus',contact.changeContactStatus)
app.put('/editContactFromContactDescriptionPage',contact.editContactsFromContactDesPage)








             //// new addd dept

app.post('/add_department_new',new_department.add_new_department)
app.put('/update_department_new',new_department.editDepartment)
app.delete('/delete_department_new',new_department.deleteDepartment)
app.post('/retrive_all_dept_new',new_department.retriveAllDepartment)
app.post('/retrive_all_department_for_admin_client_page',new_department.retriveAllDepartmentForAdminClientContactPage)




// note in client section
app.post('/addNotes',note.addNotes)
app.post('/retriveNote',note.retriveNote)
app.put('/editNotes',note.editNote)
app.delete('/deleteNotes',note.deleteNote)
app.post('/retriveClientForLeadPage',client.retriveClientForLeadPage)


////////////////////////////////////////////////////////////////
//////////// campaign model /////////////////////////////////////////////////


app.post('/addCampaign',cpUpload,campaign.addCampaign)   // this is used in both side of admin and client
app.put('/editCampaign',cpUpload,campaign.editComapaign)     
app.post('/retriveCompaign',campaign.retriveComapaign)   //// this route used in admin side campaign
app.delete('/deleteCamapign',campaign.deleteComapign)     //// for universally delete compaign
app.post('/retriveCampaignForCrmAdminClientPage',campaign.retriveCampaignForCrmAdminClientPage)    ////// this route used in crm admin single client campaign













app.post('/retriveCampaignLeadList',campaign.retriveCampaignLeadList)
app.post('/retriveCampaignForLeadPage',campaign.retriveComapaignForLeadPage)
app.post('/retriveCampaignForManageLeadPage',campaign.retriveComapaignForManageLeadPage)
app.post('/retriveCamapaignForClientPage',campaign.retriveCampaignForclientPage)
app.post('/singleClientTotalCampaignCount',campaign.singleClientTotalCampaign)

app.post('/retriveAllCampaignofHoldStatusforcampaignRequetPage',campaign.allCampaignForHoldStatus_for_campaignRequestPage)







app.put('/updateCamapaignStatus',campaign.updateCampaignStatus)
app.post('/retriveAllCampaignForSingleClientUser',campaign.retriveCampaignForSignleClientUser)
app.post('/retriveAllCampaignForClientLeadPge',campaign.retriveAllCampaignForClientLeadsPage)
//////////////////////////////  lead section /////////////////////////////////////////////////

app.post('/addLeads',leads.leadAdd)
app.post('/retriveLeads',leads.retriveLeads)
app.post('/RetriveBunchLeadList',leads.retriveBunchLeadList)
app.post('/retriveLeadForSingleCamapaign',leads.retriveLeadsForSingleCampaign)
app.post('/retriveAllLeadsofSignleCampaign',leads.retriveAllLeadsFotCampaign)
 
app.delete('/deleteSingleLead',leads.deleteSingleLead)   /// delete single leads
app.delete('/deleteLeadBunch',leads.deleteLeadBunch)      //// delete bunch of leads 


////////////////////// invoice section /////////////////////////////////////////////
app.post('/addInvoice',invoice.addInvoice)
app.post('/retriveInvoice',invoice.retriveInvoice)
app.post('/retriveSingleInvoiceData',invoice.retriveSingleInvoiceData)
app.delete('/deleteInvoice',invoice.deleteInvoice)
app.post('/addItem',invoice.addItem)
app.delete('/deleteItem',invoice.deleteItem)
app.post('/retriveAllInvoiceForSingleClient',invoice.retriveAllInvoiceForSingleClient)
app.put('/editInvoice',invoice.editInvoice)
app.post('/singleClientTatalInvoice',invoice.singleClientTotalInvoice)

app.put('/updateInvoiceStatus',invoice.updateInvoiceStatus)
app.post('/allInvoiceForSingleClientForClientSide',invoice.allInvoiceForSingleClientForclientSide)
///////////////////////// payment section  //////////////////
app.post('/addPayments',payment.addPayment)
app.post('/retrivePayments',payment.retrivePayments)
app.delete('/deletePayments',payment.deletePayment)
app.put('/editPayment',payment.editPayment)
app.post('/retriveAllPaymentForSingleClient',payment.retrivePaymentForSingleClient)

//////////////////// rfp ////////////////// 
app.post('/addRfp',rfp.addRfp)
app.post('/retriveRfp',rfp.retriveRfp)
app.delete('/deleteRfp',rfp.deleteRfp)
app.put('/editRfp',rfp.updateRfp)

app.post('/retriveAllRfpForCrmAdmin',rfp.retriveAllRfpForCrmAdmin)

app.post('/retriveAllRfprForCrmSingleClient',rfp.retriveAllRfpForCrmSingleClient)

////////// handling login section //////////////////
app.post('/login',login.login)





////////////////////// for billing ////////////////////////

const compile = async function(templatename,data){
  const filePath =path.join(process.cwd(),'htmlfile',`${templatename}.hbs`)

  const html = await fs.readFile(filePath,'utf8')
  return hbs.compile(html)(data)
};

   
      

app.post("/createInvoice",async(req,res)=>{
const number = uuidv4();
let  activityArray = null;
(async () => {
      try {
       const browser = await puppeteer.launch(
        {
       //  executablePath: '/usr/bin/chromium-browser',
        // headless: 'new',
       //  args: ['--no-sandbox']
       // headless: false ,
       // slowMo: 500,
        //(default) enables old Headless;
          // `headless: 'new'`   //enables new Headless; 
          // `headless: false`  //enables “headful” mode.
        }  
       );
        const page = await browser.newPage();
        const content = await compile('Bill',{
          itemList:req.body.itemList
        })
        await page.setContent(content)
        await page.pdf({
          path:`report/${number}.pdf`,
          format: 'A4',
          printBackground:true
        });
      res.send({"path":number})
        await browser.close(); 
        
      } catch (error) {
        console.log(error)
      }  
    })();
  })
       




///////////////// create zip structure //////
app.post('/createZip',createZip.createZipStructure)



const server = app.listen(5000,()=>{     /// indentity as a server for socket
    console.log("listenng at 5000")
})



