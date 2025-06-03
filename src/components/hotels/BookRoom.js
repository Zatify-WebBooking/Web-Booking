import React, { useState } from 'react';
import { Parallax } from 'react-parallax';
import '../../styles/restaurant/table.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const BookRoom = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const navItems = ['HOME', 'ROOMS', 'ABOUT', 'CONTACT'];
    const { id: hotelId } = useParams();
    const navigate = useNavigate();

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
            <aside>
                <div className="logo-wrapper">
                    <h1>{t('hotelDetail.logo')}</h1>
                    <span className="big-number">A</span>
                </div>
                <nav id="sidebar-nav">
                    {navItems.map((item, idx) => {
                        const navKeyMap = ['home', 'rooms', 'about', 'contact'];
                        return (
                            <a
                                href="#"
                                key={item}
                                className={activeIndex === idx ? 'active' : ''}
                                onClick={(e) => handleNavClick(idx, e)}
                            >
                                {t(`hotelDetail.nav.${navKeyMap[idx]}`)}
                            </a>
                        );
                    })}
                </nav>
                <div className="footer">
                    <div className="social-icons">
                        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    </div>
                    <address>
                        2 Bis Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, TP.HCM<br />
                        0909.944.879<br />
                        trangntt@bam.globalx.com.vn
                    </address>
                </div>
            </aside>
            <main>
                <Parallax bgImage="/images/booktable.webp" strength={500}>
                    <div className="book-table-parallax" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div className="book-table-container" style={{ textAlign: 'center' }}>
                            <p className="subtitle">SẠCH SẼ VÀ TIỆN NGHI</p>
                            <h1>liên hệ đạt phòng </h1>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px', fontSize: '18px', color: 'white' }}>
                                <div>Vui lòng liên hệ với Zalo: {zaloPhone}</div>
                                <p>Scan mã này để liên hệ đạt bàn</p>
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
