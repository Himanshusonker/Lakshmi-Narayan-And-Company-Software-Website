const express = require("express");
const router = express.Router();

const {getAllProjects, getProjectById, createProject, updateProject, deleteProject, updateProjectProgress, addProjectDocument, deleteProjectDocument}= require("../controllers/adminProjectController");

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


// ======================================================
// ADD PROJECT DOCUMENT
// ======================================================

router.post("/projects/:id/documents", adminAuth, addProjectDocument);


// ======================================================
// DELETE PROJECT DOCUMENT
// ======================================================

router.delete("/projects/:id/documents/:documentId", adminAuth, deleteProjectDocument);

module.exports=router;