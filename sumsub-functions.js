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
  const ttlInSecs = 60 * 30; //Lifespan of a token in seconds. 15 minutes
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
  console.log(externalUserId);

  return config;
}

function alpha3toAlpha2(alpha3){
  const countryList = {
    "AFG":"AF", "ALA":"AX", "ALB":"AL", "DZA":"DZ", "ASM":"AS", "AND":"AD", "AGO":"AO", "AIA":"AI", "ATA":"AQ", "ATG":"AG", "ARG":"AR", "ARM":"AM", "ABW":"AW", "AUS":"AU", "AUT":"AT", "AZE":"AZ", "BHS":"BS", "BHR":"BH", "BGD":"BD", "BRB":"BB", "BLR":"BY", "BEL":"BE", "BLZ":"BZ", "BEN":"BJ", "BMU":"BM", "BTN":"BT", "BOL":"BO", "BES":"BQ", "BIH":"BA", "BWA":"BW", "BVT":"BV", "BRA":"BR", "IOT":"IO", "BRN":"BN", "BGR":"BG", "BFA":"BF", "BDI":"BI", "CPV":"CV", "KHM":"KH", "CMR":"CM", "CAN":"CA", "CYM":"KY", "CAF":"CF", "TCD":"TD", "CHL":"CL", "CHN":"CN", "CXR":"CX", "CCK":"CC", "COL":"CO", "COM":"KM", "COG":"CG", "COD":"CD", "COK":"CK", "CRI":"CR", "CIV":"CI", "HRV":"HR", "CUB":"CU", "CUW":"CW", "CYP":"CY", "CZE":"CZ", "DNK":"DK", "DJI":"DJ", "DMA":"DM", "DOM":"DO", "ECU":"EC", "EGY":"EG", "SLV":"SV", "GNQ":"GQ", "ERI":"ER", "EST":"EE", "SWZ":"SZ", "ETH":"ET", "FLK":"FK", "FRO":"FO", "FJI":"FJ", "FIN":"FI", "FRA":"FR", "GUF":"GF", "PYF":"PF", "ATF":"TF", "GAB":"GA", "GMB":"GM", "GEO":"GE", "DEU":"DE", "GHA":"GH", "GIB":"GI", "GRC":"GR", "GRL":"GL", "GRD":"GD", "GLP":"GP", "GUM":"GU", "GTM":"GT", "GGY":"GG", "GIN":"GN", "GNB":"GW", "GUY":"GY", "HTI":"HT", "HMD":"HM", "HND":"HN", "HKG":"HK", "HUN":"HU", "ISL":"IS", "IND":"IN", "IDN":"ID", "IRN":"IR", "IRQ":"IQ", "IRL":"IE", "IMN":"IM", "ISR":"IL", "ITA":"IT", "JAM":"JM", "JPN":"JP", "JEY":"JE", "JOR":"JO", "KAZ":"KZ", "KEN":"KE", "KIR":"KI", "RKS":"Kosovo", "KWT":"KW", "KGZ":"KG", "LAO":"LA", "LVA":"LV", "LBN":"LB", "LSO":"LS", "LBR":"LR", "LBY":"LY", "LIE":"LI", "LTU":"LT", "LUX":"LU", "MAC":"MO", "MKD":"MK", "MDG":"MG", "MWI":"MW", "MYS":"MY", "MDV":"MV", "MLI":"ML", "MLT":"MT", "MHL":"MH", "MTQ":"MQ", "MRT":"MR", "MUS":"MU", "MYT":"YT", "MEX":"MX", "FSM":"FM", "UMI":"UM", "MDA":"MD", "MCO":"MC", "MNG":"MN", "MNE":"ME", "MSR":"MS", "MAR":"MA", "MOZ":"MZ", "MMR":"MM", "NAM":"NA", "NRU":"NR", "NPL":"NP", "NLD":"NL", "ANT":"AN", "NCL":"NC", "NZL":"NZ", "NIC":"NI", "NER":"NE", "NGA":"NG", "NIU":"NU", "NFK":"NF", "PRK":"KP", "MNP":"MP", "NOR":"NO", "OMN":"OM", "PAK":"PK", "PLW":"PW", "PSE":"PS", "PAN":"PA", "PNG":"PG", "PRY":"PY", "PER":"PE", "PHL":"PH", "PCN":"PN", "POL":"PL", "PRT":"PT", "PRI":"PR", "QAT":"QA", "REU":"RE", "ROU":"RO", "RUS":"RU", "RWA":"RW", "BLM":"BL", "SHN":"SH", "KNA":"KN", "LCA":"LC", "MAF":"MF", "SPM":"PM", "VCT":"VC", "WSM":"WS", "SMR":"SM", "STP":"ST", "SAU":"SA", "SEN":"SN", "SRB":"RS", "SYC":"SC", "SLE":"SL", "SGP":"SG", "SXM":"SX", "SVK":"SK", "SVN":"SI", "SLB":"SB", "SOM":"SO", "ZAF":"ZA", "SGS":"GS", "KOR":"KR", "SSD":"SS", "ESP":"ES", "LKA":"LK", "SDN":"SD", "SUR":"SR", "SJM":"SJ", "SWE":"SE", "CHE":"CH", "SYR":"SY", "TWN":"TW", "TJK":"TJ", "TZA":"TZ", "THA":"TH", "TLS":"TL", "TGO":"TG", "TKL":"TK", "TON":"TO", "TTO":"TT", "TUN":"TN", "TUR":"TR", "TKM":"TM", "TCA":"TC", "TUV":"TV", "UGA":"UG", "UKR":"UA", "ARE":"AE", "GBR":"GB", "USA":"US", "URY":"UY", "UZB":"UZ", "VUT":"VU", "VAT":"VA", "VEN":"VE", "VNM":"VN", "VGB":"VG", "VIR":"VI", "WLF":"WF", "ESH":"EH", "YEM":"YE", "ZMB":"ZM", "ZWE":"ZW"
  }
  return countryList[alpha3] ? countryList[alpha3] : alpha3;
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
  finalObj.incorporationCountry = alpha3toAlpha2(qtr?.sections?.companyInformation?.items?.countryOfIncorporation?.value);
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
      let attachmentProofOfIdentity = directorsItems['director'+i+'ProofOfIdentity']?.value
      let attachmentProofOfAddress = directorsItems['director'+i+'ProofOfAddress']?.value;
      let fullName = directorsItems['director'+i+'FullName']?.value
      let email = directorsItems['director'+i+'Email']?.value;
      let phoneNumber = directorsItems['director'+i+'PhoneNumber']?.value;
      if(attachmentProofOfIdentity || attachmentProofOfAddress || fullName || email || phoneNumber){
        finalObj.companyDirectors.push({attachmentProofOfIdentity, attachmentProofOfAddress, fullName, email, phoneNumber})
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
      let attachmentProofOfAddress = beneficiariesItems['beneficiary'+i+'ProofOfAddress']?.value;
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
      if(attachment || attachmentProofOfAddress || email || firstName || lastName || birthday || percentageOwned || ssn){
        finalObj.companyBeneficiaries.push({index:i, attachment, attachmentProofOfAddress, email, firstName, lastName, birthday, percentageOwned, ssn})
      }      
    }
  }

  //Required documents
  finalObj.proofAddressCompany_docId = qtr?.sections?.requiredDocuments?.items?.proofAddressCompany?.value;
  finalObj.incorporationCertificate_docId = qtr?.sections?.requiredDocuments?.items?.incorporationCertificate?.value;
  finalObj.articlesAssociationCopy_docId = qtr?.sections?.requiredDocuments?.items?.articlesAssociationCopy?.value;
  finalObj.boardApprovedListAuthUsers_docId = qtr?.sections?.requiredDocuments?.items?.boardApprovedListAuthUsers?.value;

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

function getOneApplicantData(applicantId){
  var method = 'get';
  var url = `/resources/applicants/${applicantId}/one`;

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

function testChangingTopLevelData(){
  var method = 'patch';
  var url = `/resources/applicants`;

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-App-Token': process.env.SUMSUB_APP_TOKEN
  };

  var requestBody = {
    id: '63208b8aa22f950001b40c78',
    questionnaires:[{"id":"poplar_questionnaire_3","sections":{"companyDirectors":{"items":{"director3ProofOfAddress":{},"director4FullName":{},"director8Email":{},"director5ProofOfIdentity":{},"director2Email":{},"director6FullName":{},"director8ProofOfAddress":{},"director2ProofOfIdentity":{},"director1Email":{"value":"director1@email.com"},"director7Email":{},"director8FullName":{},"director2ProofOfAddress":{},"director4ProofOfAddress":{},"director8PhoneNumber":{},"director10ProofOfAddress":{},"director8ProofOfIdentity":{},"director9ProofOfAddress":{},"director9PhoneNumber":{},"director3PhoneNumber":{},"director7ProofOfIdentity":{},"director1ProofOfAddress":{"value":"154382083"},"director5ProofOfAddress":{},"director3FullName":{},"director2PhoneNumber":{},"director1ProofOfIdentity":{"value":"148926926"},"director10FullName":{},"director6ProofOfIdentity":{},"director5FullName":{},"director7PhoneNumber":{},"director5Email":{},"director7FullName":{},"director1FullName":{"value":"First Director"},"director1PhoneNumber":{"value":"1111111111"},"director9FullName":{},"director9ProofOfIdentity":{},"director4Email":{},"director6ProofOfAddress":{},"director10PhoneNumber":{},"director4PhoneNumber":{},"director9Email":{},"director3ProofOfIdentity":{},"director10ProofOfIdentity":{},"director7ProofOfAddress":{},"director5PhoneNumber":{},"director10Email":{},"director4ProofOfIdentity":{},"director2FullName":{},"director6PhoneNumber":{},"director3Email":{},"director6Email":{}}},"requiredDocuments":{"items":{"proofAddressCompany":{"value":"1582938064"},"incorporationCertificate":{"value":"954122136"},"chkImportantInformation":{"value":"true"},"articlesAssociationCopy":{"value":"1542926828"},"chkCompanyNotAsShellBank":{"value":"true"},"boardApprovedListAuthUsers":{"value":"711010714"},"chkCompanyNotInSanctionedCountries":{"value":"true"},"chkCorrectInfo":{"value":"Hamdi Rizal"},"chkAcceptToc":{"value":"true"}}},"companyBeneficiaries":{"items":{"beneficiary1GovId":{},"beneficiary6Email":{},"beneficiary5SSN":{},"beneficiary9FullName":{},"beneficiary9SSN":{},"beneficiary3ProofOfAddress":{},"beneficiary7GovId":{},"beneficiary3DOB":{},"beneficiary10Percent":{},"beneficiary8ProofOfAddress":{},"beneficiary7Email":{},"beneficiary2SSN":{},"beneficiary6GovId":{},"beneficiary7DOB":{},"beneficiary4ProofOfAddress":{},"beneficiary10SSN":{},"beneficiary4Percent":{},"beneficiary6Percent":{},"beneficiary6SSN":{},"beneficiary8Percent":{},"beneficiary5GovId":{},"beneficiary2GovId":{},"beneficiary2FullName":{},"beneficiary1Email":{"value":"benef1@email.com"},"beneficiary4DOB":{},"beneficiary6FullName":{},"beneficiary2Percent":{},"beneficiary4FullName":{},"beneficiary3SSN":{},"beneficiary8GovId":{},"beneficiary9ProofOfAddress":{},"beneficiary8DOB":{},"beneficiary3Email":{},"beneficiary4GovId":{},"beneficiary7SSN":{},"beneficiary8FullName":{},"beneficiary5ProofOfAddress":{},"beneficiary9Email":{},"beneficiary9GovId":{},"beneficiary4Email":{},"beneficiary1DOB":{"value":"1988-10-01"},"beneficiary10Email":{},"beneficiary3GovId":{},"beneficiary10DOB":{},"beneficiary1ProofOfAddress":{"value":"600033069"},"beneficiary5DOB":{},"beneficiary9DOB":{},"beneficiary8SSN":{},"beneficiary1FullName":{"value":"Benef One"},"beneficiary5Percent":{},"beneficiary3FullName":{},"beneficiary4SSN":{},"beneficiary7Percent":{},"beneficiary9Percent":{},"beneficiary6ProofOfAddress":{},"beneficiary10GovId":{},"beneficiary2DOB":{},"beneficiary7FullName":{},"beneficiary1Percent":{"value":"70"},"beneficiary10FullName":{},"beneficiary10ProofOfAddress":{},"beneficiary2ProofOfAddress":{},"beneficiary7ProofOfAddress":{},"beneficiary3Percent":{},"beneficiary1SSN":{"value":"111111112"},"beneficiary2Email":{},"beneficiary8Email":{},"beneficiary5FullName":{},"beneficiary6DOB":{},"beneficiary5Email":{}}},"companyInformation":{"items":{"city":{"value":"My city"},"postalCode":{"value":"99999"},"legalNameOfEntity":{"value":"HamdiStagingTest"},"physicalLocationAddress":{},"jurisdictionOfTaxResidency":{},"websiteAddress":{},"description":{"value":"Hamdi staging test description"},"countryOfIncorporation":{"value":"US"},"taxIdentificationNumber":{},"stateOfIncorporation":{"value":"AK"},"registeredAddress":{"value":"my address"},"doingBusinessAs":{"value":"HStagingTest"},"entityAuthority":{},"entitysFirmType":{"value":"LLC"}}},"extra":{"items":{"referrer":{},"isAuthorizedSigner":{"value":"yes"},"poplarPointOfContact":{}}}}}]
  }



  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = JSON.stringify(requestBody);

  return config;
}


function testResettingQuestionnaire() {
  console.log('resetting a questionnaire')
  var method = 'post';
  var url = '/resources/applicants/63208b8aa22f950001b40c78/resetStep/QUESTIONNAIRE'
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


module.exports = {createApplicant, getApplicantDataByExternalId, createAccessToken, getApplicantReviewStatus, getApplicantSubmissionData, transformDataForExternalServices, getDocument, alpha3toAlpha2, getOneApplicantData, testChangingTopLevelData, testResettingQuestionnaire}