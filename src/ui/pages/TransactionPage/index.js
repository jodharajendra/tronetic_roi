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

const TransactionPage = () => {

    const { SearchBar } = Search;
    const [transHistory, setTransHistory] = useState([]);

    const dateFilter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                {moment(row?.createdAt).format('lll')}
            </>
        );
    };   

    const columns = [
        { dataField: 'date', text: 'Date/Time', sort: true, formatter: dateFilter },
        { dataField: 'amount', text: 'Amount', sort: true },
        { dataField: 'txType', text: 'Transaction Type', sort: true },
        { dataField: 'wallType', text: 'Wallet Type', sort: true },
        { dataField: 'txHash', text: 'Transaction Hash', sort: true },
        { dataField: 'withdrawalAddress', text: 'Withdrawal Address', sort: true },

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
        handleTransationHistory()
    }, []);

    const handleTransationHistory = async () => {
        await AuthService.getTransationHistory().then(async result => {
            if (result.success) {
                try {
                    // alertSuccessMessage(result?.msg);
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
                    <h3 class="h5 mb-0"> Transaction History </h3>
                </div>
            </div>

            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0"></h3>
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TransactionPage;