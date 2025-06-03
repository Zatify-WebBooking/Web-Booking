// src/components/hotels/AboutHotel.js
import { useParams } from "react-router-dom";
import restaurantData from "../../json/restaurant.json";
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import HotelAside from './HotelAside';

const AboutHotel = () => {
  const { id } = useParams();
  const hotelId = parseInt(id);
  const hotel = restaurantData.hotels.find(h => h.id === hotelId);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  if (!hotel) {
    return <div>Không tìm thấy khách sạn!</div>;
  }

  return (
    <div className="hotel-root container">
      <HotelAside
        hotelId={hotelId}
        hotelName={hotel ? hotel.name : null}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <div className="slide-about">
        {hotel.serviceImages.about.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`about-${idx}`}
            className="rounded object-cover w-full h-48"
          />
        ))}
      </div>
    </div>
  );
};

export default AboutHotel;
