import { ApiConfig } from "../apiConfig/apiConfig"
import { ApiCallPost, ApiCallGet } from "../apiConfig/apiCall"
import { ConsoleLogs } from "../../utils/ConsoleLogs";

const TAG = 'AuthService';
const loginid = localStorage.getItem("loginid");

const AuthService = {

  login: async (loginUsername, loginPassword) => {
    const { baseRegister, login } = ApiConfig;
    const url = baseRegister + login;
    const params = {
      loginid: loginUsername,
      password: loginPassword,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return ApiCallPost(url, params, headers);
  },

  register: async (sponserId, password, position, countryCode, userName, email, otp, country, mobileNumber, cPassword, transactionpassword) => {
    const { baseRegister, register } = ApiConfig;
    const url = baseRegister + register;
    const params = {
      sponsercode: sponserId,
      password: password,
      position: position,
      cCode: countryCode,
      name: userName,
      emailId: email,
      Otp: otp,
      country: country,
      mobileNumber: mobileNumber,
      confirmPass: cPassword,
      transactionPassword: transactionpassword,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return ApiCallPost(url, params, headers);
  },

  googleAuth: async (googleCode, loginid, twoFactor) => {
    const { baseRegister, verifyotp } = ApiConfig;
    const url = baseRegister + verifyotp;
    const params = {
      otp: googleCode,
      loginid: loginid,
      type: twoFactor,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return ApiCallPost(url, params, headers);
  },

  updateProfile: async (email, userName, countryCode, mobile, country, state, city, address) => {
    const token = localStorage.getItem('token');
    const { baseRegister, updateProfile } = ApiConfig;
    const url = baseRegister + updateProfile;
    const params = {
      emailId: email,
      name: userName,
      cCode: countryCode,
      mobileNumber: mobile,
      country: country,
      state: state,
      city: city,
      blockauraaddress: address
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getDetails: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, getDetails } = ApiConfig;
    const url = baseUrl + getDetails;
    const params = {};
    ConsoleLogs(TAG + ', getNotifications', `url : ' + ${url}`);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  changePassword: async (otp, currentPassword, password, cPassword) => {
    const token = localStorage.getItem('token');
    const { baseRegister, changepassword } = ApiConfig;
    const url = baseRegister + changepassword;
    const params = {
      otp: otp,
      currentPassword: currentPassword,
      newPassword: password,
      confirmPassword: cPassword,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  changeTransPass: async (otp, newTpassword, confirmTransPass) => {
    const token = localStorage.getItem('token');
    const { baseRegister, changetranspass } = ApiConfig;
    const url = baseRegister + changetranspass;
    const params = {
      otp: otp,
      newTransPass: newTpassword,
      confirmTransPass: confirmTransPass
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getQrDetails: async () => {
    const token = localStorage.getItem("token");
    const { baseRegister, generategoogleqr } = ApiConfig;
    const url = baseRegister + generategoogleqr;
    const params = {};
    ConsoleLogs(TAG + ',generategoogleqr', `url : ' + ${url}`);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  handleGoogleQr: async (googleCode, password, type) => {
    const token = localStorage.getItem('token');
    const { baseRegister, update2fa } = ApiConfig;
    const url = baseRegister + update2fa;
    const params = {
      code: googleCode,
      password: password,
      status: type,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  sendCode: async (loginid) => {
    const token = localStorage.getItem('token');
    const { baseRegister, sendotp } = ApiConfig;
    const url = baseRegister + sendotp;
    const params = {
      loginid: loginid,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  referralLeft: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, leftrefercode } = ApiConfig;
    const url = baseUrl + leftrefercode;
    const params = {

    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  referralRight: async () => {
    const token = localStorage.getItem("token");
    const { baseUrl, rightrefercode } = ApiConfig;
    const url = baseUrl + rightrefercode;
    const params = {

    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getRefrelsList: async () => {
    const token = localStorage.getItem("token");
    const { baseDetails, directreferral } = ApiConfig;
    const url = baseDetails + directreferral;
    const params = {
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getGenealogyList: async (loginid) => {
    const token = localStorage.getItem("token");
    const { baseDetails, genealogydetails } = ApiConfig;
    const url = baseDetails + genealogydetails;
    const params = {
      loginid,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };
    return ApiCallPost(url, params, headers);
  },

  getSearchGenealogy: async (genologySearch, loginid) => {
    const token = localStorage.getItem("token");
    const { baseDetails, genealogydetails } = ApiConfig;
    const url = baseDetails + genealogydetails;
    const params = {
      sLogin: genologySearch,
      loginid: loginid
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };
    return ApiCallPost(url, params, headers);
  },

  getGenealogyTree: async (loginid) => {
    const token = localStorage.getItem("token");
    const { baseDetails, userTreeDetails } = ApiConfig;
    const url = baseDetails + userTreeDetails;
    const params = {
      loginid,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  withdrawIncome: async (walletType, walletAddr, amount, otp, transtionPass, transtionHash, admintxHash) => {
    const token = localStorage.getItem('token');
    const { baseWallet, withdraw } = ApiConfig;
    const url = baseWallet + withdraw;
    const params = {
      wallType: walletType,
      withdrawalAddress: walletAddr,
      amount: amount,
      otp: otp,
      transactionPassword: transtionPass,
      txHash: transtionHash,
      admintxHash: admintxHash
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getWithdrawHistory: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, withdrawalHistory } = ApiConfig;
    const url = baseWallet + withdrawalHistory;
    const params = {
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  AddbuyDetails: async (starter, nsdtAmount, usdtAmount, depositBlockAura, senderAddress, transtionHash) => {
    const token = localStorage.getItem('token');
    const { baseWallet, buyDetails } = ApiConfig;
    const url = baseWallet + buyDetails;
    const params = {
      packagetype: starter,
      nsdtAmount: nsdtAmount,
      usdtAmount: usdtAmount,
      depositAddress: depositBlockAura,
      senderAddress: senderAddress,
      transactionHash: transtionHash
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getUserBalance: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, userbalance } = ApiConfig;
    const url = baseWallet + userbalance;
    const params = {
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getUserLeftRight: async () => {
    const token = localStorage.getItem("token");
    const { baseDetails, userleftrightteam } = ApiConfig;
    const url = baseDetails + userleftrightteam;
    const params = {
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getStakeHistory: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, userstackinghistory } = ApiConfig;
    const url = baseWallet + userstackinghistory;
    const params = {};
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getTransationHistory: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, alltransactions } = ApiConfig;
    const url = baseWallet + alltransactions;
    const params = {};
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getNotificationHistory: async () => {
    const token = localStorage.getItem("token");
    const { baseDetails, getnotifcation } = ApiConfig;
    const url = baseDetails + getnotifcation;
    const params = {};
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getMiningReward: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, miningreward } = ApiConfig;
    const url = baseWallet + miningreward;
    const params = {};
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getCommandBonus: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, recommendationbonus } = ApiConfig;
    const url = baseWallet + recommendationbonus;
    const params = {};
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getAllDownline: async () => {
    const token = localStorage.getItem("token");
    const { baseDetails, alldownline } = ApiConfig;
    const url = baseDetails + alldownline;
    const params = {};
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  getNsdtAmount: async () => {
    const token = localStorage.getItem("token");
    const { baseAdmin, getnsdtprices } = ApiConfig;
    const url = baseAdmin + getnsdtprices;
    const params = {};
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },


  getGenealogyTreeSearch: async (loginid) => {
    const token = localStorage.getItem("token");
    const { baseDetails, userTreeDetails } = ApiConfig;
    const url = baseDetails + userTreeDetails;
    const params = {
      loginid,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },

  forgotPassword: async (loginid, otp, newPassword, confirmPassword) => {
    const { baseRegister, fotgotpassword } = ApiConfig;
    const url = baseRegister + fotgotpassword;
    const params = {
      loginid: loginid,
      otp: otp,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return ApiCallPost(url, params, headers);
  },


  getCode: async (email) => {
    const { baseRegister, sendotp } = ApiConfig;
    const url = baseRegister + sendotp;
    const params = {
      emailId: email,
    };
    ConsoleLogs(TAG + ', forgotpassword', `url : ' + ${url}`);
    ConsoleLogs(
      TAG + ', forgotpassword',
      `loginRequestParams : ' + ${JSON.stringify(params)}`,
    );
    const headers = {
      'Content-Type': 'application/json',
    };

    return ApiCallPost(url, params, headers);
  },


  getMatchingBonus: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, matchingbonus } = ApiConfig;
    const url = baseWallet + matchingbonus;
    const params = {};
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  },


  getIncomewalletdetails: async () => {
    const token = localStorage.getItem("token");
    const { baseWallet, incomewalletdetails } = ApiConfig;
    const url = baseWallet + incomewalletdetails;
    const params = {};
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return ApiCallPost(url, params, headers);
  }

}

export default AuthService;