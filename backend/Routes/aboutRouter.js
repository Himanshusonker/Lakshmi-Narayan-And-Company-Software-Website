const express = require("express");
const router = express.Router();

const { getAboutData, createAboutData, updateAboutData }=require("../controllers/aboutController");

const adminAuth=require("../middleware/adminAuth");

// ============================================================
// GET ABOUT PAGE
// ============================================================

router.get("/", getAboutData);

// ============================================================
// CREATE ABOUT PAGE
// ============================================================

router.post("/", adminAuth, createAboutData);

// ============================================================
// UPDATE ABOUT PAGE
// ============================================================

router.put("/", adminAuth, updateAboutData);

module.exports=router;