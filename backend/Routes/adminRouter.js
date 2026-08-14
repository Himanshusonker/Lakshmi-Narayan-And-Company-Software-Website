const express = require("express");
const router = express.Router();

const { createAdmin, adminLogin, getAdminProfile}=require("../controllers/adminController");

const adminAuth=require("../middleware/adminAuth");

// =================================================================================================
// CREATE ADMIN
// =================================================================================================

router.post("/create", createAdmin);

// =================================================================================================
// ADMIN LOGIN
// =================================================================================================

router.post("/login", adminLogin);

// =================================================================================================
// ADMIN PROFILE
// =================================================================================================

router.get("/profile", adminAuth, getAdminProfile);

module.exports = router;