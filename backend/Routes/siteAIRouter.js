const express = require("express");

const {getSiteSettings, createSiteSettings, updateSiteSettings} = require("../controllers/siteAIController");

const router = express.Router();


// GET
router.get("/", getSiteSettings);


// CREATE
router.post("/", createSiteSettings);


// UPDATE
router.put("/", updateSiteSettings);


module.exports = router;