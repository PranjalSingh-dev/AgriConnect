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

router.get("/", getAllFarmers);

router.get("/search", searchFarmers);

router.get("/crop/:crop", getFarmersByCrop);

router.get("/village/:village", getFarmersByVillage);

router.get("/:id", getFarmerById);

router.post("/", createFarmer);

router.put("/:id", updateFarmer);

router.delete("/:id", deleteFarmer);

module.exports = router;