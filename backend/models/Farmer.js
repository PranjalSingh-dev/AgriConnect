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
            default: "+91 98765 43210",
        },
        rating: {
            type: Number,
            default: 4.5,
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
