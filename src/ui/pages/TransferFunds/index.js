import React from "react";

const TransferFunds = () => {
    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0"> Transfer Funds </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Package</li>
                        <li class="breadcrumb-item active" aria-current="page"> Transfer Funds </li>
                    </ol>
                </nav>
            </div>
            <section>
                <div class="container-fluid">
                    <div class="row gy-4 justify-content-center">
                        <div class="col-md-3 col-sm-6">
                            <a href="#" class="card card_hover mb-0">
                                <div class="card-body">
                                    <div class="d-flex align-items-end justify-content-between mb-2">
                                        <div class="me-2">
                                            <span class="svg-icon svg-icon-sm svg-icon-heavy text-gray-600 mb-2">
                                                <i class="fas fa-wallet"></i>
                                            </span>
                                            <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">Main Wallet </p>
                                        </div>
                                        <p class="text-xxl lh-1 mb-0 text-dash-color-1">27</p>
                                    </div>
                                    <div class="progress" style={{height: '3px'}}>
                                        <div class="progress-bar bg-dash-color-1" role="progressbar" 
                                        style={{width: '30%'}} aria-valuenow="30"
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
                                            <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">NSDT Wallet </p>
                                        </div>
                                        <p class="text-xxl lh-1 mb-0 text-dash-color-2">375</p>
                                    </div>
                                    <div class="progress" style={{height: '3px'}}>
                                        <div class="progress-bar bg-dash-color-2" role="progressbar" 
                                        style={{width: '70%'}} aria-valuenow="70"
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
                                            <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0"> Income Wallet </p>
                                        </div>
                                        <p class="text-xxl lh-1 mb-0 text-dash-color-2">375</p>
                                    </div>
                                    <div class="progress" style={{height: '3px'}}>
                                        <div class="progress-bar bg-dash-color-2" role="progressbar" 
                                        style={{width: '70%'}} aria-valuenow="70"
                                            aria-valuemin="0" aria-valuemax="100"></div>
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
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Transfer Transaction History</h3>
                                </div>
                                <div class="card-body pt-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr style={{ backgroundColor: '#000429' }}>
                                                    <th>Date/Time</th>
                                                    <th>Description</th>
                                                    <th>Cradit</th>
                                                    <th>Debit</th>
                                                    <th> Wallet Type</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>76342212</td>
                                                    <td>21-Jun-2022 06:59 PM</td>
                                                    <td>Active</td>
                                                    <td>GAINER</td>
                                                    <td>50</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TransferFunds;