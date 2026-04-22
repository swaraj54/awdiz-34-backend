import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/login", (req, res) => {
  res.send("Login Successful!");
});
app.get("/register", (req, res) => {
  res.send("Registration Successful!");
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
