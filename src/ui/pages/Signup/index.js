import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../api/services/AuthService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import countryList from 'react-select-country-list';
import { validateEmail, notEqualsZero } from "../../../utils/Validation";
import OtpButton from "../../../customComponent/OtpButton";
import DefaultInput from "../../../customComponent/DefaultInput";
const Signup = () => {
    const options = useMemo(() => countryList().getData(), [])
    const ref = window.location.href.split("=")[1];

    const selectedPosition = ref?.split('_');

    const navigate = useNavigate();
    const [sponserId, setSponserId] = useState(ref);
    const [password, setPassword] = useState("");
    const [position, setPosition] = useState(!ref ? "" : selectedPosition?.[1] === '0' ? 'Left' : 'Right');
    const [countryCode, setCountryCode] = useState("+91");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("india");
    const [mobileNumber, setMobileNumber] = useState("");
    const [cPassword, setCpassword] = useState("");
    const [transactionpassword, setTransactionpassword] = useState("");
    const [otp, setOtp] = useState("");


    const handleRegister = async (sponserId, password, position, countryCode, userName, email, otp, country, mobileNumber, cPassword, transactionpassword) => {
        LoaderHelper.loaderStatus(true);
        await AuthService.register(sponserId, password, position, countryCode, userName, email, otp, country, mobileNumber, cPassword, transactionpassword).then(async result => {
            if (result.message === "Registration Successful") {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.message);
                    localStorage.setItem("loginid", result.data.loginid);
                    localStorage.setItem("emailId", result.data.emailId);
                    localStorage.setItem("transactionPassword", result.data.transactionPassword);
                    navigate("/mail_verify");
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    }

    const handleGetCode = async (email) => {
        await AuthService.getCode(email).then(async result => {
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



    // console.log(selectedPosition?.[1] === '0' ? 'left' : 'right');

    return (

        <div class="login-page">
            <div class="container d-flex align-items-center position-relative py-5">
                <div class="card shadow-sm w-100 rounded overflow-hidden bg-none">
                    <div class="card-body p-0">
                        <div class="row gx-0 align-items-stretch">
                            <div class="col-12 text-center mb-5" >
                                <img class="login_logo" src="img/brand/logo.png" />
                            </div>
                            <div class="col-lg-6">
                                <div class="info d-flex justify-content-center text-center flex-column p-4 h-100">
                                    <div class="py-5">
                                        <h1 class="display-6 fw-bold">Register</h1>
                                        <p class="fw-light mb-4">Create  your account</p>
                                        <a href="/" class=" d-flex align-items-center justify-content-center m-auto btn btn-light" style={{ maxWidth: '180px' }}>
                                            <i class="fa fa-home me-2" ></i> Back to Home
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 bg-white">
                                <div class="d-flex align-items-center px-4 px-lg-5 h-100 bg-dash-dark-2">
                                    <form class="login-form py-5 w-100">
                                        <div class="input-material-group mb-3">
                                            {sponserId?.length < 10 ?
                                                <input class="input-material" id="sponser_id" type="text" name="sponserId" autocomplete="off" value={sponserId} onChange={(e) => setSponserId(e.target.value)} />
                                                :
                                                <input class="input-material" id="sponser_id" type="text" name="sponserId" autocomplete="off" value={sponserId} onChange={(e) => setSponserId(e.target.value)} disabled={sponserId} />
                                            }

                                            <label class="label-material active" for="sponser_id">Sponser Id</label>
                                        </div>
                                        <div class="input-material-group mb-3">
                                            <select class="input-material" id="inlineFormSelectPref" name="position" value={position} onChange={(e) => setPosition(e.target.value)}>
                                                {
                                                    !ref ?
                                                        <>
                                                            <option selected> Select Position</option>
                                                            <option value="Left">Left</option>
                                                            <option value="Right">Right</option>
                                                        </>



                                                        : selectedPosition?.[1] === '0' ? <option value="Left">Left</option> : <option value="Right">Right</option>
                                                }
                                            </select>
                                        </div>
                                        <div class="input-material-group mb-3">
                                            <input class="input-material" id="username" type="text" name="userName" autocomplete="off" required data-validate-field="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                            <label class="label-material active" for="username" >Enter Name</label>
                                        </div>

                                        <div className="row" >
                                            <div className="col-9" >
                                                <div class="input-material-group mb-3">

                                                    <DefaultInput
                                                        errorStatus={
                                                            validateEmail(email) &&
                                                            notEqualsZero(email)
                                                        }
                                                        errorMessage={validateEmail(email)}
                                                        class="input-material" id="email" type="text" name="email" autocomplete="off" required data-validate-field="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                    />

                                                    {/* <input class="input-material" id="email" type="text" name="email" autocomplete="off" required data-validate-field="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}


                                                    <label class="label-material" for="email">Enter Email</label>
                                                </div>
                                            </div>
                                            <div className="col-3" >

                                                <OtpButton
                                                    disabled={!email

                                                        || !(
                                                            validateEmail(email) === undefined

                                                        )
                                                    }
                                                    onClick={() => handleGetCode(email)}>Verify
                                                </OtpButton>

                                                {/* <button className="btn btn-primary btn-block mt-3 w-100 btn-sm">GET OTP</button> */}
                                            </div>
                                        </div>

                                        <div class="input-material-group mb-3">
                                            <input class="input-material" id="otp" type="text" name="otp" autocomplete="off" required data-validate-field="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                            <label class="label-material" for="email">Enter Email Otp</label>
                                        </div>


                                        <div class="input-material-group mb-3">
                                            <select name="country" id="ddlCountry" class="input-material" value={country} onChange={(e) => setCountry(e.target.value)}>
                                                <option selected>India</option>

                                                {options.map((item, index) =>
                                                    <option value={item.label} key={index}>{item.label}</option>,
                                                    // console.log(options, "option"),
                                                )}

                                            </select>
                                        </div>
                                        <div class="row" >
                                            <div class="col-3" >
                                                <div class="input-material-group mb-3">
                                                    <select name="ddlCountryCode" id="countryCode" class="input-material" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                                                        <option selected="selected" value="+91">+91</option>
                                                        <option value="+93">+93</option>
                                                        <option value="+355">+355</option>
                                                        <option value="+213">+213</option>
                                                        <option value="+684">+684</option>
                                                        <option value="+376">+376</option>
                                                        <option value="+244">+244</option>
                                                        <option value="+1-264">+1-264</option>
                                                        <option value="+672">+672</option>
                                                        <option value="+1-268">+1-268</option>
                                                        <option value="+54">+54</option>
                                                        <option value="+374">+374</option>
                                                        <option value="+297">+297</option>
                                                        <option value="+61">+61</option>
                                                        <option value="+43">+43</option>
                                                        <option value="+994">+994</option>
                                                        <option value="+1-242">+1-242</option>
                                                        <option value="+973">+973</option>
                                                        <option value="+880">+880</option>
                                                        <option value="+1-246">+1-246</option>
                                                        <option value="+375">+375</option>
                                                        <option value="+32">+32</option>
                                                        <option value="+501">+501</option>
                                                        <option value="+229">+229</option>
                                                        <option value="+1-441">+1-441</option>
                                                        <option value="+975">+975</option>
                                                        <option value="+591">+591</option>
                                                        <option value="+387">+387</option>
                                                        <option value="+267">+267</option>
                                                        <option value="+55">+55</option>
                                                        <option value="+673">+673</option>
                                                        <option value="+359">+359</option>
                                                        <option value="+226">+226</option>
                                                        <option value="+257">+257</option>
                                                        <option value="+238">+238</option>
                                                        <option value="+855">+855</option>
                                                        <option value="+237">+237</option>
                                                        <option value="+1">+1</option>
                                                        <option value="+1-345">+1-345</option>
                                                        <option value="+236">+236</option>
                                                        <option value="+235">+235</option>
                                                        <option value="+56">+56</option>
                                                        <option value="+86">+86</option>
                                                        <option value="+61">+61</option>
                                                        <option value="+61">+61</option>
                                                        <option value="+57">+57</option>
                                                        <option value="+269">+269</option>
                                                        <option value="+242">+242</option>
                                                        <option value="+243">+243</option>
                                                        <option value="+682">+682</option>
                                                        <option value="+506">+506</option>
                                                        <option value="+385">+385</option>
                                                        <option value="+53">+53</option>
                                                        <option value="+5999">+5999</option>
                                                        <option value="+357">+357</option>
                                                        <option value="+420">+420</option>
                                                        <option value="+225">+225</option>
                                                        <option value="+45">+45</option>
                                                        <option value="+253">+253</option>
                                                        <option value="+1-767">+1-767</option>
                                                        <option value="+809">+809</option>
                                                        <option value="+593">+593</option>
                                                        <option value="+20">+20</option>
                                                        <option value="+503">+503</option>
                                                        <option value="+240">+240</option>
                                                        <option value="+291">+291</option>
                                                        <option value="+372">+372</option>
                                                        <option value="+268">+268</option>
                                                        <option value="+251">+251</option>
                                                        <option value="+500">+500</option>
                                                        <option value="+298">+298</option>
                                                        <option value="+679">+679</option>
                                                        <option value="+358">+358</option>
                                                        <option value="+33">+33</option>
                                                        <option value="+594">+594</option>
                                                        <option value="+689">+689</option>
                                                        <option value="+241">+241</option>
                                                        <option value="+220">+220</option>
                                                        <option value="+995">+995</option>
                                                        <option value="+49">+49</option>
                                                        <option value="+233">+233</option>
                                                        <option value="+350">+350</option>
                                                        <option value="+30">+30</option>
                                                        <option value="+299">+299</option>
                                                        <option value="+1-473">+1-473</option>
                                                        <option value="+590">+590</option>
                                                        <option value="+1-671">+1-671</option>
                                                        <option value="+502">+502</option>
                                                        <option value="+224">+224</option>
                                                        <option value="+245">+245</option>
                                                        <option value="+592">+592</option>
                                                        <option value="+509">+509</option>
                                                        <option value="+39">+39</option>
                                                        <option value="+504">+504</option>
                                                        <option value="+852">+852</option>
                                                        <option value="+36">+36</option>
                                                        <option value="+354">+354</option>
                                                        <option value="+62">+62</option>
                                                        <option value="+98">+98</option>
                                                        <option value="+964">+964</option>
                                                        <option value="+353">+353</option>
                                                        <option value="+972">+972</option>
                                                        <option value="+39">+39</option>
                                                        <option value="+1-876">+1-876</option>
                                                        <option value="+81">+81</option>
                                                        <option value="+962">+962</option>
                                                        <option value="+7">+7</option>
                                                        <option value="+254">+254</option>
                                                        <option value="+686">+686</option>
                                                        <option value="+850">+850</option>
                                                        <option value="+82">+82</option>
                                                        <option value="+965">+965</option>
                                                        <option value="+996">+996</option>
                                                        <option value="+856">+856</option>
                                                        <option value="+371">+371</option>
                                                        <option value="+961">+961</option>
                                                        <option value="+266">+266</option>
                                                        <option value="+231">+231</option>
                                                        <option value="+218">+218</option>
                                                        <option value="+423">+423</option>
                                                        <option value="+370">+370</option>
                                                        <option value="+352">+352</option>
                                                        <option value="+853">+853</option>
                                                        <option value="+261">+261</option>
                                                        <option value="+265">+265</option>
                                                        <option value="+60">+60</option>
                                                        <option value="+960">+960</option>
                                                        <option value="+223">+223</option>
                                                        <option value="+356">+356</option>
                                                        <option value="+692">+692</option>
                                                        <option value="+596">+596</option>
                                                        <option value="+222">+222</option>
                                                        <option value="+230">+230</option>
                                                        <option value="+269">+269</option>
                                                        <option value="+52">+52</option>
                                                        <option value="+691">+691</option>
                                                        <option value="+373">+373</option>
                                                        <option value="+377">+377</option>
                                                        <option value="+976">+976</option>
                                                        <option value="+382">+382</option>
                                                        <option value="+1-664">+1-664</option>
                                                        <option value="+212">+212</option>
                                                        <option value="+258">+258</option>
                                                        <option value="+95">+95</option>
                                                        <option value="+264">+264</option>
                                                        <option value="+674">+674</option>
                                                        <option value="+977">+977</option>
                                                        <option value="+31">+31</option>
                                                        <option value="+687">+687</option>
                                                        <option value="+64">+64</option>
                                                        <option value="+505">+505</option>
                                                        <option value="+227">+227</option>
                                                        <option value="+234">+234</option>
                                                        <option value="+683">+683</option>
                                                        <option value="+672">+672</option>
                                                        <option value="+389">+389</option>
                                                        <option value="+670">+670</option>
                                                        <option value="+47">+47</option>
                                                        <option value="+968">+968</option>
                                                        <option value="+92">+92</option>
                                                        <option value="+680">+680</option>
                                                        <option value="+507">+507</option>
                                                        <option value="+675">+675</option>
                                                        <option value="+595">+595</option>
                                                        <option value="+51">+51</option>
                                                        <option value="+63">+63</option>
                                                        <option value="+48">+48</option>
                                                        <option value="+351">+351</option>
                                                        <option value="+1-787">+1-787</option>
                                                        <option value="+974">+974</option>
                                                        <option value="+262">+262</option>
                                                        <option value="+40">+40</option>
                                                        <option value="+7">+7</option>
                                                        <option value="+250">+250</option>
                                                        <option value="+290">+290</option>
                                                        <option value="+1-869">+1-869</option>
                                                        <option value="+1-758">+1-758</option>
                                                        <option value="+508">+508</option>
                                                        <option value="+1-784">+1-784</option>
                                                        <option value="+684">+684</option>
                                                        <option value="+378">+378</option>
                                                        <option value="+239">+239</option>
                                                        <option value="+966">+966</option>
                                                        <option value="+221">+221</option>
                                                        <option value="+381">+381</option>
                                                        <option value="+248">+248</option>
                                                        <option value="+232">+232</option>
                                                        <option value="+65">+65</option>
                                                        <option value="+421">+421</option>
                                                        <option value="+386">+386</option>
                                                        <option value="+677">+677</option>
                                                        <option value="+252">+252</option>
                                                        <option value="+27">+27</option>
                                                        <option value="+34">+34</option>
                                                        <option value="+94">+94</option>
                                                        <option value="+249">+249</option>
                                                        <option value="+597">+597</option>
                                                        <option value="+46">+46</option>
                                                        <option value="+41">+41</option>
                                                        <option value="+963">+963</option>
                                                        <option value="+886">+886</option>
                                                        <option value="+992">+992</option>
                                                        <option value="+255">+255</option>
                                                        <option value="+66">+66</option>
                                                        <option value="+228">+228</option>
                                                        <option value="+690">+690</option>
                                                        <option value="+676">+676</option>
                                                        <option value="+1-868">+1-868</option>
                                                        <option value="+216">+216</option>
                                                        <option value="+90">+90</option>
                                                        <option value="+993">+993</option>
                                                        <option value="+1-649">+1-649</option>
                                                        <option value="+688">+688</option>
                                                        <option value="+1">+1</option>
                                                        <option value="+256">+256</option>
                                                        <option value="+380">+380</option>
                                                        <option value="+971">+971</option>
                                                        <option value="+44">+44</option>
                                                        <option value="+598">+598</option>
                                                        <option value="+998">+998</option>
                                                        <option value="+678">+678</option>
                                                        <option value="+58">+58</option>
                                                        <option value="+84">+84</option>
                                                        <option value="+1-284">+1-284</option>
                                                        <option value="+1-340">+1-340</option>
                                                        <option value="+681">+681</option>
                                                        <option value="+967">+967</option>
                                                        <option value="+260">+260</option>
                                                        <option value="+263">+263</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-9" >
                                                <div class="input-material-group mb-3">
                                                    <input class="input-material" id="mobileNumber" type="text" name="mobileNumber" autocomplete="off" required data-validate-field="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                                                    <label class="label-material" for="mobileNumber">Enter Mobile Number</label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div class="input-material-group mb-3">
                                            <input class="input-material" id="email" type="text" name="loginUsername" autocomplete="off" required data-validate-field="email" />
                                            <label class="label-material" for="email">Enter Email</label>
                                        </div> */}
                                        <div class="input-material-group mb-4">
                                            <input class="input-material" id="password" type="password" name="password" required data-validate-field="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <label class="label-material active" for="password">Enter Password</label>
                                        </div>
                                        <div class="input-material-group mb-5">
                                            <input class="input-material" id="cPassword" type="password" name="cPassword" required data-validate-field="cPassword" value={cPassword} onChange={(e) => setCpassword(e.target.value)} />
                                            <label class="label-material" for="cPassword">Enter Retype Password</label>
                                        </div>
                                        <div class="input-material-group mb-4">
                                            <input class="input-material" id="transactionpassword" type="password" name="transactionpassword" required data-validate-field="transactionpassword" value={transactionpassword} onChange={(e) => setTransactionpassword(e.target.value)} />
                                            <label class="label-material" for="transactionpassword">Enter Transaction Password</label>
                                        </div>
                                        <div class="form-check mb-4">
                                            <input class="form-check-input" id="register-agree" name="registerAgree" type="checkbox" required value="1" data-validate-field="registerAgree" />
                                            <label class="form-check-label form-label" for="register-agree">
                                                I agree with the terms and policy
                                            </label>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between" >
                                            <button class="btn btn-primary mb-3" id="Register" type="button" onClick={() => handleRegister(sponserId, password, position, countryCode, userName, email, otp, country, mobileNumber, cPassword, transactionpassword)}>Create a New Account</button>

                                            {/* <a class="btn btn-primary mb-3" id="Register" href="#">Create a New Account</a> */}
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
export default Signup;