import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, loadMore } from '../../store/campersSlice';
import Sidebar from '../../components/Sidebar/Sidebar';
import CamperCard from '../../components/CamperCard/CamperCard';
import Loader from '../../components/Loader/Loader';
import styles from './Catalog.module.css';

const Catalog = () => {
  const dispatch = useDispatch();
  const { campers, status, page, error } = useSelector((state) => state.campers);
  const [filteredCampers, setFilteredCampers] = useState([]);

  const [displayCount, setDisplayCount] = useState(4);

  useEffect(() => {
    dispatch(fetchCampers(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (campers.length > 0) {
      setFilteredCampers(campers);
    }
  }, [campers]);

  const handleSearch = (filters) => {
    const filtered = campers.filter((camper) => {
      const matchLocation = filters.location
        ? camper.location && camper.location.includes(filters.location)
        : true;

      const matchAC = filters.AC ? camper.AC === true : true;
      const matchAutomatic = filters.Automatic ? camper.transmission === 'automatic' : true;
      const matchKitchen = filters.Kitchen ? camper.kitchen === true : true;
      const matchTV = filters.TV ? camper.TV === true : true;
      const matchBathroom = filters.Bathroom ? camper.bathroom === true : true;

      const matchVehicleType = filters.vehicleType
        ? camper.form === filters.vehicleType
        : true;

      return (
        matchLocation &&
        matchAC &&
        matchAutomatic &&
        matchKitchen &&
        matchTV &&
        matchBathroom &&
        matchVehicleType
      );
    });

    setFilteredCampers(filtered);
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    dispatch(loadMore());
    setDisplayCount((prevCount) => prevCount + 4);
  };

  const renderContent = () => {
    if (status === 'loading') {
      return <Loader />;
    }

    if (status === 'failed') {
      return <div className={styles.errorMessage}>Error: {error || "An unknown error occurred."}</div>;
    }

    if (filteredCampers.length === 0) {
      return <div className={styles.noResults}>No campers found matching your criteria.</div>;
    }

    const visibleCampers = filteredCampers.slice(0, displayCount);

    return (
      <>
        {visibleCampers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
        {filteredCampers.length > displayCount && (
          <button onClick={handleLoadMore} className={styles.loadMoreButton}>
            Load more
          </button>
        )}
      </>
    );
  };

  return (
    <div className={styles.catalogContainer}>
      <Sidebar onSearch={handleSearch} />
      <div className={styles.camperList}>{renderContent()}</div>
    </div>
  );
};

export default Catalog;
