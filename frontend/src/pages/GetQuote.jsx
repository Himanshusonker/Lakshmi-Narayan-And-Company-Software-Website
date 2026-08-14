import React, { useState } from "react";
import axios from "axios";

const GetQuote=()=>{

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        timeline: "",
        message: ""

    });

    const [loading, setLoading]=useState(false);
    const [success, setSuccess]=useState("");
    const [error, setError]=useState("");


    // ========================================================================
    // INPUT CHANGE
    // ========================================================================

    const handleChange=(e)=>{

        const {name, value}= e.target;
        setFormData((previous)=>({...previous, [name]: value}));

    };


    // ========================================================================
    // SUBMIT
    // ========================================================================

    const handleSubmit=async(e)=>{

        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        try {

            const response= await axios.post(`${import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL}/leads`, formData);

            if (response.data.success) {

                setSuccess("Thank you! Your project enquiry has been submitted successfully.");
                setFormData({name: "", email: "", phone: "", company: "", service: "", budget: "", timeline: "", message: ""});

            }

        } catch (error) {

            console.log("Get Quote Error:", error);

            setError(error.response?.data?.message || "Unable to submit your enquiry.");

        } finally {

            setLoading(false);

        }
    };

    return (

            <div className="quote-page">

{/* ============================================= HERO =========================================== */}

            <section className="quote-hero">
                <div className="quote-hero-container">

                    <span>
                        GET A QUOTE
                    </span>

                    <h1>
                        Let's Build Something
                        <strong>
                            {" "}Amazing Together
                        </strong>
                    </h1>

                    <p>
                        Tell us about your project and our team
                        will get back to you shortly.
                    </p>

                </div>

            </section>


{/* ============================================= FORM =========================================== */}

            <section className="quote-section">
                <div className="quote-container">

                                            {/* LEFT */}

                    <div className="quote-content">

                        <span className="quote-small-title">
                            START YOUR PROJECT
                        </span>

                        <h2>
                            Tell Us About Your Project
                        </h2>

                        <p>
                            Share your requirements with us.
                            Whether you need a website, mobile
                            application, custom software or UI/UX
                            design, we can help turn your idea into
                            a digital solution.
                        </p>


                        <div className="quote-points">

                            <div>
                                ✓ Free Initial Consultation
                            </div>

                            <div>
                                ✓ Requirement Analysis
                            </div>

                            <div>
                                ✓ Transparent Communication
                            </div>

                            <div>
                                ✓ Professional Development
                            </div>

                        </div>

                    </div>


                                                {/* FORM */}

                    <form className="quote-form" onSubmit={handleSubmit}>
                        <div className="quote-row">
                            <div className="quote-field">

                                <label>
                                    Name *
                                </label>

                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />

                            </div>

                            <div className="quote-field">

                                <label>
                                    Email *
                                </label>

                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required/>

                            </div>

                        </div>

                        <div className="quote-row">
                            <div className="quote-field">

                                <label>
                                    Phone *
                                </label>

                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required/>

                            </div>

                            <div className="quote-field">

                                <label>
                                    Company
                                </label>

                                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name"/>

                            </div>

                        </div>

                        <div className="quote-row">
                            <div className="quote-field">

                                <label>
                                    Service *
                                </label>

                                <select name="service" value={formData.service} onChange={handleChange} required>

                                    <option value="">
                                        Select Service
                                    </option>

                                    <option value="Web Development">
                                        Web Development
                                    </option>

                                    <option value="Mobile App Development">
                                        Mobile App Development
                                    </option>

                                    <option value="UI/UX Design">
                                        UI/UX Design
                                    </option>

                                    <option value="Software Development">
                                        Software Development
                                    </option>

                                    <option value="E-Commerce Development">
                                        E-Commerce Development
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                            <div className="quote-field">

                                <label>
                                    Budget
                                </label>

                                <select name="budget" value={formData.budget} onChange={handleChange}>

                                    <option value="">
                                        Select Budget
                                    </option>

                                    <option value="Below ₹50,000">
                                        Below ₹50,000
                                    </option>

                                    <option value="₹50,000 - ₹1,00,000">
                                        ₹50,000 - ₹1,00,000
                                    </option>

                                    <option value="₹1,00,000 - ₹3,00,000">
                                        ₹1,00,000 - ₹3,00,000
                                    </option>

                                    <option value="₹3,00,000+">
                                        ₹3,00,000+
                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="quote-field">

                            <label>
                                Project Timeline
                            </label>

                            <select name="timeline" value={formData.timeline} onChange={handleChange}>

                                <option value="">
                                    Select Timeline
                                </option>

                                <option value="Less than 1 month">
                                    Less than 1 month
                                </option>

                                <option value="1 - 2 months">
                                    1 - 2 months
                                </option>

                                <option value="2 - 4 months">
                                    2 - 4 months
                                </option>

                                <option value="4+ months">
                                    4+ months
                                </option>

                            </select>

                        </div>

                        <div className="quote-field">

                            <label>
                                Project Details *
                            </label>

                            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows="6" required/>

                        </div>

                        {success && (

                            <div className="quote-success">
                                {success}
                            </div>

                        )}

                        {error && (

                            <div className="quote-error">
                                {error}
                            </div>

                        )}

                        <button type="submit" disabled={loading} className="quote-submit">

                            {loading ? "Submitting..." : "Submit Project Enquiry"}

                            {!loading && (
                                <span>
                                    →
                                </span>
                            )}

                        </button>

                    </form>

                </div>

            </section>

        </div>
    );
};
export default GetQuote;