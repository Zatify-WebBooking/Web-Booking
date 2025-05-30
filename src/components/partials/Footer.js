import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faPinterest
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="footer-container">
        <div className="footer-col footer-col-left">
          <h3 className="footer-title">Twitter Feed</h3>
          <p className="footer-text">
            For all the latest news and updates, follow us on Twitter:
            <span className="footer-strong">@QodeInteractive.com</span>
          </p>
        </div>
        <div className="footer-col footer-col-center">
          <img
            src="https://storage.googleapis.com/a1aa/image/7de0f694-2c70-4a33-86eb-c9780aa0fc81.jpg"
            alt="White stylized signature logo on dark background"
            className="footer-logo"
          />
          <p className="footer-text">
            Sed ut perspiciatis unde omnis iste natus<br />
            error sit voluptatem accusantium<br />
            doloremque.
          </p>
          <p className="footer-text">0909.944.879</p>
          <p className="footer-text">trangntt@bam.globalx.com.vn</p>
          <p className="footer-text">2 Bis Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, TP.HCM</p>
          <div className="footer-social" aria-label="Social media links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FontAwesomeIcon icon={faSquareFacebook} className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} className="social-icon" />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <FontAwesomeIcon icon={faPinterest} className="social-icon" />
            </a>
          </div>
        </div>
        <div className="footer-col footer-col-right">
          <h3 className="footer-title">Follow Me</h3>
          <div className="footer-grid-imgs">
            <img
              src="https://storage.googleapis.com/a1aa/image/b5dd4d52-de32-46b5-0b9c-7fc1c20f075c.jpg"
              alt="Close-up photo of a burger with lettuce and tomato on a plate"
              width="60"
              height="60"
            />
            <img
              src="https://storage.googleapis.com/a1aa/image/35f2661f-c160-427d-58d6-2655b46fa137.jpg"
              alt="Top view of a plate with eggs and garnish on a blue background"
              width="60"
              height="60"
            />
            <img
              src="https://storage.googleapis.com/a1aa/image/a062f71e-90ab-4cba-9833-86fda362c395.jpg"
              alt="Fresh green salad with corn and other vegetables"
              width="60"
              height="60"
            />
            <img
              src="https://storage.googleapis.com/a1aa/image/d9b5e591-dbce-4f37-637b-23d6b6bfcf56.jpg"
              alt="Three tacos with meat and vegetables on a plate"
              width="60"
              height="60"
            />
            <img
              src="https://storage.googleapis.com/a1aa/image/1c086bb4-a6a4-4e15-9f58-273eedac2d6a.jpg"
              alt="Shrimp dish with lime slice on top"
              width="60"
              height="60"
            />
            <img
              src="https://storage.googleapis.com/a1aa/image/5dfa62f8-7cc1-4cbb-f01a-1d0bc9466134.jpg"
              alt="Plate with asparagus and sauce"
              width="60"
              height="60"
            />
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2016 Qode Interactive, All Rights Reserved</div>
    </footer>
  );
};

export default Footer;
