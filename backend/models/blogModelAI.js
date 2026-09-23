const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
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

        excerpt: {
            type: String,
            default: "",
            trim: true,
        },

        content: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            default: "AI & Technology",
            trim: true,
        },

        author: {
            type: String,
            default: "Lakshmi Narayan and Company",
            trim: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        readTime: {
            type: String,
            default: "5 min read",
        },

        published: {
            type: Boolean,
            default: false,
        },

        publishedAt: {
            type: Date,
            default: null,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Blogai",
    blogSchema,
    "blogsai"
);

