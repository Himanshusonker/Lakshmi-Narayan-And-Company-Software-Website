import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SEO from "../componentAI/SEOAI";
import { projectsSEO } from "../DataAI/seoAIData";

const API_URL =import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL || "http://localhost:7070";

const categories = [
  "All",
  "AI Projects",
  "Web Projects",
  "Software Projects",
  "Case Studies",
];

const ProjectsAI = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/projectsai`
        );

        setProjects(response.data.projects || []);
      } catch (err) {
        console.error("Projects AI Fetch Error:", err);
        setError("Unable to load AI projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <>

    <SEO {...projectsSEO} />

    <div className="projects-ai-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="projects-ai-hero">
        <div className="projects-ai-hero-content">

          <span className="projects-ai-eyebrow">
            OUR WORK
          </span>

          <h1>
            Projects & <span>Use Cases</span>
          </h1>

          <p>
            Explore AI, web and software projects built to solve
            real business problems and create measurable value.
          </p>

        </div>
      </section>


      {/* =====================================================
          PROJECT SECTION
      ===================================================== */}

      <section className="projects-ai-section">

        <div className="projects-ai-container">

          {/* ================= FILTERS ================= */}

          <div className="projects-ai-filters">

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "projects-ai-filter active"
                    : "projects-ai-filter"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>

            ))}

          </div>


          {/* ================= LOADING ================= */}

          {loading && (
            <div className="projects-ai-message">
              Loading projects...
            </div>
          )}


          {/* ================= ERROR ================= */}

          {!loading && error && (
            <div className="projects-ai-message projects-ai-error">
              {error}
            </div>
          )}


          {/* ================= EMPTY ================= */}

          {!loading &&
            !error &&
            filteredProjects.length === 0 && (

              <div className="projects-ai-message">
                No projects found.
              </div>

          )}


          {/* ================= PROJECT GRID ================= */}

          {!loading &&
            !error &&
            filteredProjects.length > 0 && (

              <div className="projects-ai-grid">

                {filteredProjects.map((project) => (

                  <article
                    className="projects-ai-card"
                    key={project._id}
                  >

                    {/* ================= IMAGE ================= */}

                    <div className="projects-ai-image-wrapper">

                      {project.image ? (

                        <img
                          src={project.image}
                          alt={project.projectName}
                          className="projects-ai-image"
                        />

                      ) : (

                        <div className="projects-ai-image-placeholder">
                          PROJECT
                        </div>

                      )}

                      <span className="projects-ai-category">
                        {project.category}
                      </span>

                    </div>


                    {/* ================= CONTENT ================= */}

                    <div className="projects-ai-card-content">

                      <h2>
                        {project.projectName}
                      </h2>

                      <p className="projects-ai-description">
                        {project.shortDescription}
                      </p>


                      {/* ================= PROBLEM ================= */}

                      <div className="projects-ai-info">

                        <h3>
                          Problem
                        </h3>

                        <p>
                          {project.problem}
                        </p>

                      </div>


                      {/* ================= SOLUTION ================= */}

                      <div className="projects-ai-info">

                        <h3>
                          Solution
                        </h3>

                        <p>
                          {project.solution}
                        </p>

                      </div>


                      {/* ================= TECHNOLOGY ================= */}

                      <div className="projects-ai-technologies">

                        <h3>
                          Technology
                        </h3>

                        <div className="projects-ai-technology-list">

                          {project.technology
                            ?.slice(0, 5)
                            .map((tech, index) => (

                              <span key={index}>
                                {tech}
                              </span>

                            ))}

                        </div>

                      </div>


                      {/* ================= BUTTON ================= */}

                      <Link
                        to={`/projectsai/${project.slug}`}
                        className="projects-ai-case-button"
                      >
                        <span>
                          View Case Study
                        </span>

                        <strong>
                          →
                        </strong>

                      </Link>

                    </div>

                  </article>

                ))}

              </div>

          )}

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="projects-ai-cta">

        <div className="projects-ai-cta-content">

          <span>
            HAVE A PROJECT IN MIND?
          </span>

          <h2>
            Let's Build Something
            <strong> Intelligent.</strong>
          </h2>

          <p>
            Tell us about your business problem and
            we will help you design the right technology solution.
          </p>

          <Link
            to="/contact"
            className="projects-ai-cta-button"
          >
            Start Your Project

            <strong>
              →
            </strong>

          </Link>

        </div>

      </section>

    </div>

    </>
    
  );
};

export default ProjectsAI;