const jwt = require("jsonwebtoken");

const clientAuth=(req, res, next)=>{

    try {

        // ------------------------------------------------------
        // GET AUTHORIZATION HEADER
        // ------------------------------------------------------

        const authHeader= req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({success: false, message: "Authorization token required"});

        }


        // ------------------------------------------------------
        // CHECK BEARER
        // ------------------------------------------------------

        if (!authHeader.startsWith("Bearer ")) {

            return res.status(401).json({success: false, message: "Invalid authorization format"});

        }


        // ------------------------------------------------------
        // EXTRACT TOKEN
        // ------------------------------------------------------

        const token= authHeader.split(" ")[1];

        if (!token) {

            return res.status(401).json({success: false, message: "Authorization token required"});

        }


        // ------------------------------------------------------
        // VERIFY TOKEN
        // ------------------------------------------------------

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);


        // ------------------------------------------------------
        // CLIENT TOKEN CHECK
        // ------------------------------------------------------

        if (!decoded.clientId || decoded.role !== "client") 
        {

            return res.status(403).json({success: false, message: "Client access denied"});

        }


        // ------------------------------------------------------
        // ATTACH CLIENT TO REQUEST
        // ------------------------------------------------------

        req.client = decoded;
        next();

    } catch (error) {

        console.log("Client Auth Error:", error.message);

        return res.status(401).json({success: false, message: "Invalid or expired token"});

    }
};
module.exports= clientAuth;