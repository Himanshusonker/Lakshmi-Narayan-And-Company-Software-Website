const express = require("express");
const router = express.Router();


const { getAllServices, getServiceBySlug, createService, updateService, deleteService } = require("../controllers/serviceController");

const adminAuth=require("../middleware/adminAuth");

// ============================================================================
// GET ALL SERVICES
// ============================================================================

router.get("/", getAllServices);


// ============================================================================
// GET SINGLE SERVICE
// ============================================================================

router.get("/:slug", getServiceBySlug);


// ============================================================================
// CREATE SERVICE
// ============================================================================

router.post("/", adminAuth, createService);


// ============================================================================
// UPDATE SERVICE
// ============================================================================

router.put("/:id", adminAuth, updateService);


// ============================================================================
// DELETE SERVICE
// ============================================================================

router.delete("/:id", adminAuth, deleteService);


module.exports = router;