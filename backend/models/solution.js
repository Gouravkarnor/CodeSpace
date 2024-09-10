import mongoose from "mongoose";
import users from "../models/user.js";
const currenttime = () => {
  return new Date().getTime();
};
const solutionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
  },

  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "problemList",
  },

  verdict: {
    type: String,
    enum: ["Accepted", "Wrong Answer"],
  },

  submit_at: {
    type: Date,
    default: Date.now(),
  },
  submit_atTime: {
    type: Date,
    default: currenttime,
  },
});
const SolutionSubmitted = mongoose.model("SolutionSubmitted", solutionSchema);
export default SolutionSubmitted;
