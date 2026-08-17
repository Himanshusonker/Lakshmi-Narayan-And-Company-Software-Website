import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProjectDetail = () => {

    const { slug }=useParams();
    const [project, setProject]=useState(null);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");

    // ============================================================
    // GET PROJECT DETAIL
    // ============================================================

    const getProject=async()=>{

        try {

            setLoading(true);
            setError("");

            const response= await axios.get(`${import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL}/api/projects/${slug}`);

            if (response.data.success) {
                setProject(response.data.data);
            } else {

                setError("Project not found.");

            }

        } catch (error) {

            console.log("Project Detail Error:", error);
            setError("Unable to load project.");

        } finally {

            setLoading(false);

        }
    };

    useEffect(()=>{

        getProject();

    }, [slug]);

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <div className="project-detail-loading">
                <div className="project-detail-loader"></div>

                <p>
                    Loading project...
                </p>

            </div>
        );
    }

    // ============================================================
    // ERROR
    // ============================================================

    if (error || !project) {

        return (

            <div className="project-detail-error">

                <h2>
                    {error || "Project not found"}
                </h2>

                <Link to="/our-work">
                    ← Back To Projects
                </Link>

            </div>
        );
    }

    return (

        <div className="project-detail-page">

{/* ================================================ HERO ======================================== */}

            <section className="project-detail-hero">

                <div className="project-detail-hero-container">

                    <Link to="/our-work" className="project-back-link">
                        ← Back To Our Work
                    </Link>

                    <span className="project-detail-category">
                        {project.category}
                    </span>

                    <h1>
                        {project.title}
                    </h1>

                    <p>
                        {project.shortDescription}
                    </p>

                </div>

            </section>

{/* ======================================== MAIN PROJECT IMAGE ================================== */}

            <section className="project-detail-main">

                <div className="project-detail-main-container">

                    <div className="project-main-image">

                        <img src={project.image} alt={project.title}/>

                    </div>

{/* ======================================= PROJECT INFORMATION =================================== */}

                    <div className="project-information">
                        <div className="project-info-item">

                            <span>
                                CATEGORY
                            </span>

                            <strong>
                                {project.category}
                            </strong>

                        </div>

                        <div className="project-info-item">

                            <span>
                                CLIENT
                            </span>

                            <strong>
                                {project.client || "Business Client"}
                            </strong>

                        </div>

                        <div className="project-info-item">

                            <span>
                                TECHNOLOGIES
                            </span>

                            <strong>
                                {project.technologies?.join(", ")}
                            </strong>

                        </div>

                    </div>

                </div>

            </section>

{/* ========================================== DESCRIPTION ======================================= */}

            <section className="project-description-section">
                <div className="project-description-container">
                    <div className="project-description">

                        <span>
                            ABOUT THE PROJECT
                        </span>

                        <h2>
                            Building A Solution
                            That Makes A Difference
                        </h2>

                        <p>
                            {project.description}
                        </p>

                    </div>

{/* =========================================== FEATURES ========================================= */}

                    {project.features &&
                        project.features.length > 0 && (
                            <div className="project-features">

                                <h3>
                                    Key Features
                                </h3>

                                <div>
                                    {project.features.map((feature, index)=>(

                                            <p key={index}>

                                                <span>
                                                    ✓
                                                </span>

                                                {feature}

                                            </p>
                                        )
                                    )}

                                </div>

                            </div>

                        )
                    }

                </div>

            </section>

{/* ========================================== TECHNOLOGIES ====================================== */}

            {project.technologies &&
                project.technologies.length > 0 && (
                    <section className="project-technologies-section">
                        <div className="project-technologies-container">

                            <span>
                                TECHNOLOGY STACK
                            </span>

                            <h2>
                                Technologies We Used
                            </h2>

                            <div className="technologies-list">

                                {project.technologies.map((technology, index)=>(

                                        <div key={index} className="technology-item">
                                            {technology}
                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </section>
                )
            }

{/* ========================================= RESULTS ============================================ */}

            {project.results &&
                project.results.length > 0 && (
                    <section className="project-results-section">
                        <div className="project-results-container">
                            <div>

                                <span>
                                    PROJECT RESULTS
                                </span>

                                <h2>
                                    What We Achieved
                                </h2>

                            </div>

                            <div className="results-list">

                                {project.results.map((result, index)=>(

                                        <div className="result-item" key={index}>

                                            <strong>
                                                0{index + 1}
                                            </strong>

                                            <p>
                                                {result}
                                            </p>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </section>
                )
            }

{/* ========================================== GALLERY ============================================ */}

            {project.gallery &&
                project.gallery.length > 0 && (
                    <section className="project-gallery-section">
                        <div className="project-gallery-container">

                            <span>
                                PROJECT GALLERY
                            </span>

                            <h2>
                                Inside The Project
                            </h2>

                            <div className="project-gallery">

                                {project.gallery.map((image, index)=>(

                                        <div className="gallery-image" key={index}>

                                            <img src={image} alt={`${project.title} ${index + 1}`}/>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </section>
                )
            }

{/* ============================================= CTA ============================================ */}

            <section className="project-detail-cta">
                <div className="project-detail-cta-container">
                    <div>

                        <span>
                            LIKE WHAT YOU SEE?
                        </span>

                        <h2>
                            Let's Build Your
                            Next Project.
                        </h2>

                        <p>
                            Have a project idea? Our team is ready
                            to turn your idea into a powerful
                            digital solution.
                        </p>

                    </div>

                    <Link to={project.buttonLink || "/contact"} className="project-detail-cta-button">

                        {project.buttonText || "Start Your Project"}

                        <span>
                            →
                        </span>

                    </Link>

                </div>

            </section>

        </div>
    );
};
export default ProjectDetail;

