import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { removeOneProblem } from "../Redux/Features/Problems/singleProblemSlice";
import HashLoader from "react-spinners/HashLoader";
import { setloading } from "../Redux/Features/Loading/loadingSlice";
import testcases from "../../../backend/models/testcase";
import {
  updateProblem,
  pushProblem,
} from "../Redux/Features/Problems/problemSlice";

export default function AddProblemModal({ isOpen, onClose, onSubmit, flag }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const FilledProblem = useSelector((state) => state.singleproblem);
  const [problemData, setProblemData] = useState({
    problemName: "",
    problemDescription: "",
    constraints: "",
    inputDescription: "",
    outputDescription: "",
    code: "",
  });
  // console.log(FilledProblem[0]);
  // console.log(problemData);

  const [testCases, setTestCases] = useState([
    {
      input: "",
      output: "",
    },
  ]); // Separate state for test cases

  useEffect(() => {
    if (FilledProblem.length !== 0) {
      setProblemData(FilledProblem[0]);
      setTestCases(FilledProblem[0]?.testCases);
    }
  }, [FilledProblem]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = testCases?.map((testCase, i) => {
      if (i === index) {
        return {
          ...testCase,
          [field]: value,
        };
      }
      return testCase;
    });

    setTestCases(updatedTestCases);
  };
  // console.log(testCases);
  const addTestCase = () => {
    if (!Array.isArray(testCases)) {
      console.error("testCases is not an array!");
      return;
    }
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const removeTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
  };
  const updateProblemHandler = (id, e) => {
    e.preventDefault();
    dispatch(setloading(true));
    axios
      .post("http://localhost:8000/CRUD/updateProblem", problemData)
      .then((res) => {
        axios
          .post(
            `http://localhost:8000/CRUD/updateTestcases/${res.data.problemDetails._id}`,
            testCases
          )
          .then((res) => {
            if (res.data.success === true) {
              toast.success(res.data.message, {
                theme: "dark",
                position: "top-right",
              });
              dispatch(setloading(false));
              const finalData = { ...problemData, testCases };
              dispatch(updateProblem(finalData));
              dispatch(removeOneProblem());
            } else {
              toast.error(res.data.message, {
                theme: "dark",
                position: "top-right",
              });
            }
          })
          .catch((err) => {
            dispatch(setloading(false));
            console.log(err.message);
          });
      })
      .catch((err) => {
        dispatch(setloading(false));
        console.log(err.message);
      })
      .finally(() => {
        dispatch(removeOneProblem());
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setloading(true));

    if (testCases.length == 0) {
      toast.warning("Please add atleat one Test Case", {
        theme: "dark",
        position: "top-center",
      });
      return;
    }
    axios
      .post(
        `http://localhost:8000/CRUD/addProblems/${userData.id}`,
        problemData
      )
      .then((res) => {
        if (res.data.success === false) {
          toast.warning(res.data.message, {
            theme: "dark",
            position: "top-center",
          });
          return;
        }
        axios
          .post(
            `http://localhost:8000/CRUD/addTestcase/${res.data.problem._id}`,
            testCases
          )
          .then((res) => {
            dispatch(setloading(false));

            if (res.data.success === true) {
              setProblemData([]);
              setTestCases([]);
              const finalData = { ...problemData, testCases };
              dispatch(pushProblem(finalData));
              toast.success(res.data.message, {
                theme: "dark",
                position: "top-center",
              });
            }
            onClose();
            setTimeout(() => {
              navigate("/Adminpage");
            }, 3000);
          })
          .catch((err) => {
            dispatch(setloading(false));
            console.log(err.message);
          });
      })
      .catch((err) => {
        dispatch(setloading(false));
        console.log(err.message);
      })
      .finally(() => {
        dispatch(removeOneProblem());
      });

    const finalData = { ...problemData, testCases };

    onSubmit(finalData);
    // onClose();
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="bg-gray-800 bg-opacity-50 absolute inset-0"
          onClick={onClose}
        ></div>
        <div className="relative bg-gray-900 text-white rounded-lg p-6 z-10 max-w-lg w-full max-h-screen-75 overflow-y-auto my-8 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-dark">
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-xl font-semibold mb-4">Add New Problem</h2>
          <form onSubmit={handleSubmit}>
            {/* Problem Fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Problem Name</label>
              <input
                type="text"
                name="problemName"
                value={problemData?.problemName}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Problem Description
              </label>
              <textarea
                name="problemDescription"
                value={problemData?.problemDescription}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Constraints</label>
              <textarea
                name="constraints"
                value={problemData?.constraints}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Input Description
              </label>
              <textarea
                name="inputDescription"
                value={problemData?.inputDescription}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Output Description
              </label>
              <textarea
                name="outputDescription"
                value={problemData?.outputDescription}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Code</label>
              <textarea
                name="code"
                value={problemData?.code}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded"
                required
              ></textarea>
            </div>

            {/* Test Cases */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Test Cases</label>
              <br />
              <hr />
              <br />
              {testCases?.map((testCase, index) => (
                <div key={index} className="mb-2">
                  <label>Test Case : {index + 1}</label>
                  <textarea
                    name="input"
                    placeholder={`Test Case ${index + 1} Input`}
                    value={testCase.input}
                    onChange={(e) =>
                      handleTestCaseChange(index, "input", e.target.value)
                    }
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded"
                    required
                  ></textarea>
                  <label>Expected Output : {index + 1}</label>
                  <textarea
                    name="output"
                    placeholder={`Test Case ${index + 1} Expected Output`}
                    value={testCase.output}
                    onChange={(e) =>
                      handleTestCaseChange(index, "output", e.target.value)
                    }
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded"
                    required
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => removeTestCase(index)}
                    className="bg-red-600 hover:bg-red-700 mt-2 px-4 py-2 rounded text-sm"
                  >
                    Remove Test Case
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTestCase}
                className="bg-blue-600 hover:bg-blue-700 mt-2 px-4 py-2 rounded text-sm"
              >
                Add Test Case
              </button>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
              >
                Cancel
              </button>
              {flag && (
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                >
                  Add Problem
                </button>
              )}
              {!flag && (
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                  onClick={(e) => updateProblemHandler(problemData?._id, e)}
                >
                  Update Problem
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
