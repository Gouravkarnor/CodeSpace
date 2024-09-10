import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "visitor"],
  },
  problemsCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problems",
    },
  ],
  problemsSolved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemList",
    },
  ],
  problemsAttempted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problems",
    },
  ],
});

const users = mongoose.model("User", userSchema);
export default users;
