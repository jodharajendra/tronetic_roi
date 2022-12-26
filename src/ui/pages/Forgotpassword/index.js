import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../api/services/AuthService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import { validateEmail, notEqualsZero } from "../../../utils/Validation";
import OtpButton from "../../../customComponent/OtpButton";
import DefaultInput from "../../../customComponent/DefaultInput";
const Forgotpassword = () => {
    const [loginid, setLoginId] = useState();
    const [otp, setOtp] = useState();
    const [newPassword, setNewPassword] = useState();

    const [confirmPassword, setConfirmPassword] = useState();

    const navigate = useNavigate();

    const handleForgotPassword = async (loginid, otp, newPassword, confirmPassword) => {
        await AuthService.forgotPassword(loginid, otp, newPassword, confirmPassword).then(async result => {
            if (result?.success) {
                try {
                    alertSuccessMessage(result?.msg);
                    navigate("/login");
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

    const handleGetCode = async (loginid) => {
        await AuthService.sendCode(loginid).then(async result => {
            //console.log(result, 'loginD');
            if (result.message === "OTP Send Successfully") {
                try {
                    alertSuccessMessage(result.message);
                } catch (error) {
                    alertErrorMessage(result.message);
                }
            } else {
                alertErrorMessage(result.message);
            }
        });
    }



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
                                        <h1 class="display-6 fw-bold">Forgot Password</h1>
                                        <p class="fw-light mb-4">Forgot to your account</p>
                                        <a href="/" class=" d-flex align-items-center justify-content-center m-auto btn btn-light" style={{ maxWidth: '180px' }}  >
                                            <i class="fa fa-home me-2" ></i> Back to Home
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Form Panel    --> */}
                           
                            <div class="col-lg-6 bg-white">
                                <div class="d-flex align-items-center px-4 px-lg-5 h-100 bg-dash-dark-2">
                                    <form class="login-form py-5 w-100">



                                        <div className="row" >
                                            <div className="col-9" >
                                                <div class="input-material-group mb-3">
                                                    <input class="input-material" id="loginid" type="text" name="loginid" autocomplete="off" required data-validate-field="loginid" value={loginid} onChange={(e) => setLoginId(e.target.value)} />
                                                    <label class="label-material" for="email">Enter Login ID</label>
                                                </div>
                                            </div>
                                            <div className="col-3" >
                                                <button className="btn btn-primary btn-block mt-3 w-100 btn-sm" type="button"  disabled={!loginid}  onClick={() => handleGetCode(loginid)}>GET OTP</button>
                                            </div>
                                            <div className="col-12" >
                                                <div class="input-material-group mb-3">
                                                    <input class="input-material" id="otp" type="text" name="otp" autocomplete="off" required data-validate-field="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                                    <label class="label-material" for="otp">Enter OTP</label>
                                                </div>
                                            </div>
                                            <div className="col-12" >
                                                <div class="input-material-group mb-3">
                                                    <input class="input-material" id="newPassword" type="text" name="newPassword" autocomplete="off" required data-validate-field="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                                    <label class="label-material" for="email">Enter NewPassword</label>
                                                </div>
                                            </div>
                                            <div className="col-12" >
                                                <div class="input-material-group mb-3">
                                                    <input class="input-material" id="confirmPassword" type="text" name="confirmPassword" autocomplete="off" required data-validate-field="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                    <label class="label-material" for="email">Enter Confirm Password</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-flex align-items-center justify-content-between" >
                                            <button class="btn btn-primary mb-3" id="Register" type="button" onClick={() => handleForgotPassword(loginid, otp, newPassword, confirmPassword)}>Change Password</button>
                                        </div>


                                        <br />
                                        <br />
                                        <div class="text-center" >
                                            <small class="text-gray-500 me-2">Already have an account? </small>
                                            <a class="text-sm text-paleBlue" href="/login">Login</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default Forgotpassword;