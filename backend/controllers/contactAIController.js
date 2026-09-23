const Contact = require("../models/contactAIModel");


// =========================================================
// CREATE CONTACT / PROJECT REQUEST
// POST /api/contact
// =========================================================

const createContact = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            company,
            service,
            budget,
            projectDescription,
        } = req.body;

        // Required field validation
        if (
            !name ||
            !email ||
            !service ||
            !projectDescription
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Name, email, service and project description are required.",
            });
        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            company,
            service,
            budget,
            projectDescription,
        });

        return res.status(201).json({
            success: true,
            message:
                "Your project request has been submitted successfully. Our team will contact you soon.",
            data: contact,
        });

    } catch (error) {

        console.error(
            "Create Contact Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error while submitting your project request.",
        });
    }
};


// =========================================================
// GET ALL CONTACT REQUESTS
// GET /api/contact
// =========================================================

const getAllContacts = async (req, res) => {
    try {

        const contacts = await Contact.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });

    } catch (error) {

        console.error(
            "Get Contacts Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error while fetching contact requests.",
        });
    }
};


// =========================================================
// GET SINGLE CONTACT
// GET /api/contact/:id
// =========================================================

const getContactById = async (req, res) => {
    try {

        const contact = await Contact.findById(
            req.params.id
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact request not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: contact,
        });

    } catch (error) {

        console.error(
            "Get Contact Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error while fetching contact request.",
        });
    }
};


// =========================================================
// UPDATE CONTACT STATUS
// PUT /api/contact/:id
// =========================================================

const updateContactStatus = async (req, res) => {
    try {

        const { status } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact request not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact status updated successfully.",
            data: contact,
        });

    } catch (error) {

        console.error(
            "Update Contact Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error while updating contact request.",
        });
    }
};


// =========================================================
// DELETE CONTACT
// DELETE /api/contact/:id
// =========================================================

const deleteContact = async (req, res) => {
    try {

        const contact = await Contact.findByIdAndDelete(
            req.params.id
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact request not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact request deleted successfully.",
        });

    } catch (error) {

        console.error(
            "Delete Contact Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error while deleting contact request.",
        });
    }
};


module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContactStatus,
    deleteContact,
};
