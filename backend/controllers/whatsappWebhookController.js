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

        const body= req.body;

        console.log("WhatsApp Webhook Received:", JSON.stringify(req.body, null, 2));

        // ====================================================
        // WHATSAPP MESSAGE STATUS
        // ====================================================


        const statuses= body?.entry?.[0]?.changes?.[0]?.value?.statuses;

        if (statuses && statuses.length > 0) {

            statuses.forEach((status) => {

                console.log("====================================");
                console.log("WhatsApp Message Status");
                console.log("Message ID:", status.id);
                console.log("Status:", status.status);
                console.log("Recipient:", status.recipient_id);

                if (status.timestamp) {
                    console.log("Timestamp:",
                    new Date(Number(status.timestamp) * 1000).toISOString()
                    );
                }

                if (status.errors) {
                    console.log("WhatsApp Delivery Error:", JSON.stringify(status.errors, null, 2));
                }

                console.log("====================================");
            });
        }

        // ====================================================
        // INCOMING MESSAGE
        // ====================================================

        const messages= body?.entry?.[0]?.changes?.[0]?.value?.messages;

        if (messages && messages.length > 0) {

            messages.forEach((msg) => {

                console.log("====================================");
                console.log("Incoming WhatsApp Message");
                console.log("From:", msg.from);
                console.log("Message ID:", msg.id);
                console.log("Message Type:", msg.type);

                if (msg.text?.body) {
                    console.log("Message:", msg.text.body);
                }

                console.log("====================================");
            });
        }

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