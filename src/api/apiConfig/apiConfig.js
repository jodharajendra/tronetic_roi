const appUrl = 'http://35.77.117.238:3004'

export const ApiConfig = {
  // =========EndPoints==========
  login: 'login',
  register: "signup",
  updateProfile: 'editprofile',
  getDetails: 'userdetails/getdetails',
  changepassword: 'changepassword',
  changetranspass: 'changetranspass',
  generategoogleqr: 'generategoogleqr',
  update2fa: 'update2fa',
  sendotp: 'sendotp',
  leftrefercode: 'refer/leftrefercode',
  rightrefercode: 'refer/rightrefercode',
  verifyotp: 'verifyotp',
  directreferral: 'directreferral',
  genealogydetails: 'genealogydetails',
  userTreeDetails: 'usertree',
  withdraw: 'withdrawincome',
  withdrawalHistory: 'withdrawalHistory',
  buyDetails: 'selectstackingpackage',
  userbalance: 'userbalance',
  userleftrightteam: 'userleftrightteam',
  userstackinghistory: 'userstackinghistory',
  alltransactions: 'alltransactions',
  getnotifcation: 'getnotifcation',
  miningreward: 'miningreward',
  recommendationbonus: 'recommendationbonus',
  alldownline: 'alldownline',
  getnsdtprices: 'getnsdtprices',
  matchingbonus: 'matchingbonus',
  fotgotpassword: 'fotgotpassword',
  incomewalletdetails: 'incomewalletdetails',
  // ============URLs================
  baseUrl: `${appUrl}/`,
  baseRegister: `${appUrl}/register/`,
  baseDetails: `${appUrl}/userdetails/`,
  baseWallet: `${appUrl}/wallet/`,
  baseAdmin: `${appUrl}/admin/`,


};