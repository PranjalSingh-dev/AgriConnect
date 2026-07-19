const mongoose = require("mongoose");
const Farmer = require("../models/Farmer");
const initialFarmers = require("../data/farmers");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/agriconnect");
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Seed initial farmers if database is empty
        const count = await Farmer.countDocuments();
        if (count === 0) {
            console.log("Seeding database with initial farmers...");
            // Map the initial farmers to include standard fields
            const farmersToSeed = initialFarmers.map(f => ({
                name: f.name,
                crop: f.crop,
                village: f.village,
                phone: "+91 98765 43210",
                rating: 4.5
            }));
            await Farmer.insertMany(farmersToSeed);
            console.log("Seeding complete!");
        }
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
