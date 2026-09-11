import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import caAxios from "../api/caAxios";


const CALogin = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        if (!username || !password) {

            setError(
                "Username and password are required"
            );

            return;
        }

        try {

            setLoading(true);

            const response = await caAxios.post(
                "/api/ca/login",
                {
                    username,
                    password
                }
            );

            if (response.data.success) {

                localStorage.setItem(
                    "caToken",
                    response.data.token
                );

                localStorage.setItem(
                    "caData",
                    JSON.stringify(response.data.ca)
                );

                navigate("/ca/dashboard");

            } else {

                setError(
                    response.data.message ||
                    "Login failed"
                );

            }

        } catch (error) {

            console.error(
                "CA Login Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to login. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="ca-login-page">

            <div className="ca-login-card">

                <div className="ca-login-header">

                    <div className="ca-login-icon">
                        👨‍💼
                    </div>

                    <span className="ca-login-label">
                        LAKSHMI NARAYAN & COMPANY
                    </span>

                    <h1>
                        CA Portal
                    </h1>

                    <p>
                        Sign in to access your CA dashboard
                    </p>

                </div>


                {error && (

                    <div className="ca-login-error">
                        {error}
                    </div>

                )}


                <form onSubmit={handleLogin}>

                    <div className="ca-login-field">

                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            autoComplete="username"
                        />

                    </div>


                    <div className="ca-login-field">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="current-password"
                        />

                    </div>


                    <button
                        type="submit"
                        className="ca-login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In"
                        }

                    </button>

                </form>


                <div className="ca-login-footer">

                    <span>
                        Authorized CA Access Only
                    </span>

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                    >
                        ← Back to Website
                    </button>

                </div>

            </div>

        </div>

    );

};

export default CALogin;