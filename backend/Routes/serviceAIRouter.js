const express = require("express");

const router = express.Router();

const {getServices, getServiceBySlug,} = require("../controllers/serviceAIController");

// GET /api/services
router.get("/", getServices);

// GET /api/services/:slug
router.get("/:slug", getServiceBySlug);

module.exports = router;