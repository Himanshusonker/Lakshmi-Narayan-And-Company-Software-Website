import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home=()=>{

    const [homeData, setHomeData]= useState(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState("");
    const [contactForm, setContactForm]= useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
});

    const [contactSubmitting, setContactSubmitting] = useState(false);
    const [contactSuccess, setContactSuccess] = useState("");
    const [contactError, setContactError] = useState("");


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


    const handleContactChange=(e)=> {

    const { name, value }= e.target;

    setContactForm((prev)=> ({...prev, [name]: value}));

};


    const handleContactSubmit=async(e)=> {

    e.preventDefault();

    try {

        setContactSubmitting(true);
        setContactSuccess("");
        setContactError("");

        const response= await axios.post(`${import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL}/api/contact`, contactForm);

        if (response.data.success) {

            setContactSuccess("Thank you! Your requirement has been sent successfully.");

            setContactForm({name: "", email: "", phone: "", subject: "", message: ""});

        } else {

            setContactError(response.data.message || "Unable to send your requirement.");

        }

    } catch (error) {

        console.log("Home Contact Error:", error.response?.data || error.message);

        setContactError(error.response?.data?.message || "Unable to send your requirement. Please try again.");

    } finally {

        setContactSubmitting(false);

    }
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

                                <Link to={service.link}>
                                    Learn More →
                                </Link>
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


{/* ======================================== CONTACT FORM ======================================= */}

        <section className="home-contact-section">
            <div className="home-contact-container">

                <div className="home-contact-content">

                    <span className="home-contact-small-title">
                        GET IN TOUCH
                    </span>

                    <h2>
                        Let's Discuss
                        <span> Your Project</span>
                    </h2>

                    <p>
                        Have a project idea, business requirement or
                        software development need? Tell us about it.
                        Our team will get back to you shortly.
                    </p>

                    <div className="home-contact-points">

                        <div>
                            <span>✓</span>
                            <p>Free Project Consultation</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Quick Response</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Professional Development Support</p>
                        </div>

                    </div>

                </div>


                <div className="home-contact-form">

                    <form onSubmit={handleContactSubmit}>

                        <div className="home-form-row">

                            <div className="home-form-group">
                                <label>Name</label>

                                <input type="text" name="name" value={contactForm.name} onChange={handleContactChange} placeholder="Enter your name" required/>
                            </div>

                            <div className="home-form-group">
                                <label>Email</label>

                                <input type="email" name="email" value={contactForm.email} onChange={handleContactChange} placeholder="Enter your email" required/>
                            </div>

                        </div>

                        <div className="home-form-row">

                            <div className="home-form-group">
                                <label>Phone</label>

                                <input type="tel" name="phone" value={contactForm.phone} onChange={handleContactChange} placeholder="Enter your phone number" required/>
                            </div>

                            <div className="home-form-group">
                                <label>Subject</label>

                                <input type="text" name="subject" value={contactForm.subject} onChange={handleContactChange} placeholder="Project subject" required/>
                            </div>

                        </div>

                        <div className="home-form-group">

                            <label>Your Requirement</label>

                            <textarea name="message" value={contactForm.message} onChange={handleContactChange} rows="6" placeholder="Tell us about your project or requirement..." required/>

                        </div>

                        {contactSuccess && (
                            <div className="home-contact-success">
                                {contactSuccess}
                            </div>
                        )}

                        {contactError && (
                            <div className="home-contact-error">
                                {contactError}
                            </div>
                        )}

                        <button type="submit" className="home-contact-submit" disabled={contactSubmitting}>

                            {contactSubmitting ? "Sending..." : "Send Requirement" }

                            {!contactSubmitting && (
                                <span>→</span>
                            )}
                        </button>

                    </form>

                </div>

            </div>
        </section>

    </div>
    );
};
export default Home;