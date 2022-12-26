import React, { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileProvider";
import { useNavigate } from "react-router-dom";
import AuthService from "../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../customComponent/CustomAlertMessage";
import moment from "moment";
import Notifications from "../../ui/pages/Notifications";
import HomePage from "../../ui/pages/HomePage";

const DashboardHeader = () => {
  const [profileState, updateProfileState] = useContext(ProfileContext);
  const navigate = useNavigate();
  const [Notification, setNotificaton] = useState('');
  const [activeScreen, setActiveScreen] = useState('dashboard');


  const handleLogout = () => {
    updateProfileState({});
    localStorage.clear();
    navigate('/');
  }



  useEffect(() => {
    handleNotificationHistory()
  }, []);

  const handleNotificationHistory = async () => {
    await AuthService.getNotificationHistory().then(async result => {
      if (result?.success) {
        try {
          /*  alertSuccessMessage(result?.msg); */
          setNotificaton(result?.success.reverse().slice(0, 3));
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        alertErrorMessage(result?.msg);
      }
    });
  }

  return (
    activeScreen === 'dashboard' ?
      <>
        <header class="header">
          <nav class="navbar navbar-expand-lg py-3 bg-dash-dark-2 border-bottom border-dash-dark-1 z-index-10">
            <div class="container-fluid d-flex align-items-center justify-content-between py-1">
              <div class="navbar-header d-flex align-items-center">
                <a class="navbar-brand text-uppercase text-reset" href="/dashboard">
                  <div class="brand-text brand-big"> <img src="img/brand/logo_main.png" /> </div>
                  <div class="brand-text brand-sm"> <img src="img/brand/logo_icon.png" /> </div>
                </a>
                <button class="sidebar-toggle">
                  <span class="svg-icon svg-icon-sm svg-icon-heavy transform-none">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                </button>
              </div>
              <ul class="list-inline mb-0">
                {/* <li class="list-inline-item dropdown px-lg-2">
                  <a class="nav-link text-reset px-1 px-lg-0" id="navbarDropdownMenuLink1" href="#" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <span class="svg-icon svg-icon-xs svg-icon-heavy">
                      <i class="fas fa-envelope"></i>
                    </span></a>
                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="navbarDropdownMenuLink1">
                    {Notification.length > 0 ?
                      Notification.map(item =>
                        <li>
                          <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="ms-3"> <strong class="d-block">{item?.subject}</strong>
                              <span class="d-block text-xs">{item?.message}</span><small class="d-block">{moment(item?.updatedAt).format('lll')}</small></div>
                          </a>
                        </li>
                      ) : null}

                    <li>
                      <a class="dropdown-item text-center message" style={{ cursor: 'pointer' }} onClick={() => setActiveScreen("totaluser")}> <strong>See All Messages <i
                        class="fas fa-angle-right ms-1"></i></strong></a>
                    </li>
                  </ul>

                </li> */}
                <li class="list-inline-item logout px-lg-2">
                  <button type="button" class="btn-link nav-link text-sm text-reset px-1 px-lg-0" id="logout" onClick={handleLogout} > <span
                    class="d-none d-sm-inline-block me-2">Logout </span>
                    <span class="svg-icon svg-icon-xs svg-icon-heavy">
                      <i class="fas fa-lock"></i>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </>
      : activeScreen === "totaluser" ? <Notifications /> : undefined
  );
}

export default DashboardHeader;