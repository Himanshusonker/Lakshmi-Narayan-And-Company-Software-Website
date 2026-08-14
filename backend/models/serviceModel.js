const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
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

        shortDescription: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        icon: {
            type: String,
            default: "💻"
        },

        image: {
            type: String,
            default: ""
        },

        features: [
            {
                type: String
            }
        ],

        technologies: [
            {
                type: String
            }
        ],

        process: [
            {
                step: {
                    type: String,
                    required: true
                },

                description: {
                    type: String,
                    required: true
                }
            }
        ],

        benefits: [
            {
                type: String
            }
        ],

        buttonText: {
            type: String,
            default: "Get Started"
        },

        buttonLink: {
            type: String,
            default: "/contact"
        },

        isActive: {
            type: Boolean,
            default: true
        },

        order: {
            type: Number,
            default: 0
        }
    },

    {
        timestamps: true
    }
);

const ServiceModel = mongoose.model(
    "Service",
    serviceSchema
);

module.exports = ServiceModel;