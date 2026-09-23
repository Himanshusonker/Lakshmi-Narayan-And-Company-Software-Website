const express = require("express");

const router = express.Router();

const {getProjects, getProjectBySlug,} = require("../controllers/projectAIController");

// All projects
router.get("/", getProjects);

// Single project
router.get("/:slug", getProjectBySlug);

module.exports = router;