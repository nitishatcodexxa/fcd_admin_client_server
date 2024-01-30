
const mongoose  = require('mongoose')
const Schema  = mongoose.Schema;

const campaign_schema = new Schema({
total_upoaded_Leads:Number,
campaign_id:String,
campaign_registered_date:Date,
campaign_name:String,
client_name:String,    
client_id:String,
campaign_type:String,
end_client:String,
campaign_manager:String,
campaign_manager_id:String,

department_name:String,
department_id:String,

lead_target:String,
cost_per_lead:String,
cpl_currency:String,
campaign_budget:String,
start_date:String,
end_date:String,
geography:String,

spacing:[
    {
id:String,
required_lead:String,
duration:String,
day:String,
general_info_geography:Array, 
    }
],
  
is_spacing_required:Boolean,

//////////////// campaign  specigication
job_title:Array,
job_function:Array,
job_level:Array,
compaign_specification_geography:Array,
employee_size:Array,
revenue_size:Array,
industry_list:Array,

////////////////// attachment
account_or_domain_list:String,
contact_per_company:String,
note:String,
supression_or_excusion:String,

       /// docs

any_other_attachment:String,
supression_or_excusion_docs:String,
assets_link_docs:String,
account_or_domain_list_docs:String,

/////////// question
questionList:[{
option:Array,
id:Number,
question_name:String,
question_type:String
}],

status:String,
////////////////// lead data

})


exports.campaign_model = new mongoose.model('campaign',campaign_schema);


