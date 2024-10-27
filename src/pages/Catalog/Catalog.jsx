// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCampers, loadMore } from '../../store/campersSlice';
// import Sidebar from '../../components/Sidebar/Sidebar';
// import CamperCard from '../../components/CamperCard/CamperCard';
// import Loader from '../../components/Loader/Loader';
// import styles from './Catalog.module.css';

// const Catalog = () => {
//   const dispatch = useDispatch();
//   const { campers, status, page, error } = useSelector((state) => state.campers);
//   const filters = useSelector((state) => state.filters);

//    const [displayCount, setDisplayCount] = useState(4);

//   useEffect(() => {
//     console.log(`Fetching campers for page: ${page} with filters:`, filters);
//     dispatch(fetchCampers(page)); // Fetch campers on page change
//   }, [dispatch,filters, page]);

//   useEffect(() => {
//     // Fetch campers whenever filters change
//     dispatch(fetchCampers(1)); // Reset to first page on filter change
//   }, [filters, dispatch]);

//   const handleLoadMore = () => {
//     console.log("Loading more campers...");
//     dispatch(loadMore());
//     setDisplayCount((prevCount) => prevCount + 4);
//   };

//   const renderContent = () => {
//     console.log("Current status:", status);
//     console.log("Current campers:", campers);

//     if (status === 'loading') {
//       return <Loader />;
//     }

//     if (status === 'failed') {
//       return (
//         <div className={styles.errorMessage}>
//           Error: {error || "An unknown error occurred."}
//         </div>
//       );
//     }

//     if (campers.length === 0) {
//       console.log("No campers found matching your criteria.");
//       return <div className={styles.noResults}>No campers found matching your criteria.</div>;
//     }

//     const visibleCampers = campers.slice(0, displayCount);

//     return (
//       <>
//         {campers.map((camper, index) => (
//           <CamperCard key={`${camper.id}-${index}`} camper={camper} />
//         ))}
//         {status === 'succeeded' && (
//           <button onClick={handleLoadMore} className={styles.loadMoreButton}>
//             Load more
//           </button>
//         )}
//       </>
//     );
//   };

//   return (
//     <div className={styles.catalogContainer}>
//       <Sidebar onFilterChange={(newFilters) => dispatch(fetchCampers(1, newFilters))} />
//       <div className={styles.camperList}>
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default Catalog;
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
  const filters = useSelector((state) => state.filters);
  
  // Local state to control the number of visible campers
  const [displayCount, setDisplayCount] = useState(4);

  useEffect(() => {
    console.log(`Fetching campers for page: ${page} with filters:`, filters);
    dispatch(fetchCampers(page)); // Fetch campers on page change
  }, [dispatch, filters, page]);

  useEffect(() => {
    // Fetch campers whenever filters change
    dispatch(fetchCampers(1)); // Reset to first page on filter change
  }, [filters, dispatch]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    console.log("Loading more campers...");
    dispatch(loadMore());
    setDisplayCount((prevCount) => prevCount + 4); // Increase display count by 4
  };

  const renderContent = () => {
    console.log("Current status:", status);
    console.log("Current campers:", campers);

    if (status === 'loading') {
      return <Loader />;
    }

    if (status === 'failed') {
      return (
        <div className={styles.errorMessage}>
          Error: {error || "An unknown error occurred."}
        </div>
      );
    }

    if (campers.length === 0) {
      console.log("No campers found matching your criteria.");
      return <div className={styles.noResults}>No campers found matching your criteria.</div>;
    }

    // Show only the number of campers set by displayCount
    const visibleCampers = campers.slice(0, displayCount);

    return (
      <>
        {visibleCampers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
        {status === 'succeeded' && displayCount < campers.length && (
          <button onClick={handleLoadMore} className={styles.loadMoreButton}>
            Load more
          </button>
        )}
      </>
    );
  };

  return (
    <div className={styles.catalogContainer}>
      <Sidebar onFilterChange={(newFilters) => dispatch(fetchCampers(1, newFilters))} />
      <div className={styles.camperList}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Catalog;
