import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, setFilters, loadMore } from '../../store/campersSlice.js';
import CamperCard from '../../components/CamperCard/CamperCard';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import styles from './Catalog.module.css';

const Catalog = () => {
  const dispatch = useDispatch();
  const { campers, status, error, page } = useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(fetchCampers(page));
  }, [dispatch, page]);

  const handleLoadMore = () => {
    dispatch(loadMore());
    dispatch(fetchCampers(page + 1)); // Завантажуємо нову сторінку
  };

  const handleFilterChange = (filters) => {
    dispatch(setFilters(filters));
  };

  return (
    <div className={styles.catalog}>
      <Header />
      <div className={styles.content}>
        <FilterSidebar onFilter={handleFilterChange} />
        <div className={styles.camperList}>
          {status === 'loading' ? (
            <Loader />
          ) : status === 'failed' ? (
            <div>Error: {error}</div>
          ) : (
            <>
              {campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
              <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                Load More
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
