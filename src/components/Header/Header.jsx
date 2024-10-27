// src\components\Header\Header.jsx
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css'; // Імпорт CSS-файлу
import logo from '../../assets/logo.svg'; // Імпорт картинки
import clsx from 'clsx';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/" >
        <img src={logo} alt="logo" />
      </Link>
      <nav className={styles.navlink}>
        <NavLink
          to="/"
          className={({ isActive }) => clsx(styles.link, isActive && styles.active)} // Використання isActive
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => clsx(styles.link, isActive && styles.active)} // Використання isActive
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;