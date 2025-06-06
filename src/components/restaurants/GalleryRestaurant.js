import React from 'react';
import restaurantData from '../../json/restaurant.json';
import '../../styles/restaurant/gallery.css';

const GalleryRestaurant = ({ id }) => {
  const restaurant = restaurantData.restaurants.find(r => r.id === id);

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  const galleryImages = restaurant.galleryImage;

  const images = galleryImages ? Object.values(galleryImages).flat() : [];

  if (!images || images.length === 0) {
    return <div>No gallery images available for this restaurant.</div>;
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
    <div className="gallery-restaurant">
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
  );
};

export default GalleryRestaurant;
