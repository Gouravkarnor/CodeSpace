import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DBConnection = async () => {
  const MONGODB_URL = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Error connecting to mongoDB :" + error);
  }
};

export default DBConnection;
