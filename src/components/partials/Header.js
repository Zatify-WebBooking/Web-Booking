import '../../styles/restaurant/main.css';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import restaurantData from '../../json/restaurant.json';

function Header() {
  const { i18n } = useTranslation();

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
        <button onClick={toggleLanguage} className="lang-btn" title="Change language">
          <img
            src={i18n.language === 'vi'
              ? 'https://i.pinimg.com/736x/3f/aa/0b/3faa0b3d7207fcb4f8bfc91dfa55d0be.jpg'
              : 'https://i.pinimg.com/736x/d4/db/01/d4db01fc4ca4b584563f32f75e032c2a.jpg'}
            alt={i18n.language === 'vi' ? 'English' : 'Tiếng Việt'}
            className="flag-icon"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
