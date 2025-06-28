const express = require("express");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
const { setupMetrics, monitorServer } = require("./metrics/prometheus");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3001;

// Prometheus metrics setup
const { register } = setupMetrics(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files (if needed)
// app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", authRoutes);
app.use("/", jobRoutes);

// Serve metrics endpoint
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
});

// HTTP server for TCP metrics
const server = http.createServer(app);
monitorServer(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
