import '../../styles/main.css';

function Header() {
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
      </div>
    </header>
  );
}

export default Header;
