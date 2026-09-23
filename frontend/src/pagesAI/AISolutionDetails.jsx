import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_URL =
  import.meta.env
    .VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL ||
  "http://localhost:7070";


const AISolutionDetails = () => {

  const { slug } = useParams();

  const [solution, setSolution] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchSolution = async () => {

      try {

        const response = await axios.get(
          `${API_URL}/api/ai-solutions/${slug}`
        );

        setSolution(
          response.data.solution
        );

      } catch (error) {

        console.error(
          "AI Solution Details Error:",
          error
        );

        setError(
          "AI solution not found."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchSolution();

  }, [slug]);


  if (loading) {

    return (
      <div className="ai-details-loading">
        Loading AI solution...
      </div>
    );

  }


  if (error || !solution) {

    return (

      <div className="ai-details-error">

        <h2>
          AI Solution Not Found
        </h2>

        <Link to="/ai-solutions">
          ← Back to AI Solutions
        </Link>

      </div>

    );

  }


  return (

    <main className="ai-details-page">

      {/* =====================================
          HERO
      ====================================== */}

      <section className="ai-details-hero">

        <div className="ai-details-hero-inner">

          <div className="ai-details-icon">
            {solution.icon}
          </div>

          <span>
            AI SOLUTION
          </span>

          <h1>
            {solution.title}
          </h1>

          <p>
            {solution.shortDescription}
          </p>

        </div>

      </section>


      {/* =====================================
          PROBLEM
      ====================================== */}

      <section className="ai-problem-section">

        <div className="ai-content-container">

          <div className="ai-section-label">
            01 — THE PROBLEM
          </div>

          <h2>
            What Business Problem
            <br />
            Are We Solving?
          </h2>

          <p>
            {solution.problem}
          </p>

        </div>

      </section>


      {/* =====================================
          SOLUTION
      ====================================== */}

      <section className="ai-solution-section">

        <div className="ai-content-container">

          <div className="ai-section-label">
            02 — AI SOLUTION
          </div>

          <h2>
            How AI Can
            <br />
            Solve It
          </h2>

          <p>
            {solution.solution}
          </p>

        </div>

      </section>


      {/* =====================================
          HOW IT WORKS
      ====================================== */}

      {solution.howItWorks?.length > 0 && (

        <section className="ai-how-section">

          <div className="ai-content-container">

            <div className="ai-section-label">
              03 — HOW IT WORKS
            </div>

            <h2>
              From Input to
              <br />
              Intelligent Output
            </h2>


            <div className="ai-process">

              {solution.howItWorks.map(
                (step, index) => (

                  <div
                    className="ai-process-item"
                    key={index}
                  >

                    <div className="ai-process-number">
                      {String(
                        step.step ||
                        index + 1
                      ).padStart(2, "0")}
                    </div>

                    <div>

                      <h3>
                        {step.title}
                      </h3>

                      <p>
                        {step.description}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

      )}


      {/* =====================================
          BENEFITS
      ====================================== */}

      {solution.benefits?.length > 0 && (

        <section className="ai-benefits-section">

          <div className="ai-content-container">

            <div className="ai-section-label">
              04 — BENEFITS
            </div>

            <h2>
              Business Benefits
            </h2>


            <div className="ai-benefits-grid">

              {solution.benefits.map(
                (benefit, index) => (

                  <div
                    className="ai-benefit-card"
                    key={index}
                  >

                    <span>
                      ✓
                    </span>

                    <h3>
                      {benefit}
                    </h3>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

      )}


      {/* =====================================
          TECHNOLOGY
      ====================================== */}

      {solution.technologies?.length > 0 && (

        <section className="ai-tech-section">

          <div className="ai-content-container">

            <div className="ai-section-label">
              05 — TECHNOLOGY
            </div>

            <h2>
              Technology Stack
            </h2>

            <p className="ai-tech-description">
              We select technologies according
              to the requirements, scale and
              architecture of each AI solution.
            </p>


            <div className="ai-tech-list">

              {solution.technologies.map(
                (technology, index) => (

                  <div
                    className="ai-tech-item"
                    key={index}
                  >
                    {technology}
                  </div>

                )
              )}

            </div>

          </div>

        </section>

      )}


      {/* =====================================
          USE CASES
      ====================================== */}

      {solution.useCases?.length > 0 && (

        <section className="ai-usecase-section">

          <div className="ai-content-container">

            <div className="ai-section-label">
              06 — USE CASES
            </div>

            <h2>
              Where It Can Be Used
            </h2>


            <div className="ai-usecase-grid">

              {solution.useCases.map(
                (useCase, index) => (

                  <div
                    className="ai-usecase-card"
                    key={index}
                  >

                    <span>
                      0{index + 1}
                    </span>

                    <h3>
                      {useCase}
                    </h3>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

      )}


      {/* =====================================
          REQUEST SOLUTION
      ====================================== */}

      <section className="ai-request-section">

        <div>

          <span>
            07 — GET STARTED
          </span>

          <h2>
            Need This AI
            <br />
            Solution for Your Business?
          </h2>

          <p>
            Tell us about your business requirements
            and our team can help you plan the right
            AI solution.
          </p>

          <Link
            to="/contact"
            className="ai-request-button"
          >
            Request Solution
            <span>→</span>
          </Link>

        </div>

      </section>

    </main>

  );

};


export default AISolutionDetails;