import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Camper.module.css";
import Loader from "../../components/Loader/Loader";
import Features from "../../components/Features/Features";
import Reviews from "../../components/Reviews/Reviews";
import BookingForm from "../../components/BookingForm/BookingForm";
import { BsStarFill, BsMap } from "react-icons/bs";

const Camper = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    const fetchCamper = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
        );
        console.log("Fetched camper:", response.data);
        setCamper(response.data);
      } catch (error) {
        console.error("Error fetching camper data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [id]);

  if (loading) return <Loader />;
  if (!camper) return <p>Camper not found or error loading data.</p>;

  return (
    <div className={styles.camperContainer}>
      <div className={styles.header}>
        <h1 className={styles.camperName}>{camper.name}</h1>
        <div className={styles.camperDetails}>
          <span className={styles.reviews}>
            <BsStarFill className={styles.star} />
            {camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={styles.location}>
            <BsMap />
            {camper.location}
          </span>
        </div>
        <p className={styles.price}>
          €{camper.price?.toFixed(2).replace(".", ",")}
        </p>
      </div>

      <div className={styles.gallery}>
        {Array.isArray(camper.gallery) && camper.gallery.length > 0 ? (
          camper.gallery.map((image, index) =>
            image?.original ? (
              <img
                key={index}
                src={image.original}
                alt={`${camper.name} image ${index + 1}`}
                className={styles.image}
              />
            ) : null
          )
        ) : (
          <p>No images available.</p>
        )}
      </div>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "features" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "reviews" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>


      <svg className={styles.svgLine}>
        <use href="../../assets/divider.svg" />
      </svg>

      <div className={styles.featuresAndBooking}>
        {activeTab === "features" ? (
          <div className={styles.features}>
            <Features camper={camper} />
          </div>
        ) : (
          <div className={styles.features}>
            {Array.isArray(camper.reviews) && camper.reviews.length > 0 ? (
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
    </div>
  );
};

export default Camper;
