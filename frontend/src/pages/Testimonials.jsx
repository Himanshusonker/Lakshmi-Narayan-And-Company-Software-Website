import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Testimonials = () => {

    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ============================================================
    // GET TESTIMONIALS
    // ============================================================

    const getTestimonials = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(`${import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL}/api/testimonials`);

            if (response.data.success) {

                setTestimonials(response.data.data || []);

            } else {

                setError("Unable to load testimonials.");

            }

        } catch (error) {

            console.log("Testimonials API Error:", error);

            setError("Unable to load testimonials.");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        getTestimonials();

    }, []);


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <div className="testimonials-loading">

                <div className="testimonials-loader"></div>

                <p>
                    Loading testimonials...
                </p>

            </div>

        );

    }


    // ============================================================
    // ERROR
    // ============================================================

    if (error) {

        return (

            <div className="testimonials-error">

                <h2>
                    {error}
                </h2>

                <button onClick={getTestimonials}>
                    Try Again
                </button>

            </div>

        );

    }


    return (

        <div className="testimonials-page">


            {/* ============================================================
                HERO SECTION
            ============================================================ */}

            <section className="testimonials-hero">

                <div className="testimonials-hero-container">

                    <span className="testimonials-small-title">
                        CLIENT TESTIMONIALS
                    </span>

                    <h1>

                        What Our
                        <strong>
                            {" "}Clients Say
                        </strong>

                    </h1>

                    <p>

                        Don't just take our word for it.
                        See what businesses and clients say
                        about working with Lakshmi Narayan
                        And Company.

                    </p>

                </div>

            </section>



            {/* ============================================================
                INTRO SECTION
            ============================================================ */}

            <section className="testimonials-intro">

                <div className="testimonials-intro-container">

                    <span>
                        CLIENT FEEDBACK
                    </span>

                    <h2>
                        Building Relationships Through
                        Great Digital Experiences
                    </h2>

                    <p>

                        We believe every successful project
                        starts with understanding our client's
                        requirements and ends with delivering
                        a solution they can trust.

                    </p>

                </div>

            </section>



            {/* ============================================================
                TESTIMONIAL LIST
            ============================================================ */}

            <section className="testimonials-list">

                <div className="testimonials-grid">

                    {testimonials.length === 0 ? (

                        <div className="no-testimonials">

                            <h3>
                                No Testimonials Available
                            </h3>

                            <p>
                                Client testimonials will be displayed
                                here soon.
                            </p>

                        </div>

                    ) : (

                        testimonials.map((testimonial, index)=>(

                            <article className="testimonial-card" key={testimonial._id || index}>

{/* =========================================== TOP ============================================== */}

                                <div className="testimonial-card-top">

                                    <div className="testimonial-quote">
                                        "
                                    </div>


                                    <div className="testimonial-rating">

                                        {Array.from(
                                            {
                                                length: testimonial.rating || 5
                                            },
                                            (_, ratingIndex) => (

                                                <span key={ratingIndex}>
                                                    ★
                                                </span>
                                            )
                                        )}

                                    </div>

                                </div>

{/* ========================================== MESSAGE ============================================ */}

                                <p className="testimonial-message">

                                    {testimonial.message}

                                </p>

{/* ============================================ CLIENT ========================================== */}

                                <div className="testimonial-client">

                                    <div className="testimonial-client-image">

                                        {testimonial.image ? (

                                            <img src={testimonial.image} alt={testimonial.name}/>

                                        ) : (

                                            <span>
                                                {testimonial.name ?.charAt(0) ?.toUpperCase() || "C"}
                                            </span>
                                        )}

                                    </div>

                                    <div className="testimonial-client-info">

                                        <h3>
                                            {testimonial.name}
                                        </h3>

                                        <p>
                                            {testimonial.designation}
                                        </p>

                                    </div>

                                </div>


                            </article>

                        ))

                    )}

                </div>

            </section>

{/* ========================================== TRUST SECTION ===================================== */}

            <section className="testimonial-trust">

                <div className="testimonial-trust-container">

                    <div>

                        <span>
                            WHY CLIENTS TRUST US
                        </span>

                        <h2>
                            Your Success Is Our Priority
                        </h2>

                    </div>

                    <div className="trust-points">

                        <div>

                            <strong>
                                ✓
                            </strong>

                            <p>
                                Quality Development
                            </p>

                        </div>

                        <div>

                            <strong>
                                ✓
                            </strong>

                            <p>
                                Transparent Communication
                            </p>

                        </div>

                        <div>

                            <strong>
                                ✓
                            </strong>

                            <p>
                                Dedicated Support
                            </p>

                        </div>

                        <div>

                            <strong>
                                ✓
                            </strong>

                            <p>
                                On-Time Delivery
                            </p>

                        </div>

                    </div>

                </div>

            </section>

{/* ========================================== CTA SECTION ======================================= */}

            <section className="testimonials-cta">

                <div className="testimonials-cta-container">

                    <div>

                        <span>
                            HAVE A PROJECT IN MIND?
                        </span>

                        <h2>
                            Let's Build Something
                            Amazing Together.
                        </h2>

                        <p>

                            Have an idea for your next
                            website or software project?
                            Let's turn it into reality.

                        </p>

                    </div>

                    <Link to="/contact" className="testimonials-cta-button">

                        Start Your Project

                        <span>
                            →
                        </span>

                    </Link>

                </div>

            </section>

        </div>

    );

};
export default Testimonials;