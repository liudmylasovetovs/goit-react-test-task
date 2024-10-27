import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?page=${page}`
      );
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
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${query}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperDetailsById = createAsyncThunk(
  "campers/fetchCamperDetailsById",
  async (camperId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${camperId}`
      );
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
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campers = [...state.campers, ...action.payload.items];
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchFilteredCampers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFilteredCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campers = action.payload.items;
      })
      .addCase(fetchFilteredCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCamperDetailsById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCamperDetailsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperDetailsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { loadMore } = campersSlice.actions;

export const campersReducer = campersSlice.reducer;
