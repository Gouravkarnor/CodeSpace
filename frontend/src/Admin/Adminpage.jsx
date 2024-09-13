import { useState, useEffect } from "react";
import AddProblemModal from "./AddProblemModal"; // Import the modal
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
// import { toast, ToastContainer } from "react-toastify";
import ProblemList from "../Admin/cards/ProblemList";
import { addProblem } from "../Redux/Features/Problems/problemSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
export default function ProblemManager() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const problems = useSelector((state) => state.problem);

  useEffect(() => {
    if (userData?.status === "error" || userData?.role !== "admin") {
      navigate("/");
    }
  }, [userData]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProblem = (problem) => {
    // console.log("in callback 666 ", problem);
    // setProblems([...problems, problem]);
  };
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/CRUD/fetchproblemList`).then((res) => {
      if (res.data.success === true) {
        console.log(res.data.allProblems);
        dispatch(addProblem(res.data.allProblems));
      }
    });
  }, [loading]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <HashLoader size={80} color="#ffffff" />
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <h1 className="text-3xl font-semibold mb-8">Problem Manager</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm mb-6"
        >
          Add Problem
        </button>
        <ProblemList problem={problems}></ProblemList>
        <AddProblemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddProblem}
          flag={true}
        />
      </div>
    </>
  );
}
