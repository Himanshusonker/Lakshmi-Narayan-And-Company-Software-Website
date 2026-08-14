const mongoose = require("mongoose");

// ============================================================
// PROJECT SCHEMA
// ============================================================

const projectSchema=new mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
            trim: true
        },


        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },


        category: {
            type: String,
            required: true,
            trim: true
        },


        shortDescription: {
            type: String,
            required: true
        },


        description: {
            type: String,
            required: true
        },


        image: {
            type: String,
            required: true
        },


        gallery: [
            {
                type: String
            }
        ],


        client: {
            type: String,
            default: ""
        },


        technologies: [
            {
                type: String
            }
        ],


        features: [
            {
                type: String
            }
        ],


        results: [
            {
                type: String
            }
        ],


        projectUrl: {
            type: String,
            default: ""
        },


        buttonText: {
            type: String,
            default: "View Project"
        },


        buttonLink: {
            type: String,
            default: "/contact"
        },


        order: {
            type: Number,
            default: 0
        },


        isPublished: {
            type: Boolean,
            default: true
        }

    },

    {
        timestamps: true
    }
);
const ProjectModel=mongoose.model("Project", projectSchema);
module.exports= ProjectModel;