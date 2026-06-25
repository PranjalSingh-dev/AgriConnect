const farmers = require("../data/farmers");

// GET all farmers
const getAllFarmers = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Farmers fetched successfully",
        count: farmers.length,
        data: farmers
    });
};

// GET farmer by ID
const getFarmerById = (req, res) => {
    const id = parseInt(req.params.id);

    const farmer = farmers.find(f => f.id === id);

    if (!farmer) {
        return res.status(404).json({
            success: false,
            message: "Farmer not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Farmer fetched successfully",
        data: farmer
    });
};

// CREATE farmer
const createFarmer = (req, res) => {
    const { name, crop, village } = req.body;

    // Required fields
    if (!name || !crop || !village) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
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
            message: "Please enter valid farmer details"
        });
    }

    // Duplicate check
    const farmerExists = farmers.some(
        farmer =>
            farmer.name.toLowerCase() === name.trim().toLowerCase() &&
            farmer.village.toLowerCase() === village.trim().toLowerCase()
    );

    if (farmerExists) {
        return res.status(409).json({
            success: false,
            message: "Farmer already exists"
        });
    }

    const newFarmer = {
        id: farmers.length + 1,
        name: name.trim(),
        crop: crop.trim(),
        village: village.trim()
    };

    farmers.push(newFarmer);

    res.status(201).json({
        success: true,
        message: "Farmer created successfully",
        data: newFarmer
    });
};

// UPDATE farmer
const updateFarmer = (req, res) => {
    const id = parseInt(req.params.id);

    const farmer = farmers.find(f => f.id === id);

    if (!farmer) {
        return res.status(404).json({
            success: false,
            message: "Farmer not found"
        });
    }

    const { name, crop, village } = req.body;

    if (name && name.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Farmer name must be at least 3 characters"
        });
    }

    if (crop && crop.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Crop name is invalid"
        });
    }

    if (village && village.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Village name is invalid"
        });
    }

    if (name) farmer.name = name.trim();
    if (crop) farmer.crop = crop.trim();
    if (village) farmer.village = village.trim();

    res.status(200).json({
        success: true,
        message: "Farmer updated successfully",
        data: farmer
    });
};

// DELETE farmer
const deleteFarmer = (req, res) => {
    const id = parseInt(req.params.id);

    const index = farmers.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Farmer not found"
        });
    }

    farmers.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Farmer deleted successfully"
    });
};

// SEARCH farmers
const searchFarmers = (req, res) => {
    const query = (req.query.q || "").toLowerCase();

    const results = farmers.filter(
        farmer =>
            farmer.name.toLowerCase().includes(query) ||
            farmer.crop.toLowerCase().includes(query) ||
            farmer.village.toLowerCase().includes(query)
    );

    res.status(200).json({
        success: true,
        message: "Search completed successfully",
        count: results.length,
        data: results
    });
};
// GET farmers by crop
const getFarmersByCrop = (req, res) => {

    const crop = req.params.crop.toLowerCase();

    const filteredFarmers = farmers.filter(
        farmer => farmer.crop.toLowerCase() === crop
    );

    res.status(200).json({
        success: true,
        message: "Farmers fetched successfully",
        count: filteredFarmers.length,
        data: filteredFarmers
    });
};
// GET farmers by village
const getFarmersByVillage = (req, res) => {

    const village = req.params.village.toLowerCase();

    const filteredFarmers = farmers.filter(
        farmer => farmer.village.toLowerCase() === village
    );

    res.status(200).json({
        success: true,
        message: "Farmers fetched successfully",
        count: filteredFarmers.length,
        data: filteredFarmers
    });
};
module.exports = {
    getAllFarmers,
    getFarmerById,
    createFarmer,
    updateFarmer,
    deleteFarmer,
    searchFarmers,
    getFarmersByCrop,
    getFarmersByVillage
};