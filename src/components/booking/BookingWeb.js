import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import Select from "react-select";
import "../../styles/bookingweb/booking.css";
import FooterBooking from "../partials/FooterBooking";

function BookingWeb() {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ restaurants: [], hotels: [] });
  const [loading, setLoading] = useState(true);
  const [vouchers, setVouchers] = useState([]); // Thêm state voucher
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const prevPageRef = useRef(page);
  const [searchText, setSearchText] = useState("");

  const [animatedWord, setAnimatedWord] = useState("Hotel");
  const animatedWords = ["Hotel", "Restaurant", "Tourist"];
  const animatedIndex = useRef(0);
  const [typing, setTyping] = useState("");

  const carouselImages = [
    "https://truongphugroup.vn/wp-content/uploads/2022/10/Mot-so-tieu-chuan-khi-thiet-ke-nha-hang-ban-can-biet-e1665399224187.jpg",
    "https://noithattrevietnam.com/uploaded/Kien-thuc-nha-dep/sai-lam-trong-thiet-ke-noi-that-nha-hang/1thiet-ke-noi-that-nha-hang-dep.jpg"
  ];
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

  // Tab buttons (giả sử có đoạn render tab, thêm icon và sửa tên)
  {/* <div className="bookingweb-tabs">
    <button
      className={activeTab === "Restaurant" ? "active" : ""}
      onClick={() => setActiveTab("Restaurant")}
    >
      <i className="fas fa-utensils"></i> Restaurant
    </button>
    <button
      className={activeTab === "Hotel" ? "active" : ""}
      onClick={() => setActiveTab("Hotel")}
    >
      <i className="fas fa-hotel"></i> Hotel
    </button>
    <button
      className={activeTab === "Tourist" ? "active" : ""}
      onClick={() => setActiveTab("Tourist")}
    >
      <i className="fas fa-map-marked-alt"></i> Tourist
    </button>
  </div> */}

  const list = activeTab === "Restaurant" ? data.restaurants : activeTab === "Hotel" ? data.hotels : [];
  const pageSize = 4;

  // Lọc theo tên hoặc địa chỉ (ưu tiên searchText nếu có)
  const filteredList = list.filter(item => {
    const keyword = (searchText || search || "").toLowerCase().trim();
    if (!keyword) return true;
    return (
      (item.name && item.name.toLowerCase().includes(keyword)) ||
      (item.address && item.address.toLowerCase().includes(keyword))
    );
  });

  const maxPage = Math.ceil(filteredList.length / pageSize) - 1;

  // Khi bấm Browse trên từng card trong Popular Categories, chuyển đúng trang chi tiết
  const handleCardClick = (id) => {
    if (activeTab.toLowerCase() === "restaurant") {
      navigate(`/restaurant/${id}`);
    } else if (activeTab.toLowerCase() === "hotel") {
      navigate(`/hotel/${id}`);
    } else if (activeTab.toLowerCase() === "tourist") {
      navigate(`/tourist/${id}`);
    }
  };

  const renderCards = (list) =>
    list
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
            />
          </div>
          <div className="card-overlay">
            <div className="card-title">{item.name || `Nhà hàng ${idx + 1}`}</div>
            <div className="card-listings">1 listings</div>
            <button className="card-browse-btn"
              onClick={() => handleCardClick(item.id)}
              style={{ cursor: ["Restaurant","Hotel","Tourist"].includes(activeTab) ? "pointer" : "not-allowed", opacity: ["Restaurant","Hotel","Tourist"].includes(activeTab) ? 1 : 0.6 }}
            >
              Browse
            </button>
          </div>
        </div>
      ));

  useEffect(() => {
    setPage(0);
  }, [activeTab, search]);

  // Carousel slide infinite loop
  const handlePrev = () => {
    setPage((prev) => (prev === 0 ? filteredList.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setPage((prev) => (prev === filteredList.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (filteredList.length === 0) return;
    const timer = setTimeout(() => {
      setPage((prev) => (prev === filteredList.length - 1 ? 0 : prev + 1));
    }, 3000); // chuyển slide sau 3s
    return () => clearTimeout(timer);
  }, [page, filteredList.length]);

  // Detect direction when user click
  const handleSetPage = (idx) => {
    if (idx > page) setSlideDirection("right");
    else if (idx < page) setSlideDirection("left");
    setPage(idx);
  };

  useEffect(() => {
    let wordIndex = animatedIndex.current;
    let charIndex = 0;
    let typingInterval;
    let eraseTimeout;

    function typeWord() {
      const word = animatedWords[wordIndex];
      typingInterval = setInterval(() => {
        setTyping(word.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex > word.length) {
          clearInterval(typingInterval);
          eraseTimeout = setTimeout(() => {
            eraseWord();
          }, 1200); // Hiển thị từ hoàn chỉnh 1.2s
        }
      }, 120); // tốc độ gõ chậm hơn, mượt hơn
    }

    function eraseWord() {
      let eraseIndex = typing.length;
      const word = animatedWords[wordIndex];
      typingInterval = setInterval(() => {
        setTyping(word.slice(0, eraseIndex - 1));
        eraseIndex--;
        if (eraseIndex < 0) {
          clearInterval(typingInterval);
          wordIndex = (wordIndex + 1) % animatedWords.length;
          animatedIndex.current = wordIndex;
          charIndex = 0;
          setTimeout(typeWord, 400); // delay trước khi gõ từ mới
        }
      }, 60); // tốc độ xóa chậm hơn
    }

    typeWord();
    return () => {

      clearInterval(typingInterval);
      clearTimeout(eraseTimeout);
    };
    // eslint-disable-next-line
  }, []);

  // Dữ liệu các slide Most Visited Places
  const mostVisitedSlides = [
    [
      {
        img: "/images/mainmeal1.jpg", // Restaurant (đổi sang ảnh có sẵn)
        title: "Yoyo Central Hồ Con Rùa",
        address: "Quận 3, Hồ Chí Minh",
        badges: [
         
          
        ],
        bottomBadges: [
      
        ]
      },
      {
        img: "/images/slide1.jpg", // Hotel
        title: "Hotel Seava",
        address: "Vũng Tàu, Bà Rịa - Vũng Tàu",
        badges: [
          
        ],
        bottomBadges: [
          
        ]
      },
      {
        img: "/images/slide3.jpg", // Tourist
        title: "NovaWorld Hồ Tràm",
        address: "Xuyên Mộc, Bà Rịa - Vũng Tàu",
       
      }
    ],
    [
      {
        img: "/images/mainmeal2.jpg", // Restaurant
        title: "Dragon Palace",
        address: "Quận 1, Hồ Chí Minh",
        badges: [
          
          
        ],
        bottomBadges: [
          
        ]
      },
      {
        img: "/images/slide2.jpg", // Hotel
        title: "Hotel Minera",
        address: "Bình Dương",
        badges: [
         
        ],
        bottomBadges: [
          
        ]
      },
      {
        img: "/images/slide4.jpg", // Tourist
        title: "NovaWorld Phan Thiết",
        address: "Phan Thiết, Bình Thuận",
        badges: [
        
        ],
        topRight: { text: "Now Open", color: "#fff", bg: "#43a047" },
        bottomBadges: [
          
        ]
      }
    ]
  ];
  const [mostVisitedSlide, setMostVisitedSlide] = useState(0);
  const [mostVisitedDirection, setMostVisitedDirection] = useState(null); // Thêm state hướng lướt

  const handleMostVisitedPrev = () => {
    setMostVisitedDirection('left');
    setMostVisitedSlide(s => (s === 0 ? mostVisitedSlides.length - 1 : s - 1));
  };
  const handleMostVisitedNext = () => {
    setMostVisitedDirection('right');
    setMostVisitedSlide(s => (s === mostVisitedSlides.length - 1 ? 0 : s + 1));
  };

  // Auto slide for Most Visited Places
  useEffect(() => {
    if (mostVisitedSlides.length <= 1) return;
    const timer = setTimeout(() => {
      setMostVisitedDirection('right');
      setMostVisitedSlide((prev) => (prev === mostVisitedSlides.length - 1 ? 0 : prev + 1));
    }, 3500); // chuyển slide sau 3.5s
    return () => clearTimeout(timer);
  }, [mostVisitedSlide, mostVisitedSlides.length]);

  // Testimonial data (3 items, giống hình mẫu)
  const testimonials = [
    {
      text: 'The booking process was seamless and the customer support was outstanding. I found the perfect restaurant for my anniversary dinner! Highly recommend this service.',
      name: 'David Lee',
      title: 'Software Engineer',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      text: 'I love how easy it is to discover new places and make reservations. The interface is user-friendly and the deals are great. Will use again!',
      name: 'Sophia Turner',
      title: 'Marketing Specialist',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      text: 'Excellent experience from start to finish. The reviews helped me choose the best spot and the confirmation was instant. Five stars!',
      name: 'Michael Chen',
      title: 'Business Owner',
      img: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
  ];
  const [testimonialIndex, setTestimonialIndex] = useState(1); // Luôn active ở giữa

  // Xoay slide testimonial
  const handleTestimonialPrev = () => {
    setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  const handleTestimonialNext = () => {
    setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Lấy index 3 feedback: left, center, right
  const getTestimonialIndices = () => {
    const left = (testimonialIndex + testimonials.length - 1) % testimonials.length;
    const center = testimonialIndex;
    const right = (testimonialIndex + 1) % testimonials.length;
    return [left, center, right];
  };
  const [leftIdx, centerIdx, rightIdx] = getTestimonialIndices();

  // Parallax effect for hero image
  const [heroOffset, setHeroOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      // Tăng giảm 0.3 có thể chỉnh cho phù hợp cảm giác, giới hạn tối đa 60px
      const offset = Math.max(-60, Math.min(window.scrollY * 0.3, 60));
      setHeroOffset(offset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cityOptions = [
    { value: "hcm", label: "Hồ Chí Minh" },
    { value: "hn", label: "Hà Nội" },
    { value: "dn", label: "Đà Nẵng" },
    { value: "nt", label: "Nha Trang" },
    { value: "other", label: "Khác..." },
  ];
  const [selectedCity, setSelectedCity] = useState(null);

  if (loading) return <div>Đang tải dữ liệu...</div>;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0); // reset về trang đầu tiên khi search
  };

  // Popular Categories data cho từng loại
  const popularCategories = {
    restaurant: data.restaurants,
    hotel: data.hotels,
    tourist: [
      { id: 1, name: 'NovaWorld Hồ Tràm', image: '/images/slide3.jpg', address: 'Xuyên Mộc, Bà Rịa - Vũng Tàu' },
      { id: 2, name: 'NovaWorld Phan Thiết', image: '/images/slide4.jpg', address: 'Phan Thiết, Bình Thuận' },
    ]
  };

  return (
    <div className="bookingweb-root">
      <section className="carousel-booking slider-hover-group">
        <img
          className="hero-image"
          src={carouselImages[page % carouselImages.length]}
          alt="Booking background"
        />
        <div className="hero-overlay">
          <div className="hero-text">
            <h1 className="hero-title">
              Find Nearby Attractions <span style={{ color: '#fff', minWidth: 90, display: 'inline-block' }}>{typing}</span>
            </h1>
            <p className="hero-description">
              Explore top-rated attractions, activities and more!
            </p>
            <button className="btn-primary" onClick={() => {
              const el = document.querySelector('.most-visited-places-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}>
              Browse Our Listings
            </button>
            <p className="category-label">Or browse featured categories:</p>
            <div className="category-buttons">
              <button className="category-btn">
                <i className="fas fa-utensils"></i> Restaurants
              </button>
              <button className="category-btn">
                <i className="fas fa-hotel"></i> Hotels
              </button>
              <button className="category-btn">
                <i className="fas fa-map-marked-alt"></i> Tourist
              </button>
            </div>
          </div>
        </div>
        <button
          className="slider-btn left custom-slider-btn slider-btn-hide-on-default"
          onClick={handlePrev}
          style={{ left: 24, top: '50%', transform: 'translateY(-50%)', position: 'absolute', zIndex: 5 }}
        >
          <span className="slider-chevron">&#8250;</span>
        </button>
        <button
          className="slider-btn right custom-slider-btn slider-btn-hide-on-default"
          onClick={handleNext}
          style={{ right: 24, top: '50%', transform: 'translateY(-50%)', position: 'absolute', zIndex: 5 }}
        >
          <span className="slider-chevron">&#8250;</span>
        </button>
      </section>
      {/* Đưa search-bar ra ngoài carousel-booking */}
      <div className="search-bar">
        <nav className="search-nav">
          <a className={activeTab === 'all' ? 'nav-link selected' : 'nav-link'} href="#" onClick={e => {e.preventDefault(); setActiveTab('all'); const el = document.querySelector('.card-container-wrapper'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>
            All
          </a>
          <a className={activeTab === 'restaurant' ? 'nav-link selected' : 'nav-link'} href="#" onClick={e => {e.preventDefault(); setActiveTab('restaurant'); const el = document.querySelector('.card-container-wrapper'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>
            Nhà hàng
          </a>
          <a className={activeTab === 'hotel' ? 'nav-link selected' : 'nav-link'} href="#" onClick={e => {e.preventDefault(); setActiveTab('hotel'); const el = document.querySelector('.card-container-wrapper'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>
            Khách sạn
          </a>
          <a className={activeTab === 'tourist' ? 'nav-link selected' : 'nav-link'} href="#" onClick={e => {e.preventDefault(); setActiveTab('tourist'); const el = document.querySelector('.card-container-wrapper'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>
            Du lịch
          </a>
        </nav>
        <form
          onSubmit={handleSearch}
          className="search-form search-form-equal"
        >
          <input
            type="text"
            placeholder="What are you looking for?"
            className="search-input"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <div className="location-input-wrapper location-dropdown-wrapper">
            <i className="fas fa-map-marker-alt location-icon"></i>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Select
                classNamePrefix="city-select"
                options={cityOptions}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="Location"
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: 56,
                    height: 56,
                    border: 'none',
                    boxShadow: 'none',
                    borderRadius: 0,
                    paddingLeft: 32,
                    background: '#fff',
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    paddingLeft: 8,
                  }),
                  input: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0,
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#888',
                    fontWeight: 500,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: '#222',
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </div>
          </div>
          <select
            className="category-select"
            value={activeTab}
            onChange={e => setActiveTab(e.target.value)}
            style={{ minWidth: 180 }}
          >
            <option value="restaurant">Restaurant</option>
            <option value="hotel">Hotel</option>
            <option value="tourist">Tourist</option>
          </select>
          <button className="btn-primary" type="submit">
            Search
          </button>
        </form>
      </div>
      {/* Popular Categories heading */}
      <div className="popular-categories-anchor" style={{ position: 'absolute', top: -120 }}></div>
      <div style={{ width: '100%', textAlign: 'center', margin: '60px 0 100px 0', zIndex: 2, position: 'relative', minHeight: 90 }}>
        <h2 style={{
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 700,
          fontSize: '1.7rem',
          color: '#222',
          letterSpacing: '0.5px',
          marginBottom: 12,
          background: '#fff',
          display: 'inline-block',
          padding: '0 36px',
          borderRadius: 12,
          boxShadow: '0 2px 12px #0001',
          lineHeight: 1.3
        }}>
          Popular Categories
        </h2>
        <div style={{ width: 100, height: 5, background: '#ee2a4a', margin: '0 auto', borderRadius: 3 }}></div>
      </div>
      {/* Đưa card-container-wrapper gần lại với tiêu đề Popular Categories */}
      <div className="card-container-wrapper" style={{ marginTop: '-90px', marginBottom: 0 }}>
        <div
          className="card-container-carousel"
          style={{ 
            transform: `translateX(-${page * 298}px)`,
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            transition: 'transform 0.5s',
            minHeight: 210
          }}
        >
          {(activeTab === 'all'
            ? [...(popularCategories.restaurant || []), ...(popularCategories.hotel || []), ...(popularCategories.tourist || [])]
            : (popularCategories[activeTab] || [])
          ).slice(page * pageSize, page * pageSize + pageSize).map((item, idx) => (
            <div
              key={item.id || idx}
              className="card carousel-card"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(item.id)}
            >
              <img
                src={item.image}
                alt={item.name || 'Category'}
              />
              <div className="carousel-card-overlay"></div>
              <div className="carousel-card-title">{item.name}</div>
              <div className="carousel-card-listings">1 listings</div>
              <button className="carousel-card-browse-btn"
                onClick={e => { e.stopPropagation(); handleCardClick(item.id); }}
                style={{ cursor: 'pointer' }}
              >
                Browse
              </button>
            </div>
          ))}
        </div>
        {/* Pagination dots chỉ là các chấm tròn */}
        <div className="pagination-dots-only" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 24, marginBottom: 8 }}>
          <div style={{ background: '#fafafa', borderRadius: 32, padding: '4px 14px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px #0001' }}>
            <button
              className="pagination-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous category"
              type="button"
              disabled={page === 0}
              style={{ 
                background: 'none', 
                border: 'none', 
                borderRadius: '50%', 
                width: 22, 
                height: 22, 
                cursor: page === 0 ? 'not-allowed' : 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginRight: 6, 
                color: page === 0 ? '#eee' : '#bbb', 
                fontSize: 15, 
                transition: 'color 0.2s',
                opacity: page === 0 ? 0.5 : 1
              }}
            >
              <span>&lt;</span>
            </button>
            {((activeTab === 'all'
              ? [...(popularCategories.restaurant || []), ...(popularCategories.hotel || []), ...(popularCategories.tourist || [])]
              : (popularCategories[activeTab] || [])
            ).length / pageSize > 1 ?
              Array.from({ length: Math.ceil((activeTab === 'all'
                ? [...(popularCategories.restaurant || []), ...(popularCategories.hotel || []), ...(popularCategories.tourist || [])]
                : (popularCategories[activeTab] || [])
              ).length / pageSize) }, (_, idx) => idx)
              : filteredList.map((_, idx) => idx)
            ).map((idx) => (
              <span
                key={idx}
                className={page === idx ? 'pagination-dot-bar active' : 'pagination-dot-bar'}
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: page === idx ? '#bbb' : '#e5e5e5',
                  margin: '0 3px',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                  boxShadow: page === idx ? '0 1px 4px #bbb3' : 'none',
                  border: 'none'
                }}
                onClick={e => { e.preventDefault(); e.stopPropagation(); handleSetPage(idx); const wrapper = document.querySelector('.card-container-wrapper'); if(wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                aria-label={`Page ${idx + 1}`}
                role="button"
                tabIndex={0}
                onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); handleSetPage(idx); const wrapper = document.querySelector('.card-container-wrapper'); if(wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }}
              />
            ))}
            <button
              className="pagination-arrow-btn"
              onClick={e => { e.preventDefault(); e.stopPropagation();
                const totalPages = Math.ceil((activeTab === 'all'
                  ? [...(popularCategories.restaurant || []), ...(popularCategories.hotel || []), ...(popularCategories.tourist || [])]
                  : (popularCategories[activeTab] || [])
                ).length / pageSize);
                if (page === totalPages - 1) {
                  handleSetPage(0);
                } else {
                  handleNext();
                }
                const wrapper = document.querySelector('.card-container-wrapper');
                if(wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              aria-label="Next category"
              type="button"
              style={{ background: 'none', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 6, color: '#bbb', fontSize: 15, transition: 'color 0.2s' }}
            >
              <span>&gt;</span>
            </button>
          </div>
        </div>
      </div>
      {/* Đường gạch dài nằm giữa pagination và Most Visited Places */}
      <div style={{ width: '100%', height: 2, background: '#e0e0e0', margin: '32px 0 0 0' }}></div>
      {/* Most Visited Places - Card Section chuyển slide */}
      <section className="most-visited-places-section" style={{ margin: '60px 0 0 0', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 12, position: 'relative' }}>
          {/* Đường gạch dài ngang */}

          <h2 style={{
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            fontSize: '1.7rem',
            color: '#222',
            letterSpacing: '0.5px',
            marginBottom: 8,
            position: 'relative',
            zIndex: 1,
            background: '#fff',
            display: 'inline-block',
            padding: '0 36px',
            borderRadius: 12,
            boxShadow: '0 2px 12px #0001',
            lineHeight: 1.3
          }}>
            Most Visited Places
          </h2>
          <div style={{ width: 60, height: 3, background: '#ee2a4a', margin: '0 auto 10px auto', borderRadius: 2, position: 'relative', zIndex: 1 }}></div>
          <p style={{ color: '#888', fontSize: 16, fontWeight: 500, margin: 0, position: 'relative', zIndex: 1 }}>Top-Rated Local Businesses</p>
        </div>
        <div
          className={`most-visited-slide-wrapper` + (mostVisitedDirection ? ' slide-' + mostVisitedDirection : '')}
          style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24, flexWrap: 'wrap', minHeight: 210, position: 'relative', transition: 'transform 0.5s' }}
          onAnimationEnd={() => setMostVisitedDirection(null)}
        >
          {mostVisitedSlides[mostVisitedSlide].map((card, idx) => (
            <div className="card" key={idx} style={{ width: 300, height: 210, position: 'relative', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 12px #0001', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 0 }}>
              <img
                src={card.img}
                alt={card.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, borderRadius: 0 }}
              />
              {/* Overlay content */}
              <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6, zIndex: 2 }}>
                {card.badges && card.badges.map((b, i) => (
                  <span key={i} style={{ background: b.bg, color: b.color, fontWeight: 600, fontSize: 11, borderRadius: 16, padding: '2px 8px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px #0001' }}>
                    {b.icon === 'star' && <i className="fas fa-star" style={{ marginRight: 4, fontSize: 12 }}></i>}
                    {b.icon === 'tag' && <i className="fas fa-tag" style={{ marginRight: 4, fontSize: 12 }}></i>}
                    {b.text}
                  </span>
                ))}
              </div>
              {card.topRight && (
                <div style={{ position: 'absolute', top: 10, right: 0, background: card.topRight.bg, color: card.topRight.color, fontWeight: 600, fontSize: 11, borderRadius: '0 0 0 8px', padding: '4px 14px', minWidth: 70, textAlign: 'center', zIndex: 2 }}>{card.topRight.text}</div>
              )}
              <div style={{ position: 'absolute', bottom: 12, left: 14, display: 'flex', gap: 6, alignItems: 'center', zIndex: 2 }}>
                {card.bottomBadges && card.bottomBadges.map((b, i) => (
                  <span key={i} style={{ background: b.bg, color: b.color, fontWeight: b.fontWeight, borderRadius: 6, padding: '2px 10px', fontSize: 12 }}>{b.text}</span>
                ))}
              </div>
              {/* Title and address: chỉnh lại cho đẹp, rõ nét, có nền mờ nhẹ */}
              <div style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                background: 'linear-gradient(90deg, rgba(30,30,30,0.82) 80%, rgba(30,30,30,0.5) 100%)',
                padding: '18px 18px 14px 18px',
                zIndex: 3,
                textAlign: 'left',
                maxWidth: '100%',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                <h3 style={{
                  margin: 0,
                  fontWeight: 800,
                  fontSize: 22,
                  lineHeight: 1.2,
                  color: '#fff',
                  textShadow: '0 2px 8px #000a',
                  letterSpacing: 0.2
                }}>{card.title}</h3>
                <p style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#fff',
                  textShadow: '0 1px 4px #000a',
                  opacity: 0.92
                }}>{card.address}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination dots giống hình: chỉ các chấm tròn, không mũi tên, không ký tự lạ */}
        <div className="pagination-buttons-custom">
          <button
            className="pagination-arrow-btn"
            onClick={handleMostVisitedPrev}
            aria-label="Previous slide"
            type="button"
            style={{ background: 'none', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8, color: '#bbb', fontSize: 20, transition: 'color 0.2s' }}
          >
            <span style={{ display: 'inline-block', fontSize: 22, fontWeight: 700, lineHeight: 1, fontFamily: 'Arial', color: '#bbb' }}>&lsaquo;</span>
          </button>
          <div className="pagination-dots-bar" style={{ display: 'flex', alignItems: 'center' }}>
            {mostVisitedSlides.map((_, idx) => (
              <span
                key={idx}
                className={mostVisitedSlide === idx ? 'pagination-dot-bar active' : 'pagination-dot-bar'}
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: mostVisitedSlide === idx ? '#bbb' : '#e5e5e5',
                  margin: '0 3px',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                  boxShadow: mostVisitedSlide === idx ? '0 1px 4px #bbb3' : 'none',
                  border: 'none'
                }}
                onClick={() => setMostVisitedSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                role="button"
                tabIndex={0}
                onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && setMostVisitedSlide(idx)}
              />
            ))}
          </div>
          <button
            className="pagination-arrow-btn"
            onClick={handleMostVisitedNext}
            aria-label="Next slide"
            type="button"
            style={{ background: 'none', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 8, color: '#bbb', fontSize: 20, transition: 'color 0.2s' }}
          >
            <span style={{ display: 'inline-block', fontSize: 22, fontWeight: 700, lineHeight: 1, fontFamily: 'Arial', color: '#bbb' }}>&rsaquo;</span>
          </button>
        </div>
      </section>
      {/* Testimonial Section - What our users say (carousel) */}
      <section className="testimonial-section">
        <h2>What our users say</h2>
        <div className="testimonial-list">
          {/* Left testimonial */}
          <div className="testimonial-item">
            <span className="testimonial-quote-icon">“</span>
            <div className="testimonial-quote">{testimonials[leftIdx].text}</div>
            <img className="testimonial-avatar" src={testimonials[leftIdx].img} alt={testimonials[leftIdx].name} />
            <div className="testimonial-name">{testimonials[leftIdx].name}</div>
            <div className="testimonial-role">{testimonials[leftIdx].title}</div>
          </div>
          {/* Center testimonial (active) */}
          <div className="testimonial-item active">
            <span className="testimonial-quote-icon">“</span>
            <div className="testimonial-quote">{testimonials[centerIdx].text}</div>
            <img className="testimonial-avatar" src={testimonials[centerIdx].img} alt={testimonials[centerIdx].name} />
            <div className="testimonial-name">{testimonials[centerIdx].name}</div>
            <div className="testimonial-role">{testimonials[centerIdx].title}</div>
          </div>
          {/* Right testimonial */}
          <div className="testimonial-item">
            <span className="testimonial-quote-icon">“</span>
            <div className="testimonial-quote">{testimonials[rightIdx].text}</div>
            <img className="testimonial-avatar" src={testimonials[rightIdx].img} alt={testimonials[rightIdx].name} />
            <div className="testimonial-name">{testimonials[rightIdx].name}</div>
            <div className="testimonial-role">{testimonials[rightIdx].title}</div>
          </div>
        </div>
        <div className="testimonial-pagination">
          <button className="testimonial-arrow-btn" onClick={handleTestimonialPrev} aria-label="Previous">
            <span style={{ fontSize: 22, fontWeight: 700, color: '#bdbdbd', lineHeight: 1 }}>&lsaquo;</span>
          </button>
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={
                'testimonial-dot' + (idx === testimonialIndex ? ' active' : '')
              }
              onClick={() => setTestimonialIndex(idx)}
            />
          ))}
          <button className="testimonial-arrow-btn" onClick={handleTestimonialNext} aria-label="Next">
            <span style={{ fontSize: 22, fontWeight: 700, color: '#bdbdbd', lineHeight: 1 }}>&rsaquo;</span>
          </button>
        </div>
      </section>
      {/* Hero Section - Streamline Your Business */}
      <section className="hero-section" style={{ position: 'relative', width: '100%', height: 400, overflow: 'hidden' }}>
        <img
          src="/images/mainmeal5.jpg"
          alt="Restaurant interior with tables and chairs"
          className="hero-image"
          width="1920"
          height="400"
          style={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            willChange: 'transform',
            transform: `translateY(${heroOffset}px)`,
            transition: 'transform 0.2s cubic-bezier(.4,1.2,.6,1)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        <div className="hero-content-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: '4%',
          zIndex: 2,
        }}>
          <h1 style={{
            color: '#fff',
            fontSize: 36, // giảm font size
            fontWeight: 700,
            marginBottom: 12, // giảm margin
            textShadow: '0 2px 16px #0007',
            lineHeight: 1.1
          }}>
            Streamline Your Business
          </h1>
          <p style={{
            color: '#fff',
            fontSize: 16, // giảm font size
            maxWidth: 600, // giảm maxWidth
            marginBottom: 20, // giảm margin
            textShadow: '0 2px 12px #0007',
            lineHeight: 1.5
          }}>
            We’re full-service, local agents who know how to find people and home each together. We use online tools with unmatched search capability to make you smarter and faster.
          </p>
          <button
            style={{
              background: '#ee2a4a',
              color: '#fff',
              border: 'none',
              borderRadius: 20, // giảm border radius
              padding: '10px 28px', // giảm padding
              fontSize: 16, // giảm font size
              fontWeight: 700,
              boxShadow: '0 2px 12px #0002',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onClick={() => navigate("/booking/1")}
          >
            Book Now
          </button>
        </div>
      </section>
      {/* From The Blog Section */}
      <section className="blog-section">
        <h2>From The Blog</h2>
        <div className="divider"></div>
        <p className="subtitle">Latest News From The Blog</p>
        <div className="blog-grid">
          {/* Card 1 */}
          <article className="blog-card">
            <img src="https://storage.googleapis.com/a1aa/image/61c0a733-7272-4e74-214e-3e08b9642a54.jpg"
              alt="Woman with sunglasses smiling in sunlight with trees and buildings in background" />
            <div className="overlay">
              <span className="badge">Tips</span>
              <time dateTime="2024-02-01">February 1, 2024</time>
              <h3>Experience In The Spotlight</h3>
              <p>Nam nisi lacus, dignissim ac tristique ut, scelerisque eu massa. Vestibulum ligula nunc, rutrum in...</p>
            </div>
          </article>
          {/* Card 2 */}
          <article className="blog-card">
            <img src="https://storage.googleapis.com/a1aa/image/36578714-c112-4a15-894a-b4228322bdb8.jpg"
              alt="Cozy living room with plants and sofa near window with natural light" />
            <div className="overlay">
              <span className="badge">Room Design</span>
              <time dateTime="2024-01-22">January 22, 2024</time>
              <h3>7 Big Ideas For Small Places</h3>
              <p>Nam nisi lacus, dignissim ac tristique ut, scelerisque eu massa. Vestibulum ligula nunc, rutrum in...</p>
            </div>
          </article>
          {/* Card 3 */}
          <article className="blog-card">
            <img src="https://storage.googleapis.com/a1aa/image/05352976-bfc3-4a2a-37cb-3b7813f48cfb.jpg"
              alt="View of Paris cityscape with Eiffel Tower in background under cloudy sky" />
            <div className="overlay">
              <span className="badge">Tips</span>
              <time dateTime="2024-01-01">January 1, 2024</time>
              <h3>Top 20 Places to Stay in Europe</h3>
              <p>Dignissim ac tristique ut, scelerisque eu massa. Vestibulum ligula nunc, rutrum in malesuada vitae, tempus...</p>
            </div>
          </article>
        </div>
        <button className="view-blog-button" type="button">View Blog</button>
      </section>
      {/* Footer Section (HTML/CSS from user) */}
      <FooterBooking />
    </div>  
  );
}

export default BookingWeb;