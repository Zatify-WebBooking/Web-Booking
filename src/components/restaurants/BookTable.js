import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import '../../styles/restaurant/table.css';

const BookTable = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(1);
    const [note, setNote] = useState('');
    const [message, setMessage] = useState('');
    const { id: restaurantId } = useParams(); // Lấy restaurantId từ URL


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBooking = {
            Ma_KH: name,
            SoDienThoai: phone,
            GhiChu: note,
            NgayDat: date,
            GioDat: time,
            SoLuongNguoi: parseInt(guests),
            Ma_Ban: null,
            TrangThai: "Chờ xác nhận",
            restaurantId
        };

        try {
            await axios.post('http://localhost:3001/datban', newBooking);
            setMessage(`✅ Đặt bàn thành công cho ${name} vào ngày ${date} lúc ${time} cho ${guests} khách.`);
            setName('');
            setPhone('');
            setDate('');
            setTime('');
            setGuests(1);
            setNote('');
        } catch (error) {
            setMessage('❌ Đặt bàn thất bại. Vui lòng thử lại sau.');
            console.error(error);
        }
    };

    return (
        <Parallax bgImage="/images/booktable.webp" strength={500}>
            <div className="book-table-parallax" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="book-table-container">
                    <p className="subtitle">TASTY AND CRUNCHY</p>
                    <h1>Book A Table</h1>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="Ma_KH">Full Name:</label>
                            <input
                                type="text"
                                id="Ma_KH"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="SoDienThoai">Phone Number:</label>
                            <input
                                type="tel"
                                id="SoDienThoai"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="NgayDat">Book Date:</label>
                            <input
                                type="date"
                                id="NgayDat"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="GioDat">Time:</label>
                            <input
                                type="time"
                                id="GioDat"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="SoLuongNguoi">People:</label>
                            <input
                                type="number"
                                id="SoLuongNguoi"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                min="1"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="GhiChu">Note:</label>
                            <textarea
                                id="GhiChu"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={3}
                                placeholder="Ghi chú đặc biệt (nếu có)..."
                            />
                        </div>
                        <button type="submit">Book Table</button>
                    </form>
                    {message && <p className="success-message">{message}</p>}
                </div>
            </div>
        </Parallax>
    );
};

export default BookTable;
