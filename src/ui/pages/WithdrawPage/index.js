import React, { useState, useEffect } from "react";
import GetcodeButton from "../../../customComponent/GetcodeButton";
import AuthService from "../../../api/services/AuthService";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import { useNavigate } from "react-router-dom";


const WithdrawPage = () => {
    const TronWeb = require('tronweb')
    const HttpProvider = TronWeb.providers.HttpProvider;
    let fullNode = '';
    let solidityNode = '';
    let eventServer = '';
    const privateKey = '';
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

    const loginid = localStorage.getItem("loginid");

    const [nsdtWithdrawalPrice, setNsdtWithdrawalPrice] = useState([]);
    const [walletAddr, setWalletAddr] = useState("");
    const [amount, setAmount] = useState("");
    const [walletType, setWalletType] = useState("BEP20");
    const [otp, setOtp] = useState("");
    const [transtionPass, setTranstionPass] = useState("");
    const [calculateAmount, setCalculateAmount] = useState([]);
    const [transtionHash, setTranstionHash] = useState('');
    const [admintxHash, setAdmintxHash] = useState('');
    const [lastWithdrawal, setLastWithdrawal] = useState([]);
    const [withdrawalStatus, setWithdrawalStatus] = useState([]);
    const navigate = useNavigate();
    const [mainWallet, setMainWallet] = useState([]);



    const withdrawUsdt = async () => {
        const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; // USDT
        const ACCOUNT = "";

        let {
            transaction,
            result
        } = await tronWeb.transactionBuilder.triggerSmartContract(
            CONTRACT, 'transfer(address,uint256)', {
            feeLimit: 100_000_000,
            callValue: 0
        },
            [{
                type: 'address',
                value: ACCOUNT
            }, {
                type: 'uint256',
                value: 1000000
            }]
        );

        const signature = await tronWeb.trx.sign(transaction.raw_data_hex, privateKey);
        console.log("Signature:", signature);
        transaction["signature"] = [signature];

        const broadcast = await tronWeb.trx.sendRawTransaction(transaction);
        console.log("result:", broadcast);
    }

    const depositUsdt = async () => {
        let usdt = await tronWeb.contract.at('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
        // Sending 1usdt. 1 usdt = 1000000
        const tx = await usdt.transfer('to_address', 1000000).send({ feeLimit: 100_000_000 });
        console.log("Transaction: ", tx);
    }


    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "amount":
                setAmount(event.target.value);
                if (event.target.value === "") {
                    setCalculateAmount('');
                }
                break;
            case "walletType":
                setWalletType(event.target.value);
                break;
            case "otp":
                setOtp(event.target.value);
                break;
            case "transtionPass":
                setTranstionPass(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleResetInput = () => {
        setAmount("");
        setOtp("");
        setTranstionPass("");
    }

    const handleWithdrowIncome = async (walletType, walletAddr, amount, otp, transtionPass, txHash, adtxHash) => {
        console.log(txHash, 'txHashsdf');
        LoaderHelper.loaderStatus(true);
        await AuthService.withdrawIncome(walletType, walletAddr, amount, otp, transtionPass, txHash, adtxHash).then(async result => {
            if (result?.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.msg);
                    handleResetInput();
                    navigate("/dashboard");
                    window.location.reload(false);
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
        LoaderHelper.loaderStatus(true);
        await AuthService.sendCode(loginid).then(async result => {
            if (result.message === "OTP Send Successfully") {
                LoaderHelper.loaderStatus(false);

                try {
                    alertSuccessMessage(result.message);
                } catch (error) {
                    //console.log('error', `${error}`);
                }
            } else {
                LoaderHelper.loaderStatus(false);

                alertErrorMessage(result.message);
            }
        });
    }

    // console.log(amount,'amount');

    const handleCalculateTbac = () => {
        setCalculateAmount(amount / nsdtWithdrawalPrice);
    }



    useEffect(() => {
        handleUserBalance();
        handleNsdtAmount();
    }, [])


    const handleUserBalance = async () => {
        await AuthService.getUserBalance().then(async result => {
            if (result?.success) {
                try {
                    setWithdrawalStatus(result?.success?.withdrawalStatus);
                    setMainWallet(result?.success?.mainWallet);
                    setLastWithdrawal(result?.success?.lastWithdrawal)

                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message)
            }
        })
    }

    let day = new Date().getDay();


    const handleNsdtAmount = async () => {
        await AuthService.getNsdtAmount().then(async result => {
            try {
                if (result?.msg === 'NSDT Price Fetched Successfully!!') {
                    // alertSuccessMessage(result.msg);
                    setNsdtWithdrawalPrice(result?.data?.nsdtWithdrawalPrice);

                }
                else {
                    alertErrorMessage(result.message);
                }
            } catch (error) {
                alertErrorMessage(error);
            }

        })
    }

    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0"> Withdrow Income</h2>
                </div>
            </div>
            <section>
                <div class="container-fluid">
                    <div class="row gy-4 justify-content-center">
                        <div class="col-md-6 col-sm-6">
                            <a href="javascript:void(0)" class="card card_hover mb-0">
                                <div class="card-body">
                                    <div class="d-flex align-items-end justify-content-between mb-2">
                                        <div class="me-2">
                                            <span class="svg-icon svg-icon-sm svg-icon-heavy text-gray-600 mb-2">
                                                <i class="fas fa-angle-up text-success"></i>
                                            </span>
                                            <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">Main Wallet</p>
                                        </div>
                                        <p class="text-xxl lh-1 mb-0 text-dash-color-1"> ${mainWallet}</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                    </div>
                    <div class="row gy-4 justify-content-center mt-1">
                        <div class="col-md-6 col-sm-6">
                            <a href="javascript:void(0)" class="card mb-0">
                                <div class="card-body text-white">
                                    <p>Important Note:</p>
                                    <p >
                                        Minimum withdrawal is $ 5% of the total amount will be charge as withdrawal Transaction
                                        Charges...!
                                    </p>
                                    <p>
                                        10% will be dedected for Liquidity Pool (Land Acquisition Charge)
                                    </p>
                                    <p className=" mt-3" >
                                        Current Rate : 1 NSDT = $ {nsdtWithdrawalPrice}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="row gy-4 mt-4">
                        <div class="col-lg-6 m-auto">
                            <div class="card  h-100">
                                <div class="card-header d-flex align-items-end justify-content-between">
                                    <h3 class="h4 mb-0">OTP is send to your register email</h3>
                                    {/* {!walletAddr ? */}
                                        <button type="button" className="btn btn-primary w-auto btn-sm" onClick={() => withdrawUsdt()}>withdrawUsdt</button> 
                                        
                                        {/* :
                                        <button type="button" className="btn btn-success w-auto btn-sm">Connected</button>
                                    } */}
                                </div>
                                <div class="card-body pt-0">
                                    <form>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputOTP">Wallet type </label>
                                            <input class="form-control" id="exampleInputMember" type="text" aria-describedby="Member"
                                                name="walletType" value={walletType} disabled />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputMember">Wallet Address</label>
                                            <input class="form-control" id="exampleInputMember" type="text" aria-describedby="Member"
                                                name="walletAddr" value={walletAddr} disabled />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputName">Amount</label>
                                            <input class="form-control" id="exampleInputName" type="text" aria-describedby="Name"
                                                name="amount" value={amount} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3 d-flex  align-items-center justify-content-between" >
                                            {mainWallet < amount ? <span style={{ color: 'red' }}>Insufficient Balance</span> :

                                                <button className="btn btn-primary" type="button" onClick={handleCalculateTbac} disabled={!amount}>
                                                    Calculate NSDT
                                                </button>
                                            }
                                            <p>
                                                NSDT Amount : <strong className="text-white" >{calculateAmount}</strong>
                                            </p>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputEmail1">Enter OTP</label>
                                            <div className="input-group" >
                                                <input class="form-control" id="exampleInputEmail1" type="text" aria-describedby="Email"
                                                    name="otp" value={otp} onChange={handleInputChange} />

                                                <GetcodeButton className="btn btn-primary mb-0"
                                                    onClick={() => handleGetCode(loginid)}>
                                                    <span>Get Code</span>
                                                </GetcodeButton>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputEmail1">Enter Transtion Password</label>
                                            <input class="form-control" id="exampleInputEmail1" type="password" aria-describedby="Email"
                                                name="transtionPass" value={transtionPass} onChange={handleInputChange} />
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label" for="exampleInputEmail1"> Enter Transtion Hash:</label>
                                            <input class="form-control" type="text" value={transtionHash} name='transtionHash' disabled />
                                        </div>

                                        {/* {
                                                amount >= 101 ? 'Maximum Withdral Limit is $100' :





                                                    withdrawalStatus === 'Inactive' || lastWithdrawal === 1 ?
                                                        <strong className="m-auto d-block text-center text-danger ">Withdrawal Is Disabled</strong>
                                                        :
                                                        <> */}
                                        <button class="btn btn-secondary me-3" type="button" onClick={depositUsdt} > Deposit Usdt </button>
                                        {/* <button class="btn btn-primary" type="button" onClick={() => handleWithdrowIncome(walletType, walletAddr, amount, otp, transtionPass, transtionHash, admintxHash)} disabled={!admintxHash}>Submit</button> */}
                                        {/* </>
                                            } */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                amount >= 101 ?

                    alertErrorMessage('Maximum Withdral Limit is $100')
                    : ''
            }

        </div>
    )
}

export default WithdrawPage;