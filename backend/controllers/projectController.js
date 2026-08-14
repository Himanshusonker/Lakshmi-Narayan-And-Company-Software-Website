const ProjectModel= require("../models/projectModel");


// ============================================================
// CREATE PROJECT
// ============================================================

const createProject=async(req, res)=>{

    try {

        const project= await ProjectModel.create(req.body);

        res.status(201).json({success: true, message: "Project created successfully", data: project});

    } catch (error) {

        console.log("Create Project Error:", error);
        res.status(500).json({success: false, message: "Unable to create project", error: error.message});
    }
};

// ============================================================
// GET ALL PROJECTS
// ============================================================

const getProjects=async(req, res)=>{

    try {

        const projects= await ProjectModel.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });

        res.status(200).json({success: true, message: "Projects fetched successfully", data: projects});

    } catch (error) {

        console.log("Get Projects Error:", error);
        res.status(500).json({success: false, message: "Unable to fetch projects", error: error.message});

    }
};

// ============================================================
// GET SINGLE PROJECT BY SLUG
// ============================================================

const getProjectBySlug=async(req, res)=>{

    try {

        const { slug }= req.params;

        const project= await ProjectModel.findOne({slug: slug, isPublished: true});

        if (!project) {

            return res.status(404).json({ success: false, message: "Project not found" });

        }

        res.status(200).json({ success: true, message: "Project fetched successfully", data: project });

    } catch (error) {

        console.log("Get Project Detail Error:", error);
        res.status(500).json({ success: false, message: "Unable to fetch project", error: error.message });

    }
};


// ============================================================
// GET ALL PROJECTS FOR ADMIN
// ============================================================


const getAdminProjects=async(req, res)=>{

    try {

        const projects= await ProjectModel.find().sort({ order: 1 });

        res.status(200).json({success: true, data: projects});

    } catch (error) {

        console.log("Admin Projects Error:", error);

        res.status(500).json({success: false, message: "Unable to fetch projects", error: error.message});
    }
};


// ============================================================
// UPDATE PROJECT
// ============================================================


const updateProject=async(req, res)=>{

    try {

        const project= await ProjectModel.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) {

            return res.status(404).json({success: false, message: "Project not found"});
        }

        res.status(200).json({success: true, message: "Project updated successfully", data: project});

    } catch (error) {

        console.log("Update Project Error:", error);

        res.status(500).json({success: false, message: "Unable to update project", error: error.message});
    }
};


// ============================================================
// DELETE PROJECT
// ============================================================

const deleteProject=async(req, res)=>{

    try {

        const project= await ProjectModel.findByIdAndDelete(req.params.id);

        if (!project) {

            return res.status(404).json({success: false, message: "Project not found"});
        }

        res.status(200).json({success: true, message: "Project deleted successfully"});

    } catch (error) {

        console.log("Delete Project Error:", error);

        res.status(500).json({success: false, message: "Unable to delete project", error: error.message});
    }
};

module.exports={
            createProject,
            getProjects,
            getProjectBySlug,
            getAdminProjects,
            updateProject,
            deleteProject
};