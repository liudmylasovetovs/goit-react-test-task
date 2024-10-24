// src\components\Header\Header.jsx
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'; // Імпорт CSS-файлу

const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        Travel
        <span className={styles.word2}>Truck</span>
      </NavLink>
      <nav className={styles.navlink}>
        <NavLink
          to="/"
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} // Використання isActive
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} // Використання isActive
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;