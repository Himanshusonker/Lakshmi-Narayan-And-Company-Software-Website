import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clientAxios from "../api/clientAxios";

const ClientProjectDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const API_URL=import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL;

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ======================================================
    // DATE FORMAT
    // ======================================================

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


    // ======================================================
    // FETCH PROJECT
    // ======================================================

    const fetchProject = async () => {

        try {

            setLoading(true);
            setError("");


            const token=localStorage.getItem("clientToken");

            if (!token) {

                navigate("/client/login");
                return;

            }


            const response= await clientAxios.get(`${API_URL}/api/client/projects/${id}`,
                    {
                        headers: {
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

            if (response.data.success) {

                setProject(response.data.project);

            }

        } catch (error) {

            console.error("Project Details Error:", error);

            if (error.response?.status === 401) {

                localStorage.removeItem("clientToken");
                localStorage.removeItem("clientData");
                navigate("/client/login");
                return;

            }

            setError(error.response?.data?.message || "Unable to load project");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchProject();

    }, [id]);


    // ======================================================
    // LOGOUT
    // ======================================================

    const handleLogout = () => {

        localStorage.removeItem("clientToken");
        localStorage.removeItem("clientData");
        navigate("/client/login");

    };


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="client-project-details-loading">

                <div>
                    Loading Project...
                </div>

            </div>
        );
    }


    // ======================================================
    // ERROR
    // ======================================================

    if (error) {

        return (

            <div className="client-project-details-error">

                <h2>
                    Project Not Available
                </h2>

                <p>
                    {error}
                </p>

                <button onClick={() =>navigate("/client/dashboard")}>
                    Back to Dashboard
                </button>

            </div>
        );
    }

    if (!project) {

        return null;

    }


    const progress= Math.min(100, Math.max(0, Number(project.progress) || 0));

    const remainingPages=project.remainingPages ?? Math.max(0,
            (Number(project.totalPages) || 0) - (Number(project.completedPages) || 0)
        );

    return (

        <div className="client-project-details-page">


{/* =========================================== NAVBAR ============================================ */}

            <header className="client-project-details-navbar">

                <div className="client-project-details-brand" onClick={() => navigate("/client/dashboard")}>

                    <div className="client-project-details-logo">
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

                <div className="client-project-details-nav-right">

                    <button onClick={() =>navigate("/client/dashboard")}>
                        Dashboard
                    </button>

                    <button onClick={handleLogout}>
                        Logout
                    </button>

                </div>

            </header>


{/* ================================================== MAIN ======================================== */}

            <main className="client-project-details-main">


{/* ================================================ BACK ========================================== */}

                <button className="client-project-back-btn" onClick={() =>navigate("/client/dashboard")}>
                    ← Back to Projects
                </button>


{/* ================================================== HEADER ====================================== */}

                <section className="client-project-detail-header">

                    <div>

                        <span>
                            {project.projectType || "PROJECT"}
                        </span>

                        <h1>
                            {project.projectName}
                        </h1>

                        <p>
                            {project.projectDescription || "No project description available."}
                        </p>

                    </div>

                    <span className={`client-detail-status ${project.status?.toLowerCase().replaceAll(" ", "-")}`}>
                        {project.status}
                    </span>

                </section>


{/* ============================================= PROGRESS ==================================== */}

                <section className="client-project-detail-progress-card">

                    <div className="client-detail-progress-header">

                        <div>

                            <span>
                                PROJECT PROGRESS
                            </span>

                            <h2>
                                {progress}%
                            </h2>

                        </div>

                        <strong>
                            {project.status}
                        </strong>

                    </div>

                    <div className="client-detail-progress-track">

                        <div className="client-detail-progress-fill" style={{width: `${progress}%`}}/>

                    </div>

                    <div className="client-detail-progress-footer">

                        <span>
                            0%
                        </span>

                        <span>
                            100%
                        </span>

                    </div>

                </section>


{/* ========================================= PROJECT INFORMATION ================================= */}

                <section className="client-project-detail-grid">

                    <div className="client-detail-info-card">

                        <span>
                            START DATE
                        </span>

                        <strong>
                            {formatDate(project.startDate)}
                        </strong>

                    </div>

                    <div className="client-detail-info-card">

                        <span>
                            DEADLINE
                        </span>

                        <strong>
                            {formatDate(project.deadline)}
                        </strong>

                    </div>

                    <div className="client-detail-info-card">

                        <span>
                            TOTAL PAGES
                        </span>

                        <strong>
                            {project.totalPages || 0}
                        </strong>

                    </div>

                    <div className="client-detail-info-card">

                        <span>
                            COMPLETED PAGES
                        </span>

                        <strong>
                            {project.completedPages || 0}
                        </strong>

                    </div>

                    <div className="client-detail-info-card">

                        <span>
                            REMAINING PAGES
                        </span>

                        <strong>
                            {remainingPages}
                        </strong>

                    </div>

                    <div className="client-detail-info-card">

                        <span>
                            COMPANY
                        </span>

                        <strong>
                            {project.company?.companyName || "Your Company"}
                        </strong>

                    </div>

                </section>


{/* ========================================= TECHNOLOGIES ========================================= */}

                {
                    project.technologies?.length > 0 && (

                        <section className="client-detail-section">

                            <div className="client-detail-section-heading">

                                <span>
                                    TECHNOLOGIES
                                </span>

                                <h2>
                                    Technologies Used
                                </h2>

                            </div>

                            <div className="client-detail-tech-list">

                                {
                                    project.technologies.map(
                                        (technology, index) => (

                                            <span key={index}>
                                                {technology}
                                            </span>

                                        )
                                    )

                                }

                            </div>

                        </section>

                    )
                }


{/* ======================================== COMPANY INFORMATION ================================ */}

                <section className="client-detail-section">

                    <div className="client-detail-section-heading">

                        <span>
                            ASSIGNED COMPANY
                        </span>

                        <h2>
                            Company Information
                        </h2>

                    </div>

                    <div className="client-detail-company-card">

                        <div>

                            <span>
                                COMPANY
                            </span>

                            <strong>
                                {project.company?.companyName}
                            </strong>

                        </div>

                        <div>

                            <span>
                                CONTACT PERSON
                            </span>

                            <strong>
                                {project.company?.contactPerson}
                            </strong>

                        </div>

                        <div>

                            <span>
                                EMAIL
                            </span>

                            <strong>
                                {project.company?.email}
                            </strong>

                        </div>

                        <div>

                            <span>
                                PHONE
                            </span>

                            <strong>
                                {project.company?.phone}
                            </strong>

                        </div>

                    </div>

                </section>


{/* ========================================= PROJECT NOTES ======================================= */}

                {
                    project.notes && (

                        <section className="client-detail-section">

                            <div className="client-detail-section-heading">

                                <span>
                                    PROJECT NOTES
                                </span>

                                <h2>
                                    Notes
                                </h2>

                            </div>

                            <div className="client-project-notes">

                                {project.notes}

                            </div>

                        </section>

                    )
                }


{/* ========================================== PROJECT LINK ======================================== */}

                {
                    project.projectUrl && (

                        <section className="client-detail-section">

                            <div className="client-detail-section-heading">

                                <span>
                                    LIVE PROJECT
                                </span>

                                <h2>
                                    Project Website
                                </h2>

                            </div>

                            <a href={project.projectUrl} target="_blank" rel="noreferrer" className="client-live-project-btn">
                                Open Project →
                            </a>

                        </section>

                    )
                }


{/* ============================================ DOCUMENTS ======================================== */}

                <section className="client-detail-section">

                    <div className="client-detail-section-heading">

                        <span>
                            PROJECT DOCUMENTS
                        </span>

                        <h2>
                            Documents & Files
                        </h2>

                        <p>
                            Documents shared by Lakshmi Narayan
                            And Company for this project.
                        </p>

                    </div>

                    {
                        project.documents?.length > 0 ? (

                            <div className="client-project-documents">

                                {
                                    project.documents.map(
                                        (document) => (

                                            <div className="client-document-card" key={document._id}>

                                                <div className="client-document-icon">
                                                    📄
                                                </div>

                                                <div className="client-document-info">

                                                    <strong>
                                                        {document.name}
                                                    </strong>

                                                    <span>
                                                        {document.fileType ||  "Document"}
                                                    </span>

                                                </div>

                                                <a href={document.url} target="_blank" rel="noreferrer" className="client-document-view-btn">
                                                    View / Download
                                                </a>

                                            </div>
                                        )
                                    )
                                }

                            </div>

                        ) : (

                            <div className="client-no-documents">

                                <div>
                                    📁
                                </div>

                                <h3>
                                    No Documents Available
                                </h3>

                                <p>
                                    Project documents will appear
                                    here when they are uploaded
                                    by the admin.
                                </p>

                            </div>

                        )
                    }

                </section>

            </main>


{/* ========================================== FOOTER =========================================== */}

            <footer className="client-project-details-footer">

                © {new Date().getFullYear()}
                {" "}
                Lakshmi Narayan And Company

            </footer>

        </div>

    );

};
export default ClientProjectDetails;