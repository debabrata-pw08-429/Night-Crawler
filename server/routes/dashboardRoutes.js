const express = require("express");
const { getDashboardAnalytics } = require("../controllers/DashboardController");

const router = express.Router();

router.get("/dashboard", getDashboardAnalytics);

module.exports = router;
