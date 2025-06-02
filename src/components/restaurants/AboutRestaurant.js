import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import restaurantData from '../../json/restaurant.json';
import '../../styles/restaurant/about.css';

const AboutRestaurant = () => {
  const { id } = useParams();
  const restaurantId = Number(id);
  const restaurant = restaurantData.restaurants.find(r => r.id === restaurantId);

  const [birthdayCurrent, setBirthdayCurrent] = useState(0);
  const [weddingCurrent, setWeddingCurrent] = useState(0);
  const [aboutCurrent, setAboutCurrent] = useState(0);

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }
  const aboutImages = restaurant.serviceImages?.about || [];
  const birthdayImages = restaurant.serviceImages?.birthday || [];
  const weddingImages = restaurant.serviceImages?.wedding || [];

  const changeBirthdaySlide = (nextIndex) => {
    setBirthdayCurrent((nextIndex + birthdayImages.length) % birthdayImages.length);
  };

  const nextBirthdaySlide = () => {
    changeBirthdaySlide(birthdayCurrent + 1);
  };

  const prevBirthdaySlide = () => {
    changeBirthdaySlide(birthdayCurrent - 1);
  };

  const changeWeddingSlide = (nextIndex) => {
    setWeddingCurrent((nextIndex + weddingImages.length) % weddingImages.length);
  };

  const nextWeddingSlide = () => {
    changeWeddingSlide(weddingCurrent + 1);
  };

  const prevWeddingSlide = () => {
    changeWeddingSlide(weddingCurrent - 1);
  };

  const changeAboutSlide = (nextIndex) => {
    setAboutCurrent((nextIndex + aboutImages.length) % aboutImages.length);
  };

  const nextAboutSlide = () => {
    changeAboutSlide(aboutCurrent + 1);
  };

  const prevAboutSlide = () => {
    changeAboutSlide(aboutCurrent - 1);
  };


  return (
    <>
      <div className="Page2">
        <div className="our-desserts">
          <p className="subtitle">About</p>
          <h1 className="title">Giới thiệu</h1>
          <p className="description-about">{restaurant.description}</p>
          <div className="dessert-carousel-about">
            <div className="dessert-slide">
              {aboutImages.length > 0 && (
                <img
                  src={process.env.PUBLIC_URL + aboutImages[aboutCurrent]}
                  alt={`About ${aboutCurrent + 1}`}
                  className="dessert-image-about"
                />
              )}
            </div>
            <button className="dessert-prev-about" onClick={prevAboutSlide} aria-label="Previous About image">&#10094;</button>
            <button className="dessert-next-about" onClick={nextAboutSlide} aria-label="Next About image">&#10095;</button>
          </div>
        </div>
      </div>

      <div className="Page2">
        <div className="our-desserts">
          <p className="subtitle">Services</p>
          <h4 className="title">Đặt tiệc sinh nhật</h4>
          <p className="description-about">{restaurant.descriptionbirthday}</p>
          <div className="dessert-carousel-about">
            <div className="dessert-slide">
              {birthdayImages.length > 0 && (
                <img
                  src={process.env.PUBLIC_URL + birthdayImages[birthdayCurrent]}
                  alt={`Birthday ${birthdayCurrent + 1}`}
                  className="dessert-image-about"
                />
              )}
            </div>
            <button className="dessert-prev-about" onClick={prevBirthdaySlide} aria-label="Previous birthday image">&#10094;</button>
            <button className="dessert-next-about" onClick={nextBirthdaySlide} aria-label="Next birthday image">&#10095;</button>
          </div>
          <h4 className="title">Đặt tiệc cưới</h4>
          <p className="description-about">{restaurant.descriptionwedding}</p>
          <div className="dessert-carousel-about">
            <div className="dessert-slide">
              {weddingImages.length > 0 && (
                <img
                  src={process.env.PUBLIC_URL + weddingImages[weddingCurrent]}
                  alt={`Wedding ${weddingCurrent + 1}`}
                  className="dessert-image-about"
                />
              )}
            </div>
            <button className="dessert-prev-about" onClick={prevWeddingSlide} aria-label="Previous wedding image">&#10094;</button>
            <button className="dessert-next-about" onClick={nextWeddingSlide} aria-label="Next wedding image">&#10095;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutRestaurant;
