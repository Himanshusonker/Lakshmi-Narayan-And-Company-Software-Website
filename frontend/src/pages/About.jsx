import React, { useEffect, useState } from "react";
import axios from "axios";

const About=()=>{

    const [aboutData, setAboutData]=useState(null);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");

    // ========================================================
    // GET ABOUT DATA
    // ========================================================

    const getAboutData=async()=>{

        try {

            setLoading(true);
            setError("");

            const response= await axios.get(`${import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL}/about`);

            if (response.data.success) {

                setAboutData(response.data.data);

            }

        } catch (error) {

            console.log("About API Error:", error);
            setError("Unable to load About Us page");

        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{

        getAboutData();

    }, []);

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="about-loading">
                <div className="about-loader"></div>

                <p>
                    Loading Lakshmi Narayan And Company...
                </p>

            </div>
        );
    }


    // ========================================================
    // ERROR
    // ========================================================

    if (error) {

        return (

                    <div className="about-error">

                        <h2>
                            {error}
                        </h2>

                    <button onClick={getAboutData}>
                        Try Again
                    </button>

                    </div>
            );
    }

    if (!aboutData) {
        return null;
    }

    return (

            <div className="about-page">


{/* =============================================== HERO ========================================= */}

            <section className="about-hero">
                <div className="about-hero-container">
                    <div className="about-hero-content">

                        <span className="about-small-title">

                            {aboutData.hero?.smallTitle}

                        </span>

                        <h1>
                            {aboutData.hero?.title}
                            <span>

                                {" "}

                                {aboutData.hero?.highlightedTitle}

                            </span>
                        </h1>

                        <p>

                            {aboutData.hero?.description}

                        </p>

                    </div>

                    <div className="about-hero-image">

                        {aboutData.hero?.image && (

                            <img src={aboutData.hero.image} alt="Lakshmi Narayan And Company" />
                        )}

                    </div>
                </div>
            </section>

{/* ===================================== COMPANY INTRODUCTION =================================== */}

            <section className="company-section">
                <div className="company-container">
                    <div className="company-image">

                        {aboutData.company?.image && (

                            <img src={aboutData.company.image} alt="Our Company" />

                        )}

                    </div>

                    <div className="company-content">

                        <span className="section-small-title">
                            WHO WE ARE
                        </span>

                        <h2>
                            {aboutData.company?.title}
                        </h2>

                        <p>
                            {aboutData.company?.description}
                        </p>

                        <div className="company-highlight">

                            <span>
                                ✓
                            </span>

                            <p>
                                Building technology with purpose,
                                quality and long-term value.
                            </p>

                        </div>
                    </div>
                </div>
            </section>



{/* ============================================ MISSION & VISION ================================= */}

            <section className="mission-section">
                <div className="section-heading">

                    <span className="section-small-title">
                        OUR PURPOSE
                    </span>

                    <h2>
                        Mission & Vision
                    </h2>

                </div>

                <div className="mission-container">

                                                {/* MISSION */}

                    <div className="purpose-card">

                        <div className="purpose-icon">
                            {aboutData.mission?.icon || "🎯"}
                        </div>

                        <h3>
                            {aboutData.mission?.title}
                        </h3>

                        <p>
                            {aboutData.mission?.description}
                        </p>

                    </div>

                                                {/* VISION */}

                    <div className="purpose-card">

                        <div className="purpose-icon">
                            {aboutData.vision?.icon || "👁️"}
                        </div>

                        <h3>
                            {aboutData.vision?.title}
                        </h3>

                        <p>
                            {aboutData.vision?.description}
                        </p>

                    </div>
                </div>
            </section>

{/* =============================================== VALUES ======================================= */}

            <section className="values-section">
                <div className="section-heading">

                    <span className="section-small-title">
                        OUR VALUES
                    </span>

                    <h2>
                        What We Believe In
                    </h2>

                </div>

                <div className="values-container">
                    {aboutData.values?.map((value, index)=>(

                            <div className="value-card" key={index} >

                                <div className="value-icon">
                                    {value.icon || "✓"}
                                </div>

                                <h3>
                                    {value.title}
                                </h3>

                                <p>
                                    {value.description}
                                </p>

                            </div>
                        )
                    )}
                </div>
            </section>

{/* ======================================= WHY CHOOSE US ======================================== */}

            <section className="about-why-section">
                <div className="about-why-container">
                    <div className="about-why-content">

                        <span className="section-small-title">
                            WHY CHOOSE US
                        </span>

                        <h2>
                            {aboutData.whyChooseUs?.title}
                        </h2>

                        <p>
                            {aboutData.whyChooseUs?.description}
                        </p>

                    </div>

                    <div className="why-points">

                        {aboutData.whyChooseUs?.points?.map((point, index)=>(

                                <div className="why-point" key={index}>

                                    <span>
                                        ✓
                                    </span>

                                    <p>
                                        {point}
                                    </p>

                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

{/* ============================================== CTA ========================================= */}

            <section className="about-cta">
                <div className="about-cta-container">
                    <div>

                        <span>
                            HAVE A PROJECT IN MIND?
                        </span>

                        <h2>
                            {aboutData.cta?.title}
                        </h2>

                        <p>
                            {aboutData.cta?.description}
                        </p>

                    </div>

                    <a href={aboutData.cta?.buttonLink} className="about-cta-button">

                        {aboutData.cta?.buttonText}

                        <span>
                            →
                        </span>

                    </a>
                </div>
            </section>
        </div>
    );
};
export default About;