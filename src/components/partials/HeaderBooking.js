import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/bookingweb/booking.css";

// Font Awesome CDN for icons
const fontAwesomeLink = document.createElement("link");
fontAwesomeLink.rel = "stylesheet";
fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
document.head.appendChild(fontAwesomeLink);

const NAV_ITEMS = [
  { label: "Restaurant" },
  { label: "Hotel" },
  { label: "Booking" },
  { label: "Contact" },
];

const HeaderBooking = () => {
  const [activeIdx, setActiveIdx] = useState(0);

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
              {NAV_ITEMS.map((item, idx) => (
                <li key={item.label}>
                  <button
                    className={activeIdx === idx ? "active" : ""}
                    onClick={() => setActiveIdx(idx)}
                    onFocus={() => setActiveIdx(idx)}
                  >
                    <span>{item.label}</span>
                   
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Right side */}
          <div className="header-booking-right-side">
            <button className="header-booking-cart-button" aria-label="Shopping cart">
              <i className="fas fa-shopping-cart fa-lg"></i>
              <span className="header-booking-cart-count">0</span>
            </button>
            <button className="header-booking-sign-in-button">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 14a4 4 0 10-8 0 4 4 0 008 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M12 14v7m-4-7v7m8-7v7m-8 0h8" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderBooking;

