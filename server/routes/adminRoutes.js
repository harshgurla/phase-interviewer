const express = require("express");
const { getResults } = require("../controllers/adminController");
const { authenticate, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/results", authenticate, requireAdmin, getResults);

module.exports = router;
