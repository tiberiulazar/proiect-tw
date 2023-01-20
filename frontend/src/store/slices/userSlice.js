import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
    },
    updateUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
    },
  },
});

export const { addUser, updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
