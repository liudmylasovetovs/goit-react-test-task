// src\components\Reviews\Reviews.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Reviews = ({ camperId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Replace with actual API call to fetch reviews for the camper
        const response = await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${camperId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [camperId]);

  return (
    <StyledReviews>
      {reviews.map(review => (
        <div key={review.id} className="review">
          <p><strong>{review.author}</strong></p>
          <p>Rating: {review.rating}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </StyledReviews>
  );
};

const StyledReviews = styled.div`
  .review {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
  }
`;

export default Reviews;
