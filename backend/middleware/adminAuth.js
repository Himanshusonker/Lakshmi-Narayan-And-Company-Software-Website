const jwt=require("jsonwebtoken");

// =================================================================================================
// ADMIN AUTHENTICATION
// =================================================================================================

const adminAuth=(req, res, next)=>{

    try {

        const authorization= req.headers.authorization;

        if (!authorization) {

            return res.status(401).json({success: false, message:"Authorization token required"});

        }

// -----------------------------------------------------------------------------------------
// BEARER TOKEN
// -----------------------------------------------------------------------------------------

        const token= authorization.startsWith("Bearer ") ? authorization.split(" ")[1]: null;

        if (!token) {

            return res.status(401).json({success: false, message:"Invalid authorization token"});

        }

// -----------------------------------------------------------------------------------------
// VERIFY TOKEN
// -----------------------------------------------------------------------------------------

        const decoded= jwt.verify(token, process.env.TOKEN_SECRET);

// -----------------------------------------------------------------------------------------
// ADMIN ROLE CHECK
// -----------------------------------------------------------------------------------------

        if (decoded.role !== "admin") {

            return res.status(403).json({success: false, message:"Admin access required"});

        }
        req.admin = decoded;
        next();
    } catch (error) {

        console.log("Admin Auth Error:", error.message);

        return res.status(401).json({success: false, message:"Invalid or expired token"});

    }
};
module.exports = adminAuth;