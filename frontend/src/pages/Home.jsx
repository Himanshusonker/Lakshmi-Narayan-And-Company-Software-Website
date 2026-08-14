import React, { useEffect, useState } from "react";
import axios from "axios";

const Home=()=>{

    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");



    // ==============================================================================
    //                                         GET HOME DATA
    // ==============================================================================

    const getHomeData=async()=>{

        try {
            setLoading(true);

            const response= await axios.get(`${import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL}/home`);

            if (response.data.success)
            {
                setHomeData(response.data.data);
            }
        } catch(error){
            console.log("Home API Error:", error );
            setError("Unable to load website data");
        }

        finally {setLoading(false);}
    };


    useEffect(()=>{
        getHomeData();
    }, []);



    // =========================================================================================
    // LOADING
    // =========================================================================================

    if (loading)
    {
        return (

            <div className="home-loading">
                <div className="loader"></div>
                <p>
                    Loading Lakshmi Narayan And Company...
                </p>
            </div>
        );
    }


    // ==========================================================================================
    // ERROR
    // ==========================================================================================

    if (error)
    {
        return (
                <div className="home-error">
                    <h2> {error} </h2>
                    <button onClick={getHomeData} > Try Again </button>
                </div>
        );
    }

    if (!homeData)
    {
        return null;
    }

    return (

            <div className="home-page">

    {/* ========================================================================================== */}
            {/* HERO SECTION */}
    {/* ========================================================================================== */}

            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <span className="hero-badge">
                            {homeData.hero?.badge}
                        </span>
                        <h1>
                            {homeData.hero?.title}
                            <span>
                                {" "}
                                {homeData.hero?.highlightedTitle}
                            </span>
                        </h1>
                        <p>
                            {homeData.hero?.description}
                        </p>
                        <div className="hero-buttons">
                            <a href={homeData.hero?.buttonLink} className="primary-btn" >
                                {homeData.hero?.buttonText}
                                <span>
                                    →
                                </span>
                            </a>

                            <a href={ homeData.hero?.secondaryButtonLink } className="secondary-btn" >
                                { homeData.hero?.secondaryButtonText }
                                <span>
                                    →
                                </span>
                            </a>

                        </div>

                        <p className="trusted-text">
                            {homeData.trustedText}
                        </p>

                    </div>

                    <div className="hero-image">
                        {homeData.hero?.image && (<img src={ homeData.hero.image } alt="Software Development" />)}
                    </div>
                </div>

            </section>

{/* ============================================================================================== */}
            {/* ABOUT SECTION */}
{/* ============================================================================================== */}

            <section className="about-section">
                <div className="about-container">
                    <div className="about-content">
                        <span className="section-small-title">
                            {homeData.about?.smallTitle}
                        </span>
                        <h2>
                            {homeData.about?.title}
                        </h2>
                        <p>
                            {homeData.about?.description}
                        </p>
                        <a href="/about-us" className="primary-btn" >
                            {homeData.about?.buttonText}
                            <span>
                                →
                            </span>
                        </a>
                    </div>

                    <div className="about-image">
                        {homeData.about?.image && (<img src={homeData.about.image} alt="Lakshmi Narayan And Company Team" />)}
                    </div>
                </div>
            </section>

{/* ============================================================================================== */}
            {/* SERVICES */}
{/* ============================================================================================== */}

            <section className="services-section">
                <div className="section-heading">
                    <span className="section-small-title">
                        WHAT WE DO
                    </span>
                    <h2>
                        {homeData.servicesTitle}
                    </h2>

                    <p>
                        {homeData.servicesDescription}
                    </p>
                </div>

                <div className="services-container">
                    {homeData.services?.map((service, index)=>(

                            <div className="service-card" key={index} >
                                <div className="service-icon">
                                    {service.icon || "💻"}
                                </div>

                                <h3>
                                    {service.title}
                                </h3>

                                <p>
                                    {service.description}
                                </p>

                                <a href={service.link} >
                                    Learn More →
                                </a>
                            </div>
                        )
                    )}

                </div>

            </section>

{/* ============================================================================================== */}
                                            {/* STATISTICS */}
{/* ============================================================================================== */}

            <section className="statistics-section">
                <div className="statistics-container">
                    {homeData.statistics?.map((stat, index)=>(

                        <div className="stat-box" key={index} >
                                <h3>
                                    {stat.number}
                                </h3>

                                <p>
                                    {stat.title}
                                </p>
                        </div>
                        )
                    )}
                </div>

            </section>



{/* ============================================================================================== */}
                                            {/* PROJECTS */}
{/* ============================================================================================== */}

            <section className="projects-section">
                <div className="section-heading">
                    <span className="section-small-title">
                        OUR WORK
                    </span>
                    <h2 >
                        {homeData.projectsTitle}
                    </h2>
                </div>

                <div className="projects-container">
                    {homeData.projects?.map((project, index)=>(

                        <div className="project-card" key={index} >
                                <div className="project-image">
                                    <img src={ project.image } alt={ project.title } />
                                </div>

                                <div className="project-content">
                                    <span>
                                        {project.category}
                                    </span>
                                    <h3>
                                        {project.title}
                                    </h3>
                                    <p>
                                        {project.description}
                                    </p>

                                    <a href={project.link}>
                                        View Project →
                                    </a>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>


{/* ============================================================================================== */}
                                    {/* WHY CHOOSE US */}
{/* ============================================================================================== */}

            <section className="why-section">
                <div className="section-heading">
                    <span className="section-small-title">
                        WHY CHOOSE US
                    </span>
                    <h2>
                        Why Businesses Choose Us
                    </h2>
                </div>

                <div className="why-container">
                    {homeData.whyChooseUs?.map((item, index)=>(

                            <div className="why-card" key={index} >

                                <div className="why-icon">
                                    {item.icon || "✓"}
                                </div>

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.description}
                                </p>
                            </div>
                        )
                    )}

                </div>

            </section>

{/* ============================================================================================== */}
                                        {/* TESTIMONIALS */}
{/* ============================================================================================== */}

            <section className="testimonial-section">
                <div className="section-heading">
                    <span className="section-small-title">
                        TESTIMONIALS
                    </span>
                    <h2>
                        {homeData.testimonialsTitle}
                    </h2>
                </div>

                <div className="testimonial-container">
                    {homeData.testimonials?.map((testimonial, index)=>(

                            <div className="testimonial-card" key={index} >

                                <div className="rating">
                                    {"★".repeat(testimonial.rating || 5 )}
                                </div>

                                <p>
                                    "{testimonial.message}"
                                </p>

                                <div className="client-info">
                                    {testimonial.image && (<img src={ testimonial.image } alt={ testimonial.name } />)}
                                    <div>

                                        <h4>
                                            {testimonial.name}
                                        </h4>

                                        <span>
                                            {testimonial.designation}
                                        </span>

                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>

{/* ============================================================================================== */}
                                                {/* CTA */}
{/* ============================================================================================== */}

            <section className="cta-section">
                <div className="cta-container">

                    <div>
                        <h2>
                            {homeData.cta?.title}
                        </h2>

                        <p>
                            {homeData.cta?.description}
                        </p>
                    </div>

                    <a href={ homeData.cta?.buttonLink } className="cta-button" >
                        {homeData.cta?.buttonText}

                        <span>
                            →
                        </span>
                    </a>

                </div>
            </section>

        </div>
    );
};

export default Home;