import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AddProblemModal from "../AddProblemModal";
import { useConfirm } from "material-ui-confirm";
import { toast, ToastContainer } from "react-toastify";
import Confirm from "../../ConfirmDialog/Confirm";
import {
  addOneProblem,
  removeOneProblem,
} from "../../Redux/Features/Problems/singleProblemSlice";
import { DeleteProblem } from "../../Redux/Features/Problems/problemSlice";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Create a custom theme

const ProblemCard = ({ problem }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.status !== "success") navigate("/");
  }, [user]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [problems, setProblems] = useState([
    {
      problemName: "",
      problemDescription: "",
      constraints: "",
      inputDescription: "",
      outputDescription: "",
      code: "",
    },
  ]);
  const closeModal = () => {
    dispatch(removeOneProblem());
    setIsModalOpen(false);
  };
  const editHandle = () => {
    setIsModalOpen(true);
    dispatch(addOneProblem(problem));
  };
  const handleAddProblem = (problem) => {
    dispatch(removeOneProblem());
  };
  const [openDialog, setOpenDialog] = useState(false);
  const deleteProblemHandler = () => {
    setOpenDialog(true);
  };
  const handleConfirmDelete = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/CRUD/deleteProblemAndCleanup/${problem._id}/${user.id}`
      )
      .then((res) => {
        if (res.data.success === true) {
          dispatch(DeleteProblem(problem._id));
          toast.success(res.data.message, {
            theme: "dark",
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    setOpenDialog(false);
  };
  function truncateDescription(description, maxLength = 50) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 bg-gray-800 rounded shadow-md text-left font-serif">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-white p-3">
            {problem.problemName}
          </h2>
          <p className="text-gray-300 p-3">
            {truncateDescription(problem.problemDescription)}
          </p>

          <div className="flex justify-end mt-4 space-x-3">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
              onClick={editHandle}
            >
              Edit
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              onClick={deleteProblemHandler}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
              onClick={() => navigate(`/PlayGroundProbSolver/${problem._id}`)}
            >
              Visit
            </button>
          </div>
        </div>
      </div>
      <Confirm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
        description=" Do you want to Delete ? "
      />
      <AddProblemModal
        isOpen={isModalOpen}
        onClose={() => closeModal()}
        onSubmit={handleAddProblem}
        flag={false} // Indicating edit mode
      />
    </>
  );
};

const ProblemList = ({ problem }) => {
  if (problem.length === 0) {
    return (
      <div className="max-w-md mx-auto p-4 bg-gray-800 rounded shadow-md text-center">
        <h2 className="text-xl font-bold text-white">No Problems Available</h2>
        <p className="text-gray-400">Add a new problem to get started.</p>
      </div>
    );
  }
  return (
    <ul className="space-y-4">
      <div
        className="flex justify-between max-w-7xl text-2xl mx-auto  rounded shadow-md text-left font-serif"
        style={{ backgroundColor: "#34394e" }}
      >
        <span className="m-2 ml-6">Name</span>
        <span className="m-2">Description</span>
        <span className="m-2 mr-6">Actions</span>
      </div>
      {problem?.map((problem, index) => (
        <ProblemCard problem={problem} key={index} />
      ))}
    </ul>
  );
};

export default ProblemList;
