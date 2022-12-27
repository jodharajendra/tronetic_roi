import React, { useState, useMemo, useEffect } from "react";
import countryList from 'react-select-country-list';
import AuthService from "../../../api/services/AuthService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city';

const Myprofile = () => {


    //     console.log(Country.getAllCountries())
    // console.log(State.getAllStates())

    const countryCodes = require("country-codes-list");
    const myCountryCodesObject = countryCodes.customList("countryCode", "+{countryCallingCode}");
    const countryCodeNew = Object.values(myCountryCodesObject);

    const options = useMemo(() => countryList().getData(), [])
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [mobile, setMobile] = useState("");
    const [country, setCountry] = useState("india");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [loginId, setLogiId] = useState("");

    useEffect(() => {
        handleDetials();
    }, [])
    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value);
                break;
            case "userName":
                setUserName(event.target.value);
                break;
            case "mobile":
                setMobile(event.target.value);
                break;
            case "country":
                setCountry(event.target.value);
                break;
            case "state":
                setState(event.target.value);
                break;
            case "city":
                setCity(event.target.value);
                break;
            case "address":
                setAddress(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleUpdateProfile = async (email, userName, countryCode, mobile, country, state, city, address) => {
        LoaderHelper.loaderStatus(true);
        await AuthService.updateProfile(email, userName, countryCode, mobile, country, state, city, address).then(async result => {
            if (result?.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.message);
                    handleDetials();
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result?.message);
            }
        });
    }

    const handleDetials = async () => {
        await AuthService.getDetails().then(async result => {
            if (result) {
                try {
                    setEmail(result?.insdata?.emailId);
                    setUserName(result?.insdata?.name);
                    setMobile(result?.insdata?.mobileNumber);
                    setCountry(result?.insdata?.country);
                    setCountryCode(result?.insdata?.cCode);
                    setState(result?.insdata?.state);
                    setCity(result?.insdata?.city);
                    setAddress(result?.insdata?.blockauraaddress);
                    setLogiId(result?.insdata?.loginid);
                } catch (error) {
                    alertErrorMessage(error);
                    console.log('error', `${error}`);
                }
            } else {
                alertErrorMessage(result?.message);
            }
        });
    }

    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0">
                        {/* <a href="index.html" ><i class="fas fa-arrow-left me-2" ></i></a>  */}
                        Profile
                    </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Account</li>
                        <li class="breadcrumb-item active" aria-current="page">Profile</li>
                    </ol>
                </nav>
            </div>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-6 m-auto">
                            <div class="card  h-100">
                                <div class="card-header">
                                    <h3 class="h4 mb-0">Edit Profile</h3>
                                </div>
                                <div class="card-body pt-0">
                                    <form>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputMember">Member ID</label>
                                            <input class="form-control" id="exampleInputMember" type="text" aria-describedby="memberId"
                                                name="memberId" value={loginId} disabled style={{ backgroundColor: '#262b49' }} />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputEmail1">Email ID</label>
                                            <input class="form-control" id="exampleInputEmail1" type="email" aria-describedby="Email"
                                                name="email" value={email} onChange={handleInputChange} />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputName">Full Name</label>
                                            <input class="form-control" id="exampleInputName" type="text" aria-describedby="Name"
                                                name="userName" value={userName} onChange={handleInputChange} />
                                        </div>
                                        <div class="row" >
                                            <div class="col-2" >
                                                <div class="input-material-group mb-3">
                                                    <label class="form-label" for="countryCode">Country code</label>
                                                    <select name="ddlCountryCode" id="countryCode" class="input-material" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} style={{ border: '1px solid #40444b' }}>
                                                        <option value="+91">+91</option>
                                                        {
                                                            countryCodeNew.map((item) => (
                                                                <>
                                                                    <option>{item}</option>
                                                                </>

                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-10">
                                                <div class="input-material-group mb-3">
                                                    <label class="form-label" for="exampleInputMobile">Mobile No</label>
                                                    <input class="form-control" id="exampleInputMobile" type="tel" aria-describedby="Mobile"
                                                        name="mobile" value={mobile} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputCountry">Country</label>
                                            <select class="form-select" id="inlineFormSelectPref"
                                                name="country" value={country} onChange={handleInputChange}>
                                                <option selected>India</option>
                                                {options.map((item, index) =>
                                                    <option value={item.label} key={index}>{item.label}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputState">State</label>
                                            <input class="form-control" id="exampleInputState" type="text" aria-describedby="text"
                                                name="state" value={state} onChange={handleInputChange} />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputCity">City</label>
                                            <input class="form-control" id="exampleInputCity" type="text" aria-describedby="text"
                                                name="city" value={city} onChange={handleInputChange} />

                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputPassword1">(NSDT-BEP20) Address</label>
                                            <input class="form-control" id="exampleInputPassword1" type="text"
                                                name="address" value={address} onChange={handleInputChange} />
                                        </div>
                                        <button class="btn btn-primary" type="button" onClick={() => handleUpdateProfile(email, userName, countryCode, mobile, country, state, city, address)}>Update Profile</button>
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

export default Myprofile;