import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faPinterest
} from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router-dom";
import restaurantData from "../../json/restaurant.json";

const Footer = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  let restaurantId = null;
  if (pathSegments.length > 2) {
    restaurantId = pathSegments[2];
  }

  // Tìm restaurant theo id
  const restaurant = restaurantData.restaurants.find(
    (r) => String(r.id) === String(restaurantId)
  );

  // Logo của nhà hàng, nếu không có thì dùng logo mặc định
  const logoSrc = restaurant && restaurant.logo
    ? restaurant.logo.startsWith('http') || restaurant.logo.startsWith('/')
      ? restaurant.logo
      : '/' + restaurant.logo
    : 'https://yoyobeer.com.vn/wp-content/uploads/2023/11/logo-1400x764.png';

  return (
    <footer className="footer" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="footer-container">
        <div className="footer-col footer-col-left">
          <h3 className="footer-title">Follow Me</h3>
          <p className="footer-text">
            Để cập nhật những tin tức và thông báo mới nhất, hãy theo dõi chúng tôi trên Facebook:
            <span className="footer-strong">@QodeInteractive.com</span>
          </p>
        </div>
        <div className="footer-col footer-col-center">
          <img
            src={logoSrc}
            alt="Restaurant Logo"
            className="footer-logo"
          />
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
          <h3 className="footer-title">Reservation Now</h3>
          <div className="footer-grid-imgs">
            {/* Các ảnh Instagram giả lập */}
            <img src="https://storage.googleapis.com/a1aa/image/b5dd4d52-de32-46b5-0b9c-7fc1c20f075c.jpg" alt="Burger" width="60" height="60" />
            <img src="https://storage.googleapis.com/a1aa/image/35f2661f-c160-427d-58d6-2655b46fa137.jpg" alt="Eggs" width="60" height="60" />
            <img src="https://storage.googleapis.com/a1aa/image/a062f71e-90ab-4cba-9833-86fda362c395.jpg" alt="Salad" width="60" height="60" />
            <img src="https://storage.googleapis.com/a1aa/image/d9b5e591-dbce-4f37-637b-23d6b6bfcf56.jpg" alt="Tacos" width="60" height="60" />
            <img src="https://storage.googleapis.com/a1aa/image/1c086bb4-a6a4-4e15-9f58-273eedac2d6a.jpg" alt="Shrimp" width="60" height="60" />
            <img src="https://storage.googleapis.com/a1aa/image/5dfa62f8-7cc1-4cbb-f01a-1d0bc9466134.jpg" alt="Asparagus" width="60" height="60" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2016 Qode Interactive, All Rights Reserved</div>
    </footer>
  );
};

export default Footer;
