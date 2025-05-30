import React from "react";
import "../../styles/bookingweb/booking.css";

const FooterBooking = () => {
  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer-booking-wrapper">
      <footer className="footer-booking-main">
        <div className="footer-booking-container">
          {/* Brand */}
          <div className="footer-booking-brand">
            <div className="footer-booking-logo-row">
              <img src="https://diendantructuyen.com/wp-content/uploads/2024/09/dia-chi-vector-2.jpg" alt="Logo" width={40} height={40} />
              <span className="footer-booking-logo-text">listeo</span>
            </div>
            <p className="footer-booking-desc">
              Listeo is <strong>all-in-one WordPress directory theme</strong> with front-end user dashboard, <strong>built-in booking system, multi-vendor marketplace</strong>, private messaging and many more gorgeous features!
            </p>
          </div>
          {/* Helpful Links */}
          <div className="footer-booking-links">
            <div>
              <h3>Helpful Links</h3>
              <div style={{display: 'flex', gap: 48}}>
                <ul style={{margin: 0, padding: 0}}>
                  <li><i className="fas fa-angle-right"></i> Reviews</li>
                  <li><i className="fas fa-angle-right"></i> Bookmarks</li>
                  <li><i className="fas fa-angle-right"></i> Bookings</li>
                  <li><i className="fas fa-angle-right"></i> Contact</li>
                </ul>
                <ul style={{margin: 0, padding: 0}}>
                  <li><i className="fas fa-angle-right"></i> My Profile</li>
                  <li><i className="fas fa-angle-right"></i> My Listings</li>
                  <li><i className="fas fa-angle-right"></i> Bookmarks</li>
                  <li><i className="fas fa-angle-right"></i> Add Listing</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Contact Info */}
          <div className="footer-booking-contact">
            <h3>Contact Us</h3>
            <p>
              12345 Little Lonsdale St, Melbourne<br />
              Phone: <span>(123) 123-456</span><br />
              E-Mail: <a href="mailto:office@example.com">office@example.com</a>
            </p>
            <div className="footer-booking-payments">
              <img src="https://static.cdnlogo.com/logos/v/71/visa.svg" alt="Visa" height={28} />
              <img src="https://cdn.listeo.pro/images/payment-skrill.svg" alt="Skrill" height={28} />
              <img src="https://cdn.listeo.pro/images/payment-paypal.svg" alt="Paypal" height={28} />
            </div>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="footer-booking-bottom-row">
          <span className="footer-booking-copyright">
            <img src="https://diendantructuyen.com/wp-content/uploads/2024/09/dia-chi-vector-2.jpg" alt="Logo" style={{height: '22px', verticalAlign: 'middle', marginRight: '10px', marginTop: '-2px', display: 'inline-block'}} />
            © Theme by Purethemes.net. All Rights Reserved.
          </span>
          <div className="footer-booking-socials">
            <button aria-label="X"><i className="fab fa-x-twitter"></i></button>
            <button aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></button>
            <button aria-label="Messenger"><i className="fab fa-facebook-messenger"></i></button>
            <button aria-label="Instagram"><i className="fab fa-instagram"></i></button>
          </div>
        </div>
      </footer>
      {/* Scroll to top */}
      <button className="footer-booking-scrolltop" aria-label="Scroll to top" onClick={handleScrollTop}>
        <i className="fas fa-chevron-up"></i>
      </button>
    </div>
  );
};

export default FooterBooking;
