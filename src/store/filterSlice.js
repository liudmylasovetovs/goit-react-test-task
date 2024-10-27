// In your slice file
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  AC: false,
  Automatic: false,
  Kitchen: false,
  TV: false,
  Bathroom: false,
  vehicleType: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload; // Update the location in the state
    },
    setAC(state, action) {
      state.AC = action.payload;
    },
    setAutomatic(state, action) {
      state.Automatic = action.payload;
    },
    setKitchen(state, action) {
      state.Kitchen = action.payload;
    },
    setTV(state, action) {
      state.TV = action.payload;
    },
    setBathroom(state, action) {
      state.Bathroom = action.payload;
    },
    setVehicleType(state, action) {
      state.vehicleType = action.payload;
    },
  },
});

export const {
  setLocation,
  setAC,
  setAutomatic,
  setKitchen,
  setTV,
  setBathroom,
  setVehicleType,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
