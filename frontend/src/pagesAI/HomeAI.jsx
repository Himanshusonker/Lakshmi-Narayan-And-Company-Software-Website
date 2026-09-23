import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AIChat from "../component/AIChat";
import SEO from "../componentAI/SEOAI";
import {homeSEO, organizationSchema, websiteSchema,} from "../DataAI/seoAIData";

const HomeAI = () => {

    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [contactSubmitting, setContactSubmitting] = useState(false);
    const [contactSuccess, setContactSuccess] = useState("");
    const [contactError, setContactError] = useState("");

    
    const [chatMessage, setChatMessage] = useState(""); 
    const [chatMessages, setChatMessages] = useState([ 
        { 
            type: "ai", 
            text: "Hello! 👋 How can I help you with your AI project?" 
        } 
    ]); 
    
    const [chatLoading, setChatLoading] = useState(false);

    const API_URL=import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL;

    // =========================================================
    // GET HOME DATA
    // =========================================================

    const getHomeData = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_URL}/homeai`
            );

            if (response.data.success) {

                setHomeData(response.data.data);

            } else {

                setError(
                    response.data.message ||
                    "Unable to load AI website data"
                );
            }

        } catch (error) {

            console.log("Home API Error:", error);

            setError("Unable to load AI website data");

        } finally {

            setLoading(false);

        }
    };


    // =========================================================
    // CONTACT FORM
    // =========================================================

    const handleContactChange = (e) => {

        const { name, value } = e.target;

        setContactForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleContactSubmit = async (e) => {

        e.preventDefault();

        try {

            setContactSubmitting(true);
            setContactSuccess("");
            setContactError("");

            const response = await axios.post(
                `${API_URL}/api/contactai`,
                contactForm
            );

            if (response.data.success) {

                setContactSuccess(
                    "Thank you! Your AI project requirement has been sent successfully."
                );

                setContactForm({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                });

            } else {

                setContactError(
                    response.data.message ||
                    "Unable to send your requirement."
                );
            }

        } catch (error) {

            console.log(
                "Contact Error:",
                error.response?.data || error.message
            );

            setContactError(
                error.response?.data?.message ||
                "Unable to send your requirement. Please try again."
            );

        } finally {

            setContactSubmitting(false);
        }
    };

    // =========================================================
    //  >>> ADDED: AI DEMO CHAT 
    // =========================================================
    
    const handleChatSubmit = async (e) => { 
        
        e.preventDefault(); 
        
        if (!chatMessage.trim() || chatLoading) { 
            
            return; 
        } 
    
    const userMessage = chatMessage.trim(); 
    
    setChatMessages((prev) => [ 
        
        ...prev, 
        { 
            type: "user", 
            text: userMessage 
        } 
    ]); 
    
    setChatMessage(""); 
    setChatLoading(true); 
    
    try {   
        
        const response = await axios.post( `${API_URL}/api/ai/chat`,  {  message: userMessage  }  );   
        
        const aiReply =response.data?.reply || response.data?.message ||
            "Thanks for your question! Our AI Assistant can help you with AI solutions, business automation, websites, software development and more."; 
        
        setChatMessages((prev) => [ ...prev, {  type: "ai", text: aiReply  } ]);  
        
        // await new Promise((resolve) => setTimeout(resolve, 800) ); 
        
        // setChatMessages((prev) => [ ...prev, { type: "ai", 
            
        //     text: "Thanks for your question! Our AI Assistant can help you with AI solutions, business automation, websites, software development and more." } ]); 
        
        } catch (error) { 
            
            console.error( "AI Demo Chat Error:", error.response?.data || error.message ); 
            
            setChatMessages((prev) => [ ...prev, { type: "ai", text: "Sorry, something went wrong. Please try again." 

            } ]); 
        } 
        
        finally { setChatLoading(false); } 
    };


    useEffect(() => {

        getHomeData();

    }, []);


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="home-loading">

                <div className="loader"></div>

                <p>
                    Loading AI Website...
                </p>

            </div>
        );
    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (

            <div className="home-error">

                <h2>
                    {error}
                </h2>

                <button onClick={getHomeData}>
                    Try Again
                </button>

            </div>
        );
    }


    if (!homeData) {
        return null;
    }


    return (
            <>
                <SEO
                    {...homeSEO}
                    schema={{
                        "@context": "https://schema.org",

                        "@graph": [
                        organizationSchema,
                        websiteSchema,
                        ],
                    }}
                    />

        <div className="ai-home-page">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="ai-hero-section">

                <div className="ai-hero-container">

                    <div className="ai-hero-content">

                        <span className="ai-badge">
                            {homeData.hero?.badge || "✦ NEXT GENERATION AI SOLUTIONS"}
                        </span>

                        <h1>

                            {homeData.hero?.title || "Build Smarter"}

                            <span>
                                {" "}
                                {homeData.hero?.highlightedTitle || "With Artificial Intelligence"}
                            </span>

                        </h1>

                        <p>
                            {homeData.hero?.description || "We build intelligent AI solutions that help businesses automate processes, improve productivity and create better digital experiences."}
                        </p>


                        <div className="ai-hero-buttons">

                            <Link
                                to={homeData.hero?.buttonLink || "/contact"}
                                className="ai-primary-btn"
                            >
                                {homeData.hero?.buttonText || "Start Your AI Project"}
                                <span>→</span>
                            </Link>


                            <Link
                                to={
                                    homeData.hero?.secondaryButtonLink ||
                                    "/ai-assistant"
                                }
                                className="ai-secondary-btn"
                            >
                                {homeData.hero?.secondaryButtonText || "Try AI Assistant"}
                                <span>→</span>
                            </Link>

                        </div>


                        <p className="ai-trusted-text">
                            {homeData.trustedText || "Trusted AI solutions for modern businesses"}
                        </p>

                    </div>
                    
                    <div className="ai-hero-stats"> 
                        
                        <div className="ai-hero-stat"> 
                            
                            <strong> AI </strong> 
                            
                            <span> Powered Solutions </span> 
                            
                            </div> 
                            
                                <div className="ai-hero-stat"> 
                                    
                                    <strong> 24/7 </strong> 
                                    
                                        <span> Smart Assistance </span> 
                                        
                                        </div> 
                                        
                                        <div className="ai-hero-stat"> 
                                            
                                            <strong> ∞ </strong> 
                                            
                                            <span> Possibilities </span> 
                                            
                                            </div> 
                                            
                                        </div> 
                                        
                                    </div> 
                                    
                                    <div className="ai-hero-visual"> 
                                        
                                        {homeData.hero?.image ? ( 
                                            <img src={homeData.hero.image} 
                                            alt="Artificial Intelligence Solutions" 
                                            /> 
                                        
                                    ) : ( 
                                        
                                        <div className="ai-hero-ai-visual"> 
                                        
                                            <div className="ai-hero-ai-circle"> AI </div> 
                                            
                                            <span className="ai-floating-card card-one"> 
                                                
                                                🧠 Intelligent 
                                                
                                            </span> 
                                            
                                        <span className="ai-floating-card card-two"> 
                                            
                                            ⚡ Automated 
                                            
                                        </span> 
                                        
                                        <span className="ai-floating-card card-three"> 
                                            
                                            📊 Data Driven 
                                            
                                        </span> 
                                        
                                        <span className="ai-floating-card card-four"> 
                                            
                                            🔐 Secure 
                                            
                                        </span> 
                                        
                                        </div> 
                                        
                                    )} 
                                    
                                    </div> 
                                        
                        </section>


            {/* =====================================================
                AI INTRODUCTION
            ===================================================== */}

            <section className="ai-introduction-section">

                <div className="ai-introduction-container">

                    <div className="ai-section-image">

                        {homeData.introduction?.image ? (

                            <img
                                src={homeData.introduction.image}
                                alt={ homeData.introduction?.title || "AI Technology" }
                            />

                            ) : (
                             
                             <div className="ai-image-placeholder"> AI </div>

                        )}

                    </div>


                    <div className="ai-section-content">

                        <span className="ai-small-title">
                            {homeData.introduction?.smallTitle || "AI TECHNOLOGY"}
                        </span>

                        <h2>
                            {homeData.introduction?.title || "Intelligence That Works For You."}
                        </h2>

                        <p>
                            {homeData.introduction?.description || "Artificial Intelligence is changing the way businesses operate, communicate and serve their customers."}
                        </p>


                        <Link
                            to="/about"
                            className="ai-primary-btn"
                        >
                            Learn More
                            <span>→</span>
                        </Link>

                    </div>

                </div>

            </section>


            {/* =====================================================
                AI FEATURES
            ===================================================== */}

            <section className="ai-features-section">

                <div className="ai-section-heading">

                    <span className="ai-small-title">
                        AI CAPABILITIES
                    </span>

                    <h2>
                        {homeData.featuresTitle || "Everything You Need To Build With AI"}
                    </h2>

                    <p>
                        {homeData.featuresDescription || "Everything You Need To Build With AI"}
                    </p>

                </div>


                <div className="ai-features-container">

                    {homeData.features?.map((feature, index) => (

                        <div
                            className="ai-feature-card"
                            key={index}
                        >

                            <div className="ai-feature-icon">
                                {feature.icon || "🤖"}
                            </div>

                            <h3>
                                {feature.title}
                            </h3>

                            <p>
                                {feature.description}
                            </p>

                            <span className="ai-card-arrow"> → </span>

                        </div>

                    ))}

                </div>

            </section>


            {/* =====================================================
                AI SERVICES
            ===================================================== */}

            <section className="ai-services-section">

                <div className="ai-section-heading">

                    <span className="ai-small-title">
                        AI SERVICES
                    </span>

                    <h2>
                        {homeData.servicesTitle || "AI Solutions For Real Business Needs"}
                    </h2>

                    <p>
                        {homeData.servicesDescription || "From AI assistants to business automation, we create solutions designed around your objectives."}
                    </p>

                </div>


                <div className="ai-services-container">

                    {homeData.services?.map((service, index) => (

                        <div
                            className="ai-service-card"
                            key={index}
                        >

                            <div className="ai-service-number"> {String(index + 1).padStart(2, "0")} </div>

                            <div className="ai-service-icon">
                                {service.icon || "⚡"}
                            </div>

                            <h3>
                                {service.title}
                            </h3>

                            <p>
                                {service.description}
                            </p>

                            <Link to={service.link || "/services"}>
                                Learn More →
                            </Link>

                        </div>

                    ))}

                </div>

            </section>


            {/* =====================================================
                HOW AI WORKS
            ===================================================== */}

            <section className="how-ai-works-section">

                <div className="ai-section-heading">

                    <span className="ai-small-title">
                        HOW IT WORKS
                    </span>

                    <h2>
                        {homeData.howAiWorksTitle || "How We Build AI Solutions"}
                    </h2>

                    <p>
                        {homeData.howAiWorksDescription || "A structured approach from idea to deployment."}
                    </p>

                </div>


                <div className="how-ai-works-container">

                    {homeData.howAiWorks?.map((step, index) => (

                        <div
                            className="ai-work-step"
                            key={index}
                        >

                            <div className="ai-step-number">
                                {step.number || index + 1}
                            </div>

                            <h3>
                                {step.title}
                            </h3>

                            <p>
                                {step.description}
                            </p>

                        </div>

                    ))}

                </div>

            </section>


            {/* =====================================================
                AI DEMO / CHAT
            ===================================================== */}

            <section className="ai-demo-section">

                <div className="ai-demo-container">

                    <div className="ai-demo-content">

                        <span className="ai-small-title">
                            AI ASSISTANT
                        </span>

                        <h2>
                            {homeData.aiDemo?.title || "Experience AI In Action"}
                        </h2>

                        <p>
                            {homeData.aiDemo?.description || "Ask a question and experience an AI-powered conversation."}
                        </p>

                        <Link
                            to="/ai-assistant"
                            className="ai-primary-btn"
                        >
                            Start AI Assistant
                            <span>→</span>
                        </Link>

                    </div>

                    {/* ================================================= 
                        >>>REAL DEMO CHAT 
                    ================================================= */}

                    {/* <div className="ai-chat-preview"> 
                        
                        <div className="ai-chat-header"> 
                            
                            <div className="ai-chat-avatar"> AI </div> 
                            
                            <div> <strong> AI Assistant 
                                
                                </strong> <span> ● Online </span> 
                                
                                </div> 

                                    </div> 
                                    
                                    <div className="ai-chat-messages"> 
                                        
                                        {chatMessages.map( (chat, index) => ( 
                                            
                                            <div key={index} className={ chat.type === "user" ? "ai-chat-message ai-user-message" : "ai-chat-message ai-bot-message" } >
                                                
                                                 {chat.text} 
                                                 
                                            </div> 
                                        
                                        ) )}
                                        
                                        {chatLoading && ( 
                                            
                                            <div className="ai-chat-message ai-bot-message">
                                            
                                             AI is thinking... 
                                             
                                             </div> 
                                            )
                                        } 
                                        
                                        </div>
                                        
                                    
                                        
                                        <form className="ai-chat-input" onSubmit={handleChatSubmit} > 
                                            
                                            <input type="text" value={chatMessage} onChange={(e) => setChatMessage( e.target.value ) } placeholder="Ask something..." disabled={chatLoading} /> 
                                            
                                            <button type="submit" disabled={ chatLoading || !chatMessage.trim() } > ➤ </button> 
                                            
                                        </form> 
                                        
                                        <Link to="/ai-assistant" className="ai-chat-button" > 
                                        
                                            Open Full AI Assistant → 
                                            
                                        </Link>

                    </div> */}

                    {/* =================================================
                        🔴 ACTUAL AI ASSISTANT
                        >>> YAHAN <AIChat /> RAKHNA HAI <<<
                    ================================================= */}

                    <div className="ai-demo-chat">

                        <AIChat />

                    </div>

                </div>

            </section>


            {/* =====================================================
                PROJECTS / USE CASES
            ===================================================== */}

            <section className="ai-projects-section">

                <div className="ai-section-heading">

                    <span className="ai-small-title">
                        OUR WORK
                    </span>

                    <h2>
                        {homeData.projectsTitle || "AI Projects & Use Cases"}
                    </h2>

                </div>


                <div className="ai-projects-container">

                    {homeData.projects?.map((project, index) => (

                        <div
                            className="ai-project-card"
                            key={index}
                        >

                            <div className="ai-project-image">

                                {project.image ? (

                                <img
                                    src={project.image}
                                    alt={project.title || "AI Project"}
                                />

                                ) : ( 
                                    
                                <div className="ai-project-placeholder"> AI </div> 
                                
                                )}

                            </div>


                            <div className="ai-project-content">

                                <span>
                                    {project.category}
                                </span>

                                <h3>
                                    {project.title}
                                </h3>

                                <p>
                                    {project.description}
                                </p>

                                <Link
                                    to={project.link || "/projects"}
                                >
                                    View Project →
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            </section>


            {/* =====================================================
                TESTIMONIALS
            ===================================================== */}

            <section className="ai-testimonial-section">

                <div className="ai-section-heading">

                    <span className="ai-small-title">
                        TESTIMONIALS
                    </span>

                    <h2>
                        {homeData.testimonialsTitle || "What Our Clients Say"}
                    </h2>

                </div>


                <div className="ai-testimonial-container">

                    {homeData.testimonials?.map(
                        (testimonial, index) => (

                            <div
                                className="ai-testimonial-card"
                                key={index}
                            >

                                <div className="ai-rating">
                                    {"★".repeat(
                                        testimonial.rating || 5
                                    )}
                                </div>

                                <p>
                                    "{testimonial.message}"
                                </p>

                                <div className="ai-client-info">

                                    {testimonial.image ? (

                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name || "Client"}
                                        />

                                    ) : ( 
                                        
                                    <div className="ai-client-avatar"> 
                                    
                                        {testimonial.name ?.charAt(0) ?.toUpperCase() || "C"} 
                                        
                                    </div>

                                    )}

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


            {/* =====================================================
                PRICING
            ===================================================== */}

            <section className="ai-pricing-section">

                <div className="ai-section-heading">

                    <span className="ai-small-title">
                        AI PRICING
                    </span>

                    <h2>
                        {homeData.pricingTitle || "Simple AI Pricing Options"}
                    </h2>

                    <p>
                        {homeData.pricingDescription || "Choose a starting point or talk to us about a custom AI solution."}
                    </p>

                </div>


                <div className="ai-pricing-container">

                    {homeData.pricing?.map((plan, index) => (

                        <div
                            className={`ai-pricing-card ${
                                plan.featured
                                    ? "featured-plan"
                                    : ""
                            }`}
                            key={index}
                        >

                            {plan.featured && (
                                <div className="popular-badge">
                                    Popular
                                </div>
                            )}

                            <h3>
                                {plan.name}
                            </h3>

                            <p className="ai-price">
                                {plan.price}
                            </p>

                            <p>
                                {plan.description}
                            </p>


                            <ul>

                                {plan.features?.map(
                                    (feature, featureIndex) => (

                                        <li key={featureIndex}>
                                            ✓ {feature}
                                        </li>

                                    )
                                )}

                            </ul>


                            <Link
                                to="/contact"
                                className="ai-pricing-button"
                            >
                                Get Started
                            </Link>

                        </div>

                    ))}

                </div>

            </section>


            {/* =====================================================
                FAQ
            ===================================================== */}

            <section className="ai-faq-section">

                <div className="ai-section-heading">

                    <span className="ai-small-title">
                        FAQ
                    </span>

                    <h2>
                        Frequently Asked Questions
                    </h2>

                </div>


                <div className="ai-faq-container">

                    {homeData.faq?.map((item, index) => (

                        <details
                            className="ai-faq-item"
                            key={index}
                        >

                            <summary>
                                {item.question}

                                <b> + </b>
                            </summary>

                            <p>
                                {item.answer}
                            </p>

                        </details>

                    ))}

                </div>

            </section>


            {/* =====================================================
                CONTACT CTA
            ===================================================== */}

            <section className="ai-contact-section">

                <div className="ai-contact-container">

                    <div className="ai-contact-content">

                        <span className="ai-small-title">
                            START YOUR AI PROJECT
                        </span>

                        <h2>
                            {homeData.cta?.title || "Ready To Build Your AI Solution?"}
                        </h2>

                        <p>
                            {homeData.cta?.description || "Tell us about your idea, business or challenge and let's create an intelligent solution together."}
                        </p>


                        <div className="ai-contact-points">

                            <div>
                                ✓ Free AI Project Consultation
                            </div>

                            <div>
                                ✓ Requirement Analysis
                            </div>

                            <div>
                                ✓ Custom AI Solution Planning
                            </div>

                            <div>
                                ✓ Professional Development Support
                            </div>

                        </div>

                    </div>


                    {/* ================================================= 
                        CONTACT FORM 
                    ================================================= */}


                    <div className="ai-contact-form">

                        <form onSubmit={handleContactSubmit}>

                            <div className="ai-form-row">

                                <div className="ai-form-group">

                                    <label>
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleContactChange}
                                        placeholder="Enter your name"
                                        required
                                    />

                                </div>


                                <div className="ai-form-group">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={handleContactChange}
                                        placeholder="Enter your email"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="ai-form-row">

                                <div className="ai-form-group">

                                    <label>
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={contactForm.phone}
                                        onChange={handleContactChange}
                                        placeholder="Enter your phone number"
                                        required
                                    />

                                </div>


                                <div className="ai-form-group">

                                    <label>
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        name="subject"
                                        value={contactForm.subject}
                                        onChange={handleContactChange}
                                        placeholder="AI Project Subject"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="ai-form-group">

                                <label>
                                    Your AI Requirement
                                </label>

                                <textarea
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleContactChange}
                                    rows="6"
                                    placeholder="Tell us about your AI project or business requirement..."
                                    required
                                />

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


                            <button
                                type="submit"
                                className="ai-contact-submit"
                                disabled={contactSubmitting}
                            >

                                {contactSubmitting
                                    ? "Sending..."
                                    : "Send AI Requirement"
                                }

                                {!contactSubmitting && (
                                    <span>→</span>
                                )}

                            </button>

                        </form>

                    </div>

                </div>

            </section>

        </div>
    </>
    );
};

export default HomeAI;