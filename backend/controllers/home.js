import express from "express";
const app = express();
const home = (req, res) => {
  res.send("This is home page");
};
export default home;
