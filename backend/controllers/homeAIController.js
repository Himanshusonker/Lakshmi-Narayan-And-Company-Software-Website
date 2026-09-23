const Home = require("../models/homeAIModel");


// ============================================================
// GET HOME DATA
// ============================================================

const getHomeData = async (req, res) => {

    try {

        let home = await Home.findOne();

        if (!home) {

            return res.status(404).json({
                success: false,
                message: "Home data not found"
            });

        }


        res.status(200).json({

            success: true,

            data: home

        });

    } catch (error) {

        console.error(
            "Get Home Data Error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Server error while loading home data"

        });
    }
};


// ============================================================
// CREATE HOME DATA
// ============================================================

const createHomeData = async (req, res) => {

    try {

        const existingHome = await Home.findOne();

        if (existingHome) {

            return res.status(400).json({

                success: false,

                message: "Home data already exists"

            });
        }


        const home = await Home.create(req.body);


        res.status(201).json({

            success: true,

            message: "AI Home data created successfully",

            data: home

        });

    } catch (error) {

        console.error(
            "Create Home Data Error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Unable to create home data",

            error: error.message

        });
    }
};


// ============================================================
// UPDATE HOME DATA
// ============================================================

const updateHomeData = async (req, res) => {

    try {

        let home = await Home.findOne();


        if (!home) {

            home = await Home.create(req.body);

        } else {

            home = await Home.findOneAndUpdate(

                {},

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            );

        }


        res.status(200).json({

            success: true,

            message: "AI Home data updated successfully",

            data: home

        });

    } catch (error) {

        console.error(
            "Update Home Data Error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Unable to update home data",

            error: error.message

        });
    }
};

module.exports = {
        getHomeData,
        createHomeData,
        updateHomeData
};