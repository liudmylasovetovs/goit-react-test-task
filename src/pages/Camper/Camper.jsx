import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Reviews from '../../components/Reviews/';
import BookingForm from '../../components/BookingForm/BookingForm';
import Loader from '../../components/Loader/Loader';
import Features from '../../components/Features/Features';
import styles from './Camper.module.css';

const Camper = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        const response = await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
        setCamper(response.data);
      } catch (error) {
        console.error('Error fetching camper data:', error);
      }
    };

    fetchCamper();
  }, [id]);

  if (!camper) {
    return <Loader />;
  }

  return (
    <div className={styles.camperHeader}>
      <h1>{camper.name}</h1>
      <p>{camper.location}</p>
      <p>€{camper.price.toFixed(2).replace('.', ',')}</p>
      <div className={styles.gallery}>
        {camper.images.map((image, index) => (
          <img key={index} src={image} alt={`${camper.name} image ${index + 1}`} />
        ))}
      </div>
      <p>{camper.description}</p>
      <div className={styles.tabs}>
        <button className={activeTab === 'features' ? styles.active : ''} onClick={() => setActiveTab('features')}>
          Features
        </button>
        <button className={activeTab === 'reviews' ? styles.active : ''} onClick={() => setActiveTab('reviews')}>
          Reviews
        </button>
      </div>
      {activeTab === 'features' && <Features features={camper} />}
      {activeTab === 'reviews' && (
        <div className={styles.reviews}>
          <h2>Reviews</h2>
          <Reviews camperId={id} />
        </div>
      )}
      <BookingForm camperId={id} />
    </div>
  );
};

export default Camper;
