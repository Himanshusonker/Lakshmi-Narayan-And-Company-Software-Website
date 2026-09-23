const express = require("express");

const router = express.Router();

const {createContact, getAllContacts, getContactById, updateContactStatus, deleteContact,} = require("../controllers/contactAIController");


// =========================================================
// CONTACT / PROJECT REQUEST
// =========================================================

// Create new project request
router.post("/", createContact);

// Get all requests
router.get("/", getAllContacts);

// Get single request
router.get("/:id", getContactById);

// Update request status
router.put("/:id", updateContactStatus);

// Delete request
router.delete("/:id", deleteContact);


module.exports = router;

