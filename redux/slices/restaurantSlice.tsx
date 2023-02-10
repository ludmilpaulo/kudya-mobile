import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BasketState{
  
    restaurantId: number;
        name: string;
        phone: number;
        address: string;
        logo: string;
  
}


const initialState: BasketState = {
    restaurant : { restaurantId, image_url, name, address, phone}
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {

    setRestaurant: (state, action) => {
        state.restaurant = action.payload;
    }
  
   
  },
})

// Action creators are generated for each case reducer function
export const { setRestaurant} = restaurantSlice.actions

export const selectRestaurant = (state) => state.restaurant.restaurant;


export default restaurantSlice.reducer