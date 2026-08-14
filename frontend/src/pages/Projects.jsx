import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Projects=()=>{

    const [projects, setProjects]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");

    // ============================================================
    // GET PROJECTS
    // ============================================================

    const getProjects=async()=>{

        try {

            setLoading(true);
            setError("");

            const response= await axios.get(`${import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL}/projects`);

            if (response.data.success) {

                setProjects(response.data.data);

            } else {

                setError("Unable to load projects.");

            }

        } catch (error) {

            console.log("Projects API Error:", error);
            setError("Unable to load projects.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{

        getProjects();

    }, []);

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <div className="projects-loading">
                <div className="projects-loader"></div>

                <p>
                    Loading our projects...
                </p>

            </div>
        );
    }

    // ============================================================
    // ERROR
    // ============================================================

    if (error) {

        return (

            <div className="projects-error">

                <h2>
                    {error}
                </h2>

                <button onClick={getProjects}>
                    Try Again
                </button>

            </div>
        );
    }

    return (

        <div className="projects-page">


{/* ================================================ HERO ======================================== */}

            <section className="projects-hero">
                <div className="projects-hero-container">

                    <span>
                        OUR WORK
                    </span>

                    <h1>

                        Projects That

                        <strong>
                            {" "}Deliver Results
                        </strong>

                    </h1>

                    <p>

                        Explore some of the digital solutions
                        we have built for businesses and
                        organizations.

                    </p>

                </div>

            </section>

{/* ============================================= INTRO ========================================== */}

            <section className="projects-intro">
                <div className="projects-intro-container">
                    <div>

                        <span className="projects-small-title">
                            OUR PORTFOLIO
                        </span>

                        <h2>
                            Turning Ideas Into
                            Digital Experiences
                        </h2>

                    </div>

                    <p>

                        Every project we build is designed
                        around our client's business goals,
                        users and long-term growth.

                    </p>

                </div>

            </section>

{/* ======================================= PROJECT LIST ========================================= */}

            <section className="projects-list">

                <div className="projects-grid">

                    {projects.length === 0 ? (

                        <div className="no-projects">

                            <h3>
                                No Projects Available
                            </h3>

                            <p>
                                Our projects will be displayed here soon.
                            </p>

                        </div>

                    ) : (

                        projects.map((project, index) => (

                            <article className="project-card" key={project._id || index}>

                                            {/* IMAGE */}

                                <div className="project-card-image">

                                    <img src={project.image} alt={project.title}/>

                                    <span className="project-category">

                                        {project.category}

                                    </span>

                                </div>

                                            {/* CONTENT */}

                                <div className="project-card-content">

                                    <span className="project-number">

                                        PROJECT 0{index + 1}

                                    </span>

                                    <h3>
                                        {project.title}
                                    </h3>

                                    <p>
                                        {project.shortDescription}
                                    </p>

                                            {/* TECHNOLOGIES */}

                                    {project.technologies &&
                                        project.technologies.length > 0 && (

                                            <div className="project-tech">

                                                {project.technologies.slice(0, 4).map((technology, technologyIndex)=>(

                                                    <span key={technologyIndex}>
                                                        {technology}
                                                    </span>
                                            )
                                        )}
                                    </div>
                                    )
                                }

                                    <Link to={`/our-work/${project.slug}`} className="project-view-button">

                                        View Project

                                        <span>
                                            →
                                        </span>

                                    </Link>

                                </div>

                            </article>
                        ))
                    )}
                </div>
            </section>

{/* ============================================== CTA ============================================ */}

            <section className="projects-cta">
                <div className="projects-cta-container">
                    <div>

                        <span>
                            HAVE A PROJECT IN MIND?
                        </span>

                        <h2>
                            Let's Build Your
                            Next Project.
                        </h2>

                        <p>
                            Have an idea? Let's discuss how
                            technology can help your business grow.
                        </p>

                    </div>

                    <Link to="/contact" className="projects-cta-button">

                        Start Your Project

                        <span>
                            →
                        </span>

                    </Link>

                </div>

            </section>

        </div>
    );
};
export default Projects;