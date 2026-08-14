const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        designation: {
            type: String,
            default: ""
        },

        message: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            default: 5,
            min: 1,
            max: 5
        },

        image: {
            type: String,
            default: ""
        },

        isPublished: {
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

const TestimonialModel=mongoose.model("Testimonial", testimonialSchema);
module.exports=TestimonialModel;