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

const DirectReferrals = () => {
    const { SearchBar } = Search;
    const [dRefrels, setDRefrels] = useState([]);

    const dateFilter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                {moment(row?.createdAt).format('Do MMMM YYYY')}
            </>
        );
    };

    const columns = [
        { dataField: 'date', text: 'Registration Date', sort: true, formatter: dateFilter },
        { dataField: 'loginid', text: 'Id Name', sort: true },
        { dataField: 'name', text: 'Name', sort: true },
        { dataField: 'emailId', text: 'Email', sort: true },
        { dataField: 'amount', text: 'Active Business', sort: true },
        { dataField: 'position', text: 'Location', sort: true },
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
        handleDirectReferrals()
    }, []);

    const handleDirectReferrals = async () => {
        await AuthService.getRefrelsList().then(async result => {
            if (result?.length > 0) {
                try {
                    /* alertSuccessMessage(result?.message); */
                    setDRefrels(result.reverse());
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
                    <h2 class="h5 mb-0">Direct Referrals</h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Team</li>
                        <li class="breadcrumb-item active" aria-current="page">Direct Referrals</li>
                    </ol>
                </nav>
            </div>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0"> Direct Members </h3>
                                </div>
                                <div class="card-body pt-0">
                                    <table class="table mb-0">
                                        <ToolkitProvider
                                            hover
                                            bootstrap4
                                            keyField='_id'
                                            columns={columns}
                                            data={dRefrels}
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
                                                            data={dRefrels}
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

export default DirectReferrals;