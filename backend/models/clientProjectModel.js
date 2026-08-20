const mongoose = require("mongoose");

const projectDocumentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            enum: [
                "Agreement",
                "Invoice",
                "Report",
                "Proposal",
                "Requirement",
                "Design",
                "Source Code",
                "Certificate",
                "Other"
            ],
            default: "Other",
            trim: true
        },

        originalName: {
            type: String,
            default: ""
        },

        url: {
            type: String,
            required: true,
            trim: true
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

         resourceType: {
            type: String,
            enum: ["image", "raw", "video", "auto"],
            default: "raw"
        },

        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: true
    }
);

const clientProjectSchema=new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClientCompany",
            required: true
        },

        projectName: {
            type: String,
            required: true,
            trim: true
        },

        projectDescription: {
            type: String,
            trim: true,
            default: ""
        },

        projectType: {
            type: String,
            trim: true,
            default: ""
        },

        startDate: {
            type: Date,
            required: true
        },

        deadline: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Not Started",
                "In Progress",
                "On Hold",
                "Completed",
                "Cancelled"
            ],
            default: "Not Started"
        },

        progress: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        totalPages: {
            type: Number,
            default: 0,
            min: 0
        },

        completedPages: {
            type: Number,
            default: 0,
            min: 0
        },

        remainingPages: {
            type: Number,
            default: 0,
            min: 0
        },

        technologies: {
            type: [String],
            default: []
        },

        projectUrl: {
            type: String,
            trim: true,
            default: ""
        },

        notes: {
            type: String,
            trim: true,
            default: ""
        },

        // ==================================================
        // PROJECT DOCUMENTS
        // ==================================================

        documents: {
            type: [projectDocumentSchema],
            default: []
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// ======================================================
// AUTOMATICALLY CALCULATE REMAINING PAGES
// ======================================================

clientProjectSchema.pre("save", function (next) {

    this.remainingPages = Math.max(
        0,
        Number(this.totalPages || 0) - Number(this.completedPages || 0)
        // this.totalPages - this.completedPages
    );

    next();
});
module.exports=mongoose.model("ClientProject", clientProjectSchema);