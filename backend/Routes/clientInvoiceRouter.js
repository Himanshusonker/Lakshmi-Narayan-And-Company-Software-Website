const express = require("express");
const router = express.Router();

const {getAllInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice, getClientInvoices, getClientInvoiceById, createInvoicePaymentOrder, verifyInvoicePayment, downloadClientInvoicePDF}=require("../controllers/clientInvoiceController");

// ======================================================
// MIDDLEWARE
// ======================================================


const adminAuth= require("../middleware/adminAuth");
const clientAuth= require("../middleware/clientAuth");


// ======================================================
// ADMIN INVOICE ROUTES
// ======================================================

router.get("/admin/invoices", adminAuth, getAllInvoices);

router.get("/admin/invoices/:id", adminAuth, getInvoiceById);

router.post("/admin/invoices", adminAuth, createInvoice);

router.put("/admin/invoices/:id", adminAuth, updateInvoice);

router.delete("/admin/invoices/:id", adminAuth, deleteInvoice);


// ======================================================
// CLIENT INVOICE ROUTES
// ======================================================

router.get("/client/invoices", clientAuth, getClientInvoices);

router.get("/client/invoices/:id", clientAuth, getClientInvoiceById);


// ======================================================
// CLIENT PAYMENT ROUTES
// ======================================================

router.post("/client/invoices/:id/payment/order", clientAuth, createInvoicePaymentOrder);

router.post("/client/invoices/:id/payment/verify", clientAuth, verifyInvoicePayment);

router.get("/client/invoices/:id/pdf", clientAuth, downloadClientInvoicePDF);

module.exports=router;