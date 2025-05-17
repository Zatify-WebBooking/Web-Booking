import React, { useState } from 'react';
import { Parallax } from 'react-parallax';
import '../../../styles/table.css';

const BookTable = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(1);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(`Đặt bàn thành công cho ${name} vào ngày ${date} lúc ${time} cho ${guests} khách.`);
    };

    return (
        <Parallax
            bgImage="/images/booktable.webp"
            strength={500}
        >
            <div className="book-table-parallax" style={{
                height: '100vh',
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
                                name="Ma_KH"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email">Your Email:</label>
                            <input
                                type="email"
                                id="Email"
                                name="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="NgayDat">Book Date:</label>
                            <input
                                type="date"
                                id="NgayDat"
                                name="NgayDat"
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
                                name="GioDat"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="SoLuong">People:</label>
                            <input
                                type="number"
                                id="SoLuong"
                                name="SoLuong"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                min="1"
                                required
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
