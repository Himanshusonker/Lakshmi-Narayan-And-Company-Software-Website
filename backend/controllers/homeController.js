const HomeModel = require("../models/homeModel");

// ===================================================================================================
// GET HOME PAGE DATA
// ===================================================================================================

const getHomeData = async (req, res) => {

    try {

        const homeData = await HomeModel.findOne();

        if (!homeData)
        {
            return res.status(404).json({ success: false, message: "Home page data not found" });
        }

        res.status(200).json({ success: true, message: "Home page data fetched successfully", data: homeData });

    } catch (error) {
        console.log("Home Page Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// ===================================================================================================
//                                      CREATE HOME PAGE DATA
// ===================================================================================================

const createHomeData = async (req, res) => {

    try {

        const existingHome = await HomeModel.findOne();

        if (existingHome)
        {
            return res.status(400).json({success: false, message: "Home page data already exists"});
        }

        const homeData = await HomeModel.create(req.body);
        res.status(201).json({success: true, message: "Home page data created successfully", data: homeData });
    } catch (error) {
        console.log("Create Home Error:", error);
        res.status(500).json({success: false, message: "Unable to create home page data", error: error.message });
    }
};

// ====================================================================================================
//                                          UPDATE HOME PAGE DATA
// ====================================================================================================

const updateHomeData = async (req, res) => {

    try {

        const homeData = await HomeModel.findOne();

        if (!homeData)
        {
            return res.status(404).json({success: false, message: "Home page data not found"});
        }

        const updatedData = await HomeModel.findByIdAndUpdate(homeData._id, req.body, {new: true, runValidators: true});
        res.status(200).json({success: true, message: "Home page updated successfully", data: updatedData});
    } catch (error) {
        console.log("Update Home Error:", error);
        res.status(500).json({success: false, message: "Unable to update home page", error: error.message});
    }
};
module.exports={
            getHomeData,
            createHomeData,
            updateHomeData
};