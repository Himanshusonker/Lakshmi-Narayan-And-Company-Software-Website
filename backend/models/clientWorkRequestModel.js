const mongoose = require("mongoose");

const clientWorkRequestSchema = new mongoose.Schema(
    {

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClientCompany",
            required: true
        },

        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true
        },

        serviceName: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            default: "",
            trim: true
        },

        requirement: {
            type: String,
            required: true,
            trim: true
        },

        attachments: [
            {
                name: {
                    type: String,
                    default: ""
                },

                originalName: {
                    type: String,
                    default: ""
                },

                url: {
                    type: String,
                    default: ""
                },

                publicId: {
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

                uploadedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        status: {
            type: String,
            enum: [
                "Pending",
                "Under Review",
                "Approved",
                "In Progress",
                "Completed",
                "Rejected",
                "Cancelled"
            ],
            default: "Pending"
        },

        priority: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High",
                "Urgent"
            ],
            default: "Medium"
        },

        adminNotes: {
            type: String,
            default: ""
        }

    },
    {
        timestamps: true
    }
);
module.exports=mongoose.model("ClientWorkRequest", clientWorkRequestSchema);