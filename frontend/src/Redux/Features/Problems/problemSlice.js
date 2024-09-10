import { createSlice } from "@reduxjs/toolkit";
export const problemSlice = createSlice({
  name: "problem",
  initialState: [],
  reducers: {
    addProblem: (state, action) => {
      return action.payload;
    },
    pushProblem: (state, action) => {
      state.push(action.payload);
    },
    updateProblem: (state, action) => {
      return state.map((problem) =>
        problem._id === action.payload._id
          ? { ...problem, ...action.payload }
          : problem
      );
    },
    DeleteProblem: (state, action) => {
      return state.filter((problem) => problem._id !== action.payload);
    },
  },
});

export const { addProblem, DeleteProblem, updateProblem, pushProblem } =
  problemSlice.actions;
export default problemSlice.reducer;
