const express = require("express");
const router = express.Router();

const {getAllWorkRequests, updateWorkRequest, deleteWorkRequest}= require("../controllers/clientWorkRequestController");

const adminAuth = require("../middleware/adminAuth");


// ======================================================
// GET ALL REQUESTS
// ======================================================

router.get("/", adminAuth, getAllWorkRequests);


// ======================================================
// UPDATE REQUEST
// ======================================================

router.put("/:id", adminAuth, updateWorkRequest);


// ======================================================
// DELETE REQUEST
// ======================================================

router.delete("/:id", adminAuth, deleteWorkRequest);

module.exports=router;