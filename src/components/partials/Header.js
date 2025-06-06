import '../../styles/restaurant/main.css';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import restaurantData from '../../json/restaurant.json';

function Header() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  let restaurantId = null;
  if (pathSegments.length > 2) {
    restaurantId = pathSegments[2];
  }

  // Find restaurant by id in restaurantData
  const restaurant = restaurantData.restaurants.find(
    (r) => String(r.id) === String(restaurantId)
  );

  // Use restaurant logo or fallback to default logo URL
  const logoSrc = restaurant && restaurant.logo
    ? restaurant.logo.startsWith('http') || restaurant.logo.startsWith('/')
      ? restaurant.logo
      : '/' + restaurant.logo
    : 'https://yoyobeer.com.vn/wp-content/uploads/2023/11/logo-1400x764.png';

  // Back button click handler
  const handleBackClick = () => {
    navigate('/');
  };

  // Language toggle function
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
  };

  return (
    <header className="header">
      <div className="header-container">
        <img className="logo" src={logoSrc} alt="Logo" />
        <nav className="nav">
          <a href={restaurantId ? `/restaurant/${restaurantId}` : '/restaurant'}>Home</a>
          <a href={restaurantId ? `/viewmenu/${restaurantId}` : '/viewmenu'}>Menu</a>
          <a href={restaurantId ? `/about/${restaurantId}` : '/about'}>About</a>
          <a href={restaurantId ? `/booking/${restaurantId}` : '/booking'}>Reservation</a>
          <a href={restaurantId ? `/galleryrestaurant/${restaurantId}` : '/galleryrestaurant'}>Gallery</a>
        </nav>
        <div
          title="Quay lại trang BookingWeb"
          style={{
            color: 'black',
            position: 'absolute',
            left: '32px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            cursor: 'pointer',
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
            border: 'none',
          }}
          onClick={handleBackClick}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#1ccfc9" strokeWidth="2"></rect>
            <polyline points="13,8 9,12 13,16" fill="none" stroke="#1ccfc9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;
