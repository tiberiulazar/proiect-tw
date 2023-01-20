import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.data = action.payload;
    },
    updateCategories: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getCategories, updateCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
