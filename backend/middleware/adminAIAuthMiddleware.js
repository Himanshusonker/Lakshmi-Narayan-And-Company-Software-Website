const jwt = require("jsonwebtoken");


// ============================================================
// ADMIN AUTHENTICATION
// ============================================================

const adminProtect = (req, res, next) => {
    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Admin authorization required",
            });
        }


        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format",
            });
        }


        const token =
            authHeader.split(" ")[1];


        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Admin token required",
            });
        }


        const decoded =
            jwt.verify(
                token,
                process.env.ADMIN_JWT_SECRET
            );


        if (
            decoded.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "Admin access required",
            });
        }


        req.admin = decoded;


        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message:
                "Invalid or expired admin token",
        });
    }
};


module.exports = {
    adminProtect,
};
