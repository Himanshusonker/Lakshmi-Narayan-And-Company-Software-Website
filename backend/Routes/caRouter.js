const express = require("express");

const router = express.Router();

const {createCA, getAllCA, toggleCAStatus, caLogin} = require("../controllers/caController");

const adminAuth = require("../middleware/adminAuth");

// ==========================================
// ADMIN CA MANAGEMENT
// ==========================================

router.post("/admin/ca", adminAuth, createCA);

router.get("/admin/ca", adminAuth, getAllCA);

router.put("/admin/ca/:id/status", adminAuth, toggleCAStatus);


// ==========================================
// CA LOGIN
// ==========================================

router.post("/ca/login", caLogin);

module.exports = router;