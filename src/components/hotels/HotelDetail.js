import React, { useState, useRef, useEffect } from 'react';
import '../../styles/hotel/hotel.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useParams } from 'react-router-dom';
import restaurantData from '../../json/restaurant.json';
import { useTranslation } from 'react-i18next';
import AboutHotel from './AboutHotel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope } from '@fortawesome/free-regular-svg-icons';



const HotelDetail = () => {
  const { t } = useTranslation();
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
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate(`/booking/${hotelId}`);
  };


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
  const navItems = ['HOME', 'ROOMS', 'ABOUT', 'CONTACT'];

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
                } else if (idx === 1) {
                  e.preventDefault();
                  const section = document.querySelector('.elecmentor-section');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
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
                  {adults} {t('hotelDetail.booking.adults')}
                  {children > 0 && `, ${children} ${t('hotelDetail.booking.children')}`}
                  {infants > 0 && `, ${infants} ${t('hotelDetail.booking.infants')}`}
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
                      <span>{t('hotelDetail.booking.children')} <small>{t('hotelDetail.booking.childrenAge')}</small></span>
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
                      <span>{t('hotelDetail.booking.infants')} <small>{t('hotelDetail.booking.infantsAge')}</small></span>
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
                <button
                  aria-label={`${t('hotelDetail.rooms.ilSole.ariaLabel')} ${t(`hotelDetail.rooms.${card.title}.title`)}`}
                  className="btn-book-elecmentor"
                  onClick={handleBookingClick}
                >
                  {t('hotelDetail.rooms.Phong.button')}
                  <span className="btn-icon-elecmentor">+</span>
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
            src={hotel && hotel.quodefSection ? hotel.quodefSection.image : ''}
            alt={hotel && hotel.quodefSection ? hotel.quodefSection.text : ''}
            className="quodef-image"
          />
          <div className="quodef-text">
            <p>{hotel && hotel.quodefSection ? hotel.quodefSection.text : ''}</p>
            <button aria-label="Book now for Sea Home" className="btn-book-elecmentor">
              {t('hotelDetail.rooms.Phong.readmore')}<span className="btn-icon-elecmentor">+</span>
            </button>          </div>
        </section>

        <section className='about-section'>
          <div className="about-features-grid">
            <div className="about-feature">
              <i className="fas fa-trophy about-icon"></i>
              <h3>Đánh Giá Cao</h3>
              <p>Chúng tôi được đánh giá cao nhờ chất lượng dịch vụ vượt trội.</p>
            </div>
            <div className="about-feature">
              <i className="fas fa-moon about-icon"></i>
              <h3>Không Gian Yên Tĩnh</h3>
              <p>Mang đến trải nghiệm nghỉ ngơi yên bình, tránh xa sự ồn ào.</p>
            </div>
            <div className="about-feature">
              <i className="fas fa-map-marker-alt about-icon"></i>
              <h3>Vị Trí Thuận Tiện</h3>
              <p>Nằm ở những vị trí trung tâm, dễ dàng di chuyển.</p>
            </div>
            <div className="about-feature">
              <i className="fas fa-calendar-times about-icon"></i>
              <h3>Hủy Đặt Miễn Phí</h3>
              <p>Hủy phòng dễ dàng, không mất phí.</p>
            </div>
            <div className="about-feature">
              <i className="fas fa-wallet about-icon"></i>
              <h3>Thanh Toán Linh Hoạt</h3>
              <p>Chấp nhận nhiều phương thức thanh toán linh hoạt.</p>
            </div>
            <div className="about-feature">
              <i className="fas fa-gift about-icon"></i>
              <h3>Ưu Đãi Đặc Biệt</h3>
              <p>Liên tục có các chương trình khuyến mãi hấp dẫn.</p>
            </div>
          </div>
        </section>


        <section className="quodef-image-section">
          <img
            src={hotel && hotel.quodefSection ? hotel.quodefSection.image2 : ''}
            alt={hotel && hotel.quodefSection ? hotel.quodefSection.text2 : ''}
            className="quodef-image"
          />
          <div className="quodef-text">
            <p>{hotel && hotel.quodefSection ? hotel.quodefSection.text2 : ''}</p>
            <button aria-label="Book now for Sea Home" className="btn-book-elecmentor">
              {t('hotelDetail.rooms.Phong.readmore')}<span className="btn-icon-elecmentor">+</span>
            </button>          </div>
        </section>

        <section className="offers-section">
          <header className="header-offer">
            <h2 className="header-title">{t('hotelDetail.offers.seeSpecialOffers')}</h2>
            <p className="header-desc">
              {t('hotelDetail.offers.headerDesc')}
            </p>
          </header>

          <div className="offers">
            <section className="offer-box winter">
              <h3 className="offer-title">Thấp Điểm</h3>
              <div className="discount">
                <span className="discount-number">0%</span>
                <span className="discount-text">{t('hotelDetail.offers.off')}</span>
              </div>
              <ul className="offer-details">
                <li>Miễn phí bữa sáng</li>
                <li>Miễn phí phòng gym</li>
                <li>Miễn phí vé tham quan rừng Minera Forest và khu luộc trứng 82 Degrees</li>
                <li>Miễn phítrà, café cho mỗi khách tại phòng</li>
                <li>Ngâm chân tại Springs Land tại Minera Hot Springs Bình Châu (cách Seava 17km)</li>
                <li>Nướcuống chào mừng khi nhận phòng</li>
              </ul>
              <button className="see-deal-btn outline">{t('hotelDetail.offers.seeSpecialOffers')}</button>
            </section>

            <section className="offer-box holidays">
              <h3 className="offer-title">Cao Điểm</h3>
              <div className="discount">
                <span className="discount-number">25%</span>
                <span className="discount-text">{t('hotelDetail.offers.off')}</span>
              </div>
              <ul className="offer-details">
                <li>Miễn phí bữa sáng</li>
                <li>Miễn phí phòng gym</li>
                <li>Miễn phí vé tham quan rừng Minera Forest và khu luộc trứng 82 Degrees</li>
                <li>Miễn phítrà, café cho mỗi khách tại phòng</li>
                <li>Ngâm chân tại Springs Land tại Minera Hot Springs Bình Châu (cách Seava 17km)</li>
                <li>Nướcuống chào mừng khi nhận phòng</li>
              </ul>
              <button className="see-deal-btn solid">{t('hotelDetail.offers.seeSpecialOffers')}</button>
              <img
                src="https://storage.googleapis.com/a1aa/image/dabd864a-bff5-4699-8991-ace5fdb293d9.jpg"
                alt="Outline star icon"
                className="star-icon"
              />
            </section>

            <section className="offer-box winter">
              <h3 className="offer-title">Lễ Tết</h3>
              <div className="discount">
                <span className="discount-number">100%</span>
                <span className="discount-text">{t('hotelDetail.offers.off')}</span>
              </div>
              <ul className="offer-details">
                <li>Miễn phí bữa sáng</li>
                <li>Miễn phí phòng gym</li>
                <li>Miễn phí vé tham quan rừng Minera Forest và khu luộc trứng 82 Degrees</li>
                <li>Miễn phítrà, café cho mỗi khách tại phòng</li>
                <li>Ngâm chân tại Springs Land tại Minera Hot Springs Bình Châu (cách Seava 17km)</li>
                <li>Nướcuống chào mừng khi nhận phòng</li>
              </ul>
              <button className="see-deal-btn outline">{t('hotelDetail.offers.seeSpecialOffers')}</button>
            </section>
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
