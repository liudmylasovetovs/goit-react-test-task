import { Link } from "react-router-dom";
import styles from "./Header.module.css"; // Імпорт CSS-файлу
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <div className={styles.container}>
        <h1 className={styles.hero1}>Campers of your dreams</h1>
        <h2 className={styles.hero2}>You can find everything you want in our catalog</h2>
        <Link to="/catalog" className={styles.link}>
          <button className={styles.bannerButton}>View Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
