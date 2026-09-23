import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_URL =import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL || "http://localhost:7070";

const ServiceAIDetails = () => {

  const { slug } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchService = async () => {

      try {

        const response = await axios.get(
          `${API_URL}/api/servicesai/${slug}`
        );

        setService(response.data.service);

      } catch (error) {

        console.error("Service Details Error:", error);

        setError("Service not found.");

      } finally {

        setLoading(false);

      }

    };

    fetchService();

  }, [slug]);


  if (loading) {
    return (
      <div className="service-details-loading">
        Loading service...
      </div>
    );
  }


  if (error || !service) {
    return (
      <div className="service-details-error">

        <h2>
          Service Not Found
        </h2>

        <Link to="/services">
          ← Back to Services
        </Link>

      </div>
    );
  }


  return (

    <main className="service-details-page">

      {/* ===================================
          HERO
      ==================================== */}

      <section className="service-details-hero">

        <div className="service-details-hero-inner">

          <div className="service-details-icon">
            {service.icon}
          </div>

          <span>
            OUR SERVICE
          </span>

          <h1>
            {service.title}
          </h1>

          <p>
            {service.shortDescription}
          </p>

        </div>

      </section>


      {/* ===================================
          INTRO
      ==================================== */}

      <section className="service-details-intro">

        <div className="service-details-intro-text">

          <span>
            ABOUT THIS SERVICE
          </span>

          <h2>
            Technology That
            <br />
            Solves Real Problems
          </h2>

          <p>
            {service.description}
          </p>

        </div>

      </section>


      {/* ===================================
          FEATURES
      ==================================== */}

      {service.features?.length > 0 && (

        <section className="service-features">

          <div className="service-section-title">

            <span>
              WHAT WE OFFER
            </span>

            <h2>
              Service Features
            </h2>

          </div>


          <div className="service-features-grid">

            {service.features.map((feature, index) => (

              <div
                className="service-feature"
                key={index}
              >

                <div className="feature-number">
                  0{index + 1}
                </div>

                <h3>
                  {feature}
                </h3>

              </div>

            ))}

          </div>

        </section>

      )}


      {/* ===================================
          TECHNOLOGIES
      ==================================== */}

      {service.technologies?.length > 0 && (

        <section className="service-technologies">

          <div className="service-section-title">

            <span>
              TECHNOLOGY STACK
            </span>

            <h2>
              Technologies We Use
            </h2>

          </div>


          <div className="technology-list">

            {service.technologies.map(
              (technology, index) => (

                <div
                  className="technology-item"
                  key={index}
                >
                  {technology}
                </div>

              )
            )}

          </div>

        </section>

      )}


      {/* ===================================
          PROCESS
      ==================================== */}

      {service.process?.length > 0 && (

        <section className="service-process">

          <div className="service-section-title">

            <span>
              OUR APPROACH
            </span>

            <h2>
              How We Work
            </h2>

          </div>


          <div className="process-list">

            {service.process.map(
              (step, index) => (

                <div
                  className="process-item"
                  key={index}
                >

                  <div className="process-number">
                    {String(index + 1).padStart(2, "0")}
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

        </section>

      )}


      {/* ===================================
          CTA
      ==================================== */}

      <section className="service-details-cta">

        <h2>
          Ready to Build
          <br />
          Your Next Project?
        </h2>

        <p>
          Let's discuss your requirements and
          find the right solution for your business.
        </p>

        <Link
          to="/contact"
          className="details-cta-button"
        >
          Get Started
          <span>→</span>
        </Link>

      </section>

    </main>

  );
};

export default ServiceAIDetails;