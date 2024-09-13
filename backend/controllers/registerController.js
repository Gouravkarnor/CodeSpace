import users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register route handler
const register = async (req, res) => {
  // console.log(req.body);
  try {
    //get all the data from request body
    const { firstname, lastname, email, password, role } = req.body;
    // console.log({ firstname, lastname, email, password });
    // check that all the data should exist
    if (!(firstname && lastname && email && password && role))
      return res
        .status(400)
        .json({ success: false, message: "Please enter mandatory feilds" });

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already Registered" });
    }

    // encrypt the password
    const hashPassword = bcrypt.hashSync(password, 11);
    // console.log(hashPassword);

    // save the user to the database
    const user = await users.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
      role,
    });

    // send the response
    res.status(201).json({
      success: true,
      message: "You have successfully registered!",
      user,
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    let user = await users.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    // req.user.id = user._id;
    // console.log(user);
    user = user.toObject();
    user.token = token;
    user.password = undefined;
    // console.log(user);
    res.cookie("token", token, {
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });
    res.json({
      success: true,
      token,
      user,
      message: " logged in succesfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error logging in",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    path: "/", // Ensure the correct path is specified
    httpOnly: false,
    secure: true, // Set to true if your server is hosted over HTTPS
    sameSite: "None",
  });
  res.json({ success: true, message: "Logout Successfull" });
};
export { register, login, logout };
