const express = require("express");
const router = express.Router();

const {getAllProjects, getProjectById, createProject, updateProject, deleteProject, updateProjectProgress}= require("../controllers/adminProjectController");

const adminAuth =require("../middleware/adminAuth");


// ======================================================
// GET ALL PROJECTS
// ======================================================

router.get("/", adminAuth, getAllProjects);


// ======================================================
// GET SINGLE PROJECT
// ======================================================

router.get("/:id", adminAuth, getProjectById);


// ======================================================
// CREATE PROJECT
// ======================================================

router.post("/", adminAuth, createProject);


// ======================================================
// UPDATE PROJECT
// ======================================================

router.put("/:id", adminAuth, updateProject);


// ======================================================
// DELETE PROJECT
// ======================================================

router.delete("/:id", adminAuth, deleteProject);


// ======================================================
// UPDATE PROGRESS
// ======================================================

router.patch("/:id/progress", adminAuth, updateProjectProgress);

module.exports=router;