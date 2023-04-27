import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import busketReducer from "./slices/basketSlice";
import locationReducer from './slices/userLocation';

export const store = configureStore({
  reducer: {
    busket: busketReducer,
    auth: authReducer,
    location: locationReducer,
  },
});
