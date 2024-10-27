import styles from "./CamperCard.module.css";
import { NavLink } from "react-router-dom";
import { BsWind, BsCupHot, BsTv, BsDroplet, BsMap } from "react-icons/bs";
import { BsGearFill, BsFuelPump, BsBroadcastPin } from 'react-icons/bs';

const CamperCard = ({ camper }) => {
  const features = [
    camper.transmission === "automatic" && { name: "Automatic", icon: <BsGearFill /> },
    camper.AC && { name: "AC", icon: <BsWind /> },
    camper.engine === "petrol" && { name: "Petrol", icon: <BsFuelPump /> },
    camper.kitchen && { name: "Kitchen", icon: <BsCupHot /> },
    camper.radio && { name: "Radio", icon: <BsBroadcastPin /> },
    camper.bathroom && { name: "Bathroom", icon: <BsDroplet /> },
    camper.TV && { name: "TV", icon: <BsTv /> }
  ].filter(Boolean);

  return (
    <div className={styles.camperCard}>
      {camper.gallery && camper.gallery.length > 0 && (
        <img
          src={camper.gallery[0].thumb}
          alt={camper.name}
          className={styles.image}
        />
      )}
      <div className={styles.details}>
        <h3>{camper.name}</h3>
        <p><BsMap /> {camper.location}</p>
        <p>€{camper.price}</p>
        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              {feature.icon}
              <span>{feature.name}</span>
            </div>
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
