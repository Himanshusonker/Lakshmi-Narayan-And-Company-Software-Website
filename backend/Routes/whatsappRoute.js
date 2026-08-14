const express = require("express");
const router = express.Router();

const { verifyWhatsAppWebhook, handleWhatsAppWebhook}= require("../controllers/whatsappWebhookController");


// ============================================================
// META WEBHOOK VERIFICATION
// ============================================================

router.get("/webhook", verifyWhatsAppWebhook);


// ============================================================
// META WEBHOOK EVENTS
// ============================================================

router.post("/webhook", handleWhatsAppWebhook);


module.exports = router;