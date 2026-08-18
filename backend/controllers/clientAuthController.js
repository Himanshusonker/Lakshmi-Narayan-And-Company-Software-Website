const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ClientCompany = require("../models/clientCompanyModel");


// ============================================================
// CLIENT REGISTER
// ============================================================

const clientRegister = async (req, res) => {

    try {

        const {companyName, contactPerson, email, phone, password, confirmPassword, address, gstNumber}= req.body;

        // ------------------------------------------------------
        // REQUIRED FIELDS
        // ------------------------------------------------------

        if (!companyName || !contactPerson || !email || !phone || !password || !confirmPassword) {

            return res.status(400).json({success: false, message: "Please fill all required fields"});

        }


        // ------------------------------------------------------
        // PASSWORD MATCH
        // ------------------------------------------------------

        if (password !== confirmPassword) {

            return res.status(400).json({success: false, message: "Passwords do not match"});

        }


        // ------------------------------------------------------
        // PASSWORD LENGTH
        // ------------------------------------------------------

        if (password.length < 6) {

            return res.status(400).json({success: false, message: "Password must be at least 6 characters"});

        }


        // ------------------------------------------------------
        // CHECK EMAIL
        // ------------------------------------------------------

        const existingClient = await ClientCompany.findOne({email: email.toLowerCase().trim()});

        if (existingClient) {

            return res.status(409).json({success: false, message: "Company with this email already exists"});

        }


        // ------------------------------------------------------
        // HASH PASSWORD
        // ------------------------------------------------------

        const hashedPassword = await bcrypt.hash(password, 10);


        // ------------------------------------------------------
        // CREATE CLIENT
        // ------------------------------------------------------

        const client = await ClientCompany.create({

            companyName: companyName.trim(),
            contactPerson: contactPerson.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            password: hashedPassword,
            address: address ? address.trim() : "",
            gstNumber: gstNumber ? gstNumber.trim() : ""

        });


        return res.status(201).json({ success: true, message: "Company registration successful",

            client: {
                id: client._id,
                companyName: client.companyName,
                contactPerson: client.contactPerson,
                email: client.email,
                phone: client.phone
            }
        });


    } catch (error) {

        console.log("Client Register Error:", error);

        return res.status(500).json({success: false, message: "Server error during registration"});

    }
};


// ============================================================
// CLIENT LOGIN
// ============================================================

const clientLogin = async (req, res) => {

    try {

        const {email, password} = req.body;


        // ------------------------------------------------------
        // VALIDATION
        // ------------------------------------------------------

        if (!email || !password) {

            return res.status(400).json({ success: false, message: "Email and password are required"});

        }


        // ------------------------------------------------------
        // FIND CLIENT
        // ------------------------------------------------------

        const client = await ClientCompany.findOne({email: email.toLowerCase().trim()});

        if (!client) {

            return res.status(401).json({success: false, message: "Invalid email or password"});

        }


        // ------------------------------------------------------
        // ACTIVE CHECK
        // ------------------------------------------------------

        if (!client.isActive) {

            return res.status(403).json({success: false, message: "Your company account has been disabled"});

        }


        // ------------------------------------------------------
        // CHECK PASSWORD
        // ------------------------------------------------------

        const passwordMatch = await bcrypt.compare(password, client.password);

        if (!passwordMatch) {

            return res.status(401).json({success: false, message: "Invalid email or password"});

        }


        // ------------------------------------------------------
        // JWT SECRET
        // ------------------------------------------------------

        if (!process.env.TOKEN_SECRET) {

            console.log("TOKEN_SECRET is missing");

            return res.status(500).json({success: false, message: "Server authentication configuration missing"});

        }


        // ------------------------------------------------------
        // CREATE TOKEN
        // ------------------------------------------------------

        const token= jwt.sign(
            {
                clientId: client._id.toString(),
                email: client.email,
                role: "client"
            },

            process.env.TOKEN_SECRET,
            {
                expiresIn: "7d"
            }
        );


        // ------------------------------------------------------
        // RESPONSE
        // ------------------------------------------------------

        return res.status(200).json({success: true, message: "Login successful", token,

            client: {

                id: client._id,

                companyName: client.companyName,

                contactPerson: client.contactPerson,

                email: client.email,

                phone: client.phone,

                address: client.address,

                gstNumber: client.gstNumber

            }

        });


    } catch (error) {

        console.log("Client Login Error:", error);

        return res.status(500).json({ success: false, message: "Server error during login"});

    }
};
module.exports={
        clientRegister,
        clientLogin
};