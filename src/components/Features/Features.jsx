// src\components\Features\Features.jsx
// import styles from './Features.module.css';
// import { FaCar, FaSnowflake, FaGasPump, FaUtensils, FaMusic } from 'react-icons/fa';

// const Features = () => (
//   <div className={styles.features}>
//     <div className={styles.featureItem}>
//       <FaCar className={styles.icon} />
//       <span>Automatic</span>
//     </div>
//     <div className={styles.featureItem}>
//       <FaSnowflake className={styles.icon} />
//       <span>AC</span>
//     </div>
//     <div className={styles.featureItem}>
//       <FaGasPump className={styles.icon} />
//       <span>Petrol</span>
//     </div>
//     <div className={styles.featureItem}>
//       <FaUtensils className={styles.icon} />
//       <span>Kitchen</span>
//     </div>
//     <div className={styles.featureItem}>
//       <FaMusic className={styles.icon} />
//       <span>Radio</span>
//     </div>
//   </div>
// );

// export default Features;
import styles from './Features.module.css';
import { FaCar, FaSnowflake, FaGasPump, FaUtensils, FaMusic } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Features = ({ features }) => (
  <div className={styles.features}>
    {features.map((feature, index) => {
      let Icon;

      // Визначаємо іконку відповідно до фічі
      switch (feature) {
        case 'Automatic':
          Icon = FaCar;
          break;
        case 'AC':
          Icon = FaSnowflake;
          break;
        case 'Petrol':
          Icon = FaGasPump;
          break;
        case 'Kitchen':
          Icon = FaUtensils;
          break;
        case 'Radio':
          Icon = FaMusic;
          break;
        default:
          Icon = null;
      }

      return (
        <div key={index} className={styles.featureItem}>
          {Icon && <Icon className={styles.icon} />}
          <span>{feature}</span>
        </div>
      );
    })}
  </div>
);

// Визначаємо типи пропсів
Features.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Features;


