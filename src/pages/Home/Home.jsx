// src\pages\Home\Home.jsx


import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <div className={styles.banner}>
      <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1 className={styles.hero1}>Campers of your dreams</h1>
          <h2 className={styles.hero2}>
            You can find everything you want in our catalog
          </h2>
          <Link to="/catalog">
            <button className={styles.heroButton}>View Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
