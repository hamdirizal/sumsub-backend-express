require('dotenv').config()
const process = require('process')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const fs = require('fs')
var bodyParser = require('body-parser')
const { 
  getDocument, 
  transformDataForExternalServices, 
  getApplicantDataByExternalId, 
  createAccessToken, 
  getApplicantReviewStatus, 
  getApplicantSubmissionData, 
  getOneApplicantData,
  testChangingTopLevelData,
  testResettingQuestionnaire
} = require('./sumsub-functions')
const { all__account__deposits__products } = require('./all__account__deposits__products')
const { all__account__transactions } = require('./all__account__transactions')
const { all__user__settings } = require('./all__user__settings')
const { all__account } = require('./all__account')
const { all__account__funds } = require('./all__account__funds')
const { all__account__withdraw__balance } = require('./all__account__withdraw__balance')
const { all__account__withdraw } = require('./all__account__withdraw')
const app = express()
const port = process.env.PORT || 3001
const DOWNLOAD_FOLDER_NAME = "_downloads"
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use('/'+DOWNLOAD_FOLDER_NAME, express.static(DOWNLOAD_FOLDER_NAME))
app.use(cors())
app.get('/', (req, res) => { res.send('SumSub Backend! 105')} );


//Routes tobe used on production
app.post('/business-verification/sumsub-token', routeSumsubCreateAccessToken);
app.post('/sumsub-webhook-applicant-reviewed', routeSumsubWebhookApplicantReviewed);
// app.all('/business-verification/sumsub-token', (req,res)=>{
//   let obj = {"token":"_act-sbx-91a27a22-8bc1-43ec-b5fc-9ef8e83aeda6","userId":"23"}
//   return res.json(obj);
// });



async function routeSumsubWebhookApplicantReviewed(req, res){
  

  //If applicant id is not found, return 500 error code.
  if(!req || !req.body || !req.body.applicantId){
    return res.status(500).send({ error: 'The payload does not have applicantId' })
  }

  //If the review status is GREEN, do next step.
  if(req?.body?.reviewResult?.reviewAnswer === "GREEN" ){
    let dataObj = {...req.body}

    //Fetch applicant review status
    try{
      const res2 = await axios.request(getApplicantReviewStatus(req.body.applicantId));
      dataObj.applicantReviewStatus = res2.data;
    }
    catch(error2){
      return res.status(500).send({ error: error2 })  
    }

    //Fetch applicant submission data and insert to the data object
    try{
      const res3 = await axios.request(getApplicantSubmissionData(req.body.applicantId));
      dataObj.applicantData = res3.data;
    }
    catch(error3){
      return res.status(500).send({ error: error3 })  
    }

    let cleanedObj = transformDataForExternalServices(dataObj.applicantData, dataObj.applicantReviewStatus)
    
    writeObjectToJsonFile(cleanedObj); //TODO: For logging. Remove this line on production

    //TODO: Forward the cleaned data to primetrust

  }

  //Else if review status is not GREEN. Notify user.
  else{
    //TODO: Send notification to the user, asking them to re-do the verification.
  }


  return res.json({ok:1})
}


async function routeSumsubCreateAccessToken(req, res){
  //Send error if externalUserId not provided
  if(!req || !req.body || !req.body.externalUserId) return res.status(500).send({ error: 'Please provide externalUserId' });

  try {
    //Creating the access token
    const res1 = await axios.request(createAccessToken(req.body.externalUserId))
    return res.json({token:res1.data.token})    
  } catch (error1) {
    return res.status(500).send({ error: error1 })
  }
}



//
//
//
//
//
//
//
//
//
//
//
//These routes are only for dev to store dynamically-created files

// app.post('/sumsub-get-applicant-data', routeSumsubGetApplicantData);
app.get('/'+DOWNLOAD_FOLDER_NAME, routeListDownloadedFiles);

async function routeListDownloadedFiles(req,res){
  //Create download folder if not exits
  if(!fs.existsSync('./'+DOWNLOAD_FOLDER_NAME)){
    fs.mkdirSync('./'+DOWNLOAD_FOLDER_NAME);
  }

  const files = fs.readdirSync('./'+DOWNLOAD_FOLDER_NAME);
  res.json(files)
}

async function writeObjectToJsonFile(obj){    
  const timeNow = ((new Date()).toJSON()).replace(/[-:.]/g,"");
  //Create download folder if not exits
  if(!fs.existsSync('./'+DOWNLOAD_FOLDER_NAME)){
    fs.mkdirSync('./'+DOWNLOAD_FOLDER_NAME);
  }
  //Write payload body to a json file.
  fs.writeFileSync('./'+DOWNLOAD_FOLDER_NAME+'/'+timeNow+'.json',JSON.stringify(obj));

}

app.get('/get-document', async function(req, res){
  try {
    //Creating the access token
    const res1 = await axios.request(getDocument('62d00fcea133380001adfc02','1444271060'))
    return res.json({returned: res1.data})    
  } catch (error1) {
    return res.status(500).send({ error: error1 })
  }
});




//Routes tobe used on production
app.all('/auth/onboarding-info', (req,res)=>{
  let obj = {"user_id":23,"first_name":"Hamdi","last_name":"Rizal","phone":"19706477017","email":"hamdirizal@gmail.com","auth0_user_id":"auth0|62f351030861016987eece88","company_name":"HamdiPoplarDevtTest","created_at":"2022-08-10T06:33:55.992Z","id":18,"business_verification":0,"enable_2fa":false,"status_id":0,"deposit_status":0}
  return res.json(obj);
});

app.all('/auth/login-sync', (req,res)=>{
  let obj = {"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlhZNExjeklEZ2JaOWxGUTJkcUZxSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1tc2FsMDR6ZS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjJmMzUxMDMwODYxMDE2OTg3ZWVjZTg4IiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hcGkiLCJodHRwczovL2Rldi1tc2FsMDR6ZS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjYwNzIxMTk1LCJleHAiOjE2NjA4MDc1OTUsImF6cCI6IkUxWjR3U1VycWZZSDc2NElGaFV1SnZGb1NqVW1Ja25zIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.mAG7gC_uARP4Z92X-KS8x9sZKeBLy2v06hdb2tAdyq2NeMvGLaBppRpIA1rC1UKCQg61De-CXJWmLfyqcCI74qIe9S1e3hG2SAAgF1gC6Mx76SFvOawe_UnNIRUDIC_3LauKaMZNY5-7CiGEr8WWYf3Fy28GajWeExaNGNsVrZfVrIRM61OM9c8giN5q8vlC_p-BEcoVVZ4v5YcXUlFoQM3O0T-J7nXESTVU14WmTeeRdndHGLBN7fJ8q8ed7JYPOg0p0Tzd3xyRiGnMq9y_Hs7BZsN4iK_WynBwT2I4Q1tr-Pz6EPtjtQ9t_9q_hlMc_AUJHCCPA-3NLyYcSVl4eA","status_id":0}
  return res.json(obj);
});

app.all('/user/settings', all__user__settings);

app.all('/account', all__account);

app.all('/account/setup-state', (req,res)=>{
  let obj = {"business_verification":"VERIFIED","submit_documentation":0,"deposit_status":1,"connect_accounts":true,"details":[]}
  // let obj = {"business_verification":"NONE","submit_documentation":0,"deposit_status":0,"details":[],"connect_accounts":false}
  return res.json(obj);
});
app.all('/account/products/balances', (req,res)=>{
  let obj = [{"id":1,"product_name":"Aave","asset_name":"USDC","network":"Avalanche","protocol":"aave-avax","yield":"2.73","type":0,"status_id":1,"image_url":"https://poplar-staging.s3.amazonaws.com/products/Aave.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2ZBVY4PYUWWVWQXF%2F20220919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220919T074508Z&X-Amz-Expires=60&X-Amz-Signature=719eeba4e0c47db82f7c1bfebdac38cbf5d6bbe36e6ff011832a8411fb246ecf&X-Amz-SignedHeaders=host","created_at":"2022-08-30T21:02:51.150Z","type_name":"Fiat Backed","current_balance":0,"available_to_withdrawal":0,"earnings":0},{"id":2,"product_name":"Aave","asset_name":"USDC","network":"Ethereum","protocol":"aave","yield":"2.73","type":0,"status_id":1,"image_url":"https://poplar-staging.s3.amazonaws.com/products/Aave.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2ZBVY4PYUWWVWQXF%2F20220919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220919T074508Z&X-Amz-Expires=60&X-Amz-Signature=719eeba4e0c47db82f7c1bfebdac38cbf5d6bbe36e6ff011832a8411fb246ecf&X-Amz-SignedHeaders=host","created_at":"2022-08-30T21:02:51.150Z","type_name":"Fiat Backed","current_balance":0,"available_to_withdrawal":0,"earnings":0},{"id":3,"product_name":"Compound","asset_name":"USDC","network":"Compound","protocol":"compound","yield":"6.08","type":0,"status_id":1,"image_url":"https://poplar-staging.s3.amazonaws.com/products/Compound.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2ZBVY4PYUWWVWQXF%2F20220919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220919T074508Z&X-Amz-Expires=60&X-Amz-Signature=6bfff842bb9ef8fc191e176a6d7300bfc925ba7e1ee234e2f7e54ab724602aba&X-Amz-SignedHeaders=host","created_at":"2022-08-30T21:02:51.150Z","type_name":"Fiat Backed","current_balance":0,"available_to_withdrawal":0,"earnings":0},{"id":4,"product_name":"Alkemy","asset_name":"USDC","network":"Alkemy","protocol":"alkemy","yield":"4.22","type":0,"status_id":1,"image_url":"https://poplar-staging.s3.amazonaws.com/products/Alkemi.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2ZBVY4PYUWWVWQXF%2F20220919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220919T074508Z&X-Amz-Expires=60&X-Amz-Signature=93704f60d89dd4dcb6c5d39b4d04b46266cfa3c0d1267982bac18c5cf4e9046a&X-Amz-SignedHeaders=host","created_at":"2022-08-30T21:02:51.150Z","type_name":"Fiat Backed","current_balance":0,"available_to_withdrawal":0,"earnings":0}];
  return res.json(obj);
});

app.all('/user/profile', (req,res)=>{
  let obj = {"user_id":23,"first_name":"Hamdi","last_name":"Rizal","phone":"19706477017","email":"hamdirizal@gmail.com","auth0_user_id":"auth0|62f351030861016987eece88","company_name":"HamdiPoplarDevtTest","created_at":"2022-08-10T06:33:55.992Z","id":18,"business_verification":0,"enable_2fa":false,"status_id":0,"deposit_status":0}
  return res.json(obj);
});

app.all('/account/profile', (req,res)=>{
  let obj = {"first_name":"Hamdi","last_name":"Rizal","phone":"+19706477017","email":"hamdirizal@gmail.com","is_authorized_signer":"Yes"}
  return res.json(obj);
});
app.all('/account/link-token', (req,res)=>{
  let obj = {"expiration":"2022-08-17T20:22:20Z","link_token":"link-sandbox-76703012-fc5e-4ed0-9519-21a14671d2ad","request_id":"G3V33VNNDOHXd0z"}
  return res.json(obj);
});

app.all('/account/idle-cash', (req,res)=>{
  let obj = {"accounts":[{"plaid_token_id":182,"poplar_account_id":null,"bank_name":"Chase","accounts":[{"account_id":"k6aVQJXz9gtAqXpKzPxwFkP8mn6j7eCznMeP7","balances":{"available":200,"current":210,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":20},"mask":"1111","name":"Plaid Saving","official_name":"Plaid Silver Standard 0.1% Interest Saving","subtype":"savings","type":"depository"}]},{"plaid_token_id":183,"poplar_account_id":null,"bank_name":"Chase","accounts":[{"account_id":"4WGrZA4L1BIgJMV1ay6KCPJmXANNLztngD3Dw","balances":{"available":100,"current":110,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":10},"mask":"0000","name":"Plaid Checking","official_name":"Plaid Gold Standard 0% Interest Checking","subtype":"checking","type":"depository"},{"account_id":"NZgRPLdKJmi3gNQ9r8LJCld7XvAAR4fnre7em","balances":{"available":200,"current":210,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":20},"mask":"1111","name":"Plaid Saving","official_name":"Plaid Silver Standard 0.1% Interest Saving","subtype":"savings","type":"depository"}]},{"plaid_token_id":184,"poplar_account_id":null,"bank_name":"Chase","accounts":[{"account_id":"8KPRLZwxXqSerRjD5n8Zh8DmoG3onecK4VgPQ","balances":{"available":100,"current":110,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":10},"mask":"0000","name":"Plaid Checking","official_name":"Plaid Gold Standard 0% Interest Checking","subtype":"checking","type":"depository"},{"account_id":"EeWrx3NzXvCnGKd6MVmJhldpz9MzWwi9vPraZ","balances":{"available":200,"current":210,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":20},"mask":"1111","name":"Plaid Saving","official_name":"Plaid Silver Standard 0.1% Interest Saving","subtype":"savings","type":"depository"}]},{"plaid_token_id":187,"poplar_account_id":null,"bank_name":"Chase","accounts":[{"account_id":"Jj9DjwNL6acb1AxRX7n8s4DQqoVKqDfowxLy9","balances":{"available":100,"current":110,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":10},"mask":"0000","name":"Plaid Checking","official_name":"Plaid Gold Standard 0% Interest Checking","subtype":"checking","type":"depository"},{"account_id":"kNkWNMQEPbunLoAbzVJGH5e3LKJRLeUzAabje","balances":{"available":200,"current":210,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":20},"mask":"1111","name":"Plaid Saving","official_name":"Plaid Silver Standard 0.1% Interest Saving","subtype":"savings","type":"depository"}]}],"idleCashBalance":110,"accountsCount":7}
  return res.json(obj);
});

app.post('/account/deposits', (req,res)=>{
  let obj = {success:true, message:"Mock data: The deposit is created."}
  return res.json(obj);
});
app.all('/account/deposits/ach-push-details', (req,res)=>{
  let obj = {foo:'bar'}
  return res.json(obj);
});
app.all('/account/deposits/wire-details', (req,res)=>{
  let obj = {foo:'bar'}
  return res.json(obj);
});

app.all('/account/deposits/fee', (req,res)=>{
  let obj = {fee:2}
  return res.json(obj);
});

app.all('/account/deposits/automat', (req,res)=>{
  let obj = { success: true, message: 'Mock data: The automated deposit is created' };
  return res.json(obj);
});


app.all('/account/withdraw', all__account__withdraw);
app.all('/account/withdraw/balance', all__account__withdraw__balance);
app.all('/account/funds', all__account__funds);
app.all('/account/transactions', all__account__transactions);
app.all('/account/deposits/products', all__account__deposits__products);

app.all('/old-setup-state', (req,res)=>{
  //"business_verification":0, //PENDING = 0, DO_LATER = 1, DONE = 2,
  //"submit_documentation":0, //PENDING = 0, SUBMITTED = 1, FAILED = 2,
  //deposit_status //NOT_ACTIVE = 0,  ACTIVE = 1,
  let obj = {"business_verification":2,"submit_documentation":1,"connect_accounts":true,"deposit_status":1,"details":[]}
  return res.json(obj);
});

app.all('/business-verification/sumsub-resetX', (req,res)=>{
  let obj = {success:true}
  return res.json(obj);
});

app.get('/hamditest1', async function(req, res){
  try {
    //Creating the access token
    const res1 = await axios.request(getOneApplicantData('63208b8aa22f950001b40c78'))
    return res.json({returned: res1.data})    
  } catch (error1) {
    return res.status(500).send({ error: error1 })
  }
});


app.get('/hamditest2', async function(req, res){
  try {
    //Creating the access token
    const res1 = await axios.request(testChangingTopLevelData())
    return res.json({returned: res1.data})    
  } catch (error1) {
    return res.status(500).send({ error: error1 })
  }
});

app.get('/hamditestresetquestionnaire', async function(req, res){
  try {
    //Creating the access token
    const res1 = await axios.request(testResettingQuestionnaire())
    return res.json({returned: res1.data})    
  } catch (error1) {
    return res.status(500).send({ error: error1 })
  }
});





//Start the server
app.listen(port, () => { console.info(`Sumsub backend app listening on port ${port}`) })