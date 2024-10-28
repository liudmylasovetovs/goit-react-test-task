import styles from "./Reviews.module.css";
import { BsStarFill } from "react-icons/bs";

const Reviews = ({ reviewerName, reviewerRating, comment }) => {
  return (
    <div className={styles.review}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <span className={styles.avatar}>{reviewerName[0]}</span>
        </div>
        <div className={styles.info}>
          <h3 className={styles.reviewerName}>{reviewerName}</h3>
          <div className={styles.rating}>
            {[...Array(5)].map((star, index) => (
              <BsStarFill
                key={index}
                className={
                  index < reviewerRating ? styles.filledStar : styles.emptyStar
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.commentContainer}>
        <p className={styles.comment}>{comment}</p>
      </div>
    </div>
  );
};

export default Reviews;
