const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

export const ROLES = {
  customer: "ROLE_CUSTOMER",
  admin: "ROLE_ADMIN",
  superadmin: "ROLE_SUPER_ADMIN",
};

export const USER = {
  getInitalInfo: BASE_URL + "/get-user-info",
  logout: BASE_URL + "/get-user-info/logout",
  newLoan: BASE_URL + "/customer-applications/add",
  loanList: BASE_URL + "/customer-applications/list",
  redirectToRent: BASE_URL + "/customer-applications/redirect",
  docUpload:
    "http://104.131.171.66:8000/api/v1" +
    "/customer-applications/document-upload",
  loanStatus: BASE_URL + "/customer-applications/status",
  loanDetailC: BASE_URL + "/customer-applications/get-detail",
  getFileUrl: BASE_URL + "/files/get-url",
  addressAPI: BASE_URL + "/address-api",
  postalCodeAPI: BASE_URL + "/address-api/postal-code",
  docRequestList: BASE_URL + "/document-request/customer",
  uploadDocumentRequest: BASE_URL + "/document-request/upload",
  uploadFile: BASE_URL + "/files/upload",
  withdrawRequest: BASE_URL + "/customer-applications/withdraw",
  uploadSummary: BASE_URL + "/customer-applications/document-summary-upload",

  bankStatementdocUpload:
    "http://104.131.171.66:8000/api/v1" + "/document/upload",
  bankStatementUpload:
    "http://104.131.171.66:8000/api/v1" + "/upload/bank/statement",
  licenseUpload: BASE_URL + "/upload/license",
};

export const ADMIN = {
  loanList: BASE_URL + "/admin/customer-applications",
  savingProgramsList:
    BASE_URL + "/admin/customer-applications/list/saving-programs",
  loanDetail: BASE_URL + "/admin/customer-applications/get-detail",
  homeStats: BASE_URL + "/admin/customer-applications/stats",
  updateStatus: BASE_URL + "/admin/customer-applications/change-status",
  plaidReports: BASE_URL + "/admin/customer-applications/plaid",
  plaidReportDetail: BASE_URL + "/admin/customer-applications/plaid/get-detail",
  getDocumentRequest: BASE_URL + "/document-request/get",
  addDocumentRequest: BASE_URL + "/document-request/request",
  creditReportList: BASE_URL + "/admin/credit-report",
  creditReport:
    BASE_URL + "/admin/customer-applications/credit-report/get-detail",
  deleteApplication:
    BASE_URL + "/admin/customer-applications/delete-customer-application",
  remarksLogs: BASE_URL + "/admin/customer-applications/remarks-log-list",
};
export const SUPERADMIN = {};
