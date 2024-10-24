import { useState } from 'react';
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ onFilter }) => {
    const [location, setLocation] = useState('');

    const handleFilterClick = (filterType, value) => {
        onFilter({ [filterType]: value });
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        onFilter({ location: event.target.value });
    };

    return (
        <div className={styles.filterSidebar}>
             <div>
                <h4>Location</h4>
                <input 
                    type="text" 
                    value={location} 
                    onChange={handleLocationChange} 
                    placeholder="Enter location" 
                    className={styles.locationInput} 
                />
            </div>
            <h3>Filters</h3>
                       <div>
                <h4>Vehicle equipment</h4>
                <button onClick={() => handleFilterClick('equipment', 'AC')}>AC</button>
                <button onClick={() => handleFilterClick('equipment', 'Automatic')}>Automatic</button>
                <button onClick={() => handleFilterClick('equipment', 'Kitchen')}>Kitchen</button>
                <button onClick={() => handleFilterClick('equipment', 'TV')}>TV</button>
                <button onClick={() => handleFilterClick('equipment', 'Bathroom')}>Bathroom</button>
            </div>
            <div>
                <h4>Vehicle type</h4>
                <button onClick={() => handleFilterClick('type', 'Van')}>Van</button>
                <button onClick={() => handleFilterClick('type', 'Fully Integrated')}>Fully Integrated</button>
                <button onClick={() => handleFilterClick('type', 'Alcove')}>Alcove</button>
            </div>
            <button className={styles.searchButton}>Search</button>
        </div>
    );
};

export default FilterSidebar;
