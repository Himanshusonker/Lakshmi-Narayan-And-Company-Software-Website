const Conversation = require("../models/conversationAIModel");
const Service = require("../models/serviceAIModel");
const AISolution = require("../models/aiSolutionModel");

// ============================================================
// HELPER: FIND OR CREATE CONVERSATION
// ============================================================

const getOrCreateConversation = async (sessionId) => {
    let conversation = await Conversation.findOne({
        sessionId,
    });

    if (!conversation) {
        conversation = await Conversation.create({
            sessionId,
            messages: [],
            source: "website",
            status: "active",
        });
    }

    return conversation;
};


// ============================================================
// HELPER: REQUIREMENT ANALYSIS
// ============================================================

const analyzeRequirement = (message) => {
    const text = message.toLowerCase();

    let projectType = "Custom Software";

    let recommendedCategory = "Software Development";

    let requirementType = "general";

    // --------------------------------------------------------
    // ECOMMERCE
    // --------------------------------------------------------

    if (
        text.includes("ecommerce") ||
        text.includes("e-commerce") ||
        text.includes("online store") ||
        text.includes("online shop") ||
        text.includes("shopping website")
    ) {
        projectType = "E-commerce Website";

        recommendedCategory = "Web Development";

        requirementType = "ecommerce";
    }

    // --------------------------------------------------------
    // WEBSITE
    // --------------------------------------------------------

    else if (
        text.includes("website") ||
        text.includes("web site") ||
        text.includes("web development")
    ) {
        projectType = "Website";

        recommendedCategory = "Web Development";

        requirementType = "website";
    }

    // --------------------------------------------------------
    // SOFTWARE
    // --------------------------------------------------------

    else if (
        text.includes("software") ||
        text.includes("management system") ||
        text.includes("erp") ||
        text.includes("crm")
    ) {
        projectType = "Business Software";

        recommendedCategory = "Software Development";

        requirementType = "software";
    }

    // --------------------------------------------------------
    // AI
    // --------------------------------------------------------

    else if (
        text.includes("ai") ||
        text.includes("artificial intelligence") ||
        text.includes("chatbot") ||
        text.includes("automation")
    ) {
        projectType = "AI Solution";

        recommendedCategory = "AI Development";

        requirementType = "ai";
    }

    // --------------------------------------------------------
    // MOBILE APP
    // --------------------------------------------------------

    else if (
        text.includes("mobile app") ||
        text.includes("android app") ||
        text.includes("ios app")
    ) {
        projectType = "Mobile Application";

        recommendedCategory = "Software Development";

        requirementType = "mobile";
    }

    return {
        projectType,
        recommendedCategory,
        requirementType,
    };
};


// ============================================================
// HELPER: GENERATE AI RESPONSE
// ============================================================

const generateAssistantResponse = async (message) => {
    const analysis = analyzeRequirement(message);

    // --------------------------------------------------------
    // ECOMMERCE
    // --------------------------------------------------------

    if (analysis.requirementType === "ecommerce") {
        return {
            ...analysis,

            response:
                "I can recommend an ecommerce solution with product management, payment gateway, admin panel and order management.",

            followUpQuestion:
                "What type of products do you sell?",

            showQuoteButton: true,
        };
    }

    // --------------------------------------------------------
    // WEBSITE
    // --------------------------------------------------------

    if (analysis.requirementType === "website") {
        return {
            ...analysis,

            response:
                "We can build a professional responsive website tailored to your business.",

            followUpQuestion:
                "What type of business or service is the website for?",

            showQuoteButton: true,
        };
    }

    // --------------------------------------------------------
    // SOFTWARE
    // --------------------------------------------------------

    if (analysis.requirementType === "software") {
        return {
            ...analysis,

            response:
                "We can build custom business software with authentication, database, dashboards and workflow automation.",

            followUpQuestion:
                "What type of business process do you want the software to manage?",

            showQuoteButton: true,
        };
    }

    // --------------------------------------------------------
    // AI
    // --------------------------------------------------------

    if (analysis.requirementType === "ai") {
        return {
            ...analysis,

            response:
                "We can build a custom AI solution such as an AI chatbot, AI assistant, automation system or AI-powered business application.",

            followUpQuestion:
                "What task or business process would you like AI to handle?",

            showQuoteButton: true,
        };
    }

    // --------------------------------------------------------
    // MOBILE
    // --------------------------------------------------------

    if (analysis.requirementType === "mobile") {
        return {
            ...analysis,

            response:
                "We can develop a custom mobile application with backend APIs, database and admin management.",

            followUpQuestion:
                "What is the main purpose of your mobile application?",

            showQuoteButton: true,
        };
    }

    // --------------------------------------------------------
    // DEFAULT
    // --------------------------------------------------------

    return {
        ...analysis,

        response:
            "I'd be happy to understand your project and recommend a suitable solution.",

        followUpQuestion:
            "What would you like to build?",

        showQuoteButton: false,
    };
};


// ============================================================
// POST /api/ai-assistant/message
// ============================================================

const sendAssistantMessage = async (req, res) => {
    try {
        const {
            sessionId,
            message,
            userName,
            userEmail,
        } = req.body;

        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "sessionId is required",
            });
        }

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        // ----------------------------------------------------
        // CONVERSATION
        // ----------------------------------------------------

        const conversation =
            await getOrCreateConversation(sessionId);

        // ----------------------------------------------------
        // SAVE USER MESSAGE
        // ----------------------------------------------------

        conversation.messages.push({
            role: "user",
            message: message.trim(),
        });

        if (userName) {
            conversation.userName = userName;
        }

        if (userEmail) {
            conversation.userEmail = userEmail;
        }

        // ----------------------------------------------------
        // AI RESPONSE
        // ----------------------------------------------------

        const aiResult =
            await generateAssistantResponse(
                message.trim()
            );

        // ----------------------------------------------------
        // COMPLETE RESPONSE
        // ----------------------------------------------------

        let assistantMessage =
            aiResult.response;

        if (aiResult.followUpQuestion) {
            assistantMessage +=
                ` ${aiResult.followUpQuestion}`;
        }

        // ----------------------------------------------------
        // SAVE ASSISTANT MESSAGE
        // ----------------------------------------------------

        conversation.messages.push({
            role: "assistant",
            message: assistantMessage,
        });

        await conversation.save();

        // ----------------------------------------------------
        // RESPONSE
        // ----------------------------------------------------

        res.status(200).json({
            success: true,

            sessionId,

            message: assistantMessage,

            analysis: {
                projectType:
                    aiResult.projectType,

                recommendedCategory:
                    aiResult.recommendedCategory,

                requirementType:
                    aiResult.requirementType,
            },

            showQuoteButton:
                aiResult.showQuoteButton,

            conversationId:
                conversation._id,
        });
    } catch (error) {
        console.error(
            "AI Assistant Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "AI Assistant failed",
            error: error.message,
        });
    }
};


// ============================================================
// GET CONVERSATION
// ============================================================

const getConversation = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const conversation =
            await Conversation.findOne({
                sessionId,
            });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message:
                    "Conversation not found",
            });
        }

        res.status(200).json({
            success: true,
            conversation,
        });
    } catch (error) {
        console.error(
            "Get Conversation Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to get conversation",
            error: error.message,
        });
    }
};


// ============================================================
// CLOSE CONVERSATION
// ============================================================

const closeConversation = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const conversation =
            await Conversation.findOneAndUpdate(
                { sessionId },
                {
                    status: "closed",
                },
                {
                    new: true,
                }
            );

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message:
                    "Conversation not found",
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Conversation closed",
            conversation,
        });
    } catch (error) {
        console.error(
            "Close Conversation Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to close conversation",
            error: error.message,
        });
    }
};


module.exports = {
    sendAssistantMessage,
    getConversation,
    closeConversation,
};
