const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminModel = require("../models/adminModel");


// =================================================================================================
// CREATE ADMIN
// =================================================================================================

const createAdmin = async (req, res) => {

    try {

        const { name, email, password } = req.body;


// -----------------------------------------------------------------------------------------
// VALIDATION
// -----------------------------------------------------------------------------------------

        if (!name || !email || !password) {

            return res.status(400).json({success: false, message:"Name, email and password are required"});

        }

// -----------------------------------------------------------------------------------------
// CHECK EXISTING ADMIN
// -----------------------------------------------------------------------------------------

        const existingAdmin= await AdminModel.findOne({ email });

        if (existingAdmin) {

            return res.status(400).json({success: false, message:"Admin with this email already exists"});

        }

// -----------------------------------------------------------------------------------------
// PASSWORD HASH
// -----------------------------------------------------------------------------------------

        const hashedPassword= await bcrypt.hash(password, 10);

// -----------------------------------------------------------------------------------------
// CREATE ADMIN
// -----------------------------------------------------------------------------------------

        const admin= await AdminModel.create({ name, email, password: hashedPassword, role: "admin" });

        res.status(201).json({ success: true, message:"Admin created successfully", data: 
            {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    }

    catch (error) {
        console.log("Create Admin Error:", error );

        res.status(500).json({success: false, message:"Unable to create admin", error: error.message });

    }
};

// =================================================================================================
// ADMIN LOGIN
// =================================================================================================

const adminLogin = async (req, res)=>{

    try {

        const { email, password } = req.body;

// -----------------------------------------------------------------------------------------
// VALIDATION
// -----------------------------------------------------------------------------------------

        if (!email || !password) {

            return res.status(400).json({ success: false, message:"Email and password are required"});

        }

// -----------------------------------------------------------------------------------------
// FIND ADMIN
// -----------------------------------------------------------------------------------------

        const admin= await AdminModel.findOne({ email });

        if (!admin) {

            return res.status(401).json({success: false, message:"Invalid email or password"});

        }

// -----------------------------------------------------------------------------------------
// PASSWORD CHECK
// -----------------------------------------------------------------------------------------

        const passwordMatch= await bcrypt.compare( password, admin.password );

        if (!passwordMatch) {

            return res.status(401).json({success: false, message:"Invalid email or password"});

        }

// -----------------------------------------------------------------------------------------
// JWT TOKEN
// -----------------------------------------------------------------------------------------

        const token= jwt.sign({adminId: admin._id, email: admin.email, role: admin.role},

                process.env.TOKEN_SECRET,
                {
                    expiresIn: "1d"
                }
            );

// -----------------------------------------------------------------------------------------
// RESPONSE
// -----------------------------------------------------------------------------------------

        res.status(200).json({success: true, message:"Admin login successful", token, admin:
            {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {

        console.log("Admin Login Error:", error );

        res.status(500).json({success: false, message:"Unable to login", error: error.message});

    }
};

// =================================================================================================
// GET LOGGED-IN ADMIN
// =================================================================================================

const getAdminProfile= async(req, res)=>{

    try {

        const admin= await AdminModel.findById(req.admin.adminId).select("-password");

        if (!admin) {

            return res.status(404).json({success: false, message:"Admin not found"});

        }

        res.status(200).json({success: true, data: admin});

    } catch (error) {

        console.log("Admin Profile Error:", error);

        res.status(500).json({success: false, message:"Unable to get admin profile"});
    }
};
module.exports={
            createAdmin,
            adminLogin,
            getAdminProfile
};