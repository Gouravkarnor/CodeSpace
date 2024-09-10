import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
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
    default: date.now,
  },
});
module.exports = mongoose.model("SolutionSubmitted", solutionSchema);
