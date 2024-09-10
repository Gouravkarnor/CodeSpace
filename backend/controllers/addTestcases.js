import testcases from "../models/testcase.js";
import problemList from "../models/problem.js";

const addTestcases = async (req, res) => {
  try {
    const testC = req.body;
    const problemId = req.params.problemId;
    // console.log(problemId);
    for (let i = 0; i < testC.length; i++) {
      const { input, output } = testC[i];
      const testCase = await testcases.create({ input, output, problemId });
      await problemList.findByIdAndUpdate(
        { _id: problemId },
        {
          $push: { testCases: testCase._id },
        }
      );
    }
    const problem = await problemList
      .findById({ _id: problemId })
      .populate("testCases")
      .exec();
    return res.json({
      success: true,
      message: "Problem Added Succesfully",
      problem,
      // input,
      // output,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const removeTestcase = async (req, res) => {
  try {
    const element = req.body;
    const testCaseDetails = await TestCaseSchema.findByIdAndDelete({
      _id: element._id,
    });
    const problemDetails = await problemSchema
      .findByIdAndUpdate(
        { _id: element.problemId },
        {
          $pull: {
            TestCases: element._id,
          },
        },
        {
          new: true,
        }
      )
      .populate("TestCases")
      .exec();

    return res.status(500).json({ success: true, problemDetails });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateTestcases = async (req, res) => {
  try {
    const testCaseArray = req.body; // Array of updated test cases
    const problemId = req.params.problemid;
    // console.log(testCaseArray);
    // Step 1: Remove all existing test cases associated with the problem
    const problem = await problemList.findById(problemId).populate("testCases");

    if (!problem) {
      return res.json({ success: false, message: "Problem not found" });
    }
    // console.log(problem.testCases);
    // Delete all test cases associated with the problem
    for (let testCase of problem.testCases) {
      await testcases.findByIdAndDelete(testCase._id);
    }
    // Clear the testCases array in the problem document
    await problemList.findByIdAndUpdate(problemId, {
      $set: { testCases: [] },
    });

    // Step 2: Add the new/updated test cases
    for (let i = 0; i < testCaseArray.length; i++) {
      const { input, output } = testCaseArray[i];
      const newTestCase = await testcases.create({
        input,
        output,
        problemId,
      });
      await problemList.findByIdAndUpdate(problemId, {
        $push: { testCases: newTestCase._id },
      });
    }

    // Step 3: Populate the updated test cases in the problem document
    const updatedProblem = await problemList
      .findById(problemId)
      .populate("testCases")
      .exec();

    return res.json({
      success: true,
      message: "Problem updated successfully",
      updatedProblem,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { addTestcases, removeTestcase, updateTestcases };
