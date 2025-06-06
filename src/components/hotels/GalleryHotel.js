import React, { useState } from 'react';
import hotelData from '../../json/restaurant.json';
import '../../styles/hotel/gallery.css';
import HotelAside from './HotelAside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope } from '@fortawesome/free-regular-svg-icons';

const GalleryHotel = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hotel = hotelData.hotels.find(h => h.id === id);

  if (!hotel) {
    return <div>Hotel not found.</div>;
  }

  const galleryImages = hotel.galleryImage;

  const images = galleryImages ? Object.values(galleryImages).flat() : [];

  if (!images || images.length === 0) {
    return <div>No gallery images available for this hotel.</div>;
  }

  const rows = [];
  let i = 0;
  let toggle = true;

  while (i < images.length) {
    if (toggle) {
      rows.push(images.slice(i, i + 1));
      i += 1;
    } else {
      rows.push(images.slice(i, i + 2));
      i += 2;
    }
    toggle = !toggle;
  }

  return (
    <div className="hotel-root container">
      <header className="hotel-aside-header">
        <div className="gallery-hotel-aside-wrapper">
          <HotelAside
            hotelId={hotel.id}
            hotelName={hotel.name}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </header>
      <div className="gallery-hotel-container">
        <div className="gallery-hotel">
          {rows.map((rowImages, rowIndex) => (
            <div
              key={rowIndex}
              className={`gallery-row ${rowImages.length === 1 ? 'single-image' : 'two-images'}`}
            >
              {rowImages.map((imgSrc, imgIndex) => (
                <img
                  key={imgIndex}
                  src={imgSrc}
                  alt={`Gallery image ${rowIndex * 2 + imgIndex + 1}`}
                  className="gallery-image"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div class="newsletter-wrapper">
        <section className="footerhotel">
          <div className='mail-icon'><FontAwesomeIcon icon={faEnvelope} /></div>
          <label for="email">Liên hệ zalo của tôi</label>
          <button type="submit">ZALO ME</button>
        </section>
      </div>
    </div>
  );
};

export default GalleryHotel;
