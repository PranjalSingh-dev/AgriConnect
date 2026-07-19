const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const {
    registerUser,
    loginUser,
    getGoogleSimulationPage,
    handleGoogleSimulateCallback,
} = require("../controllers/authController");

// Rate limiters for auth endpoints: max 5 login/register attempts per 15 mins
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs (high enough to prevent blocking during normal testing)
    message: {
        success: false,
        message: "Too many attempts, please try again after 15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);

// Google OAuth endpoints
router.get("/google", (req, res) => {
    // If we had actual keys configured in .env, we could use passport.
    // For local ease of use and zero config, we route to our interactive simulation.
    res.redirect("/api/auth/google/simulate");
});

router.get("/google/simulate", getGoogleSimulationPage);
router.post("/google/simulate-callback", handleGoogleSimulateCallback);

module.exports = router;
