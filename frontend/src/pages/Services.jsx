import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Services = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ========================================================================
    // GET SERVICES
    // ========================================================================

    const getServices=async()=>{

        try {

            setLoading(true);
            setError("");

            const response= await axios.get(`${import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL}/services`);

            if (response.data.success) {

                setServices(response.data.data);
            }

        } catch (error) {

            console.log("Services API Error:", error);

            setError( "Unable to load services" );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        getServices();

    }, []);


    // ========================================================================
    // LOADING
    // ========================================================================

    if (loading) {

        return (

            <div className="services-loading">

                <div className="services-loader"></div>

                <p>
                    Loading our services...
                </p>

            </div>
        );
    }


    // ========================================================================
    // ERROR
    // ========================================================================

    if (error) {

        return (

            <div className="services-error">

                <h2>
                    {error}
                </h2>

                <button onClick={getServices}>
                    Try Again
                </button>

            </div>
        );
    }


    return (

        <div className="services-page">

{/* =============================================== HERO ========================================= */}

            <section className="services-hero">
                <div className="services-hero-content">

                    <span className="services-eyebrow">
                        WHAT WE DO
                    </span>

                    <h1>
                        Digital Solutions
                        <span>
                            Built For Growth
                        </span>
                    </h1>

                    <p>
                        At Lakshmi Narayan And Company, we build
                        modern digital solutions that help businesses
                        improve, grow and succeed.
                    </p>

                </div>

            </section>


{/* ========================================== SERVICES ========================================== */}

            <section className="services-list-section">
                <div className="services-heading">

                    <span>
                        OUR SERVICES
                    </span>

                    <h2>
                        Solutions That Move
                        Your Business Forward
                    </h2>

                    <p>
                        From websites and mobile applications to
                        custom software solutions, we provide
                        technology designed around your business.
                    </p>

                </div>

                <div className="services-grid">

                    {services.map((service, index)=>(

                        <div className="service-detail-card" key={service._id} >

                            <div className="service-card-number">
                                0{index + 1}
                            </div>

                            <div className="service-card-icon">
                                {service.icon}
                            </div>

                            {service.image && (

                                <div className="service-card-image">

                                    <img src={service.image} alt={service.title} />

                                </div>
                            )}

                            <div className="service-card-body">

                                <h3>
                                    {service.title}
                                </h3>

                                <p>
                                    {service.shortDescription}
                                </p>

                                <div className="service-card-link">

                                    <Link to={`/services/${service.slug}`} >

                                        Explore Service

                                        <span>→</span>

                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


{/* =============================================== CTA ========================================== */}

            <section className="services-cta">
                <div className="services-cta-container">

                    <div>

                        <span>
                            HAVE A PROJECT IN MIND?
                        </span>

                        <h2>
                            Let's turn your idea
                            into reality.
                        </h2>

                    </div>

                    <Link to="/contact" className="services-cta-button" >

                        Start Your Project

                        <span>→</span>

                    </Link>
                </div>
            </section>
        </div>
    );
};


export default Services;