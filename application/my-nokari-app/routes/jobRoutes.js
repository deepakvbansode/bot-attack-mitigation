const express = require("express");
const { getJobs, applyJob } = require("../controllers/jobController");

const router = express.Router();

router.get("/jobs", getJobs);
router.post("/checkout", applyJob);

module.exports = router;
