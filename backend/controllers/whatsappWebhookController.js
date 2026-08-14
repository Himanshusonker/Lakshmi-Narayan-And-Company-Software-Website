// ============================================================
// VERIFY WHATSAPP WEBHOOK
// ============================================================

const verifyWhatsAppWebhook = (req, res) => {

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log("WhatsApp Verification Request:");
    console.log("Mode:", req.query["hub.mode"]);
    console.log("Token:", req.query["hub.verify_token"]);
    console.log("Challenge:", req.query["hub.challenge"]);

    if (
        mode === "subscribe" &&
        token === process.env.WHATSAPP_VERIFY_TOKEN
    ) {

        console.log("WhatsApp Webhook Verified");

        return res.status(200).send(challenge);

    }

    console.log("WhatsApp Webhook Verification Failed");

    return res.sendStatus(403);
};


// ============================================================
// HANDLE WHATSAPP WEBHOOK
// ============================================================

const handleWhatsAppWebhook = (req, res) => {

    try {

        console.log("WhatsApp Webhook Received:", JSON.stringify(req.body, null, 2));

        // Meta ko immediately 200 response
        return res.sendStatus(200);

    } catch (error) {

        console.log("WhatsApp Webhook Error:", error);

        return res.sendStatus(500);
    }
};


module.exports = {
    verifyWhatsAppWebhook,
    handleWhatsAppWebhook
};