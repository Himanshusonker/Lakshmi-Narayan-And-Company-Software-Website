const express = require("express");
const router=express.Router();

const {createLead, getAllLeads, getLeadById, updateLead, deleteLead}= require("../controllers/leadController");

const adminAuth = require("../middleware/adminAuth");


// ============================================================================
// PUBLIC
// ============================================================================

// Get Quote form submit

router.post("/", createLead);


// ============================================================================
// ADMIN
// ============================================================================

// Get all leads

router.get("/admin/all", adminAuth, getAllLeads);


// Get single lead

router.get("/admin/:id", adminAuth, getLeadById);


// Update lead

router.put("/admin/:id", adminAuth, updateLead);


// Delete lead

router.delete("/admin/:id", adminAuth, deleteLead);

module.exports=router;