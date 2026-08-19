import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../api/clientAxios";

const ClientDashboard = () => {

    const navigate = useNavigate();

    const API_URL=import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL;

    const [projects, setProjects] = useState([]);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================================
    // FETCH CLIENT PROJECTS
    // =========================================================

    const fetchProjects = async () => {

        try {

            setLoading(true);

            setError("");


            // -------------------------------------------------
            // GET TOKEN
            // -------------------------------------------------

            const token =localStorage.getItem("clientToken");


            if (!token) {

                navigate("/client/login");

                return;

            }


            // -------------------------------------------------
            // GET CLIENT DATA
            // -------------------------------------------------

            const clientData=localStorage.getItem("clientData");

            if (clientData) {

                try {

                    setClient(JSON.parse(clientData));

                } catch (error) {

                    console.error("Client Data Parse Error:", error);

                }

            }


            // -------------------------------------------------
            // GET PROJECTS
            // -------------------------------------------------

            const response=await clientAxios.get(`${API_URL}/api/client/projects`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            if (response.data.success) {

                setProjects(response.data.projects || []);

            }


        } catch (error) {

            console.error("Client Dashboard Error:", error);


            // -------------------------------------------------
            // TOKEN EXPIRED / INVALID
            // -------------------------------------------------

            if (error.response?.status === 401) {

                localStorage.removeItem("clientToken");

                localStorage.removeItem("clientData");

                navigate("/client/login");

                return;

            }


            setError(error.response?.data?.message || "Unable to load projects");

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // LOAD DASHBOARD
    // =========================================================

    useEffect(() => {

        fetchProjects();

    }, []);


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        localStorage.removeItem("clientToken");

        localStorage.removeItem("clientData");

        navigate("/client/login");

    };


    // =========================================================
    // DATE FORMAT
    // =========================================================

    const formatDate = (date) => {

        if (!date) {

            return "-";

        }

        return new Date(date).toLocaleDateString("en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // =========================================================
    // CALCULATE PROJECT STATUS
    // =========================================================

    const getStatusClass = (status) => {

        if (!status) {

            return "not-started";

        }

        return status.toLowerCase().replaceAll(" ", "-");

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="client-dashboard-loading">

                <div className="client-dashboard-loader">

                    <div className="client-loader-spinner">
                    </div>

                    <p>
                        Loading your projects...
                    </p>

                </div>

            </div>

        );

    }


    return (

        <div className="client-dashboard-page">


            {/* =====================================================
                TOP NAVBAR
            ===================================================== */}

            <header className="client-dashboard-navbar">

                <div className="client-dashboard-brand">


                    <div className="client-dashboard-logo">
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


                <div className="client-dashboard-nav-right">

                    <div className="client-user-info">

                        <div className="client-user-avatar">

                            {client?.companyName ?.charAt(0) ?.toUpperCase() || "C"}

                        </div>

                        <div>

                            <strong>

                                {client?.contactPerson || "Client"}

                            </strong>

                            <span>

                                {client?.companyName || "Company"}

                            </span>

                        </div>

                    </div>

                    <button className="client-logout-btn" onClick={handleLogout}>
                        Logout
                    </button>

                </div>

            </header>


{/* ========================================== MAIN CONTENT ==================================== */}

            <main className="client-dashboard-main">


{/* ============================================= WELCOME SECTION ============================== */}

                <section className="client-dashboard-welcome">

                    <div>

                        <span className="client-dashboard-label">
                            CLIENT PROJECT PORTAL
                        </span>

                        <h1>

                            Welcome,

                            {" "}

                            {client?.contactPerson || "Client"}

                        </h1>

                        <p>
                            Track your project progress,
                            development updates and
                            remaining work from one place.
                        </p>

                    </div>

                    <div className="client-company-box">

                        <span>
                            COMPANY
                        </span>

                        <strong>

                            {client?.companyName || "Your Company"}

                        </strong>

                        {client?.email && (

                                <small>

                                    {client.email}

                                </small>

                            )
                        }

                    </div>

                </section>


{/* ============================================= ERROR ======================================= */}

                {error && (

                    <div className="client-dashboard-error">

                        {error}

                        <button onClick={fetchProjects}>
                            Try Again
                        </button>

                    </div>
                )}


{/* ======================================== SUMMARY CARDS ===================================== */}

                <section className="client-summary-grid">


                                        {/* TOTAL PROJECTS */} 

                    <div className="client-summary-card">

                        <div className="client-summary-icon">
                            P
                        </div>

                        <div>

                            <span>
                                TOTAL PROJECTS
                            </span>

                            <strong>
                                {projects.length}
                            </strong>

                        </div>

                    </div>


                                            {/* IN PROGRESS */}

                    <div className="client-summary-card">

                        <div className="client-summary-icon">
                            ↗
                        </div>

                        <div>

                            <span>
                                IN PROGRESS
                            </span>

                            <strong>

                                {projects.filter((project)=>project.status === "In Progress").length}

                            </strong>

                        </div>

                    </div>


                                            {/* COMPLETED */}

                    <div className="client-summary-card">

                        <div className="client-summary-icon">
                            ✓
                        </div>

                        <div>

                            <span>
                                COMPLETED
                            </span>

                            <strong>

                                {projects.filter((project)=>project.status === "Completed").length}

                            </strong>

                        </div>

                    </div>


                                        {/* AVERAGE PROGRESS */}

                    <div className="client-summary-card">

                        <div className="client-summary-icon">
                            %
                        </div>

                        <div>

                            <span>
                                AVG. PROGRESS
                            </span>

                            <strong>

                                {projects.length > 0 ? Math.round(projects.reduce(
                                                (
                                                    total,
                                                    project
                                                ) =>
                                                    total +
                                                    (
                                                        Number(
                                                            project.progress
                                                        ) || 0
                                                    ),
                                                0
                                            ) /
                                            projects.length
                                        )

                                        :

                                        0
                                }%

                            </strong>

                        </div>

                    </div>

                </section>


{/* ======================================= PROJECT SECTION ===================================== */}

                <section className="client-project-section">

                    <div className="client-project-section-header">

                        <div>

                            <span>
                                PROJECTS
                            </span>

                            <h2>
                                Your Projects
                            </h2>

                            <p>
                                Projects assigned to your company.
                            </p>

                        </div>


                        <div className="client-project-count">

                            {projects.length}

                            {" "}

                            {projects.length === 1 ? "Project" : "Projects"}

                        </div>

                    </div>


{/* ========================================== NO PROJECT ======================================= */}

                    {projects.length === 0 ? (

                        <div className="client-no-projects">

                            <div className="client-no-project-icon">
                                P
                            </div>

                            <h3>
                                No Projects Assigned Yet
                            </h3>

                            <p>
                                Your project information
                                will appear here once
                                the admin assigns a project
                                to your company.
                            </p>

                        </div>

                    ) : (


                        /* =================================================
                           PROJECT CARDS
                        ================================================= */

                        <div className="client-project-grid">


                            {projects.map(
                                (project) => (

                                    <article className="client-project-card" key={project._id}>


{/* ========================================== CARD HEADER ================================== */}

                                        <div className="client-project-card-header">

                                            <div>

                                                <span className="client-project-type">

                                                    {project.projectType || "PROJECT"}

                                                </span>

                                                <h3>

                                                    {project.projectName}

                                                </h3>

                                            </div>

                                            <span className={`client-project-status ${getStatusClass(project.status)}`}>

                                                {project.status || "Not Started"}

                                            </span>

                                        </div>


{/* =========================================== DESCRIPTION ================================== */}

                                        {
                                            project.projectDescription && (

                                                <p className="client-project-description">

                                                    {project.projectDescription}

                                                </p>

                                            )
                                        }



{/* ============================================== PROGRESS ===================================== */}

                                        <div className="client-project-progress">

                                            <div className="client-progress-header">

                                                <span>
                                                    Project Progress
                                                </span>

                                                <strong>

                                                    {project.progress || 0}%

                                                </strong>

                                            </div>

                                            <div className="client-progress-track">

                                                <div className="client-progress-fill" style={{width:`${Math.min(100, Math.max(0, Number(project.progress) || 0))}%`}}>
                                                </div>

                                            </div>

                                        </div>


{/* =========================================== PAGE STATISTICS================================== */}

                                        <div className="client-project-stats">

                                            <div>

                                                <span>
                                                    TOTAL PAGES
                                                </span>

                                                <strong>

                                                    {project.totalPages || 0}

                                                </strong>

                                            </div>

                                            <div>

                                                <span>
                                                    COMPLETED
                                                </span>

                                                <strong>

                                                    {project.completedPages || 0}

                                                </strong>

                                            </div>

                                            <div>

                                                <span>
                                                    REMAINING
                                                </span>

                                                <strong>

                                                    {project.remainingPages ?? Math.max(0,
                                                            (
                                                                Number(
                                                                    project.totalPages
                                                                ) || 0
                                                            ) -
                                                            (
                                                                Number(
                                                                    project.completedPages
                                                                ) || 0
                                                            )
                                                        )
                                                    }

                                                </strong>

                                            </div>

                                        </div>


{/* ========================================== PROJECT INFORMATION ============================== */}

                                        <div className="client-project-details">

                                            <div>

                                                <span>
                                                    START DATE
                                                </span>

                                                <strong>

                                                    {formatDate(project.startDate)}

                                                </strong>

                                            </div>

                                            <div>

                                                <span>
                                                    DEADLINE
                                                </span>

                                                <strong>

                                                    {formatDate(project.deadline)}

                                                </strong>

                                            </div>

                                        </div>


{/* ============================================ TECHNOLOGIES ================================== */}

                                        {
                                            project.technologies?.length >
                                            0 && (

                                                <div className="client-project-technologies">

                                                    <span>
                                                        TECHNOLOGIES
                                                    </span>

                                                    <div>

                                                        {
                                                            project.technologies.map(
                                                                (
                                                                    technology,
                                                                    index
                                                                ) => (

                                                                    <small key={index}>
                                                                        {technology}
                                                                    </small>

                                                                )
                                                            )
                                                        }

                                                    </div>

                                                </div>

                                            )
                                        }


{/* ========================================== FOOTER ================================== */}

                                        <div className="client-project-card-footer">

                                            {/* {
                                                project.projectUrl ? (

                                                    <a href={project.projectUrl} target="_blank" rel="noreferrer">
                                                        View Project →
                                                    </a>

                                                ) : (

                                                    <span>
                                                        Project Portal
                                                    </span>

                                                )
                                            } */}

                                            <button type="button" onClick={()=>navigate(`/client/projects/${project._id}`)} className="client-view-project-btn">
                                                View Project →
                                            </button>

                                            <span>

                                                {project.deadline &&
                                                    new Date(project.deadline) < new Date() &&
                                                    project.status !== "Completed" ? "Deadline Passed"
                                                        : `Deadline: ${formatDate(
                                                            project.deadline
                                                        )}`
                                                }

                                            </span>

                                        </div>

                                    </article>
                                )
                            )}

                        </div>
                    )}
                </section>
            </main>


{/* =============================================== FOOTER ====================================== */}

            <footer className="client-dashboard-footer">

                <p>

                    © {new Date().getFullYear()}

                    {" "}

                    Lakshmi Narayan And Company

                </p>

                <span>
                    Client Project Management Portal
                </span>

            </footer>

        </div>

    );

};
export default ClientDashboard;