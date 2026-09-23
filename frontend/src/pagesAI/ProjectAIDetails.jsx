import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_URL =import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL || "http://localhost:7070";

const ProjectAIDetails = () => {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API_URL}/api/projectsai/${slug}`
        );

        setProject(response.data.project);
      } catch (err) {
        console.error("Project Details Error:", err);

        setError("Project not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="project-details-message">
        Loading project...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-details-message">
        <h2>Project Not Found</h2>

        <Link to="/projectsai">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-details-page">

      {/* ================= HERO ================= */}
      <section className="project-details-hero">

        <div className="project-details-hero-container">

          <span className="project-details-category">
            {project.category}
          </span>

          <h1>
            {project.projectName}
          </h1>

          <p>
            {project.shortDescription}
          </p>

        </div>

      </section>


      {/* ================= IMAGE ================= */}
      <section className="project-details-image-section">

        <div className="project-details-container">

          {project.image && (
            <img
              src={project.image}
              alt={project.projectName}
              className="project-details-image"
            />
          )}

        </div>

      </section>


      {/* ================= OVERVIEW ================= */}
      <section className="project-overview-section">

        <div className="project-details-container">

          <div className="project-overview">

            <span className="details-label">
              PROJECT OVERVIEW
            </span>

            <h2>
              Building Technology
              That Solves Real Problems
            </h2>

            <p>
              {project.projectOverview}
            </p>

          </div>

        </div>

      </section>


      {/* ================= PROBLEM + SOLUTION ================= */}
      <section className="problem-solution-section">

        <div className="project-details-container">

          <div className="problem-solution-grid">

            <div className="details-box">

              <span className="details-label">
                THE PROBLEM
              </span>

              <h2>
                What needed to be solved?
              </h2>

              <p>
                {project.problem}
              </p>

            </div>


            <div className="details-box solution-box">

              <span className="details-label">
                THE SOLUTION
              </span>

              <h2>
                How we solved it
              </h2>

              <p>
                {project.solution}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      {project.features?.length > 0 && (
        <section className="project-features-section">

          <div className="project-details-container">

            <div className="details-heading">

              <span className="details-label">
                KEY FEATURES
              </span>

              <h2>
                What We Built
              </h2>

            </div>


            <div className="features-grid">

              {project.features.map((feature, index) => (
                <div
                  className="feature-card"
                  key={index}
                >
                  <span className="feature-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>
                    {feature}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </section>
      )}


      {/* ================= TECHNOLOGY ================= */}
      <section className="project-tech-section">

        <div className="project-details-container">

          <div className="details-heading">

            <span className="details-label">
              TECHNOLOGY
            </span>

            <h2>
              Technologies Used
            </h2>

          </div>


          <div className="details-tech-list">

            {project.technology?.map((tech, index) => (
              <span key={index}>
                {tech}
              </span>
            ))}

          </div>

        </div>

      </section>


      {/* ================= RESULTS ================= */}
      {project.results?.length > 0 && (
        <section className="project-results-section">

          <div className="project-details-container">

            <div className="details-heading">

              <span className="details-label">
                RESULTS
              </span>

              <h2>
                Business Impact
              </h2>

            </div>


            <div className="results-grid">

              {project.results.map((result, index) => (
                <div
                  className="result-card"
                  key={index}
                >
                  <span>✓</span>

                  <p>
                    {result}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </section>
      )}


      {/* ================= CTA ================= */}
      <section className="project-details-cta">

        <div className="project-details-container">

          <span>
            HAVE A SIMILAR CHALLENGE?
          </span>

          <h2>
            Let's Build Your
            <strong> Solution.</strong>
          </h2>

          <p>
            Tell us about your business challenge
            and let's discuss how technology can help.
          </p>

          <Link
            to="/contact"
            className="project-details-cta-button"
          >
            Request a Solution
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* ================= BACK ================= */}
      <div className="project-back-wrapper">

        <Link to="/projectsai">
          ← Back to All Projects
        </Link>

      </div>

    </div>
  );
};

export default ProjectAIDetails;