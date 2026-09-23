import React from "react";
import { Link } from "react-router-dom";
import SEO from "../componentAI/SEOAI";
import { aboutSEO } from "../DataAI/seoAIData";

const technologyData = [
    {
        icon: "⚛️",
        title: "React",
        description:
            "Modern and scalable frontend applications with fast and interactive user experiences.",
    },
    {
        icon: "🟢",
        title: "Node.js",
        description:
            "High-performance backend systems and APIs for modern business applications.",
    },
    {
        icon: "🤖",
        title: "Artificial Intelligence",
        description:
            "AI-powered solutions for automation, intelligent assistants, analytics and business workflows.",
    },
    {
        icon: "🍃",
        title: "MongoDB",
        description:
            "Flexible and scalable database solutions for modern applications and business systems.",
    },
    {
        icon: "🔗",
        title: "REST APIs",
        description:
            "Secure API integrations connecting websites, applications, databases and third-party services.",
    },
    {
        icon: "☁️",
        title: "Cloud Technology",
        description:
            "Reliable cloud deployment and infrastructure for scalable digital products.",
    },
];

const whyChooseData = [
    {
        number: "01",
        title: "Business-Focused Solutions",
        description:
            "We focus on understanding your business requirements before selecting the right technology and development approach.",
    },
    {
        number: "02",
        title: "Modern Technology",
        description:
            "We use modern development technologies to build scalable, responsive and maintainable digital solutions.",
    },
    {
        number: "03",
        title: "Custom Development",
        description:
            "Every business is different. Our solutions are designed around your specific goals, workflows and requirements.",
    },
    {
        number: "04",
        title: "Long-Term Support",
        description:
            "Our relationship does not end after development. We can continue to help with improvements, maintenance and new features.",
    },
];

const AboutAI = () => {
    return (

        <>

      <SEO {...aboutSEO} />

        <main className="about-ai-page">

            {/* =====================================================
                HERO / ABOUT COMPANY
            ====================================================== */}
            <section className="about-ai-hero">

                <div className="about-ai-hero-overlay"></div>

                <div className="about-ai-container about-ai-hero-content">

                    <span className="about-ai-badge">
                        ABOUT OUR COMPANY
                    </span>

                    <h1>
                        Building Technology
                        <span> That Moves Business Forward</span>
                    </h1>

                    <p>
                        We build modern websites, software, AI solutions
                        and intelligent digital systems designed to help
                        businesses grow.
                    </p>

                    <div className="about-ai-hero-buttons">

                        <Link
                            to="/contactai"
                            className="about-ai-main-button"
                        >
                            Start a Project
                        </Link>

                        <a
                            href="#who-we-are"
                            className="about-ai-outline-button"
                        >
                            Discover More
                        </a>

                    </div>

                </div>
            </section>


            {/* =====================================================
                WHO WE ARE
            ====================================================== */}
            <section
                id="who-we-are"
                className="about-ai-section about-ai-who-section"
            >
                <div className="about-ai-container">

                    <div className="about-ai-two-column">

                        <div className="about-ai-section-content">

                            <span className="about-ai-section-label">
                                WHO WE ARE
                            </span>

                            <h2>
                                Technology Partner for
                                <strong> Modern Businesses</strong>
                            </h2>

                            <p>
                                Lakshmi Narayan and Company is a technology
                                and software development company focused on
                                building practical digital solutions for
                                businesses.
                            </p>

                            <p>
                                We work across web development, software
                                development, AI, automation, APIs and
                                business applications to turn ideas into
                                useful technology products.
                            </p>

                            <p>
                                Our approach combines business understanding,
                                modern technology and custom development to
                                create solutions that are designed for real
                                business needs.
                            </p>

                        </div>

                        <div className="about-ai-info-card">

                            <div className="about-ai-info-icon">
                                AI
                            </div>

                            <h3>
                                Technology With Purpose
                            </h3>

                            <p>
                                We believe technology should solve real
                                problems, simplify workflows and create
                                measurable value for businesses.
                            </p>

                            <div className="about-ai-info-line"></div>

                            <strong>
                                WE BUILD. YOU GROW.
                            </strong>

                        </div>

                    </div>

                </div>
            </section>


            {/* =====================================================
                WHAT WE DO
            ====================================================== */}
            <section
                className="about-ai-section about-ai-what-section"
            >
                <div className="about-ai-container">

                    <div className="about-ai-section-heading">

                        <span>WHAT WE DO</span>

                        <h2>
                            From Ideas to
                            <strong> Digital Products</strong>
                        </h2>

                        <p>
                            We help businesses design, develop and improve
                            digital products using modern technologies.
                        </p>

                    </div>


                    <div className="about-ai-services-grid">

                        <article className="about-ai-service-card">

                            <div className="about-ai-service-icon">
                                🌐
                            </div>

                            <h3>Web Development</h3>

                            <p>
                                Responsive and modern websites designed
                                around your business goals, customers and
                                brand identity.
                            </p>

                            <Link to="/servicesai">
                                Explore Web Solutions →
                            </Link>

                        </article>


                        <article className="about-ai-service-card">

                            <div className="about-ai-service-icon">
                                💻
                            </div>

                            <h3>Software Development</h3>

                            <p>
                                Custom business applications, dashboards,
                                APIs and software systems built for your
                                specific workflows.
                            </p>

                            <Link to="/servicesai">
                                Explore Software →
                            </Link>

                        </article>


                        <article className="about-ai-service-card">

                            <div className="about-ai-service-icon">
                                🤖
                            </div>

                            <h3>AI Development</h3>

                            <p>
                                AI-powered applications, chatbots,
                                automation and intelligent integrations
                                for modern businesses.
                            </p>

                            <Link to="/servicesai">
                                Explore AI Solutions →
                            </Link>

                        </article>

                    </div>

                </div>
            </section>


            {/* =====================================================
                MISSION
            ====================================================== */}
            <section className="about-ai-mission-section">

                <div className="about-ai-container">

                    <div className="about-ai-mission-grid">

                        <div className="about-ai-mission-number">
                            MISSION
                        </div>

                        <div className="about-ai-mission-content">

                            <span>OUR MISSION</span>

                            <h2>
                                Make Technology
                                <strong> Useful and Accessible</strong>
                            </h2>

                            <p>
                                Our mission is to help businesses use
                                technology to simplify operations, improve
                                customer experiences and create new
                                opportunities for growth.
                            </p>

                            <p>
                                We aim to deliver reliable, practical and
                                scalable digital solutions without making
                                technology unnecessarily complicated.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                VISION
            ====================================================== */}
            <section className="about-ai-vision-section">

                <div className="about-ai-container">

                    <div className="about-ai-vision-grid">

                        <div className="about-ai-vision-content">

                            <span>OUR VISION</span>

                            <h2>
                                Build a Smarter
                                <strong> Digital Future</strong>
                            </h2>

                            <p>
                                Our vision is to become a trusted technology
                                partner for businesses looking to adopt
                                modern software, AI and automation.
                            </p>

                            <p>
                                We want to help organizations move from
                                traditional processes toward smarter,
                                connected and technology-driven operations.
                            </p>

                        </div>

                        <div className="about-ai-vision-graphic">

                            <div className="about-ai-orbit orbit-one">
                                <span>AI</span>
                            </div>

                            <div className="about-ai-orbit orbit-two">
                                <span>WEB</span>
                            </div>

                            <div className="about-ai-orbit orbit-three">
                                <span>TECH</span>
                            </div>

                            <div className="about-ai-vision-center">
                                <span>LN</span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                TECHNOLOGY
            ====================================================== */}
            <section
                id="technology"
                className="about-ai-section about-ai-tech-section"
            >
                <div className="about-ai-container">

                    <div className="about-ai-section-heading">

                        <span>OUR TECHNOLOGY</span>

                        <h2>
                            Built With
                            <strong> Modern Technology</strong>
                        </h2>

                        <p>
                            We choose technologies based on project
                            requirements, scalability, performance and
                            long-term maintainability.
                        </p>

                    </div>


                    <div className="about-ai-tech-grid">

                        {technologyData.map((technology, index) => (
                            <article
                                className="about-ai-tech-card"
                                key={index}
                            >

                                <div className="about-ai-tech-icon">
                                    {technology.icon}
                                </div>

                                <h3>
                                    {technology.title}
                                </h3>

                                <p>
                                    {technology.description}
                                </p>

                            </article>
                        ))}

                    </div>

                </div>
            </section>


            {/* =====================================================
                WHY CHOOSE US
            ====================================================== */}
            <section className="about-ai-why-section">

                <div className="about-ai-container">

                    <div className="about-ai-section-heading">

                        <span>WHY CHOOSE US</span>

                        <h2>
                            A Practical Approach to
                            <strong> Technology</strong>
                        </h2>

                        <p>
                            Our development approach focuses on useful
                            solutions, clear communication and long-term
                            value.
                        </p>

                    </div>


                    <div className="about-ai-why-grid">

                        {whyChooseData.map((item, index) => (
                            <article
                                className="about-ai-why-card"
                                key={index}
                            >

                                <span className="about-ai-why-number">
                                    {item.number}
                                </span>

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.description}
                                </p>

                            </article>
                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================================
                CTA
            ====================================================== */}
            <section className="about-ai-final-cta">

                <div className="about-ai-container">

                    <div className="about-ai-final-content">

                        <span className="about-ai-badge">
                            LET'S BUILD SOMETHING
                        </span>

                        <h2>
                            Have an Idea?
                            <span> Let's Turn It Into Reality.</span>
                        </h2>

                        <p>
                            Whether you need a website, business software,
                            AI chatbot, automation or a custom digital
                            solution, let's discuss your requirements.
                        </p>

                        <div className="about-ai-final-buttons">

                            <Link
                                to="/contactai"
                                className="about-ai-main-button"
                            >
                                Start Your Project
                            </Link>

                            <Link
                                to="/servicesai"
                                className="about-ai-outline-button"
                            >
                                Explore Services
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

        </main>

        </>
    );
};

export default AboutAI;
