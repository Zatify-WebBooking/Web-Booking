import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/restaurant/menu.css';

const ViewMenu = () => {
  const [menus, setMenus] = useState([]);
  const { id: restaurantId } = useParams();

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
        <p className="subtitle">TASTY AND CRUNCH</p>
        <h2 className="title">Our Starters</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        {renderItems(starters)}
      </div>

      <div className="our-main-meals">
        <p className="subtitle">TASTY AND CRUNCH</p>
        <h2 className="title">Our Main Meals</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        {renderItems(mainMeals)}
      </div>

      <div className="our-desserts">
        <p className="subtitle">TASTY AND CRUNCH</p>
        <h2 className="title">Our Desserts</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        {renderItems(desserts)}
      </div>
    </div>
  );
};

export default ViewMenu;