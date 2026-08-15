const express = require("express");
const router = express.Router();

const {createContactMessage, getContactMessages, updateContactStatus, deleteContactMessage}= require("../controllers/contactController");

const adminAuth=require("../middleware/adminAuth");

// ============================================================
// PUBLIC
// ============================================================

router.post("/", createContactMessage);

// ============================================================
// ADMIN
// ============================================================

router.get("/", getContactMessages);

router.put("/:id", adminAuth, updateContactStatus);

router.delete("/:id", adminAuth, deleteContactMessage);

module.exports=router;