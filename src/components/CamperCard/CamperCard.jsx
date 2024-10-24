
import styles from './CamperCard.module.css';

const CamperCard = ({ camper }) => {
    return (
        <div className={styles.camperCard}>
            <img src={camper.image} alt={camper.name} />
            <div className={styles.camperInfo}>
                <h3>{camper.name}</h3>
                <p>{camper.description}</p>
                <p>{camper.location}</p>
                <div className={styles.camperFeatures}>
                    {camper.features.map((feature) => (
                        <span key={feature}>{feature}</span>
                    ))}
                </div>
                <button className={styles.showMoreButton}>Show more</button>
            </div>
            <div className={styles.camperPrice}>{camper.price}</div>
        </div>
    );
};

export default CamperCard;
