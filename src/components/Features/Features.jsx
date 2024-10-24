import styles from './Features.module.css';
import { FaCar, FaSnowflake, FaGasPump, FaUtensils, FaRadio } from 'react-icons/fa';

const Features = () => (
  <div className={styles.features}>
    <div className={styles.featureItem}>
      <FaCar className={styles.icon} />
      <span>Automatic</span>
    </div>
    <div className={styles.featureItem}>
      <FaSnowflake className={styles.icon} />
      <span>AC</span>
    </div>
    <div className={styles.featureItem}>
      <FaGasPump className={styles.icon} />
      <span>Petrol</span>
    </div>
    <div className={styles.featureItem}>
      <FaUtensils className={styles.icon} />
      <span>Kitchen</span>
    </div>
    <div className={styles.featureItem}>
      <FaRadio className={styles.icon} />
      <span>Radio</span>
    </div>
  </div>
);

export default Features;

