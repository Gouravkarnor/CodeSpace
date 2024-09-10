import { useEffect, useState } from "react";
import { CodeiumEditor } from "@codeium/react-code-editor";
import "./PlayGroundIDE.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const languageSnippets = {
  cpp: `#include<iostream>
using namespace std;

int main() {
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
  javascript: `console.log("Hello, JavaScript!");`,
  c: `#include<stdio.h>

int main() {
    printf("Hello, C!");
    return 0;
}`,
};

const PlayGroundIDE = () => {
  const { problemId } = useParams();
  const [problemdata, setProblemData] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (userData?.status === "error") {
      navigate("/");
    }
  }, [userData]);
  useEffect(() => {
    axios
      .post("http://localhost:8000/CRUD/getProblemById", { problemId })
      .then((res) => {
        setProblemData(res.data.getProblem);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred", error.message);
        }
      });
  }, [problemId]);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(languageSnippets["cpp"]);
  const [testCases, setTestCases] = useState(""); // Test cases input
  const [results, setResults] = useState(""); // Store results
  const [expectedop, setexpectedop] = useState(""); // Store results
  const [loading, setLoading] = useState(false);
  const [submitloading, setsubmitloading] = useState(false);
  const [showTestResults, setShowTestResults] = useState(false); // State to toggle test cases and results visibility
  useEffect(() => {
    setTestCases(problemdata.inputDescription);
  }, [problemdata]);
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    if (selectedLanguage !== "cpp") {
      toast.warning(`${selectedLanguage} currently not supported`, {
        theme: "dark",
        position: "top-center",
      });
    } else {
      setLanguage(selectedLanguage);
      setCode(languageSnippets[selectedLanguage]); // Set code snippet for selected language
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = () => {
    setResults("");
    setexpectedop("");
    setShowTestResults(true);
    setLoading(true);
    if (code.includes("cin") && !testCases) {
      toast.warning("Input Required", {
        theme: "dark",
        position: "top-center",
      });
      setLoading(false);
    } else {
      const url = testCases
        ? "http://localhost:8000/ExecuteCode/run"
        : "http://localhost:8000/ExecuteCode/runCodePlayground";
      console.log(url);
      const payload = testCases
        ? { code, lang: language, inputs: testCases, problemId }
        : { code, lang: language };
      axios
        .post(url, payload)
        .then((res) => {
          console.log(res);
          if (res.data.output == "") setResults(" ");
          else setResults(res.data.output);
          setexpectedop(res.data.output2);
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Error executing code";
          setResults(errorMessage);
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleSubmitCode = () => {
    setLoading(true);
    setsubmitloading(true);
    axios
      .post("http://localhost:8000/ExecuteCode/submitCode", {
        code,
        lang: language,
        problemId,
        userId: userData?._id,
      })
      .then((res) => {
        setResults(res.data.message);
        toast.success("Code submitted successfully!", {
          theme: "dark",
          position: "top-center",
        });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.message ||
          "Error submitting code";
        setResults(errorMessage);
        // toast.error(errorMessage, {
        //   theme: "dark",
        //   position: "top-center",
        // });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="p-6 font-sans bg-gray-800 text-white">
        <div className="flex justify-between mb-1">
          {/* <p className="text-2xl">CodeGo Playground</p> */}
          <h2 className="text-3xl mb-0 font-serif">
            Problem Name : {problemdata.problemName}
          </h2>

          {/* Language selection dropdown */}
          <div>
            <label htmlFor="language" className="mr-4">
              Select Language:
            </label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="px-2 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="c">C</option>
              <option value="py">Python</option>
            </select>
          </div>
        </div>

        {/* Problem description and Code editor in one row */}
        <div className="relative flex flex-col md:flex-row md:space-x-2">
          {/* Problem description */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0 relative">
            <div
              className="w-full p-2 bg-gray-800 p-5 text-white text-lg rounded-md border border-gray-600 overflow-y-auto font-serif text-left"
              style={{ height: "400px" }} // Fixed height for problem description
            >
              {/* // description */}
              <p className="mt-2">{problemdata.problemDescription}</p>
              <br />
              {/* Sample Test cases
               */}
              <h4>Sample Test Case : </h4>
              <p>{problemdata.inputDescription}</p>
              <p>{problemdata.outputDescription}</p>
              <br />
              <h4>Constraints </h4>
              <p>{problemdata.constraints}</p>
              {}
            </div>
            <div className="mt-2 flex justify-between items-center">
              <button
                onClick={() => {
                  setShowTestResults(!showTestResults);
                  setResults("");
                  setexpectedop("");
                }}
                className="px-5 py-2 text-white rounded bg-gray-800 hover:bg-gray-700 flex items-center space-x-2"
              >
                {showTestResults ? (
                  <>
                    <span>Hide Test Cases & Results</span>
                    <FaChevronUp className="text-white text-2xl" />
                  </>
                ) : (
                  <>
                    <span>Show Test Cases & Results</span>
                    <FaChevronDown className="text-white text-2xl" />
                  </>
                )}
              </button>
              {/* Buttons for Run and Submit */}
              <div className="flex space-x-4 justify-center">
                <button
                  className={`px-4 py-2 text-white rounded-md ${
                    loading ? "bg-blue-600" : "bg-blue-800 hover:bg-blue-700"
                  }`}
                  onClick={handleRunCode}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                      </svg>
                      <span>Running...</span>
                    </span>
                  ) : (
                    "Run Code"
                  )}
                </button>
                <button
                  className={`px-4 py-2 text-white rounded-md ${
                    submitloading
                      ? "bg-green-600"
                      : "bg-green-800 hover:bg-green-700"
                  }`}
                  onClick={handleSubmitCode}
                  disabled={submitloading || loading}
                >
                  {submitloading ? (
                    <span className="flex items-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                      </svg>
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    "Submit Code"
                  )}
                </button>
              </div>
            </div>
            {/* Conditionally render Test Cases and Results */}
            {showTestResults && (
              <div
                style={{ height: "410px" }}
                className="absolute inset-0 bg-gray-900 bg-opacity-80 p-6 flex flex-row md:flex-col md:space-x-6 z-9"
              >
                {/* Test Cases */}
                <div className="flex flex-row md:space-x-6 z-9">
                  <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <h3 className="text-lg mb-2">Test Cases:</h3>
                    <textarea
                      value={testCases}
                      onChange={(e) => setTestCases(e.target.value)}
                      placeholder="Enter your test cases here..."
                      className="w-full p-4 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none"
                      rows="3"
                    ></textarea>
                  </div>

                  {/* Results */}
                  <div className="w-full md:w-1/2">
                    <h3 className="text-lg mb-2">Output:</h3>
                    <textarea
                      value={results}
                      readOnly
                      placeholder="Results will be displayed here..."
                      className="w-full p-4 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div
                  className="flex flex-row md:space-x-6 z-9 mt-6 items-center justify-stretch align-middle"
                  style={{ marginLeft: 0 }}
                >
                  <div className="w-full md:w-1/2 ">
                    <h3 className="text-lg mb-2">Expected Output:</h3>
                    <textarea
                      value={expectedop}
                      readOnly
                      placeholder="Results will be displayed here..."
                      className="w-full p-4 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none"
                      rows="3"
                    ></textarea>
                  </div>
                  {results === expectedop && results !== "" && (
                    <div
                      className="ml-6 flex flex-row items-center justify-between"
                      style={{ marginLeft: "20px" }}
                    >
                      <img
                        src="https://icons.veryicon.com/png/128/miscellaneous/8atour/success-35.png"
                        style={{ height: "50px" }}
                        alt=""
                        srcset=""
                      />
                      <span
                        className="font-serif ml11"
                        style={{ marginLeft: "20px" }}
                      >
                        {" "}
                        Passed
                      </span>
                    </div>
                  )}
                  {results !== expectedop && results !== "" && (
                    <div
                      className="ml-6 flex flex-row items-center justify-between"
                      style={{ marginLeft: "20px" }}
                    >
                      <img
                        src="https://icons.veryicon.com/png/128/miscellaneous/base-icon-library-3/fail-39.png"
                        style={{ height: "50px" }}
                        alt=""
                        srcset=""
                      />
                      <span
                        className="font-serif"
                        style={{ marginLeft: "20px" }}
                      >
                        {" "}
                        Failed
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Arrow for toggling Test Cases and Results */}
          </div>

          {/* Codeium Editor */}
          <div className="w-full md:w-1/2">
            {/* <h2 className="text-xl mb-2">Code Editor:</h2> */}
            <div style={{ height: "400px" }}>
              {/* Same height as the textarea */}
              <CodeiumEditor
                language={language}
                theme="vs-dark"
                value={code}
                onChange={handleCodeChange}
                options={{
                  codeLensFontSize: 40,
                  suggestOnTriggerCharacters: true, // Disable IntelliSense suggestions on typing
                  quickSuggestions: true, // Disable quick suggestions
                  wordBasedSuggestions: true, // Disable word-based suggestions
                  inlineSuggest: { enabled: false }, // Turn off inline auto-completion
                }}
                height="100%" // Ensure the editor takes up the full height
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayGroundIDE;
