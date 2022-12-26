import React from "react";
import './style.css';
const Footer = () => {
  return (
    <>
      <footer class="footer-style-two style-three" style={{ backgroundImage: `url(img/pattern-26.png)`, backgroundSize: 'cover' }}>
        <div class="auto-container">
          <div class="widgets-section">
            <div class="row clearfix">
              <div class="footer-column col-lg-4 col-md-6 col-sm-12">
                <div class="footer-widget links-widget">
                  <h4>Social Media Links</h4>
                  <div class="social-column col-lg-6 col-md-12 col-sm-12">
                    <ul class="social-box" style={{ display: 'flex' }}>
                      <li>
                        <a target="_blank" href="#" class="fab fa-facebook-f" style={{ fontSize: '24px', padding: '7px', color: '#fff' }}>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="#" class="fab fa-instagram" style={{ fontSize: '24px', padding: '7px', color: '#fff' }}>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="#" class="fab fa-twitter" style={{ fontSize: '24px', padding: '7px', color: '#fff' }}>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="#" class="fab fa-youtube" style={{ fontSize: '24px', padding: '7px', color: '#fff' }}>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="footer-column col-lg-4 col-md-6 col-sm-12" style={{ textAlign: 'center' }}>
                <div class="footer-widget logo-widget">
                  <div class="logo">
                    <a href="/"><img src="img/logo-9.png" alt="" /></a>
                  </div>
                  <div class="text">
                    Gain insight into our history, philosophy, people, and unique approach to investment management using artificial intellegence and machine learning where we’ve
                    helped millions of investors worldwide pursue their real-life goals.</div>
                  <ul>
                    <li>
                      <span class="icon flaticon-email-2" style={{ color: '#ff9c44', fontSize: '20px', paddingRight: '4px' }}>
                      </span>
                      <p style={{ fontSize: '17px', color: '#fff' }}>info@Tronneticroi</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="footer-column col-lg-4 col-md-6 col-sm-12" style={{ textAlign: 'center' }}>
                <div class="footer-widget links-widget">
                  <h4>Online News</h4>
                  <ul style={{ display: 'inline-flex' }} >
                    <li><a target="_blank" href="#" class="fab fa-reddit" style={{ fontSize: '24px', padding: '7px', color: '#fff' }}></a></li>
                    <li><a target="_blank" href="#" class="fab fa-medium" style={{ fontSize: '24px', padding: '7px', color: '#fff' }}></a></li>
                    <li><a target="_blank" href="#" class="fab fa-quora" style={{ fontSize: '24px', padding: '7px', color: '#fff' }}></a></li>
                    <li><a target="_blank" href="#" class="fab fa-bitcoin" style={{ fontSize: '24px', padding: '7px', color: '#fff' }}></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="auto-container">
              <div class="row clearfix">
                <div class="copyright-column col-lg-6 col-md-12 col-sm-12">
                  <div class="copyright" style={{ color: 'black' }}>Copyright  2022 Tronnetic ROI. All Rights Reserved Designed & developed by <a href="https://appinop.com/" target="_blank"
                style={{ textDecoration: 'revert',color:'#009cea' }}>Appinop Technologies</a> </div>
                </div>
                <div class="social-column col-lg-6 col-md-12 col-sm-12">
                  <ul class="social-box">
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="back-to-top scroll-to-target show-back-to-top" data-target="html">TOP</div>
      </footer>


    </>
  );
}

export default Footer;