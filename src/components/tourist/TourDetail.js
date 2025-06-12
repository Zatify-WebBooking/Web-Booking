import React, { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';
import restaurantData from '../../json/restaurant.json';
import HeaderTourist from '../partials/HeaderTourist';

const TourDetail = ({ tourId }) => {
  const [pdfs, setPdfs] = useState([]);
  const [labels, setLabels] = useState([]);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [touristName, setTouristName] = useState('');

  useEffect(() => {
    const tourist = restaurantData.tourist.find(t => t.id === tourId);
    if (tourist) {
      setTouristName(tourist.name || '');
      setPdfs(tourist.pdfabout || []);
      setLabels(tourist.labels || []);
      setBackgroundImages(tourist.backgroundImages || []);
    } else {
      setTouristName('');
      setPdfs([]);
      setLabels([]);
      setBackgroundImages([]);
    }
  }, [tourId]);

  return (
    <div>
      <style>{`
        .btn-menu:hover {
          background-color: #043a5c !important;
        }
        .subtitle {
          font-size: 2.2rem !important;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
      `}</style>
      <HeaderTourist />
      {pdfs.length > 0 ? (
        pdfs.map((pdfPath, index) => (
          <div className="hero-section" key={index}>
            <Parallax
              strength={100}
              className="slide-hero-section"
              bgImage={backgroundImages[index] || "/images/slide4.jpg"}
              bgImageStyle={{
                backgroundAttachment: 'fixed',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              style={{width: '70%'}}
            >
              <div style={{ height: '100vh'}}>
                <div className="overlay-content-hero-section" >
                  <h1 style={{ color: '#fff', marginTop: '10vh', textShadow: '2px 2px 4px rgba(38, 56, 143, 0.7)' }}>{touristName}</h1>
                  <p style={{ color: '#fff', marginTop: '0px', marginBottom: '3vh', textShadow: '1px 1px 3px rgba(38, 56, 143, 0.7)' }} className="subtitle">{labels[index] || ''}</p>
                  <p>
                    <a href={pdfPath} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <button style={{backgroundColor: '#06497a', color: 'white'}} className="btn-menu">
                        <b>VIEW TOUR</b>
                      </button>
                    </a>
                  </p>
                </div>
              </div>
            </Parallax>
          </div>
        ))
      ) : (
        <p>No PDF documents available for this tour.</p>
      )}
    </div>
  );
};

export default TourDetail;
