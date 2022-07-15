require('dotenv').config()
const process = require('process')
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const fs = require('fs')
var bodyParser = require('body-parser')
const { getApplicantDataByExternalId, createAccessToken, getApplicantStatusAndDocs } = require('./sumsub-functions')
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
  const timeNow = (new Date()).toJSON();
  timeNow = timeNow.replace(/[-:.]/g,"");


  //Create download folder if not exits
  if(!fs.existsSync('./'+DOWNLOAD_FOLDER_NAME)){
    fs.mkdirSync('./'+DOWNLOAD_FOLDER_NAME);
  }

  //Write payload body to a json file.
  fs.writeFileSync('./'+DOWNLOAD_FOLDER_NAME+'/'+timeNow+'.json',JSON.stringify(req.body));
  
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
    const res2 = await axios.request(getApplicantStatusAndDocs(applicantId));
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
    //Try to create applicant. If success, hold the applicantId;
    const res1 = await axios.request(createAccessToken(req.body.externalUserId))
    return res.json({accessToken:res1.data.token})    
  } catch (error1) {
    console.log(req.body.externalUserId)
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