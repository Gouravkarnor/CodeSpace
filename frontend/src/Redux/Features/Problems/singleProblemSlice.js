import { createSlice } from "@reduxjs/toolkit";
export const singleproblemSlice = createSlice({
  name: "singleproblem",
  initialState: [],
  reducers: {
    addOneProblem: (state, action) => {
      state.push(action.payload);
    },
    removeOneProblem: (state, action) => {
      return [];
    },
  },
});

export const { addOneProblem, removeOneProblem } = singleproblemSlice.actions;
export default singleproblemSlice.reducer;
