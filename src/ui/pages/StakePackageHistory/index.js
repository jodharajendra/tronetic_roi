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

const StakePackageHistory = () => {

    const [stakeHistory, setStakeHistory] = useState('');
    const { SearchBar } = Search;


    const dateFilter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                {moment(row?.createdAt).format('lll')}
            </>
        );
    };

    const contactAddress = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                {'0xA2D4d1e509ba872d1D3FF5d9Fa5a250c4B3c7c79'}
            </>
        );
    };

    const remainingAmnt = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>


            {

                row?.status === 'Complete' ? '0' :
            
                ((row?.stackingType * 3) - row?.amountPaid)

            }
            </>
        );
    };

    const columns = [
        { dataField: 'date', text: 'Date/Time', sort: true, formatter: dateFilter },
        { dataField: 'address', text: 'Contract Address', sort: true, formatter: contactAddress  },
        { dataField: 'nsdtAmount', text: 'Nsdt Amount', sort: true },
        { dataField: 'usdtAmount', text: 'USDT Amount', sort: true },
        { dataField: 'stackingType', text: 'Stacking Type', sort: true },
        { dataField: 'remainingAmnt', text: 'Remaining Amount', sort: true,formatter: remainingAmnt },
        { dataField: 'amountPaid', text: 'Paid Amount', sort: true },
        { dataField: 'depositAddress', text: 'Deposit Address', sort: true },
        { dataField: 'hash', text: 'Transaction Hash', sort: true },
        { dataField: 'status', text: 'Status', sort: true },

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
        handleStakeHistory()
    }, []);

    const handleStakeHistory = async () => {
        await AuthService.getStakeHistory().then(async result => {
            if (result?.success) {
                try {
                    /*  alertSuccessMessage(result?.msg); */
                    setStakeHistory(result?.success.reverse());
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result?.msg);
            }
        });
    }

    // <i class="fa fa-dollar-sign"></i>

    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0">Stake Package History</h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Package</li>
                        <li class="breadcrumb-item active" aria-current="page">Stake Package History</li>
                    </ol>
                </nav>
            </div>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Staking Package History</h3>
                                </div>
                                <div class="card-body pt-0">
                                    <div>
                                        <table class="table mb-0">
                                            <ToolkitProvider
                                                hover
                                                bootstrap4
                                                keyField='_id'
                                                columns={columns}
                                                data={stakeHistory}>
                                                {
                                                    props => (
                                                        <React.Fragment>
                                                            <BootstrapTable
                                                                hover
                                                                bootstrap4
                                                                keyField='_id'
                                                                columns={columns}
                                                                data={stakeHistory}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StakePackageHistory;