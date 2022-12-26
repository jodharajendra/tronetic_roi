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

const RecommendationBonus = () => {

    const { SearchBar } = Search;
    const [bonus, setBonus] = useState([]);
    const [totalDirectincome, setTotalDirectincome] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const dateFilter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                {moment(row?.date).format('Do MMMM YYYY')}
            </>
        );
    };


    const columns = [
        { dataField: 'stackingType', text: 'STACKING TYPE', sort: true },
        { dataField: 'loginid', text: 'USER ID	', sort: true },
        { dataField: 'actualAmount', text: 'ACTUAL AMT', sort: true },
        { dataField: 'percentage', text: 'PERCENTAGE', sort: true },
        { dataField: 'commis', text: 'COMMISION', sort: true },
        { dataField: 'description', text: 'DESCRIPTION', sort: true },
        { dataField: 'date', text: 'DATE', sort: true, formatter: dateFilter },

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
        reCommendationBonus()
    }, []);

    const reCommendationBonus = async () => {
        await AuthService.getCommandBonus().then(async result => {
            if (result?.msg === 'Recommendation Bonus Fetched Successfully!!') {
                try {
                    // alertSuccessMessage(result?.msg);
                    setBonus(result?.insdata?.data.reverse());
                    setTotalDirectincome(result?.insdata?.totalDirectIncome)
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                // alertErrorMessage("Something Went Wrong");
            }
        });
    }

    const handleBonusFilter = async () => {
        alert(dateFrom);
        reCommendationBonus();
    }

    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0"> Recommendation Bonus </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Profit</li>
                        <li class="breadcrumb-item active" aria-current="page"> Recommendation Bonus </li>
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
                                    <form class="row g-3 mb-3 align-items-center">
                                        {/* <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref">Select Day</label>
                                            <select class="form-select" id="inlineFormSelectPref">
                                                <option selected="">Choose...</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div> */}
                                        <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref">From</label>
                                            <input class="form-control" id="inlineFormInputGroupUsername" type="date" value={dateFrom}
                                                onChange={(event) => setDateFrom(event.target.value)} />
                                        </div>
                                        <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref">To</label>
                                            <input class="form-control" id="inlineFormInputGroupUsername" type="date" value={dateTo}
                                                onChange={(event) => setDateTo(event.target.value)} />
                                        </div>
                                        <div class="col-lg">
                                            <label class="visually-visible" for="inlineFormSelectPref"></label>
                                            <button class="btn btn-primary bt-block w-100 mt-4" type="button" onClick={() => handleBonusFilter(dateFrom, dateTo)}>Submit</button>
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
                            <div class="card mb-0 h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">Recommendation Bonus</h3> <strong class="text-white" >
                                        Total Direct income:  {totalDirectincome}</strong>
                                </div>
                                <div class="card-body pt-0">
                                    <div class="">
                                        <table class="table mb-0">
                                            <ToolkitProvider
                                                hover
                                                bootstrap4
                                                keyField='_id'
                                                columns={columns}
                                                data={bonus}
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
                                                                data={bonus}
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

export default RecommendationBonus;