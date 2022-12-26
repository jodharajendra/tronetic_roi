import react from "react";

const MailVerify = () => {
    const loginid = localStorage.getItem("loginid");
    const emailId = localStorage.getItem("emailId");
    const transactionPassword = localStorage.getItem("transactionPassword");

    return (
        <>
             <div class="login-page">
                <div class="container d-flex align-items-center position-relative py-5">
                    <div class="card shadow-sm w-100 rounded overflow-hidden bg-none">
                    <div class="card-body p-0">
                        <div class="row gx-0 align-items-stretch">
                        {/* <!-- Logo & Information Panel--> */}
                        
                        <div class="col-lg-6">
                            <div class="info d-flex justify-content-center text-center flex-column p-5 h-100">
                            <div class="py-5">
                                <h1 class="display-6 fw-bold">Welcome to Tronnetic ROI</h1>
                                <p class=" mb-4"> <strong>Your email address is successfully confirmed and verified by Tronnetic ROI</strong> </p>

                                <hr/>


                                <p className="" >A welcome message has been sent to your email id. Registration detail as follow <br/> (Please note all the detail and change password after login.)</p>
                            </div>
                            </div>
                        </div>
                        {/* <!-- Form Panel    --> */}
                        <div class="col-lg-6 bg-white">
                            <div class="d-flex align-items-center px-4 px-lg-5 h-100 bg-dash-dark-2  ">
                                

                                <div className="Tronnetic ROI_task_login" >
                                    <ul >
                                        <li>
                                            <span>Email id :</span> <strong>{emailId}</strong>
                                        </li>
                                        <li>
                                            <span>Account login id :</span> <strong>{loginid}</strong>
                                        </li>
                                        {/* <li>
                                            <span>Login Password :</span> <strong>testing@mailinator.com</strong>
                                        </li> */}
                                        <li>
                                            <span>Transaction Password :</span> <strong>{transactionPassword}</strong>
                                        </li>
                                        {/* <li>
                                            <span>Email id :</span> <strong>testing@mailinator.com</strong>
                                        </li> */}
                                    </ul>


                                    <p className="mt-4" >
                                        <small>
                                            (Please Note this information private only, Do not share with anyone, 
                                            If you loose your transaction password you will lose your funds.)
                                        </small>
                                    </p>

                                    


                                    <p className="mt-4" >
                                        <small>
                                        Click the link below to login account.
                                        </small>
                                    </p>

                                    <a  href="/login" className="btn  btn-primary mb-4">
                                    Log In Now             
                                    </a>



                                    <hr/>


                                    <p  className="text-center">
                                        <small>
                                        The Tronnetic ROI Team <br/> © 2022 Tronnetic ROI,  All rights reserved.
                                        </small>
                                    </p>





                                </div>

                                
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MailVerify;