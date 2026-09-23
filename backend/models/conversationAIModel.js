const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["user", "assistant", "system"],
            required: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        timestamp: { 
            type: Date, 
            default: Date.now, 
        },
    },
    {
        _id: true,
    }
);

const conversationSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            index: true,
            index: true, 
            trim: true,
        },

        userName: {
            type: String,
            default: "",
            trim: true,
        },

        userEmail: {
            type: String,
            default: "",
            trim: true,
            lowercase: true,
        },

        messages: {
            type: [messageSchema],
            default: [],
        },

        source: { 
            type: String, 
            enum: [
                "website", 
                "contact", 
                "admin"
            ], 
            default: "website", 
        },

        status: {
            type: String,
            enum: ["active", "closed"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("AIConversation", conversationSchema, "AIConversations");