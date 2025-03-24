// src\store\store.js
import { configureStore } from "@reduxjs/toolkit"; 
import { campersReducer } from "./campersSlice";
import { filtersReducer } from "./filterSlice";
import { favoritesReducer } from './favoritesSlice';
 "./slice";

export const store = configureStore({
    reducer: {
        campers: campersReducer,
        filters: filtersReducer,
        favorites: favoritesReducer,
    },
});


export default store;