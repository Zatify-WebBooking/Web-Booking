import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/bookingweb/booking.css";

function HeaderBooking({ onSearch }) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(search.trim());
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (onSearch) onSearch(value.trim());
    };

    return (
        <header className="header-booking">
            <img
                src="/images/logo.png"
                alt="BookingWeb Logo"
                className="logo-bookingweb"
                style={{ height: 40, marginRight: 24, cursor: "pointer" }}
                onClick={() => navigate("/")}
            />
            <form onSubmit={handleSearch} style={{ flex: 1, display: "flex" }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm khách sạn, nhà hàng..."
                    value={search}
                    onChange={handleChange}
                />
            </form>
            <nav style={{ marginRight: "32px" }}>
                <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
                <button className="nav-btn" onClick={() => navigate("/about")}>About</button>
                <button className="nav-btn" onClick={() => navigate("/contact")}>Contact</button>
            </nav>
        </header>
    );
}

export default HeaderBooking;