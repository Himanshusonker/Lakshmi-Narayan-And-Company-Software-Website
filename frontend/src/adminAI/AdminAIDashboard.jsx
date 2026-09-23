import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL =import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL || "http://localhost:7070";

const AdminAIDashboard = () => {
    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ============================================================
    // LOAD DASHBOARD
    // ============================================================

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("adminToken");

            const response = await axios.get(
                `${API_URL}/api/adminai/dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setDashboard(response.data);
            } else {
                setError(
                    response.data.message ||
                    "Failed to load dashboard"
                );
            }
        } catch (error) {
            console.error(
                "Dashboard Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load dashboard"
            );
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // USE EFFECT
    // ============================================================

    useEffect(() => {
        loadDashboard();
    }, []);

    // ============================================================
    // DATE FORMAT
    // ============================================================

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="admin-dashboard-page">
                <div className="admin-dashboard-loading">
                    <div className="admin-loading-spinner"></div>

                    <p>
                        Loading Dashboard...
                    </p>
                </div>
            </div>
        );
    }

    // ============================================================
    // ERROR
    // ============================================================

    if (error) {
        return (
            <div className="admin-dashboard-page">
                <div className="admin-dashboard-error">
                    <h2>
                        Dashboard Error
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={loadDashboard}
                        className="admin-retry-button"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const stats = dashboard?.stats || {};

    const recentEnquiries =
        dashboard?.recentEnquiries || [];

    // ============================================================
    // DASHBOARD
    // ============================================================

    return (
        <div className="admin-dashboard-page">

            {/* =====================================================
                HEADER
            ====================================================== */}

            <div className="admin-dashboard-header">

                <div>
                    <span className="admin-dashboard-label">
                        ADMIN PANEL
                    </span>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Manage your AI website and
                        monitor recent enquiries.
                    </p>
                </div>

                <button
                    className="admin-refresh-button"
                    onClick={loadDashboard}
                >
                    ↻ Refresh
                </button>

            </div>

            {/* =====================================================
                STAT CARDS
            ====================================================== */}

            <div className="admin-stat-grid">

                {/* Total Leads */}

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        🎯
                    </div>

                    <div className="admin-stat-content">

                        <span>
                            Total Leads
                        </span>

                        <strong>
                            {stats.totalLeads || 0}
                        </strong>

                    </div>

                </div>

                {/* AI Conversations */}

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        🤖
                    </div>

                    <div className="admin-stat-content">

                        <span>
                            AI Conversations
                        </span>

                        <strong>
                            {stats.totalAIConversations || 0}
                        </strong>

                    </div>

                </div>

                {/* Projects */}

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        🚀
                    </div>

                    <div className="admin-stat-content">

                        <span>
                            Total Projects
                        </span>

                        <strong>
                            {stats.totalProjects || 0}
                        </strong>

                    </div>

                </div>

                {/* Services */}

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        🛠️
                    </div>

                    <div className="admin-stat-content">

                        <span>
                            Total Services
                        </span>

                        <strong>
                            {stats.totalServices || 0}
                        </strong>

                    </div>

                </div>

                {/* Contacts */}

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        📩
                    </div>

                    <div className="admin-stat-content">

                        <span>
                            Total Contacts
                        </span>

                        <strong>
                            {stats.totalContacts || 0}
                        </strong>

                    </div>

                </div>

            </div>

            {/* =====================================================
                RECENT ENQUIRIES
            ====================================================== */}

            <section className="admin-enquiries-section">

                <div className="admin-section-header">

                    <div>
                        <span className="admin-section-label">
                            CONTACT MANAGEMENT
                        </span>

                        <h2>
                            Recent Enquiries
                        </h2>
                    </div>

                    <span className="admin-enquiry-count">
                        {recentEnquiries.length} Recent
                    </span>

                </div>

                {recentEnquiries.length === 0 ? (

                    <div className="admin-empty-state">

                        <div className="admin-empty-icon">
                            📭
                        </div>

                        <h3>
                            No enquiries yet
                        </h3>

                        <p>
                            New contact enquiries
                            will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="admin-enquiries-table-wrapper">

                        <table className="admin-enquiries-table">

                            <thead>

                                <tr>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Company
                                    </th>

                                    <th>
                                        Service
                                    </th>

                                    <th>
                                        Budget
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {recentEnquiries.map(
                                    (enquiry) => (

                                        <tr
                                            key={
                                                enquiry._id
                                            }
                                        >

                                            <td>
                                                <div className="admin-name-cell">

                                                    <div className="admin-avatar">
                                                        {enquiry.name
                                                            ?.charAt(
                                                                0
                                                            )
                                                            ?.toUpperCase() ||
                                                            "U"}
                                                    </div>

                                                    <strong>
                                                        {
                                                            enquiry.name
                                                        }
                                                    </strong>

                                                </div>
                                            </td>

                                            <td>
                                                <span className="admin-email">
                                                    {
                                                        enquiry.email
                                                    }
                                                </span>
                                            </td>

                                            <td>
                                                {
                                                    enquiry.company ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                <span className="admin-service-badge">
                                                    {
                                                        enquiry.service
                                                    }
                                                </span>
                                            </td>

                                            <td>
                                                {
                                                    enquiry.budget ||
                                                    "-"
                                                }
                                            </td>

                                            <td>

                                                <span
                                                    className={`admin-status-badge admin-status-${String(
                                                        enquiry.status ||
                                                        "New"
                                                    )
                                                        .toLowerCase()
                                                        .replace(
                                                            /\s+/g,
                                                            "-"
                                                        )}`}
                                                >
                                                    {
                                                        enquiry.status ||
                                                        "New"
                                                    }
                                                </span>

                                            </td>

                                            <td>
                                                {
                                                    formatDate(
                                                        enquiry.createdAt
                                                    )
                                                }
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

        </div>
    );
};

export default AdminAIDashboard;