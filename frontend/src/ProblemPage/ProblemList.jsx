import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);
import axios from "axios";
// Sample data for the pie chart




const options = {
  plugins: {
    legend: {
      labels: {
        color: "white", // Set label color to white
      },
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        },
      },
    },
  },
};

const ProblemList = () => {
  const navigate = useNavigate();
  const problems = useSelector((state) => state.problem);
  const userData = useSelector((state) => state.user);
  const [CompleteUserdata, setCompleteUserdata] = useState([]);
  const handleNavigateToProblem = (id) => {
    if (userData?.status === "error") {
      toast.error("Please Login to Continue", {
        theme: "dark",
        position: "top-right",
      });
    } else {
      navigate(`/PlayGroundProbSolver/${id}`);
    }
  };

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/getUserById`, { userId: userData?.id })
      .then((res) => {
        if (res.data.success === true) setCompleteUserdata(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData]);
  const data = {
    labels: ["Solved", "Unsolved"],
    datasets: [
      {
        data: [
          CompleteUserdata?.problemsSolved?.length,
          problems?.length - CompleteUserdata?.problemsSolved?.length,
        ],
        backgroundColor: ["green", "gray"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: ["Solved", "Unsolved"],
    datasets: [
      {
        data: [0,problems.length],
        backgroundColor: ["green", "gray"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col md:flex-row md:space-x-0">
        {/* Problems List */}
        <div
          className="w-full md:w-2/3 bg-gray-800 p-4 rounded-md border border-gray-600 overflow-y-auto"
          style={{ maxHeight: "560px" }}
        >
          <div className="space-y-1">
            {problems?.map((data, index) => (
              <div
                key={index}
                className="p-1 rounded-md mb-1"
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? "rgb(39 45 54 / 76%)"
                      : "rgb(14 17 21 / 32%)",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignContent: "flex-start",
                  alignSelf: "center",
                }} // Alternating colors
              >
                <span
                  className="text-white hover:text-blue-500  text-lg font-serif cursor-pointer ml-7"
                  onClick={() => {
                    handleNavigateToProblem(data?._id);
                  }}
                >
                  {index + 1} . &emsp;{data?.problemName}
                </span>

                {/* <p className="text-gray-300 mr-5 font-serif">
                {truncateDescription(data?.problemDescription)}
                </p> */}
              </div>
            ))}
          </div>
        </div>
        {/* Pie Chart */}
        {userData.status==="success" && 
        <div
        className="w-full md:w-1/3 bg-gray-800 p-2 rounded-md border border-gray-600 flex items-center justify-center"
        style={{ height: "250px" }}
        >
          <Pie data={data} options={options} width={150} height={150} />
        </div>
        }
        {userData.status==="error" && 
        <div
        className="w-full md:w-1/3 bg-gray-800 p-2 rounded-md border border-gray-600 flex items-center justify-center"
        style={{ height: "250px" }}
        >
          <Pie data={data2} options={options} width={150} height={150} />
        </div>
        }
      </div>
    </>
  );
};

export default ProblemList;
