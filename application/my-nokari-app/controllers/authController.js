const path = require("path");
const {
  httpRequestDuration,
  httpRequestsTotal,
} = require("../metrics/prometheus");

const validUsers = [
  { email: "deepak.bansode@gruve.ai", password: "gruve123" },
  { email: "test.user@gruve.ai", password: "gruve123" },
];

exports.login = (req, res) => {
  const start = Date.now();
  const { email, password } = req.body;
  const user = validUsers.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    httpRequestDuration
      .labels("POST", "/login", 401)
      .observe((Date.now() - start) / 1000);
    httpRequestsTotal.labels("POST", "/login", 401).inc();
    return res.status(401).json({ message: "Invalid email or password." });
  }
  res.cookie("auth", email, { httpOnly: false });
  httpRequestDuration
    .labels("POST", "/login", 200)
    .observe((Date.now() - start) / 1000);
  httpRequestsTotal.labels("POST", "/login", 200).inc();
  res.json({ message: "Login successful", email });
};

exports.logout = (req, res) => {
  const start = Date.now();
  res.clearCookie("auth");
  httpRequestDuration
    .labels("GET", "/logout", 302)
    .observe((Date.now() - start) / 1000);
  httpRequestsTotal.labels("GET", "/logout", 302).inc();
  res.redirect("/login.html");
};
