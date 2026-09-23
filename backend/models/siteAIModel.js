const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
    {
        siteName: {
            type: String,
            required: true,
            trim: true
        },

        tagline: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            default: "",
            trim: true
        },

        phone: {
            type: String,
            default: "",
            trim: true
        },

        address: {
            type: String,
            default: ""
        },

        website: {
            type: String,
            default: ""
        },

        logo: {
            type: String,
            default: ""
        },

        socialLinks: {
            linkedin: {
                type: String,
                default: ""
            },

            facebook: {
                type: String,
                default: ""
            },

            instagram: {
                type: String,
                default: ""
            },

            twitter: {
                type: String,
                default: ""
            },

            youtube: {
                type: String,
                default: ""
            }
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

module.exports = mongoose.model("Site", siteSchema);