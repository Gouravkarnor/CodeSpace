import { useState } from "react";
import { CodeiumEditor } from "@codeium/react-code-editor";
import "./PlayGroundIDE.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const PlayGroundIDE = () => {
  // Language boilerplate snippets
  const languageSnippets = {
    cpp: `#include<iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
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

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(languageSnippets["cpp"]);
  const [testCases, setTestCases] = useState(""); // Test cases input
  const [results, setResults] = useState(""); // Store results
  const [clickedSubmit, setClickedsubmit] = useState(false);
  const handleLanguageChange = (event) => {
    if (event.target.value !== "cpp") {
      toast.warning(`${event.target.value} currently not supported`, {
        theme: "dark",
        position: "top-center",
      });
    } else {
      const selectedLanguage = event.target.value;
      setLanguage(selectedLanguage);
      setCode(languageSnippets[selectedLanguage]); // Set code snippet for selected language
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleTestCaseChange = (event) => {
    setTestCases(event.target.value); // Update test cases
  };

  const handleRunCode = () => {
    setClickedsubmit(false);
    setLoading(true);
    if (code.includes("cin") && !testCases) {
      toast.warning("Input Required", {
        theme: "dark",
        position: "top-center",
      });
      setLoading(false);
    } else {
      if (!code.includes("cin")) {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/ExecuteCode/runCodePlayground`, {
            code,
            lan: language,
          })
          .then((res) => {
            setResults(res.data.message);
            // console.log(res);
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message ||
              error.message ||
              "Error executing code";
            setResults(errorMessage); // Display the error in the results section
            // console.log(error);
            // console.log(results);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/ExecuteCode/runCodePlaygroundInput`, {
            code,
            lan: language,
            input: testCases,
          })
          .then((res) => {
            setResults(res.data.output);
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message ||
              error.message ||
              "Error executing code";
            setResults(errorMessage); // Display the error in the results section
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
    // setResults(`${testCases}`);
  };

  const [loading, setLoading] = useState();

  return (
    <>
      <ToastContainer />
      <div className="p-6 font-sans bg-gray-800 text-white">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p className="mb-3 ml-4 mt-2">CodeGo Playground</p>

          {/* Language selection dropdown */}
          <div className="mb-3 mr-4 mt-2">
            <label htmlFor="language" className="mr-4">
              Select Language:
            </label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="c">C</option>
              <option value="py">Python</option>
            </select>
          </div>
        </div>
        {/* Codeium Editor */}
        <CodeiumEditor
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{
            codeLensFontSize: 30,
            suggestOnTriggerCharacters: true, // Disable IntelliSense suggestions on typing
            quickSuggestions: true, // Disable quick suggestions
            wordBasedSuggestions: true, // Disable word-based suggestions
            inlineSuggest: { enabled: false }, // Turn off inline auto-completion
          }}
        />

        {/* Two-column layout for test cases and results */}
        <div className="mt-6 flex space-x-6">
          {/* Test Cases Column */}
          <div className="w-1/2">
            <h3 className="text-lg mb-2">Test Cases:</h3>
            <textarea
              value={testCases}
              onChange={handleTestCaseChange}
              placeholder="Enter your test cases here..."
              className="w-full p-4 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none"
              rows="2"
            ></textarea>
          </div>

          {/* Results Column */}
          <div className="w-1/2">
            <h3 className="text-lg mb-2">Results:</h3>
            <textarea
              value={results}
              readOnly
              placeholder="Results will be displayed here..."
              className="w-full p-4 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none"
              rows="2"
            ></textarea>
          </div>
        </div>

        {/* Run Button */}

        <div
          className="mt-6"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className={`flex items-center justify-center px-5 py-2 text-white rounded transition-colors duration-300 ${
              loading ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={handleRunCode}
            disabled={loading} // Disable button while loading
            style={{ border: "solid white 2px" }}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-green-300 animate-spin mr-2"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span>Running...</span>
              </div>
            ) : (
              "Run"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default PlayGroundIDE;
