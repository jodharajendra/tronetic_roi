import React, { useState } from "react";
import DashboardHeader from "../../../customComponent/DashboardHeader";
import DashboardFooter from "../../../customComponent/DashboardFooter";
import HomePage from "../HomePage";
import Myprofile from "../Myprofile";
import ChangePassword from "../ChangePassword";
import TwofactorPage from "../TwofactorPage";
import TransactionPassword from "../TransactionPassword";
import Genealogy from "../Genealogy";
import DirectReferrals from "../DirectReferrals";
import Downline from "../Downline";
import LeftrightTeam from "../LeftrightTeam";
import StakePackageWallet from "../StakePackageWallet";
import StakepackageBep from "../StakepackageBep";
import StakePackageHistory from "../StakePackageHistory";
import TbacWallet from "../TbacWallet";
import DepositDetails from "../DepositDetails";
import DepositFunds from "../DepositFunds";
import TransferFunds from "../TransferFunds";
import TransactionPage from "../TransactionPage";
import AllTransaction from "../AllTransaction";
import MatchingMint from "../MatchingMint";
import MiningReward from "../MiningReward";
import RecommendationBonus from "../RecommendationBonus";
import MatchingBonus from "../MatchingBonus";
import WithdrawPage from "../WithdrawPage";
import WithdrawDetails from "../WithdrawDetails";
import Notifications from "../Notifications";

const Dashboardpage = () => {
    const [activeTab, setActiveTab] = useState('HomePage');

    const loginid = localStorage.getItem("loginid");
    const name = localStorage.getItem("name");

    return (
        <>
            <DashboardHeader />
            <div class="d-flex align-items-stretch">
                <nav id="sidebar">
                    <div class="sidebar-header d-flex align-items-center p-4">
                        <img class="avatar shadow-0 img-fluid rounded-circle" src="img/user.png" alt="..." />
                        <div class="ms-3 title">
                            <h1 class="h5 mb-1">Hi, {name}</h1>
                            <p class="text-sm text-gray-700 mb-0 lh-1">{loginid}</p>
                        </div>
                    </div><span class="text-uppercase text-gray-600 text-xs mx-3 px-2 heading mb-2">Main</span>
                    <ul class="list-unstyled">
                        <li class="sidebar-item active">
                            <a class="sidebar-link" href="/dashboard" onClick={() => setActiveTab('HomePage')}>
                                <span class="svg-icon svg-icon-sm svg-icon-heavy">
                                    <i class="fas fa-home"></i>
                                </span><span>Dashboard </span></a>
                        </li>
                        {/* <li class="sidebar-item">
                            <a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('withdrawIncome')}>
                                <span class="svg-icon svg-icon-sm svg-icon-heavy">
                                    <i class="fas fa-newspaper"></i>
                                </span><span>Withdrow Income</span></a>
                        </li> */}
                        <li class="sidebar-item">
                            <a class="sidebar-link" href="#exampledropdownDropdown1" data-bs-toggle="collapse">
                                <span class="svg-icon svg-icon-sm svg-icon-heavy">
                                    <i class="fas fa-user"></i>
                                </span><span>My Account </span></a>
                            <ul class="collapse list-unstyled " id="exampledropdownDropdown1">
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('myProfile')}>My Profile</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('changePassword')}>Change Password</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('twoFactor')}>Set Google 2-FA</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('changeTpassword')}>Change Transaction Password</a></li>
                            </ul>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link" href="#exampledropdownDropdown2" data-bs-toggle="collapse">
                                <span class="svg-icon svg-icon-sm svg-icon-heavy">
                                    <i class="fas fa-users"></i>
                                </span><span>My Team </span></a>
                            <ul class="collapse list-unstyled " id="exampledropdownDropdown2">
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('Genealogy')}> Genealogy</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('Referrals')}> Direct Referrals</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('Downline')}> All Downline</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('Left_Right_Team')}>Left-Right Team</a></li>
                            </ul>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link" href="#exampledropdownDropdown3" data-bs-toggle="collapse">
                                <span class="svg-icon svg-icon-sm svg-icon-heavy">
                                    <i class="fab fa-forumbee"></i>
                                </span><span>My Package </span></a>
                            <ul class="collapse list-unstyled " id="exampledropdownDropdown3">
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('StakingPackage')}> Stake Package With Wallet</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('StakepackageBep')}> Stake Package With DApp(BEP-20)</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('StakePackageHistory')}> My Package</a></li>
                            </ul>
                        </li>
                        {/* <li class="sidebar-item">
                            <a class="sidebar-link" href="#exampledropdownDropdown4" data-bs-toggle="collapse">
                                <span class="svg-icon svg-icon-sm svg-icon-heavy">
                                    <i class="fab fa-google-wallet"></i>
                                </span><span>My Wallet </span></a>
                            <ul class="collapse list-unstyled " id="exampledropdownDropdown4">
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('tbac_wallet')}> NSDT Wallet </a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('deposit_funds')}> Deposit Funds </a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('deposit_Details')}> Deposit Details</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('transfer_funds')}> Transfer Funds </a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('transactions')}> Transactions</a></li>
                            </ul>
                        </li> */}
                        <li class="sidebar-item">
                            <a class="sidebar-link" href="#exampledropdownDropdown5" data-bs-toggle="collapse">
                                <span class="svg-icon svg-icon-sm svg-icon-heavy">
                                    <i class="far fa-address-card"></i>
                                </span><span>My Profit </span></a>
                            <ul class="collapse list-unstyled " id="exampledropdownDropdown5">
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('mining_reward')}> Mining Reward </a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('recommendation_bonus')}> Recommendation Bonus</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('matching_bonus')}> Matching Bonus </a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('matching_mint')}> Matching Mint</a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('all_transactions')}> All Transactions</a></li>
                            </ul>
                        </li>
                        <li class="sidebar-item">
                            <a class="sidebar-link" href="#exampledropdownDropdown6" data-bs-toggle="collapse">
                                <span class="svg-icon svg-icon-sm svg-icon-heavy">
                                    <i class="far fa-file-alt"></i>
                                </span><span>Withdrawals </span></a>
                            <ul class="collapse list-unstyled " id="exampledropdownDropdown6">
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('withdrawal')}> Withdrawal </a></li>
                                <li><a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('withdrawal_details')}> Withdrawal Details</a></li>
                            </ul>
                        </li>                        
                        <li class="sidebar-item">
                            <a class="sidebar-link" href="javascript: void(0)" onClick={() => setActiveTab('notificationPAge')}>
                                <span class="svg-icon svg-icon-sm svg-icon-heavy">
                                    <i class="fas fa-envelope"></i>
                                </span><span>Notification </span></a>
                        </li>
                        {/* <li class="sidebar-item">
                            <a class="sidebar-link" href="/">
                                <span class="svg-icon svg-icon-sm svg-icon-heavy">
                                    <i class="fas fa-lock"></i>
                                </span><span>Lock Screen </span></a>
                        </li> */}
                    </ul>
                </nav>

                {activeTab === 'HomePage' &&
                    <HomePage />
                }
                {/*  {activeTab === 'withdrawIncome' &&
                    <WithdrawIncome />
                } */}
                {activeTab === 'myProfile' &&
                    <Myprofile />
                }
                {activeTab === 'changePassword' &&
                    <ChangePassword />
                }
                {activeTab === 'twoFactor' &&
                    <TwofactorPage />
                }
                {activeTab === 'changeTpassword' &&
                    <TransactionPassword />
                }
                {activeTab === 'Genealogy' &&
                    <Genealogy />
                }
                {activeTab === 'Referrals' &&
                    <DirectReferrals />
                }
                {activeTab === 'Downline' &&
                    <Downline />
                }
                {activeTab === 'Left_Right_Team' &&
                    <LeftrightTeam />
                }
                {activeTab === 'StakingPackage' &&
                    <StakePackageWallet />
                }
                {activeTab === 'StakepackageBep' &&
                    <StakepackageBep />
                }
                {activeTab === 'StakePackageHistory' &&
                    <StakePackageHistory />
                }{activeTab === 'tbac_wallet' &&
                    <TbacWallet />
                }
                {activeTab === 'deposit_funds' &&
                    <DepositFunds />
                }
                {activeTab === 'deposit_Details' &&
                    <DepositDetails />
                }
                {activeTab === 'transfer_funds' &&
                    <TransferFunds />
                }
                {activeTab === 'transactions' &&
                    <TransactionPage />
                }

                {activeTab === 'mining_reward' &&
                    <MiningReward />
                }
                {activeTab === 'recommendation_bonus' &&
                    <RecommendationBonus />
                }
                {activeTab === 'matching_bonus' &&
                    <MatchingBonus />
                }
                {activeTab === 'matching_mint' &&
                    <MatchingMint />
                }
                {activeTab === 'all_transactions' &&
                    <AllTransaction />
                }
                {activeTab === 'withdrawal' &&
                    <WithdrawPage />
                }
                {activeTab === 'withdrawal_details' &&
                    <WithdrawDetails />
                }  
                {activeTab === 'notificationPAge' &&
                    <Notifications />
                }
            </div>

            <DashboardFooter />

        </>

    )
}
export default Dashboardpage;