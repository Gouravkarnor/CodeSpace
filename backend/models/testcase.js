import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },

  output: {
    type: String,
    required: true,
  },

  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "problemList",
  },
});

const testcases = mongoose.model("Testcases", testCaseSchema);

export default testcases;
