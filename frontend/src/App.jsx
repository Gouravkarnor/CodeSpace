import { useEffect } from "react";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./Redux/Features/User/userSlice";
import { addProblem } from "./Redux/Features/Problems/problemSlice";

function App() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/isloggedin")
      .then((res) => {
        dispatch(addUser(res.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8000/CRUD/fetchproblemList").then((res) => {
      if (res.data.success === true) {
        console.log(res.data.allProblems);
        dispatch(addProblem(res.data.allProblems));
      }
    });
  }, [loading]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
