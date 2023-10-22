import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import basketReducer from "./slices/basketSlice"; // Fixed the typo here
import locationSlice from "./slices/locationSlice";
import driverLocationSlice from "./slices/driverLocationSlice";
import restaurantReducer from "./slices/restaurantSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer, // Use "basket" instead of "busket"
    auth: authReducer,
    location: locationSlice,
    driverLocation: driverLocationSlice,
    restaurant: restaurantReducer,
  },
});
