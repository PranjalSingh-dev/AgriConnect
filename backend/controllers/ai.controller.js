const { generateCropAdvice } = require("../services/gemini.service");

// POST /api/ai/crop-advice
// Body: { crop: string, symptoms: string }
const getCropAdvice = async (req, res) => {
  try {
    const { crop, symptoms } = req.body || {};

    if (!crop || typeof crop !== "string" || !crop.trim()) {
      return res.status(400).json({
        success: false,
        message: "'crop' name is required",
      });
    }

    if (!symptoms || typeof symptoms !== "string" || !symptoms.trim()) {
      return res.status(400).json({
        success: false,
        message: "'symptoms' description is required",
      });
    }

    const advice = await generateCropAdvice(crop.trim(), symptoms.trim());

    res.status(200).json({
      success: true,
      data: advice,
    });
  } catch (error) {
    console.error("Crop advice API error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Crop diagnosis failed",
    });
  }
};

// POST /api/ai/chat (Kept for backwards compatibility)
const chatWithAi = async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }
    // Simple direct response
    const advice = await generateCropAdvice("unknown", message);
    res.status(200).json({
      success: true,
      reply: `**Diagnosis**: ${advice.disease}\n\n**Cause**: ${advice.cause}\n\n**Treatment**: ${advice.treatment}\n\n**Prevention**: ${advice.prevention}`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getCropAdvice,
  chatWithAi,
};
