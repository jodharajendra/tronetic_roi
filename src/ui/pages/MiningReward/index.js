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

const MiningReward = () => {

    const { SearchBar } = Search;
    const [miningReward, setMiningReward] = useState([]);

    const dateFilter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                {moment(row?.createdAt).format('Do MMMM YYYY')}
            </>
        );
    };


    const columns = [
        { dataField: '_id', text: 'Transaction ID', sort: true },
        { dataField: 'amount', text: 'Debit', sort: true },
        { dataField: 'txType', text: 'Transaction Type', sort: true },
        { dataField: 'wallType', text: 'Wallet Type', sort: true },
        { dataField: 'date', text: 'Date/Time', sort: true, formatter: dateFilter },

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
        handleMiningReward()
    }, []);

    const handleMiningReward = async () => {
        await AuthService.getMiningReward().then(async result => {
            if (result?.msg === 'Reward Fetched Successfully!!') {
                try {
                    // alertSuccessMessage(result?.msg);
                    setMiningReward(result?.success.reverse());
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                // alertErrorMessage("Something Went Wrong");
            }
        });
    }

    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0"> Mining Reward </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Profit</li>
                        <li class="breadcrumb-item active" aria-current="page"> Mining Reward </li>
                    </ol>
                </nav>
            </div>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Mining Reward</h3>
                                </div>
                                <div class="card-body pt-0">
                                    <div class="">
                                        <table class="table mb-0">
                                            <ToolkitProvider
                                                hover
                                                bootstrap4
                                                keyField='_id'
                                                columns={columns}
                                                data={miningReward}
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
                                                                data={miningReward}
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

export default MiningReward;