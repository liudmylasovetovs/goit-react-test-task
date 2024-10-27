// src/components/CamperCard/CamperCard.jsx
import styles from "./CamperCard.module.css";
import { NavLink } from "react-router-dom";
const CamperCard = ({ camper }) => {
  // Make sure to define features based on your camper object structure
  const features = [
    `🛠 Transmission: ${camper.transmission}`,
    `🛢 Fuel: ${camper.engine}`,
    `❄️ AC: ${camper.AC ? "Yes" : "No"}`,
    `🚽 Bathroom: ${camper.bathroom ? "Yes" : "No"}`,
    `🍽 Kitchen: ${camper.kitchen ? "Yes" : "No"}`,
    `📺 TV: ${camper.TV ? "Yes" : "No"}`,
  ];

  return (
    <div className={styles.camperCard}>
      {camper.gallery && camper.gallery.length > 0 && (
        <img
          src={camper.gallery[0].thumb} // Use thumbnail for a smaller image
          alt={camper.name}
          className={styles.image}
        />
      )}
      <div className={styles.details}>
        <h3>{camper.name}</h3>
        <p>{camper.location}</p>
        <p>€{camper.price}</p>
        <div className={styles.features}>
          {features.map((feature, index) => (
            <span key={index} className={styles.feature}>
              {feature}
            </span>
          ))}
        </div>
        <NavLink to={`/catalog/${camper.id}`} className={styles.button}>
          Show more
        </NavLink>
      </div>
    </div>
  );
};

export default CamperCard;
