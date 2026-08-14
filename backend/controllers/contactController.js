const ContactModel= require("../models/contactModel");
const { sendEmail } = require("../utils/emailService");

const {sendWhatsAppMessage}= require("../utils/whatsappService");

// ============================================================
// CREATE CONTACT MESSAGE
// ============================================================

const createContactMessage=async(req, res)=>{

    try {

        const { name, email, phone, subject, message}= req.body;

        // ====================================================
        // VALIDATION
        // ====================================================

        if (!name || !email || !phone || !subject || !message) {

            return res.status(400).json({success: false, message:"All fields are required"});

        }

        // ====================================================
        // CREATE MESSAGE
        // ====================================================

        const contact= await ContactModel.create({ name, email, phone, subject, message});


        // ====================================================
        // ADMIN EMAIL
        // ====================================================

        const emailResult= await sendEmail({

            to: process.env.ADMIN_EMAIL,

            subject: `New Contact Message - ${subject}`,

            // subject: "New Contact Enquiry",

            html: `

                <div style="font-family: Arial, sans-serif;">

                    <h2>New Contact Message</h2>

                    <p>
                        You have received a new message from your website.
                    </p>

                    <hr>

                    <p>
                        <strong>Name:</strong> ${name}
                    </p>

                    <p>
                        <strong>Email:</strong> ${email}
                    </p>

                    <p>
                        <strong>Phone:</strong> ${phone}
                    </p>

                    <p>
                        <strong>Subject:</strong> ${subject}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <p>
                        ${message}
                    </p>

                    <hr>

                    <p>
                        Lakshmi Narayan And Company
                    </p>

                </div>

            `
        });


        if (!emailResult.success) {

            console.log("Admin Email Failed:", emailResult.error);

        }



    // ==========================================
    // ADMIN WHATSAPP
    // ==========================================

        const whatsappMessage = `
        New Contact Enquiry

        Name: ${name}

        Email: ${email}

        Phone: ${phone}

        Subject: ${subject}

        Message:${message}

        Please check the Admin Dashboard.
        `.trim();

        const whatsappResult= await sendWhatsAppMessage({

            to: process.env.ADMIN_WHATSAPP_NUMBER,

            message: whatsappMessage

        });


        if (!whatsappResult.success) {

            console.log("Admin WhatsApp Failed:", whatsappResult.error);

        }


    // ==========================================
    // CLIENT WHATSAPP CONFIRMATION
    // ==========================================

    const clientWhatsappMessage= `
    
    Hello ${name},

    Thank you for contacting Lakshmi Narayan And Company.

    We have successfully received your enquiry.

    Subject: ${subject}

    Our team will review your requirements and contact you shortly.

    Thank you,
    Lakshmi Narayan And Company
    `.trim();

    let whatsappNumber = phone.replace(/\D/g, "");

    if (whatsappNumber.length === 10) {

        whatsappNumber = "91" + whatsappNumber;

    }


    if (whatsappNumber.length === 12 && whatsappNumber.startsWith("91")) {

    const clientWhatsappResult= await sendWhatsAppMessage({
        to: whatsappNumber,
        message: clientWhatsappMessage
    });

    if (!clientWhatsappResult.success) {
        console.log("Client WhatsApp Failed:", clientWhatsappResult.error);
    }

    } else {

    console.log("Invalid client WhatsApp number:", phone);

    }

    // ====================================================
    // CLIENT CONFIRMATION EMAIL
    // ====================================================

        await sendEmail({

            to: email,

            subject: "We received your message - Lakshmi Narayan And Company",

            html: `

                <div style="font-family: Arial, sans-serif;">

                    <h2>
                        Thank You, ${name}!
                    </h2>

                    <p>
                        We have successfully received your message.
                    </p>

                    <p>
                        Our team will review your enquiry and
                        contact you as soon as possible.
                    </p>

                    <hr>

                    <p>
                        <strong>Subject:</strong> ${subject}
                    </p>

                    <p>
                        Thank you for contacting
                        Lakshmi Narayan And Company.
                    </p>

                    <p>
                        Regards,<br>
                        Lakshmi Narayan And Company
                    </p>

                </div>

            `
        });


        // ====================================================
        // RESPONSE
        // ====================================================

        return res.status(201).json({success: true, message:"Your message has been sent successfully", data: contact});

    } catch (error) {

        console.log("Contact Controller Error:", error);

        return res.status(500).json({success: false, message:"Unable to send contact message", error: error.message});

    }
};

// ============================================================
// GET ALL CONTACT MESSAGES
// ADMIN
// ============================================================

const getContactMessages=async(req, res)=>{

    try {

        const messages= await ContactModel.find().sort({createdAt: -1});

        return res.status(200).json({success: true, data: messages});

    } catch (error) {

        console.log("Get Contact Messages Error:", error);

        return res.status(500).json({success: false, message:"Unable to fetch contact messages"});

    }
};

// ============================================================
// UPDATE CONTACT STATUS
// ADMIN
// ============================================================

const updateContactStatus=async(req, res)=>{

    try {

        const {status}= req.body;

        if (!status) {

            return res.status(400).json({success: false, message: "Status is required" });

        }

        const updatedMessage= await ContactModel.findByIdAndUpdate(req.params.id,
                {
                    status:status
                },

                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedMessage) {

            return res.status(404).json({success: false, message:"Contact message not found"});

        }

        return res.status(200).json({success: true, message:"Contact status updated successfully", data: updatedMessage});

    } catch (error) {

        console.log("Update Contact Status Error:", error);

        return res.status(500).json({success: false, message:"Unable to update contact status"});

    }
};

// ============================================================
// DELETE CONTACT MESSAGE
// ADMIN
// ============================================================

const deleteContactMessage=async(req, res)=>{

    try {

        const deletedMessage= await ContactModel.findByIdAndDelete(req.params.id);

        if (!deletedMessage) {

            return res.status(404).json({success: false, message:"Contact message not found"});

        }

        return res.status(200).json({success: true, message:"Contact message deleted successfully"});

    } catch (error) {

        console.log("Delete Contact Error:", error);

        return res.status(500).json({success: false, message: "Unable to delete contact message"});

    }
};
module.exports={
            createContactMessage,
            getContactMessages,
            updateContactStatus,
            deleteContactMessage
};