import express from "express";
import bodyParser from "body-parser";
import DBConnection from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import crudRouter from "./routes/crudRoute.js";
import ExecuteCode from "./routes/ExecuteCode..js";
// Use cookie-parser middleware
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
DBConnection();
// parse application/json
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["https://code-space-henna.vercel.app"],
    methods: ["POST", "GET", "PUT" < "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api", userRouter);
app.use("/CRUD", crudRouter);
app.use("/ExecuteCode", ExecuteCode);

app.listen(8000, () => {
  console.log("Server is listening on port 8000!");
});
