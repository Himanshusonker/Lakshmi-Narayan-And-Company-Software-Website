const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
    {
        planName: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        category: {
            type: String,
            enum: ["AI", "Web", "Software", "Custom"],
            default: "AI",
        },

        price: {
            type: Number,
            default: 0,
        },

        priceLabel: {
            type: String,
            default: "",
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        features: {
            type: [String],
            default: [],
        },

        isPopular: {
            type: Boolean,
            default: false,
        },

        isCustom: {
            type: Boolean,
            default: false,
        },

        buttonText: {
            type: String,
            default: "Get Started",
        },

        buttonLink: {
            type: String,
            default: "/contactai",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Pricingai",
    pricingSchema,
    "pricingsai"
);

