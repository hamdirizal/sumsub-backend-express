require('dotenv').config()
const process = require('process')
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const FormData = require('form-data');

const DOWNLOAD_FOLDER = './_downloads/';
const SUMSUB_BASE_URL = 'https://api.sumsub.com'; 

var config = {};
config.baseURL= SUMSUB_BASE_URL;

axios.interceptors.request.use(interceptorCreateSignature, function (error) {
  return Promise.reject(error);
});

/**
 * This interceptor will create signature for the request 
 * The explanation is here: https://developers.sumsub.com/api-reference/#app-tokens
 */
function interceptorCreateSignature(config) {
  console.log('creating signature')
  var ts = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac('sha256',  process.env.SUMSUB_SECRET_KEY);
  signature.update(ts + config.method.toUpperCase() + config.url);

  if (config.data instanceof FormData) {
    signature.update (config.data.getBuffer());
  } else if (config.data) {
    signature.update (config.data);
  }

  config.headers['X-App-Access-Ts'] = ts;
  config.headers['X-App-Access-Sig'] = signature.digest('hex');

  return config;
}



/**
 * This function will try to create an applicant in the Sumsub backend. 
 * If applicant with same userId exists, it will return error code 409 and gives the exisiting applicant id.
 * If applicant not exists, it will create a new one, and return and object which contains the new applicant id.
 * @param {Object} requestBody Must have externalUserId and can have optional "phone" and "email" for prefilling the form.
 */
 function createApplicant(requestBody) {
  console.log('creating applicant')
  var method = 'post';
  var url = '/resources/applicants?levelName=' + process.env.SUMSUB_VERIFICATION_LEVEL;
  var ts = Math.floor(Date.now() / 1000);

  var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-App-Token': process.env.SUMSUB_APP_TOKEN
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = JSON.stringify(requestBody);

  return config;
}


/**
 * Getting the aplicant by external user id. 
 * If applicant exist, it will return object which contains applicant id. Otherwise, it will response with 404.
 * @param {string} externalUserId Any unique key to difrentiate users.
 */
function getApplicantDataByExternalId(externalUserId){  
  var method = 'get';
  var url = '/resources/applicants/-;externalUserId='+externalUserId+'/one';    

  var headers = {
    'Accept': 'application/json',
    'X-App-Token': process.env.SUMSUB_APP_TOKEN
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null

  return config;
}


/**
 * Getting applicant submission data
 * @param {*} applicantId SumSub applicant id
 */
 function getApplicantSubmissionData(applicantId){  
    console.log("Getting aplicant submission data");
  
    var method = 'get';
    var url = '/resources/applicants/'+applicantId+'/one';
  
    var headers = {
      'Accept': 'application/json',
      'X-App-Token': process.env.SUMSUB_APP_TOKEN
    };
  
    config.method = method;
    config.url = url;
    config.headers = headers;
    config.data = null
  
    return config;
}



/**
 * Getting the review status of particular applicant
 * @param {*} applicantId SumSub applicant id
 */
function getApplicantReviewStatus(applicantId){  
  console.log("Getting aplicant review status");
  
    var method = 'get';
    var url = '/resources/applicants/'+applicantId+'/requiredIdDocsStatus';    
  
    var headers = {
      'Accept': 'application/json',
      'X-App-Token': process.env.SUMSUB_APP_TOKEN
    };
  
    config.method = method;
    config.url = url;
    config.headers = headers;
    config.data = null
  
    return config;
}




/**
 * Getting the access token which is needed to render the form.
 * https://developers.sumsub.com/api-reference/#access-tokens-for-sdks
 * The access token will look like this _act-sbx-b1bee9ed-e57c-4da0-8ada-8e6459093131
 * @param {String} externalUserId The user id which will be used to pick the applicant
 */
 function createAccessToken (externalUserId) {
  const ttlInSecs = 60 * 15; //Lifespan of a token in seconds. 15 minutes
  console.log("Creating an access token for initializng SDK...");

  var method = 'post';
  var url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${process.env.SUMSUB_VERIFICATION_LEVEL}`;

  var headers = {
      'Accept': 'application/json',
      'X-App-Token': process.env.SUMSUB_APP_TOKEN
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;

  return config;
}


/**
 * Transform raw data from Sumsub to a simpler version so we can feed it to external services.
 * @param {*} applicantData The applicant data returned by Sumsub
 * @param {*} applicantReviewStatusData The reviewStatus data returned by Sumsub to get only correct documents
 * @returns 
 */
function transformDataForExternalServices(applicantData, applicantReviewStatusData){


  return {}
}




module.exports = {createApplicant, getApplicantDataByExternalId, createAccessToken, getApplicantReviewStatus, getApplicantSubmissionData, transformDataForExternalServices}