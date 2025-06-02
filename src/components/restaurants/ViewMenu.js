import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/restaurant/menu.css';
import { useTranslation } from 'react-i18next';

const ViewMenu = () => {
  const { t, i18n } = useTranslation();
  const { id: restaurantId } = useParams();

  const [menus, setMenus] = useState([]);
  const [startersImages, setStartersImages] = useState([]);
  const [mainImages, setMainImages] = useState([]);
  const [dessertImages, setDessertImages] = useState([]);
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

  // Lấy dữ liệu món ăn
  useEffect(() => {
    axios.get("http://localhost:3001/thucdon")
      .then(res => setMenus(res.data))
      .catch(err => console.error("Error fetching menu:", err));
  }, []);

  // Lấy ảnh theo loại
  useEffect(() => {
    axios.get("http://localhost:3001/restaurants")
      .then(res => {
        const restaurant = res.data.find(r => String(r.id) === String(restaurantId));
        if (restaurant) {
          setStartersImages(restaurant.startersImages || []);
          setMainImages(restaurant.mainImages || []);
          setDessertImages(restaurant.dessertImages || []);
        }
      })
      .catch(err => console.error("Error fetching restaurant images:", err));
  }, [restaurantId]);

  // Lọc món
  const filteredMenus = menus.filter(item => String(item.restaurantId) === String(restaurantId));
  const starters = filteredMenus.filter(item => item.Loai === "starters");
  const mainMeals = filteredMenus.filter(item => item.Loai === "main-meals");
  const desserts = filteredMenus.filter(item => item.Loai === "desserts");

  // Render món ăn
  const renderItems = (items) => (
    <div className="grid space-y-8">
      {items.map(item => (
        <div key={item.Ma_ThucDon} className="item">
          <img
            src={item.Anh || `https://via.placeholder.com/400x250?text=${encodeURIComponent(item.Ten)}`}
            alt={item.Ten}
          />
          <div className="item-content">
            <div className="item-header">
              <span className="item-title">{item.Ten}</span>
              <span className="item-price">$ {item.Gia?.toLocaleString()}</span>
            </div>
            <div className="divider"></div>
            <p className="item-description">{item.MoTa}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // Render ảnh theo loại
  const renderImages = (images, type) => {
    let className = '';
    if (type === 'starters') className = 'starters-image-list';
    else if (type === 'main') className = 'main-meal-image-list';
    else if (type === 'dessert') className = 'dessert-image-list';

    return (
      <div className={className}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Image ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="Viewmenu">
      {/* Starters */}
      <div className="our-starters">
        <p className="subtitle">{t('restaurantDetail.section_starters.TASTY AND CRUNCHY')}</p>
        <h2 className="title">{sectionTitles.starters}</h2>
        {renderImages(startersImages, 'starters')}
      </div>

      {/* Main Meals */}
      <div className="our-main-meals">
        <p className="subtitle">{t('restaurantDetail.section_main_meals.TASTY AND CRUNCHY')}</p>
        <h2 className="title">{sectionTitles.main}</h2>
        {renderImages(mainImages, 'main')}
      </div>

      {/* Desserts */}
      <div className="our-desserts">
        <p className="subtitle">{t('restaurantDetail.section_dessert.TASTY AND CRUNCHY')}</p>
        <h2 className="title">{sectionTitles.dessert}</h2>
        {renderImages(dessertImages, 'dessert')}
      </div>
    </div>
  );
};

export default ViewMenu