const express = require("express");
const router = express.Router();

const {
    getAllFarmers,
    getFarmerById,
    createFarmer,
    updateFarmer,
    deleteFarmer,
    searchFarmers,
    getFarmersByCrop,
    getFarmersByVillage
} = require("../controllers/farmerController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllFarmers);
router.get("/search", searchFarmers);
router.get("/crop/:crop", getFarmersByCrop);
router.get("/village/:village", getFarmersByVillage);
router.get("/:id", getFarmerById);

// Protected routes (requires user login)
router.post("/", protect, createFarmer);
router.put("/:id", protect, updateFarmer);
router.delete("/:id", protect, deleteFarmer);

module.exports = router;