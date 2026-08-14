import React, { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";


const AdminServices = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({

        title: "",
        slug: "",
        shortDescription: "",
        description: "",
        icon: "",
        image: "",
        features: "",
        technologies: "",
        process:"",
        benefits: "",
        buttonText: "Start Your Project",
        buttonLink: "/contact",
        order: ""
    });

// ====================================================================================================
//                                          GET SERVICES
// ====================================================================================================

    const getServices=async()=>{

        try {

            setLoading(true);

            const response = await adminAxios.get(`/services`);

            if (response.data.success) {

                setServices(response.data.data);

            }

        } catch (error) {

            console.log("Get Services Error:", error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        getServices();

    }, []);


// ====================================================================================================
//                                              INPUT CHANGE
// ====================================================================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

    };


// ===================================================================================================
//                                            CREATE / UPDATE
// ===================================================================================================

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try {

            const serviceData = {

                title: formData.title,

                slug: formData.slug,

                shortDescription:
                    formData.shortDescription,

                description:
                    formData.description,

                icon:
                    formData.icon,

                image:
                    formData.image,

                features:
                    formData.features.split("\n").map(item => item.trim()).filter(Boolean),

                technologies:
                    formData.technologies.split(",").map(item => item.trim()).filter(Boolean),

                benefits:
                    formData.benefits.split("\n").map(item => item.trim()).filter(Boolean),

                process:
                    formData.process.split("\n").map(item => {

                const [step, description]=item.split("|");

                return {
                    step: step?.trim(),
                    description: description?.trim()
                };
                }).filter(item =>item.step && item.description),

                buttonText:
                    formData.buttonText,

                buttonLink:
                    formData.buttonLink,

                order:
                    Number(formData.order)
            };

            let response;


// ====================================================================================================
//                                              UPDATE
// ====================================================================================================

            if (editingId) {

                const token=localStorage.getItem("adminToken");

                response = await adminAxios.put(`/services/${editingId}`, serviceData,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                 );

            }

// ====================================================================================================
//                                              CREATE
// ====================================================================================================

            else {
                const token=localStorage.getItem("adminToken");
                response = await adminAxios.post(`/services`, serviceData,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                 );

            }

            if (response.data.success) {

                setMessage(response.data.message);

                resetForm();

                getServices();

            }

        } catch (error) {

            console.log("Service Save Error:", error);

            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };


// ====================================================================================================
//                                                  EDIT
// ====================================================================================================

    const handleEdit = (service) => {

        setEditingId(service._id);

        setFormData({

            title:
                service.title || "",

            slug:
                service.slug || "",

            shortDescription:
                service.shortDescription || "",

            description:
                service.description || "",

            icon:
                service.icon || "",

            image:
                service.image || "",

            features:
                service.features?.join("\n") || "",

            technologies:
                service.technologies?.join(", ") || "",

            process:
                service.process ?.map(item=>
            `${item.step} | ${item.description}`
            ).join("\n") || "",

            benefits:
                service.benefits?.join("\n") || "",

            buttonText:
                service.buttonText || "",

            buttonLink:
                service.buttonLink || "",

            order:
                service.order || ""

        });

        window.scrollTo({ top: 0, behavior: "smooth" });

    };


// ====================================================================================================
//                                                  DELETE
// ====================================================================================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this service?");

        if (!confirmDelete) {
            return;
        }

        try {

            const token=localStorage.getItem("adminToken");

            const response = await adminAxios.delete(`/services/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {

                setMessage(response.data.message);

                getServices();

            }

        } catch (error) {

            console.log("Delete Service Error:", error);

        }
    };


// ====================================================================================================
//                                                  RESET
// ====================================================================================================

    const resetForm=()=>{

        setEditingId(null);

        setFormData({

            title: "",
            slug: "",
            shortDescription: "",
            description: "",
            icon: "",
            image: "",
            features: "",
            technologies: "",
            process:"",
            benefits: "",
            buttonText: "Start Your Project",
            buttonLink: "/contact",
            order: ""
        });
    };

    return (

        <div className="admin-services-page">

{/* ========================================== PAGE HEADER ======================================= */}

            <div className="admin-services-header">

                <div>

                    <span>
                        ADMIN DASHBOARD
                    </span>

                    <h1>
                        Services Management
                    </h1>

                    <p>
                        Add, edit and manage your company services.
                    </p>

                </div>

            </div>

{/* ========================================== MESSAGE ============================================ */}

            {message && (

                <div className="admin-service-message">

                    {message}

                </div>

            )}

{/* ======================================= SERVICE FORM ========================================== */}

            <div className="service-admin-card">
                <div className="service-admin-card-header">

                    <h2>

                        {editingId ? "Edit Service": "Add New Service"}

                    </h2>

                </div>

                <form className="service-admin-form" onSubmit={handleSubmit}>

                    <div className="form-grid">

                                        {/* TITLE */}

                        <div className="form-group">

                            <label>
                                Service Title
                            </label>

                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Web Development" required />

                        </div>

                                            {/* SLUG */}

                        <div className="form-group">

                            <label>
                                Slug
                            </label>

                            <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="web-development" required />

                        </div>

                                            {/* ICON */}

                        <div className="form-group">

                            <label>
                                Icon
                            </label>

                            <input type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="💻" />

                        </div>

                                            {/* ORDER */}

                        <div className="form-group">

                            <label>
                                Display Order
                            </label>

                            <input type="number" name="order" value={formData.order} onChange={handleChange} placeholder="1" required />

                        </div>

                    </div>

                                    {/* SHORT DESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Short Description
                        </label>

                        <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="Short service description" required />

                    </div>

                                        {/* DESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Full Description
                        </label>

                        <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required />

                    </div>

                                         {/* IMAGE */}

                    <div className="form-group">

                        <label>
                            Image URL
                        </label>

                        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />

                    </div>

                                      {/* FEATURES */}

                    <div className="form-group">

                        <label>
                            Features
                        </label>

                        <textarea name="features" value={formData.features} onChange={handleChange} rows="6" placeholder={"Responsive Website Development\nBusiness Websites\nE-Commerce Websites"} />

                        <small>
                            Enter one feature per line
                        </small>

                    </div>

                                   {/* TECHNOLOGIES */}

                    <div className="form-group">

                        <label>
                            Technologies
                        </label>

                        <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" />

                        <small>
                            Separate technologies using commas
                        </small>

                    </div>


                                     {/* PROCESS */}

                        <div className="form-group">

                            <label>
                                Development Process
                            </label>

                            <textarea name="process" value={formData.process} onChange={handleChange} rows="8" 
                            placeholder={`Research | We understand your users and business objectives.
                                          Wireframe | We create the initial structure of the product.
                                          Visual Design | We create the final visual interface.
                                          Prototype | We create an interactive prototype.`
                            }/>

                            <small>
                                Enter one process step per line. Use | between step and description.
                            </small>

                        </div>

                                    {/* BENEFITS */}

                    <div className="form-group">

                        <label>
                            Benefits
                        </label>

                        <textarea name="benefits" value={formData.benefits} onChange={handleChange} rows="5" placeholder={"Mobile Responsive\nSEO Friendly\nFast Performance"}/>

                        <small>
                            Enter one benefit per line
                        </small>

                    </div>

                                     {/* BUTTON */}

                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Button Text
                            </label>

                            <input type="text" name="buttonText" value={formData.buttonText} onChange={handleChange} />

                        </div>

                        <div className="form-group">

                            <label>
                                Button Link
                            </label>

                            <input type="text" name="buttonLink" value={formData.buttonLink} onChange={handleChange} />

                        </div>

                    </div>

                                            {/* BUTTONS */}

                    <div className="service-form-buttons">

                        <button type="submit" className="save-service-btn">

                            {editingId ? "Update Service": "Add Service"}

                        </button>

                        {editingId && (

                            <button type="button" className="cancel-service-btn" onClick={resetForm}>
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </div>


{/* ============================================ SERVICES LIST =================================== */}

            <div className="services-list-section">

                <div className="services-list-header">

                    <h2>
                        All Services
                    </h2>

                    <span>
                        {services.length} Services
                    </span>

                </div>

                {loading ? (

                    <div className="services-loading">
                        Loading Services...
                    </div>

                ) : (

                    <div className="admin-services-table-wrapper">

                        <table className="admin-services-table">

                            <thead>

                                <tr>

                                    <th>
                                        Order
                                    </th>

                                    <th>
                                        Service
                                    </th>

                                    <th>
                                        Slug
                                    </th>

                                    <th>
                                        Technologies
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {services.map((service) => (

                                    <tr key={service._id}>

                                        <td>
                                            {service.order}
                                        </td>

                                        <td>

                                            <div className="admin-service-name">

                                                <span>
                                                    {service.icon}
                                                </span>

                                                <strong>
                                                    {service.title}
                                                </strong>

                                            </div>

                                        </td>

                                        <td>
                                            {service.slug}
                                        </td>

                                        <td>

                                            <div className="technology-tags">

                                                {service.technologies?.map((technology, index)=>(

                                                        <span key={index}>
                                                            {technology}
                                                        </span>
                                                    )
                                                )}

                                            </div>

                                        </td>

                                        <td>

                                            <div className="service-action-buttons">

                                                <button className="edit-service-btn" onClick={()=> handleEdit(service)}>
                                                    Edit
                                                </button>

                                                <button className="delete-service-btn" onClick={()=> handleDelete(service._id)}>
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};


export default AdminServices;