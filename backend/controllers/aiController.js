const crypto = require("crypto");

const Conversation = require("../models/conversationAIModel");
const { generateAIResponse } = require("../services/aiService");

const chatWithAI = async (req, res) => {
    try {
        const {
            message,
            sessionId,
            userName = "",
            userEmail = "",
        } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const currentSessionId =
            sessionId || crypto.randomUUID();

        let conversation = await Conversation.findOne({
            sessionId: currentSessionId,
        });

        if (!conversation) {
            conversation = new Conversation({
                sessionId: currentSessionId,
                userName,
                userEmail,
                messages: [],
            });
        }

        if (userName) {
            conversation.userName = userName;
        }

        if (userEmail) {
            conversation.userEmail = userEmail;
        }

        conversation.messages.push({
            role: "user",
            content: message.trim(),
        });

        const recentMessages = conversation.messages
            .slice(-12)
            .map((item) => ({
                role: item.role,
                content: item.content,
            }));

        const aiReply = await generateAIResponse(
            recentMessages
        );

        conversation.messages.push({
            role: "assistant",
            content: aiReply,
        });

        await conversation.save();

        return res.status(200).json({
            success: true,
            sessionId: currentSessionId,
            reply: aiReply,
        });
    } catch (error) {
        console.error(
            "AI Chat Error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "AI assistant is currently unavailable",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};

const getConversation = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const conversation = await Conversation.findOne({
            sessionId,
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        return res.status(200).json({
            success: true,
            conversation,
        });
    } catch (error) {
        console.error(
            "Get Conversation Error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Unable to get conversation",
        });
    }
};

module.exports = {
    chatWithAI,
    getConversation,
};