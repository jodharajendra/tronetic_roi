import React, { useState, useMemo, useEffect } from "react";
import AuthService from "../../../api/services/AuthService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import GetcodeButton from "../../../customComponent/GetcodeButton";
const ChangePassword = () => {

    const [otp, setOtp] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const loginid = localStorage.getItem("loginid");

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "otp":
                setOtp(event.target.value);
                break;
            case "currentPassword":
                setCurrentPassword(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            case "cPassword":
                setCpassword(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleResetInput = () => {
        setOtp("");
        setCurrentPassword("");
        setPassword("");
        setCpassword("");
    }

    const handleChangePassword = async (otp, currentPassword, password, cPassword) => {
        LoaderHelper.loaderStatus(true);
        await AuthService.changePassword(otp, currentPassword, password, cPassword).then(async result => {
            if (result?.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.message);
                    handleResetInput();
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result?.message);
            }
        });
    }

    const handleGetCode = async (loginid) => {
        await AuthService.sendCode(loginid).then(async result => {
            if (result.message === "OTP Send Successfully") {
                try {
                    alertSuccessMessage(result.message);
                } catch (error) {
                    //console.log('error', `${error}`);
                }
            } else {
                alertErrorMessage(result.message);
            }
        });
    }

    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0">
                        {/* <a href="index.html" ><i class="fas fa-arrow-left me-2" ></i></a> */}
                        Change Password
                    </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Account</li>
                        <li class="breadcrumb-item active" aria-current="page">Change Password</li>
                    </ol>
                </nav>
            </div>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-6 m-auto">
                            <div class="card  h-100">
                                <div class="card-header">
                                    <h3 class="h4 mb-0">Change Password</h3>
                                </div>
                                <div class="card-body pt-0">
                                    <form>
                                        <div class="mb-3">
                                            <div className="form-group ">
                                                <label class="form-label" for="exampleInputOTP">Enter OTP</label>
                                                <div className="input-group" >
                                                    <input class="form-control" id="exampleInputOTP" type="number" aria-describedby="OTP"
                                                        name="otp" value={otp} onChange={handleInputChange} />
                                                    <GetcodeButton className="btn btn-primary mb-0" 
                                                        onClick={() => handleGetCode(loginid)}>
                                                        <span>Get Code</span>
                                                    </GetcodeButton>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputMember">Enter Current password</label>
                                            <input class="form-control" id="exampleInputMember" type="password" aria-describedby="Member"
                                                name="currentPassword" value={currentPassword} onChange={handleInputChange} />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputEmail1">Enter New Password</label>
                                            <input class="form-control" id="exampleInputEmail1" type="password" aria-describedby="Email"
                                                name="password" value={password} onChange={handleInputChange} />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputName">Confirm New Password</label>
                                            <input class="form-control" id="exampleInputName" type="password" aria-describedby="Name"
                                                name="cPassword" value={cPassword} onChange={handleInputChange} />
                                        </div>
                                        <button class="btn btn-primary" type="button" onClick={() => handleChangePassword(otp, currentPassword, password, cPassword)}>Change Password</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ChangePassword;