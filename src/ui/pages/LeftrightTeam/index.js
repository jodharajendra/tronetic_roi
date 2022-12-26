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

const LeftrightTeam = () => {

    const { SearchBar } = Search;
    const [leftRightList, setLeftRightList] = useState([]);


    const dateFilter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                {moment(row?.createdAt).format('lll')}
            </>
        );
    };

    const columns = [
        { dataField: 'createdAt', text: 'Registration Date', sort: true, formatter: dateFilter },
        { dataField: 'loginid', text: 'Id Name', sort: true },
        { dataField: 'name', text: 'Name', sort: true },
        { dataField: 'emailId', text: 'Email', sort: true },
        { dataField: 'withdrawalAddress', text: 'Active Business', sort: true },
        { dataField: 'position', text: 'position', sort: true },
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
        handleleftRightDetails()
    }, []);

    const handleleftRightDetails = async () => {
        await AuthService.getUserLeftRight().then(async result => {
            if (result.success) {
                try {
                    // alertSuccessMessage(result);
                    setLeftRightList(result?.success.reverse());
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result);
            }
        });
    }

    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0">Left-Right Team</h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Team</li>
                        <li class="breadcrumb-item active" aria-current="page">Left-Right Team</li>
                    </ol>
                </nav>
            </div>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="h4 mb-0"> Filter </h3>
                                </div>
                                <div class="card-body pt-0">
                                    <form class="row g-3 align-items-center">
                                        <div class="col-lg">
                                            <div class="input-group pt-3">
                                                <label class="visually-visible" for="inlineFormInputGroupUsername">Select Position</label>
                                                <div class="form-check me-4 ms-4">
                                                    <input class="form-check-input" id="defaultRadio0" type="radio" name="exampleRadios" />
                                                    <label class="form-check-label" for="defaultRadio0"> Left </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" id="defaultRadio1" type="radio" name="exampleRadios"
                                                        checked="" />
                                                    <label class="form-check-label" for="defaultRadio1"> Right </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref">Order By</label>
                                            <select class="form-select" id="inlineFormSelectPref">
                                                <option selected="">Choose...</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref">Order By</label>
                                            <select class="form-select" id="inlineFormSelectPref">
                                                <option selected="">Choose...</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref"></label>
                                            <button class="btn btn-primary bt-block w-100 mt-4" type="submit">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0"> Left-Right Team List </h3>
                                </div>
                                <div class="card-body pt-0">
                                    {/* <div class="table-responsive"> */}
                                    <ToolkitProvider
                                        hover
                                        bootstrap4
                                        keyField='_id'
                                        columns={columns}
                                        data={leftRightList}
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
                                                        data={leftRightList}
                                                        pagination={pagination}
                                                        filter={filterFactory()}
                                                        {...props.baseProps}
                                                    />
                                                </React.Fragment>
                                            )
                                        }
                                    </ToolkitProvider>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LeftrightTeam;