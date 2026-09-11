const jwt = require("jsonwebtoken");
const CA = require("../models/caModel");

const caAuth = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "CA authentication required"
            });

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "ca") {

            return res.status(403).json({
                success: false,
                message: "CA access only"
            });

        }

        const ca = await CA.findById(decoded.id).select("-password");

        if (!ca || !ca.isActive) {

            return res.status(401).json({
                success: false,
                message: "CA account is inactive or invalid"
            });

        }

        req.ca = ca;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired CA token"
        });

    }

};

module.exports = caAuth;