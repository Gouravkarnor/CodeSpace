import mongoose from "mongoose";
const problemSchema = new mongoose.Schema({
  problemName: {
    type: String,
    required: true,
  },

  problemDescription: {
    type: String,
    required: true,
  },

  constraints: {
    type: String,
    required: true,
  },

  inputDescription: {
    type: String,
    required: true,
  },

  outputDescription: {
    type: String,
    required: true,
  },

  testCases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Testcases",
    },
  ],

  code: {
    type: String,
    required: true,
  },
});

const problemList = mongoose.model("problemList", problemSchema);
export default problemList;