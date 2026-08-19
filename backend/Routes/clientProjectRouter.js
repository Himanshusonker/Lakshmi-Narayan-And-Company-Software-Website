const express = require("express");
const router = express.Router();

const {getClientProjects, getClientProjectById, getClientProjectDocuments}= require("../controllers/clientProjectController");

const clientAuth= require("../middleware/clientAuth");

// ======================================================
// GET CLIENT PROJECTS
// ======================================================

router.get("/", clientAuth, getClientProjects);


// ======================================================
// GET SINGLE PROJECT
// ======================================================

router.get("/:id", clientAuth, getClientProjectById);


// ======================================================
// PROJECT DOCUMENTS
// ======================================================

router.get("/projects/:id/documents", clientAuth, getClientProjectDocuments);

module.exports=router;