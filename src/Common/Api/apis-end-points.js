// this is our base url or machine api
const baseURL = "http://192.168.18.241";

// this is our service URLs
const authenticationServiceURL = ":10001/ERM_Auth";
const baseauthsign = ":10001/ERM_Auth";
const findCustomerFromMisysServiceURL = ":9001/WOF_Search";
const findCustomerAccountDetailsFromMisysServiceURL = ":9001/WOF_Search";
const WriteOffServiceURL = ":9002/WOF_Persist";
const ApprovalsServiceURL = ":9003/WOF_Approvals";
const reportsURL = ":9004/WOF_Reports";
const SetupFormsUrl = ":10002/Fraud_Admin";
const downloadExcelURL = ":10010/ExcelReport";
const investigationOfficerURL = ":10003/Fraud_CCService";
const investigationOfficerURLDC = ":10004/Fraud_DCService";
const investigationOfficerURLADC = ":10005/Fraud_ADCService";
const investigationOfficerURLBBK = ":10007/Fraud_BBKonnect";
const investigationOfficerURLNONAPI = ":10008/Fraud_NPIService";
const investigationManagerURL = ":10006/Fraud_Approval";
const investigationOfficerURLNDB = ":10009/Fraud_NegativeDatabase";

// this is our final Apis
const authenticationApi = baseURL + authenticationServiceURL;
const abcactionauth = baseURL + baseauthsign;
const findCustomerFromMisysApi = baseURL + findCustomerFromMisysServiceURL;
const findCustomerAccountDetailsFromMisysApi =
  baseURL + findCustomerAccountDetailsFromMisysServiceURL;
const WriteOffApi = baseURL + WriteOffServiceURL;
const SetupFormApi = baseURL + SetupFormsUrl;
const ApprovalsApi = baseURL + ApprovalsServiceURL;
const reportsApi = baseURL + reportsURL;
const downloadExcelFile = baseURL + downloadExcelURL;
const InvestigationOfficerAPI = baseURL + investigationOfficerURL;
const InvestigationOfficerAPIDC = baseURL + investigationOfficerURLDC;
const InvestigationOfficerAPIADC = baseURL + investigationOfficerURLADC;
const InvestigationOfficerAPIBBK = baseURL + investigationOfficerURLBBK;
const InvestigationManagerAPI = baseURL + investigationManagerURL;

export {
  authenticationApi,
  findCustomerFromMisysApi,
  findCustomerAccountDetailsFromMisysApi,
  WriteOffApi,
  ApprovalsApi,
  reportsApi,
  SetupFormApi,
  downloadExcelFile,
  abcactionauth,
  InvestigationOfficerAPI,
  InvestigationOfficerAPIDC,
  InvestigationOfficerAPIADC,
  InvestigationOfficerAPIBBK,
  InvestigationManagerAPI,
};
