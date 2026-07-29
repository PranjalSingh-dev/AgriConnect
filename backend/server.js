const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env vars before importing modules that depend on them
dotenv.config();

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const farmerRoutes = require("./routes/farmerRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/ai.routes");

// Connect to MongoDB
connectDB();

const app = express();

// CORS setup — allow production Vercel frontend URLs, Render domains, CLIENT_URL env var, and localhost
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
];
if (process.env.CLIENT_URL) {
    allowedOrigins.push(process.env.CLIENT_URL.replace(/\/$/, ""));
}

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, curl, Postman, direct browser hits)
            if (!origin) return callback(null, true);

            const cleanOrigin = origin.replace(/\/$/, "");

            // Allow explicitly listed origins, any *.vercel.app deployment, or *.onrender.com domain
            if (
                allowedOrigins.includes(cleanOrigin) ||
                /\.vercel\.app$/.test(cleanOrigin) ||
                /\.onrender\.com$/.test(cleanOrigin)
            ) {
                return callback(null, true);
            }

            callback(new Error(`CORS blocked for origin: ${origin}`));
        },
        credentials: true,
    })
);

// Body parser
app.use(express.json());
// URL-encoded parser (required for simulated Google OAuth form submit redirect callback)
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
    res.send("AgriConnect Backend is Running 🚀");
});

// Mount Routes
app.use("/api/farmers", farmerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

// Centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
