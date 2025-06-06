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
import { useTranslation } from 'react-i18next';
import axios from 'axios';


const scrollToTopVariants = {
  initial: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  hidden: { scale: 0, opacity: 0 },
};

function RestaurantDetail() {
  const { t, i18n } = useTranslation();



  const descriptions = [
    t('restaurantDetail.carousel.Carouseldescription'),
    t('restaurantDetail.carousel.Carouseldescription'),
    t('restaurantDetail.carousel.Carouseldescription')
  ];

  const titles = [
    t('restaurantDetail.carousel.AuthenticDishes'),
    t('restaurantDetail.carousel.FreshRestaurant'),
    t('restaurantDetail.carousel.TraditionalFood')
  ];

  // State for main slide carousel
  const [mainCurrent, setMainCurrent] = useState(0);
  const [mainAnimationClass, setMainAnimationClass] = useState("fade-in");

  // State for starters carousel
  const [startersCurrent, setStartersCurrent] = useState(0);
  const [startersAnimationClass, setStartersAnimationClass] = useState("fade-in");

  // State for main meals carousel
  const [mainMealsCurrent, setMainMealsCurrent] = useState(0);
  const [mainMealsAnimationClass, setMainMealsAnimationClass] = useState("fade-in");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [menuItems, setMenuItems] = useState({ starters: [], mainMeals: [], desserts: [] });

  const [startersImages, setStartersImages] = useState([]);
  const [mainImages, setMainImages] = useState([]);
  const [dessertImages, setDessertImages] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);

  // New state for hero-section and review-section images
  const [heroSectionImage, setHeroSectionImage] = useState("");
  const [reviewSectionImage, setReviewSectionImage] = useState("");

  const [dessertCurrent, setDessertCurrent] = useState(0);
  const [dessertAnimationClass, setDessertAnimationClass] = useState("fade-in");

  const navigate = useNavigate();
  const { id: restaurantId } = useParams();
  const [sectionTitles, setSectionTitles] = useState({
    starters: t('restaurantDetail.section_starters.Yoyo Appetizers'),
    main: t('restaurantDetail.section_main_meals.Yoyo Main Meals'),
    dessert: t('restaurantDetail.section_dessert.Beer And Chill')
  });
  useEffect(() => {
    axios.get("http://localhost:3001/restaurants")
      .then(res => {
        const restaurant = res.data.find(r => String(r.id) === String(restaurantId));
        if (restaurant) {
          setStartersImages(restaurant.startersImages || []);
          setMainImages(restaurant.mainImages || []);
          setDessertImages(restaurant.dessertImages || []);
          // Set section titles based on current language
          const lang = i18n.language || 'en';
          setSectionTitles({
            starters: (restaurant.sectionTitles?.starters && restaurant.sectionTitles.starters[lang]) || t('restaurantDetail.section_starters.Yoyo Appetizers'),
            main: (restaurant.sectionTitles?.mainMeals && restaurant.sectionTitles.mainMeals[lang]) || t('restaurantDetail.section_main_meals.Yoyo Main Meals'),
            dessert: (restaurant.sectionTitles?.desserts && restaurant.sectionTitles.desserts[lang]) || t('restaurantDetail.section_dessert.Beer And Chill')
          });
        }
      })
      .catch(err => console.error("Error fetching restaurant images:", err));
  }, [restaurantId, t, i18n.language]);



  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch("http://localhost:3001/thucdon");
      const data = await response.json();
      const filtered = data.filter(item => String(item.restaurantId) === String(restaurantId));
      const starters = filtered.filter(item => item.Loai === "starters");
      const mainMeals = filtered.filter(item => item.Loai === "main-meals");
      const desserts = filtered.filter(item => item.Loai === "desserts");
      setMenuItems({ starters, mainMeals, desserts });
    };
    fetchMenu();
  }, [restaurantId]);


  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("http://localhost:3001/restaurants");
      const restaurants = await res.json();
      const restaurant = restaurants.find(r => String(r.id) === String(restaurantId));
      if (restaurant) {
        setStartersImages(restaurant.startersImages || []);
        setMainImages(restaurant.mainImages || []);
        setDessertImages(restaurant.dessertImages || []);
      }
    };
    fetchImages();
  }, [restaurantId]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      const res = await fetch("http://localhost:3001/restaurants");
      const restaurants = await res.json();
      const restaurant = restaurants.find(r => String(r.id) === String(restaurantId));
      if (restaurant) {
        setCarouselImages(restaurant.slideImages || []);
      }
    };
    fetchCarouselImages();
  }, [restaurantId]);


  // Fetch hero-section and review-section images
  useEffect(() => {
    const fetchSectionImages = async () => {
      const res = await fetch("http://localhost:3001/restaurants");
      const restaurants = await res.json();
      const restaurant = restaurants.find(r => String(r.id) === String(restaurantId));
      if (restaurant) {
        setHeroSectionImage(restaurant["hero-section"] && restaurant["hero-section"][0] ? restaurant["hero-section"][0] : "");
        setReviewSectionImage(restaurant["review-section"] && restaurant["review-section"][0] ? restaurant["review-section"][0] : "");
      }
    };
    fetchSectionImages();
  }, [restaurantId]);

  // Main slide carousel navigation functions
  const changeMainSlide = (nextIndex) => {
    setMainAnimationClass("fade-out");
    setTimeout(() => {
      setMainCurrent(nextIndex);
      setMainAnimationClass("fade-in");
    }, 800);
  };

  const nextMainSlide = () => {
    if (carouselImages.length === 0) return;
    changeMainSlide((mainCurrent + 1) % carouselImages.length);
  };

  const prevMainSlide = () => {
    if (carouselImages.length === 0) return;
    changeMainSlide((mainCurrent - 1 + carouselImages.length) % carouselImages.length);
  };

  // Starters carousel navigation functions
  const changeStartersSlide = (nextIndex) => {
    setStartersAnimationClass("fade-out");
    setTimeout(() => {
      setStartersCurrent(nextIndex);
      setStartersAnimationClass("fade-in");
    }, 800);
  };

  const nextStartersSlide = () => {
    if (startersImages.length === 0) return;
    changeStartersSlide((startersCurrent + 1) % Math.ceil(startersImages.length / 2));
  };

  const prevStartersSlide = () => {
    if (startersImages.length === 0) return;
    changeStartersSlide((startersCurrent - 1 + Math.ceil(startersImages.length / 2)) % Math.ceil(startersImages.length / 2));
  };

  // Main meals carousel navigation functions
  const changeMainMealsSlide = (nextIndex) => {
    setMainMealsAnimationClass("fade-out");
    setTimeout(() => {
      setMainMealsCurrent(nextIndex);
      setMainMealsAnimationClass("fade-in");
    }, 800);
  };

  const nextMainMealsSlide = () => {
    if (mainImages.length === 0) return;
    changeMainMealsSlide((mainMealsCurrent + 1) % Math.ceil(mainImages.length / 2));
  };

  const prevMainMealsSlide = () => {
    if (mainImages.length === 0) return;
    changeMainMealsSlide((mainMealsCurrent - 1 + Math.ceil(mainImages.length / 2)) % Math.ceil(mainImages.length / 2));
  };



  // Dessert carousel navigation functions (unchanged)
  const changeDessertSlide = (nextIndex) => {
    setDessertAnimationClass("fade-out");
    setTimeout(() => {
      setDessertCurrent(nextIndex);
      setDessertAnimationClass("fade-in");
    }, 800);
  };

  const nextDessertSlide = () => {
    changeDessertSlide((dessertCurrent + 1) % Math.ceil(dessertImages.length / 2));
  };

  const prevDessertSlide = () => {
    changeDessertSlide((dessertCurrent - 1 + Math.ceil(dessertImages.length / 2)) % Math.ceil(dessertImages.length / 2));
  };



  // Các hàm điều hướng
  const handleBookTable = () => {
    navigate(`/booking/${restaurantId}`);
  };

  const handleViewMenu = () => {
    navigate(`/viewmenu/${restaurantId}`);
  };

  // Chức năng toggle menu
  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // Scroll to top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="container">
      <div className="hero-carousel">
        <div
          className="slide"
          style={{ backgroundImage: `url(${carouselImages[mainCurrent]})` }}
        >

          <div className={`overlay-content ${mainAnimationClass}`}>
            <h1>{titles[mainCurrent]}</h1>
            <p>{descriptions[mainCurrent]}</p>
            <button className="btn-menu" onClick={handleViewMenu}>
              <b>{t('restaurantDetail.carousel.VIEWOURMENU')}</b>
            </button>
          </div>

          <button className="prev" onClick={prevMainSlide}>❮</button>
          <button className="next" onClick={nextMainSlide}>❯</button>
        </div>
      </div>

      {String(restaurantId) === "8" && (
        <div className="Page2">
          <div className="our-main-meals">
            <p className="subtitle">Ngon và Giòn</p>
            <h1 className="title">{sectionTitles.main}</h1>
            <p className="description">
              {t('restaurantDetail.section_main_meals.description')}
            </p>
          </div>
          <div className="main-meal-carousel">
            <div className={`main-meal-slide ${mainMealsAnimationClass}`}>
              {mainImages[mainMealsCurrent] && (
                <img
                  src={mainImages[mainMealsCurrent]}
                  alt={`Main meal ${mainMealsCurrent + 1}`}
                  className="main-meal-image-fullwidth"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="Page2">
        {String(restaurantId) !== "8" && (
          <>
            <div className="our-starters">
              <p className="subtitle">{t('restaurantDetail.section_starters.TASTY AND CRUNCHY')}</p>
              <h1 className="title">{sectionTitles.starters}</h1>
              <p className="description">
                {t('restaurantDetail.section_starters.description')}
              </p>
            </div>
            {String(restaurantId) === "7" ? (
              <div className="starter-carousel">
                <div className={`starter-slide ${startersAnimationClass}`}>
                  {startersImages[startersCurrent] && (
                    <img
                      src={startersImages[startersCurrent]}
                      alt={`Starter ${startersCurrent + 1}`}
                      className="starter-image-fullwidth"
                    />
                  )}
                </div>
                <button
                  className="starter-prev"
                  onClick={prevStartersSlide}
                  aria-label="Previous starter slide"
                >
                  ❮
                </button>
                <button
                  className="starter-next"
                  onClick={nextStartersSlide}
                  aria-label="Next starter slide"
                >
                  ❯
                </button>
              </div>
            ) : (
              <div className="starter-carousel">
                <div className={`starter-slide ${startersAnimationClass}`}>
                  {startersImages[startersCurrent * 2] && (
                    <img
                      src={startersImages[startersCurrent * 2]}
                      alt={`Starter ${startersCurrent * 2 + 1}`}
                      className="starter-image"
                    />
                  )}
                  {startersImages[startersCurrent * 2 + 1] && (
                    <img
                      src={startersImages[startersCurrent * 2 + 1]}
                      alt={`Starter ${startersCurrent * 2 + 2}`}
                      className="starter-image"
                    />
                  )}
                </div>
                <button
                  className="starter-prev"
                  onClick={prevStartersSlide}
                  aria-label="Previous starter slide"
                >
                  ❮
                </button>
                <button
                  className="starter-next"
                  onClick={nextStartersSlide}
                  aria-label="Next starter slide"
                >
                  ❯
                </button>
              </div>
            )}
          </>
        )}
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
          bgImage={heroSectionImage || "/images/slide4.jpg"}
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
              <p className="subtitle">{t('restaurantDetail.section_hero.TASTY AND CRUNCHY')}</p>
              <h1>{t('restaurantDetail.section_hero.Book a Table')}</h1>
              <p>
                {t('restaurantDetail.section_hero.description')}
              </p>
              <button className="btn-menu" onClick={handleBookTable}>
                <b>{t('restaurantDetail.section_hero.BOOK NOW')}</b>
              </button>
            </div>
          </div>
        </Parallax>
      </div>

      {String(restaurantId) !== "8" && (
        <div className="Page2">
          <div className="our-main-meals">
            <p className="subtitle">{t('restaurantDetail.section_main_meals.TASTY AND CRUNCHY')}</p>
            <h1 className="title">{sectionTitles.main}</h1>
            <p className="description">
              {t('restaurantDetail.section_main_meals.description')}
            </p>
          </div>
          {String(restaurantId) === "7" ? (
            <div className="main-meal-carousel">
              <div className={`main-meal-slide ${mainMealsAnimationClass}`}>
                {mainImages[mainMealsCurrent] && (
                  <img
                    src={mainImages[mainMealsCurrent]}
                    alt={`Main meal ${mainMealsCurrent + 1}`}
                    className="main-meal-image-fullwidth"
                  />
                )}
              </div>
              <button
                className="main-meal-prev"
                onClick={prevMainMealsSlide}
                aria-label="Previous main meal slide"
              >
                ❮
              </button>
              <button
                className="main-meal-next"
                onClick={nextMainMealsSlide}
                aria-label="Next main meal slide"
              >
                ❯
              </button>
            </div>
          ) : (
            <div className="main-meal-carousel">
              <div className={`main-meal-slide ${mainMealsAnimationClass}`}>
                {mainImages[mainMealsCurrent * 2] && (
                  <img
                    src={mainImages[mainMealsCurrent * 2]}
                    alt={`Main meal ${mainMealsCurrent * 2 + 1}`}
                    className="main-meal-image"
                  />
                )}
                {mainImages[mainMealsCurrent * 2 + 1] && (
                  <img
                    src={mainImages[mainMealsCurrent * 2 + 1]}
                    alt={`Main meal ${mainMealsCurrent * 2 + 2}`}
                    className="main-meal-image"
                  />
                )}
              </div>
              <button
                className="main-meal-prev"
                onClick={prevMainMealsSlide}
                aria-label="Previous main meal slide"
              >
                ❮
              </button>
              <button
                className="main-meal-next"
                onClick={nextMainMealsSlide}
                aria-label="Next main meal slide"
              >
                ❯
              </button>
            </div>
          )}
        </div>
      )}




      {String(restaurantId) !== "8" && (
        <div className="review-section">
          <Parallax
            bgImage={reviewSectionImage || "/images/slide5.jpg"}
            strength={600}
            className="testimonial-parallax"
            bgImageStyle={{
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="overlay-content-review-section">
              <p className="subtitle"> {t('restaurantDetail.section_review.TASTY AND CRUNCHY')}</p>
              <h1>{t('restaurantDetail.section_review.What People Say')}</h1>
              <p className="body-text-gray-centered">
                {t('restaurantDetail.section_review.description')}
              </p>
            </div>
            <div className="grid-3">
              {(() => {
                const restaurantData = require('../../json/restaurant.json');
                const restaurant = restaurantData.restaurants.find(r => String(r.id) === String(restaurantId));
                if (!restaurant || !restaurant.reviews) return null;
                return restaurant.reviews.map((review, index) => (
                  <div className="card" key={index}>
                    <p className="card-text">{review.comment}</p>
                    <hr className="hr" />
                    <div className="flex-row">
                      <img
                        alt={`Portrait of ${review.name}`}
                        className="avatar"
                        src={review.imagepeple}
                        width="48"
                        height="48"
                      />
                      <div>
                        <p className="name">{review.name}</p>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </Parallax>
        </div>
      )}

      {String(restaurantId) !== "8" && (
        <div className="Page2">
          <div className="our-desserts">
            <p className="subtitle">{t('restaurantDetail.section_dessert.TASTY AND CRUNCHY')}</p>
            <h1 className="title">{sectionTitles.dessert}</h1>
            <p className="description">
              {t('restaurantDetail.section_dessert.description')}
            </p>
          </div>
          {String(restaurantId) === "7" ? (
            <div className="dessert-carousel">
              <div className={`dessert-slide ${dessertAnimationClass}`}>
                {dessertImages[dessertCurrent] && (
                  <img
                    src={dessertImages[dessertCurrent]}
                    alt={`Dessert ${dessertCurrent + 1}`}
                    className="dessert-image-fullwidth"
                  />
                )}
              </div>
              <button
                className="dessert-prev"
                onClick={prevDessertSlide}
                aria-label="Previous dessert slide"
              >
                ❮
              </button>
              <button
                className="dessert-next"
                onClick={nextDessertSlide}
                aria-label="Next dessert slide"
              >
                ❯
              </button>
            </div>
          ) : (
            <div className="dessert-carousel">
              <div className={`dessert-slide ${dessertAnimationClass}`}>
                {dessertImages[dessertCurrent * 2] && (
                  <img
                    src={dessertImages[dessertCurrent * 2]}
                    alt={`Dessert ${dessertCurrent * 2 + 1}`}
                    className="dessert-image"
                  />
                )}
                {dessertImages[dessertCurrent * 2 + 1] && (
                  <img
                    src={dessertImages[dessertCurrent * 2 + 1]}
                    alt={`Dessert ${dessertCurrent * 2 + 2}`}
                    className="dessert-image"
                  />
                )}
              </div>
              <button
                className="dessert-prev"
                onClick={prevDessertSlide}
                aria-label="Previous dessert slide"
              >
                ❮
              </button>
              <button
                className="dessert-next"
                onClick={nextDessertSlide}
                aria-label="Next dessert slide"
              >
                ❯
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default RestaurantDetail;