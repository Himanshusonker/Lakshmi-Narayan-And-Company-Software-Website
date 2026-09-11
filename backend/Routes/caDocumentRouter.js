const express = require("express");

const router = express.Router();

const {sendCADocument, getCADocuments, sendAdminCADocument, getAdminCADocuments, markCADocumentAsRead, downloadCADocument, markCADocumentAsReadByCA, downloadCADocumentByCA}= require("../controllers/caDocumentController");

const caAuth = require("../middleware/caAuth");

const adminAuth =require("../middleware/adminAuth");

const upload = require("../middleware/caDocumentUpload");


// =========================================================
// CA SEND DOCUMENT / MESSAGE TO ADMIN
// =========================================================

router.post("/", caAuth, upload.single("document"), sendCADocument);


// =========================================================
// GET CA DOCUMENTS
// =========================================================

router.get("/", caAuth, getCADocuments);


router.put( "/:id/read", caAuth, markCADocumentAsReadByCA);

router.get("/:id/download", caAuth, downloadCADocumentByCA);

// =========================================================
// ADMIN → CA
// =========================================================

router.post("/admin/send", adminAuth, upload.single("document"), sendAdminCADocument);


// =========================================================
// ADMIN GET ALL CA DOCUMENTS
// =========================================================

router.get("/admin/all", adminAuth, getAdminCADocuments);

router.put("/admin/:id/read", adminAuth, markCADocumentAsRead);

router.get("/admin/:id/download", adminAuth, downloadCADocument);

module.exports = router;