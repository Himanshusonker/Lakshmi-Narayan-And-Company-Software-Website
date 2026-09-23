const express = require("express");
const router = express.Router();

const {getHomeData, createHomeData, updateHomeData} = require("../controllers/homeAIController");


// ============================================================
// PUBLIC HOME API
// ============================================================

router.get("/", getHomeData);


// ============================================================
// CREATE HOME DATA
// ============================================================

router.post("/", createHomeData);


// ============================================================
// UPDATE HOME DATA
// ============================================================

router.put("/", updateHomeData);


module.exports = router;