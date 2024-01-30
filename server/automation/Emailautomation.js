const SibApiV3Sdk = require('@getbrevo/brevo');
const api = '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'




exports.sendEmailToNewlyAddedClient=(data)=>{
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let apiKey = apiInstance.authentications['apiKey'];
  apiKey.apiKey = api;
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
  sendSmtpEmail.subject = `${data.client_name}`;
  sendSmtpEmail.htmlContent = 
  `<html>
  <body>
  <h4 >Dear ${data.client_name}</h4>
  <p>Welcome to First Connect Digital ! We're thrilled to have you on board, and we hope you have a fantastic experience with our platform.</p>
  <p>Your account has been successfully created, and you can now access all the features and benefits that come with being a part of our community. Here are a few key details to help you get started:</p>
  
  <h4 style="color: brown;">
  User Name: ${data.client_email}
  <br/>
  Password: ${data.client_password}
  </h4>
  <p>
  If you have any questions or need assistance, our support team is here to help.
  </p>
  
  <p>
  Thank you for choosing First Connect Digital. We look forward to serving you and making your experience with us exceptional.
  </p>
  
  <p>
  Best regards,
  </p>
  
  <p>
  Support Team,
  </p>
  </body>
  </html>`;
  sendSmtpEmail.sender = {"name":"First Connect Digital ","email":"developersfcd@gmail.com"};
  sendSmtpEmail.to = [{"email":`${data.p_email}`,"name":`${data.client_name}`}];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
   // console.log('API called successfully. Returned data: ');
  
  }, function(error) {
    console.error(error);
  });

}
