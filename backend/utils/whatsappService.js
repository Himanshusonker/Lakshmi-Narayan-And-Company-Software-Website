const axios = require("axios");

const sendWhatsAppMessage=async({to, message})=>{

    try {

        // console.log("WhatsApp Debug:", {
        // apiVersion: process.env.WHATSAPP_API_VERSION,
        // phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
        // recipient: to,
        // tokenPresent: Boolean(process.env.WHATSAPP_ACCESS_TOKEN)
        // });

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

        // console.log("WhatsApp Response Status:", response.status);
        // console.log("WhatsApp Message Sent:", response.data);

        return {success: true, data: response.data};

    } catch (error) {

        // console.log("WhatsApp API Status:", error.response?.status);
        console.log("WhatsApp API Error:", error.response?.data || error.message);
        // console.log("WhatsApp API Error:", {
        //     status: error.response?.status,
        //     data: error.response?.data
        // });

  
        return {success: false, error: error.response?.data || error.message};
    }
};
module.exports={
            sendWhatsAppMessage
};