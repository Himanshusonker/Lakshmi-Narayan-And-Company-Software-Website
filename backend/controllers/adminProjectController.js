const ClientProject=require("../models/clientProjectModel");
const ClientCompany=require("../models/clientCompanyModel");

// ======================================================
// GET ALL PROJECTS
// ======================================================

const getAllProjects = async (req, res) => {

    try {

        const projects = await ClientProject.find().populate("company","companyName contactPerson email phone").sort({ createdAt: -1 });

        return res.status(200).json({success: true, count: projects.length, projects});

    } catch (error) {

        console.error("Get Projects Error:", error);

        return res.status(500).json({success: false, message: "Failed to fetch projects"});
    }
};


// ======================================================
// GET SINGLE PROJECT
// ======================================================

const getProjectById = async (req, res) => {

    try {

        const project = await ClientProject.findById(req.params.id).populate("company"," companyName contactPerson email phone");

        if (!project) {

            return res.status(404).json({success: false,message: "Project not found"});
        }

        return res.status(200).json({success: true, project});

    } catch (error) {

        console.error("Get Project Error:", error);

        return res.status(500).json({success: false, message: "Failed to fetch project"});
    }
};


// ======================================================
// CREATE PROJECT
// ======================================================

const createProject = async (req, res) => {

    try {

        const {
            company,
            projectName,
            projectDescription,
            projectType,
            startDate,
            deadline,
            status,
            progress,
            totalPages,
            completedPages,
            technologies,
            projectUrl,
            notes
        }=req.body;


        // ==============================================
        // VALIDATION
        // ==============================================

        if (!company || !projectName || !startDate || !deadline) 
        {

            return res.status(400).json({success: false, message:"Company, project name, start date and deadline are required"});
        }


        // ==============================================
        // CHECK COMPANY
        // ==============================================

        const companyData =await ClientCompany.findById(company);

        if (!companyData) {

            return res.status(404).json({success: false, message: "Selected company not found"});
        }

        if (!companyData.isActive) 
        {

            return res.status(400).json({success: false, message:"Cannot assign project to an inactive company"});
        }

        // ==============================================
        // CREATE PROJECT
        // ==============================================

        const project=new ClientProject(
            {

                company,

                projectName,

                projectDescription:
                    projectDescription || "",

                projectType:
                    projectType || "",

                startDate,

                deadline,

                status:
                    status || "Not Started",

                progress:
                    progress || 0,

                totalPages:
                    totalPages || 0,

                completedPages:
                    completedPages || 0,

                technologies:
                    technologies || [],

                projectUrl:
                    projectUrl || "",

                notes:
                    notes || ""

            });


        await project.save();


        // ==============================================
        // POPULATE COMPANY
        // ==============================================

        await project.populate("company", "companyName contactPerson email phone");

        return res.status(201).json({success: true, message: "Project created and assigned successfully", project});

    } catch (error) {

        console.error("Create Project Error:", error);

        return res.status(500).json({success: false, message: "Failed to create project" });
    }
};


// ======================================================
// UPDATE PROJECT
// ======================================================

const updateProject = async (req, res) => {

    try {

        const {
            company,
            projectName,
            projectDescription,
            projectType,
            startDate,
            deadline,
            status,
            progress,
            totalPages,
            completedPages,
            technologies,
            projectUrl,
            notes,
            isActive
        }=req.body;


        const project=await ClientProject.findById(req.params.id);

        if (!project) {

            return res.status(404).json({success: false, message: "Project not found"});
        }


        // ==============================================
        // COMPANY CHECK
        // ==============================================

        if (company) {

            const companyData=await ClientCompany.findById(company);

            if (!companyData) 
            {

                return res.status(404).json({success: false, message: "Company not found"});
            }

            if (!companyData.isActive) 
            {

                return res.status(400).json({success: false, message:"Cannot assign project to inactive company"});
            }

            project.company=company;
        }

        if (projectName !== undefined)
            project.projectName = projectName;

        if (projectDescription !== undefined)
            project.projectDescription =projectDescription;

        if (projectType !== undefined)
            project.projectType =projectType;

        if (startDate !== undefined)
            project.startDate =startDate;

        if (deadline !== undefined)
            project.deadline =deadline;

        if (status !== undefined)
            project.status =status;

        if (progress !== undefined)
            project.progress=progress;

        if (totalPages !== undefined)
            project.totalPages=totalPages;

        if (completedPages !== undefined)
            project.completedPages=completedPages;

        if (technologies !== undefined)
            project.technologies=technologies;

        if (projectUrl !== undefined)
            project.projectUrl=projectUrl;

        if (notes !== undefined)
            project.notes=notes;

        if (isActive !== undefined)
            project.isActive=isActive;

        await project.save();

        await project.populate("company", "companyName contactPerson email phone");

        return res.status(200).json({success: true, message: "Project updated successfully", project});

    } catch (error) {

        console.error("Update Project Error:", error);

        return res.status(500).json({success: false, message: "Failed to update project"});
    }
};


// ======================================================
// DELETE PROJECT
// ======================================================

const deleteProject = async (req, res) => {

    try {

        const project =await ClientProject.findById(req.params.id);

        if (!project) 
        {

            return res.status(404).json({success: false, message: "Project not found"});
        }

        await ClientProject.findByIdAndDelete(req.params.id);

        return res.status(200).json({success: true, message: "Project deleted successfully"});

    } catch (error) {

        console.error("Delete Project Error:", error);

        return res.status(500).json({success: false, message: "Failed to delete project"});
    }
};


// ======================================================
// UPDATE PROJECT PROGRESS
// ======================================================

const updateProjectProgress = async (req, res) => {

    try {

        const {progress, completedPages, status} = req.body;

        const project =await ClientProject.findById(req.params.id);

        if (!project) 
        {

            return res.status(404).json({success: false, message: "Project not found"});
        }


        if (progress !== undefined) 
        {

            if (progress < 0 || progress > 100) 
            {

                return res.status(400).json({success: false, message:"Progress must be between 0 and 100"});
            }

            project.progress = progress;
        }

        if (completedPages !== undefined) {

            project.completedPages =completedPages;
        }

        if (status !== undefined) {

            project.status = status;
        }


        await project.save();


        return res.status(200).json({success: true, message:"Project progress updated successfully", project});

    } catch (error) {

        console.error("Update Progress Error:", error);

        return res.status(500).json({success: false, message: "Failed to update project progress"});
    }
};


// ======================================================
// ADD PROJECT DOCUMENT
// ======================================================

const addProjectDocument = async (req, res) => {

    try {

        const {name, url, publicId, fileType, fileSize} = req.body;

        if (!name || !url) {

            return res.status(400).json({success: false, message: "Document name and URL are required"});

        }


        const project=await ClientProject.findById(req.params.id);

        if (!project) {

            return res.status(404).json({success: false, message: "Project not found"});

        }

        project.documents.push({name, url, publicId: publicId || "", fileType: fileType || "", fileSize: Number(fileSize) || 0, uploadedAt: new Date()});

        await project.save();

        return res.status(201).json({success: true, message: "Project document added successfully", project});

    } catch (error) {

        console.error("Add Project Document Error:", error);

        return res.status(500).json({success: false, message: "Failed to add project document"});

    }

};


// ======================================================
// DELETE PROJECT DOCUMENT
// ======================================================

const deleteProjectDocument = async (req, res) => {

    try {

        const project= await ClientProject.findById(req.params.id);

        if (!project) {

            return res.status(404).json({success: false, message: "Project not found"});

        }

        const document=project.documents.id(req.params.documentId);

        if (!document) {

            return res.status(404).json({success: false, message: "Document not found"});

        }

        document.deleteOne();

        await project.save();

        return res.status(200).json({success: true, message: "Project document deleted successfully", project});

    } catch (error) {

        console.error("Delete Project Document Error:", error);

        return res.status(500).json({success: false, message: "Failed to delete project document"});

    }

};
module.exports={
            getAllProjects,
            getProjectById,
            createProject,
            updateProject,
            deleteProject,
            updateProjectProgress,
            addProjectDocument,
            deleteProjectDocument
};