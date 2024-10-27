

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch campers from API with pagination
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (page, thunkAPI) => {
    try {
      console.log(`Fetching campers for page: ${page}`);
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?page=${page}`
      );
      console.log("Fetched campers:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredCampers = createAsyncThunk(
  "campers/fetchFilteredCampers",
  async (filters, thunkAPI) => {
    try {
      const query = new URLSearchParams(filters).toString(); // Generate query from filters
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${query}`
      );
      console.log("Fetched filtered campers:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



// Fetch specific camper details by ID
export const fetchCamperDetailsById = createAsyncThunk(
  "campers/fetchCamperDetailsById",
  async (camperId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${camperId}`
      );
      console.log("Fetched camper details:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialStateCampers = {
  campers: [],
  status: "idle",
  error: null,
  page: 1,
  selectedCamper: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState: initialStateCampers,
  reducers: {
    loadMore: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch campers list
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("Fetching campers: pending...");
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campers = [...state.campers, ...action.payload.items];
        console.log("Fetching campers: succeeded", action.payload);
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log("Fetching campers: failed", action.payload);
      })
      // Fetch filtered campers
      .addCase(fetchFilteredCampers.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("Fetching filtered campers: pending...");
      })
      .addCase(fetchFilteredCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campers = action.payload.items; // Replace with filtered campers
        console.log("Fetching filtered campers: succeeded", action.payload);
      })
      .addCase(fetchFilteredCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log("Fetching filtered campers: failed", action.payload);
      })
      // Fetch camper details
      .addCase(fetchCamperDetailsById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        console.log("Fetching camper details: pending...");
      })
      .addCase(fetchCamperDetailsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCamper = action.payload;
        console.log("Fetching camper details: succeeded", action.payload);
      })
      .addCase(fetchCamperDetailsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.log("Fetching camper details: failed", action.payload);
      });
  },
});

// Export actions
export const { loadMore } = campersSlice.actions;

// Export reducer
export const campersReducer = campersSlice.reducer;
