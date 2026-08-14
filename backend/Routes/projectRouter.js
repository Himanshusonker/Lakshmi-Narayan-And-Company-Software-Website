const express = require("express");
const router = express.Router();

const { createProject, getProjects, getProjectBySlug, getAdminProjects, updateProject, deleteProject }=require("../controllers/projectController");

const adminAuth=require("../middleware/adminAuth");

// ============================================================
// CREATE PROJECT
// ============================================================

router.post("/", adminAuth, createProject);

// ============================================================
// GET ALL PROJECTS
// ============================================================

router.get("/", getProjects);

// ============================================================
// GET PROJECT BY SLUG
// ============================================================

router.get("/:slug", getProjectBySlug);

// ============================================================
// ADMIN ROUTES
// ============================================================

router.get("/admin/all", adminAuth, getAdminProjects);

// ============================================================
// UPDATE PROJECT
// ============================================================

router.put("/:id", adminAuth, updateProject);

// ============================================================
// DELETE PROJECT
// ============================================================

router.delete("/:id", adminAuth, deleteProject);

module.exports=router;