const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        designation: {
            type: String,
            default: "",
            trim: true,
        },

        company: {
            type: String,
            default: "",
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
        },

        isFeatured: {
            type: Boolean,
            default: false,
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
    "Testimonialai",
    testimonialSchema,
    "testimonialsai"
);

