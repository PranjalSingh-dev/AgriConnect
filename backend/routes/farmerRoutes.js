const express = require("express");
const router = express.Router();

const {
    getAllFarmers,
    getFarmerById,
    createFarmer
} = require("../controllers/farmerController");

router.get("/", getAllFarmers);

router.get("/:id", getFarmerById);

router.post("/", createFarmer);

module.exports = router;