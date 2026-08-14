import React from "react";
import { Link } from "react-router-dom";

const Footer=()=>{
    return(
        <>

            <footer className="main-footer">

{/* =============================================================================================== */}
{/*                                             FOOTER TOP */                                         }
{/* =============================================================================================== */}

            <div className="footer-top">
                <div className="footer-container">

{/* =============================================================================================== */}
{/*                                             COMPANY                                             */}
{/* =============================================================================================== */}

                    <div className="footer-company">

                        <Link to="/" className="footer-logo" >

                            <div className="footer-logo-symbol">
                                LN
                            </div>

                            <div className="footer-logo-text">

                                <strong>
                                    LAKSHMI NARAYAN
                                </strong>

                                <span>
                                    AND COMPANY
                                </span>

                            </div>

                        </Link>

                        <p>
                            We build modern digital
                            solutions that help businesses
                            grow, innovate and succeed.
                        </p>

                        <div className="footer-social">

                            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                in
                            </a>

                            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                                ig
                            </a>

                            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                                f
                            </a>

                            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" >
                                gh
                            </a>

                        </div>
                    </div>

{/* =============================================================================================== */}
{/*                                         COMPANY LINKS                                           */}
{/* =============================================================================================== */}

                    <div className="footer-column">

                        <h3>
                            Company
                        </h3>

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/about-us">
                            About Us
                        </Link>

                        <Link to="/our-work">
                            Our Work
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                    </div>

{/* =============================================================================================== */}
{/*                                           SERVICES                                              */}
{/* =============================================================================================== */}

                    <div className="footer-column">

                        <h3>
                            Services
                        </h3>

                        <Link to="/services/web-development">
                            Web Development
                        </Link>

                        <Link to="/services/mobile-development">
                            Mobile App Development
                        </Link>

                        <Link to="/services/ui-ux-design">
                            UI/UX Design
                        </Link>

                        <Link to="/services/software-development">
                            Software Development
                        </Link>

                    </div>

{/* =============================================================================================== */}
{/*                                             CONTACT                                             */}
{/* =============================================================================================== */}

                    <div className="footer-column footer-contact">

                        <h3>
                            Get In Touch
                        </h3>

                        <div className="contact-item">

                            <span className="contact-icon">
                                ✉
                            </span>

                            <div>
                                <small>
                                    Email
                                </small>

                                <a href="mailto:infolakshminarayanandco@gmail.com" >
                                    infolakshminarayanandco@gmail.com
                                </a>

                            </div>

                        </div>

                        <div className="contact-item">

                            <span className="contact-icon">
                                ☎
                            </span>

                            <div>
                                <small>
                                    Phone
                                </small>

                                <a href="tel:+919335187678" >
                                    +91 9335187678
                                </a>

                            </div>

                        </div>

                        <div className="contact-item">

                            <span className="contact-icon">
                                ◎
                            </span>

                            <div>

                                <small>
                                    Location
                                </small>

                                <p>
                                    India
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

{/* =============================================================================================== */}
{/*                                             FOOTER CTA                                          */}
{/* =============================================================================================== */}

            <div className="footer-cta">
                <div className="footer-cta-container">

                    <div>

                        <span>
                            HAVE A PROJECT IN MIND?
                        </span>

                        <h2>
                            Let's build something
                            amazing together.
                        </h2>

                    </div>

                    <Link to="/contact" className="footer-cta-button">

                        Start Your Project

                        <span>
                            →
                        </span>

                    </Link>

                </div>
            </div>

{/* =============================================================================================== */}
{/*                                            FOOTER BOTTOM                                        */}
{/* =============================================================================================== */}

            <div className="footer-bottom">
                <div className="footer-bottom-container">

                    <p>
                        © {new Date().getFullYear()}
                        {" "}
                        Lakshmi Narayan And Company.
                        All Rights Reserved.
                    </p>

                    <div className="footer-legal">

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

        </>
    );
}
export default Footer;