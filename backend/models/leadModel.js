const mongoose = require("mongoose");

const leadSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            default: "",
            trim: true
        },

        service: {
            type: String,
            required: true,
            trim: true
        },

        budget: {
            type: String,
            default: ""
        },

        timeline: {
            type: String,
            default: ""
        },

        message: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: [
                "New",
                "Contacted",
                "In Progress",
                "Converted",
                "Closed"
            ],
            default: "New"
        },

        adminNote: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);
const LeadModel=mongoose.model("Lead", leadSchema);
module.exports=LeadModel;