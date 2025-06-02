import React, { useState, useRef, useEffect } from 'react';
import '../../styles/hotel/hotel.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import restaurantData from '../../json/restaurant.json';

const HotelDetail = () => {
  const { id: hotelId } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [animate, setAnimate] = useState(false);
  const guestsRef = useRef();

  const hotel = restaurantData.hotels.find(h => h.id === Number(hotelId));
  const carouselItems = hotel && hotel.carouselItems ? hotel.carouselItems : [];
  const elecmentorCards = hotel && hotel.elecmentorCards ? hotel.elecmentorCards : [];

  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 2;
  const totalPages = Math.ceil(elecmentorCards.length / cardsPerPage);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
      setAnimate(true);
    }
  };

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (guestsRef.current && !guestsRef.current.contains(event.target)) {
        setGuestsOpen(false);
      }
    }
    if (guestsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [guestsOpen]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const navItems = ['HOME', 'ROOMS', 'PAGES', 'GALLERY', 'BLOG', 'LANDING'];

  const handleNavClick = (index, e) => {
    e.preventDefault();
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const currentCards = elecmentorCards.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  return (
    <div className="hotel-root container">
      <aside>
        <div className="logo-wrapper">
          <h1>Alloggio</h1>
          <span className="big-number">A</span>
        </div>
        <nav id="sidebar-nav">
          {navItems.map((item, idx) => (
            <a
              href="#"
              key={item}
              className={activeIndex === idx ? 'active' : ''}
              onClick={(e) => handleNavClick(idx, e)}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="footer">
          <div className="social-icons">
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          </div>
          <address>
            A. Via Venti Settembre, Roma<br />
            P: 31 555 777 83<br />
            App: Viber, WhatsApp<br />
            E: info@alloggio.com
          </address>
        </div>
      </aside>
      <main>
        <div className="carousel">
          <Slider {...settings}>
            {carouselItems.map((item, index) => (
              <section className="image-section" key={index}>
                <img
                  src={item.src}
                  alt={item.text}
                />
                <div className={`text-overlay ${animate ? 'slide-in' : ''}`}>
                  {item.text}
                </div>
              </section>
            ))}
          </Slider>

          <div className="booking">
            <form className='booking-form'>
              <div className="form-group">
                <label htmlFor="checkin">CHECK-IN</label>
                <div className="react-datepicker-wrapper" style={{ position: "relative" }}>
                  <DatePicker
                    id="checkin"
                    selected={checkIn}
                    onChange={date => setCheckIn(date)}
                    dateFormat="EEE, dd MMM yyyy"
                    className="datepicker-input"
                  />
                  <i className="fas fa-calendar-alt icon-calendar" aria-hidden="true"></i>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="checkout">CHECK-OUT</label>
                <div className="react-datepicker-wrapper" style={{ position: "relative" }}>
                  <DatePicker
                    id="checkout"
                    selected={checkOut}
                    onChange={date => setCheckOut(date)}
                    dateFormat="EEE, dd MMM yyyy"
                    className="datepicker-input"
                  />
                  <i className="fas fa-calendar-alt icon-calendar" aria-hidden="true"></i>
                </div>
              </div>

              <div className="form-group" style={{ position: "relative" }} ref={guestsRef}>
                <label htmlFor="guests">GUESTS:</label>
                <div
                  className="guests-select"
                  tabIndex={0}
                  onClick={() => setGuestsOpen((open) => !open)}
                >
                  {adults} Adult{adults > 1 ? "s" : ""}
                  {children > 0 && `, ${children} Child${children > 1 ? "ren" : ""}`}
                  {infants > 0 && `, ${infants} Infant${infants > 1 ? "s" : ""}`}
                  <i className="fas fa-chevron-down icon-chevron" aria-hidden="true"></i>
                </div>
                {guestsOpen && (
                  <div className="guests-popup">
                    <div className="guests-row">
                      <span>Adults</span>
                      <select
                        className="guests-select-dropdown"
                        value={adults}
                        onChange={e => setAdults(Number(e.target.value))}
                      >
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <div className="guests-row">
                      <span>Children <small>2-12 years old</small></span>
                      <select
                        className="guests-select-dropdown"
                        value={children}
                        onChange={e => setChildren(Number(e.target.value))}
                      >
                        {Array.from({ length: 21 }, (_, i) => i).map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <div className="guests-row">
                      <span>Infant's <small>0-2 years old</small></span>
                      <select
                        className="guests-select-dropdown"
                        value={infants}
                        onChange={e => setInfants(Number(e.target.value))}
                      >
                        {Array.from({ length: 21 }, (_, i) => i).map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <button type="button" className="guests-done" onClick={() => setGuestsOpen(false)}>DONE</button>
                  </div>
                )}
              </div>

              <button className='btn-book' type="submit">BOOK NOW</button>
            </form>
          </div>
        </div>
        
        <section className="elecmentor-section">
          {totalPages > 1 && (
            <button onClick={handlePrev} disabled={currentPage === 0} className="btn-prev">
              ❮
            </button>
          )}
          {currentCards.map((card, index) => (
            <article className="card-elecmentor" key={index}>
              <img
                alt={card.title}
                className="card-image-elecmentor"
                src={card.image}
              />
              <div className="card-content-elecmentor">
                <div className="card-header-elecmentor">
                  <h2 className="title-font-elecmentor card-title-elecmentor">{card.title}</h2>
                  <p className="price-elecmentor">
                    <span className="price-from-elecmentor">from</span>
                    {card.price}
                  </p>
                </div>
                <p className="info-elecmentor">{card.info}</p>
                <p className="description-elecmentor">{card.description}</p>
                <button aria-label={`Book now for ${card.title}`} className="btn-book-elecmentor">
                  BOOK NOW<span className="btn-icon-elecmentor">+</span>
                </button>
              </div>
            </article>
          ))}
          {totalPages > 1 && (
            <button onClick={handleNext} disabled={currentPage === totalPages - 1} className="btn-next">
              ❯
            </button>
          )}
        </section>

        <section className="quodef-image-section">
          <img
            src="https://i.pinimg.com/736x/79/3d/27/793d2756fb2afefa0b3ef9238d174024.jpg"
            alt="Island Resort"
            className="quodef-image"
          />
          <div className="quodef-text">
            <p>Interior & Exterior</p>
            <button aria-label="Book now for Sea Home" className="btn-book-elecmentor">
              READ MORE <span className="btn-icon-elecmentor">+</span>
            </button>          </div>
        </section>

        <section className='about-section'>
          <div className="about-features-grid">
            <div className="about-feature">
              <i className="fas fa-trophy about-icon"></i>
              <h3>High Rating</h3>
              <p>Vestibulum a blandit ex, in tempor dolor. Phasellus dolor nisl volutpat sit amet et moll is hendrer phare ege ipsu.</p>
            </div>
            <div className="about-feature">
              <i className="fas fa-moon about-icon"></i>
              <h3>Quiet Hours</h3>
              <p>Vestibulum a blandit ex, in tempor dolor. Phasellus dolor nisl volutpat sit amet et moll is hendrer phare ege ipsu.</p>
            </div>
            <div className="about-feature">
              <i className="fas fa-map-marker-alt about-icon"></i>
              <h3>Best Locations</h3>
              <p>Vestibulum a blandit ex, in tempor dolor. Phasellus dolor nisl volutpat sit amet et moll is hendrer phare ege ipsu.</p>
            </div>
            <div className="about-feature">
              <i className="fas fa-calendar-times about-icon"></i>
              <h3>Free Cancellation</h3>
              <p>Vestibulum a blandit ex, in tempor dolor. Phasellus dolor nisl volutpat sit amet et moll is hendrer phare ege ipsu.</p>
            </div>
            <div className="about-feature">
              <i className="fas fa-wallet about-icon"></i>
              <h3>Payment Options</h3>
              <p>Vestibulum a blandit ex, in tempor dolor. Phasellus dolor nisl volutpat sit amet et moll is hendrer phare ege ipsu.</p>
            </div>
            <div className="about-feature">
              <i className="fas fa-gift about-icon"></i>
              <h3>Special Offers</h3>
              <p>Vestibulum a blandit ex, in tempor dolor. Phasellus dolor nisl volutpat sit amet et moll is hendrer phare ege ipsu.</p>
            </div>
          </div>
        </section>

        <section className="quodef-image-section">
          <img
            src="https://i.pinimg.com/736x/11/77/eb/1177eb484a4e83fd05155430c49e1ee2.jpg"
            alt="Island Resort"
            className="quodef-image"
          />
          <div className="quodef-text">
            <p>Nearby Activity</p>
            <button aria-label="Book now for Sea Home" className="btn-book-elecmentor">
              READ MORE <span className="btn-icon-elecmentor">+</span>
            </button>          </div>
        </section>

        <section className="offers-section">
          <header className="header-offer">
            <h2 className="header-title">See our special offers</h2>
            <p className="header-desc">
              Morbi porta, purus at posuere consectetur, eros justo feugiat lorem, nec laoreet odio odio ac erat. Luctus sed libero dictum cursus cras consequat.
            </p>
          </header>

          <div className="offers">
            <section className="offer-box winter">
              <h3 className="offer-title">Winter Offer</h3>
              <div className="discount">
                <span className="discount-number">25%</span>
                <span className="discount-text">Off</span>
              </div>
              <ul className="offer-details">
                <li>-Minimum stay 4 nights.</li>
                <li>-Early booking.</li>
                <li>-Breakfast included.</li>
                <li>-Free cancellation (see terms).</li>
                <li>-New Years free champagne.</li>
                <li>-Hiking tours with hosts.</li>
                <li>-Winter equipment.</li>
              </ul>
              <button className="see-deal-btn outline">See Deal</button>
            </section>

            <section className="offer-box holidays">
              <h3 className="offer-title">Holidays</h3>
              <div className="discount">
                <span className="discount-number">10%</span>
                <span className="discount-text">Off</span>
              </div>
              <ul className="offer-details">
                <li>-Minimum stay 2 nights.</li>
                <li>-Early booking.</li>
                <li>-Breakfast included.</li>
                <li>-Free cancellation (see terms).</li>
                <li>-All rooms.</li>
                <li>-Cleaning included.</li>
                <li>-Late check-out.</li>
              </ul>
              <button className="see-deal-btn solid">See Deal</button>
              <img
                src="https://storage.googleapis.com/a1aa/image/dabd864a-bff5-4699-8991-ace5fdb293d9.jpg"
                alt="Outline star icon"
                className="star-icon"
              />
            </section>

            <section className="offer-box winter">
              <h3 className="offer-title">Special Events</h3>
              <div className="discount">
                <span className="discount-number">5%</span>
                <span className="discount-text">Off</span>
              </div>
              <ul className="offer-details">
                <li>-Minimum stay 2 nights.</li>
                <li>-Up to 10 guests.</li>
                <li>-Breakfast included.</li>
                <li>-Free cancellation (see terms).</li>
                <li>-All rooms.</li>
                <li>-Cleaning included.</li>
                <li>-Late check-out.</li>
              </ul>
              <button className="see-deal-btn outline">See Deal</button>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HotelDetail;
