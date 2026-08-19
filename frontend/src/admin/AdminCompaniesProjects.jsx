import React, { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";

const AdminCompaniesProjects = () => {

    const [projects, setProjects] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const initialForm = {

        company: "",
        projectName: "",
        projectDescription: "",
        projectType: "",
        startDate: "",
        deadline: "",
        status: "Not Started",
        progress: 0,
        totalPages: 0,
        completedPages: 0,
        technologies: "",
        projectUrl: "",
        notes: "",
        documents: []

    };

    const [formData, setFormData] =useState(initialForm);
    const [documentName, setDocumentName] = useState("");
    const [documentFile, setDocumentFile] = useState(null);
    const [uploadingDocument, setUploadingDocument] = useState(false);

    // ======================================================
    // GET PROJECTS
    // ======================================================

    const fetchProjects = async () => {

        try {

            const response =await adminAxios.get("/api/admin/projects");

            if (response.data.success) {

                setProjects(response.data.projects);

            }

        } catch (error) {

            console.error("Fetch Projects Error:", error);

            alert(error.response?.data?.message || "Failed to fetch projects");
        }
    };


    // ======================================================
    // GET COMPANIES
    // ======================================================

    const fetchCompanies = async () => {

        try {

            const response =await adminAxios.get("/api/admin/companies");

            if (response.data.success) {

                setCompanies(response.data.companies.filter((company)=>company.isActive));
            }

        } catch (error) {

            console.error("Fetch Companies Error:", error);

        }

    };


    // ======================================================
    // INITIAL LOAD
    // ======================================================

    useEffect(() => {

        const loadData = async () => {

            setLoading(true);

            await Promise.all([
                fetchProjects(),
                fetchCompanies()
            ]);

            setLoading(false);

        };

        loadData();

    }, []);


    // ======================================================
    // SEARCH
    // ======================================================

    const filteredProjects=projects.filter((project) => {

            const text=search.toLowerCase();

            return (

                project.projectName ?.toLowerCase().includes(text) ||

                project.company?.companyName ?.toLowerCase().includes(text) ||

                project.status ?.toLowerCase().includes(text));

        });


    // ======================================================
    // INPUT CHANGE
    // ======================================================

    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData((prev) => ({...prev, [name]: value}));

    };


    // ======================================================
    // OPEN CREATE
    // ======================================================

    const handleCreate = () => {

        setEditingProject(null);
        setFormData(initialForm);
        setShowModal(true);

    };


    // ======================================================
    // OPEN EDIT
    // ======================================================

    const handleEdit = (project) => {

        setEditingProject(project);

        setFormData({

            company:project.company?._id || "",

            projectName:project.projectName || "",

            projectDescription:project.projectDescription || "",

            projectType:project.projectType || "",

            startDate:project.startDate? project.startDate.substring(0, 10): "",

            deadline:project.deadline? project.deadline.substring(0, 10): "",

            status:project.status || "Not Started", 
            
            progress:project.progress || 0,

            totalPages:project.totalPages || 0,

            completedPages:project.completedPages || 0,

            technologies:project.technologies?.join(", ") || "",

            projectUrl:project.projectUrl || "",

            notes:project.notes || "",

            documents: project.documents || []

        });

        setShowModal(true);

    };


    // ======================================================
    // DOCUMENT UPLOAD
    // ======================================================

    const handleDocumentUpload = async () => {

    try {

        if (!editingProject?._id) {

            alert("Please save the project first.");

            return;
        }

        if (!documentName.trim()) {

            alert("Please enter document name.");

            return;
        }

        if (!documentFile) {

            alert("Please select a document.");

            return;
        }

        setUploadingDocument(true);


        // ==========================================
        // CLOUDINARY UPLOAD
        // ==========================================

        const cloudinaryData = new FormData();

        cloudinaryData.append("file", documentFile);

        cloudinaryData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const cloudinaryResponse= await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
                {
                    method: "POST",
                    body: cloudinaryData
                }
            );

        const cloudinaryResult= await cloudinaryResponse.json();

        if (!cloudinaryResult.secure_url) {

            throw new Error("Cloudinary upload failed");
        }

        // ==========================================
        // SAVE DOCUMENT IN PROJECT
        // ==========================================

        const response=await adminAxios.post(`/api/admin/projects/${editingProject._id}/documents`,
                {
                    name: documentName,
                    url: cloudinaryResult.secure_url,
                    originalName: documentFile.name,
                    fileType: documentFile.type
                }
            );

        if (response.data.success) {

            alert("Document uploaded successfully.");

            setFormData((prev) => ({...prev, documents:response.data.project?.documents ||
                    [
                        ...(prev.documents || []),
                        {
                            name: documentName,
                            url: cloudinaryResult.secure_url,
                            originalName: documentFile.name,
                            fileType: documentFile.type
                        }
                    ]

            }));


            setDocumentName("");
            setDocumentFile(null);

            const fileInput= document.getElementById("projectDocumentInput");

            if (fileInput) {

                fileInput.value = "";

            }

        }

    } catch (error) {

        console.error("Document Upload Error:", error);

        alert(error.response?.data?.message || error.message || "Document upload failed.");

    } finally {

        setUploadingDocument(false);

    }

};


    // ======================================================
    // DELETE UPLOAD DOCUMENT
    // ======================================================


    const handleDeleteDocument=async(documentId, index)=>{

    try {

        if (!editingProject?._id) {

            return;
        }

        const confirmDelete=window.confirm("Are you sure you want to delete this document?");

        if (!confirmDelete) {

            return;
        }

        const response=await adminAxios.delete(`/api/admin/projects/${editingProject._id}/documents/${documentId}`);

        if (response.data.success) {

            setFormData((prev) => ({...prev, documents:response.data.project?.documents || prev.documents.filter((_, i) => i !== index)}));

            alert("Document deleted successfully.");

        }

    } catch (error) {

        console.error("Delete Document Error:", error);

        alert(error.response?.data?.message || "Failed to delete document");

    }

};


    // ======================================================
    // SAVE PROJECT
    // ======================================================

    const handleSubmit=async(e)=>{

        e.preventDefault();

        if (Number(formData.progress) < 0 || Number(formData.progress) > 100) 
        {

            alert("Progress must be between 0 and 100");

            return;
        }

        try {

            const payload={

                ...formData,

                progress:Number(formData.progress),

                totalPages:Number(formData.totalPages),

                completedPages:Number(formData.completedPages),

                technologies:formData.technologies.split(",").map((item) =>item.trim()).filter(Boolean)

            };

            let response;

            if (editingProject) {

                response=await adminAxios.put(`/api/admin/projects/${editingProject._id}`, payload);

            } else {

                response =await adminAxios.post("/api/admin/projects", payload);

            }


            if (response.data.success) 
            {

                alert(editingProject ? "Project updated successfully": "Project created and assigned successfully");

                setShowModal(false);
                setEditingProject(null);
                setFormData(initialForm);
                fetchProjects();
            }

        } catch (error) {

            console.error("Save Project Error:", error);

            alert(error.response?.data?.message || "Failed to save project");
        }
    };


    // ======================================================
    // DELETE
    // ======================================================

    const handleDelete=async(id) => {

        const confirmDelete =window.confirm("Are you sure you want to delete this project?");

        if (!confirmDelete) return;

        try {

            const response=await adminAxios.delete(`/api/admin/projects/${id}`);

            if (response.data.success) 
            {

                alert("Project deleted successfully");

                fetchProjects();

            }

        } catch (error) {

            console.error("Delete Project Error:", error);

            alert(error.response?.data?.message || "Failed to delete project");
        }
    };


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (
            <div className="admin-projects-loading">
                Loading Projects...
            </div>
        );

    }

    return (

        <div className="admin-projects-page">


            {/* ========================================== */}
            {/* HEADER */}
            {/* ========================================== */}

            <div className="admin-projects-header">

                <div>

                    <span>
                        PROJECT MANAGEMENT
                    </span>

                    <h1>
                        Projects
                    </h1>

                    <p>
                        Create projects and assign
                        them to client companies.
                    </p>

                </div>


                <button className="admin-create-project-btn" onClick={handleCreate}>
                    + Create Project
                </button>

            </div>


            {/* ========================================== */}
            {/* SEARCH */}
            {/* ========================================== */}

            <div className="admin-project-search">

                <input type="text" placeholder="Search project, company or status..." value={search} onChange={(e) =>setSearch(e.target.value)}/>

            </div>


            {/* ========================================== */}
            {/* PROJECT TABLE */}
            {/* ========================================== */}

            <div className="admin-project-table-wrapper">

                <table className="admin-project-table">

                    <thead>

                        <tr>

                            <th>
                                #
                            </th>

                            <th>
                                Project
                            </th>

                            <th>
                                Company
                            </th>

                            <th>
                                Start Date
                            </th>

                            <th>
                                Deadline
                            </th>

                            <th>
                                Progress
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredProjects.length === 0 ? (

                            <tr>

                                <td colSpan="8" className="admin-no-project">
                                    No projects found.
                                </td>

                            </tr>

                        ) : (

                            filteredProjects.map((project, index)=>(

                                    <tr key={project._id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>

                                            <strong>
                                                {project.projectName}
                                            </strong>

                                            <small>
                                                {project.projectType}
                                            </small>

                                        </td>

                                        <td>

                                            {project.company?.companyName}

                                        </td>

                                        <td>

                                            {new Date(project.startDate).toLocaleDateString("en-IN")}

                                        </td>

                                        <td>

                                            {new Date(project.deadline).toLocaleDateString("en-IN")}

                                        </td>

                                        <td>

                                            <div className="project-progress">

                                                <div>

                                                    <span>
                                                        {project.progress}%
                                                    </span>

                                                </div>

                                                <div className="project-progress-bar">

                                                    <div style={{width:`${project.progress}%`}}/>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <span className={`project-status ${project.status?.toLowerCase().replaceAll(" ","-")}`}>
                                                {project.status}
                                            </span>

                                        </td>

                                        <td>

                                            <div className="project-actions">

                                                <button onClick={() =>handleEdit(project)}>
                                                    Edit
                                                </button>

                                                <button onClick={() =>handleDelete(project._id)}>
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>


            {/* ========================================== */}
            {/* CREATE / EDIT MODAL */}
            {/* ========================================== */}

            {showModal && (

                <div className="project-modal-overlay">

                    <div className="project-modal">

                        <div className="project-modal-header">

                            <div>

                                <span>
                                    PROJECT MANAGEMENT
                                </span>

                                <h2>

                                    {editingProject ? "Edit Project": "Create Project"}

                                </h2>

                            </div>

                            <button type="button" onClick={() => setShowModal(false)}>
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="project-form-grid">


                                            {/* COMPANY */}

                                <div>

                                    <label>
                                        Assign Company *
                                    </label>

                                    <select name="company" value={formData.company} onChange={handleChange} required>

                                        <option value="">
                                            Select Company
                                        </option>

                                        {companies.map((company) => (

                                                <option key={company._id} value={company._id}>
                                                    {company.companyName}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>


                                            {/* PROJECT NAME */}

                                <div>

                                    <label>
                                        Project Name *
                                    </label>

                                    <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Website Development" required/>

                                </div>


                                            {/* PROJECT TYPE */}

                                <div>

                                    <label>
                                        Project Type
                                    </label>

                                    <input type="text" name="projectType" value={formData.projectType} onChange={handleChange} placeholder="Web Development"/>

                                </div>


                                                {/* STATUS */}

                                <div>

                                    <label>
                                        Status
                                    </label>

                                    <select name="status" value={formData.status} onChange={handleChange}>

                                        <option>
                                            Not Started
                                        </option>

                                        <option>
                                            In Progress
                                        </option>

                                        <option>
                                            On Hold
                                        </option>

                                        <option>
                                            Completed
                                        </option>

                                        <option>
                                            Cancelled
                                        </option>

                                    </select>

                                </div>


                                                {/* START DATE */}

                                <div>

                                    <label>
                                        Start Date *
                                    </label>

                                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required/>

                                </div>


                                                {/* DEADLINE */}

                                <div>

                                    <label>
                                        Deadline *
                                    </label>

                                    <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required/>

                                </div>


                                                {/* PROGRESS */}

                                <div>

                                    <label>
                                        Progress %
                                    </label>

                                    <input type="number" name="progress" min="0" max="100" value={formData.progress} onChange={handleChange}/>

                                </div>


                                            {/* TOTAL PAGES */}

                                <div>

                                    <label>
                                        Total Pages
                                    </label>

                                    <input type="number" name="totalPages" min="0" value={formData.totalPages} onChange={handleChange}/>

                                </div>


                                            {/* COMPLETED PAGES */}

                                <div>

                                    <label>
                                        Completed Pages
                                    </label>

                                    <input type="number" name="completedPages" min="0" value={formData.completedPages} onChange={handleChange}/>

                                </div>


                                            {/* TECHNOLOGIES */}

                                <div>

                                    <label>
                                        Technologies
                                    </label>

                                    <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB"/>

                                </div>


                                            {/* DESCRIPTION */}

                                <div className="project-form-full">

                                    <label>
                                        Project Description
                                    </label>

                                    <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} rows="4"/>

                                </div>


                                            {/* URL */}

                                <div className="project-form-full">

                                    <label>
                                        Project URL
                                    </label>

                                    <input type="url" name="projectUrl" value={formData.projectUrl} onChange={handleChange} placeholder="https://example.com"/>

                                </div>


                                            {/* NOTES */}

                                <div className="project-form-full">

                                    <label>
                                        Notes
                                    </label>

                                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3"/>

                                </div>


                                
                                    {/* PROJECT DOCUMENTS */}


                        {editingProject && (

                            <div className="project-form-full">

                                <div style={{marginTop: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "10px"}}>

                                    <h3>
                                        Project Documents
                                    </h3>

                                    <p>
                                        Upload documents related to this project.
                                    </p>


                                    {/* DOCUMENT NAME */}

                                    <div style={{ marginBottom: "15px" }}>

                                        <label>
                                            Document Name
                                        </label>

                                        <input type="text" placeholder="Project Report / Invoice / Agreement" value={documentName} onChange={(e) => setDocumentName(e.target.value)}/>

                                    </div>


                                    {/* FILE */}

                                    <div style={{ marginBottom: "15px" }}>

                                        <label>
                                            Select Document
                                        </label>

                                        <input id="projectDocumentInput" type="file" className="form-control" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" onChange={(e)=>setDocumentFile(e.target.files[0])}/>

                                    </div>


                                    {/* UPLOAD BUTTON */}

                                    <button type="button" onClick={handleDocumentUpload} disabled={uploadingDocument}>

                                        {uploadingDocument ? "Uploading...": "Upload Document"}

                                    </button>


                                    {/* EXISTING DOCUMENTS */}

                                    {formData.documents?.length > 0 && (

                                        <div style={{ marginTop: "20px" }}>

                                            <h4>
                                                Uploaded Documents
                                            </h4>

                                            {formData.documents.map((doc, index)=>(

                                                    <div key={doc._id || index} style={{display: "flex", justifyContent:"space-between", alignItems:"center", padding: "10px", marginBottom:"8px", border:"1px solid #ddd", borderRadius:"6px"}}>

                                                        <div>

                                                            <strong>
                                                                {doc.name || doc.originalName || "Document"}
                                                            </strong>

                                                            <br />

                                                            <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                                                View Document
                                                            </a>

                                                        </div>

                                                        <button type="button" onClick={()=>handleDeleteDocument(doc._id, index)}>
                                                            Delete
                                                        </button>

                                                    </div>
                                                )
                                            )}

                                        </div>

                                    )}

                                </div>

                            </div>

                        )}

                            </div>

                            <div className="project-modal-actions">

                                <button type="button" onClick={() =>setShowModal(false)}>
                                    Cancel
                                </button>

                                <button type="submit">

                                    {editingProject ? "Update Project": "Create & Assign Project"}

                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AdminCompaniesProjects;