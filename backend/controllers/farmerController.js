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
const createFarmer = (req, res) => {

    const { name, crop, village } = req.body;

    if (!name || !crop || !village) {
       return res.status(400).json({
    success: false,
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
            message: "Farmer not found"
        });
    }

    const { name, crop, village } = req.body;

    if (name) farmer.name = name;
    if (crop) farmer.crop = crop;
    if (village) farmer.village = village;

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

    const results = farmers.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.crop.toLowerCase().includes(query) ||
        f.village.toLowerCase().includes(query)
    );

   res.status(200).json({
    success: true,
    message: "Search completed successfully",
    count: results.length,
    data: results
});
};
module.exports = {
    getAllFarmers,
    getFarmerById,
    createFarmer,
    updateFarmer,
    deleteFarmer,
    searchFarmers
};