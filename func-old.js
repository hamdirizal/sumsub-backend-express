transformDataForExternalServices(
  applicantData: I.ApplicantDataInterface,
): I.TransformedDataInterface {
  const finalObj: I.TransformedDataInterface = {} as I.TransformedDataInterface;

  finalObj.sumsubId = applicantData?.id;
  finalObj.externalUserId = applicantData?.externalUserId; // This is user id
  finalObj.inspectionId = applicantData?.inspectionId;
  finalObj.email = applicantData?.email;
  finalObj.phone = applicantData?.phone;
  finalObj.birthday = applicantData?.info?.dob;
  finalObj.firstName = applicantData?.info?.firstName;
  finalObj.lastName = applicantData?.info?.lastName;
  finalObj.middleName = applicantData?.info?.middleName;
  finalObj.fullName = `${finalObj.firstName} ${finalObj.middleName} ${finalObj.lastName}`;

  // If exists, hold questionnaire-object in this variable, otherwise just hold empty object.
  const qtr: I.Questionnaire = (applicantData.questionnaires &&
  Array.isArray(applicantData.questionnaires) &&
  applicantData.questionnaires[0]
    ? applicantData.questionnaires[0]
    : {}) as I.Questionnaire;

  finalObj.referrer = qtr?.sections?.extra?.items?.referrer?.value;
  finalObj.pointOfContact =
    qtr?.sections?.extra?.items?.poplarPointOfContact?.value;
  finalObj.check1_CompanyNotInSanctionedCountries =
    qtr?.sections?.requiredDocuments?.items?.chkCompanyNotInSanctionedCountries?.value;
  finalObj.check2_CompanyNotAsShellBank =
    qtr?.sections?.requiredDocuments?.items?.chkCompanyNotAsShellBank?.value;
  finalObj.check3_AcceptToc =
    qtr?.sections?.requiredDocuments?.items?.chkAcceptToc?.value;
  finalObj.check4_ImportantInformation =
    qtr?.sections?.requiredDocuments?.items?.chkImportantInformation?.value;
  finalObj.check5_FullName =
    qtr?.sections?.requiredDocuments?.items?.chkCorrectInfo?.value;

  finalObj.isAuthorizedSigner =
    qtr?.sections?.extra?.items?.isAuthorizedSigner?.value;
  finalObj.entityLegalname =
    qtr?.sections?.companyInformation?.items?.legalNameOfEntity?.value;
  finalObj.dba =
    qtr?.sections?.companyInformation?.items?.doingBusinessAs?.value;
  finalObj.websiteAddress =
    qtr?.sections?.companyInformation?.items?.websiteAddress?.value;
  finalObj.entityFirmType =
    qtr?.sections?.companyInformation?.items?.entitysFirmType?.value;
  finalObj.description =
    qtr?.sections?.companyInformation?.items?.description?.value;
  finalObj.incorporationCountry = this.alpha3toAlpha2(
    qtr?.sections?.companyInformation?.items?.countryOfIncorporation?.value,
  );
  finalObj.incorporationState = this.stateNameToAlpha2(
    qtr?.sections?.companyInformation?.items?.stateOfIncorporation?.value,
  );
  finalObj.registeredAddress =
    qtr?.sections?.companyInformation?.items?.registeredAddress?.value;
  finalObj.physicalLocationAddress =
    qtr?.sections?.companyInformation?.items?.physicalLocationAddress?.value;
  finalObj.jurisdictionTaxResidency =
    qtr?.sections?.companyInformation?.items?.jurisdictionOfTaxResidency?.value;
  finalObj.taxIdentification =
    qtr?.sections?.companyInformation?.items?.taxIdentificationNumber?.value;
  finalObj.entityAuthority =
    qtr?.sections?.companyInformation?.items?.entityAuthority?.value;
  finalObj.postalCode =
    qtr?.sections?.companyInformation?.items?.postalCode?.value;
  finalObj.city = qtr?.sections?.companyInformation?.items?.city?.value;

  //Directors data
  finalObj.companyDirectors = [];
  const directorsFieldsCount = 10;
  let directorsItems = qtr?.sections?.companyDirectors?.items;
  if (
    directorsItems &&
    typeof directorsItems === 'object' &&
    directorsItems !== null
  ) {
    for (let i = 1; i <= directorsFieldsCount; i++) {
      const attachmentProofOfIdentity = directorsItems['director'+i+'ProofOfIdentity']?.value
      const attachmentProofOfAddress = directorsItems['director'+i+'ProofOfAddress']?.value;
      const fullName = directorsItems['director' + i + 'FullName']?.value;
      const email = directorsItems['director' + i + 'Email']?.value;
      const phoneNumber =
        directorsItems['director' + i + 'PhoneNumber']?.value;
      if (attachmentProofOfIdentity || attachmentProofOfAddress || fullName || email || phoneNumber) {
        finalObj.companyDirectors.push({ attachmentProofOfIdentity, attachmentProofOfAddress, fullName, email, phoneNumber });
      }
    }
  }

  //Beneficiaries data
  finalObj.companyBeneficiaries = [];
  const beneficiariesFieldsCount = 10;
  const beneficiariesItems = qtr?.sections?.companyBeneficiaries?.items;
  if (
    beneficiariesItems &&
    typeof beneficiariesItems === 'object' &&
    beneficiariesItems !== null
  ) {
    for (let i = 1; i <= beneficiariesFieldsCount; i++) {
      const attachment =
        beneficiariesItems['beneficiary' + i + 'GovId']?.value;
      const attachmentProofOfAddress = beneficiariesItems['beneficiary'+i+'ProofOfAddress']?.value;
      const email = beneficiariesItems['beneficiary' + i + 'Email']?.value;
      let fullName =
        beneficiariesItems['beneficiary' + i + 'FullName']?.value;
      try {
        fullName = fullName.replace(/ {2,}/g, ' ');
      } catch (error) {}
      let firstName;
      let lastName;
      try {
        let nameArr = fullName.split(' ');
        firstName = nameArr[0];
        lastName = nameArr[nameArr.length - 1];
      } catch (error) {}
      let birthday = beneficiariesItems['beneficiary' + i + 'DOB']?.value;
      let percentageOwned =
        beneficiariesItems['beneficiary' + i + 'Percent']?.value;
      let ssn = beneficiariesItems['beneficiary' + i + 'SSN']?.value;
      if (
        attachment ||
        attachmentProofOfAddress ||
        email ||
        firstName ||
        lastName ||
        birthday ||
        percentageOwned ||
        ssn
      ) {
        finalObj.companyBeneficiaries.push({
          attachment,
          attachmentProofOfAddress,
          email,
          firstName,
          lastName,
          birthday,
          percentageOwned,
          ssn,
        });
      }
    }
  }

  //Required documents
  finalObj.proofAddressCompany_docId =
    qtr?.sections?.requiredDocuments?.items?.proofAddressCompany?.value;
  finalObj.incorporationCertificate_docId =
    qtr?.sections?.requiredDocuments?.items?.incorporationCertificate?.value;
  finalObj.certifiedIdentityDirectors_docId =
    qtr?.sections?.requiredDocuments?.items?.certifiedIdentityDirectors?.value;
  finalObj.articlesAssociationCopy_docId =
    qtr?.sections?.requiredDocuments?.items?.articlesAssociationCopy?.value;
  finalObj.boardApprovedListAuthUsers_docId =
    qtr?.sections?.requiredDocuments?.items?.boardApprovedListAuthUsers?.value;

  return finalObj;
}