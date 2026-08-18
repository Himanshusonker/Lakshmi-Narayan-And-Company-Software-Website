import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard=()=>{
    
    const [admin, setAdmin]=useState(null);
    const [sidebarOpen, setSidebarOpen]=useState(false);
    const navigate=useNavigate();

// =============================================================================================
//                                              CHECK ADMIN
// =============================================================================================

    useEffect(() => {

        const token= localStorage.getItem("adminToken");

        if (!token) {
            navigate("/admin/login");
            return;
        }

        const adminData= localStorage.getItem("adminData");

        if (adminData) {
            setAdmin(JSON.parse(adminData));
        }

    }, [navigate]);


// =============================================================================================
//                                              LOGOUT
// =============================================================================================

    const handleLogout = () => {

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        setSidebarOpen(false);
        navigate("/admin/login", { replace: true });
    };

    return (

                <div className="admin-layout">


{/* =========================================== SIDEBAR ======================================== */}

            <aside className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open": ""}`}>

                                            {/* LOGO */}

                <div className="admin-sidebar-logo">

                    <div className="admin-sidebar-symbol">
                        LN
                    </div>

                    <div>

                        <strong>
                            LAKSHMI NARAYAN
                        </strong>

                        <span>
                            AND COMPANY
                        </span>

                    </div>

                </div>

                                            {/* NAVIGATION */}

                <nav className="admin-navigation">

                    <p className="admin-menu-title">

                        MAIN MENU

                    </p>

                    <Link to="/admin/dashboard" onClick={()=> setSidebarOpen(false)}>
                        
                        <span>
                            ▦
                        </span>

                        Dashboard

                    </Link>


                    <Link to="/admin/services" onClick={()=> setSidebarOpen(false)}>

                        <span>
                            ◈
                        </span>

                        Services

                    </Link>

                    <Link to="/admin/projects" onClick={()=> setSidebarOpen(false)}>

                        <span>
                            ◇
                        </span>

                        Projects

                    </Link>


                    <Link to="/admin/testimonials" onClick={()=> setSidebarOpen(false)}>

                        <span>
                            ★
                        </span>

                        Testimonials

                    </Link>

                    <Link to="/admin/home" onClick={()=> setSidebarOpen(false)}>

                        <span>
                            ⌂
                        </span>

                        Home Page

                    </Link>

                    <Link to="/admin/companies" onClick={() => setSidebarOpen(false)}>
                
                        <span>
                            🏢
                        </span>

                        Companies

                    </Link>

                    <Link to="/admin/companiesprojects" onClick={() => setSidebarOpen(false)}>
                        
                        <span>
                            📁
                        </span>
    
                        Projects
                    
                    </Link>

                    <Link to="/admin/leads" onClick={() => setSidebarOpen(false)}>

                        <span>
                            📋
                        </span>

                        Get Quote Leads

                    </Link>

                    <Link to="/admin/messages" onClick={()=> setSidebarOpen(false)}>

                        <span>
                            ✉
                        </span>

                        Contact Messages

                    </Link>

                </nav>

                                        {/* SIDEBAR BOTTOM */}

                <div className="admin-sidebar-bottom">

                    <button type="button" className="admin-logout-btn" onClick={handleLogout}>

                        <span className="admin-logout-icon">
                            ↪
                        </span>

                        Logout

                    </button>

                </div>

            </aside>

{/* ========================================== MOBILE OVERLAY ==================================== */}

            {sidebarOpen && (

                <div className="admin-sidebar-overlay" onClick={()=> setSidebarOpen(false)} />

            )}

{/* ================================================ MAIN ======================================== */}

            <main className="admin-main">

                                                {/* HEADER */}

                <header className="admin-topbar">

                    <button className="admin-mobile-menu" onClick={()=> setSidebarOpen(!sidebarOpen)}>
                        ☰
                    </button>

                    <div>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Manage your website
                            from one place.
                        </p>

                    </div>

                    <div className="admin-profile">

                        <div className="admin-profile-avatar">
                            {admin?.name ?.charAt(0) ?.toUpperCase() || "A"}
                        </div>

                        <div>

                            <strong>
                                {admin?.name || "Administrator"}
                            </strong>

                            <span>
                                Administrator
                            </span>

                        </div>

                    </div>

                </header>

                                            {/* CONTENT */}

                <section className="admin-dashboard-content">

                                            {/* WELCOME */}

                    <div className="admin-welcome-card">
                        <div>

                            <span>
                                WELCOME BACK
                            </span>

                            <h2>
                                Hello,{" "} {admin?.name || "Administrator"} !
                            </h2>

                            <p>
                                Manage your website
                                content, services and
                                business information
                                from your admin panel.
                            </p>

                        </div>

                    </div>

                                        {/* STAT CARDS */}

                    <div className="admin-stat-grid">
                        <div className="admin-stat-card">

                            <div className="admin-stat-icon">
                                ◈
                            </div>

                            <div>

                                <span>
                                    SERVICES
                                </span>

                                <h3>
                                    Manage Services
                                </h3>

                            </div>

                            <Link to="/admin/services">
                                →
                            </Link>

                        </div>

                        <div className="admin-stat-card">

                            <div className="admin-stat-icon">
                                ◇
                            </div>

                            <div>

                                <span>
                                    PROJECTS
                                </span>

                                <h3>
                                    Manage Projects
                                </h3>

                            </div>

                            <Link to="/admin/projects">
                                →
                            </Link>

                        </div>

                        <div className="admin-stat-card">

                            <div className="admin-stat-icon">
                                ★
                            </div>

                            <div>

                                <span>
                                    TESTIMONIALS
                                </span>

                                <h3>
                                    Client Reviews
                                </h3>

                            </div>

                            <Link to="/admin/testimonials">
                                →
                            </Link>

                        </div>

                        <div className="admin-stat-card">

                            <div className="admin-stat-icon">
                                ✉
                            </div>

                            <div>

                                <span>
                                    MESSAGES
                                </span>

                                <h3>
                                    Contact Messages
                                </h3>

                            </div>

                            <Link to="/admin/messages">
                                →
                            </Link>

                        </div>

                    </div>

                                            {/* QUICK ACTIONS */}

                    <div className="admin-quick-section">
                        <div className="admin-section-heading">
                            <div>

                                <span>
                                    QUICK ACTIONS
                                </span>

                                <h2>
                                    Website Management
                                </h2>

                            </div>

                        </div>


                        <div className="admin-quick-grid">


                            <Link to="/admin/services" className="admin-quick-card">

                                <span>
                                    ◈
                                </span>

                                <div>

                                    <h3>
                                        Services
                                    </h3>

                                    <p>
                                        Add, edit or delete services.
                                    </p>

                                </div>

                            </Link>

                            <Link to="/admin/home" className="admin-quick-card">

                                <span>
                                    ⌂
                                </span>

                                <div>

                                    <h3>
                                        Home Page
                                    </h3>

                                    <p>
                                        Manage homepage content.
                                    </p>

                                </div>

                            </Link>

                            <Link to="/admin/projects" className="admin-quick-card">

                                <span>
                                    ◇
                                </span>

                                <div>

                                    <h3>
                                        Projects
                                    </h3>

                                    <p>
                                        Manage portfolio projects.
                                    </p>

                                </div>

                            </Link>

                        </div>

                    </div>

                </section>

            </main>

        </div>

    );

};
export default AdminDashboard;