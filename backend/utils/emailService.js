const nodemailer= require("nodemailer");

// ============================================================
// CREATE EMAIL TRANSPORTER
// ============================================================

const transporter= nodemailer.createTransport({ service: "gmail",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


// ============================================================
// VERIFY EMAIL CONNECTION
// ============================================================

transporter.verify((error, success)=>{

    if (error) {

        console.log("Email Server Error:", error);

    } else {

        console.log("Email Server Ready");

    }

});


// ============================================================
// SEND EMAIL
// ============================================================

const sendEmail=async({ to, subject, html })=>{

    try {

        const info = await transporter.sendMail({from: `"Lakshmi Narayan And Company" <${process.env.SMTP_USER}>`,

            to,
            subject,
            html
        });

        console.log("Email Sent:", info.messageId);

        return {success: true, messageId: info.messageId};

    } catch (error) {

        console.log("Send Email Error:", error);

        return {success: false, error: error.message};

    }
};
module.exports={
            sendEmail
};