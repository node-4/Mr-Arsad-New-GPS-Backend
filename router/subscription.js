const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscription");
const adminAuth = require("../middleware/adminAuth");

router.post("/", adminAuth.verifyToken, subscriptionController.createSubscription);
router.get("/", subscriptionController.getAllSubscription);
router.get("/:id", subscriptionController.getSubscriptionById);
router.put("/:id", adminAuth.verifyToken, subscriptionController.updateSubscription);
router.delete("/:id", adminAuth.verifyToken, subscriptionController.deleteSubscription);
module.exports = router;
