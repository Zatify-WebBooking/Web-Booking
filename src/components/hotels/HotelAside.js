import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HotelAside = ({ hotelId, hotelName, activeIndex, setActiveIndex }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const navItems = ['HOME', 'ROOMS', 'ABOUT', 'CONTACT', 'GALLERY'];

  // Map pathname to tab index
  useEffect(() => {
    if (!hotelId) return;
    const path = location.pathname.toLowerCase();
    if (path === `/hotel/${hotelId}`) {
      setActiveIndex(0);
    } else if (path.includes(`/hotel/abouthotel/${hotelId}`)) {
      setActiveIndex(2);
    } else if (path.startsWith(`hotel/bookroom/${hotelId}`)) {
      setActiveIndex(3);
    } else if (path === `/hotel/${hotelId}#rooms` || (path.includes('/hotel/') && path.includes('rooms'))) {
      setActiveIndex(1);
    } else if (path === `/galleryhotel/${hotelId}`) {
      setActiveIndex(4);
    } else {
      setActiveIndex(0); 
    }
  }, [location.pathname, hotelId, setActiveIndex]);

  const handleNavClick = (index, e) => {
    e.preventDefault();
    setActiveIndex(index);
  };

  return (
    <aside>
      <div className="logo-wrapper">
        <h1>{hotelName || t('hotelDetail.logo')}</h1>
        <span className="big-number">{hotelName ? hotelName.charAt(0) : 'A'}</span>
      </div>
      <nav id="sidebar-nav">
        {navItems.map((item, idx) => {
          const navKeyMap = ['home', 'rooms', 'about', 'contact', 'gallery'];
          return (
            <a
              href="#"
              key={item}
              className={activeIndex === idx ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(idx);
                if (idx === 0) {
                  navigate(`/hotel/${hotelId}`);
                } else if (idx === 1) {
                  const section = document.querySelector('.elecmentor-section');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                } else if (idx === 2) {
                  navigate(`/hotel/abouthotel/${hotelId}`);
                } else if (idx === 3) {
                  navigate(`/hotel/bookroom/${hotelId}`);
                } else if (idx === 4) {
                  navigate(`/galleryhotel/${hotelId}`);
                } else {
                  handleNavClick(idx, e);
                }
              }}
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
  );
};

export default HotelAside;
