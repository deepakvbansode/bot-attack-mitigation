const promClient = require("prom-client");

const httpRequestDuration = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
});

const httpRequestsTotal = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

function setupMetrics(app) {
  const collectDefaultMetrics = promClient.collectDefaultMetrics;
  const Registry = promClient.Registry;
  const register = new Registry();
  collectDefaultMetrics({ register });

  // Register custom metrics
  register.registerMetric(httpRequestDuration);
  register.registerMetric(httpRequestsTotal);

  // Middleware for metrics
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

  return { register };
}

function monitorServer(server) {
  const promClient = require("prom-client");
  const tcpConnectionsTotal = new promClient.Counter({
    name: "tcp_connections_total",
    help: "Total number of TCP connections",
    labelNames: ["state"],
  });

  const tcpCurrentConnections = new promClient.Gauge({
    name: "tcp_current_connections",
    help: "Current number of TCP connections",
  });

  const tcpConnectionErrors = new promClient.Counter({
    name: "tcp_connection_errors_total",
    help: "Total number of TCP connection errors",
  });

  server.on("connection", (socket) => {
    tcpConnectionsTotal.labels("established").inc();
    tcpCurrentConnections.inc();

    socket.on("error", () => {
      tcpConnectionErrors.inc();
    });

    socket.on("close", () => {
      tcpCurrentConnections.dec();
    });
  });
}

module.exports = {
  setupMetrics,
  monitorServer,
  httpRequestDuration,
  httpRequestsTotal,
};
