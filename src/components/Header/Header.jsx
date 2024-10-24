import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'; // Імпорт CSS-файлу

const Header = () => {
  return (
    <header>
      <NavLink to="/" className="logo">
        <span className={styles.word1}>Travel</span>
        <span className={styles.word2}>Truck</span>
      </NavLink>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')} // Використання isActive
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? 'active' : '')} // Використання isActive
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;