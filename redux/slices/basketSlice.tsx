import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BasketState{
items : any
}


const initialState: BasketState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
     state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIdex((item) => item.id === action.payload.id);

      let newBasket = [...state.items];

      if (index >=0){
        newBasket.splice(index, 1);

      }
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice .actions

export const selectBasketItems = (state: { basket: { items: any } }) => state.basket.items;

export const selectBasketItemsWithId = (state, id) => state.basket.items.filter((item)=> item.id === id)

export default basketSlice.reducer