const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET /login - Serve the HTML page and log the request
app.get("/login", (req, res) => {
  console.log("GET /login was called");
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// POST /login - Log the username and password
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(
    `POST /login was called with username: ${username}, password: ${password}`
  );
  res.send("Login API called");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
