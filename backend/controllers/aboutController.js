const AboutModel = require("../models/aboutModel");


// ============================================================
// GET ABOUT PAGE
// ============================================================

const getAboutData=async(req, res)=>{

    try {

        const aboutData = await AboutModel.findOne();

        if (!aboutData) {

            return res.status(404).json({success: false, message: "About page data not found"});

        }

        res.status(200).json({ success: true, message: "About page data fetched successfully", data: aboutData});

    } catch (error) {

        console.log("Get About Page Error:", error);

        res.status(500).json({success: false, message: "Internal Server Error", error: error.message});

    }
};

// ============================================================
// CREATE ABOUT PAGE
// ============================================================

const createAboutData=async(req, res)=>{

    try {

        const existingAbout= await AboutModel.findOne();

        if (existingAbout) {

            return res.status(400).json({success: false, message:"About page data already exists"});

        }

        const aboutData= await AboutModel.create(req.body);

        res.status(201).json({success: true, message:"About page created successfully", data: aboutData});

    } catch (error) {

        console.log("Create About Page Error:", error);

        res.status(500).json({success: false, message:"Unable to create about page", error: error.message});

    }
};

// ============================================================
// UPDATE ABOUT PAGE
// ============================================================

const updateAboutData=async(req, res)=>{

    try {

        const aboutData= await AboutModel.findOne();

        if (!aboutData) {

            return res.status(404).json({success: false, message:"About page data not found"});

        }

        const updatedData= await AboutModel.findByIdAndUpdate(aboutData._id, req.body,

                {
                    new: true,
                    runValidators: true
                }
            );

        res.status(200).json({success: true, message:"About page updated successfully", data: updatedData});

    } catch (error) {

        console.log("Update About Page Error:", error);

        res.status(500).json({success: false, message:"Unable to update about page", error: error.message});

    }
};
module.exports={
            getAboutData,
            createAboutData,
            updateAboutData
};