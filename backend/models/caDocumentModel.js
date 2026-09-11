const mongoose = require("mongoose");

const caDocumentSchema = new mongoose.Schema(
    {
        ca: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CA",
            required: true
        },

        // ==========================================
        // WHO SENT THIS?
        // ==========================================

        sender: {
            type: String,
            enum: [
                "CA",
                "ADMIN"
            ],
            required: true,
            default: "CA"
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            default: "",
            trim: true
        },

        fileName: {
            type: String,
            default: "" 
        },

        filePath: {
            type: String,
            default: ""
        },

        fileType: {
            type: String,
            default: ""
        },

        fileSize: {
            type: Number,
            default: 0
        },

        adminIsRead: { 
            type: Boolean, 
            default: false 
        },

        caIsRead: { 
            type: Boolean, 
            default: false 
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("CADocument", caDocumentSchema);