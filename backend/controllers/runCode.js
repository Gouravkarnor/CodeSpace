import { generateCodeFile } from "./generateCodeFile.js";
import { executeCpp, executeCppWithInput } from "./generateCpp.js";
import { generateInputFile } from "./generateInputFile.js";
import problemList from "../models/problem.js";
import SolutionSubmitted from "../models/solution.js";
import mongoose from "mongoose";
import users from "../models/user.js";
const runCode = async (req, res) => {
  const { lang, code, inputs, problemId } = req.body;

  if (code === undefined) {
    return res.status(500).json({
      success: false,
      message: "Empty code body !",
    });
  }
  try {
    const inputFile = await generateInputFile(inputs);
    const filePath = await generateCodeFile(lang, code);
    const problem = await problemList
      .findById({ _id: problemId })
      .populate("testCases")
      .exec();
    const actualCode = problem.code;
    const filePath2 = await generateCodeFile("cpp", actualCode);
    let output2 = await executeCppWithInput(filePath2, inputFile);

    let output = await executeCppWithInput(filePath, inputFile);
    output2 = output2.replace("\r\n", "").trim();
    output = output.replace("\r\n", "").trim();
    if (output !== output2) {
      return res.status(200).json({
        success: false,
        output,
        output2,
        Verdict: "failed",
      });
    }
    return res.status(200).json({
      success: true,
      output,
      output2,
      Verdict: "Accepted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error : " + error,
    });
  }
};

const submitCode = async (req, res) => {
  const { lang, code, problemId, userId } = req.body;

  try {
    // Convert IDs to ObjectId if necessary
    const problemIdObj = new mongoose.Types.ObjectId(problemId);
    const userIdObj = new mongoose.Types.ObjectId(userId);

    // Find problem details
    const problemDetails = await problemList
      .findById(problemIdObj)
      .populate("testCases")
      .exec();

    if (!problemDetails) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // Generate code file and run test cases
    const filePath = await generateCodeFile(lang, code);

    for (let i = 0; i < problemDetails.testCases.length; i++) {
      const testCase = problemDetails.testCases[i];
      const inputFile = await generateInputFile(testCase.input);
      let output = await executeCppWithInput(filePath, inputFile);
      let userOP = output.replace("\r\n", "").trim();
      let correctans = testCase.output.replace("\r\n", "").trim();

      if (userOP === "") userOP = " ";

      if (userOP !== correctans) {
        const data = {
          userId: userIdObj,
          problemId: problemIdObj,
          verdict: "Wrong Answer",
        };
        await SolutionSubmitted.create(data);

        // Find the user document
        const user = await users.findById(userIdObj).exec();

        // Check if problemId is not already in problemsAttempted or problemsSolved
        if (
          user &&
          !user.problemsAttempted.includes(problemIdObj) &&
          !user.problemsSolved.includes(problemIdObj)
        ) {
          // Add problemId to problemsAttempted
          await users.findByIdAndUpdate(
            userIdObj,
            { $addToSet: { problemsAttempted: problemIdObj } },
            { new: true }
          );
        }

        return res.status(400).json({
          success: false,
          userOP,
          testCase,
          Verdict: "Wrong Answer",
          inputNumber: i + 1,
        });
      }
    }

    // If all test cases pass
    const data = {
      userId: userIdObj,
      problemId: problemIdObj,
      verdict: "Accepted",
    };
    await SolutionSubmitted.create(data);

    // Find the user document
    const user = await users.findById(userIdObj).exec();

    if (user && !user.problemsSolved.includes(problemIdObj)) {
      // Update problemsSolved and remove from problemsAttempted
      await users.findByIdAndUpdate(
        userIdObj,
        {
          $addToSet: { problemsSolved: problemIdObj },
          $pull: { problemsAttempted: problemIdObj },
        },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      Verdict: "Passed",
      inputNumber: problemDetails.testCases.length,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

const runCodePlayground = async (req, res) => {
  const { lan, code } = req.body;
  // console.log("Language:", lan);
  // console.log("Code:", code);

  try {
    const filePath = await generateCodeFile(lan, code);

    // Compile and run the code
    var output = await executeCpp(filePath);

    // Log the output
    // console.log("Execution Output:", output);

    // Return the result to the frontend
    return res.status(200).json({
      success: true,
      message: output,
    });
  } catch (error) {
    // console.log("Error:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Error: " + error,
    });
  }
};

const runCodePlaygroundInput = async (req, res) => {
  const { lan, code, input } = req.body;
  if (!input) {
    res.json({
      success: false,
      message: "Input is Required !",
    });
  }
  try {
    const filePath = await generateCodeFile(lan, code);
    const inputFile = await generateInputFile(input);
    var output = await executeCppWithInput(filePath, inputFile);
    return res.status(200).json({
      success: true,
      output,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error: " + error,
    });
  }
};
export { runCode, submitCode, runCodePlayground, runCodePlaygroundInput };
