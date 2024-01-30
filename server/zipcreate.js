const fs = require('fs');
const archiver = require('archiver');
const campaign_model = require('../server/model/campaign/campaign')
const Papa  = require('papaparse')
const path  = require('path')
const json2xls = require('json2xls');
const { v4: uuidv4 } = require('uuid');

// Example JSON





exports.createZipStructure=async(req,res)=>{
let zipName = uuidv4()

let xlsx_fileName = uuidv4();
let single_campaign_data = [];


//cost_per_lead:-1,campaign_budget:-1,client_name:-1,client_id:-1,campaign_manager:-1,end_client:-1
campaign_model.campaign_model.find({"campaign_id":req.body.campaign_id},{
  total_upoaded_Leads:1,
campaign_name:1,
campaign_type:1,
lead_target:1,
start_date:1,
end_date:1,
spacing:1,
is_spacing_required:1,
//////////////// campaign  specigication
job_title:1,
job_function:1,
job_level:1,
compaign_specification_geography:1,
employee_size:1,
revenue_size:1,
industry_list:1,
////////////////// attachment
account_or_domain_list:1,
contact_per_company:1,
note:1,
supression_or_excusion:1,
/// docs
any_other_attachment:1,
supression_or_excusion_docs:1,
assets_link_docs:1,
account_or_domain_list_docs:1,
/////////// question
questionList:1
}).then((pp)=>{
  single_campaign_data = pp
}).then(()=>{


   const xls = json2xls(single_campaign_data);
   fs.writeFileSync( __dirname + `/zipFileFolder/${xlsx_fileName}.xlsx`, xls,'binary');


    const output = fs.createWriteStream(__dirname +`/zipFileFolder/${zipName}.zip`);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    
    output.on('close', function() {   //// called when file closed
        console.log(archive.pointer() + ' total bytes');
        res.send({filePath:`${zipName}.zip`,status:"succesfull"})
        console.log('archiver has been finalized and the output file descriptor has closed.');
      });
    
      archive.on('error', function(err) {   /// error handling
        throw err;
      });
    
    
      archive.pipe(output);
    

/// path for xlsx file   `./zipfolder/${xlsx_fileName}.xlsx`   file path
///  fs.createReadStream(`./zipMaker/zipfolder/${xlsx_fileName}.xlsx`)


      const file1 = __dirname + `/zipFileFolder/${xlsx_fileName}.xlsx`;
      archive.append(fs.createReadStream(file1), { name:`${xlsx_fileName}.xlsx` });     //// xlxl file name
      
///// all file docs append here

if(single_campaign_data.length > 0 && single_campaign_data[0].any_other_attachment!==""){
  const file2 = __dirname + `/uploads/${single_campaign_data[0].any_other_attachment}`;
    archive.append(fs.createReadStream(file2), { name:`${single_campaign_data[0].any_other_attachment}` });
}


if(single_campaign_data.length > 0 && single_campaign_data[0].supression_or_excusion_docs!==""){
  const file3 = __dirname + `/uploads/${single_campaign_data[0].supression_or_excusion_docs}`;
    archive.append(fs.createReadStream(file3), { name:`${single_campaign_data[0].supression_or_excusion_docs}` });
}

if(single_campaign_data.length > 0 && single_campaign_data[0].assets_link_docs!==""){
  const file4 = __dirname + `/uploads/${single_campaign_data[0].assets_link_docs}`;
    archive.append(fs.createReadStream(file4), { name: `${single_campaign_data[0].assets_link_docs}` });
}

if(single_campaign_data.length > 0 && single_campaign_data[0].account_or_domain_list_docs!==""){
  const file5 = __dirname + `/uploads/${single_campaign_data[0].account_or_domain_list_docs}`;
    archive.append(fs.createReadStream(file5), { name: `${single_campaign_data[0].account_or_domain_list_docs}` });
}

archive.finalize(); 





})

}

