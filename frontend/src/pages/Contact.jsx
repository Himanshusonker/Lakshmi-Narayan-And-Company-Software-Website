import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Contact=()=>{

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    // ============================================================
    // HANDLE CHANGE
    // ============================================================

    const handleChange=(e)=>{

        const { name, value }= e.target;

        setFormData({...formData, [name]: value });

    };


    // ============================================================
    // SUBMIT CONTACT FORM
    // ============================================================

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try {

            setLoading(true);
            setSuccess("");
            setError("");


            const response = await axios.post(`${import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL}/contact`, formData);

            if (response.data.success) {

                setSuccess("Thank you! Your message has been sent successfully. We will contact you soon.");
                setFormData({ name: "",  email: "", phone: "", subject: "", message: "" });
            } else {

               setError(response.data.message || "Unable to send your message.");
            }

        } catch (error) {

            console.log("Contact API Error:", error);
            console.log("Status:", error.response?.status);
            console.log("Response Data:", error.response?.data);
            console.log("Response URL:", error.config?.url);

            setError(error.response?.data?.message || "Unable to send your message. Please try again.");

        } finally {

            setLoading(false);

        }
    };

    return (

            <div className="contact-page">

{/* =========================================== HERO ============================================= */}

            <section className="contact-hero">
                <div className="contact-hero-container">

                    <span className="contact-hero-small">
                        GET IN TOUCH
                    </span>

                    <h1>
                        Let's Build Something
                        <strong>
                            {" "}Amazing Together
                        </strong>
                    </h1>

                    <p>
                        Have a project idea or need a digital
                        solution for your business? Tell us about
                        your project and our team will get back
                        to you.
                    </p>

                </div>

            </section>

{/* ======================================= CONTACT MAIN ========================================= */}

            <section className="contact-main">
                <div className="contact-container">

{/* ==================================== CONTACT INFORMATION ===================================== */}

                    <div className="contact-info">

                        <span className="contact-small-title">
                            CONTACT US
                        </span>

                        <h2>
                            Let's Talk About
                            <span>
                                {" "}Your Project
                            </span>
                        </h2>

                        <p className="contact-intro">

                            Whether you need a website, mobile
                            application, custom software or a
                            complete digital solution, we would
                            love to hear from you.

                        </p>


                                            {/* EMAIL */}

                        <div className="contact-info-item">

                            <div className="contact-info-icon">
                                ✉
                            </div>

                            <div>

                                <small>
                                    EMAIL
                                </small>

                                <a href="mailto:infolakshminarayanandco@gmail.com">
                                    infolakshminarayanandco@gmail.com
                                </a>

                            </div>

                        </div>


                                            {/* PHONE */}

                        <div className="contact-info-item">

                            <div className="contact-info-icon">
                                ☎
                            </div>

                            <div>

                                <small>
                                    PHONE
                                </small>

                                <a href="tel:+919335187678">
                                    +91 9335187678
                                </a>

                            </div>

                        </div>


                                            {/* LOCATION */}

                        <div className="contact-info-item">

                            <div className="contact-info-icon">
                                ◎
                            </div>

                            <div>

                                <small>
                                    LOCATION
                                </small>

                                <p>
                                    India
                                </p>

                            </div>

                        </div>


                                            {/* RESPONSE */}

                        <div className="contact-response-box">

                            <div className="contact-response-icon">
                                ✓
                            </div>

                            <div>

                                <h4>
                                    Quick Response
                                </h4>

                                <p>
                                    Our team will review your
                                    enquiry and get back to you
                                    as soon as possible.
                                </p>

                            </div>

                        </div>

                    </div>


{/* ======================================== CONTACT FORM ======================================== */}

                    <div className="contact-form-box">

                        <div className="contact-form-header">

                            <span>
                                SEND US A MESSAGE
                            </span>

                            <h2>
                                Tell Us About Your Project
                            </h2>

                            <p>
                                Fill out the form below and
                                we'll get in touch with you.
                            </p>

                        </div>


                                            {/* SUCCESS */}

                        {success && (

                            <div className="contact-success">

                                ✓ {success}

                            </div>

                        )}


                                                {/* ERROR */}

                        {error && (

                            <div className="contact-error">

                                {error}

                            </div>

                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="contact-form-grid">


                                            {/* NAME */}

                                <div className="contact-form-group">

                                    <label>
                                        Your Name
                                    </label>

                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />

                                </div>


                                                {/* EMAIL */}

                                <div className="contact-form-group">

                                    <label>
                                        Email Address
                                    </label>

                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

                                </div>


                                                {/* PHONE */}

                                <div className="contact-form-group">

                                    <label>
                                        Phone Number
                                    </label>

                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />

                                </div>


                                                {/* SUBJECT */}

                                <div className="contact-form-group">

                                    <label>
                                        Subject
                                    </label>

                                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project enquiry" required />

                                </div>


                                                {/* MESSAGE */}

                                <div className="contact-form-group full">

                                    <label>
                                        Your Message
                                    </label>

                                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows="7" required />

                                </div>

                            </div>


                                                {/* BUTTON */}

                            <button type="submit" className="contact-submit-button" disabled={loading}>

                                {loading ? "Sending..." : "Send Message"}

                                {!loading && (
                                    <span>
                                        →
                                    </span>
                                )}

                            </button>

                        </form>

                    </div>

                </div>

            </section>


{/* ============================================= CTA ============================================ */}

            <section className="contact-cta">
                <div className="contact-cta-container">
                    <div>

                        <span>
                            HAVE A PROJECT IN MIND?
                        </span>

                        <h2>
                            Let's turn your idea
                            into reality.
                        </h2>

                        <p>
                            From concept to deployment,
                            we're ready to help you build
                            something remarkable.
                        </p>

                    </div>

                    <Link to="/our-work" className="contact-cta-button">

                        View Our Work

                        <span>
                            →
                        </span>

                    </Link>

                </div>

            </section>

        </div>
    );
};
export default Contact;