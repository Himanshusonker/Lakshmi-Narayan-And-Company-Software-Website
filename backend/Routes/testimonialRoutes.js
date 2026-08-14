const express=require("express");
const router=express.Router();

const {getTestimonials, getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial}= require("../controllers/testimonialController");

const adminAuth = require("../middleware/adminAuth");


// ============================================================
// PUBLIC
// ============================================================

router.get("/", getTestimonials);


// ============================================================
// ADMIN
// ============================================================

router.get("/admin/all", adminAuth, getAdminTestimonials);

router.post("/", adminAuth, createTestimonial);

router.put("/:id", adminAuth, updateTestimonial);

router.delete("/:id", adminAuth, deleteTestimonial);

module.exports=router;

