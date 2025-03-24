import { useOutletContext } from "react-router-dom";
import styles from "./Reviews.module.css";
import { BsStarFill } from "react-icons/bs";

const Reviews = () => {
  const { camper } = useOutletContext();

  if (!camper.reviews || camper.reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div>
      {camper.reviews.map((review, index) => (
        <div key={index} className={styles.review}>
          <div className={styles.header}>
            <div className={styles.avatarContainer}>
              <span className={styles.avatar}>{review.reviewer_name[0]}</span>
            </div>
            <div className={styles.info}>
              <h3 className={styles.reviewerName}>{review.reviewer_name}</h3>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <BsStarFill
                    key={i}
                    className={
                      i < review.reviewer_rating
                        ? styles.filledStar
                        : styles.emptyStar
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.commentContainer}>
            <p className={styles.comment}>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
