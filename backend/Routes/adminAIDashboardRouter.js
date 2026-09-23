const express = require("express");

const router = express.Router();

const {getDashboardStats} = require("../controllers/adminAIDashboardController");

const {adminProtect,} = require("../middleware/adminAIAuthMiddleware");

// ============================================================
// ADMIN DASHBOARD
// ============================================================

router.get("/", adminProtect ,getDashboardStats);

module.exports = router;
