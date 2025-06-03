// src/components/hotels/AboutHotel.js
import { useParams, useNavigate } from "react-router-dom";
import restaurantData from "../../json/restaurant.json";
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';



const AboutHotel = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const hotelId = parseInt(id);
  const hotel = restaurantData.hotels.find(h => h.id === hotelId);
  const [activeIndex, setActiveIndex] = useState(0);
  const navItems = ['HOME', 'ROOMS', 'ABOUT', 'CONTACT'];


  const handleNavClick = (index, e) => {
    e.preventDefault();
    setActiveIndex(index);
  };

  if (!hotel) {
    return <div>Không tìm thấy khách sạn!</div>;
  }

  return (
    <div className="hotel-root container">
      <aside>
        <div className="logo-wrapper">
          <h1>{t('hotelDetail.logo')}</h1>
          <span className="big-number">A</span>
        </div>
        <nav id="sidebar-nav">
          {navItems.map((item, idx) => {
            const navKeyMap = ['home', 'rooms', 'about', 'contact'];
            return (
              <a
                href="#"
                key={item}
                className={activeIndex === idx ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  if (idx === 0) {
                    navigate(`/hotel/${hotelId}`);
                  } else if (idx === 2) {
                    navigate(`/hotel/abouthotel/${hotelId}`);
                  } else if (idx === 3) {
                    navigate(`/bookroom/${hotelId}`);
                  } else {
                    handleNavClick(idx, e);
                  }
                }
                }
              >
                {t(`hotelDetail.nav.${navKeyMap[idx]}`)}
              </a>
            );
          })}
        </nav>
        <div className="footer">
          <div className="social-icons">
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          </div>
          <address>
            2 Bis Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, TP.HCM<br />
            0909.944.879<br />
            trangntt@bam.globalx.com.vn
          </address>
        </div>
      </aside>
      <div className="slide-about"      >
        {hotel.serviceImages.about.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`about-${idx}`}
            className="rounded object-cover w-full h-48"
          />
        ))}
      </div>
    </div>
  );
};

export default AboutHotel;
