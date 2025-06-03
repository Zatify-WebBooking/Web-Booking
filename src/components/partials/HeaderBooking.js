import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "../../styles/bookingweb/booking.css";

// Font Awesome CDN for icons
const fontAwesomeLink = document.createElement("link");
fontAwesomeLink.rel = "stylesheet";
fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
document.head.appendChild(fontAwesomeLink);

const NAV_ITEMS = [
  {
    label: "Restaurant",
    dropdown: [
      { label: "Yoyo Central Hồ Con Rùa", href: "/restaurant/1" },
      { label: "Dragon Palace", href: "/restaurant/2" },
      { label: "ChillHouse 197 Hai Bà Trưng", href: "/restaurant/3" },
      { label: "Yoyo Garden Nam Kỳ Khởi Nghĩa", href: "/restaurant/4" },
      { label: "Lalaland Bình Khánh", href: "/restaurant/5" },
      { label: "Paris Garden", href: "/restaurant/6" },
      { label: "LonDon Conner", href: "/restaurant/7" },
      { label: "Casa Cafe Hồ Con Rùa", href: "/restaurant/8" },
    ],
  },
  {
    label: "Hotel",
    dropdown: [
      { label: "Hotel Seava", href: "/hotel/1" },
      { label: "Hotel Minera", href: "/hotel/2" },
      { label: "Hotel Ktown & Wonderland", href: "/hotel/3" },
      { label: "Hotel Radison", href: "/hotel/4" },
    ],
  },
  {
    label: "Tourist",
    dropdown: [
      { label: "Nova World Hồ Tràm", href: "/booking/history" },
      { label: "Nova World Phan Thiết", href: "/booking/manage" },
    ],
  },
  {
    label: "Contact",
    dropdown: null, // Remove dropdown for Contact
  },
];

const HeaderBooking = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const cartCount = 0; 

  // Hàm đổi ngôn ngữ
  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header-booking-header">
      <nav className="header-booking-nav">
        <div className="header-booking-nav-container">
          {/* Left side */}
          <div className="header-booking-left-side">
            <div className="header-booking-logo">
              <img src="https://diendantructuyen.com/wp-content/uploads/2024/09/dia-chi-vector-2.jpg" alt="Red location pin icon" />
              <span>listeo</span>
            </div>
            <ul className="header-booking-nav-links">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className={item.dropdown ? "dropdown" : ""}
                >
                  <span className="dropdown-btn">
                    <span style={{ marginLeft: 8, textTransform: 'capitalize' }}>{t(`${item.label.toLowerCase()}`)}</span>
                    {item.dropdown && (
                      <i className="fas fa-chevron-down" style={{ fontSize: 13, marginLeft: 4 }}></i>
                    )}
                  </span>
                  {item.dropdown && (
                    <ul className="dropdown-menu">
                      {item.dropdown.map((sub) => (
                        <li key={sub.label}>
                          <a
                            href={sub.href}
                            onClick={e => {
                              if (item.label === "Restaurant") {
                                e.preventDefault();
                                const id = sub.href.split("/").pop();
                                navigate(`/restaurant/${id}`);
                              }
                            }}
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Right side */}
          {/* Đã bỏ nút chuyển đổi ngôn ngữ, giỏ hàng và đăng nhập theo yêu cầu */}
        </div>
      </nav>
    </header>
  );
};

export default HeaderBooking;

