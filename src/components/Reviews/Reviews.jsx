import styles from './Reviews.module.css'; // Import your CSS module for styling
import { BsStarFill } from 'react-icons/bs';

const Reviews = ({ reviewerName, reviewerRating, comment }) => {
  return (
    <div className={styles.review}>
      <div className={styles.avatarContainer}>
        <span className={styles.avatar}>{reviewerName[0]}</span>
      </div>
      <div className={styles.reviewDetails}>
        <h3 className={styles.reviewerName}>{reviewerName}</h3>
        <div className={styles.rating}>
          {[...Array(5)].map((star, index) => (
            <BsStarFill key={index} className={index < reviewerRating ? styles.filledStar : styles.emptyStar} />
          ))}
        </div>
        <p className={styles.comment}>{comment}</p>
      </div>
    </div>
  );
};

export default Reviews;
