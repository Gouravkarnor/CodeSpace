import express from "express";

import {
  runCode,
  submitCode,
  runCodePlayground,
  runCodePlaygroundInput,
} from "../controllers/runCode.js";
const router = express.Router();
router.post("/run", runCode);
router.post("/runCodePlayground", runCodePlayground);
router.post("/runCodePlaygroundInput", runCodePlaygroundInput);
router.post("/submitCode", submitCode);
export default router;
