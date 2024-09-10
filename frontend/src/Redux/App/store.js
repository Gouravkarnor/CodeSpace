import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/User/userSlice";
import problemReducer from "../Features/Problems/problemSlice";
import singleproblemReducer from "../Features/Problems/singleProblemSlice";
import loadingReducer from "../Features/Loading/loadingSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    problem: problemReducer,
    loading: loadingReducer,
    singleproblem: singleproblemReducer,
  },
});
export default store;
