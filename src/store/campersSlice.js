// src\store\campersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&limit=4`);
      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchCamperDetails = createAsyncThunk(
  "campers/fetchCamperDetails",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const campersSlice = createSlice({
  name: "campers",
  initialState: {
    campers: [],
    selectedCamper: null,
    status: "idle",
    error: null,
    page: 1,
  },
  reducers: {
    loadMore: (state) => {
      state.page =+ 1;
    },

    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
        state.error = null; // Скидаємо попередні помилки при новому запиті
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campers = state.campers.concat(action.payload); // Додаємо нові кемпери
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Зберігаємо повідомлення про помилку
      })
      .addCase(fetchCamperDetails.pending, (state) => {
        state.status = "loading";
        state.error = null; // Скидаємо попередні помилки при новому запиті
      })
      .addCase(fetchCamperDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCamper = action.payload; // Зберігаємо деталі обраного кемпера
      })
      .addCase(fetchCamperDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Зберігаємо повідомлення про помилку
      });
  },
});

export default campersSlice.reducer;
export const { loadMore, setFilters } = campersSlice.actions;
