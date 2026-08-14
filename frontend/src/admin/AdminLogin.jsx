import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import adminAxios from "../api/adminAxios";

const AdminLogin=()=>{

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState("");
    const navigate=useNavigate();

// =============================================================================================
//                                              LOGIN
// =============================================================================================

    const handleLogin=async(e)=>{
        e.preventDefault();
        setError("");

        if (!email || !password) {

            setError("Please enter email and password");
            return;

        }

        try {

            setLoading(true);

            const response= await adminAxios.post(`/admin/login`,
                    {
                        email,
                        password
                    }
                );

            if (response.data.success) {

// -------------------------------------------------------------------------------
//                                               SAVE TOKEN
// -------------------------------------------------------------------------------

        localStorage.setItem("adminToken", response.data.token);

// -------------------------------------------------------------------------------
//                                            SAVE ADMIN DATA
// -------------------------------------------------------------------------------

        localStorage.setItem("adminData", JSON.stringify(response.data.admin));

// -------------------------------------------------------------------------------
//                                               DASHBOARD
// -------------------------------------------------------------------------------

        navigate("/admin/dashboard");
            }
        } catch (error) {
            console.log("Admin Login Error:", error);
            setError(error.response?.data?.message || "Unable to login");
        }

        finally {
            setLoading(false);
        }
    };


    return (

                <div className="admin-login-page">
                    <div className="admin-login-card">

{/* =============================================== LOGO ========================================= */}

                <div className="admin-login-logo">
                    <div className="admin-logo-symbol">
                        LN
                    </div>

                    <div className="admin-logo-text">

                        <strong>
                            LAKSHMI NARAYAN
                        </strong>

                        <span>
                            AND COMPANY
                        </span>

                    </div>

                </div>

{/* =============================================== TITLE========================================= */}

                <div className="admin-login-heading">

                    <span>
                        ADMIN PANEL
                    </span>

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Login to manage your website.
                    </p>

                </div>

{/* =============================================== ERROR ======================================== */}

                {error && (
                    <div className="admin-login-error">
                        {error}
                    </div>
                )}

{/* ================================================ FORM ======================================== */}

                <form onSubmit={handleLogin} className="admin-login-form">

                    <div className="admin-login-field">

                        <label>
                            Email Address
                        </label>

                        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="admin@example.com" autoComplete="email" />

                    </div>

                    <div className="admin-login-field">

                        <label>
                            Password
                        </label>

                        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" />

                    </div>

                    <button type="submit" disabled={loading} className="admin-login-button">

                        {loading ? "Signing In...": "Sign In"}

                        {!loading && (
                            <span>
                                →
                            </span>
                        )}

                    </button>

                </form>

                <div className="admin-login-footer">

                    <p>
                        © {new Date().getFullYear()}
                        {" "}
                        Lakshmi Narayan And Company
                    </p>

                </div>
            </div>
        </div>
    );
};
export default AdminLogin;