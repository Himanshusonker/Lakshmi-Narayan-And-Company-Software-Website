import React, { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";

const emptyForm={

    name: "",
    email: "",
    designation: "",
    message: "",
    rating: 5,
    image: "",
    order: 0,
    isPublished: true
};


const AdminTestimonials=()=>{

    const [testimonials, setTestimonials]=useState([]);
    const [formData, setFormData]=useState(emptyForm);
    const [editingId, setEditingId]=useState(null);
    const [loading, setLoading]=useState(true);
    const [saving, setSaving]=useState(false);


    // ============================================================
    // GET TESTIMONIALS
    // ============================================================

    const getTestimonials=async()=>{

        try {

            setLoading(true);

            const response= await adminAxios.get("/testimonials/admin/all");

            if (response.data.success) {

                setTestimonials(response.data.data);
            }

        } catch (error) {

            console.log("Testimonials Error:", error);

            alert(error.response?.data?.message || "Unable to load testimonials");

        } finally {

            setLoading(false);
        }
    };

    useEffect(()=>{

        getTestimonials();

    }, []);


    // ============================================================
    // INPUT
    // ============================================================

    const handleChange=(e)=>{

        const { name, value, type, checked }= e.target;

        setFormData({...formData, [name]: type === "checkbox" ? checked : value});
    };


    // ============================================================
    // SUBMIT
    // ============================================================

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try {

            setSaving(true);

            const data={...formData, email: formData.email.trim().toLowerCase(), rating: Number(formData.rating), order: Number(formData.order)};

            if (editingId) {

                await adminAxios.put(`/testimonials/${editingId}`, data);

                alert("Testimonial updated successfully");

            } else {

                await adminAxios.post("/testimonials", data);

                alert("Testimonial added successfully");
            }

            setFormData(emptyForm);
            setEditingId(null);
            getTestimonials();

        } catch (error) {

            console.log("Save Testimonial Error:", error);

        if (error.response?.status === 409) {

            alert("This client has already submitted a testimonial.");

        }

        else {

            alert(error.response?.data?.message || "Something went wrong");

        }

        } finally {

            setSaving(false);
        }
    };


    // ============================================================
    // EDIT
    // ============================================================

    const handleEdit=(testimonial)=>{

        setEditingId(testimonial._id);

        setFormData({

            name: testimonial.name || "",

            email: testimonial.email || "",

            designation:
                testimonial.designation || "",

            message:
                testimonial.message || "",

            rating:
                testimonial.rating || 5,

            image:
                testimonial.image || "",

            order:
                testimonial.order || 0,

            isPublished:
                testimonial.isPublished
        });

        window.scrollTo({top: 0, behavior: "smooth"});
    };


    // ============================================================
    // DELETE
    // ============================================================

    const handleDelete=async(id)=>{

        const confirmDelete= window.confirm("Are you sure you want to delete this testimonial?");

        if (!confirmDelete) {
            return;
        }

        try {

            await adminAxios.delete(`/testimonials/${id}`);

            alert("Testimonial deleted successfully");

            getTestimonials();

        } catch (error) {

            console.log("Delete Testimonial Error:", error);

            alert(error.response?.data?.message || "Unable to delete testimonial");
        }
    };


    // ============================================================
    // CANCEL
    // ============================================================

    const cancelEdit=()=>{

        setEditingId(null);

        setFormData(emptyForm);
    };


    return (

        <div className="admin-testimonials-page">

                                                {/* HEADER */}

            <div className="admin-testimonials-header">

                <span>
                    CLIENT FEEDBACK
                </span>

                <h1>
                    {editingId ? "Edit Testimonial" : "Add Testimonial"}
                </h1>

            </div>

{/* ============================================= FORM =========================================== */}

            <form className="testimonial-form" onSubmit={handleSubmit}>
                <div className="testimonial-form-grid">
                    <div className="testimonial-form-group">

                        <label>
                            Client Name
                        </label>

                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                    </div>

                    <div className="testimonial-form-group">

                        <label>
                            Client Email
                        </label>

                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="client@gmail.com" required/>

                    </div>

                    <div className="testimonial-form-group">

                        <label>
                            Designation
                        </label>

                        <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Business Owner" />

                    </div>

                    <div className="testimonial-form-group full">

                        <label>
                            Testimonial Message
                        </label>

                        <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required/>

                    </div>

                    <div className="testimonial-form-group">

                        <label>
                            Rating
                        </label>

                        <select name="rating" value={formData.rating} onChange={handleChange}>

                            <option value="5">
                                5 Stars
                            </option>

                            <option value="4">
                                4 Stars
                            </option>

                            <option value="3">
                                3 Stars
                            </option>

                            <option value="2">
                                2 Stars
                            </option>

                            <option value="1">
                                1 Star
                            </option>

                        </select>

                    </div>

                    <div className="testimonial-form-group">

                        <label>
                            Display Order
                        </label>

                        <input type="number" name="order" value={formData.order} onChange={handleChange}/>

                    </div>

                    <div className="testimonial-form-group full">

                        <label>
                            Client Image URL
                        </label>

                        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />

                    </div>

                    <div className="testimonial-publish">

                        <label>

                            <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} />

                            Publish Testimonial

                        </label>

                    </div>

                </div>

                <div className="testimonial-form-buttons">

                    <button type="submit" disabled={saving}>

                        {saving ? "Saving..." : editingId ? "Update Testimonial" : "Add Testimonial"}

                    </button>


                    {editingId && (

                        <button type="button" className="testimonial-cancel" onClick={cancelEdit}>
                            Cancel
                        </button>

                    )}

                </div>

            </form>

{/* =============================================== LIST ========================================= */}

            <section className="testimonial-admin-list">
                <div className="testimonial-list-heading">

                    <h2>
                        All Testimonials
                    </h2>

                    <span>
                        {testimonials.length} Testimonials
                    </span>

                </div>

                {loading ? (

                    <p>
                        Loading testimonials...
                    </p>

                ) : (

                    testimonials.map((testimonial)=>(

                        <div className="testimonial-admin-row" key={testimonial._id}>
                            <div className="testimonial-client-image">

                                {testimonial.image ? (

                                    <img src={testimonial.image} alt={testimonial.name}/>

                                ) : (

                                    <span>
                                        {testimonial.name ?.charAt(0).toUpperCase()}
                                    </span>

                                )}

                            </div>

                            <div className="testimonial-admin-info">

                                <h3>
                                    {testimonial.name}
                                </h3>

                                <span>
                                    {testimonial.designation}
                                </span>

                                <small className="testimonial-client-email">
                                    {testimonial.email}
                                </small>

                                <p>
                                    {testimonial.message}
                                </p>

                                <div className="testimonial-stars">

                                    {"★".repeat(testimonial.rating || 5)}

                                </div>

                            </div>

                            <div className="testimonial-status">

                                {testimonial.isPublished ? "Published" : "Draft"}

                            </div>

                            <div className="testimonial-actions">

                                <button onClick={()=> handleEdit(testimonial)}>
                                    Edit
                                </button>

                                <button className="testimonial-delete" onClick={()=> handleDelete(testimonial._id)}>
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))
                )}
            </section>

        </div>
    );
};
export default AdminTestimonials;