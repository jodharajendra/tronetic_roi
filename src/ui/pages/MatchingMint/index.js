import React from "react";

const MatchingMint = () => {
    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0"> Matching Mint </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Profit</li>
                        <li class="breadcrumb-item active" aria-current="page"> Matching Mint </li>
                    </ol>
                </nav>
            </div>



            {/* <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="h4 mb-0"> Filter </h3>
                                </div>
                                <div class="card-body pt-0">
                                    <form class="row g-3 mb-3 align-items-center">
                                        <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref">Select Day</label>
                                            <select class="form-select" id="inlineFormSelectPref">
                                                <option selected="">Choose...</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref">From</label>
                                            <input class="form-control" id="inlineFormInputGroupUsername" type="date" placeholder="Username" />
                                        </div>
                                        <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref">To</label>
                                            <input class="form-control" id="inlineFormInputGroupUsername" type="date" placeholder="Username" />
                                        </div>
                                        <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref"></label>
                                            <button class="btn btn-primary bt-block w-100 " type="submit">Submit</button>
                                        </div>
                                    </form>

                                    <p>Total Direct : 0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Matching Tree</h3>
                                </div>
                                <div class="card-body pt-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr style={{ backgroundColor: '#000429' }}>
                                                    <th>SERIAL NO</th>
                                                    <th> # REF NO</th>
                                                    <th> PAYOUT DATE</th>
                                                    <th> Pre Right</th>
                                                    <th> STATUS</th>
                                                    <th> MATCHING BONUS</th>
                                                    <th> VALIDITY</th>
                                                    <th> DAYS RELEASED</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>372</td>
                                                    <td>2022-08-07 11:59:59</td>
                                                    <td>1140</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
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

export default MatchingMint;