// import users from "../models/user";
import users from "../models/user.js";
import testcases from "../models/testcase.js";

import problemList from "../models/problem.js";

const fetchproblemList = async (req, res) => {
  try {
    const allProblems = await problemList.find({}).populate("testCases").exec();
    if (!allProblems) {
      return res.json({
        success: false,
        message: "Problems Not Found at Server.",
      });
    }
    return res.json({
      success: true,
      message: "fetched all problem successfully",
      allProblems,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Error in Fetching Problems : ${error.message}`,
    });
  }
};

const getProblemById = async (req, res) => {
  try {
    const { problemId } = req.body;
    // console.log(problemId);
    const getProblem = await problemList
      .findById(problemId)
      .populate("testCases")
      .exec();
    if (!getProblem) {
      throw new Error("Unable to fetch problem by Id from database");
    }

    return res.status(200).json({ success: true, getProblem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addProblems = async (req, res) => {
  const coderId = req.params.userid;
  try {
    const {
      problemName,
      problemDescription,
      constraints,
      inputDescription,
      outputDescription,
      code,
    } = req.body;
    if (
      !problemName ||
      !problemDescription ||
      !constraints ||
      !inputDescription ||
      !outputDescription ||
      !code
    ) {
      console.log(
        problemName,
        problemDescription,
        constraints,
        inputDescription,
        outputDescription,
        sampleOutput,
        code
      );
      return res.json({
        success: false,
        message: "Cannot fetch data from body",
      });
    }

    const problem = await problemList.create({
      problemName,
      problemDescription,
      constraints,
      inputDescription,
      outputDescription,
      code,
    });

    const userDetails = await users.findByIdAndUpdate(
      { _id: coderId },
      {
        $push: {
          problemsCreated: problem._id,
        },
      },
      {
        new: true,
      }
    );
    return res.json({
      success: true,
      message: "Problem added successfully",
      problem,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Error in Fetching Problems : ${error.message}`,
    });
  }
};

const editProblem = async (req, res) => {
  // console.log(req.body);
  try {
    const {
      problemName,
      problemDescription,
      inputDescription,
      outputDescription,
      code,
      constraints,
    } = req.body;
    const problemId = req.body;
    // console.log("sDSD>> ", problemId);
    const problemDetails = await problemList
      .findByIdAndUpdate(
        problemId,
        {
          problemName: problemName,
          problemDescription: problemDescription,
          constraints: constraints,
          inputDescription: inputDescription,
          outputDescription: outputDescription,
          code: code,
        },
        { new: true }
      )
      .populate("testCases")
      .exec();
    return res.json({ success: true, problemDetails });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const deleteProblemAndCleanup = async (req, res) => {
  try {
    const { problemId, userId } = req.params;

    // Step 1: Find the problem and populate its test cases
    const problem = await problemList.findById(problemId).populate("testCases");

    if (!problem) {
      return res.json({ success: false, message: "Problem not found" });
    }
    // console.log(problem);
    // Step 2: Delete all test cases associated with the problem
    for (let testCase of problem.testCases) {
      await testcases.findByIdAndDelete(testCase._id);
    }

    // Step 3: Delete the problem itself
    await problemList.findByIdAndDelete(problemId);

    // Step 4: Remove the problem ID from the user's problem list
    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { $pull: { problemsCreated: problemId } },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Problem deleted successfully",
      updatedUser,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export {
  fetchproblemList,
  getProblemById,
  addProblems,
  editProblem,
  deleteProblemAndCleanup,
};
