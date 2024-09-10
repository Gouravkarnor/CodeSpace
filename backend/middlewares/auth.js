import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const auth = (req, res, next) => {
  // console.log(req.cookies);
  try {
    if (!req.cookies.token) {
      return res.json({
        success: false,
        message: " Token Missing",
      });
    } else {
      jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: "Token invalid",
          });
        } else {
          next();
        }
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      res.json({
        success: false,
        message: "you have not access to this",
      });
    }
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "role is not matching",
    });
  }
};

const isVisitor = (req, res, next) => {
  try {
    if (req.user.role !== "visitor") {
      res.status(401).json({
        success: false,
        message: "you have not access to this",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "role is not matching",
    });
  }
};

const verifyuser = (req, res, next) => {
  try {
    if (!req.cookies.token)
      return res.json({
        status: "error",
        message: "You are not logged in",
      });
    else {
      jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            status: "error",
            message: "token is not okey",
          });
        } else {
          req.id = decoded.id;
          req.role = decoded.role;
          req.email = decoded.email;
          next();
        }
      });
    }
  } catch (err) {
    if (err) return next();
  }
};

const loggedin = (req, res) => {
  return res.json({
    status: "success",
    name: req.name,
    email: req.email,
    role: req.role,
    id: req.id,
  });
};
export { auth, isAdmin, isVisitor, verifyuser, loggedin };
