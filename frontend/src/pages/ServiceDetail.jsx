import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const ServiceDetail = () => {

    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ========================================================================
    // GET SERVICE
    // ========================================================================

    const getService=async()=>{

        try {

            setLoading(true);
            setError("");

            const response= await axios.get(`${import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL}/services/${slug}`);

            if (response.data.success) {

                setService( response.data.data );
            }

        } catch (error) {

            console.log( "Service Detail Error:", error );
            setError( "Unable to load service" );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        getService();

    }, [slug]);


    // ========================================================================
    // LOADING
    // ========================================================================

    if (loading) {

        return (

            <div className="service-detail-loading">
                <div className="service-detail-loader"></div>

                <p>
                    Loading service...
                </p>

            </div>
        );
    }


    // ========================================================================
    // ERROR
    // ========================================================================

    if (error || !service) {

        return (

            <div className="service-detail-error">

                <h2>
                    {error || "Service not found"}
                </h2>

                <Link to="/services">
                    Back To Services
                </Link>

            </div>
        );
    }


    return (

        <div className="service-detail-page">

            {/* ================================================================
                HERO
            ================================================================= */}

            <section className="service-detail-hero">
                <div className="service-detail-hero-container">
                    <div className="service-detail-hero-content">

                        <span className="service-detail-icon">
                            {service.icon}
                        </span>

                        <span className="service-detail-label">
                            OUR SERVICE
                        </span>

                        <h1>
                            {service.title}
                        </h1>

                        <p>
                            {service.description}
                        </p>

                        <Link to={service.buttonLink} className="service-detail-button" >
                            {service.buttonText}
                            <span>→</span>
                        </Link>

                    </div>


                    {service.image && (

                        <div className="service-detail-hero-image">

                            <img src={service.image} alt={service.title} />

                        </div>
                    )}
                </div>
            </section>


            {/* ================================================================
                FEATURES
            ================================================================= */}

            <section className="service-features-section">
                <div className="service-section-heading">

                    <span>
                        WHAT WE OFFER
                    </span>

                    <h2>
                        Everything You Need
                    </h2>

                </div>

                <div className="service-features-grid">

                    {service.features?.map((feature, index)=>(

                            <div className="service-feature-card" key={index} >

                                <span>
                                    ✓
                                </span>

                                <p>
                                    {feature}
                                </p>

                            </div>
                        )
                    )}
                </div>
            </section>


{/* ======================================== TECHNOLOGIES ======================================== */}

            <section className="service-tech-section">
                <div className="service-tech-container">
                    <div>

                        <span>
                            TECHNOLOGY
                        </span>

                        <h2>
                            Technologies We Use
                        </h2>

                        <p>
                            We use modern and reliable technologies
                            to build scalable digital products.
                        </p>

                    </div>

                    <div className="technology-list">

                        {service.technologies?.map((technology, index)=>(

                                <span key={index}>
                                    {technology}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </section>


{/* ============================================ PROCESS ========================================== */}

            <section className="service-process-section">
                <div className="service-section-heading">

                    <span>
                        OUR PROCESS
                    </span>

                    <h2>
                        How We Work
                    </h2>

                </div>


                <div className="service-process-list">

                    {service.process?.map((item, index)=>(

                            <div className="service-process-item" key={index} >

                                <div className="process-number">
                                    0{index + 1}
                                </div>

                                <div>

                                    <h3>
                                        {item.step}
                                    </h3>

                                    <p>
                                        {item.description}
                                    </p>

                                </div>

                            </div>
                        )
                    )}
                </div>
            </section>

{/* ========================================== BENEFITS ========================================== */}

            <section className="service-benefits-section">
                <div className="service-section-heading">

                    <span>
                        WHY CHOOSE US
                    </span>

                    <h2>
                        Benefits For Your Business
                    </h2>

                </div>

                <div className="benefits-grid">

                    {service.benefits?.map((benefit, index) => (

                            <div className="benefit-card" key={index} >

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
            </section>


{/* =============================================== CTA ========================================== */}

            <section className="service-detail-cta">

                <div>

                    <span>
                        READY TO GET STARTED?
                    </span>

                    <h2>
                        Let's build something
                        amazing together.
                    </h2>

                </div>

                <Link to="/contact" className="service-detail-cta-button" >

                    Discuss Your Project

                    <span>→</span>

                </Link>
            </section>
        </div>
    );
};
export default ServiceDetail;