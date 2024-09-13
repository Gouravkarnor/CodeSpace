import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Format Date and Time in IST
const formatDateTime = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};
const formatToLocalTime = (utcDate) => {
  if (!(utcDate instanceof Date)) {
    utcDate = new Date(utcDate); // Convert string or other types to Date object
  }

  return utcDate.toLocaleString("en-US", {
    // Use 'en-US' for AM/PM format
    timeZone: "Asia/Kolkata", // Specify the desired time zone, e.g., IST
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour clock format
  });
};

const ProblemCard = ({ problem }) => {
  console.log(problem?.problemId?.problemName);
  return (
    <>
      <div className="max-w-7xl mx-auto p-4 bg-gray-800 rounded shadow-md text-left font-serif  text-white p-3">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-white p-3">
            {problem?.problemId?.problemName === undefined && (
              <span className="text-red-500">Problem not exists</span>
            )}
            {problem?.problemId?.problemName}
          </h2>
          <p className="text-gray-300 p-3">
            {/* {formatDateTime(problem.submit_at)}{" "} */}
            {formatToLocalTime(problem?.submit_atTime)}
          </p>

          <div className="flex justify-end mt-4 space-x-3">
            {problem?.verdict === "Accepted" && <h2>Accepted ✅</h2>}
            {problem?.verdict === "Wrong Answer" && (
              <span>Wrong Answer ❌</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SubmitHistoryPage = () => {
  const { id } = useParams();
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/CRUD/fetchSubmitedproblemListbyUserid`, {
        id,
      })
      .then((res) => {
        setProblems(res.data.submittedProblems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  console.log("object", problems);
  return (
    <div className="bg-gray-800">
      {problems.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
          <div className="max-w-md p-4 bg-gray-800 rounded shadow-md text-center">
            <h2 className="text-xl font-bold text-white  bg-gray-800">
              No Solved Problems Available
            </h2>
            <p className="text-gray-400">PLease Solve Problems First</p>
          </div>
        </div>
      ) : (
        <ul
          className="space-y-4 bg-gray-800"
          style={{ backgroundColor: "#111827" }}
        >
          <div
            className="flex mt-8 p-3 text-white justify-between max-w-7xl text-2xl mx-auto  rounded shadow-md text-left font-serif"
            style={{ backgroundColor: "#34394e" }}
          >
            <span className="m-2 ml-6">Problem Name</span>
            <span className="m-2">Submission Time</span>
            <span className="m-2 mr-6">Status</span>
          </div>
          {problems?.map((problem, index) => (
            <ProblemCard problem={problem} key={index} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubmitHistoryPage;
