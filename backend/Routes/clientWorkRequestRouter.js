const express = require("express");
const router = express.Router();

const {createWorkRequest, getClientWorkRequests, getClientWorkRequestById} = require("../controllers/clientWorkRequestController");


// ======================================================
// CREATE REQUEST
// ======================================================

router.post("/", createWorkRequest);


// ======================================================
// GET CLIENT REQUESTS
// ======================================================

router.get("/company/:companyId", getClientWorkRequests);


// ======================================================
// GET SINGLE REQUEST
// ======================================================

router.get("/company/:companyId/:id", getClientWorkRequestById);

module.exports=router;