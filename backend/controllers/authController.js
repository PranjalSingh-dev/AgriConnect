const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const User = require("../models/User");

// Zod schemas for input validation
const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

// Generate JWT token helper
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "supersecret_agriconnect_key_99", {
        expiresIn: "7d",
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        // Input validation using Zod
        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: validation.error.errors[0].message,
            });
        }

        const { name, email, password } = validation.data;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                },
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid user data",
            });
        }
    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error during registration",
        });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        // Input validation using Zod
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: validation.error.errors[0].message,
            });
        }

        const { email, password } = validation.data;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user || !user.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            },
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error during login",
        });
    }
};

// @desc    Simulate Google OAuth page
// @route   GET /api/auth/google/simulate
// @access  Public
const getGoogleSimulationPage = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sign in with Google - AgriConnect</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    background-color: #f0f2f5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .card {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    width: 400px;
                    padding: 40px;
                    box-sizing: border-box;
                    text-align: center;
                }
                .logo {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .google-text span:nth-child(1) { color: #4285F4; }
                .google-text span:nth-child(2) { color: #EA4335; }
                .google-text span:nth-child(3) { color: #FBBC05; }
                .google-text span:nth-child(4) { color: #4285F4; }
                .google-text span:nth-child(5) { color: #34A853; }
                .google-text span:nth-child(6) { color: #EA4335; }
                
                h1 {
                    font-size: 22px;
                    color: #202124;
                    margin-bottom: 8px;
                    font-weight: 400;
                }
                p {
                    color: #5f6368;
                    font-size: 14px;
                    margin-bottom: 30px;
                }
                .account-option {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    border: 1px solid #dadce0;
                    border-radius: 4px;
                    margin-bottom: 12px;
                    cursor: pointer;
                    transition: background 0.2s;
                    text-align: left;
                }
                .account-option:hover {
                    background-color: #f8f9fa;
                }
                .avatar {
                    background: #16a34a;
                    color: white;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    margin-right: 12px;
                }
                .details {
                    flex-grow: 1;
                }
                .name {
                    font-size: 14px;
                    font-weight: 500;
                    color: #3c4043;
                }
                .email {
                    font-size: 12px;
                    color: #5f6368;
                }
                .custom-input-container {
                    margin-top: 20px;
                    border-top: 1px solid #dadce0;
                    padding-top: 20px;
                    text-align: left;
                }
                label {
                    display: block;
                    font-size: 12px;
                    color: #5f6368;
                    margin-bottom: 6px;
                    font-weight: 500;
                }
                input[type="email"], input[type="text"] {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #dadce0;
                    border-radius: 4px;
                    font-size: 14px;
                    box-sizing: border-box;
                    margin-bottom: 12px;
                }
                input:focus {
                    outline: none;
                    border-color: #4285F4;
                }
                button {
                    background-color: #4285F4;
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                }
                button:hover {
                    background-color: #357ae8;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="logo google-text">
                    <span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span>
                </div>
                <h1>Choose an account</h1>
                <p>to continue to <strong>AgriConnect</strong></p>
                
                <div class="account-option" onclick="selectAccount('Pranjal Singh', 'pranjal@example.com')">
                    <div class="avatar">P</div>
                    <div class="details">
                        <div class="name">Pranjal Singh</div>
                        <div class="email">pranjal@example.com</div>
                    </div>
                </div>
                
                <div class="account-option" onclick="selectAccount('Guest User', 'guest@example.com')">
                    <div class="avatar">G</div>
                    <div class="details">
                        <div class="name">Guest User</div>
                        <div class="email">guest@example.com</div>
                    </div>
                </div>

                <div class="custom-input-container">
                    <form action="/api/auth/google/simulate-callback" method="POST">
                        <label for="custom-name">Or Sign In with Custom Google Account</label>
                        <input type="text" id="custom-name" name="name" placeholder="Full Name" required>
                        <input type="email" id="custom-email" name="email" placeholder="email@gmail.com" required>
                        <button type="submit">Sign In with Google</button>
                    </form>
                </div>
            </div>

            <script>
                function selectAccount(name, email) {
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = '/api/auth/google/simulate-callback';
                    
                    const nameInput = document.createElement('input');
                    nameInput.type = 'hidden';
                    nameInput.name = 'name';
                    nameInput.value = name;
                    
                    const emailInput = document.createElement('input');
                    emailInput.type = 'hidden';
                    emailInput.name = 'email';
                    emailInput.value = email;
                    
                    form.appendChild(nameInput);
                    form.appendChild(emailInput);
                    document.body.appendChild(form);
                    form.submit();
                }
            </script>
        </body>
        </html>
    `);
};

// @desc    Callback for Google simulation or Google OAuth callback
// @route   POST /api/auth/google/simulate-callback
// @access  Public
const handleGoogleSimulateCallback = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!email || !name) {
            return res.status(400).send("Name and Email are required");
        }

        // Find or create Google user
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                googleId: "google_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Redirect user back to frontend with token, name, email and id in the query string
        res.redirect(`http://localhost:5173/login?token=${token}&email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.name)}&id=${user._id}`);
    } catch (error) {
        console.error("OAuth Callback Error:", error.message);
        res.status(500).send("OAuth authentication failed");
    }
};

module.exports = {
    registerUser,
    loginUser,
    getGoogleSimulationPage,
    handleGoogleSimulateCallback,
};
