import React, { useState, useMemo, useEffect } from "react";
import AuthService from "../../../api/services/AuthService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";

const HomePage = () => {
    const [referralLinkLeft, setReferralLinkLeft] = useState('');
    const [referralLinkRight, setReferralLinkRight] = useState('');
    const [Notification, setNotificaton] = useState('');

    const [date, setDate] = useState([]);
    const [incomeWallet, setIncomeWallet] = useState([]);
    const [liquidityWallet, setLiquidityWallet] = useState([]);
    const [mainWallet, setMainWallet] = useState([]);
    const [miningReward, setMiningReward] = useState([]);
    const [stakeHistory, setStakeHistory] = useState([]);
    const [transHistory, setTransHistory] = useState([]);
    const [teamSummery, setTeamSummery] = useState([]);
    const [Withdrawal, setWithdrawal] = useState([]);

    
    const [walletMiningReward, setWalletMiningReward] = useState([]);
    const [recommendationBonus, setRecommendationBonus] = useState([]);
    const [walletTotal, setWalletTotal] = useState([]);
    const [totalMatching, setTotalMatching] = useState([]);


    useEffect(() => {
        handleReferLeft();
        handleReferRight();
        handleUserBalance();
        handleStakeHistory();
        handleTransationHistory();
        handleNotificationHistory();
        handleDetials();
        handleIncomewalletdetails();
    }, [])

    const handleReferLeft = async () => {
        await AuthService.referralLeft().then(async result => {
            if (result) {
                try {
                    /*  alertSuccessMessage(result.message); */
                    setReferralLinkLeft(result?.refer);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message)
            }
        })
    }

    const handleReferRight = async () => {
        await AuthService.referralRight().then(async result => {
            if (result) {
                try {
                    /*  alertSuccessMessage(result.message); */
                    setReferralLinkRight(result?.refer);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message)
            }
        })
    }



    function copyToClipboard() {
        var copyText = document.getElementById("content").value;
        navigator.clipboard.writeText(copyText).then(() => {
            alert('ReferralLink Left' + ' '  + '=' +  ' '  + referralLinkLeft   );
        });
    }

    function copyToClipboard2() {
        var copyText = document.getElementById("content2").value;
        navigator.clipboard.writeText(copyText).then(() => {
            alert('Text Copied');
        });
    }


    const handleUserBalance = async () => {
        await AuthService.getUserBalance().then(async result => {
            if (result?.success) {
                try {
                    setIncomeWallet(result?.success?.incomeWallet);
                    setLiquidityWallet(result?.success?.liquidityWallet);
                    setMainWallet(result?.success?.mainWallet);
                    setMiningReward(result?.success?.miningReward);
                    setTeamSummery(result?.success?.teamsummary);
                    setWithdrawal(result?.success?.totalwothdrawal);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message)
            }
        })
    }


    const handleStakeHistory = async () => {
        await AuthService.getStakeHistory().then(async result => {
            if (result?.success) {
                try {
                    /*  alertSuccessMessage(result?.msg); */
                    setStakeHistory(result?.success.reverse().slice(0, 1));
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result?.msg);
            }
        });
    }

    const handleTransationHistory = async () => {
        await AuthService.getTransationHistory().then(async result => {
            if (result.success) {
                try {
                    // alertSuccessMessage(result?.msg);
                    setTransHistory(result?.success.reverse().slice(0, 1));
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result?.msg);
            }
        });
    }

    const handleNotificationHistory = async () => {
        await AuthService.getNotificationHistory().then(async result => {
            if (result?.success) {
                try {
                    /*  alertSuccessMessage(result?.msg); */
                    setNotificaton(result?.success.reverse().slice(0, 1));
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result?.msg);
            }
        });
    }


    const handleDetials = async () => {
        await AuthService.getDetails().then(async result => {
            if (result) {
                try {
                    setDate(result?.insdata?.createdAt);
                } catch (error) {
                    alertErrorMessage(error);
                    console.log('error', `${error}`);
                }
            } else {
                alertErrorMessage(result?.message);
            }
        });
    }


    const handleIncomewalletdetails= async () => {
        await AuthService.getIncomewalletdetails().then(async result => {
            if (result?.msg === 'Details Fetched Successfully!!') {
                try {
                    /*  alertSuccessMessage(result?.msg); */
                    setWalletMiningReward(result?.insdata.miningReward);
                    setRecommendationBonus(result?.insdata.recommendationBonus);
                    setWalletTotal(result?.insdata.total);
                    setTotalMatching(result?.insdata.totalmatching);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result?.msg);
            }
        });
    }




    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0">Dashboard</h2>
                </div>
            </div>
            <section>
                <div class="container-fluid">
                    <div class="row gy-4">
                        {/* <div class="col-md-3 col-sm-6">
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
                                        <div class="progress-bar bg-dash-color-1" role="progressbar" style={{ width: '30%' }} aria-valuenow="30"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </a>
                        </div> */}
                        <div class="col-md-3 col-sm-6">
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
                                        <div class="progress-bar bg-dash-color-2" role="progressbar" style={{ width: '70%' }} aria-valuenow="70"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-3 col-sm-6">
                            <a href="#" class="card mb-0 card_hover">
                                <div class="card-body">
                                    <div class="d-flex align-items-end justify-content-between mb-2">
                                        <div class="me-2">
                                            <span class="svg-icon svg-icon-sm svg-icon-heavy text-gray-600 mb-2">
                                                <i class="fas fa-wallet"></i>
                                            </span>
                                            <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">Liquidity Wallet</p>
                                        </div>
                                        <p class="text-xxl lh-1 mb-0 text-dash-color-3">{liquidityWallet}</p>
                                    </div>
                                    <div class="progress" style={{ height: '3px' }}>
                                        <div class="progress-bar bg-dash-color-3" role="progressbar" style={{ width: '55%' }} aria-valuenow="55"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-3 col-sm-6">
                            <a href="#" class="card mb-0 card_hover">
                                <div class="card-body">
                                    <div class="d-flex align-items-end justify-content-between mb-2">
                                        <div class="me-2">
                                            <span class="svg-icon svg-icon-sm svg-icon-heavy text-gray-600 mb-2">
                                                <i class="fas fa-list-alt"></i>
                                            </span>
                                            <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">Team Summary</p>
                                        </div>
                                        <p class="text-xxl lh-1 mb-0 text-dash-color-4">{teamSummery}</p>
                                    </div>
                                    <div class="progress" style={{ height: '3px' }}>
                                        <div class="progress-bar bg-dash-color-4" role="progressbar" style={{ width: '35%' }} aria-valuenow="35"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-3 col-sm-6">
                            <a href="#" class="card mb-0 card_hover">
                                <div class="card-body">
                                    <div class="d-flex align-items-end justify-content-between mb-2">
                                        <div class="me-2">
                                            <span class="svg-icon svg-icon-sm svg-icon-heavy text-gray-600 mb-2">
                                                <i class="fas fa-door-closed"></i>
                                            </span>
                                            <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">Mining Reward</p>
                                        </div>
                                        <p class="text-xxl lh-1 mb-0 text-dash-color-4">{miningReward}</p>
                                    </div>
                                    <div class="progress" style={{ height: '3px' }}>
                                        <div class="progress-bar bg-dash-color-4" role="progressbar" style={{ width: '35%' }} aria-valuenow="35"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-3 col-sm-6">
                            <a href="#" class="card mb-0 card_hover">
                                <div class="card-body">
                                    <div class="d-flex align-items-end justify-content-between mb-2">
                                        <div class="me-2">
                                            <span class="svg-icon svg-icon-sm svg-icon-heavy text-gray-600 mb-2">
                                                <i class="fas fa-money-bill"></i>
                                            </span>
                                            <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">Withdrawal</p>
                                        </div>
                                        <p class="text-xxl lh-1 mb-0 text-dash-color-4">{Withdrawal}</p>
                                    </div>
                                    <div class="progress" style={{ height: '3px' }}>
                                        <div class="progress-bar bg-dash-color-4" role="progressbar" style={{ width: '35%' }} aria-valuenow="35"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="card mb-0">
                                <div class="card-body py-3">
                                    <div class="row">
                                        <div class="col-md-6 col-sm-12">
                                            <label class="mb-2">
                                                <small>Affiliate Link - Left</small>
                                            </label>
                                            <div class="input-group">
                                                <input id="content" class="form-control" type="text"
                                                    value={"https://tronnetic.ai" + '/signup?reffcode=' + referralLinkLeft} />

                                                <a class='input-group-text' id="content" type="button" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard("https://tronnetic.ai" + '/signup?reffcode=' + referralLinkLeft)} >
                                                    <i class="fas fa-copy"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-12">
                                            <label class="mb-2">
                                                <small>Affiliate Link - Right</small>
                                            </label>
                                            <div class="input-group">
                                                <input id="content2" class="form-control" type="text"
                                                    value={"https://tronnetic.ai" + '/signup?reffcode=' + referralLinkRight} />

                                                <a class='input-group-text' id="content2" type="button" style={{ cursor: 'pointer' }} onClick={() => copyToClipboard2("https://tronnetic.ai" + '/signup?reffcode=' + referralLinkRight)} >
                                                    <i class="fas fa-copy"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-4">
                            <div class="card mb-0 h-100">
                                <div class="card-header pb-0 d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Income Wallet Details</h3> {/* <a class="btn btn-sm btn-success" href="#">View</a> */}
                                </div>
                                <hr />
                                <div class="card-body pt-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr>
                                                    <td>Recommendation Bonus</td>
                                                    <td>{recommendationBonus}</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Mining Reward Income</td>
                                                    <td> {walletMiningReward}</td>
                                                </tr>
                                                <tr>
                                                    <td>Matching Bonus</td>
                                                    <td> {totalMatching}</td>
                                                </tr>
                                                <tr>
                                                    <td class="border-bottom-0">Total Income</td>
                                                    <td class="border-bottom-0"> {walletTotal}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                       {/*  <div class="col-lg-4">
                            <div class="card mb-0 h-100">
                                <div class="card-header pb-0 d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Fast Start Bonus</h3>
                                </div>
                                <hr />
                                <div class="card-body pt-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr>
                                                    <td>DATE OF REGISTRATION</td>
                                                    <td>FAST START BONUS STATUS</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{moment(date?.createdAt).format('l')}</td>
                                                    <td> Expired</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td> <small> No Active Fast Start Bonus</small></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div class="col-lg-8">
                            <div class="card mb-0 h-100">
                                <div class="card-header pb-0 d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Notification's</h3>
                                </div>
                                <hr />
                                <div class="card-body pt-0">
                                    <div class="table-responsive">
                                        {Notification.length > 0 ?
                                            Notification.map(item =>
                                                <h5> {item?.message} </h5>

                                            ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Staking Package History</h3>
                                </div>

                                <div class="card-body pt-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr style={{ backgroundColor: '#000429' }}>
                                                    <th>Date</th>
                                                    <th>Contract Address</th>
                                                    <th>Deposit Address</th>
                                                    <th>Transaction Hash</th>
                                                    <th>Nsdt Amount</th>
                                                    <th>Stacking Type</th>
                                                    <th>Reward Rate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stakeHistory.length > 0
                                                    ? stakeHistory.map((item) => (
                                                        <tr>
                                                            <td >{moment(item?.createdAt).format('l')}</td>
                                                            <td>
                                                                <div style={{ maxWidth: '150px' }}>
                                                                    0xA2D4d1e509ba872d1D3FF5d9Fa5a250c4B3c7c79
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div style={{ maxWidth: '150px' }}>
                                                                    {item?.depositAddress}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div style={{ maxWidth: '150px' }}>
                                                                    {item?.hash}
                                                                </div>
                                                            </td>
                                                            <td>{item?.nsdtAmount}</td>
                                                            <td>{item?.stackingType}</td>
                                                            <td>1.25%</td>
                                                        </tr>
                                                    )) : null
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0"> Latest Transactions </h3>
                                </div>
                                <div class="card-body pt-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr style={{ backgroundColor: '#000429' }}>
                                                    <th>DATE</th>
                                                    <th> Amount </th>
                                                    <th>Transaction Type </th>
                                                    <th> Wallet Type </th>
                                                    <th>Transaction Hash </th>
                                                    <th>Withdrawal Address </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transHistory.length > 0
                                                    ? transHistory.map((item) => (
                                                        <tr>
                                                            <td> {moment(item?.createdAt).format('l')}</td>
                                                            <td>{item?.amount.toFixed(3)} </td>
                                                            <td> {item?.txType}</td>
                                                            <td>{item?.wallType} </td>
                                                            <td>
                                                                <div style={{ maxWidth: '150px' }}>
                                                                    {item?.txHash}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div style={{ maxWidth: '150px' }}>
                                                                    {item?.withdrawalAddress}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )) : null}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="position-absolute bottom-0 bg-dash-dark-2 text-white text-center py-3 w-100 text-xs" id="footer">
                <div class="container-fluid text-center">
                    <p class="mb-0 text-dash-gray">© Copyright 2022 DGL AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default HomePage;