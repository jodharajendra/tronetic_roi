import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";

const Genealogy = () => {
    const [referralLinkLeft, setReferralLinkLeft] = useState('');
    const [referralLinkRight, setReferralLinkRight] = useState('');
    const [genealogy, setGenealogyDetails] = useState([]);
    const [genealogyTreeLeft, setGenealogyTreeLeft] = useState([]);
    const [genealogyTreeRight, setGenealogyTreeRight] = useState([]);
    const [genologySearch, setGenologySearch] = useState('');
    const [masterLoginId, setMasterLoginId] = useState([]);
    const [masterName, setMasterName] = useState([]);


    const name = localStorage.getItem("name");
    const loginid = localStorage.getItem("loginid");

    console.log(loginid, 'loginid');

    useEffect(() => {
        handleGenealogyDetails();
        handleGenealogyTree();
        handleReferLeft();
        handleReferRight();
    }, []);

    const handleGenealogyDetails = async () => {
        await AuthService.getGenealogyList(loginid).then(async result => {
            if (result?.success) {
                try {
                    setGenealogyDetails(result?.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage("Something Went Wrong");
            }
        });
    }

    const handleGenealogyTree = async () => {
        await AuthService.getGenealogyTree(loginid).then(async result => {
            if (result?.msg === 'Tree generated Successfully!!') {
                try {
                    setGenealogyTreeLeft(result?.data?.lefttree);
                    setGenealogyTreeRight(result?.data?.righttree);
                    setMasterLoginId(result?.data?.masterloginid);
                    setMasterName(result?.data?.mastername);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage("Something Went Wrong");
            }
        });
    }

    const handleGenealogySearch = async (genologySearch) => {
        await AuthService.getSearchGenealogy(genologySearch, loginid).then(async result => {
            if (result?.success) {
                try {
                    setGenealogyDetails(result?.data);
                    setGenologySearch('');
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result?.message);
            }
        });
    }

    const handleReferLeft = async () => {
        await AuthService.referralLeft().then(async result => {
            if (result) {
                try {
                    /*  alertSuccessMessage(result.message); */
                    setReferralLinkLeft(result?.refer);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message)
            }
        })
    }

    const handleReferRight = async () => {
        await AuthService.referralRight().then(async result => {
            if (result) {
                try {
                    /*  alertSuccessMessage(result.message); */
                    setReferralLinkRight(result?.refer);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message)
            }
        })
    }

    const handleGenealogyTreeSearch = async (loginId) => {
        await AuthService.getGenealogyTreeSearch(loginId).then(async result => {
            if (result?.msg === 'Tree generated Successfully!!') {
                try {
                    setGenealogyTreeLeft(result?.data?.lefttree);
                    setGenealogyTreeRight(result?.data?.righttree);
                    setMasterLoginId(result?.data?.masterloginid);
                    setMasterName(result?.data?.mastername);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage("Something Went Wrong");
            }
        });
    }

    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0">Dashboard</h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Team</li>
                        <li class="breadcrumb-item active" aria-current="page">Genealogy Tree</li>
                    </ol>
                </nav>
            </div>
            <section class="pt-0">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card h-100">
                                <div class="card-header d-flex align-items-center justify-content-between">
                                    <h3 class="h4 mb-0">SEARCH DOWNLINE ID  </h3>
                                    <div>
                                        <div className="input-group" >
                                            <input type="search" className="form-control" value={genologySearch} onChange={(e) => setGenologySearch(e.target.value)} />
                                            <button className="btn btn-primary" type="button" onClick={() => handleGenealogySearch(genologySearch)} >
                                                <i className="fa fa-search" ></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body pt-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Details</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th> Left </th>
                                                    <th> Right </th>
                                                    <th> Total </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td> Sponser ID </td>
                                                    <td> {genealogy?.sponserid} </td>
                                                    <td> Total Count </td>
                                                    <td> {genealogy?.leftcount} </td>
                                                    <td> {genealogy?.rightcount} </td>
                                                    <td> {genealogy?.totalcount} </td>
                                                </tr>
                                                <tr>
                                                    <td> Registration Details </td>
                                                    <td>  {genealogy?.registrationid}  </td>
                                                    <td> Total Active ID </td>
                                                    <td> 0 </td>
                                                    <td> 0 </td>
                                                    <td> 0 </td>

                                                </tr>
                                                <tr>
                                                    <td> Date of Joining</td>
                                                    <td> {moment(genealogy?.dateofjoining).format('Do MMMM YYYY')} </td>
                                                    <td> Last 24hr Business With CF </td>
                                                    <td> 0 </td>
                                                    <td> 0 </td>
                                                    <td> 0 </td>

                                                </tr>
                                                <tr>
                                                    <td> Self Investment </td>
                                                    <td> {genealogy?.selfInvestment} </td>
                                                    <td> Team Business </td>
                                                    <td> {genealogy?.leftTeamBusiness} </td>
                                                    <td> {genealogy?.rightTeamBusiness} </td>
                                                    <td> {parseFloat(genealogy?.leftTeamBusiness + genealogy?.rightTeamBusiness)} </td>

                                                </tr>
                                                <tr>
                                                    <td> Date of First Purchase</td>
                                                    <td> {moment(genealogy?.firstPurchase).format('Do MMMM YYYY')}  </td>

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
            <section class="p-0">
                <div class="container-fluid">
                    <div class="row" style={{ textAlign: 'center' }}>
                        <div class="col-md-6" style={{ marginTop: '10px' }}>
                            <a class="btn btn-danger" href={"https://tronnetic.ai" + '/signup?reffcode=' + referralLinkLeft}>
                                Left
                            </a>
                        </div>
                        <div class="col-md-6" style={{ marginTop: '10px' }}>
                            <a class="btn btn-danger" href={"https://tronnetic.ai" + '/signup?reffcode=' + referralLinkRight}>
                                Right
                            </a>
                        </div>
                    </div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td>
                                    <div align="center">
                                        <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                        <br />
                                        <a id="ctl00_cp_unmLbl1" title="Click Here to Open Genology" style={{ color: 'White' }}>{masterName}</a>
                                        <br />
                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                            id="ctl00_cp_idLbl1" style={{ color: '#fff', cursor: 'pointer' }}>{masterLoginId}</span></a>
                                        <br />
                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                            id="ctl00_cp_lbl_click1" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                        <br /> <strong></strong><span class="red-txt red-txt"></span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div align="center">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <img src="img/tree/linesbig.svg" style={{ width: '50%' }} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div align="center">
                                                        {genealogyTreeLeft[0]?.accountStatus === 'Active' ?
                                                            <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                            : genealogyTreeLeft[0]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                        }
                                                        <br />
                                                        <a id="ctl00_cp_unmLbl2" title="Click Here to Open Genology"
                                                            style={{ color: 'White', cursor: 'pointer' }}
                                                            onClick={() => {
                                                                handleGenealogyTreeSearch(genealogyTreeLeft[0]?.loginid);
                                                                handleGenealogySearch(genealogyTreeLeft[0]?.loginid)
                                                            }}>{genealogyTreeLeft[0]?.name}</a>
                                                        <br />
                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl2'); return true;"> <span
                                                            id="ctl00_cp_idLbl2" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeLeft[0]?.loginid}</span></a>
                                                        <br /> <strong></strong>
                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl2'); return true;"> <span
                                                            id="ctl00_cp_lbl_click2" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                    </div>
                                                </td>
                                                <td width="6" rowspan="2">
                                                    <div align="center"></div>
                                                </td>
                                                <td>
                                                    <div align="center">
                                                        {genealogyTreeRight[0]?.accountStatus === 'Active' ?
                                                            <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                            : genealogyTreeRight[0]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                        }
                                                       
                                                        <br />
                                                        <a id="ctl00_cp_unmLbl3" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => {
                                                            handleGenealogyTreeSearch(genealogyTreeRight[0]?.loginid);
                                                            handleGenealogySearch(genealogyTreeRight[0]?.loginid)
                                                        }}>{genealogyTreeRight[0]?.name}</a>
                                                        <br />
                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl3'); return true;"> <span
                                                            id="ctl00_cp_idLbl3" style={{ color: '#fff' }}>{genealogyTreeRight[0]?.loginid}</span></a>
                                                        <br />
                                                        <strong></strong><span class="red-txt red-txt">
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* <tr>
                                                <td>
                                                    <div align="center">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <img src="img/tree/linesmedium.svg" style={{ width: '50%' }} /></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div align="center">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <img src="img/tree/linesmedium.svg" style={{ width: '50%' }} /></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr> */}
                                            {/* <tr>
                                                <td>
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div align="center">

                                                                        {genealogyTreeLeft[1]?.accountStatus === 'Active' ?
                                                                            <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                            : genealogyTreeLeft[1]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                        }
                                                                        
                                                                        <br />
                                                                        <a id="ctl00_cp_unmLbl4" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeLeft[1]?.loginid)}>{genealogyTreeLeft[1]?.name}</a>
                                                                        <br />
                                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl4'); return true;"> <span
                                                                            id="ctl00_cp_idLbl4" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeLeft[1]?.loginid}</span></a>
                                                                        <br />
                                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                            id="ctl00_cp_lbl_click4" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div align="center">
                                                                        {genealogyTreeRight[1]?.accountStatus === 'Active' ?
                                                                            <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                            : genealogyTreeRight[1]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                        }
                                                                        
                                                                        <br />
                                                                        <a id="ctl00_cp_unmLbl5" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeRight[1]?.loginid)}>{genealogyTreeRight[1]?.name}</a>  
                                                                        <br />
                                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl5'); return true;"> <span
                                                                            id="ctl00_cp_idLbl5" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeRight[1]?.loginid}</span></a>
                                                                        <br />
                                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                            id="ctl00_cp_lbl_click5" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div align="center">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style={{ textAlign: 'center' }}>
                                                                                        <img src="img/tree/linesmall.svg" style={{ width: '70%' }} /> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div align="center">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style={{ textAlign: 'center' }}>
                                                                                        <img src="img/tree/linesmall.svg" style={{ width: '70%' }} /> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td>
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div align="center">
                                                                        {genealogyTreeLeft[2]?.accountStatus === 'Active' ?
                                                                            <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                            : genealogyTreeLeft[2]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                        }

                                                                        <br />
                                                                        <a id="ctl00_cp_unmLbl6" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeLeft[2]?.loginid)}>{genealogyTreeLeft[2]?.name}</a> 
                                                                        <br />
                                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl6'); return true;"> {genealogyTreeLeft[2]?.loginid}<span
                                                                            id="ctl00_cp_idLbl6" style={{ color: '#fff' }}></span></a>
                                                                        <br />
                                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                            id="ctl00_cp_lbl_click6" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div align="center"> <span class="smallstrip4">
                                                                        {genealogyTreeRight[2]?.accountStatus === 'Active' ?
                                                                            <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                            : genealogyTreeRight[2]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                        }

                                                                    </span>
                                                                        <br />
                                                                        <a id="ctl00_cp_unmLbl7" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeRight[2]?.loginid)}>{genealogyTreeRight[2]?.name}</a>
                                                                        <br />
                                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl7'); return true;"> <span
                                                                            id="ctl00_cp_idLbl7" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeRight[2]?.loginid}</span></a>
                                                                        <br />
                                                                        <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                            id="ctl00_cp_lbl_click7" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div align="center">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style={{ textAlign: 'center' }}>
                                                                                        <img src="img/tree/linesmall.svg" style={{ width: '70%' }} /> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div align="center">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style={{ textAlign: 'center' }}>
                                                                                        <img src="img/tree/linesmall.svg" style={{ width: '70%' }} />
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr> */}
                                            {/* <tr>
                                                <td>
                                                    <div align="center">
                                                        <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="24%">
                                                                        <div align="left">

                                                                            {genealogyTreeLeft[3]?.accountStatus === 'Active' ?
                                                                                <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                : genealogyTreeLeft[3]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                    : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                        style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                            }


                                                                            <br />
                                                                            <a id="ctl00_cp_unmLbl8" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeLeft[3]?.loginid)}>{genealogyTreeLeft[3]?.name}</a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl8'); return true;"> <span
                                                                                id="ctl00_cp_idLbl8" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeLeft[3]?.loginid}</span></a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                                id="ctl00_cp_lbl_click8" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                        </div>
                                                                    </td>
                                                                    <td width="22%">
                                                                        <div align="right">

                                                                            {genealogyTreeRight[3]?.accountStatus === 'Active' ?
                                                                                <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                : genealogyTreeRight[3]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                    : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                        style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                            }


                                                                            <br />
                                                                            <a id="ctl00_cp_unmLbl9" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeRight[3]?.loginid)}>{genealogyTreeRight[3]?.name}</a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl9'); return true;"> <span
                                                                                id="ctl00_cp_idLbl9" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeRight[3]?.loginid}</span></a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                                id="ctl00_cp_lbl_click9" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                        </div>
                                                                    </td>
                                                                    <td width="8%">&nbsp;</td>
                                                                    <td width="22%">
                                                                        <div align="left">
                                                                            {genealogyTreeLeft[4]?.accountStatus === 'Active' ?
                                                                                <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                : genealogyTreeLeft[4]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                    : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                        style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                            }


                                                                            <br />
                                                                            <a id="ctl00_cp_unmLbl10" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeLeft[4]?.loginid)}>{genealogyTreeLeft[4]?.name}</a> 
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl10'); return true;">
                                                                                <span id="ctl00_cp_idLbl10" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeLeft[4]?.loginid}</span></a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                                id="ctl00_cp_lbl_click10" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                        </div>
                                                                    </td>
                                                                    <td width="24%">
                                                                        <div align="right">

                                                                            {genealogyTreeRight[4]?.accountStatus === 'Active' ?
                                                                                <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                : genealogyTreeRight[4]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                    : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                        style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                            }


                                                                            <br />
                                                                            <a id="ctl00_cp_unmLbl11" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeRight[4]?.loginid)}>{genealogyTreeRight[4]?.name}</a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl11'); return true;">
                                                                                <span id="ctl00_cp_idLbl11" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeRight[4]?.loginid}</span></a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                                id="ctl00_cp_lbl_click11" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                                <td>&nbsp;</td>
                                                <td>
                                                    <div align="center">
                                                        <table width="95%" border="0" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="24%">
                                                                        <div align="left">
                                                                            {genealogyTreeLeft[5]?.accountStatus === 'Active' ?
                                                                                <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                : genealogyTreeLeft[5]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                    : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                        style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                            }

                                                                            <br />
                                                                            <a id="ctl00_cp_unmLbl12" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeLeft[5]?.loginid)}>{genealogyTreeLeft[5]?.name}</a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl12'); return true;">
                                                                                <span id="ctl00_cp_idLbl12" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeLeft[5]?.loginid}</span></a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                                id="ctl00_cp_lbl_click12" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                        </div>
                                                                    </td>
                                                                    <td width="22%">
                                                                        <div align="right">
                                                                            <span class="smallstrip4">
                                                                                {genealogyTreeRight[5]?.accountStatus === 'Active' ?
                                                                                    <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                    : genealogyTreeRight[5]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                        style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                        : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                            style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                }

                                                                            </span>
                                                                            <br />
                                                                            <a id="ctl00_cp_unmLbl13" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeRight[5]?.loginid)}>{genealogyTreeRight[5]?.name}</a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl13'); return true;">
                                                                                <span id="ctl00_cp_idLbl13" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeRight[5]?.loginid}</span></a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                                id="ctl00_cp_lbl_click13" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                        </div>
                                                                    </td>
                                                                    <td width="9%">&nbsp;</td>
                                                                    <td width="20%">
                                                                        <div align="left">
                                                                            <span class="smallstrip4">
                                                                                {genealogyTreeLeft[6]?.accountStatus === 'Active' ?
                                                                                    <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                    : genealogyTreeLeft[6]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                        style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                        : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                            style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                }

                                                                            </span>
                                                                            <br />
                                                                            <a id="ctl00_cp_unmLbl14" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeLeft[6]?.loginid)}>{genealogyTreeLeft[6]?.name}</a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl14'); return true;">
                                                                                <span id="ctl00_cp_idLbl14" style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeLeft[6]?.loginid}</span></a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                                id="ctl00_cp_lbl_click14" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                        </div>
                                                                    </td>
                                                                    <td width="25%">
                                                                        <div align="right">
                                                                            {genealogyTreeRight[6]?.accountStatus === 'Active' ?
                                                                                <img id="ctl00_cp_img1" src="img/tree/green-levoplus.png" style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                : genealogyTreeRight[6]?.accountStatus === 'Inactive' ? <img id="ctl00_cp_img2" src="img/tree/orange-levoplus.png"
                                                                                    style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                                    : <img id="ctl00_cp_img5" src="img/tree/open.png"
                                                                                        style={{ height: '60px', width: '60px', borderWidth: '0px' }} />
                                                                            }

                                                                            <br />
                                                                            <a id="ctl00_cp_unmLbl15" title="Click Here to Open Genology" style={{ color: 'White', cursor: 'pointer' }} onClick={() => handleGenealogyTreeSearch(genealogyTreeRight[6]?.loginid)}>{genealogyTreeRight[6]?.name}</a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl15'); return true;">
                                                                                <span id="ctl00_cp_idLbl15"
                                                                                    style={{ color: '#fff', cursor: 'pointer' }}>{genealogyTreeRight[6]?.loginid}</span></a>
                                                                            <br />
                                                                            <a onmouseover="ShowContent('uniquename3','ctl00_cp_idLbl1'); return true;"> <span
                                                                                id="ctl00_cp_lbl_click15" style={{ color: '#000000', cursor: 'pointer' }}></span></a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section class="">
                <div class="container-fluid">
                    <div class="row gy-4">
                        <div class="col-lg-12">
                            <div class="card mb-0 h-100">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 text-center">
                                            <span>
                                                <img src="img/tree/open.png" height="30" /> <br />
                                                <b> <span class="pt-2">Open</span></b>
                                            </span>&nbsp;
                                            <span class="mx-4">
                                                <img src="img/tree/green-levoplus.png" height="30" /><br />
                                                <b><span class="pt-2">Activate</span></b>
                                            </span>&nbsp;
                                            <span>
                                                <img src="img/tree/orange-levoplus.png" height="30" /><br />
                                                <b><span class="pt-2">Inactivate</span></b>
                                            </span>
                                        </div>
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

export default Genealogy;