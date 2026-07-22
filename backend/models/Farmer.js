const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        crop: {
            type: String,
            required: true,
            trim: true,
        },
        village: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        rating: {
            type: Number,
            default: 5.0,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Farmer", farmerSchema);
