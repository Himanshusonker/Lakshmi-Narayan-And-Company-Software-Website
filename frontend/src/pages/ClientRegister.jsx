import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ClientRegister = () => {

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL;

    const [formData, setFormData] = useState({

        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: "",
        gstNumber: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =========================================================
    // INPUT CHANGE
    // =========================================================

    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData((prev) => ({...prev, [name]: value}));

    };


    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage("");
        setError("");

        if (formData.password !== formData.confirmPassword) 
        {
            setError("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            const response= await axios.post(`${API_URL}/api/client-auth/register`, formData);

            if (response.data.success) {

                setMessage("Registration successful. Redirecting to login...");

                setTimeout(()=> {
                    navigate("/client/login");
                }, 1500);
            }

        } catch (error) {

            console.log("Client Registration Error:", error);

            setError(error.response?.data?.message || "Registration failed. Please try again.");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="client-register-page">

            <div className="client-register-container">


{/* ========================================== LEFT SECTION ===================================== */}

                <div className="client-register-info">

                    <div className="client-brand">

                        <div className="client-brand-logo">
                            LN
                        </div>

                        <div>

                            <h2>
                                LAKSHMI NARAYAN
                            </h2>

                            <span>
                                AND COMPANY
                            </span>

                        </div>

                    </div>


                    <h1>
                        Project Management Portal
                    </h1>

                    <p>
                        Register your company to access
                        your project progress, updates
                        and project information.
                    </p>

                    <div className="client-register-features">

                        <div>
                            ✓ Track project progress
                        </div>

                        <div>
                            ✓ View completed pages
                        </div>

                        <div>
                            ✓ Receive project updates
                        </div>

                        <div>
                            ✓ Monitor remaining work
                        </div>

                    </div>

                </div>


{/* ================================================= FORM ====================================== */}

                <div className="client-register-card">

                    <div className="client-form-header">

                        <span>
                            CLIENT REGISTRATION
                        </span>

                        <h2>
                            Create Company Account
                        </h2>

                        <p>
                            Register to manage your project.
                        </p>

                    </div>

                    {message && (

                        <div className="client-success-message">

                            {message}

                        </div>

                    )}

                    {error && (

                        <div className="client-error-message">

                            {error}

                        </div>

                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="client-form-group">

                            <label>
                                Company Name *
                            </label>

                            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter company name" required/>

                        </div>

                        <div className="client-form-group">

                            <label>
                                Contact Person *
                            </label>

                            <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Enter contact person name" required/>

                        </div>

                        <div className="client-form-row">

                            <div className="client-form-group">

                                <label>
                                    Email *
                                </label>

                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="company@email.com" required/>

                            </div>

                            <div className="client-form-group">

                                <label>
                                    Phone *
                                </label>

                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" required/>

                            </div>
                        </div>

                        <div className="client-form-row">

                            <div className="client-form-group">

                                <label>
                                    Password *
                                </label>

                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" required minLength="6"/>

                            </div>

                            <div className="client-form-group">

                                <label>
                                    Confirm Password *
                                </label>

                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required minLength="6"/>

                            </div>
                        </div>

                        <div className="client-form-group">

                            <label>
                                Address
                            </label>

                            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Company address" rows="3"/>

                        </div>

                        <div className="client-form-group">

                            <label>
                                GST Number
                            </label>

                            <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="GST number (optional)"/>

                        </div>

                        <button type="submit" className="client-register-btn" disabled={loading}>

                            {loading ? "Creating Account..." : "Create Company Account"}

                        </button>

                    </form>

                    <div className="client-login-link">

                        Already have an account?

                        {" "}

                        <Link to="/client/login">

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};
export default ClientRegister;