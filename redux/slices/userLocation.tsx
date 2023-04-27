import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LocationState {
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number |null;
    heading: number | null;
    latitude: number | null;
    longitude: number | null;
    speed: number | null ;
  }
  
  const initialState: LocationState = {
    accuracy: null,
    altitude: null,
    altitudeAccuracy:null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
  };
  
  const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
      setLocation(state, action: PayloadAction<{ latitude: number, 
        longitude: number,  
        accuracy: number,
         altitude: number,
         altitudeAccuracy: number,
         heading: number,
         speed: number
         }>) {
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
     
      },
      clearLocation(state) {
        state.latitude = null;
        state.longitude = null;
      
      },
    },
  });
  
  export const { setLocation, clearLocation } = locationSlice.actions;

 // export const selectUser = (state: { auth: { user: any } }) => state.auth.user;
  
  export default locationSlice.reducer;
  
  