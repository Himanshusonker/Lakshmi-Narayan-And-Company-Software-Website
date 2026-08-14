const mongoose = require("mongoose");

// ============================================================
// ABOUT PAGE SCHEMA
// ============================================================

const aboutSchema = new mongoose.Schema(
    {

        // ====================================================
        // HERO
        // ====================================================

        hero: {

            smallTitle: {
                type: String,
                default: "ABOUT US"
            },

            title: {
                type: String,
                required: true
            },

            highlightedTitle: {
                type: String,
                default: ""
            },

            description: {
                type: String,
                required: true
            },

            image: {
                type: String,
                default: ""
            }

        },


        // ====================================================
        // COMPANY INTRODUCTION
        // ====================================================

        company: {

            title: {
                type: String,
                required: true
            },

            description: {
                type: String,
                required: true
            },

            image: {
                type: String,
                default: ""
            }

        },


        // ====================================================
        // MISSION
        // ====================================================

        mission: {

            title: {
                type: String,
                default: "Our Mission"
            },

            description: {
                type: String,
                default: ""
            },

            icon: {
                type: String,
                default: "🎯"
            }

        },


        // ====================================================
        // VISION
        // ====================================================

        vision: {

            title: {
                type: String,
                default: "Our Vision"
            },

            description: {
                type: String,
                default: ""
            },

            icon: {
                type: String,
                default: "👁️"
            }

        },


        // ====================================================
        // VALUES
        // ====================================================

        values: [

            {

                title: {
                    type: String,
                    required: true
                },

                description: {
                    type: String,
                    required: true
                },

                icon: {
                    type: String,
                    default: "✓"
                }

            }

        ],


        // ====================================================
        // WHY CHOOSE US
        // ====================================================

        whyChooseUs: {

            title: {
                type: String,
                default: "Why Choose Lakshmi Narayan And Company?"
            },

            description: {
                type: String,
                default: ""
            },

            points: [

                {
                    type: String
                }

            ]

        },


        // ====================================================
        // CTA
        // ====================================================

        cta: {

            title: {
                type: String,
                default: "Let's Build Something Amazing Together"
            },

            description: {
                type: String,
                default: ""
            },

            buttonText: {
                type: String,
                default: "Start Your Project"
            },

            buttonLink: {
                type: String,
                default: "/contact"
            }

        }

    },

    {
        timestamps: true
    }

);
const AboutModel = mongoose.model(
    "AboutPage",
    aboutSchema
);


module.exports = AboutModel;