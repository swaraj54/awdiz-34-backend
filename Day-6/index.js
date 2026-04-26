import express from "express";
import MainRouter from "./routes/index.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is working..");
});

app.use("/api/v1", MainRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});
