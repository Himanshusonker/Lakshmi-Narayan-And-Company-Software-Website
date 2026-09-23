import React, { useState } from "react";
import axios from "axios";
import SEO from "../componentAI/SEOAI";
import { contactSEO } from "../DataAI/seoAIData";


const API_URL =import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL || "http://localhost:7070";

const ContactAI = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        projectDescription: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await axios.post(
                `${API_URL}/api/contactai`,
                formData
            );

            setMessage(
                response.data?.message ||
                    "Your project request has been submitted successfully."
            );

            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                service: "",
                budget: "",
                projectDescription: "",
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to send your request. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <>

      <SEO {...contactSEO} />

        <main className="contact-ai-page">

            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="contact-ai-hero">

                <div className="contact-ai-hero-overlay"></div>

                <div className="contact-ai-container contact-ai-hero-content">

                    <span className="contact-ai-badge">
                        LET'S BUILD TOGETHER
                    </span>

                    <h1>
                        Let's Talk About
                        <span> Your Next Project</span>
                    </h1>

                    <p>
                        Tell us about your business, idea or technology
                        requirement. Our team will help you identify the
                        right digital solution.
                    </p>

                </div>
            </section>


            {/* =====================================================
                CONTACT FORM + AI ASSISTANT
            ====================================================== */}
            <section className="contact-ai-main-section">

                <div className="contact-ai-container">

                    <div className="contact-ai-layout">

                        {/* ================= FORM ================= */}

                        <div className="contact-ai-form-wrapper">

                            <div className="contact-ai-section-heading">

                                <span>CONTACT FORM</span>

                                <h2>
                                    Tell Us About
                                    <strong> Your Project</strong>
                                </h2>

                                <p>
                                    Share your requirements and we will get
                                    back to you with the next steps.
                                </p>

                            </div>

                            <form id="contact-form"
                                className="contact-ai-form"
                                onSubmit={handleSubmit}
                            >

                                <div className="contact-ai-form-grid">

                                    <div className="contact-ai-field">
                                        <label htmlFor="name">
                                            Name *
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>


                                    <div className="contact-ai-field">
                                        <label htmlFor="email">
                                            Email *
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>


                                    <div className="contact-ai-field">
                                        <label htmlFor="phone">
                                            Phone
                                        </label>

                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>


                                    <div className="contact-ai-field">
                                        <label htmlFor="company">
                                            Company
                                        </label>

                                        <input
                                            id="company"
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Company name"
                                        />
                                    </div>


                                    <div className="contact-ai-field">
                                        <label htmlFor="service">
                                            Service *
                                        </label>

                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">
                                                Select a service
                                            </option>

                                            <option value="Web Development">
                                                Web Development
                                            </option>

                                            <option value="Software Development">
                                                Software Development
                                            </option>

                                            <option value="AI Development">
                                                AI Development
                                            </option>

                                            <option value="AI Chatbot">
                                                AI Chatbot
                                            </option>

                                            <option value="Automation">
                                                Automation
                                            </option>

                                            <option value="API Integration">
                                                API Integration
                                            </option>

                                            <option value="Custom AI Solution">
                                                Custom AI Solution
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>
                                        </select>
                                    </div>


                                    <div className="contact-ai-field">
                                        <label htmlFor="budget">
                                            Budget
                                        </label>

                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select your budget
                                            </option>

                                            <option value="Under ₹25,000">
                                                Under ₹25,000
                                            </option>

                                            <option value="₹25,000 - ₹50,000">
                                                ₹25,000 - ₹50,000
                                            </option>

                                            <option value="₹50,000 - ₹1,00,000">
                                                ₹50,000 - ₹1,00,000
                                            </option>

                                            <option value="₹1,00,000 - ₹2,00,000">
                                                ₹1,00,000 - ₹2,00,000
                                            </option>

                                            <option value="₹2,00,000+">
                                                ₹2,00,000+
                                            </option>

                                            <option value="Not Sure">
                                                Not Sure
                                            </option>
                                        </select>
                                    </div>

                                </div>


                                <div className="contact-ai-field">

                                    <label htmlFor="projectDescription">
                                        Project Description *
                                    </label>

                                    <textarea
                                        id="projectDescription"
                                        name="projectDescription"
                                        value={formData.projectDescription}
                                        onChange={handleChange}
                                        placeholder="Tell us about your project, requirements, features, timeline or any other details..."
                                        rows="7"
                                        required
                                    ></textarea>

                                </div>


                                {message && (
                                    <div className="contact-ai-success">
                                        ✓ {message}
                                    </div>
                                )}


                                {error && (
                                    <div className="contact-ai-error">
                                        {error}
                                    </div>
                                )}


                                <button
                                    type="submit"
                                    className="contact-ai-submit-button"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Sending Request..."
                                        : "Send Request →"}
                                </button>

                            </form>

                        </div>


                        {/* ================= SIDE PANEL ================= */}

                        <aside className="contact-ai-side">

                            {/* AI PROJECT ASSISTANT */}

                            <div className="contact-ai-assistant-card">

                                <div className="contact-ai-assistant-icon">
                                    AI
                                </div>

                                <span className="contact-ai-small-label">
                                    AI PROJECT ASSISTANT
                                </span>

                                <h3>
                                    Not Sure What
                                    <strong> You Need?</strong>
                                </h3>

                                <p>
                                    Our AI-focused approach can help identify
                                    the right technology, features and
                                    development direction for your project.
                                </p>

                                <div className="contact-ai-assistant-list">

                                    <div>
                                        <span>01</span>
                                        Understand your idea
                                    </div>

                                    <div>
                                        <span>02</span>
                                        Identify the right solution
                                    </div>

                                    <div>
                                        <span>03</span>
                                        Plan the technology
                                    </div>

                                </div>

                                <a
                                    href="#contact-form"
                                    className="contact-ai-assistant-button"
                                >
                                    Discuss Your Idea
                                </a>

                            </div>


                            {/* GET QUOTE */}

                            <div className="contact-ai-quote-card">

                                <span>GET QUOTE</span>

                                <h3>
                                    Ready to Start?
                                </h3>

                                <p>
                                    Send us your requirements and our team
                                    will review your project.
                                </p>

                                <a href="#contact-form">
                                    Request a Quote →
                                </a>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>


            {/* =====================================================
                BUSINESS INFORMATION
            ====================================================== */}
            <section className="contact-ai-business-section">

                <div className="contact-ai-container">

                    <div className="contact-ai-section-heading">

                        <span>BUSINESS INFORMATION</span>

                        <h2>
                            Let's Connect
                            <strong> With Us</strong>
                        </h2>

                        <p>
                            Have questions before starting your project?
                            Reach out to us directly.
                        </p>

                    </div>


                    <div className="contact-ai-business-grid">

                        <div className="contact-ai-business-card">

                            <div className="contact-ai-business-icon">
                                📍
                            </div>

                            <h3>Office</h3>

                            <p>
                                Coolei Bazar
                                <br />
                                Kanpur Nagar, Uttar Pradesh
                                <br />
                                India
                            </p>

                        </div>


                        <div className="contact-ai-business-card">

                            <div className="contact-ai-business-icon">
                                ✉️
                            </div>

                            <h3>Email</h3>

                            <p>
                                Contact us through our official business
                                communication channel.
                            </p>

                        </div>


                        <div className="contact-ai-business-card">

                            <div className="contact-ai-business-icon">
                                💼
                            </div>

                            <h3>Business Solutions</h3>

                            <p>
                                Web Development, Software, AI, Automation,
                                APIs and custom technology solutions.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FINAL CTA
            ====================================================== */}
            <section className="contact-ai-final-cta">

                <div className="contact-ai-container">

                    <div className="contact-ai-final-content">

                        <span>
                            YOUR IDEA. OUR TECHNOLOGY.
                        </span>

                        <h2>
                            Let's Build
                            <strong> Something Valuable.</strong>
                        </h2>

                        <p>
                            Start the conversation today and take the next
                            step toward your digital product.
                        </p>

                        <a
                            href="#contact-form"
                            className="contact-ai-final-button"
                        >
                            Send Project Request →
                        </a>

                    </div>

                </div>

            </section>

        </main>

        </>
    );
};

export default ContactAI;
