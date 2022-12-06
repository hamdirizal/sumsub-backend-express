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
const { all__auth__onboardinginfo } = require('./all__auth__onboardinginfo')
const { all__account__setupstate } = require('./all__account__setupstate')
const { all__user__profile } = require('./all__user__profile')
const { all__account__idlecash } = require('./all__account__idlecash')
const { all__account__deposits__products } = require('./all__account__deposits__products')
const { all__business_verification__agreement } = require('./all__business_verification__agreement')
const { all__auth__loginsync } = require('./all__auth__loginsync')
const { all__account__deposits__wiredetails } = require('./all__account__deposits__wiredetails')
const { all__account__transactions } = require('./all__account__transactions')
const { all__account__deposits__achpushdetails } = require('./all__account__deposits__achpushdetails')
const { all__user__settings } = require('./all__user__settings')
const { all__account } = require('./all__account')
const { all__account__funds } = require('./all__account__funds')
const { all__account__agreementpreviews } = require('./all__account__agreementpreviews')
const { all__account__funds__balance } = require('./all__account__funds__balance')
const { all__account__withdraw__balance } = require('./all__account__withdraw__balance')
const { all__account__withdraw } = require('./all__account__withdraw')
const { all__account__deposits__automat } = require('./all__account__deposits__automat')
const { all__account__deposits__fee } = require('./all__account__deposits__fee')
const { post__account__deposits } = require('./post__account__deposits')
const { all__account__profile } = require('./all__account__profile')
const { all__account__linktoken } = require('./all__account__linktoken')
const { all__account__products__balances } = require('./all__account__products__balances')
const { all__pools__all } = require('./all__pools__all')
const { all__pools__templates } = require('./all__pools__template')
const { all__pools__id } = require('./all__pools__id')
const { post__report__pool } = require('./post__report__pool')

const { get: getApiNotificationsTransfers } = require('./src/notifications/transfers')
const { post: postPools } = require('./src/pools')
const { get: getPools999 } = require('./src/pools/999')
const { get: getPoolsTemplates } = require('./src/pools/templates')
const { get: getReportUserBalances } = require('./src/report/user/balances')
const { post: postReport } = require('./src/report')
const { get: getReport999 } = require('./src/report/999')
const { get: getAllAutomations } = require('./src/all-automations')
const { get: getAccountAvailableBalance } = require('./src/account/available-balance')
const { get: getAccountDepositsAutomated } = require('./src/account/deposits/automated')
const { get: getAccountEarningsFunds } = require('./src/account/earnings/funds')
const { get: getAccountWithdrawAutomated } = require('./src/account/withdraw/automated')
const { get: getAccount } = require('./src/account')
const { get: getAccountPTBalance } = require('./src/account/pt-balance')
const { get: getAccountIdleCash } = require('./src/account/idle-cash')
const { get: getAccountTransactionsGroup } = require('./src/account/transactions-group')
const { get: getAccountAutomatedTransactionsUpcoming } = require('./src/account/automated-transactions/upcoming')
const { get: getGetReportData } = require('./src/get-report-data')
const { post: postVerificationCodesSend } = require('./src/verification-codes/send')
const { post: postAccountDepositsAutomatedPause } = require('./src/account/deposits/automated/pause')
const { deleting: deletingAccountDepositsAutomated } = require('./src/account/deposits/automated')

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
  // return res.json({token:'helloworld123'});
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



//Routes
//========================================

app.all('/auth/login-sync', all__auth__loginsync);
app.all('/auth/onboarding-info', all__auth__onboardinginfo);
app.get('/account', getAccount);
app.post('/account/deposits', post__account__deposits);
app.post('/account/deposits/automated/pause', postAccountDepositsAutomatedPause);
app.post('/account/deposits/automated/resume', postAccountDepositsAutomatedPause);
app.delete('/account/deposits/automated/*', deletingAccountDepositsAutomated);
app.get('/account/available-balance', getAccountAvailableBalance);
app.all('/account/setup-state', all__account__setupstate);
app.all('/account/products/balances', all__account__products__balances);
app.all('/account/agreement-previews', all__account__agreementpreviews);
app.get('/account/earnings/funds', getAccountEarningsFunds);
app.get('/account/automated-transactions/upcoming', getAccountAutomatedTransactionsUpcoming);
app.all('/account/profile', all__account__profile);
app.all('/account/link-token', all__account__linktoken);
app.get('/account/idle-cash', getAccountIdleCash);
app.all('/account/deposits/ach-push-details', all__account__deposits__achpushdetails);
app.all('/account/deposits/wire-details', all__account__deposits__wiredetails);
app.all('/account/deposits/fee', all__account__deposits__fee);
app.get('/account/deposits/automated', getAccountDepositsAutomated);
app.all('/account/deposits/automat', all__account__deposits__automat);
app.get('/account/pt-balance', getAccountPTBalance);
app.post('/account/withdraw/automated/pause', postAccountDepositsAutomatedPause);
app.get('/account/withdraw/automated', getAccountWithdrawAutomated);
app.all('/account/withdraw/automat', all__account__deposits__automat);
app.all('/account/withdraw', all__account__withdraw);
app.get('/account/withdraw/available-balance', getAccountAvailableBalance);
app.all('/account/withdraw/balance', all__account__withdraw__balance);
app.all('/account/funds?fund_type=BALANCE*', all__account__funds__balance);
app.all('/account/funds', all__account__funds);
app.get('/account/transactions-group', getAccountTransactionsGroup);
app.all('/account/transactions', all__account__transactions);
app.all('/account/deposits/products', all__account__deposits__products);
app.get('/all-automations', getAllAutomations);
app.get('/notifications/transfers', getApiNotificationsTransfers);
app.post('/pools', postPools);
app.all('/pools/all', all__pools__all);
app.get('/pools/templates', getPoolsTemplates);
app.get('/pools/*', getPools999);
app.get('/report/user/balances', getReportUserBalances);
app.post('/report',postReport);
app.get('/report/*',getReport999);
app.post('/verification-codes/send',postVerificationCodesSend);

//========================================






app.all('/business-verification/approve', (req, res)=>{
  setTimeout(()=>{
    // let obj = {success:true, message:'Action success'}; return res.json(obj);
    return res.status(400).json({"message": "Error: Lorem ipsum dolor sit amet", "error": "Unauthorized"})
    
  },1);
});
app.all('/business-verification/sumsub-completed', all__business_verification__agreement);
app.post('/report/pool', post__report__pool);
app.all('/user/profile', all__user__profile);
app.all('/user/settings', all__user__settings);

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

app.all('/hamdidummytest', async function(req, res){
  let obj = {success:true}
  return res.json(obj);
});





//Start the server
app.listen(port, () => { console.info(`Sumsub backend app listening on port ${port}`) })