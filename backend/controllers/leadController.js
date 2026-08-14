const LeadModel= require("../models/leadModel");
const { sendEmail } = require("../utils/emailService");


// ============================================================================
// CREATE LEAD
// PUBLIC
// ============================================================================

const createLead=async(req, res)=>{

    try {

        const {name, email, phone, company, service, budget, timeline, message}= req.body;

        // ================================================================
        // REQUIRED VALIDATION
        // ================================================================

        if (!name || !email || !phone || !service || !message) {

            return res.status(400).json({success: false, message: "Please fill all required fields"});

        }

        // ================================================================
        // CREATE LEAD
        // ================================================================

        const lead= await LeadModel.create({name, email, phone, company, service, budget, timeline, message});


        // ====================================================
        // ADMIN EMAIL
        // ====================================================
    

        const emailResult= await sendEmail({

            to: process.env.ADMIN_EMAIL,

            subject: `New Project Lead - ${name}`,

            html: `

            <div style="font-family: Arial, sans-serif;">

            <h2>New Project Enquiry</h2>

            <p>
                A new Get Quote enquiry has been submitted.
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
                <strong>Company:</strong> ${company || "N/A"}
            </p>

            <p>
                <strong>Service:</strong> ${service}
            </p>

            <p>
                <strong>Budget:</strong> ${budget}
            </p>

            <p>
                <strong>Timeline:</strong> ${timeline}
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


    // ====================================================
    // CLIENT CONFIRMATION EMAIL
    // ====================================================    


        await sendEmail({

        to: email,

        subject: "Your Project Enquiry Has Been Received",

        html: `

        <div style="font-family: Arial, sans-serif;">

            <h2>
                Thank You, ${name}!
            </h2>

            <p>
                We have received your project enquiry.
            </p>

            <p>
                Our team will review your requirements
                and contact you shortly.
            </p>

            <hr>

            <p>
                <strong>Service:</strong> ${service}
            </p>

            <p>
                <strong>Budget:</strong> ${budget}
            </p>

            <p>
                <strong>Timeline:</strong> ${timeline}
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

        res.status(201).json({ success: true, message: "Your project enquiry has been submitted successfully", data: lead});

    } catch (error) {

        console.log("Create Lead Error:", error);

        res.status(500).json({success: false, message: "Unable to submit enquiry", error: error.message});

    }
};

// ============================================================================
// GET ALL LEADS
// ADMIN
// ============================================================================

const getAllLeads=async(req, res)=>{

    try {

        const leads= await LeadModel.find().sort({ createdAt: -1 });

        res.status(200).json({success: true, message: "Leads fetched successfully", data: leads});

    } catch (error) {

        console.log("Get Leads Error:", error);

        res.status(500).json({success: false, message: "Unable to fetch leads", error: error.message});

    }
};

// ============================================================================
// GET SINGLE LEAD
// ADMIN
// ============================================================================

const getLeadById=async(req, res)=>{

    try {

        const lead= await LeadModel.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({success: false, message: "Lead not found"});

        }

        res.status(200).json({success: true, data: lead});

    } catch (error) {

        console.log("Get Lead Error:", error);

        res.status(500).json({success: false, message: "Unable to fetch lead", error: error.message});

    }
};

// ============================================================================
// UPDATE LEAD
// ADMIN
// ============================================================================

const updateLead=async(req, res)=>{

    try {

        const {status, adminNote}= req.body;

        const updatedLead= await LeadModel.findByIdAndUpdate(req.params.id,
                {
                    status,
                    adminNote
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedLead) {

            return res.status(404).json({success: false, message: "Lead not found"});

        }

        res.status(200).json({success: true, message: "Lead updated successfully", data: updatedLead});

    } catch (error) {

        console.log("Update Lead Error:", error);

        res.status(500).json({success: false, message: "Unable to update lead", error: error.message});

    }
};

// ============================================================================
// DELETE LEAD
// ADMIN
// ============================================================================

const deleteLead=async(req, res)=>{

    try {

        const deletedLead= await LeadModel.findByIdAndDelete(req.params.id);

        if (!deletedLead) {

            return res.status(404).json({success: false, message: "Lead not found"});

        }

        res.status(200).json({success: true, message: "Lead deleted successfully"});

    } catch (error) {

        console.log("Delete Lead Error:", error);

        res.status(500).json({success: false, message: "Unable to delete lead", error: error.message});

    }
};
module.exports={
            createLead,
            getAllLeads,
            getLeadById,
            updateLead,
            deleteLead
};