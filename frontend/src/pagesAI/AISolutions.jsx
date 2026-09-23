import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SEO from "../componentAI/SEOAI";
import { aiSolutionsSEO } from "../DataAI/seoAIData";

const API_URL =
  import.meta.env
    .VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL ||
  "http://localhost:7070";


const AISolutions = () => {

  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const fetchSolutions = async () => {

      try {

        const response = await axios.get(
          `${API_URL}/api/ai-solutions`
        );

        setSolutions(
          response.data.solutions || []
        );

      } catch (error) {

        console.error(
          "AI Solutions Error:",
          error
        );

        setError(
          "Unable to load AI solutions."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchSolutions();

  }, []);


  return (

    <>
      <SEO {...aiSolutionsSEO} />

    <main className="ai-solutions-page">

      {/* =====================================
          HERO
      ====================================== */}

      <section className="ai-solutions-hero">

        <div className="ai-solutions-hero-content">

          <span className="ai-solutions-eyebrow">
            AI SOLUTIONS
          </span>

          <h1>
            Intelligent Solutions
            <br />
            <span>for Modern Businesses</span>
          </h1>

          <p>
            Discover AI-powered solutions designed to
            automate processes, improve customer
            experiences and help businesses make
            smarter decisions.
          </p>

        </div>

      </section>


      {/* =====================================
          SOLUTIONS
      ====================================== */}

      <section className="ai-solutions-section">

        <div className="ai-solutions-heading">

          <span>
            EXPLORE AI
          </span>

          <h2>
            AI Solutions We Build
          </h2>

          <p>
            From intelligent chatbots to document
            processing and custom AI platforms,
            explore solutions designed around
            real business problems.
          </p>

        </div>


        {loading && (
          <div className="ai-solutions-loading">
            Loading AI solutions...
          </div>
        )}


        {error && (
          <div className="ai-solutions-error">
            {error}
          </div>
        )}


        {!loading && !error && (

          <div className="ai-solutions-grid">

            {solutions.map((solution) => (

              <article
                className="ai-solution-card"
                key={solution._id}
              >

                <div className="ai-solution-icon">
                  {solution.icon}
                </div>

                <h3>
                  {solution.title}
                </h3>

                <p>
                  {solution.shortDescription}
                </p>

                <Link
                  to={`/ai-solutions/${solution.slug}`}
                  className="ai-solution-link"
                >
                  Explore Solution
                  <span>→</span>
                </Link>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* =====================================
          CTA
      ====================================== */}

      <section className="ai-solutions-cta">

        <div>

          <span>
            HAVE AN AI IDEA?
          </span>

          <h2>
            Let's Turn Your Idea
            <br />
            Into an AI Solution.
          </h2>

          <p>
            Tell us about your business challenge,
            workflow or AI idea and let's explore
            the right solution together.
          </p>

          <Link
            to="/contact"
            className="ai-solutions-cta-button"
          >
            Request AI Solution
            <span>→</span>
          </Link>

        </div>

      </section>

    </main>

    </>

  );
};


export default AISolutions;