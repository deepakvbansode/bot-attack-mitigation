const express = require("express");
const path = require("path");
const promClient = require("prom-client");
const http = require("http");

// Initialize Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Registry = promClient.Registry;
const register = new Registry();
collectDefaultMetrics({ register });
// Static products
const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Headphones", price: 150 },
  { id: 3, name: "Keyboard", price: 80 },
];
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
app.get("/", (req, res) => {
  loginCounter.inc();
  if (req.cookies && req.cookies.auth) {
    return res.redirect("/dashboard");
  }
  res.status(200).sendFile(path.join(__dirname, "views", "login.html"));
});

// POST /login - Log the username and password
app.post("/login", (req, res) => {
  loginCounter.inc();
  const { email, password } = req.body;
  const validUsers = [
    { email: "deepak.bansode@gruve.ai", password: "gruve123" },
    { email: "test.user@gruve.ai", password: "gruve123" },
  ];
  const user = validUsers.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }
  // Set a simple auth cookie (not secure, for demo only)
  res.cookie("auth", email, { httpOnly: false });
  res.json({ message: "Login successful", email });
});

app.get("/dashboard", (req, res, next) => {
  console.log("Dashboard accessed");
  // if (!req.cookies || !req.cookies.auth) {
  //   console.log("cookie not found, redirecting to login");
  //   return res.redirect("/");
  // }

  res.status(200).sendFile(path.join(__dirname, "views", "dashboard.html"));
});

// /products endpoint
app.get("/products", (req, res) => {
  res.json(products);
});

// /checkout endpoint
app.post("/checkout", (req, res) => {
  const { productId } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }
  // Simulate purchase
  res.json({ message: `Purchased ${product.name} for $${product.price}` });
});

// Logout endpoint
app.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/login.html");
});
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
