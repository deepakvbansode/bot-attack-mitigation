const { jobs } = require("../models/jobModel");
const {
  httpRequestDuration,
  httpRequestsTotal,
} = require("../metrics/prometheus");

exports.getJobs = (req, res) => {
  const start = Date.now();
  res.json(jobs);
  httpRequestDuration
    .labels("GET", "/jobs", 200)
    .observe((Date.now() - start) / 1000);
  httpRequestsTotal.labels("GET", "/jobs", 200).inc();
};

exports.applyJob = (req, res) => {
  const start = Date.now();
  const { jobId } = req.body;
  const job = jobs.find((j) => j.id === jobId);
  if (!job) {
    httpRequestDuration
      .labels("POST", "/checkout", 404)
      .observe((Date.now() - start) / 1000);
    httpRequestsTotal.labels("POST", "/checkout", 404).inc();
    return res.status(404).json({ message: "Job not found." });
  }
  httpRequestDuration
    .labels("POST", "/checkout", 200)
    .observe((Date.now() - start) / 1000);
  httpRequestsTotal.labels("POST", "/checkout", 200).inc();
  res.json({ message: `Applied to ${job.title} at ${job.company}` });
};
