const express = require("express");

const router = express.Router();

const caAuth = require("../middleware/caAuth");

const {getCAInvoices, downloadCAInvoicePDF, downloadCAGSTInvoicePDF} = require("../controllers/caInvoiceController");

router.get("/ca/invoices", caAuth, getCAInvoices);

router.get("/ca/invoices/:id/pdf", caAuth, downloadCAInvoicePDF);

router.get("/ca/invoices/:id/gst-invoice", caAuth, downloadCAGSTInvoicePDF);

module.exports = router;