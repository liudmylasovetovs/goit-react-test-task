// src/components/Features/Features.jsx

import styles from './Features.module.css';

const Features = ({ camper }) => {
  const features = [
    `🛠 Transmission: ${camper.transmission}`,
    `🛢 Fuel: ${camper.engine}`,
    `❄️ AC: ${camper.AC ? 'Yes' : 'No'}`,
    `🚽 Bathroom: ${camper.bathroom ? 'Yes' : 'No'}`,
    `🍽 Kitchen: ${camper.kitchen ? 'Yes' : 'No'}`,
    `📺 TV: ${camper.TV ? 'Yes' : 'No'}`,
  ];

  return (
    <div className={styles.features}>
      <h2>Features</h2>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default Features;
