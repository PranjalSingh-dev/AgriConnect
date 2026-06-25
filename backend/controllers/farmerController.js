const farmers = require("../data/farmers");

// GET all farmers
const getAllFarmers = (req, res) => {
    res.status(200).json(farmers);
};

// GET farmer by ID
const getFarmerById = (req, res) => {
    const id = parseInt(req.params.id);

    const farmer = farmers.find(f => f.id === id);

    if (!farmer) {
        return res.status(404).json({
            message: "Farmer not found"
        });
    }

    res.status(200).json(farmer);
};
const createFarmer = (req, res) => {

    const { name, crop, village } = req.body;

    if (!name || !crop || !village) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newFarmer = {
        id: farmers.length + 1,
        name,
        crop,
        village
    };

    farmers.push(newFarmer);

    res.status(201).json(newFarmer);
};

module.exports = {
    getAllFarmers,
    getFarmerById,
    createFarmer
};