import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../../styles/bookingweb/booking.css";

function BookingWeb() {
  const [activeTab, setActiveTab] = useState("restaurant");
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ restaurants: [], hotels: [] });
  const [loading, setLoading] = useState(true);
  const [vouchers, setVouchers] = useState([]); // Thêm state voucher
  const navigate = useNavigate();
  const [search] = useOutletContext();

  // Fetch voucher
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/vouchers");
        setVouchers(res.data || []);
      } catch (error) {
        setVouchers([]);
      }
    };
    fetchVouchers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [restaurantsRes, hotelsRes] = await Promise.all([
          axios.get("http://localhost:3001/restaurants"),
          axios.get("http://localhost:3001/hotels"),
        ]);
        setData({
          restaurants: restaurantsRes.data,
          hotels: hotelsRes.data,
        });
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const list = activeTab === "restaurant" ? data.restaurants : data.hotels;
  const pageSize = 4;

  // Lọc theo tên hoặc địa chỉ
  const filteredList = list.filter(item => {
    if (!search || !search.trim()) return true;
    const keyword = search.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(keyword)) ||
      (item.address && item.address.toLowerCase().includes(keyword))
    );
  });

  const maxPage = Math.ceil(filteredList.length / pageSize) - 1;

  const handleCardClick = (id) => {
    if (activeTab === "restaurant") {
      navigate(`/restaurant/${id}`);
    }
  };

  const renderCards = (list) => (
    <div className="card-container">
      {list
        .slice(page * pageSize, page * pageSize + pageSize)
        .map((item, idx) => (
          <div
            key={item.id || idx}
            className="card"
            style={{ cursor: activeTab === "restaurant" ? "pointer" : "default" }}
            onClick={() => activeTab === "restaurant" && handleCardClick(item.id)}
          >
            <div className="card-image">
              <img
                src={item.image}
                alt={item.name || "Restaurant"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="card-title">{item.name || `Nhà hàng ${idx + 1}`}</div>
            {activeTab === "restaurant" && (
              <div className="card-info">
                <div className="card-address">
                  <span role="img" aria-label="address">📍</span> {item.address || "Chưa cập nhật"}
                </div>
                <div className="card-rating">
                  <span role="img" aria-label="star">⭐</span> {item.rating ? item.rating + "/5" : "Chưa có đánh giá"}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );

  useEffect(() => {
    setPage(0);
  }, [activeTab, search]);

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div>
      {/* Voucher list ngang */}
      {vouchers.length > 0 && (
        <div className="voucher-list">
          {vouchers.map((voucher, idx) => (
            <div
              key={voucher.id || idx}
              style={{
                minWidth: 220,
                background: "#f5f5f5",
                borderRadius: 10,
                boxShadow: "0 2px 8px #0001",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flex: "0 0 auto"
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 18, color: "#1976d2" }}>
                {voucher.code || "Voucher"}
              </div>
              <div style={{ margin: "8px 0", fontSize: 15 }}>
                {voucher.description || ""}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>
                HSD: {voucher.expiry || "Không xác định"}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Tab buttons */}

      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("restaurant")}
          className={`tab-button ${activeTab === "restaurant" ? "active" : ""}`}
        >
          Booking Restaurant
        </button>
        <button
          onClick={() => setActiveTab("hotel")}
          className={`tab-button ${activeTab === "hotel" ? "active" : ""}`}
        >
          Booking Hotel
        </button>
      </div>

      <div className="card-container-wrapper">
        {renderCards(filteredList)}
        <div className="pagination-buttons">
          <button
            className="prev-next-button"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            style={{ marginRight: 8 }}
          >
            Prev
          </button>
          {filteredList.length > 8 &&
            Array.from({ length: maxPage + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={page === idx ? "active-page-btn" : ""}
                style={{
                  margin: "0 4px",
                  background: page === idx ? "#1976d2" : "#fff",
                  color: page === idx ? "#fff" : "#1976d2",
                  border: "1px solid #1976d2",
                  borderRadius: 6,
                  padding: "6px 14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {idx + 1}
              </button>
            ))}
          <button
            className="prev-next-button"
            onClick={() => setPage(page + 1)}
            disabled={page === maxPage}
            style={{ marginLeft: 8 }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingWeb;