import styles from './Features.module.css';
import { BsGearFill, BsWind, BsFuelPump, BsCupHot, BsBroadcastPin } from 'react-icons/bs';

const Features = ({ camper }) => {
  const features = [
    camper.transmission === "automatic" && { name: "Automatic", icon: <BsGearFill /> },
    camper.AC && { name: "AC", icon: <BsWind /> },
    camper.engine === "petrol" && { name: "Petrol", icon: <BsFuelPump /> },
    camper.kitchen && { name: "Kitchen", icon: <BsCupHot /> },
    camper.radio && { name: "Radio", icon: <BsBroadcastPin /> },
  ].filter(Boolean);

  const vehicleDetails = [
    camper.form && { label: "Form", value: camper.form },
    camper.length && { label: "Length", value: `${camper.length} m` },
    camper.width && { label: "Width", value: `${camper.width} m` },
    camper.height && { label: "Height", value: `${camper.height} m` },
    camper.tank && { label: "Tank", value: `${camper.tank} l` },
    camper.consumption && { label: "Consumption", value: `${camper.consumption}/100km` },
  ].filter(Boolean);

  return (
    <div className={styles.featuresContainer}>
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.feature}>
            {feature.icon}
            <span>{feature.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.vehicleDetails}>
        <h3>Vehicle details</h3>
        <ul>
          {vehicleDetails.map((detail, index) => (
            <li key={index} className={styles.detailItem}>
              <span>{detail.label}</span>
              <span>{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Features;
