
import styles from './Reviews.module.css'; // Import your CSS module for styling

const Reviews = ({ reviewerName, reviewerRating, comment }) => {
  return (
    <div className={styles.review}>
      <h3>{reviewerName} (Rating: {reviewerRating})</h3>
      <p>{comment}</p>
    </div>
  );
};

export default Reviews;
