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
import HotelAside from './HotelAside';



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
    navigate(`/hotel/bookroom/${hotelId}`);
  };

  const handleReadmoreClick = () => {
    navigate(`/hotel/abouthotel/${hotelId}`);
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

  // New state and effect for card image carousel
  const [cardImageIndexes, setCardImageIndexes] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCardImageIndexes(prevIndexes => {
        const newIndexes = { ...prevIndexes };
        currentCards.forEach((card, idx) => {
          if (card.images && card.images.length > 1) {
            newIndexes[idx] = (prevIndexes[idx] + 1) % card.images.length || 0;
          } else {
            newIndexes[idx] = 0;
          }
        });
        return newIndexes;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [currentCards]);

  return (
    <div className="hotel-root container">
      <HotelAside
        hotelId={hotelId}
        hotelName={hotel ? hotel.name : null}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
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
        </div>

        <section className="elecmentor-section">
          {totalPages > 1 && (
            <button onClick={handlePrev} disabled={currentPage === 0} className="btn-prev">
              ❮
            </button>
          )}
          {currentCards.map((card, index) => {
            const imageIndex = cardImageIndexes[index] || 0;
            const images = card.images && card.images.length > 0 ? card.images : [card.image];
            const currentImage = images[imageIndex];
            return (
              <article className="card-elecmentor" key={index}>
                <img
                  alt={card.title}
                  className="card-image-elecmentor"
                  src={currentImage}
                  style={{ transition: 'opacity 0.8s ease-in-out' }}
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
            );
          })}
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
            <button aria-label="Book now for Sea Home" className="btn-book-elecmentor" onClick={handleReadmoreClick}>
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
            <button aria-label="Book now for Sea Home" className="btn-book-elecmentor" onClick={handleReadmoreClick}>
              {t('hotelDetail.rooms.Phong.readmore')}<span className="btn-icon-elecmentor">+</span>
            </button>          </div>
        </section>

        <section className="offers-section">
          <div className="offers">
            {hotel.serviceImages && hotel.serviceImages.price ? hotel.serviceImages.price.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`price-${idx}`}
                className='image-price'
              />
            )) : null}
          </div>
        </section>


        <div class="newsletter-wrapper">
          <section className="footerhotel">
            <div className='mail-icon'><FontAwesomeIcon icon={faEnvelope} /></div>
            <label for="email">Liên hệ zalo của tôi</label>
            <button type="submit">ZALO ME</button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HotelDetail;
