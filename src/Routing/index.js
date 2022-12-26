import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProfileContext } from "../context/ProfileProvider";
import LoginPage from "../ui/pages/LoginPage";
import Signup from "../ui/pages/Signup";
import Forgotpassword from "../ui/pages/Forgotpassword";
import Errorpage from "../customComponent/Errorpage";
import Dashboardpage from "../ui/pages/Dashboardpage";
import LandingPage from "../ui/pages/Landingpage";
import MailVerify from "../ui/pages/MailVerify";
import Notifications from "../ui/pages/Notifications";

const Routing = () => {

  const [profileState] = useContext(ProfileContext);
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/forgotpassword" element={<Forgotpassword />}></Route>
        <Route exact path="/dashboard" element={<Dashboardpage />}></Route>
        <Route exact path="/mail_verify" element={<MailVerify />}></Route>
        {/* <Route exact path="/notification" element={<Notifications />}></Route> */}
      </Routes>
    </Router>
  );
}

export default Routing;