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

const Downline = () => {


  const { SearchBar } = Search;
  const [downline, setDownline] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const dateFilter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {moment(row?.date).format('Do MMMM YYYY')}
      </>
    );
  };

  const stacDate = (cell, row, rowIndex, formatExtraData) => {
    return (
      <>
        {moment(row?.stacDate).format('Do MMMM YYYY')}
      </>
    );
  };

  const columns = [
    { dataField: 'registrationDate', text: 'Registration Date', sort: true, formatter: dateFilter },
    { dataField: 'stacDate', text: 'Stack Date', sort: true, formatter: stacDate },
    { dataField: 'loginid', text: 'Login ID', sort: true },
    { dataField: 'sponserloginid', text: 'Sponser Login ID', sort: true },
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'position', text: 'Position', sort: true },
    { dataField: 'stackType', text: 'Stack Type', sort: true },
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
    handleDownline()
  }, []);

  const handleDownline = async () => {
    await AuthService.getAllDownline().then(async result => {
      if (result?.msg === 'All Downline Fetched Successfully!!') {
        try {
          // alertSuccessMessage(result?.msg);
          setDownline(result?.success)
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
          <h2 class="h5 mb-0">Downline</h2>
        </div>
      </div>
      <div class="container-fluid py-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 py-3 px-0">
            <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">My Team</li>
            <li class="breadcrumb-item active" aria-current="page">Downline</li>
          </ol>
        </nav>
      </div>
      <section class="pt-0">
        <div class="container-fluid">
          <div class="row gy-4">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="h4 mb-0"> Filter : Showing All Downline{/*  Between 2022-08-25 00:00:00.001 To 2022-08-11
                    23:59:59.000 */} </h3>
                </div>
                <div class="card-body pt-0">
                  <form class="row g-3 align-items-center">
                    <div class="col-lg">
                      <label class="visually-visible" for="inlineFormInputGroupUsername">From</label>
                      <div class="input-group">
                        <input class="form-control" id="inlineFormInputGroupUsername" type="date"
                          placeholder="Username" />
                      </div>
                    </div>
                    <div class="col-lg">
                      <label class="visually-visible" for="inlineFormInputGroupUsername">To</label>
                      <div class="input-group">
                        <input class="form-control" id="inlineFormInputGroupUsername" type="date"
                          placeholder="Username" />
                      </div>
                    </div>
                    <div class="col-lg">
                      <label class="visually-visible" for="inlineFormSelectPref">Package</label>
                      <select class="form-select" id="inlineFormSelectPref">
                        <option selected="">Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div class="col-lg">
                      <label class="visually-visible" for="inlineFormSelectPref">Select Paid / Unpaid</label>
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
      </section>.

      <section class="pt-0">
        <div class="container-fluid">
          <div class="row gy-4">
            <div class="col-lg-12">
              <div class="card h-100">
                <div class="card-header d-flex align-items-center justify-content-between">
                  <h3 class="h4 mb-0"> Downline </h3></div>
                <div class="card-body pt-0 ">
                  <div class="">
                    <table class="table mb-0">

                      <ToolkitProvider
                        hover
                        bootstrap4
                        keyField='_id'
                        columns={columns}
                        data={downline}
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
                                data={downline}
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

export default Downline;