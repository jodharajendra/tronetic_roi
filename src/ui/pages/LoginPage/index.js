import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../api/services/AuthService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import { ProfileContext } from "../../../context/ProfileProvider";
import { $ } from "react-jquery-plugin";
const LoginPage = () => {
  const navigate = useNavigate();

  const loginid = localStorage.getItem("loginid");
  const [loginUsername, setLoginUsername] = useState(loginid);
  const [loginPassword, setLoginPassword] = useState("");
  const twoFactor = localStorage.getItem(['2fa']);

  const [googleCode, setGoogleCode] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = async (loginUsername, loginPassword) => {
    await AuthService.login(loginUsername, loginPassword).then(async result => {
      if (result?.insdata) {
        if (result.insdata.otp) {
          try {
            setIsAuth(true);
            $('#twofaModal').modal('show');
            localStorage.setItem("name", result.insdata.name);
            localStorage.setItem("emailId", result.insdata.emailId);
            localStorage.setItem("mobileNumber", result.insdata.mobileNumber);
            localStorage.setItem("loginid", result.insdata.loginid);
            localStorage.setItem("2fa", result.insdata?.['2fa']);
          } catch (error) {
            alertErrorMessage(error);
            console.log('error', `${error}`); 
          }
        } else {
          alertSuccessMessage(result?.insdata.message);
          localStorage.setItem("token", result.insdata.userdata.token);
          localStorage.setItem("name", result.insdata.userdata.name);
          localStorage.setItem("emailId", result.insdata.userdata.emailId);
          localStorage.setItem("mobileNumber", result.insdata.userdata.mobileNumber);
          localStorage.setItem("loginid", result.insdata.userdata.loginid);
          localStorage.setItem("2fa", result.insdata.userdata?.['2fa']);
          navigate("/dashboard");
        }
      }
      else {
        alertErrorMessage(result?.message);
      }
    });
  }


  const handlegoogleAuth = async (googleCode, loginid, twoFactor) => {
    await AuthService.googleAuth(googleCode, loginid, twoFactor).then(async result => {
      if (result?.insdata?.message === 'Login successful') {
        try {
          alertSuccessMessage(result?.insdata?.message);
          $('#twofaModal').modal('hide');
          localStorage.setItem("token", result?.insdata?.data?.token);
          navigate("/dashboard");
        } catch (error) {
          alertErrorMessage(error);
          console.log('error', `${error}`);
        }
      }
      else {
        alertErrorMessage(result?.message);
      }
    });
  }

  console.log(loginid, 'loginid');

  return (
    <div class="login-page">
      <div class="container d-flex align-items-center position-relative py-5">
        <div class="card shadow-sm w-100 rounded overflow-hidden bg-none">
          <div class="card-body p-0">
            <div class="row gx-0 align-items-stretch">
              {/* <!-- Logo & Information Panel--> */}
              <div class="col-12 text-center mb-5" >
                <img class="login_logo" src="img/brand/logo.png" />
              </div>
              <div class="col-lg-6">
                <div class="info d-flex justify-content-center text-center flex-column p-4 h-100">
                  <div class="py-5">
                    <h1 class="display-6 fw-bold">Login</h1>
                    <p class="fw-light mb-4">Sign In to your account</p>
                    <a href="/" class=" d-flex align-items-center justify-content-center m-auto btn btn-light" style={{ maxWidth: '180px' }}  >
                      <i class="fa fa-home me-2" ></i> Back to Home
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- Form Panel    --> */}
              <div class="col-lg-6 bg-white">
                <div class="d-flex align-items-center px-4 px-lg-5 h-100 bg-dash-dark-2">
                  <form class="login-form py-5 w-100" method="get">
                    <div class="input-material-group mb-3">
                      <input class="input-material" id="login-username" type="text" name="loginUsername" autocomplete="off" required data-validate-field="loginUsername" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                      <label class="label-material active" for="login-username">User Id</label>
                    </div>
                    <div class="input-material-group mb-4">
                      <input class="input-material" id="login-password" type="password" name="loginPassword" required data-validate-field="loginPassword" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                      <label class="label-material active" for="login-password">Password</label>
                    </div>

                    <div class="d-flex align-items-center justify-content-between" >
                      <button class="btn btn-primary mb-3" id="login" type="button" onClick={() => handleLogin(loginUsername, loginPassword)} >Login</button>
                      {/* <a class="btn btn-primary mb-3" id="login" href="/dashboard" >Login</a> */}
                      <a class="text-sm text-paleBlue" href="/forgotpassword">Forgot Password?</a>
                    </div>
                    <br /><br />

                    <div class="text-center" >
                      <small class="text-gray-500 me-2  ">Do not have an account? </small><a class="text-sm text-paleBlue" href="/signup">Register</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="twofaModal" tabindex="-1" aria-labelledby="twofaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="twofaModalLabel">Verify Two Factor Authentication</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-md-5">
              <div class="mb-3">
                <label class="form-label" for="2FA">Enter 2FA Code</label>
                <input class="form-control" id="2FA" type="text" aria-describedby="memberId" name="memberId" placeholder="Enter Code here.."
                  value={googleCode} onChange={(e) => setGoogleCode(e.target.value)} />
              </div>
              <button className="btn btn-primary btn-block w-100 mt-3" type="button" onClick={() => handlegoogleAuth(googleCode, loginid, twoFactor)}>
                Verify 2FA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;