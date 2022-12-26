import React, { useState, useEffect } from "react";
import StakepackageBep from "../StakepackageBep";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { default as Web3 } from 'web3';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AuthService from "../../../api/services/AuthService";
import { alertSuccessMessage, alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";

const BuyPackageDetails = (props) => {

  const [activeScreen, setActiveScreen] = useState("StackingDetails");
  const [nsdtStackingPrice, setNsdtStackingPrice] = useState([]);
  const [usdtAmount, setUsdtAmount] = useState(props?.userId);
  const [depositBlockAura, setDepositBlockAura] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [transtionHash, setTranstionHash] = useState('');

  const nsdtTotalAmt = usdtAmount / nsdtStackingPrice;


  const loginid = localStorage.getItem("loginid");
  const starter = props?.userId;

  const handleCancel = () => {
    setActiveScreen("StakingPackage");
  };

  const WalletConnect = async () => {
    alertSuccessMessage('Test');
  }

  const paycoins = async () => {
    alertSuccessMessage('Test paycoins');
  }

  const handleBuyDetails = async (starter, nsdtTotalAmt, usdtAmount, depositBlockAura, senderAddress, transtionHash) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.AddbuyDetails(starter, nsdtTotalAmt, usdtAmount, depositBlockAura, senderAddress, transtionHash).then(async result => {
      if (result.msg === "Package selected successfully") {
        LoaderHelper.loaderStatus(false);
        try {
          alertSuccessMessage(result.msg);
          setActiveScreen("StakingPackage");
        } catch (error) {
          alertErrorMessage(error);
          /* console.log('error', `${error}`); */
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }

    })
  }

  useEffect(() => {
    handleNsdtAmount();
  }, [])


  const handleNsdtAmount = async () => {
    await AuthService.getNsdtAmount().then(async result => {
      try {
        if (result?.msg === 'NSDT Price Fetched Successfully!!') {
          // alertSuccessMessage(result.msg);
          setNsdtStackingPrice(result?.data?.nsdtStackingPrice);
        }
        else {
          alertErrorMessage(result.message);
        }
      } catch (error) {
        alertErrorMessage(error);
      }

    })
  }

  return activeScreen === "StackingDetails" ? (
    <div class="page-content">
      <div class="bg-dash-dark-2 py-4">
        <div class="container-fluid">
          <h2 class="h5 mb-0">
            {/* <a href="index.html" ><i class="fas fa-arrow-left me-2" ></i></a>  */}
            Package Details
          </h2>
        </div>
      </div>
      <div class="container-fluid py-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 py-3 px-0">
            <li class="breadcrumb-item">
              <a href="/dashboard">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              My Package
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Package Details
            </li>
          </ol>
        </nav>
      </div>
      <section class="pt-0">
        <div class="container-fluid">
          <div class="row gy-4">
            <div class="col-lg-6 m-auto">
              <div class="card  h-100">
                <div class="card-header d-flex align-items-end justify-content-between">
                  <h3 class="h4 mb-0">Select Buy Package Details</h3>
                  {!senderAddress ?
                    <button type="button" className="btn btn-primary w-auto btn-sm" onClick={() => WalletConnect()}>Wallet Connect</button> :
                    <button type="button" className="btn btn-success w-auto btn-sm">Connected</button>
                  }
                </div>
                <div class="card-body pt-0">
                  <form>
                    <div className="card-warning  text-danger mb-4">
                      Warning- *Please complete your transtion within 5 minutes.
                      Do not Close or reload the Page.
                    </div>
                    <hr />
                    <div className="input-group align-items-center mb-4">
                      <label style={{ width: "150px" }} className="me-5">
                        Network:
                      </label>
                      {/* <input class="form-control" value="Polygon (Matic)" disabled type="text"  /> */}
                      <div className="text-white">Binance (BNB)</div>
                    </div>
                    <div className="input-group align-items-center mb-4">
                      <label style={{ width: "150px" }} className="me-5">
                        Customer ID:
                      </label>
                      <input class="form-control" value={loginid} disabled />
                    </div>
                    <div className="input-group align-items-center mb-4">
                      <label style={{ width: "150px" }} className="me-5">
                        Selected Package:
                      </label>
                      <label style={{ width: "150px" }} className="me-5">
                        Advanced Trader ${starter}
                      </label>
                    </div>
                    <div className="input-group align-items-center mb-4">
                      <label style={{ width: "150px" }} className="me-5">
                        USDT Amount:
                      </label>
                      <input class="form-control" value={usdtAmount} type="text" disabled />
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <label style={{ minWidth: "150px" }} className="me-5">
                        NSDT Amount:
                      </label>
                      <div className="input-group">
                        <input class="form-control" type="text" value={nsdtTotalAmt} disabled />
                        <CopyToClipboard text={parseFloat(usdtAmount / '23.0400')}>
                          <button class="btn btn-primary" type="button">
                            <span>Copy</span>
                          </button>
                        </CopyToClipboard>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <label style={{ minWidth: "150px" }} className="me-5">
                        Deposit NSDT (BNB)
                      </label>
                      <div className="input-group">
                        <input class="form-control" value={depositBlockAura} type="text" onChange={(e) => setDepositBlockAura(e.target.value)} disabled style={{ fontSize: '10px' }} />

                        <CopyToClipboard text={depositBlockAura}>
                          <button class="btn btn-primary" type="button">
                            <span>Copy</span>
                          </button>
                        </CopyToClipboard>

                      </div>
                    </div>
                    <div className="input-group align-items-center mb-4">
                      <label style={{ width: "150px" }} className="me-5">
                        Sender Address:
                      </label>
                      <input class="form-control" type="text" value={senderAddress} name='senderAddress' disabled />
                    </div>
                    <div className="input-group align-items-center mb-4">
                      <label style={{ width: "150px" }} className="me-5">
                        Enter Transtion Hash:
                      </label>
                      <input class="form-control" type="text" value={transtionHash} name='transtionHash' />
                    </div>
                    <hr />
                    <button class="btn btn-secondary ms-3" type="button" onClick={paycoins} > Pay Coins </button>

                    <button class="btn btn-primary ms-3" type="button" onClick={() => handleBuyDetails(starter, nsdtTotalAmt, usdtAmount, depositBlockAura, senderAddress, transtionHash)}> Submit </button>
                    <button class="btn btn-danger ms-3" type="button" onClick={handleCancel}> Cancel </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <StakepackageBep />
  );
};

export default BuyPackageDetails;