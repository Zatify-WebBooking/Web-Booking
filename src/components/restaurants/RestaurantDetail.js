import React, { useState, useEffect } from "react";
import "../../styles/restaurant/main.css";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import {
  faSquareFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faPinterest
} from "@fortawesome/free-brands-svg-icons";
import { Parallax } from 'react-parallax';
import { useNavigate, useParams } from 'react-router-dom';

const images = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg"
];

const titles = [
  "Authentic Dishes",
  "Fresh Restaurant",
  "Traditional Food"
];

const descriptions = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor incidition ullamco laboris nisi ut aliquip ex ea commodo condorico.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor incidition ullamco laboris nisi ut aliquip ex ea commodo condorico.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidition ullamco laboris nisi ut aliquip ex ea commodo condorico."
];

const scrollToTopVariants = {
  initial: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  hidden: { scale: 0, opacity: 0 },
};

function RestaurantDetail() {
  const [current, setCurrent] = useState(0);
  const [animationClass, setAnimationClass] = useState("fade-in");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [menuItems, setMenuItems] = useState({ starters: [], mainMeals: [], desserts: [] });
  const navigate = useNavigate();
  const { id: restaurantId } = useParams();

  // Fetch menu data filtered by restaurantId
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/thucdon");
      const data = await response.json();
      // Lọc menu theo restaurantId
      const filtered = data.filter(item => String(item.restaurantId) === String(restaurantId));
      const starters = filtered.filter(item => item.Loai === "starters");
      const mainMeals = filtered.filter(item => item.Loai === "main-meals");
      const desserts = filtered.filter(item => item.Loai === "desserts");
      setMenuItems({ starters, mainMeals, desserts });
    };
    fetchData();
  }, [restaurantId]);

  const handleBookTable = () => {
    navigate(`/booktable/${restaurantId}`);
  };

  const handleViewMenu = () => {
    navigate(`/viewmenu/${restaurantId}`);
  };

  const changeSlide = (nextIndex) => {
    setAnimationClass("fade-out");
    setTimeout(() => {
      setCurrent(nextIndex);
      setAnimationClass("fade-in");
    }, 800);
  };

  const nextSlide = () => {
    changeSlide((current + 1) % images.length);
  };

  const prevSlide = () => {
    changeSlide((current - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const toggleMenu = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <div className="hero-carousel">
        <div
          className="slide"
          style={{ backgroundImage: `url(${images[current]})` }}
        >
          <div className={`overlay-content ${animationClass}`}>
            <h1>{titles[current]}</h1>
            <p>{descriptions[current]}</p>
            <button className="btn-menu" onClick={handleViewMenu}>
              <b>VIEW OUR MENU</b>
            </button>
          </div>

          {/* Sidebar Toggle Button */}
          {!sidebarOpen && (
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          )}

          {/* Sidebar */}
          <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <button
              className="close-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar menu"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="sidebar-content">
              <ul>
                <li>
                  <button
                    className="menu-button"
                    onClick={() => toggleMenu("home")}
                    aria-expanded={activeMenu === "home"}
                  >
                    Home
                  </button>
                  <AnimatePresence>
                    {activeMenu === "home" && (
                      <motion.ul
                        className="submenu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <li>Restaurant Home</li>
                        <li>Light Home</li>
                        <li>Dinner Home</li>
                        <li>Masonry Blog</li>
                        <li>Health Food Home</li>
                        <li>Landing</li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <button
                    className="menu-button"
                    onClick={() => toggleMenu("page")}
                    aria-expanded={activeMenu === "page"}
                  >
                    Pages
                  </button>
                  <AnimatePresence>
                    {activeMenu === "page" && (
                      <motion.ul
                        className="submenu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <li>About Us</li>
                        <li>Services</li>
                        <li>Our Menu</li>
                        <li>Contact Page</li>
                        <li>Reservations</li>
                        <li>Meet The Chefs</li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <button
                    className="menu-button"
                    onClick={() => toggleMenu("element")}
                    aria-expanded={activeMenu === "element"}
                  >
                    Elements
                  </button>
                  <AnimatePresence>
                    {activeMenu === "element" && (
                      <motion.ul
                        className="submenu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <li>Restaurant Item</li>
                        <li>Counters</li>
                        <li>Dropcaps</li>
                        <li>Info Box</li>
                        <li>Blog List</li>
                        <li>Portfolio Slider</li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <button
                    className="menu-button"
                    onClick={() => toggleMenu("portfolio")}
                    aria-expanded={activeMenu === "portfolio"}
                  >
                    Portfolio
                  </button>
                  <AnimatePresence>
                    {activeMenu === "portfolio" && (
                      <motion.ul
                        className="submenu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <li>Standard</li>
                        <li>Gallery</li>
                        <li>Gallery With Space</li>
                        <li>Masonry Wide</li>
                        <li>Portfolio Single</li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <button
                    className="menu-button"
                    onClick={() => toggleMenu("blog")}
                    aria-expanded={activeMenu === "blog"}
                  >
                    Blog
                  </button>
                  <AnimatePresence>
                    {activeMenu === "blog" && (
                      <motion.ul
                        className="submenu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <li>Standard</li>
                        <li>Masonry</li>
                        <li>Masonry Gallery</li>
                        <li>Blog Single</li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
                <li>
                  <button
                    className="menu-button"
                    onClick={() => toggleMenu("shop")}
                    aria-expanded={activeMenu === "shop"}
                  >
                    Shop
                  </button>
                  <AnimatePresence>
                    {activeMenu === "shop" && (
                      <motion.ul
                        className="submenu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <li>With Sidebar</li>
                        <li>Two Columns</li>
                        <li>Full Width</li>
                        <li>Product Single</li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              </ul>
              <div className="sidebar-footer">
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FontAwesomeIcon icon={faSquareFacebook} className="social-icon" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <FontAwesomeIcon icon={faYoutube} className="social-icon" />
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                    <FontAwesomeIcon icon={faPinterest} className="social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button className="prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="next" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>

      <div className="Page2">
        <div className="our-starters">
          <p className="subtitle">TASTY AND CRUNCHY</p>
          <h1 className="title">Our Starters</h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto do eiusmod tempor incidition
            ulla mco laboris nisi ut aliquip ex ea commo condorico consectetur adipiscing eiltut aliquip.
          </p>
        </div>
        <div className="grid">
          {menuItems.starters.map(item => (
            <div className="item" key={item.id || item.Ma_ThucDon}>
              <img alt={item.Ten} src={item.Anh} />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">{item.Ten}</span>
                  <span className="item-price">${Number(item.Gia).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">{item.MoTa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            aria-label="Scroll to top"
            className="scroll-to-top-motion"
            onClick={scrollToTop}
            initial="initial"
            animate="visible"
            exit="hidden"
            variants={scrollToTopVariants}
            transition={{ duration: 0.2 }}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="hero-section">
        <Parallax
          bgImage="/images/slide4.jpg"
          strength={400}
          className="slide-hero-section"
          bgImageStyle={{
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div style={{ height: '100vh' }}>
            <div className="overlay-content-hero-section">
              <p className="subtitle">TASTY AND CRUNCHY</p>
              <h1>Book a Table</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto<br />
                doeiusmod tempor incidition ulla mco laboris nisi ut aliquip ex ea commo<br />
                condorico consectetur adipiscing elitut aliquip.
              </p>
              <button className="btn-menu" onClick={handleBookTable}>
                <b>BOOK NOW</b>
              </button>
            </div>
          </div>
        </Parallax>
      </div>

      <div className="Page2">
        <div className="our-main-meals">
          <p className="subtitle">TASTY AND CRUNCHY</p>
          <h1 className="title">Our Main Meals</h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto do eiusmod tempor incidition
            ulla mco laboris nisi ut aliquip ex ea commo condorico consectetur adipiscing eiltut aliquip.
          </p>
        </div>
        <div className="grid">
          {menuItems.mainMeals.map(item => (
            <div className="item" key={item.id || item.Ma_ThucDon}>
              <img alt={item.Ten} src={item.Anh} />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">{item.Ten}</span>
                  <span className="item-price">${Number(item.Gia).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">{item.MoTa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="review-section">
        <Parallax
          bgImage="/images/slide5.jpg"
          strength={400}
          className="testimonial-parallax"
          bgImageStyle={{
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="overlay-content-review-section">
            <p className="subtitle">TASTY AND CRUNCHY</p>
            <h1>What People Say</h1>
            <p className="body-text-gray-centered">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto <br />
              doeiusmod tempor incidition ulla mco laboris nisi ut aliquip ex ea commo<br />
              condorico consectetur adipiscing elitut aliquip.
            </p>
          </div>
          <div className="grid-3">
            <div className="card">
              <p className="card-text">
                “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusan
                tium doloremque lauatiium.”
              </p>
              <hr className="hr" />
              <div className="flex-row">
                <img alt="Portrait of a woman with long brown hair wearing sunglasses" className="avatar" src="https://storage.googleapis.com/a1aa/image/71812286-09b9-44d0-7e1d-b78b7b1eaf14.jpg" width="48" height="48" />
                <div>
                  <p className="name">Sofia Mayer</p>
                  <p className="role">Founder</p>
                </div>
              </div>
            </div>
            <div className="card">
              <p className="card-text">
                “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusan
                tium doloremque lauatiium.”
              </p>
              <hr className="hr" />
              <div className="flex-row">
                <img alt="Portrait of a woman with long blonde hair" className="avatar" src="https://storage.googleapis.com/a1aa/image/f219820e-6735-4b53-750a-ab2a3c1cb63b.jpg" width="48" height="48" />
                <div>
                  <p className="name">Marta Williams</p>
                  <p className="role">Founder</p>
                </div>
              </div>
            </div>
            <div className="card">
              <p className="card-text">
                “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusan
                tium doloremque lauatiium.”
              </p>
              <hr className="hr" />
              <div className="flex-row">
                <img alt="Portrait of a man with beard wearing a hat" className="avatar" src="https://storage.googleapis.com/a1aa/image/5d7a55b5-4155-4bd0-436a-bab39d63d037.jpg" width="48" height="48" />
                <div>
                  <p className="name">Marco Williams</p>
                  <p className="role">Founder</p>
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </div>

      <div className="Page2">
        <div className="our-desserts">
          <p className="subtitle">TASTY AND CRUNCHY</p>
          <h1 className="title">Our Desserts</h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto do eiusmod tempor incidition
            ulla mco laboris nisi ut aliquip ex ea commo condorico consectetur adipiscing eiltut aliquip.
          </p>
        </div>
        <div className="grid">
          {menuItems.desserts.map(item => (
            <div className="item" key={item.id || item.Ma_ThucDon}>
              <img alt={item.Ten} src={item.Anh} />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">{item.Ten}</span>
                  <span className="item-price">${Number(item.Gia).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">{item.MoTa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;