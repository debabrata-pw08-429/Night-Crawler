const express = require("express");
const { getDashboardAnalytics } = require("../controllers/DashboardController");

const router = express.Router();

router.post("/dashboard", getDashboardAnalytics);

module.exports = router;
