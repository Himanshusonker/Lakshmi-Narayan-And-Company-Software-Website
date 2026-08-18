import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ClientLogin = () => {

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // =========================================================
    // LOGIN
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");

        if (!email || !password) 
        {
            setError("Please enter email and password");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(`${API_URL}/api/client-auth/login`,
                {
                    email,
                    password
                }
            );

            if (response.data.success) {

                // ------------------------------------------------
                // SAVE CLIENT TOKEN
                // ------------------------------------------------

                localStorage.setItem("clientToken", response.data.token);

                // ------------------------------------------------
                // SAVE CLIENT DATA
                // ------------------------------------------------

                localStorage.setItem("clientData", JSON.stringify(response.data.client));

                // ------------------------------------------------
                // REDIRECT
                // ------------------------------------------------

                navigate("/client/dashboard", { replace: true });

            }

        } catch (error) {

            console.log("Client Login Error:", error);

            setError(error.response?.data?.message || "Login failed. Please try again.");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="client-login-page">

            <div className="client-login-container">


{/* ================================================= BRAND ===================================== */}

                <div className="client-login-brand">

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


{/* ================================================= CARD ======================================= */}

                <div className="client-login-card">

                    <div className="client-login-header">

                        <span>
                            CLIENT PORTAL
                        </span>

                        <h1>
                            Welcome Back
                        </h1>

                        <p>
                            Login to view your project
                            progress and updates.
                        </p>

                    </div>

                    {error && (

                        <div className="client-login-error">

                            {error}

                        </div>

                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="client-login-group">

                            <label>
                                Company Email
                            </label>

                            <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder="Enter company email" required/>

                        </div>

                        <div className="client-login-group">

                            <label>
                                Password
                            </label>

                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required/>

                        </div>

                        <button type="submit" className="client-login-btn" disabled={loading}>

                            {loading ? "Logging in..." : "Login to Client Portal"}

                        </button>

                    </form>

                    <div className="client-register-link">

                        Don't have a company account?

                        {" "}

                        <Link to="/client/register">

                            Register Company

                        </Link>

                    </div>

                    <Link to="/" className="client-back-home">

                        ← Back to Website

                    </Link>

                </div>

            </div>

        </div>

    );

};
export default ClientLogin;