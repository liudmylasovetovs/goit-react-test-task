import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Camper.module.css';
import Loader from '../../components/Loader/Loader';
import Features from '../../components/Features/Features';
import Reviews from '../../components/Reviews/Reviews';
import BookingForm from '../../components/BookingForm/BookingForm';

const Camper = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('features'); // State for active tab

  useEffect(() => {
    const fetchCamper = async () => {
      if (!id) {
        console.error('Camper ID is undefined.');
        return;
      }
      try {
        const response = await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
        setCamper(response.data);
      } catch (error) {
        console.error('Error fetching camper data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!camper) {
    return <p>Camper not found.</p>;
  }

  return (
    <div className={styles.camperHeader}>
      <h1>{camper.name}</h1>
      <p>{camper.location}</p>
      <p>€{camper.price.toFixed(2).replace('.', ',')}</p>
      <div className={styles.gallery}>
        {camper.gallery && camper.gallery.length > 0 ? (
          camper.gallery.map((image, index) => (
            <img key={index} src={image.original} alt={`${camper.name} image ${index + 1}`} />
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
      <p>{camper.description}</p>

      {/* Tabs for Features and Reviews */}
      <div className={styles.tabs}>
        <button
          className={activeTab === 'features' ? styles.active : ''}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={activeTab === 'reviews' ? styles.active : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

{/* Render Features or Reviews based on active tab */}
{activeTab === 'features' ? (
  <div className={styles.features}>
    <Features camper={camper} />
  </div>
) : (
  <div className={styles.features}> {/* Change class to features for consistent alignment */}
    <h2>Reviews</h2>
    {camper.reviews && camper.reviews.length > 0 ? (
      camper.reviews.map((review, index) => (
        <Reviews
          key={index}
          reviewerName={review.reviewer_name}
          reviewerRating={review.reviewer_rating}
          comment={review.comment}
        />
      ))
    ) : (
      <p>No reviews available.</p>
    )}
  </div>
)}

      <BookingForm camperId={id} />
    </div>
  );
};

export default Camper;
