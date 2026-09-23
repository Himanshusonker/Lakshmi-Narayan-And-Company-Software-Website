const express = require("express");

const router = express.Router();

const {getAISolutions, getAISolutionBySlug,} = require("../controllers/aiSolutionController");


// GET ALL
// /api/ai-solutions

router.get(
  "/",
  getAISolutions
);


// GET SINGLE
// /api/ai-solutions/:slug

router.get(
  "/:slug",
  getAISolutionBySlug
);


module.exports = router;