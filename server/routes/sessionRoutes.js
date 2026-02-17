const express = require("express");
const {
  startSession,
  submitAnswer,
  getResult
} = require("../controllers/sessionController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/start", authenticate, startSession);
router.post("/answer", authenticate, submitAnswer);
router.get("/result/:id", authenticate, getResult);

module.exports = router;
