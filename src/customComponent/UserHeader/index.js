import React from "react";
const UserHeader = () => {

  return (
    <header class="main-header header-style-six">
      <div class="header-upper" style={{ backgroundColor: '#000' }}>
        <div class="auto-container">
          <div class="inner-container clearfix">
            <div class="pull-left logo-box">
              <div class="logo"><a href="/">
                <img src="img/logo.png" alt="" title="" /></a></div>
            </div>
            <div class="nav-outer clearfix">
              <div class="mobile-nav-toggler"><span class="icon flaticon-menu"></span></div>
              <nav class="main-menu navbar-expand-md">
                <div class="navbar-header">
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                </div>
              </nav>
              <div class="outer-box clearfix">
                <div class="btn-box">
                  <a href="/login" class="btn-style-one btn-outline"><span class="txt">Login</span></a>
                  <a href="/signup" class="btn-style-one"><span class="txt">Register</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-menu">
        <div class="menu-backdrop"></div>
        <div class="close-btn"><span class="icon flaticon-cancel"></span></div>
        <nav class="menu-box">
          <div class="nav-logo"><a href="/"><img src="img/logo-8.png" alt="" title="" /></a></div>
          <ul class="navigation clearfix"></ul>
        </nav>
      </div>
    </header>
  );
}

export default UserHeader;