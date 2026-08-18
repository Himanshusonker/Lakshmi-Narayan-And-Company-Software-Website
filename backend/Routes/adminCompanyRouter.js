const express = require("express");
const router = express.Router();

const {getAllCompanies, getCompanyById, updateCompany, deleteCompany, toggleCompanyStatus}= require("../controllers/adminCompanyController");

// Use your existing admin authentication middleware here

const adminAuth = require("../middleware/adminAuth");


// ======================================================
// GET ALL COMPANIES
// ======================================================

router.get("/", adminAuth, getAllCompanies);


// ======================================================
// GET SINGLE COMPANY
// ======================================================

router.get("/:id", adminAuth, getCompanyById);


// ======================================================
// UPDATE COMPANY
// ======================================================

router.put("/:id", adminAuth, updateCompany);


// ======================================================
// DELETE COMPANY
// ======================================================

router.delete("/:id", adminAuth, deleteCompany);


// ======================================================
// TOGGLE ACTIVE / INACTIVE
// ======================================================

router.patch("/:id/status", adminAuth, toggleCompanyStatus);

module.exports=router;