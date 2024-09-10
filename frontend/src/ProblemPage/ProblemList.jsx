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

function truncateDescription(description, maxLength = 80) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
}

const problems = [
  {
    name: "Two Sum",
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`...",
  },
  {
    name: "Add Two Numbers",
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order...",
  },
  {
    name: "Longest Substring Without Repeating Characters",
    description:
      "Given a string `s`, find the length of the longest substring without repeating characters...",
  },
  {
    name: "Median of Two Sorted Arrays",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays...",
  },
  {
    name: "Longest Palindromic Substring",
    description:
      "Given a string `s`, return the longest palindromic substring in `s`...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1]...",
  },
  {
    name: "String to Integer (atoi)",
    description:
      "Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer according to the rules of the `atoi` function...",
  },
  {
    name: "Palindrome Number",
    description:
      "Given an integer `x`, return true if `x` is a palindrome, and false otherwise...",
  },
  {
    name: "Regular Expression Matching",
    description:
      "Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*` where `.` matches any single character and `*` matches zero or more of the preceding element...",
  },
  {
    name: "Container With Most Water",
    description:
      "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that...",
  },
  // Add more problems as needed
];

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
      .post("http://localhost:8000/api/getUserById", { userId: userData?.id })
      .then((res) => {
        if (res.data.success === true) setCompleteUserdata(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData]);
  console.log(userData);
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
        <div
          className="w-full md:w-1/3 bg-gray-800 p-2 rounded-md border border-gray-600 flex items-center justify-center"
          style={{ height: "250px" }}
        >
          <Pie data={data} options={options} width={150} height={150} />
        </div>
      </div>
    </>
  );
};

export default ProblemList;
