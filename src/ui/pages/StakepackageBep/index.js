import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../api/services/AuthService";
import BuyPackageDetails from "../BuyPackageDetails";

const StakepackageBep = () => {

    const navigate = useNavigate();
    const [activeScreen, setActiveScreen] = useState('StackingDetails');
    const [userId, setUserId] = useState('');
    const [incomeWallet, setIncomeWallet] = useState([]);
    const [mainWallet, setMainWallet] = useState([]);

    useEffect(() => {
        handlePackageWallet();
    }, [])

    const handlePackageWallet = async () => {
        await AuthService.getUserBalance().then(async result => {
            if (result?.success) {
                setIncomeWallet(result?.success?.incomeWallet);
                setMainWallet(result?.success?.mainWallet);
            } else {

            }
        })
    }

    const handleStacking = (userId) => {
        setUserId(userId);
        setActiveScreen('StackeDapp');
    }
    return (
        activeScreen === 'StackingDetails' ?
            <div class="page-content">
                <div class="bg-dash-dark-2 py-4">
                    <div class="container-fluid">
                        <h2 class="h5 mb-0">Buy Stake Package Bep</h2>
                    </div>
                </div>
                <div class="container-fluid py-2">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 py-3 px-0">
                            <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">My Package</li>
                            <li class="breadcrumb-item active" aria-current="page">Staking Package</li>
                        </ol>
                    </nav>
                </div>
                <section>
                    <div class="container-fluid">
                        <div class="row gy-4 justify-content-center">
                            {/* <div class="col-md-6 col-sm-6">
                                <a href="#" class="card card_hover mb-0">
                                    <div class="card-body">
                                        <div class="d-flex align-items-end justify-content-between mb-2">
                                            <div class="me-2">
                                                <span class="svg-icon svg-icon-sm svg-icon-heavy text-gray-600 mb-2">
                                                    <i class="fas fa-wallet"></i>
                                                </span>
                                                <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">Income Wallet</p>
                                            </div>
                                            <p class="text-xxl lh-1 mb-0 text-dash-color-1">{incomeWallet}</p>
                                        </div>
                                        <div class="progress" style={{ height: '3px' }}>
                                            <div class="progress-bar bg-dash-color-1" role="progressbar" style={{ width: '30%' }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div> */}
                            <div class="col-md-8 col-sm-6">
                                <a href="#" class="card mb-0 card_hover">
                                    <div class="card-body">
                                        <div class="d-flex align-items-end justify-content-between mb-2">
                                            <div class="me-2">
                                                <span class="svg-icon svg-icon-sm svg-icon-heavy text-gray-600 mb-2">
                                                    <i class="fas fa-wallet"></i>
                                                </span>
                                                <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">Main Wallet</p>
                                            </div>
                                            <p class="text-xxl lh-1 mb-0 text-dash-color-2">{mainWallet}</p>
                                        </div>
                                        <div class="progress" style={{ height: '3px' }}>
                                            <div class="progress-bar bg-dash-color-2" role="progressbar" style={{ width: '30%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="pt-0">
                    <div class="container-fluid">
                        <div class="row gy-4">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body pt-0">
                                        <div class="row layout-spacing">
                                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                                                <img src="img/packages/20.png" />
                                                <br />
                                                <input type="submit" name="ctl00$cp$buy100" value='Staking' id="ctl00_cp_buy100" class="btn btn-primary btn-sm mt-2 success" onClick={() => handleStacking('20')} />
                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'center' }}> <img
                                                src="img/packages/50.png" />
                                                <br />
                                                <input type="submit" name="ctl00$cp$buy300" value="Staking" id="ctl00_cp_buy300" class="btn btn-primary btn-sm mt-2" onClick={() => handleStacking('50')} />
                                            </div>
                                           {/*  <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                                                <img src="img/packages/100.png" />
                                                <br />
                                                <input type="submit" name="ctl00$cp$buy500" value="Staking" id="ctl00_cp_buy500" class="btn btn-primary btn-sm mt-2" onClick={() => handleStacking('100')} />
                                            </div> */}
                                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                                                <img src="img/packages/250.png" />
                                                <br />
                                                <input type="submit" name="ctl00$cp$buy1000" value="Staking" id="ctl00_cp_buy1000" class="btn btn-primary btn-sm mt-2" onClick={() => handleStacking('250')} />
                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                                                <img src="img/packages/500.png" />
                                                <br />
                                                <input type="submit" name="ctl00$cp$buy3000" value="Staking" id="ctl00_cp_buy3000" class="btn btn-primary btn-sm mt-2" onClick={() => handleStacking('500')} />
                                                <br />
                                            </div>
                                        </div>
                                        <div class="row layout-spacing">
                                          
                                            <br />
                                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                                                <img src="img/packages/1000.png" />
                                                <br />
                                                <input type="submit" name="ctl00$cp$buy5000" value="Staking" id="ctl00_cp_buy5000" class="btn btn-primary btn-sm mt-2" onClick={() => handleStacking('1000')} />
                                                <br />
                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'center' }}>
                                                <img src="img/packages/2500.png" />
                                                <br />
                                                <input type="submit" name="ctl00$cp$buy10000" value="Staking" id="ctl00_cp_buy10000" class="btn btn-primary btn-sm mt-2" onClick={() => handleStacking('2500')} />
                                                <br />
                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'center' }}> <img
                                                src="img/packages/5000.png" />
                                                <br />
                                                <input type="submit" name="ctl00$cp$buy15000" value="Staking" id="ctl00_cp_buy15000" class="btn btn-primary btn-sm mt-2" onClick={() => handleStacking('5000')} />
                                                <br />
                                            </div>
                                            <br />
                                            <br />
                                        </div>
                                        <div class="row layout-spacing">
                                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'center' }}> </div>
                                            <br />
                                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'center', display: 'none' }}>
                                                <img src="img/packages/7500.png" />
                                                <br />
                                                <input type="submit" name="ctl00$cp$buy7500" value="Staking" id="ctl00_cp_buy7500" class="btn btn-primary btn-sm mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            :
            <BuyPackageDetails userId={userId} />
    )
}

export default StakepackageBep;