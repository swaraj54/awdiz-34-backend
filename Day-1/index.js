// console.log("Hello World!");

const http = require("http");

const myServer = http.createServer((req, res) => {
  console.log(req.url, "req.url");
  if (req.url == "/") {
    res.write("Welcome to the Home Page!");
  } else if (req.url == "/login") {
    res.write("Welcome to the Login Page!");
  } else {
    res.write("Page Not Found!");
  }
  res.end();
});

myServer.listen(8000, () => {
  console.log("Server is running on port 8000");
});
