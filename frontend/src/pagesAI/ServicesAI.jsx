import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SEO from "../componentAI/SEOAI";
import { servicesSEO } from "../DataAI/seoAIData";

const API_URL =import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL || "http://localhost:7070";

const ServicesAI = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/servicesai`
        );

        setServices(response.data.services || []);
      } catch (error) {
        console.error("Services Error:", error);

        setError(
          "Unable to load services. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (

    <>
      <SEO {...servicesSEO} />

    <main className="services-page">

      {/* =====================================
          HERO
      ====================================== */}

      <section className="services-hero">

        <div className="services-hero-content">

          <span className="services-eyebrow">
            OUR SERVICES
          </span>

          <h1>
            Technology Solutions
            <br />
            <span>Built for Your Business</span>
          </h1>

          <p>
            From AI and automation to websites, software,
            mobile applications and API integrations, we
            build digital solutions designed to help your
            business grow.
          </p>

        </div>

      </section>


      {/* =====================================
          SERVICES
      ====================================== */}

      <section className="services-section">

        <div className="services-heading">

          <span>
            WHAT WE DO
          </span>

          <h2>
            Our Services
          </h2>

          <p>
            Explore our technology services and discover
            solutions designed around your business needs.
          </p>

        </div>


        {loading && (
          <div className="services-loading">
            Loading services...
          </div>
        )}


        {error && (
          <div className="services-error">
            {error}
          </div>
        )}


        {!loading && !error && (
          <div className="services-grid">

            {services.map((service) => (
              <article
                className="service-card"
                key={service._id}
              >

                <div className="service-icon">
                  {service.icon}
                </div>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.shortDescription}
                </p>

                <Link
                  to={`/servicesai/${service.slug}`}
                  className="service-link"
                >
                  Explore Service
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

      <section className="services-cta">

        <div>

          <span>
            HAVE A PROJECT IN MIND?
          </span>

          <h2>
            Let's Build Something
            <br />
            Great Together.
          </h2>

          <p>
            Tell us about your project and our team
            will help you find the right technology solution.
          </p>

          <Link
            to="/contact"
            className="services-cta-button"
          >
            Start a Project
            <span>→</span>
          </Link>

        </div>

      </section>

    </main>

    </>

  );
};

export default ServicesAI;