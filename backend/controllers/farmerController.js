const mongoose = require("mongoose");
const Farmer = require("../models/Farmer");

// Helper to construct query for ID (supports both MongoDB ObjectId and numeric id fallback)
const getFarmerQuery = (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return { _id: id };
    }
    const numId = parseInt(id);
    if (!isNaN(numId)) {
        return { id: numId }; // support old numeric ids
    }
    return null;
};

// GET all farmers
// @route   GET /api/farmers
const getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find().populate("owner", "name email");
        res.status(200).json({
            success: true,
            message: "Farmers fetched successfully",
            count: farmers.length,
            data: farmers,
        });
    } catch (error) {
        console.error("GET all farmers error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error fetching farmers",
        });
    }
};

// GET farmer by ID
// @route   GET /api/farmers/:id
const getFarmerById = async (req, res) => {
    try {
        const query = getFarmerQuery(req.params.id);
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Invalid farmer ID format",
            });
        }

        const farmer = await Farmer.findOne(query).populate("owner", "name email");

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Farmer fetched successfully",
            data: farmer,
        });
    } catch (error) {
        console.error("GET farmer by ID error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error fetching farmer",
        });
    }
};

// CREATE farmer
// @route   POST /api/farmers
const createFarmer = async (req, res) => {
    try {
        const { name, crop, village, phone, rating } = req.body;

        // Required fields
        if (!name || !crop || !village) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Input validation
        if (
            name.trim().length < 3 ||
            crop.trim().length < 2 ||
            village.trim().length < 2
        ) {
            return res.status(400).json({
                success: false,
                message: "Please enter valid farmer details",
            });
        }

        // Duplicate check
        const farmerExists = await Farmer.findOne({
            name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
            village: { $regex: new RegExp(`^${village.trim()}$`, "i") },
        });

        if (farmerExists) {
            return res.status(409).json({
                success: false,
                message: "Farmer already exists in this village",
            });
        }

        // Create new farmer and associate with user if logged in
        const newFarmer = new Farmer({
            name: name.trim(),
            crop: crop.trim(),
            village: village.trim(),
            phone: phone ? phone.trim() : undefined,
            rating: rating ? parseFloat(rating) : undefined,
            owner: req.user ? req.user._id : undefined, // set owner if authenticated
        });

        await newFarmer.save();

        res.status(201).json({
            success: true,
            message: "Farmer created successfully",
            data: newFarmer,
        });
    } catch (error) {
        console.error("CREATE farmer error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error creating farmer",
        });
    }
};

// UPDATE farmer
// @route   PUT /api/farmers/:id
const updateFarmer = async (req, res) => {
    try {
        const query = getFarmerQuery(req.params.id);
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Invalid farmer ID format",
            });
        }

        const farmer = await Farmer.findOne(query);

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found",
            });
        }

        // If route is protected, we can optionally restrict edits to the owner
        if (req.user && farmer.owner && farmer.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to update this farmer",
            });
        }

        const { name, crop, village, phone, rating } = req.body;

        if (name && name.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: "Farmer name must be at least 3 characters",
            });
        }

        if (crop && crop.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: "Crop name is invalid",
            });
        }

        if (village && village.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: "Village name is invalid",
            });
        }

        if (name) farmer.name = name.trim();
        if (crop) farmer.crop = crop.trim();
        if (village) farmer.village = village.trim();
        if (phone) farmer.phone = phone.trim();
        if (rating !== undefined) farmer.rating = parseFloat(rating);

        await farmer.save();

        res.status(200).json({
            success: true,
            message: "Farmer updated successfully",
            data: farmer,
        });
    } catch (error) {
        console.error("UPDATE farmer error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error updating farmer",
        });
    }
};

// DELETE farmer
// @route   DELETE /api/farmers/:id
const deleteFarmer = async (req, res) => {
    try {
        const query = getFarmerQuery(req.params.id);
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Invalid farmer ID format",
            });
        }

        const farmer = await Farmer.findOne(query);

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found",
            });
        }

        // If route is protected, we can optionally restrict deletions to the owner
        if (req.user && farmer.owner && farmer.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to delete this farmer",
            });
        }

        await Farmer.deleteOne(query);

        res.status(200).json({
            success: true,
            message: "Farmer deleted successfully",
        });
    } catch (error) {
        console.error("DELETE farmer error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error deleting farmer",
        });
    }
};

// SEARCH farmers
// @route   GET /api/farmers/search
const searchFarmers = async (req, res) => {
    try {
        const query = req.query.q || "";
        const searchRegex = new RegExp(query, "i");

        const results = await Farmer.find({
            $or: [
                { name: searchRegex },
                { crop: searchRegex },
                { village: searchRegex },
            ],
        }).populate("owner", "name email");

        res.status(200).json({
            success: true,
            message: "Search completed successfully",
            count: results.length,
            data: results,
        });
    } catch (error) {
        console.error("SEARCH farmers error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error during search",
        });
    }
};

// GET farmers by crop
// @route   GET /api/farmers/crop/:crop
const getFarmersByCrop = async (req, res) => {
    try {
        const crop = req.params.crop;
        const filteredFarmers = await Farmer.find({
            crop: { $regex: new RegExp(`^${crop}$`, "i") },
        }).populate("owner", "name email");

        res.status(200).json({
            success: true,
            message: "Farmers fetched successfully",
            count: filteredFarmers.length,
            data: filteredFarmers,
        });
    } catch (error) {
        console.error("GET farmers by crop error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error fetching crop farmers",
        });
    }
};

// GET farmers by village
// @route   GET /api/farmers/village/:village
const getFarmersByVillage = async (req, res) => {
    try {
        const village = req.params.village;
        const filteredFarmers = await Farmer.find({
            village: { $regex: new RegExp(`^${village}$`, "i") },
        }).populate("owner", "name email");

        res.status(200).json({
            success: true,
            message: "Farmers fetched successfully",
            count: filteredFarmers.length,
            data: filteredFarmers,
        });
    } catch (error) {
        console.error("GET farmers by village error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error fetching village farmers",
        });
    }
};

module.exports = {
    getAllFarmers,
    getFarmerById,
    createFarmer,
    updateFarmer,
    deleteFarmer,
    searchFarmers,
    getFarmersByCrop,
    getFarmersByVillage,
};