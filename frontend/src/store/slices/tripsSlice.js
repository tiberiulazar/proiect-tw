import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    updateTrips: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export const { updateTrips } = tripsSlice.actions;

export default tripsSlice.reducer;
