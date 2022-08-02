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
function transformDataForExternalServices(applicantData){
  let finalObj = {}

  finalObj.sumsubId = applicantData?.id;
  finalObj.externalId = applicantData?.externalUserId;
  finalObj.inspectionId = applicantData?.inspectionId;
  finalObj.email = applicantData?.email;
  finalObj.phone = applicantData?.phone;
  finalObj.birthday = applicantData?.info?.dob;
  finalObj.firstName = applicantData?.info?.firstName;
  finalObj.lastName = applicantData?.info?.lastName;
  finalObj.middleName = applicantData?.info?.middleName;
  finalObj.fullName = ([finalObj.firstName, finalObj.middleName, finalObj.lastName].join(' ')).replace(/  +/g,' ');

  //If exists, hold questionnaire-object in this variable, otherwise just hold empty object.
  let qtr = (applicantData.questionnaires && Array.isArray(applicantData.questionnaires) && applicantData.questionnaires[0]) ? applicantData.questionnaires[0] : {};
  
  finalObj.referrer = qtr?.sections?.extra?.items?.referrer?.value;
  finalObj.pointOfContact = qtr?.sections?.extra?.items?.poplarPointOfContact?.value;
  finalObj.check1_CompanyNotInSanctionedCountries = qtr?.sections?.requiredDocuments?.items?.chkCompanyNotInSanctionedCountries?.value;
  finalObj.check2_CompanyNotAsShellBank = qtr?.sections?.requiredDocuments?.items?.chkCompanyNotAsShellBank?.value;
  finalObj.check3_AcceptToc = qtr?.sections?.requiredDocuments?.items?.chkAcceptToc?.value;
  finalObj.check4_ImportantInformation = qtr?.sections?.requiredDocuments?.items?.chkImportantInformation?.value;
  finalObj.check5_FullName = qtr?.sections?.requiredDocuments?.items?.chkCorrectInfo?.value;
  
  finalObj.isAuthorizedSigner = qtr?.sections?.extra?.items?.isAuthorizedSigner?.value;
  finalObj.entityLegalname = qtr?.sections?.companyInformation?.items?.legalNameOfEntity?.value;
  finalObj.dba = qtr?.sections?.companyInformation?.items?.doingBusinessAs?.value;
  finalObj.websiteAddress = qtr?.sections?.companyInformation?.items?.websiteAddress?.value;
  finalObj.entityFirmType = qtr?.sections?.companyInformation?.items?.entitysFirmType?.value;
  finalObj.description = qtr?.sections?.companyInformation?.items?.description?.value;
  finalObj.incorporationCountry = qtr?.sections?.companyInformation?.items?.countryOfIncorporation?.value;
  finalObj.incorporationState = qtr?.sections?.companyInformation?.items?.stateOfIncorporation?.value;
  finalObj.registeredAddress = qtr?.sections?.companyInformation?.items?.registeredAddress?.value;
  finalObj.physicalLocationAddress = qtr?.sections?.companyInformation?.items?.physicalLocationAddress?.value;
  finalObj.jurisdictionTaxResidency = qtr?.sections?.companyInformation?.items?.jurisdictionOfTaxResidency?.value;
  finalObj.taxIdentification = qtr?.sections?.companyInformation?.items?.taxIdentificationNumber?.value;
  finalObj.entityAuthority = qtr?.sections?.companyInformation?.items?.entityAuthority?.value;
  finalObj.postalCode = qtr?.sections?.companyInformation?.items?.postalCode?.value;
  finalObj.city = qtr?.sections?.companyInformation?.items?.city?.value;

  //Directors data
  finalObj.companyDirectors = []
  const directorsFieldsCount = 10;
  let directorsItems = qtr?.sections?.companyDirectors?.items;
  if(directorsItems && typeof directorsItems === 'object' && directorsItems !== null){
    for(let i=1;i<=directorsFieldsCount;i++){
      let fullName = directorsItems['director'+i+'FullName']?.value
      let email = directorsItems['director'+i+'Email']?.value;
      let phoneNumber = directorsItems['director'+i+'PhoneNumber']?.value;
      if(fullName || email || phoneNumber){
        finalObj.companyDirectors.push({fullName, email, phoneNumber})
      }      
    }
  }

  //Beneficiaries data
  finalObj.companyBeneficiaries = []
  const beneficiariesFieldsCount = 10;
  let beneficiariesItems = qtr?.sections?.companyBeneficiaries?.items;
  if(beneficiariesItems && typeof beneficiariesItems === 'object' && beneficiariesItems !== null){
    for(let i=1;i<=beneficiariesFieldsCount;i++){
      let attachment = beneficiariesItems['beneficiary'+i+'GovId']?.value
      let email = beneficiariesItems['beneficiary'+i+'Email']?.value;
      let fullName = beneficiariesItems['beneficiary'+i+'FullName']?.value;
      try {
        fullName = fullName.replace(/ {2,}/g,' ');
      } catch (error) {}
      let firstName;
      let lastName;
      try {
        let nameArr = fullName.split(' ');
        firstName = nameArr[0];
        lastName = nameArr[nameArr.length-1]
      } catch (error) {}
      let birthday = beneficiariesItems['beneficiary'+i+'DOB']?.value;
      let percentageOwned = beneficiariesItems['beneficiary'+i+'Percent']?.value;
      let ssn = beneficiariesItems['beneficiary'+i+'SSN']?.value;
      if(attachment || email || firstName || lastName || birthday || percentageOwned || ssn){
        finalObj.companyBeneficiaries.push({attachment, email, firstName, lastName, birthday, percentageOwned, ssn})
      }      
    }
  }

  //Required documents
  finalObj.proofAddressCompany_docId = qtr?.sections?.requiredDocuments?.items?.proofAddressCompany?.value;
  finalObj.incorporationCertificate_docId = qtr?.sections?.requiredDocuments?.items?.incorporationCertificate?.value;
  finalObj.certifiedIdentityDirectors_docId = qtr?.sections?.requiredDocuments?.items?.certifiedIdentityDirectors?.value;
  finalObj.articlesAssociationCopy_docId = qtr?.sections?.requiredDocuments?.items?.articlesAssociationCopy?.value;
  finalObj.boardApprovedListAuthUsers_docId = qtr?.sections?.requiredDocuments?.items?.boardApprovedListAuthUsers?.value;
  finalObj.certifiedResidencyDirectors_docId = qtr?.sections?.requiredDocuments?.items?.certifiedResidencyDirectors?.value;

  return finalObj;
}


 function getDocument(inspectionId, resourceId){  
  var method = 'get';
  var url = `/resources/inspections/${inspectionId}/resources/${resourceId}`;

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


module.exports = {createApplicant, getApplicantDataByExternalId, createAccessToken, getApplicantReviewStatus, getApplicantSubmissionData, transformDataForExternalServices, getDocument}