const express = require("express");
const path = require("path");
const promClient = require("prom-client");
const http = require("http");

// Initialize Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Registry = promClient.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const httpRequestsTotal = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const loginCounter = new promClient.Counter({
  name: "app_login_attempts_total",
  help: "Total number of login attempts",
  registers: [register],
});

// Add TCP connection metrics
const tcpConnectionsTotal = new promClient.Counter({
  name: "tcp_connections_total",
  help: "Total number of TCP connections",
  labelNames: ["state"],
  registers: [register],
});

const tcpCurrentConnections = new promClient.Gauge({
  name: "tcp_current_connections",
  help: "Current number of TCP connections",
  registers: [register],
});

const tcpConnectionErrors = new promClient.Counter({
  name: "tcp_connection_errors_total",
  help: "Total number of TCP connection errors",
  registers: [register],
});

const app = express();
const PORT = 3001;

// Create HTTP server from Express app
const server = http.createServer(app);

// Monitor TCP connections on the HTTP server
server.on("connection", (socket) => {
  tcpConnectionsTotal.labels("established").inc();
  tcpCurrentConnections.inc();

  socket.on("error", (err) => {
    tcpConnectionErrors.inc();
  });

  socket.on("close", () => {
    tcpCurrentConnections.dec();
  });
});

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to capture metrics
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  const method = req.method;

  res.on("finish", () => {
    const duration = Date.now() - start;
    httpRequestDuration
      .labels(method, path, res.statusCode)
      .observe(duration / 1000);
    httpRequestsTotal.labels(method, path, res.statusCode).inc();
  });

  next();
});

// Add metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
});

// GET /login - Serve the HTML page and log the request
app.get("/login", (req, res) => {
  console.log("GET /login was called");
  loginCounter.inc();
  //write some cpu bound dummy code
  for (let i = 0; i < 1e7; i++) {
    Math.sqrt(i);
  }
  res.status(200).sendFile(path.join(__dirname, "views", "login.html"));
});

// POST /login - Log the username and password
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  loginCounter.inc();
  console.log(
    `POST /login was called with username: ${username}, password: ${password}`
  );
  for (let i = 0; i < 1e7; i++) {
    Math.sqrt(i);
  }
  res.status(200).send("Login API called");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
