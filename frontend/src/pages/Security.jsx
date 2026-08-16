import React from "react";
import { Link } from "react-router-dom";

const Security=()=>{

  return (

                <div className="security-page">

                                            {/* HERO */}

                <section className="security-hero">

                    <div className="security-hero-content">

                    <span className="security-badge">
                        WEBSITE SECURITY
                    </span>

                    <h1>
                        Security Built Into
                        <span> Every Digital Experience</span>
                    </h1>

                    <p>
                        We focus on secure development practices to help protect
                        websites, applications, customer information and business
                        data from common digital threats.
                    </p>

                    <Link to="/contact" className="security-hero-btn">
                        Discuss Your Project
                    </Link>

                    </div>

                </section>

                                            {/* INTRO */}

                <section className="security-intro">
                    <div className="security-container">

                    <div className="security-heading">
                        <span>OUR SECURITY APPROACH</span>

                        <h2>
                        Security Is Not an
                        <strong> Afterthought</strong>
                        </h2>

                        <p>
                            Security should be considered throughout the software
                            development lifecycle. From authentication and API
                            protection to server configuration and data handling,
                            every layer of a web application can contribute to its
                            overall security.
                        </p>
                    </div>

                    <div className="security-grid">

                        <div className="security-card">
                        <div className="security-card-icon">🔐</div>
                        <h3>Secure Authentication</h3>
                        <p>
                            Protect user accounts with appropriate authentication
                            and password security practices.
                        </p>
                        </div>

                        <div className="security-card">
                        <div className="security-card-icon">🛡️</div>
                        <h3>API Protection</h3>
                        <p>
                            Secure backend APIs with authentication, authorization
                            and proper input validation.
                        </p>
                        </div>

                        <div className="security-card">
                        <div className="security-card-icon">🔒</div>
                        <h3>Data Protection</h3>
                        <p>
                            Handle sensitive business and customer information
                            carefully throughout the application.
                        </p>
                        </div>

                        <div className="security-card">
                        <div className="security-card-icon">🌐</div>
                        <h3>HTTPS</h3>
                        <p>
                            Use HTTPS/TLS to protect communication between users
                            and the web application.
                        </p>
                        </div>

                    </div>
                    </div>
                </section>

                                    {/* SECURITY AREAS */}

                <section className="security-areas">
                    <div className="security-container">

                    <div className="security-heading center">

                        <span>SECURITY AREAS</span>

                        <h2>
                            Protection Across
                        <strong> Multiple Layers</strong>
                        </h2>

                        <p>
                            Our development approach considers security at different
                            levels of a modern web application.
                        </p>

                    </div>

                    <div className="security-area-grid">

                        <div className="security-area">
                        <span>01</span>
                        <h3>Authentication</h3>
                        <p>
                            Secure login and account access using appropriate
                            authentication mechanisms.
                        </p>
                        </div>

                        <div className="security-area">
                        <span>02</span>
                        <h3>Authorization</h3>
                        <p>
                            Restrict sensitive features and resources based on
                            user roles and permissions.
                        </p>
                        </div>

                        <div className="security-area">
                        <span>03</span>
                        <h3>Input Validation</h3>
                        <p>
                            Validate incoming data before processing or storing
                            it in the application.
                        </p>
                        </div>

                        <div className="security-area">
                        <span>04</span>
                        <h3>API Security</h3>
                        <p>
                            Protect backend endpoints and sensitive operations
                            from unauthorized access.
                        </p>
                        </div>

                        <div className="security-area">
                        <span>05</span>
                        <h3>Database Security</h3>
                        <p>
                            Use protected database credentials and appropriate
                            access controls.
                        </p>
                        </div>

                        <div className="security-area">
                        <span>06</span>
                        <h3>Environment Security</h3>
                        <p>
                            Keep sensitive API keys, secrets and credentials out
                            of publicly accessible frontend code.
                        </p>
                        </div>

                    </div>

                    </div>
                </section>

                                    {/* BEST PRACTICES */}

                <section className="security-practices">
                    <div className="security-container">

                    <div className="security-practice-content">

                        <div className="security-heading">

                        <span>SECURITY BEST PRACTICES</span>

                        <h2>
                            Building With
                            <strong> Security in Mind</strong>
                        </h2>

                        <p>
                            A secure application requires continuous attention.
                            Development practices should be combined with secure
                            server configuration, monitoring and regular updates.
                        </p>

                        </div>

                        <div className="security-check-list">

                        <div>
                            <span>✓</span>
                            <p>HTTPS and secure communication</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Password hashing and secure authentication</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Backend authorization and access control</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Input validation and error handling</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Secure environment variables</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Regular dependency and security updates</p>
                        </div>

                        </div>

                    </div>

                    </div>
                </section>

                                            {/* CTA */}

                <section className="security-cta">

                    <div className="security-container">

                    <h2>
                        Build Your Website With
                        <span> Security in Mind</span>
                    </h2>

                    <p>
                        Talk to Lakshmi Narayan And Company about building a secure,
                        scalable and reliable web solution for your business.
                    </p>

                    <Link to="/contact" className="security-cta-btn">
                        Contact Us
                    </Link>

                    </div>

                </section>

                </div>
  );
};
export default Security;