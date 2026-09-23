const Conversation = require("../models/conversationAIModel");
const Contact = require("../models/contactAIModel");
const Project = require("../models/projectAIModel");
const Service = require("../models/serviceAIModel");

// ============================================================
// ADMIN DASHBOARD
// GET /api/admin/dashboard
// ============================================================

const getDashboardStats = async (req, res) => {
    try {
        // --------------------------------------------------------
        // TOTAL COUNTS
        // --------------------------------------------------------

        const [
            totalLeads,
            totalAIConversations,
            totalProjects,
            totalServices,
            totalContacts,
        ] = await Promise.all([
            Contact.countDocuments(),

            Conversation.countDocuments(),

            Project.countDocuments(),

            Service.countDocuments(),

            Contact.countDocuments(),
        ]);

        // --------------------------------------------------------
        // RECENT ENQUIRIES
        // --------------------------------------------------------

        const recentEnquiries = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select(
                "name email phone company service budget projectDescription status createdAt"
            )
            .lean();

        // --------------------------------------------------------
        // RESPONSE
        // --------------------------------------------------------

        res.status(200).json({
            success: true,

            stats: {
                totalLeads,
                totalAIConversations,
                totalProjects,
                totalServices,
                totalContacts,
            },

            recentEnquiries,
        });
    } catch (error) {
        console.error(
            "Admin Dashboard Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard data",
            error: error.message,
        });
    }
};

module.exports = {
    getDashboardStats,
};
