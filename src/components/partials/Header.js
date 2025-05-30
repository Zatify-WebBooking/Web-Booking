import '../../styles/restaurant/main.css';
import { useTranslation } from 'react-i18next'; // Thêm dòng này

function Header() {
  const { i18n } = useTranslation(); // Thêm dòng này

  // Hàm đổi ngôn ngữ
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Savory</h1>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#reservation">Reservation</a>
          <a href="#contact">Contact</a>
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