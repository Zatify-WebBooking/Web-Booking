import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/restaurant/menu.css';
import { useTranslation } from 'react-i18next';

const ViewMenu = () => {
  const { t } = useTranslation();
  const [menus, setMenus] = useState([]);
  const { id: restaurantId } = useParams()
    ;

  useEffect(() => {
    axios.get("http://localhost:3001/thucdon")
      .then(res => setMenus(res.data))
      .catch(err => console.error("Error fetching menu:", err));
  }, []);

  // Lọc menu theo restaurantId trước
  const filteredMenus = menus.filter(
    item => String(item.restaurantId) === String(restaurantId)
  );

  // Lọc theo loại trên filteredMenus
  const starters = filteredMenus.filter(item => item.Loai === "starters");
  const mainMeals = filteredMenus.filter(item => item.Loai === "main-meals");
  const desserts = filteredMenus.filter(item => item.Loai === "desserts");

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

  return (
    <div className="Page2">
      <div className="our-starters">
        <p className="subtitle">{t('restaurantDetail.section_starters.TASTY AND CRUNCHY')}</p>
        <h2 className="title">{t('restaurantDetail.section_starters.Yoyo Appetizers')}</h2>
        <img
          src="/images/monkhaivi.jpg"
          alt="Starters"
          className="starters-image" />
      </div>

      <div className="our-main-meals">
        <p className="subtitle">{t('restaurantDetail.section_main_meals.TASTY AND CRUNCHY')}</p>
        <h2 className="title">{t('restaurantDetail.section_main_meals.Yoyo Main Meals')}</h2>
        <div className="main-meal-image-group">
          <img
            src="/images/mainmeal1.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal2.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal3.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal4.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal5.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal6.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal7.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal8.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal9.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal10.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal11.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal12.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal13.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/mainmeal14.jpg"
            alt="Starters"
            className="starters-image" />
        </div>
      </div>

      <div className="our-desserts">
        <p className="subtitle">{t('restaurantDetail.section_dessert.TASTY AND CRUNCHY')}</p>
        <h2 className="title">{t('restaurantDetail.section_dessert.Beer And Chill')}</h2>
        <div className="beerandchill-image-group">
          <img
            src="/images/beerandchill1.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/beerandchill2.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/beerandchill3.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/beerandchill4.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/beerandchill5.jpg"
            alt="Starters"
            className="starters-image" />
          <img
            src="/images/beerandchill6.jpg"
            alt="Starters"
            className="starters-image" />
        </div>
      </div>
    </div>
  );
};

export default ViewMenu;