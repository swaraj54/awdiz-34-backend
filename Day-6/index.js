import express from "express";
import MainRouter from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is working..");
});

app.use("/api/v1", MainRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB.");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});
