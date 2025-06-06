import React, { useState } from 'react';
import { Parallax } from 'react-parallax';
import '../../styles/restaurant/table.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import HotelAside from './HotelAside';
import restaurantData from '../../json/restaurant.json';


const BookRoom = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const navItems = ['HOME', 'ROOMS', 'ABOUT', 'CONTACT'];
    const { id: hotelId } = useParams();
    const navigate = useNavigate();
    const hotel = restaurantData.hotels.find(h => h.id === Number(hotelId));


    const zaloPhone = '0909.944.879';
    const zaloLink = 'https://zalo.me/0909944879';
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(zaloLink)}`;

    const handleNavClick = (index, e) => {
        e.preventDefault();
        setActiveIndex(index);
        if (index === 0) {
            navigate(`/hotel/${hotelId}`);
        } else if (index === 1) {
            const section = document.querySelector('.elecmentor-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (index === 2) {
            navigate(`/hotel/abouthotel/${hotelId}`);
        } else if (index === 3) {
            navigate(`/bookroom/${hotelId}`);
        }
    };

    return (
        <div className="hotel-root container">
            <HotelAside
                hotelId={hotelId}
                hotelName={hotel ? hotel.name : null}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            />
            <main>
                <Parallax bgImage="/images/bookroom.jpg" strength={500}>
                    <div className="book-table-parallax" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div className="book-table-container" style={{ textAlign: 'center' }}>
                            <p className="subtitle">SẠCH SẼ VÀ TIỆN NGHI</p>
                            <h1>Liên hệ đặt phòng </h1>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px', fontSize: '18px', color: 'white' }}>
                                <div>Vui lòng liên hệ với Zalo: {zaloPhone}</div>
                                <p>Scan mã này để liên hệ đặt phòng</p>
                                <img src={qrCodeUrl} alt="Zalo QR Code" style={{ height: '150px', width: '150px' }} />
                                <a href={zaloLink} target="_blank" rel="noopener noreferrer">
                                    <button type="button">Chuyển sang Zalo</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </main>
        </div>
    );
};

export default BookRoom;
