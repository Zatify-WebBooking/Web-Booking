import React, { useState, useEffect } from "react";
import "../../styles/main.css";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {
  faSquareFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faPinterest
} from "@fortawesome/free-brands-svg-icons";
import { Parallax } from 'react-parallax';
import { useNavigate } from 'react-router-dom';


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

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animationClass, setAnimationClass] = useState("fade-in");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const navigate = useNavigate();

  const handleBookTable = () => {
    navigate('/booktable');
  };

  const handleViewMenu = () => {
    navigate('/viewmenu')
  }

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
                        <li>Contacct Page</li>
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
                        <li>Mansory Wide</li>
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
                        <li>Mansory</li>
                        <li>Mansory Gallery</li>
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
                        <li>Two Collums</li>
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
      </div >
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

          <div className="space-y-8">
            <div className="item">
              <img alt="Bowl of mussels soup with herbs and sauce"
                src="https://storage.googleapis.com/a1aa/image/5c59bce7-f567-4ed7-2cfe-6065892e9f91.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">MUSSELS SOUP <span className="text-black">*</span></span>
                  <span className="item-price">$ 23.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Plate of Italian spaghetti with tomato sauce and herbs"
                src="https://storage.googleapis.com/a1aa/image/b825f131-9267-4360-0a5e-f45f49e1b6d0.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">ITALIAN SPAGHETTI</span>
                  <span className="item-price">$ 12.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Beef burger with lettuce and tomato on a bun"
                src="https://storage.googleapis.com/a1aa/image/db822616-5045-4cdc-caae-f2ad0a9150f7.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">BEEF BURGER <span className="text-black">*</span></span>
                  <span className="item-price">$ 10.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Stuffed strawberry dessert with cream and garnish"
                src="https://storage.googleapis.com/a1aa/image/0315f2be-d845-499b-5b5d-b9eb95a4339f.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">STUFFED STRAWBERRY</span>
                  <span className="item-price">$ 15.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="item">
              <img alt="Plate of Sicilian meatballs with sauce and herbs"
                src="https://storage.googleapis.com/a1aa/image/84019eaa-160e-491a-51f1-0ea1e3c2314c.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">SICILIAN MEATBALLS </span>
                  <span className="item-price">$ 25.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Seafood salad with shrimp, greens, and lemon"
                src="https://storage.googleapis.com/a1aa/image/afea1b9e-7b69-4d2f-d12d-36c463a103c7.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">SEAFOOD SALAD</span>
                  <span className="item-price">$ 17.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Roast chicken with herbs and vegetables"
                src="https://storage.googleapis.com/a1aa/image/68554127-7ea9-4717-1144-1486d1d1d639.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">ROAST CHICKEN</span>
                  <span className="item-price">$ 22.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Grilled fish with garnish and lemon slice"
                src="https://storage.googleapis.com/a1aa/image/df637227-20fa-4401-5b74-71ae848d1959.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">GRILLED FISH <span className="text-black">*</span></span>
                  <span className="item-price">$ 36.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
          </div>
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
        <div className="our-starters">
          <p className="subtitle">TASTY AND CRUNCHY</p>
          <h1 className="title">Our Main Meals</h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto do eiusmod tempor incidition
            ulla mco laboris nisi ut aliquip ex ea commo condorico consectetur adipiscing eiltut aliquip.
          </p>
        </div>
        <div className="grid">

          <div className="space-y-8">
            <div className="item">
              <img alt="Bowl of mussels soup with herbs and sauce"
                src="https://storage.googleapis.com/a1aa/image/5c59bce7-f567-4ed7-2cfe-6065892e9f91.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">MUSSELS SOUP <span className="text-black">*</span></span>
                  <span className="item-price">$ 23.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Plate of Italian spaghetti with tomato sauce and herbs"
                src="https://storage.googleapis.com/a1aa/image/b825f131-9267-4360-0a5e-f45f49e1b6d0.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">ITALIAN SPAGHETTI <span className="text-black">*</span></span>
                  <span className="item-price">$ 12.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Beef burger with lettuce and tomato on a bun"
                src="https://storage.googleapis.com/a1aa/image/db822616-5045-4cdc-caae-f2ad0a9150f7.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">BEEF BURGER <span className="text-black">*</span></span>
                  <span className="item-price">$ 10.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Stuffed strawberry dessert with cream and garnish"
                src="https://storage.googleapis.com/a1aa/image/0315f2be-d845-499b-5b5d-b9eb95a4339f.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">STUFFED STRAWBERRY <span className="text-black">*</span></span>
                  <span className="item-price">$ 15.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="item">
              <img alt="Plate of Sicilian meatballs with sauce and herbs"
                src="https://storage.googleapis.com/a1aa/image/84019eaa-160e-491a-51f1-0ea1e3c2314c.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">SICILIAN MEATBALLS <span className="text-black">*</span></span>
                  <span className="item-price">$ 25.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Seafood salad with shrimp, greens, and lemon"
                src="https://storage.googleapis.com/a1aa/image/afea1b9e-7b69-4d2f-d12d-36c463a103c7.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">SEAFOOD SALAD <span className="text-black">*</span></span>
                  <span className="item-price">$ 17.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Roast chicken with herbs and vegetables"
                src="https://storage.googleapis.com/a1aa/image/68554127-7ea9-4717-1144-1486d1d1d639.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">ROAST CHICKEN <span className="text-black">*</span></span>
                  <span className="item-price">$ 22.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Grilled fish with garnish and lemon slice"
                src="https://storage.googleapis.com/a1aa/image/df637227-20fa-4401-5b74-71ae848d1959.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">GRILLED FISH <span className="text-black">*</span></span>
                  <span className="item-price">$ 36.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="review-section">
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
            <p class="subtitle">TASTY AND CRUNCHY</p>
            <h1>What People Say</h1>
            <p class="body-text-gray-centered">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto <br />
              doeiusmod tempor incidition ulla mco laboris nisi ut aliquip ex ea commo<br />
              condorico consectetur adipiscing elitut aliquip.
            </p>
          </div>
          <div class="grid-3">
            <div class="card">
              <p class="card-text">
                “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusan
                tium doloremque lauatiium.”
              </p>
              <hr class="hr" />
              <div class="flex-row">
                <img alt="Portrait of a woman with long brown hair wearing sunglasses" class="avatar" src="https://storage.googleapis.com/a1aa/image/71812286-09b9-44d0-7e1d-b78b7b1eaf14.jpg" width="48" height="48" />
                <div>
                  <p class="name">Sofia Mayer</p>
                  <p class="role">Founder</p>
                </div>
              </div>
            </div>
            <div class="card">
              <p class="card-text">
                “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusan
                tium doloremque lauatiium.”
              </p>
              <hr class="hr" />
              <div class="flex-row">
                <img alt="Portrait of a woman with long blonde hair" class="avatar" src="https://storage.googleapis.com/a1aa/image/f219820e-6735-4b53-750a-ab2a3c1cb63b.jpg" width="48" height="48" />
                <div>
                  <p class="name">Marta Williams</p>
                  <p class="role">Founder</p>
                </div>
              </div>
            </div>
            <div class="card">
              <p class="card-text">
                “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusan
                tium doloremque lauatiium.”
              </p>
              <hr class="hr" />
              <div class="flex-row">
                <img alt="Portrait of a man with beard wearing a hat" class="avatar" src="https://storage.googleapis.com/a1aa/image/5d7a55b5-4155-4bd0-436a-bab39d63d037.jpg" width="48" height="48" />
                <div>
                  <p class="name">Marco Williams</p>
                  <p class="role">Founder</p>
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </div>
      <div className="Page2">
        <div className="our-starters">
          <p className="subtitle">TASTY AND CRUNCHY</p>
          <h1 className="title">Our Desserts</h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto do eiusmod tempor incidition
            ulla mco laboris nisi ut aliquip ex ea commo condorico consectetur adipiscing eiltut aliquip.
          </p>
        </div>
        <div className="grid">

          <div className="space-y-8">
            <div className="item">
              <img alt="Bowl of mussels soup with herbs and sauce"
                src="https://storage.googleapis.com/a1aa/image/5c59bce7-f567-4ed7-2cfe-6065892e9f91.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">MUSSELS SOUP <span className="text-black">*</span></span>
                  <span className="item-price">$ 23.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Plate of Italian spaghetti with tomato sauce and herbs"
                src="https://storage.googleapis.com/a1aa/image/b825f131-9267-4360-0a5e-f45f49e1b6d0.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">ITALIAN SPAGHETTI</span>
                  <span className="item-price">$ 12.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Beef burger with lettuce and tomato on a bun"
                src="https://storage.googleapis.com/a1aa/image/db822616-5045-4cdc-caae-f2ad0a9150f7.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">BEEF BURGER <span className="text-black">*</span></span>
                  <span className="item-price">$ 10.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Stuffed strawberry dessert with cream and garnish"
                src="https://storage.googleapis.com/a1aa/image/0315f2be-d845-499b-5b5d-b9eb95a4339f.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">STUFFED STRAWBERRY</span>
                  <span className="item-price">$ 15.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="item">
              <img alt="Plate of Sicilian meatballs with sauce and herbs"
                src="https://storage.googleapis.com/a1aa/image/84019eaa-160e-491a-51f1-0ea1e3c2314c.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">SICILIAN MEATBALLS </span>
                  <span className="item-price">$ 25.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Seafood salad with shrimp, greens, and lemon"
                src="https://storage.googleapis.com/a1aa/image/afea1b9e-7b69-4d2f-d12d-36c463a103c7.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">SEAFOOD SALAD</span>
                  <span className="item-price">$ 17.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Roast chicken with herbs and vegetables"
                src="https://storage.googleapis.com/a1aa/image/68554127-7ea9-4717-1144-1486d1d1d639.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">ROAST CHICKEN</span>
                  <span className="item-price">$ 22.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
            <div className="item">
              <img alt="Grilled fish with garnish and lemon slice"
                src="https://storage.googleapis.com/a1aa/image/df637227-20fa-4401-5b74-71ae848d1959.jpg" />
              <div className="item-content">
                <div className="item-header">
                  <span className="item-title">GRILLED FISH <span className="text-black">*</span></span>
                  <span className="item-price">$ 36.00</span>
                </div>
                <div className="divider"></div>
                <p className="item-description">Lorem ipsum dolor sit amet, feugiat delicata.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default HeroCarousel;