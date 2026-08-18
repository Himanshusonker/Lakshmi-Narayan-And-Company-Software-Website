const ClientProject = require("../models/clientProjectModel");

// ======================================================
// GET LOGGED-IN CLIENT PROJECTS
// ======================================================

const getClientProjects = async (req, res) => {

    try {

        const companyId = req.client.companyId;

        if (!companyId) 
        {

            return res.status(400).json({success: false, message:"Company information not found"});
        }

// ==================================================
// FIND ONLY THIS COMPANY'S PROJECTS
// ==================================================

        const projects= await ClientProject.find({company: companyId, isActive: true}).populate("company", "companyName contactPerson email phone").sort({createdAt: -1});

// ==================================================
// RESPONSE
// ==================================================

        return res.status(200).json({success: true, count: projects.length, projects});

    } catch (error) {

        console.error("Client Projects Error:", error);

        return res.status(500).json({success: false, message:"Failed to fetch client projects"});
    }
};


// ======================================================
// GET SINGLE CLIENT PROJECT
// ======================================================

const getClientProjectById = async (req, res) => {

    try {

        const companyId=req.client.companyId;

// ==============================================
// PROJECT + COMPANY ID BOTH CHECK
// ==============================================


        const project= await ClientProject.findOne({_id: req.params.id, company: companyId, isActive: true}).populate("company", "companyName contactPerson email phone");

        if (!project) 
        {

            return res.status(404).json({success: false, message:"Project not found"});
        }

        return res.status(200).json({success: true, project});

    } catch (error) {

        console.error("Client Project Error:", error);

        return res.status(500).json({success: false, message:"Failed to fetch project"});
    }
};
module.exports={
            getClientProjects,
            getClientProjectById
};