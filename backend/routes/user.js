import express from "express";
import { register, login, logout } from "../controllers/registerController.js";
import {
  auth,
  isAdmin,
  isVisitor,
  verifyuser,
  loggedin,
} from "../middlewares/auth.js";
// import { generateCodeFile } from "../controllers/generateCodeFile.js";
import {
  runCode,
  submitCode,
  runCodePlayground,
  runCodePlaygroundInput,
} from "../controllers/runCode.js";
import home from "../controllers/home.js";
const router = express.Router();

router.get("/", home);
router.post("/register", register);
router.post("/login", login);
router.get("/isloggedin", verifyuser, loggedin);
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for Tests",
  });
});
router.get("/logout", logout);

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Admin",
  });
});

router.get("/visitor", auth, isVisitor, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Students",
  });
});

router.post("/logout", logout);

// router.post("/playground", runCode);

export default router;
