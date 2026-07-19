const express = require("express");
const router = express.Router();

const { getCropAdvice, chatWithAi } = require("../controllers/ai.controller");

// Dedicated crop-advice endpoint
router.post("/crop-advice", getCropAdvice);

// Chat endpoint (Legacy/fallback)
router.post("/chat", chatWithAi);

module.exports = router;
