import React, { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";


const emptyProject={
    title: "",
    slug: "",
    category: "",
    shortDescription: "",
    description: "",
    image: "",
    gallery: "",
    client: "",
    technologies: "",
    features: "",
    results: "",
    projectUrl: "",
    buttonText: "Start Your Project",
    buttonLink: "/contact",
    order: 0,
    isPublished: true
};

const AdminProjects=()=>{

    const [projects, setProjects]=useState([]);
    const [formData, setFormData]=useState(emptyProject);
    const [editingId, setEditingId]=useState(null);
    const [loading, setLoading]=useState(true);
    const [saving, setSaving]=useState(false);
    const [error, setError]=useState("");


    // ============================================================
    // GET PROJECTS
    // ============================================================

    const getProjects=async()=>{

        try {

            setLoading(true);

            const response = await adminAxios.get("/projects/admin/all");

            if (response.data.success) {

                setProjects(response.data.data);
            }

        } catch (error) {

            console.log("Admin Projects Error:", error);

            setError(error.response?.data?.message || "Unable to load projects");

        } finally {

            setLoading(false);
        }
    };

    useEffect(()=>{

        getProjects();

    }, []);


    // ============================================================
    // HANDLE INPUT
    // ============================================================

    const handleChange=(e)=>{

        const { name, value, type, checked }= e.target;

        setFormData({...formData, [name]: type === "checkbox" ? checked: value});
    };


    // ============================================================
    // CREATE / UPDATE
    // ============================================================

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try {

            setSaving(true);

            const data={

                ...formData,

                gallery: formData.gallery.split("\n").map(item => item.trim()).filter(Boolean),

                technologies: formData.technologies.split(",").map(item => item.trim()).filter(Boolean),

                features: formData.features.split("\n").map(item => item.trim()).filter(Boolean),

                results: formData.results.split("\n").map(item => item.trim()).filter(Boolean),

                order: Number(formData.order)
            };


            if (editingId) {

                await adminAxios.put(`/projects/${editingId}`, data);

                alert("Project updated successfully");

            } else {

                await adminAxios.post("/projects", data);

                alert("Project added successfully");
            }

            setFormData(emptyProject);
            setEditingId(null);
            getProjects();

        } catch (error) {

            console.log("Save Project Error:", error);

            alert(error.response?.data?.message || "Something went wrong");

        } finally {

            setSaving(false);
        }
    };


    // ============================================================
    // EDIT
    // ============================================================

    const handleEdit=(project)=>{

        setEditingId(project._id);

        setFormData({

            ...project,

            gallery: 
                project.gallery?.join("\n") || "",

            technologies:
                project.technologies?.join(", ") || "",

            features:
                project.features?.join("\n") || "",

            results:
                project.results?.join("\n") || ""
        });

        window.scrollTo({top: 0, behavior: "smooth"});
    };


    // ============================================================
    // DELETE
    // ============================================================

    const handleDelete=async(id)=>{

        const confirmDelete = window.confirm("Are you sure you want to delete this project?");

        if (!confirmDelete) {
            return;
        }

        try {

            await adminAxios.delete(`/projects/${id}`);

            alert("Project deleted successfully");

            getProjects();

        } catch (error) {

            console.log("Delete Project Error:", error);

            alert(error.response?.data?.message || "Unable to delete project");
        }
    };


    // ============================================================
    // CANCEL EDIT
    // ============================================================

    const cancelEdit=()=>{

        setEditingId(null);

        setFormData(emptyProject);
    };


    return (

        <div className="admin-projects-page">
            <div className="admin-projects-header">
                <div>

                    <span>
                        PROJECT MANAGEMENT
                    </span>

                    <h1>
                        {editingId ? "Edit Project": "Add New Project"}
                    </h1>

                </div>

            </div>


{/* ============================================= FORM =========================================== */}

            <form className="project-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">

                        <label>
                            Project Title
                        </label>

                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

                    </div>

                    <div className="form-group">

                        <label>
                            Slug
                        </label>

                        <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />

                    </div>

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <input type="text" name="category" value={formData.category} onChange={handleChange} required/>

                    </div>

                    <div className="form-group">

                        <label>
                            Client
                        </label>

                        <input type="text" name="client" value={formData.client} onChange={handleChange}/>

                    </div>

                    <div className="form-group full">

                        <label>
                            Short Description
                        </label>

                        <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} required />

                    </div>

                    <div className="form-group full">

                        <label>
                            Full Description
                        </label>

                        <textarea name="description" rows="5" value={formData.description} onChange={handleChange} required/>

                    </div>

                    <div className="form-group full">

                        <label>
                            Main Image URL
                        </label>

                        <input type="text" name="image" value={formData.image} onChange={handleChange} required/>

                    </div>

                    <div className="form-group full">

                        <label>
                            Gallery URLs
                        </label>

                        <textarea name="gallery" placeholder="One image URL per line" value={formData.gallery} onChange={handleChange} rows="4"/>

                    </div>

                    <div className="form-group full">

                        <label>
                            Technologies
                        </label>

                        <input type="text" name="technologies" placeholder="React, Node.js, MongoDB" value={formData.technologies} onChange={handleChange}/>

                    </div>

                    <div className="form-group">

                        <label>
                            Features
                        </label>

                        <textarea name="features" placeholder="One feature per line" value={formData.features} onChange={handleChange} rows="5"/>

                    </div>

                    <div className="form-group">

                        <label>
                            Results
                        </label>

                        <textarea name="results" placeholder="One result per line" value={formData.results} onChange={handleChange} rows="5" />

                    </div>

                    <div className="form-group">

                        <label>
                            Project URL
                        </label>

                        <input type="text" name="projectUrl" value={formData.projectUrl} onChange={handleChange}/>

                    </div>

                    <div className="form-group">

                        <label>
                            Display Order
                        </label>

                        <input type="number" name="order" value={formData.order} onChange={handleChange}/>

                    </div>

                    <div className="form-group checkbox-group">

                        <label>

                            <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange}/>

                            Publish Project

                        </label>

                    </div>

                </div>

                <div className="project-form-buttons">

                    <button type="submit" disabled={saving}>
                        {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
                    </button>

                    {editingId && (

                        <button type="button" className="cancel-button" onClick={cancelEdit}>
                            Cancel
                        </button>
                    )}

                </div>

            </form>

{/* ======================================== PROJECT LIST ======================================== */}

            <section className="admin-project-list">
                <div className="admin-list-heading">

                    <h2>
                        All Projects
                    </h2>

                    <span>
                        {projects.length} Projects
                    </span>

                </div>

                {loading ? (

                    <p>
                        Loading projects...
                    </p>

                ) : error ? (

                    <p>
                        {error}
                    </p>

                ) : (

                    <div className="admin-project-table">

                        {projects.map((project, index)=>(

                            <div className="admin-project-row" key={project._id}>

                                <img src={project.image} alt={project.title}/>

                                <div className="admin-project-info">

                                    <span>
                                        PROJECT {index + 1}
                                    </span>

                                    <h3>
                                        {project.title}
                                    </h3>

                                    <p>
                                        {project.category}
                                    </p>

                                </div>

                                <div className="admin-project-status">

                                    {project.isPublished ? "Published" : "Draft"}

                                </div>

                                <div className="admin-project-actions">

                                    <button onClick={()=>handleEdit(project)}>
                                        Edit
                                    </button>

                                    <button className="delete-button" onClick={()=> handleDelete(project._id)}>
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </section>

        </div>
    );
};
export default AdminProjects;