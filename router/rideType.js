const express = require("express");
const router = express.Router();
const rideTypeController = require("../controllers/rideType");
const adminAuth = require("../middleware/adminAuth");

router.post("/", adminAuth.verifyToken, rideTypeController.createRideType);
router.get("/", rideTypeController.getAllRideType);
router.get("/:id", rideTypeController.getRideTypeById);
router.put("/:id", adminAuth.verifyToken, rideTypeController.updateRideType);
router.delete("/:id", adminAuth.verifyToken, rideTypeController.deleteRideType);
module.exports = router;
