const CA = require("../models/caModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================================
// CREATE CA
// ==========================================

const createCA = async (req, res) => {

    try {

        const {
            name,
            email,
            username,
            password
        } = req.body;

        if (!name || !email || !username || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const existingCA = await CA.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (existingCA) {

            return res.status(400).json({
                success: false,
                message: "Email or username already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const ca = await CA.create({

            name,
            email,
            username,

            password: hashedPassword,

            role: "ca",

            isActive: true

        });

        res.status(201).json({

            success: true,

            message: "CA registered successfully",

            ca: {
                _id: ca._id,
                name: ca.name,
                email: ca.email,
                username: ca.username,
                role: ca.role,
                isActive: ca.isActive
            }

        });

    } catch (error) {

        console.error("Create CA Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create CA"
        });

    }

};


// ==========================================
// GET ALL CA
// ==========================================

const getAllCA = async (req, res) => {

    try {

        const cas = await CA.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.json({

            success: true,

            cas

        });

    } catch (error) {

        console.error("Get CA Error:", error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch CA"

        });

    }

};


// ==========================================
// DELETE / DEACTIVATE CA
// ==========================================

const toggleCAStatus = async (req, res) => {

    try {

        const ca = await CA.findById(req.params.id);

        if (!ca) {

            return res.status(404).json({

                success: false,

                message: "CA not found"

            });

        }

        ca.isActive = !ca.isActive;

        await ca.save();

        res.json({

            success: true,

            message: `CA ${ca.isActive ? "activated" : "deactivated"} successfully`,

            ca

        });

    } catch (error) {

        console.error("Toggle CA Error:", error);

        res.status(500).json({

            success: false,

            message: "Failed to update CA"

        });

    }

};


// ==========================================
// CA LOGIN
// ==========================================

const caLogin = async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        const ca = await CA.findOne({
            username
        });

        if (!ca) {

            return res.status(401).json({

                success: false,

                message: "Invalid login credentials"

            });

        }

        if (!ca.isActive) {

            return res.status(403).json({

                success: false,

                message: "Your CA account is inactive"

            });

        }

        const passwordMatch = await bcrypt.compare(
            password,
            ca.password
        );

        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid login credentials"

            });

        }

        ca.lastLogin = new Date();

        await ca.save();

        const token = jwt.sign(

            {
                id: ca._id,
                role: "ca"
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.json({

            success: true,

            message: "CA login successful",

            token,

            ca: {
                _id: ca._id,
                name: ca.name,
                email: ca.email,
                username: ca.username,
                role: "ca"
            }

        });

    } catch (error) {

        console.error("CA Login Error:", error);

        res.status(500).json({

            success: false,

            message: "CA login failed"

        });

    }

};


module.exports = {

    createCA,
    getAllCA,
    toggleCAStatus,
    caLogin

};