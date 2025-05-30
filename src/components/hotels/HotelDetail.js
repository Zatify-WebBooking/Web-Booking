import React, { useState, useRef, useEffect } from 'react';
import '../../styles/hotel/hotel.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';


const HotelDetail = () => {
  const { t } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [animate, setAnimate] = useState(false);
  const guestsRef = useRef();

  const carouselItems = [
    {
      src: "https://i.pinimg.com/736x/6a/f9/0e/6af90eea656d653c788e7d3f92a77247.jpg",
      text: "Island Resort / from $190"
    },
    {
      src: "https://i.pinimg.com/736x/06/a7/65/06a76579b88a4259a9fec82522493346.jpg",
      text: "Beachfront Villa / from $250"
    },
    {
      src: "https://i.pinimg.com/736x/9a/d7/75/9ad775a1804e255a3c7fe920c02c8294.jpg",
      text: "Luxury Suite / from $300"
    }
  ];

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
      }, 500);
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
  const navItems = [
    t('HOME'),
    t('ROOMS'),
    t('PAGES'),
    t('GALLERY'),
    t('BLOG'),
    t('LANDING')
  ];


  const handleNavClick = (index, e) => {
    e.preventDefault();
    setActiveIndex(index);
  };

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
                <label htmlFor="checkin">{t('hotelDetail.booking.checkin')}</label>
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
                <label htmlFor="checkout">{t('hotelDetail.booking.checkout')}</label>
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
                <label htmlFor="guests">{t('hotelDetail.booking.guests')}</label>
                <div
                  className="guests-select"
                  tabIndex={0}
                  onClick={() => setGuestsOpen((open) => !open)}
                >
                  {adults} {t('hotelDetail.booking.adults')}{adults > 1 ? "s" : ""}
                  {children > 0 && `, ${children} Child${children > 1 ? "ren" : ""}`}
                  {infants > 0 && `, ${infants} Infant${infants > 1 ? "s" : ""}`}
                  <i className="fas fa-chevron-down icon-chevron" aria-hidden="true"></i>
                </div>
                {guestsOpen && (
                  <div className="guests-popup">
                    <div className="guests-row">
                      <span>{t('hotelDetail.booking.adults')}</span>
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
                      <span>{t('hotelDetail.booking.children')}<small>{t('hotelDetail.booking.childrenAge')}</small></span>
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
                      <span>{t('hotelDetail.booking.infants')}<small>{t('hotelDetail.booking.infantsAge')}</small></span>
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
                    <button type="button" className="guests-done" onClick={() => setGuestsOpen(false)}>{t('hotelDetail.booking.done')}</button>
                  </div>
                )}
              </div>

              <button className='btn-book' type="submit">{t('hotelDetail.booking.bookNow')}</button>
            </form>
          </div>
        </div>
        <section className="elecmentor-section">
          <article className="card-elecmentor">
            <img
              alt="Thatched beach hut with two blue lounge chairs on white sand surrounded by palm trees and greenery"
              className="card-image-elecmentor"
              src="https://i.pinimg.com/736x/9b/4f/91/9b4f916b2d4e8cbbe1ea4b24b03eef42.jpg"
            />
            <div className="card-content-elecmentor">
              <div className="card-header-elecmentor">
                <h2 className="title-font-elecmentor card-title-elecmentor">{t('hotelDetail.rooms.ilSole.title')}</h2>
                <p className="price-elecmentor">
                  <span className="price-from-elecmentor">{t('hotelDetail.rooms.ilSole.priceFrom')}</span>
                  {t('hotelDetail.rooms.ilSole.price')}
                </p>
              </div>
              <p className="info-elecmentor">{t('hotelDetail.rooms.ilSole.info')}</p>
              <p className="description-elecmentor">
                {t('hotelDetail.rooms.ilSole.description')}
              </p>
              <button aria-label="Book now for Il Sole" className="btn-book-elecmentor">
                {t('hotelDetail.rooms.ilSole.button')}<span className="btn-icon-elecmentor">+</span>
              </button>
            </div>
          </article>

          <article className="card-elecmentor">
            <img
              alt="Yellow water homes with red roofs on clear water connected by a wooden walkway with sky and trees in background"
              className="card-image-elecmentor"
              src="https://storage.googleapis.com/a1aa/image/acde98e0-9463-4fb1-dc7e-be7e00cf6e06.jpg"
            />
            <div className="card-content-elecmentor">
              <div className="card-header-elecmentor">
                <h2 className="title-font-elecmentor card-title-elecmentor"> {t('hotelDetail.rooms.SeaHose.title')}</h2>
                <p className="price-elecmentor">
                  <span className="price-from-elecmentor">{t('hotelDetail.rooms.SeaHose.priceFrom')}</span>
                  $80
                </p>
              </div>
              <p className="info-elecmentor">{t('hotelDetail.rooms.SeaHose.info')}</p>
              <p className="description-elecmentor">
                {t('hotelDetail.rooms.SeaHose.description')}
              </p>
              <button aria-label="Book now for Sea Home" className="btn-book-elecmentor">
                {t('hotelDetail.rooms.SeaHose.button')}
                <span className="btn-icon-elecmentor">+</span>
              </button>
            </div>
          </article>
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
              <button className="see-deal-btn outline">SEE DEAL</button>
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
              <button className="see-deal-btn solid">SEE DEAL</button>
              <FontAwesomeIcon className="star-icon" icon={faStar} />
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
              <button className="see-deal-btn outline">SEE DEAL</button>
            </section>
          </div>
        </section>

        <section className="quodef-image-section">
          <img
            src="https://i.pinimg.com/736x/4f/fa/21/4ffa21704468c2dd1f770ae8bcdc0338.jpg"
            alt="Island Resort"
            className="quodef-image"
          />
          <div className="quodef-text">
            <p>Our Daily Menu</p>
            <button aria-label="Book now for Sea Home" className="btn-book-elecmentor">
              READ MORE <span className="btn-icon-elecmentor">+</span>
            </button>          </div>
        </section>

        <section className="menu-section">
          <h2 className="menu-title">Continental</h2>
          <p className="menu-desc">
            Between 08.30 and 10.30 we serve our buffet of local and fresh products. Start your day with your favourite breakfast!
          </p>
          <div className="menu-columns">
            <div className="menu-column">
              <div className="menu-item">
                <h3>Eggs &amp; Bacon</h3>
                <p>Praesent ut ante vel augue accumsan sagittis aenean. Vivamus non porti aliqui feli.</p>
              </div>
              <div className="menu-item">
                <h3>Vegan Breakfast</h3>
                <p>Praesent ut ante vel augue accumsan sagittis aenean. Vivamus non porti aliqui feli.</p>
              </div>
              <div className="menu-item">
                <h3>Tea or Coffee</h3>
                <p>Praesent ut ante vel augue accumsan sagittis aenean. Vivamus non porti aliqui feli.</p>
              </div>
              <div className="menu-item">
                <h3>Chia Oatmeal</h3>
                <p>Praesent ut ante vel augue accumsan sagittis aenean. Vivamus non porti aliqui feli.</p>
              </div>
            </div>
            <div className='vertical-line'></div>
            <div className="menu-column">
              <div className="menu-item">
                <h3>French Croissant</h3>
                <p>Praesent ut ante vel augue accumsan sagittis aenean. Vivamus non porti aliqui feli.</p>
              </div>
              <div className="menu-item">
                <h3>Avocado Toast</h3>
                <p>Praesent ut ante vel augue accumsan sagittis aenean. Vivamus non porti aliqui feli.</p>
              </div>
              <div className="menu-item">
                <h3>Cheese Plate</h3>
                <p>Praesent ut ante vel augue accumsan sagittis aenean. Vivamus non porti aliqui feli.</p>
              </div>
              <div className="menu-item">
                <h3>Marmalade Selection</h3>
                <p>Praesent ut ante vel augue accumsan sagittis aenean. Vivamus non porti aliqui feli.</p>
              </div>
            </div>
          </div>
        </section>
        <div class="newsletter-wrapper">
          <section className="footerhotel">
            <div className='mail-icon'><FontAwesomeIcon icon={faEnvelope} /></div>
            <label for="email">Join our weekly Newsletter</label>
            <input id="email" type="email" placeholder="Email Address" />
            <button type="submit">SIGN ME UP</button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HotelDetail;
