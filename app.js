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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => { res.send('SumSub Backend!')} );

//Routes
app.post('/get-applicant-data', routeGetApplicantData);
app.post('/create-sumsub-access-token', routeCreateSumsubAccessToken);




async function routeGetApplicantData(req, res){
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



async function routeCreateSumsubAccessToken(req, res){
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




app.listen(port, () => { console.log(`Example app listening on port ${port}`) })