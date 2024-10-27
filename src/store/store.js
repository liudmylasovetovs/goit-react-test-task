// src\store\store.js
import { configureStore } from "@reduxjs/toolkit"; 
import { campersReducer } from "./campersSlice";
import { filtersReducer } from "./filterSlice";
 "./slice";

export const store = configureStore({
    reducer: {
        campers: campersReducer,
        filters: filtersReducer,
    },
});


export default store;