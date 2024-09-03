const express = require("express");
const { crawlWebsite } = require("../controllers/crawlController");

const router = express.Router();

router.post("/crawl", crawlWebsite);

module.exports = router;
