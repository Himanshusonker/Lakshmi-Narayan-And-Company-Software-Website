import React from "react";
import { Link } from "react-router-dom";

const FooterAI = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="ai-footer">

            <div className="ai-footer-container">

                {/* =========================================================
                    COMPANY
                ========================================================= */}

                <div className="ai-footer-column ai-footer-company">

                    <Link to="/" className="ai-footer-logo">
                        <span className="ai-footer-logo-ai">AI</span>
                        <span className="ai-footer-logo-text">
                            Website
                        </span>
                    </Link>

                    <p>
                        Building intelligent digital solutions with
                        Artificial Intelligence, automation and modern
                        software technologies.
                    </p>

                    <div className="ai-footer-social">

                        <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Twitter"
                        >
                            𝕏
                        </a>

                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                        >
                            in
                        </a>

                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                        >
                            f
                        </a>

                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                        >
                            ◎
                        </a>

                    </div>

                </div>


                {/* =========================================================
                    COMPANY LINKS
                ========================================================= */}

                <div className="ai-footer-column">

                    <h3>Company</h3>

                    <Link to="/about">
                        About
                    </Link>

                    <Link to="/projects">
                        Projects
                    </Link>

                    <Link to="/pricing">
                        Pricing
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>

                </div>


                {/* =========================================================
                    SERVICES
                ========================================================= */}

                <div className="ai-footer-column">

                    <h3>Services</h3>

                    <Link to="/services">
                        AI Development
                    </Link>

                    <Link to="/services">
                        Web Development
                    </Link>

                    <Link to="/services">
                        Software Development
                    </Link>

                    <Link to="/services">
                        Mobile App Development
                    </Link>

                    <Link to="/services">
                        AI Automation
                    </Link>

                </div>


                {/* =========================================================
                    AI SOLUTIONS
                ========================================================= */}

                <div className="ai-footer-column">

                    <h3>AI Solutions</h3>

                    <Link to="/ai-solutions">
                        AI Chatbots
                    </Link>

                    <Link to="/ai-solutions">
                        Business Automation
                    </Link>

                    <Link to="/ai-solutions">
                        Document AI
                    </Link>

                    <Link to="/ai-solutions">
                        Customer Support AI
                    </Link>

                    <Link to="/ai-solutions">
                        Custom AI Solutions
                    </Link>

                </div>


                {/* =========================================================
                    GET IN TOUCH
                ========================================================= */}

                <div className="ai-footer-column ai-footer-contact">

                    <h3>Get In Touch</h3>


                    {/* Email */}

                    <div className="ai-footer-contact-item">

                        <span className="ai-footer-contact-icon">
                            ✉
                        </span>

                        <div>

                            <small>
                                Email
                            </small>

                            <a href="mailto:infolakshminarayanandco@gmail.com">
                                infolakshminarayanandco@gmail.com
                            </a>

                        </div>

                    </div>


                    {/* Phone */}

                    <div className="ai-footer-contact-item">

                        <span className="ai-footer-contact-icon">
                            ☎
                        </span>

                        <div>

                            <small>
                                Phone
                            </small>

                            <a href="tel:+919335187678">
                                +91 9335187678
                            </a>

                        </div>

                    </div>


                    {/* Location */}

                    <div className="ai-footer-contact-item">

                        <span className="ai-footer-contact-icon">
                            ◎
                        </span>

                        <div>

                            <small>
                                Location
                            </small>

                            <p>
                                Coolie Bazar, Kanpur 208001
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================================================
                FOOTER BOTTOM
            ========================================================= */}

            <div className="ai-footer-bottom">

                <div className="ai-footer-bottom-container">

                    <p>
                        © {currentYear} AI Website.
                        All rights reserved.
                    </p>

                    <div className="ai-footer-bottom-links">

                        <Link to="/privacy-policy">
                            Privacy Policy
                        </Link>

                        <Link to="/terms">
                            Terms & Conditions
                        </Link>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default FooterAI;

