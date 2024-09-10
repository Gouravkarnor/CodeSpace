import express from "express";
const router = express.Router();
import {
  fetchproblemList,
  getProblemById,
  addProblems,
  editProblem,
  deleteProblemAndCleanup,
} from "../controllers/HandleProblem.js";
import {
  addTestcases,
  removeTestcase,
  updateTestcases,
} from "../controllers/addTestcases.js";
router.post("/addProblems/:userid", addProblems);
router.post("/addTestcase/:problemId", addTestcases);
router.get("/fetchproblemList", fetchproblemList);
router.post("/updateProblem", editProblem);
router.post("/updateTestcases/:problemid", updateTestcases);
router.post("/getProblemById", getProblemById);
router.post(
  "/deleteProblemAndCleanup/:problemId/:userId",
  deleteProblemAndCleanup
);
export default router;
