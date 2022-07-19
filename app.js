require('dotenv').config()
const process = require('process')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const fs = require('fs')
var bodyParser = require('body-parser')
const { transformDataForExternalServices, getApplicantDataByExternalId, createAccessToken, getApplicantReviewStatus, getApplicantSubmissionData } = require('./sumsub-functions')
const app = express()
const port = process.env.PORT || 3000
const DOWNLOAD_FOLDER_NAME = "_downloads"
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use('/'+DOWNLOAD_FOLDER_NAME, express.static(DOWNLOAD_FOLDER_NAME))
app.use(cors())
app.get('/', (req, res) => { res.send('SumSub Backend! 101')} );

//Routes tobe used on production
app.post('/sumsub-get-applicant-data', routeSumsubGetApplicantData);
app.post('/sumsub-create-access-token', routeSumsubCreateAccessToken);
app.post('/sumsub-webhook-applicant-reviewed', routeSumsubWebhookApplicantReviewed);

async function routeSumsubWebhookApplicantReviewed(req, res){
  const timeNow = ((new Date()).toJSON()).replace(/[-:.]/g,"");

  //Create download folder if not exits
  if(!fs.existsSync('./'+DOWNLOAD_FOLDER_NAME)){
    fs.mkdirSync('./'+DOWNLOAD_FOLDER_NAME);
  }

  if(!req || !req.body || !req.body.applicantId){
    return res.status(500).send({ error: 'The payload does not have applicantId' })
  }  

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

  //Write payload body to a json file.
  fs.writeFileSync('./'+DOWNLOAD_FOLDER_NAME+'/'+timeNow+'.json',JSON.stringify(dataObj));
  
  return res.json({ok:1})
}

async function routeSumsubGetApplicantData(req, res){
  //Send error if externalUserId not provided
  if(!req || !req.body || !req.body.externalUserId) return res.status(500).send({ error: 'Please provide externalUserId' });

  let applicantId = null;

  try {
    const res1 = await axios.request(getApplicantDataByExternalId(req.body.externalUserId))
    applicantId = res1.data.id;
  } catch (error1) {
    return res.status(500).send({ error: 'Cannot find applicant with this external-id' })  
  }

  try{
    console.log('trying to get res2')
    const res2 = await axios.request(getApplicantReviewStatus(applicantId));
    return res.json(res2.data)
  }
  catch(error2){
    console.log(error2)
    return res.status(500).send({ error: 'Failed to get the status and documents' })  
  }
}

async function routeSumsubCreateAccessToken(req, res){
  //Send error if externalUserId not provided
  if(!req || !req.body || !req.body.externalUserId) return res.status(500).send({ error: 'Please provide externalUserId' });

  try {
    //Creating the access token
    const res1 = await axios.request(createAccessToken(req.body.externalUserId))
    return res.json({accessToken:res1.data.token})    
  } catch (error1) {
    return res.status(500).send({ error: 'Cannot create access token' })
  }
}










//These routes are only for dev to store dynamically-created files
app.get('/'+DOWNLOAD_FOLDER_NAME, routeListDownloadedFiles);

async function routeListDownloadedFiles(req,res){
  //Create download folder if not exits
  if(!fs.existsSync('./'+DOWNLOAD_FOLDER_NAME)){
    fs.mkdirSync('./'+DOWNLOAD_FOLDER_NAME);
  }

  const files = fs.readdirSync('./'+DOWNLOAD_FOLDER_NAME);
  res.json(files)
}


app.listen(port, () => { console.log(`Example app listening on port ${port}`) })