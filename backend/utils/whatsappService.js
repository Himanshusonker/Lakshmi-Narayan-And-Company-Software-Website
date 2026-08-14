const axios = require("axios");

const sendWhatsAppMessage=async({to, message})=>{

    try {

        const response = await axios.post(`https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",

                recipient_type: "individual",

                to: to,

                type: "text",

                text: {
                    preview_url: false,
                    body: message
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("WhatsApp Message Sent:", response.data);

        return {success: true, data: response.data};

    } catch (error) {

        console.log("WhatsApp API Error:", error.response?.data || error.message);

        return {success: false, error: error.response?.data || error.message};
    }
};
module.exports={
            sendWhatsAppMessage
};