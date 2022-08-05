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
  getApplicantSubmissionData 
} = require('./sumsub-functions')
const app = express()
const port = process.env.PORT || 3000
const DOWNLOAD_FOLDER_NAME = "_downloads"
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use('/'+DOWNLOAD_FOLDER_NAME, express.static(DOWNLOAD_FOLDER_NAME))
app.use(cors())
app.get('/', (req, res) => { res.send('SumSub Backend! 105')} );


//Routes tobe used on production
app.post('/sumsub-create-access-token', routeSumsubCreateAccessToken);
app.post('/sumsub-webhook-applicant-reviewed', routeSumsubWebhookApplicantReviewed);



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
    return res.json({accessToken:res1.data.token})    
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




//Start the server
app.listen(port, () => { console.info(`Sumsub backend app listening on port ${port}`) })