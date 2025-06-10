import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/bookingweb/booking.css";

const fontAwesomeLink = document.createElement("link");
fontAwesomeLink.rel = "stylesheet";
fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
document.head.appendChild(fontAwesomeLink);

const NAV_ITEMS = [
  {
    label: "Nhà hàng",
    dropdown: [
      { label: "Yoyo Central Hồ Con Rùa", href: "/restaurant/1" },
      { label: "Dragon Palace", href: "/restaurant/2" },
      { label: "Yoyo Garden Nam Kỳ Khởi Nghĩa", href: "/restaurant/3" },
      { label: "Lalaland Bình Khánh", href: "/restaurant/4" },
      { label: "Paris Garden", href: "/restaurant/5" },
      { label: "LonDon Corner", href: "/restaurant/6" },
      { label: "ChillHouse Saigon Beach Club", href: "/restaurant/7" },
      { label: "Casa Cafe Hồ Con Rùa", href: "/restaurant/8" },

    ],
  },
  {
    label: "Khách sạn",
    dropdown: [
      { label: "Seava", href: "/hotel/1" },
      { label: "Minera", href: "/hotel/2" },
      { label: "Ktown", href: "/hotel/3" },
      { label: "Wonderland", href: "/hotel/4" },
      { label: "Radison", href: "/hotel/5" },
      { label: "Long Hải Palace", href: "/hotel/6" },
    ],
  },
  {
    label: "Du lịch",
    dropdown: null
  },
  {
    label: "Liên hệ",
    dropdown: null,
    href: "/contact-info"
  },
];

const HeaderBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackBtn = window.location.pathname === '/contact-info';

  return (
    <header className="header-booking-header">
      <nav className="header-booking-nav">
        <div className="header-booking-nav-container" style={{ position: 'relative' }}>
          {/* Back button for Contact page */}
          {showBackBtn && (
            <button
              onClick={() => {
                navigate(-1);
              }}
              style={{
                position: 'absolute',
                right: 32,
                top: 24,
                background: '#1877f3',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 28px',
                fontWeight: 700,
                fontSize: 18,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0002',
                transition: 'background 0.2s',
                zIndex: 1000
              }}
            >
              Trở về
            </button>
          )}
          {/* Left side */}
          <div className="header-booking-left-side">
            <div className="header-booking-logo">
              <img src="https://novaworld.info/wp-content/uploads/2023/09/global-x-logo.jpeg" alt="Red location pin icon" />
              <span>GLoBal X</span>
            </div>
            <ul className="header-booking-nav-links">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className={item.dropdown ? "dropdown" : ""}
                >
                  {item.label === "Liên hệ" ? (
                    <span
                      className="dropdown-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(item.href)}
                    >
                      <span style={{ marginLeft: 8 }}>{item.label}</span>
                    </span>
                  ) : item.label === "Du lịch" ? (
                    <span
                      className="dropdown-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate('/tourist')}
                    >
                      <span style={{ marginLeft: 8 }}>{item.label}</span>
                    </span>
                  ) : (
                    <span className="dropdown-btn">
                      <span style={{ marginLeft: 8 }}>{item.label}</span>
                      {item.dropdown && (
                        <i className="fas fa-chevron-down" style={{ fontSize: 13, marginLeft: 4 }}></i>
                      )}
                    </span>
                  )}
                  {item.dropdown && item.label !== "Tourist" && (
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
                              if (item.label === "Hotel") {
                                e.preventDefault();
                                const id = sub.href.split("/").pop();
                                navigate(`/hotel/${id}`);
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