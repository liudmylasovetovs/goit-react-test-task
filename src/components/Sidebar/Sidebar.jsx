import { useSelector, useDispatch } from "react-redux";
import {
  setLocation,
  setAC,
  setAutomatic,
  setKitchen,
  setTV,
  setBathroom,
  setVehicleType,
} from "../../store/filterSlice";
import { fetchFilteredCampers } from "../../store/campersSlice";
import {
  BsMap,
  BsWind,
  BsDiagram3,
  BsCupHot,
  BsTv,
  BsDroplet,
  BsGrid1X2,
  BsGrid,
  BsGrid3X3Gap,
} from "react-icons/bs";
import styles from "./Sidebar.module.css";

const Sidebar = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleSearch = () => {
    dispatch(fetchFilteredCampers(filters)); // Запуск фільтрованого запиту
  };

   const handleSubmit = (e) => {
    e.preventDefault(); // Запобігти перезавантаженню
    handleSearch(); // Запустити пошук
  };


  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
    onFilterChange({ ...filters, location: e.target.value }); // Notify parent about filter change
  };

  const handleEquipmentChange = (name) => {
    switch (name) {
      case "AC":
        dispatch(setAC(!filters.AC));
        onFilterChange({ ...filters, AC: !filters.AC }); // Notify parent
        break;
      case "Automatic":
        dispatch(setAutomatic(!filters.Automatic));
        onFilterChange({ ...filters, Automatic: !filters.Automatic }); // Notify parent
        break;
      case "Kitchen":
        dispatch(setKitchen(!filters.Kitchen));
        onFilterChange({ ...filters, Kitchen: !filters.Kitchen }); // Notify parent
        break;
      case "TV":
        dispatch(setTV(!filters.TV));
        onFilterChange({ ...filters, TV: !filters.TV }); // Notify parent
        break;
      case "Bathroom":
        dispatch(setBathroom(!filters.Bathroom));
        onFilterChange({ ...filters, Bathroom: !filters.Bathroom }); // Notify parent
        break;
      default:
        break;
    }
  };

  const handleVehicleTypeChange = (name) => {
    dispatch(setVehicleType(name));
    onFilterChange({ ...filters, vehicleType: name }); // Notify parent
  };

  return (
    <form onSubmit={handleSubmit} className={styles.sidebar}>
      <h3 className={styles.location}>Location</h3>
      <div className={styles.inputContainer}>
        <BsMap className={styles.icon} />
        <input
          type="text"
          value={filters.location}
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
          <label key={name} className={styles.label}>
            <input
              type="checkbox"
              checked={filters[name]}
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
          <label key={name} className={styles.label}>
            <input
              type="radio"
              checked={filters.vehicleType === name}
              onChange={() => handleVehicleTypeChange(name)}
            />
            <span className={styles.labelText}>
              {icon} {name}
            </span>
          </label>
        ))}
      </div>
      <button
        type="submit"
        className={styles.searchButton}
        onClick={handleSearch}
      >
        Search
      </button>
    </form>
  );
};

export default Sidebar;
