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

const MatchingBonus = () => {

    const [matchingBonus, setMatchingBonus] = useState('');
    const { SearchBar } = Search;


    const dateFilter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                {moment(row?.createdAt).format('lll')}
            </>
        );
    };


    const columns = [
        { dataField: 'date', text: 'Date/Time', sort: true, formatter: dateFilter },
        { dataField: 'loginid', text: 'Login Id', sort: true },
        { dataField: 'from', text: 'From', sort: true },
        { dataField: 'amount', text: 'Amount', sort: true },
        { dataField: 'txType', text: 'Txtype', sort: true },
        { dataField: 'wallType', text: 'wallType', sort: true },
        { dataField: 'txHash', text: 'Txhash', sort: true },
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
        handleMatchingBonus()
    }, []);

    const handleMatchingBonus = async () => {
        await AuthService.getMatchingBonus().then(async result => {
            if (result?.msg === 'Recommendation Bonus Fetched Successfully!!') {
                try {
                    setMatchingBonus(result?.insdata.reverse());
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
                    <h2 class="h5 mb-0"> Matching Bonus </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Profit</li>
                        <li class="breadcrumb-item active" aria-current="page"> Matching Bonus </li>
                    </ol>
                </nav>
            </div>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Matching Bonus</h3>
                                </div>

                                <div class="card-body pt-0">
                                    <div >
                                        <table class="table mb-0">
                                            <ToolkitProvider
                                                hover
                                                bootstrap4
                                                keyField='_id'
                                                columns={columns}
                                                data={matchingBonus}>
                                                {
                                                    props => (
                                                        <React.Fragment>
                                                            <BootstrapTable
                                                                hover
                                                                bootstrap4
                                                                keyField='_id'
                                                                columns={columns}
                                                                data={matchingBonus}
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

export default MatchingBonus;