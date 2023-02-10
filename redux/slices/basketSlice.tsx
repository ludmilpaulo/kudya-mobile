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
      console.log(action.payload, "payload remove pressed");
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
        );

      let newBasket = [...state.items];

      if (index >=0 ){
        newBasket.splice(index, 1);

      } else{
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in basket`
        )
      }

      state.items = newBasket;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state: { basket: { items: any } }) => state.basket.items;

export const selectBasketItemsWithId = (state: any, id: number) => state.basket.items.filter((item: { id: any }) => item.id === id)

export default basketSlice.reducer