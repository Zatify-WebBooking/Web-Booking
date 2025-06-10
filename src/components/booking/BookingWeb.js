import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import Select from "react-select";
import "../../styles/bookingweb/booking.css";
import FooterBooking from "../partials/FooterBooking";

function BookingWeb() {
  // All useState/useRef/useEffect hooks must be at the top, before any logic or return
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ restaurants: [], hotels: [] });
  const [loading, setLoading] = useState(true);
  const [vouchers, setVouchers] = useState([]); // Thêm state voucher
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const prevPageRef = useRef(page);
  const [searchText, setSearchText] = useState("");

  const [animatedWord, setAnimatedWord] = useState("Khách sạn");
  const animatedWords = ["Khách sạn", "Nhà hàng", "Du lịch"];
  const animatedIndex = useRef(0);
  const [typing, setTyping] = useState("");

  const carouselImages = [
    process.env.PUBLIC_URL + "/images/bookingweb/1.jpg",
    process.env.PUBLIC_URL + "/images/bookingweb/2.jpg",
    process.env.PUBLIC_URL + "/images/bookingweb/3.jpg",
    process.env.PUBLIC_URL + "/images/bookingweb/3.jpg",
    process.env.PUBLIC_URL + "/images/bookingweb/4.jpg",
    process.env.PUBLIC_URL + "/images/bookingweb/5.jpg",
    process.env.PUBLIC_URL + "/images/bookingweb/6.jpg",
   
  ];
  const navigate = useNavigate();
  const [search] = useOutletContext();
  const [showSearchResult, setShowSearchResult] = useState(false);

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

  // Popular Categories data cho từng loại (chỉ khai báo 1 lần, đặt sau khi có data)
  const popularCategories = {
    restaurant: data.restaurants,
    hotel: data.hotels,
    tourist: [
      { id: 1, name: 'NovaWorld Hồ Tràm', image: 'https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/432049262_837264268416766_6786007986029882576_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEhiNoebN1Hf-_aj3Ddy-hHPhluM-FOTF4-GW4z4U5MXreH4FpryeopZUamgQHv89-EW5JsxzqD02pWipJZYaOL&_nc_ohc=DE-VPKDghNIQ7kNvwGyv0As&_nc_oc=Adn-JBAOPy-luydx77AYi3sVtKzCJZQVAKnbCzncquHhEw6LFhq4b5cf-pl2UGGud_BnF-CBxiWJ-IUZbbGpKQCp&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=WocDojf6o-OY66srLke4Ew&oh=00_AfK_RlKpMO9Xxhdpf3uI4EUe1rYzfdkTeHDs6gjoYL5rOg&oe=68457044', address: 'Xuyên Mộc, Bà Rịa - Vũng Tàu' },
      { id: 2, name: 'NovaWorld Phan Thiết', image: 'https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/432664646_918739550258220_7309378048563958247_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHwuOGU7kDI_9553c-3q1OJBesAq_WanMYF6wCr9ZqcxoPiwMD_FQmkv_bncA0QCBkxvguYy10iqOkmDSlcdJ5b&_nc_ohc=3GAZkeTpEd4Q7kNvwGvbtNY&_nc_oc=Adni0QFW_p45ZhKqQsbHRKnRcX74uSujaM-08KwYF0Qvt0eeDtYJIZywdHCbY9VBnzFNo05YqP1LGfM2YBgM_Pzr&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=Le8PSoMosR_ebfvh6dGhRg&oh=00_AfJ0p-QWH7JEKAgRK60fpL5b-Mx1WG2aPrG7p5-ThuLNZQ&oe=68458EA3', address: 'Phan Thiết, Bình Thuận' },
    ]
  };

  // Lấy list theo tab, nếu là 'all' thì gộp cả 3 loại
  const list = activeTab === 'all'
    ? [
        ...(popularCategories.restaurant || []),
        ...(popularCategories.hotel || []),
        ...(popularCategories.tourist || [])
      ]
    : activeTab === 'restaurant'
    ? popularCategories.restaurant
    : activeTab === 'hotel'
    ? popularCategories.hotel
    : activeTab === 'tourist'
    ? popularCategories.tourist
    : [];
  const pageSize = 4;

  // Lọc theo tên hoặc địa chỉ (ưu tiên searchText nếu có)
  const filteredList = list.filter(item => {
    const keyword = (searchText || search || '').toLowerCase().trim();
    if (!keyword) return true;
    return (
      (item.name && item.name.toLowerCase().includes(keyword)) ||
      (item.address && item.address.toLowerCase().includes(keyword))
    );
  });

  // Tổng số trang dựa vào filteredList
  const totalPages = Math.ceil(filteredList.length / pageSize);

  // Khi bấm Browse trên từng card trong Popular Categories, chuyển đúng trang chi tiết
  const handleCardClick = (id) => {
    if (activeTab === 'restaurant') {
      navigate(`/restaurant/${id}`);
    } else if (activeTab === 'hotel') {
      navigate(`/hotel/${id}`);
    } else if (activeTab === 'all') {
      const isRestaurant = popularCategories.restaurant.some(item => item.id === id);
      const isHotel = popularCategories.hotel.some(item => item.id === id);
      if (isRestaurant) {
        navigate(`/restaurant/${id}`);
      } else if (isHotel) {
        navigate(`/hotel/${id}`);
      } else {
        navigate(`/tourist/${id}`);
      }
    } else if (activeTab === 'tourist') {
      navigate(`/tourist/${id}`);
    }
  };

  // Reset page về 0 khi đổi tab hoặc search
  useEffect(() => {
    setPage(0);
  }, [activeTab, search, searchText]);

  // --- Carousel slide infinite loop with smooth direction ---
  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setTimeout(() => {
      setSlideDirection('right');
      setPage(prev => (prev === totalPages - 1 ? 0 : prev + 1));
    }, 3000); // Tự động chuyển slide sau 3s
    return () => clearTimeout(timer);
  }, [page, totalPages]);

  const handlePrev = () => {
    setSlideDirection('left');
    setPage(prev => {
      if (totalPages === 0) return 0;
      return prev === 0 ? totalPages - 1 : prev - 1;
    });
  };
  // Detect direction when user click
  const handleSetPage = (idx) => {
    if (idx > page) setSlideDirection("right");
    else if (idx < page) setSlideDirection("left");
    setPage(idx);
  };

  // useEffect(() => {
  //   if (filteredList.length === 0) return;
  //   const timer = setTimeout(() => {
  //     setPage((prev) => (prev === filteredList.length - 1 ? 0 : prev + 1));
  //   }, 3000); // chuyển slide sau 3s
  //   return () => clearTimeout(timer);
  // }, [page, filteredList.length]);

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
        img: "https://product.hstatic.net/1000268128/product/405381975_122121706436051211_2192545811434395977_n_a9152707a20043f5b4e42994a38a3d5e_master.jpg",
        title: "Yoyo Central Hồ Con Rùa",
        badges: [],
        bottomBadges: []
      },
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk-VY6FaelSmAIprPnSLz7UNE8OlKqbl36vg&s",
        title: "Hotel Seava",
        badges: [],
        bottomBadges: []
      },
      {
        img: "https://cdn3.ivivu.com/2022/08/Cong-vien-bikini-beach-novaworld-phan-thiet-ivivu.jpeg",
        title: "NovaWorld Hồ Tràm",
        badges: [],
        bottomBadges: []
      }
    ],
    [
      {
        img: "https://www.propertyvietnam.com.vn/upload/images/349309233_773374067751872_6403154603336304582_n.jpeg",
        title: "Dragon Palace",
        badges: [],
        bottomBadges: []
      },
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0FucntH7O5fdsAvnbQGdtMnqmX_VWTHrYUr3YePL0BfNwfD5pARmvpaERxxSWXhdIeKg&usqp=CAU",
        title: "Hotel Minera",
        badges: [],
        bottomBadges: []
      },
      {
        img: "https://cdn3.ivivu.com/2022/08/Cong-vien-bikini-beach-novaworld-phan-thiet-ivivu.jpeg",
        title: "NovaWorld Phan Thiết",
        badges: [],
        bottomBadges: []
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
    }, 2000); // chuyển slide sau 2s
    return () => clearTimeout(timer);
  }, [mostVisitedSlide, mostVisitedSlides.length]);

  // Testimonial data (3 items, giống hình mẫu)
  const testimonials = [
    {
      text: 'Quá trình đặt chỗ diễn ra suôn sẻ và dịch vụ hỗ trợ khách hàng rất tuyệt vời. Tôi đã tìm được nhà hàng hoàn hảo cho bữa tối kỷ niệm của mình! Rất đáng để sử dụng và giới thiệu.',
      name: 'David Lee',
      title: 'Software Engineer',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      text: 'Nova World Phan Thiết có không gian rộng rãi, thoáng đãng, nhiều tiện ích vui chơi và giải trí đa dạng. Nhân viên thân thiện, phục vụ nhiệt tình. Một số phản hồi về việc cần cải thiện vệ sinh và tiện nghi trong phòng nghỉ. Tổng thể trải nghiệm tốt, phù hợp cho kỳ nghỉ gia đình hoặc nhóm bạn. Giá cả hợp lý với chất lượng dịch vụ.',
      name: 'Sophia Turner',
      title: 'Marketing Specialist',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      text: 'Trải nghiệm tuyệt vời từ đầu đến cuối. Các đánh giá giúp tôi chọn được địa điểm tốt nhất và việc xác nhận đặt chỗ diễn ra ngay lập tức. Đánh giá 5 sao!',
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

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đặt hook useRef và useEffect cho carousel hero ở đây, ngay sau các khai báo useState/useRef
  const carouselInterval = useRef(null);
  const [heroSlideDirection, setHeroSlideDirection] = useState(null);

  useEffect(() => {
    // Xóa interval cũ nếu có
    if (carouselInterval.current) clearInterval(carouselInterval.current);
    // Tự động chuyển ảnh mỗi 5 giây
    carouselInterval.current = setInterval(() => {
      setHeroSlideDirection('right');
      setCarouselIndex(prev => (prev + 1) % carouselImages.length);
    }, 3000);
    // Cleanup khi unmount
    return () => clearInterval(carouselInterval.current);
  }, [carouselImages.length]);

  // Hàm chuyển ảnh thủ công (nút trái/phải)
  const handleHeroPrev = () => {
    setHeroSlideDirection('left');
    setCarouselIndex(prev => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };
  const handleHeroNext = () => {
    setHeroSlideDirection('right');
    setCarouselIndex(prev => (prev + 1) % carouselImages.length);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0); // reset về trang đầu tiên khi search
    setShowSearchResult(true); // chỉ hiển thị kết quả khi bấm Search
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="bookingweb-root">
      <section className="carousel-booking slider-hover-group">
        <img
          className={`hero-image${heroSlideDirection ? ' slide-' + heroSlideDirection : ''}`}
          src={carouselImages[carouselIndex % carouselImages.length]}
          alt="Booking background"
          onAnimationEnd={() => setHeroSlideDirection(null)}
        />
        <div className="hero-overlay">
          <div className="hero-text">
            <h1 className="hero-title">
              Khám phá địa điểm gần bạn <span style={{ color: '#fff', minWidth: 90, display: 'inline-block' }}>{typing}</span>
            </h1>
            <p className="hero-description">
              Khám phá các địa điểm, hoạt động nổi bật và nhiều hơn nữa!
            </p>
            <button className="btn-primary" onClick={() => {
              const el = document.querySelector('.most-visited-places-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}>
              Xem danh sách nổi bật
            </button>
            <p className="category-label">Hoặc chọn danh mục nổi bật:</p>
            <div className="category-buttons">
              <button className="category-btn" onClick={() => {
                setActiveTab('restaurant');
                setTimeout(() => {
                  const el = document.querySelector('.card-container-wrapper');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
              }}>
                <i className="fas fa-utensils"></i> Nhà hàng
              </button>
              <button className="category-btn" onClick={() => {
                setActiveTab('hotel');
                setTimeout(() => {
                  const el = document.querySelector('.card-container-wrapper');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
              }}>
                <i className="fas fa-hotel"></i> Khách sạn
              </button>
              <button className="category-btn" onClick={() => {
                navigate('/tourist');
              }}>
                <i className="fas fa-map-marked-alt"></i> Du lịch
              </button>
            </div>
          </div>
        </div>
        <button
          className="carousel-button prev"
          onClick={handleHeroPrev}
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          className="carousel-button next"
          onClick={handleHeroNext}
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </section>
      {/* Đưa search-bar ra ngoài carousel-booking */}
      <div className="search-bar">
        <nav className="search-nav">
          <a className={activeTab === 'all' ? 'nav-link selected' : 'nav-link'} href="#" onClick={e => { e.preventDefault(); setActiveTab('all'); const el = document.querySelector('.card-container-wrapper'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
            Tất cả
          </a>
          <a className={activeTab === 'restaurant' ? 'nav-link selected' : 'nav-link'} href="#" onClick={e => { e.preventDefault(); setActiveTab('restaurant'); const el = document.querySelector('.card-container-wrapper'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
            Nhà hàng
          </a>
          <a className={activeTab === 'hotel' ? 'nav-link selected' : 'nav-link'} href="#" onClick={e => { e.preventDefault(); setActiveTab('hotel'); const el = document.querySelector('.card-container-wrapper'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
            Khách sạn
          </a>
          <a
            className={activeTab === 'tourist' ? 'nav-link selected' : 'nav-link'}
            href="/tourist"
            onClick={e => {
              e.preventDefault();
              navigate('/tourist');
            }}
            role="button"
            tabIndex={0}
          >
            Du lịch
          </a>
        </nav>
        <form
          onSubmit={handleSearch}
          className="search-form search-form-equal"
        >
          <input
            type="text"
            placeholder="Bạn muốn tìm gì?"
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
                placeholder="Khu vực..."
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
            <option value="restaurant">Nhà hàng</option>
            <option value="hotel">Khách sạn</option>
            <option value="tourist">Du lịch</option>
          </select>
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
          Danh mục nổi bật
        </h2>
        <div style={{ width: 100, height: 5, background: '#ee2a4a', margin: '0 auto', borderRadius: 3 }}></div>
      </div>
      {/* Đưa card-container-wrapper gần lại với tiêu đề Popular Categories */}
      <div className="card-container-wrapper" style={{ marginTop: '-90px', marginBottom: 0 }}>
        <div
          className="card-container-carousel"
          style={{ display: 'flex', justifyContent: 'center', gap: 24, transition: 'transform 0.5s cubic-bezier(.7, 0, .2, 1)', minHeight: 210 }}
        >
          {filteredList
            .slice(page * pageSize, page * pageSize + pageSize)
            .map((item, idx) => (
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
              </div>
            ))}
        </div>
        {/* Pagination chỉ hiện khi có nhiều hơn 1 trang */}
        {totalPages > 1 && (
          <div className="pagination-dots-only" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 24, marginBottom: 8 }}>
            <div style={{ background: '#fafafa', borderRadius: 32, padding: '4px 14px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px #0001' }}>
              <button
                className="pagination-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous category"
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  borderRadius: '50%',
                  width: 22,
                  height: 22,
                  cursor: totalPages <= 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 6,
                  color: totalPages <= 1 ? '#eee' : '#bbb',
                  fontSize: 15,
                  transition: 'color 0.2s',
                  opacity: totalPages <= 1 ? 0.5 : 1
                }}
                disabled={totalPages <= 1}
              >
                <span>&lt;</span>
              </button>
              {Array.from({ length: totalPages }, (_, idx) => idx).map((idx) => (
                <span
                  key={idx}
                  className={page === idx ? 'pagination-dot-bar active' : 'pagination-dot-bar'}
                  style={{
                    display: 'inline-block',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: page === idx ? '#bbb' : '#e5e5e5',
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                    boxShadow: page === idx ? '0 1px 4px #bbb3' : 'none',
                    border: 'none',
                    margin: '0 3px'
                  }}
                  onClick={e => { e.preventDefault(); e.stopPropagation(); handleSetPage(idx); const wrapper = document.querySelector('.card-container-wrapper'); if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                  aria-label={`Page ${idx + 1}`}
                  role="button"
                  tabIndex={0}
                  onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); handleSetPage(idx); const wrapper = document.querySelector('.card-container-wrapper'); if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }}
                />
              ))}
              <button
                className="pagination-arrow-btn"
                onClick={e => {
                  e.preventDefault(); e.stopPropagation();
                  if (page === totalPages - 1) {
                    handleSetPage(0);
                  } else {
                    handleSetPage(page + 1);
                  }
                  const wrapper = document.querySelector('.card-container-wrapper');
                  if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                aria-label="Next category"
                type="button"
                style={{ background: 'none', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 6, color: '#bbb', fontSize: 15, transition: 'color 0.2s' }}
                disabled={totalPages <= 1}
              >
                <span>&gt;</span>
              </button>
            </div>
          </div>
        )}
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
            Địa điểm được ghé thăm nhiều nhất
          </h2>
          <div style={{ width: 60, height: 3, background: '#ee2a4a', margin: '0 auto 10px auto', borderRadius: 2, position: 'relative', zIndex: 1 }}></div>
          <p style={{ color: '#888', fontSize: 16, fontWeight: 500, margin: 0, position: 'relative', zIndex: 1 }}>Doanh nghiệp địa phương nổi bật</p>
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
                background: 'linear-gradient(90deg, rgba(30,30,30,0.68) 80%, rgba(30,30,30,0.38) 100%)',
                padding: '12px 16px 10px 16px',
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
                  fontWeight: 700,
                  fontSize: 20,
                  lineHeight: 1,
                  color: 'rgba(255,255,255,0.92)',
                  textShadow: '0 2px 8px #0007',
                  letterSpacing: 0.1
                }}>{card.title}</h3>
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
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                  boxShadow: mostVisitedSlide === idx ? '0 1px 4px #bbb3' : 'none',
                  border: 'none',
                  margin: '0 3px'
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
      <section className="testimonial-section">
        <h2>Khách hàng nói gì về chúng tôi</h2>
        <div className="testimonial-list">
          <div className="testimonial-item">
            <span className="testimonial-quote-icon">“</span>
            <div className="testimonial-quote">{testimonials[leftIdx].text}</div>
            <img className="testimonial-avatar" src={testimonials[leftIdx].img} alt={testimonials[leftIdx].name} />
            <div className="testimonial-name">{testimonials[leftIdx].name}</div>
            <div className="testimonial-role">{testimonials[leftIdx].title}</div>
          </div>
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
      <section className="hero-section" style={{ position: 'relative', width: '100%', height: 400, overflow: 'hidden', marginBottom: 48 }}>
        <img
          src="https://thegioiclub.com/Uploads/files/8up/nhahanggarden5-22.jpg"
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
          paddingBottom: 56, // Thêm padding dưới để tránh dính vào footer
        }}>
          <h1 style={{
            color: '#fff',
            fontSize: 36, // giảm font size
            fontWeight: 700,
            marginBottom: 12, // giảm margin
            textShadow: '0 2px 16px #0007',
            lineHeight: 1.1
          }}>
            Bạn muốn trải nghiệm tốt nhất?
          </h1>
          <p style={{
            color: '#fff',
            fontSize: 16, // giảm font size
            maxWidth: 600, // giảm maxWidth
            marginBottom: 20, // giảm margin
            textShadow: '0 2px 12px #0007',
            lineHeight: 1.5
          }}>
            Đừng ngần ngại hãy liên hệ ngay để có một trải nghiệm ưng ý nhất
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
      {/* Footer Section (HTML/CSS from user) */}
      <FooterBooking />
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 9999,
            background: '#222',
            color: '#fff',
            border: 'none',
            width: 48,
            height: 48,
            boxShadow: '0 2px 12px #0003',
            cursor: 'pointer',
            fontSize: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          aria-label="Lên đầu trang"
        >
          <i className="fas fa-arrow-up" />
        </button>
      )}
    </div>
  );
}

export default BookingWeb;