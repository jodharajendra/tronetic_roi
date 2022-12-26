import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { CSVLink } from "react-csv";
import moment from "moment";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";

const WithdrawDetails = () => {

    const { SearchBar } = Search;
    const [transHistory, setTransHistory] = useState([]);

    const dateFilter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                {moment(row?.createdAt).format('lll')}
            </>
        );
    };

   /*  const statusFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className={`badge ${row?.withdrawalStatus === 0 ? "bg-secondary" : row?.withdrawalStatus === 1 ? "bg-success" : row?.withdrawalStatus === 2 ? "bg-danger" : null} text-white rounded-pill `}>

                {row?.withdrawalStatus == "0" ? "Pending" : row?.withdrawalStatus == "1" ? "Approved" : row?.withdrawalStatus == "2" ? "Rejected" : null}

            </div>
        );
    };
 */
    const columns = [
        { dataField: 'txHash', text: 'Transaction Hash', sort: true },
        { dataField: 'date', text: 'Date/Time', sort: true, formatter: dateFilter },
        { dataField: 'amount', text: 'Amount(in USDT)', sort: true },
        { dataField: 'nsdtcoin', text: 'Token Amount', sort: true },
        { dataField: 'withdrawalAddress', text: 'Withdrawal Address', sort: true },
        // { dataField: 'status', text: 'Status', sort: true, formatter: statusFormatter },
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
    });


    useEffect(() => {
        handleWithdrawHistory()
    }, []);

    const handleWithdrawHistory = async () => {
        await AuthService.getWithdrawHistory().then(async result => {
            if (result.msg === 'Withdrawal History Fetched Successfully') {
                try {
                   /*  alertSuccessMessage(result?.msg); */
                    setTransHistory(result?.success.reverse());
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
                    <h2 class="h5 mb-0"> Withdraw Details </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Withdrawals</li>
                        <li class="breadcrumb-item active" aria-current="page"> Withdrawal Details </li>
                    </ol>
                </nav>
            </div>

            {/* <section>
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
                                            <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">Income Wallet</p>
                                        </div>
                                        <p class="text-xxl lh-1 mb-0 text-dash-color-1"> $  7.00</p>
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
                                            <p class="text-sm text-uppercase text-gray-600 lh-1 mb-0">Withdrawal Details </p>
                                        </div>
                                        <p class="text-xxl lh-1 mb-0 text-dash-color-2">$  1.00</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <p class=" mt-4 text-center" >Important Note : <br />
                        Minimum withdrawal is $ 10.
                        5% of the total amount will be charge as withdrawal Transaction Charges...!  </p>
                    <p class="text-center">
                        10% will be dedected for Liquidity Pool (Liquidity amount automatiaclly released after Submitting ( Locked Liquidity detail to system) )
                        Current Rate : 1 TBAC =  <span class="text-white" > $ 23.6760</span>
                    </p>
                </div>
            </section> */}

            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Withdrawal History</h3>
                                </div>

                                <div class="card-body pt-0">
                                    <table class="table mb-0">
                                        <ToolkitProvider
                                            hover
                                            bootstrap4
                                            keyField='_id'
                                            columns={columns}
                                            data={transHistory}
                                            search >
                                            {
                                                props => (
                                                    <React.Fragment>
                                                        <SearchBar {...props.searchProps} />
                                                        <BootstrapTable
                                                            hover
                                                            bootstrap4
                                                            keyField='_id'
                                                            columns={columns}
                                                            data={transHistory}
                                                            pagination={pagination}
                                                            filter={filterFactory()}
                                                            {...props.baseProps}
                                                        />
                                                    </React.Fragment>
                                                )
                                            }
                                        </ToolkitProvider>
                                    </table>
                                </div>

                                {/*   <div class="card-body pt-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr style={{ backgroundColor: '#000429' }}>
                                                    <th>TrID</th>
                                                    <th>Date/Time</th>
                                                    <th>Amount</th>
                                                    <th>Withdrawal Address</th>
                                                    <th>TXID</th>
                                                    <th> Status </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>76342212</td>
                                                    <td>21-Jun-2022 06:59 PM</td>
                                                    <td>213123</td>
                                                    <td>0x3521aC6E8Faa40D819BA5423e0fd35aCc103050e</td>
                                                    <td>0xc89ef89d9c94f53117214232d383b367c53cf5a0988f760b095e57e0e03c069e</td>
                                                    <td>Approved</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WithdrawDetails;