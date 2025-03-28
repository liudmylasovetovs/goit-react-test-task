import styles from "./CamperCard.module.css";
import { NavLink } from "react-router-dom";
import {
  BsWind,
  BsCupHot,
  BsTv,
  BsDroplet,
  BsMap,
  BsStarFill,
  BsHeartFill,
  BsHeart,
} from "react-icons/bs";
import { BsDiagram3, BsFuelPump, BsBroadcastPin } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/favoritesSlice";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const isFavorite = favoriteIds.includes(camper.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(camper.id));
  };

  const features = [
    camper.transmission === "automatic" && {
      name: "Automatic",
      icon: <BsDiagram3 />,
    },
    camper.AC && { name: "AC", icon: <BsWind /> },
    camper.engine === "petrol" && { name: "Petrol", icon: <BsFuelPump /> },
    camper.kitchen && { name: "Kitchen", icon: <BsCupHot /> },
    camper.radio && { name: "Radio", icon: <BsBroadcastPin /> },
    camper.bathroom && { name: "Bathroom", icon: <BsDroplet /> },
    camper.TV && { name: "TV", icon: <BsTv /> },
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

      <div className={styles.favoriteIcon} onClick={handleToggleFavorite}>
        {isFavorite ? (
          <BsHeartFill className={styles.filledHeart} />
        ) : (
          <BsHeart className={styles.heart} />
        )}
      </div>

      <div className={styles.details}>
        <h3 className={styles.camperName}>{camper.name}</h3>

        <div className={styles.locationAndRating}>
          {camper.rating && (
            <div className={styles.rating}>
              <BsStarFill className={styles.starIcon} />
              <span className={styles.ratingValue}>
                {camper.rating.toFixed(1)}
              </span>
              <span className={styles.reviewCount}>
                ({camper.reviews.length} Reviews)
              </span>
            </div>
          )}
          <p className={styles.location}>
            <BsMap /> {camper.location}
          </p>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              {feature.icon}
              <span className={styles.featureName}>{feature.name}</span>
            </div>
          ))}
        </div>

        <NavLink to={`/catalog/${camper.id}`} className={styles.button}>
          Show more
        </NavLink>
      </div>

      <div className={styles.price}>
        €{camper.price.toFixed(2).replace(".", ",")}
      </div>
    </div>
  );
};

export default CamperCard;
