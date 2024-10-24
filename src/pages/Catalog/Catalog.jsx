import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, setFilters, loadMore } from '../store/campersSlice';
import CamperCard from '../components/CamperCard';
import FilterSidebar from '../components/FilterSidebar';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import styles from './CatalogPage.module.css';

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
        <div>
            <Navbar />
            <div className={styles.catalog}>
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
