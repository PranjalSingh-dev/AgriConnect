const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            // Password is not required if logging in via Google OAuth
            required: function () {
                return !this.googleId;
            },
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true, // Allows multiple null values for non-google users
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
