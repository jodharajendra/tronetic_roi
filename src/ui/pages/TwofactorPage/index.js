import React, { useState, useEffect } from "react";
import AuthService from "../../../api/services/AuthService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
const TwofactorPage = () => {
    const [googleQr, setGoogleQr] = useState({});
    const [googleCode, setGoogleCode] = useState('');
    const [password, setPassword] = useState('');
    const [twoFactor, setTwoFactor] = useState('');

    /*  const twoFactor = localStorage.getItem(['2fa']); */


    useEffect(() => {
        handleQrDetials();
        handleDetials();
    }, [])


    const handleDetials = async () => {
        await AuthService.getDetails().then(async result => {
            if (result) {
                try {
                    setTwoFactor(result?.insdata?.['2fa'])
                } catch (error) {
                    alertErrorMessage(error);
                    console.log('error', `${error}`);
                }
            } else {
                alertErrorMessage(result?.message);
            }
        });

    }

    const handleQrDetials = async () => {
        await AuthService.getQrDetails().then(async result => {
            if (result) {
                try {
                    setGoogleQr(result?.insdata);
                } catch (error) {
                    alertErrorMessage(error);
                    console.log('error', `${error}`);
                }
            } else {
                alertErrorMessage(result?.message);
            }
        });
    }

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "googleCode":
                setGoogleCode(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleQrCode = async (googleCode, password, type) => {
        LoaderHelper.loaderStatus(true);
        await AuthService.handleGoogleQr(googleCode, password, type).then(async result => {
            if (result?.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage('Successfully Updated');
                    setGoogleCode("");
                    setPassword("");
                    handleDetials();
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
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
                        Two Factor Authentication
                    </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Account</li>
                        <li class="breadcrumb-item active" aria-current="page">2-Fa</li>
                    </ol>
                </nav>
            </div>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-6">
                            <div class="card  h-100">
                                <div class="card-header">
                                    <h3 class="h4 mb-0"> Two Factor Authentication </h3>
                                </div>
                                <div class="card-body pt-0  two_fa_text">
                                    <p> To setup two factor authentication, you first need to download Google Authenticator from: </p>
                                    <ul>
                                        <li><a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                                            target="_blank">Google Authenticator for Android</a></li>
                                        <li><a href="https://itunes.apple.com/us/app/google-authenticator/id388497605"
                                            target="_blank">Google Authenticator for IOS</a></li>
                                    </ul>
                                    <p>Then scan the below barcode or, if you are not able to scan barcode, you can enter the "Security
                                        Key" manually. <br />
                                        <small> Secret Code :</small>
                                    </p>
                                    <img src={googleQr} width="300" height="300" class="qr_img m-auto img-fluid my-4" />
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card  h-100 d-flex align-items-center justify-content-center">
                                <div>
                                    <div class="card-header">
                                        <h3 class="h4 mb-0"> Two Factor Authentication </h3>
                                    </div>
                                    <div class="card-body pt-0">
                                        <form>
                                            {
                                                twoFactor === 1 ? ""
                                                    : <div class="mb-3">
                                                        <label class="form-label" for="exampleInputMember">
                                                            6 digits code genderated by Google Authenticator*</label>
                                                        <input class="form-control" id="exampleInputMember" type="text" aria-describedby="Member" value={googleCode} name="googleCode" onChange={handleInputChange} />
                                                    </div>
                                            }
                                            <div class="mb-3">
                                                <label class="form-label" for="exampleInputEmail1">Password*</label>
                                                <input class="form-control" id="exampleInputEmail1" type="password" aria-describedby="password" value={password} name="password" onChange={handleInputChange} />
                                            </div>
                                            <>
                                                {
                                                    twoFactor === 0 ?
                                                        <button class='btn btn-primary btn-block w-100 mt-3' type="button" onClick={() => handleQrCode(googleCode, password, '1')}>Enable</button> :

                                                        <button class="btn btn-primary btn-block w-100 mt-3" type="button" onClick={() => handleQrCode(googleCode, password, '0')}>Disable</button>
                                                }
                                            </>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <span class="text-warning">Note</span>
                        <ul>
                            <li>Save this secret key for future reference</li>
                            <li>If you do not know to to use Google Authenticator, please <a
                                href="https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&amp;hl=en&amp;oco=0"
                                target="_blank">click here</a>.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TwofactorPage;