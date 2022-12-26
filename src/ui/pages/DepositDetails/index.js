import React from "react";

const DepositDetails = () => {
    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0"> Deposit Details </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Package</li>
                        <li class="breadcrumb-item active" aria-current="page">Deposit Details</li>
                    </ol>
                </nav>
            </div>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Deposit Details List</h3>
                                </div>

                                <div class="card-body pt-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr style={{ backgroundColor: '#000429' }}>
                                                    <th>TRID</th>
                                                    <th>DATE</th>
                                                    <th>CREDIT</th>
                                                    <th>DEBIT</th>
                                                    <th>DESCRIPTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>76342212</td>
                                                    <td>21-Jun-2022 06:59 PM</td>
                                                    <td>50</td>
                                                    <td>17</td>
                                                    <td>Purchase Package : (50 TrID : 76342212)</td>
                                                </tr>

                                                <tr>
                                                    <td>76342212</td>
                                                    <td>21-Jun-2022 06:59 PM</td>
                                                    <td>50</td>
                                                    <td>17</td>
                                                    <td>Purchase Package : (50 TrID : 76342212)</td>
                                                </tr>

                                                <tr>
                                                    <td>76342212</td>
                                                    <td>21-Jun-2022 06:59 PM</td>
                                                    <td>50</td>
                                                    <td>17</td>
                                                    <td>Purchase Package : (50 TrID : 76342212)</td>
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

export default DepositDetails;