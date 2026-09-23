const Site = require("../models/siteAIModel");


// =========================================================
// GET SITE SETTINGS
// =========================================================

const getSiteSettings = async (req, res) => {

    try {

        let site = await Site.findOne({
            isActive: true
        }).lean();

        // Create default site settings if not available
        if (!site) {

            site = await Site.create({
                siteName: "AI Website",

                tagline: "Build Smarter With AI",

                description:
                    "Intelligent AI solutions for modern businesses.",

                email: "info@example.com",

                phone: "",

                address: "",

                website: "",

                logo: "",

                socialLinks: {
                    linkedin: "",
                    facebook: "",
                    instagram: "",
                    twitter: "",
                    youtube: ""
                },

                isActive: true
            });

        }

        return res.status(200).json({
            success: true,
            message: "Site settings fetched successfully.",
            data: site
        });

    } catch (error) {

        console.error(
            "Get Site Settings Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch site settings."
        });
    }
};


// =========================================================
// CREATE SITE SETTINGS
// =========================================================

const createSiteSettings = async (req, res) => {

    try {

        const existingSite = await Site.findOne();

        if (existingSite) {

            return res.status(409).json({
                success: false,
                message: "Site settings already exist."
            });
        }

        const site = await Site.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Site settings created successfully.",
            data: site
        });

    } catch (error) {

        console.error(
            "Create Site Settings Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create site settings."
        });
    }
};


// =========================================================
// UPDATE SITE SETTINGS
// =========================================================

const updateSiteSettings = async (req, res) => {

    try {

        const site = await Site.findOneAndUpdate(
            {},
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!site) {

            return res.status(404).json({
                success: false,
                message: "Site settings not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Site settings updated successfully.",
            data: site
        });

    } catch (error) {

        console.error(
            "Update Site Settings Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update site settings."
        });
    }
};


module.exports = {
    getSiteSettings,
    createSiteSettings,
    updateSiteSettings
};