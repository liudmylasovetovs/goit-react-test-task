import { useSelector } from "react-redux";
import { BsMap, BsWind, BsDiagram3, BsCupHot, BsTv, BsDroplet, BsGrid1X2, BsGrid, BsGrid3X3Gap } from "react-icons/bs";
import styles from "./Sidebar.module.css";
import { useState } from "react";

const Sidebar = ({ onSearch }) => {
  const filters = useSelector((state) => state.filters);
  const [selectedFilters, setSelectedFilters] = useState(filters);

  const handleLocationChange = (e) => {
    setSelectedFilters({ ...selectedFilters, location: e.target.value });
  };

  const handleEquipmentChange = (name) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: !prevFilters[name],
    }));
  };

  const handleVehicleTypeChange = (name) => {
    setSelectedFilters({ ...selectedFilters, vehicleType: name });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(selectedFilters);
  };

  return (
    <form onSubmit={handleSearch} className={styles.sidebar}>
      <h3 className={styles.location}>Location</h3>
      <div className={styles.inputContainer}>
        <BsMap className={styles.icon} />
        <input
          type="text"
          value={selectedFilters.location || ""}
          onChange={handleLocationChange}
          placeholder="Enter location"
          className={styles.input}
        />
      </div>

      <h3 className={styles.heading}>Vehicle Equipment</h3>
      <div className={styles.equipmentOptions}>
        {[
          { name: "AC", icon: <BsWind /> },
          { name: "Automatic", icon: <BsDiagram3 /> },
          { name: "Kitchen", icon: <BsCupHot /> },
          { name: "TV", icon: <BsTv /> },
          { name: "Bathroom", icon: <BsDroplet /> },
        ].map(({ name, icon }) => (
          <label
            key={name}
            className={`${styles.label} ${
              selectedFilters[name] ? styles.selected : ""
            }`}
          >
            <input
              type="checkbox"
              checked={!!selectedFilters[name]}
              onChange={() => handleEquipmentChange(name)}
            />
            <span className={styles.labelText}>
              {icon} {name}
            </span>
          </label>
        ))}
      </div>

      <h3 className={styles.heading}>Vehicle Type</h3>
      <div className={styles.vehicleTypes}>
        {[
          { name: "Van", icon: <BsGrid1X2 /> },
          { name: "Fully Integrated", icon: <BsGrid /> },
          { name: "Alcove", icon: <BsGrid3X3Gap /> },
        ].map(({ name, icon }) => (
          <label
            key={name}
            className={`${styles.label} ${
              selectedFilters.vehicleType === name ? styles.selected : ""
            }`}
          >
            <input
              type="radio"
              checked={selectedFilters.vehicleType === name}
              onChange={() => handleVehicleTypeChange(name)}
            />
            <span className={styles.labelText}>
              {icon} {name}
            </span>
          </label>
        ))}
      </div>

      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default Sidebar;
