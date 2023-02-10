import { configureStore } from '@reduxjs/toolkit';

import busketReducer from './slices/basketSlice' 

export const store = configureStore({
  reducer: {
    busket: busketReducer
   
  }
});