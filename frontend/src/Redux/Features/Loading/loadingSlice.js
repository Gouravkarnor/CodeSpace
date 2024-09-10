import { createSlice } from "@reduxjs/toolkit";
export const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    setloading: (state, action) => {
      return action.payload;
    },
  },
});

export const { setloading } = loadingSlice.actions;
export default loadingSlice.reducer;
