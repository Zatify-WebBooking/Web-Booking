import React from 'react';
import { Parallax } from 'react-parallax';
import '../../styles/restaurant/table.css';

const BookTable = () => {
    const zaloPhone = '0909.944.879';
    const zaloLink = 'https://zalo.me/0909944879';
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(zaloLink)}`;

    return (
        <Parallax bgImage="/images/booktable.webp" strength={500}>
            <div className="book-table-parallax" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="book-table-container" style={{ textAlign: 'center' }}>
                    <p className="subtitle">NGON VÀ GIÒN    </p>
                    <h1>Liên hệ đặt bàn</h1>
                    <div style={{ display: 'flex',flexDirection: 'column' ,alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px', fontSize: '18px', color:'white' }}>
                        <div>Vui lòng liên hệ với Zalo: {zaloPhone}</div>
                        <p>Scan mã này để liên hệ đặt bàn</p>
                        <img src={qrCodeUrl} alt="Zalo QR Code" style={{ height: '150px', width: '150px' }} />
                        <a href={zaloLink} target="_blank" rel="noopener noreferrer">
                            <button type="button">Chuyển sang Zalo</button>
                        </a>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default BookTable;
