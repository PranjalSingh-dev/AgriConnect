const express = require("express");
const router = express.Router();

const {
    getAllFarmers,
    getFarmerById,
    createFarmer,
    updateFarmer,
    deleteFarmer,
    searchFarmers
} = require("../controllers/farmerController");

router.get("/", getAllFarmers);

// IMPORTANT: This must come before "/:id"
router.get("/search", searchFarmers);

router.get("/:id", getFarmerById);

router.post("/", createFarmer);

router.put("/:id", updateFarmer);

router.delete("/:id", deleteFarmer);

module.exports = router;