import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../componentAI/SEOAI";
import { pricingSEO } from "../DataAI/seoAIData";



/* =========================================================
   AI WEBSITE PRICING
========================================================= */

const aiPricingPlans = [
    {
        name: "Starter",
        price: "₹19,999",
        subtitle: "For businesses starting with AI and automation.",
        features: [
            "AI Consultation",
            "Basic AI Integration",
            "AI Chatbot Setup",
            "Basic API Integration",
            "Responsive Interface",
        ],
        popular: false,
    },
    {
        name: "Business",
        price: "₹39,999",
        subtitle:
            "For businesses that need practical AI automation and integrations.",
        features: [
            "AI Chatbot",
            "Business Automation",
            "API Integration",
            "Custom UI",
            "Database Integration",
            "Basic Admin Panel",
        ],
        popular: true,
    },
    {
        name: "Professional",
        price: "₹69,999",
        subtitle:
            "For advanced AI-powered applications and business systems.",
        features: [
            "Custom AI Application",
            "Advanced AI Integration",
            "Web Application",
            "Backend Development",
            "Database Architecture",
            "Authentication",
            "Admin Dashboard",
        ],
        popular: false,
    },
    {
        name: "Custom AI",
        price: "Let's Talk",
        subtitle:
            "For complex AI, automation and enterprise requirements.",
        features: [
            "Custom AI Solutions",
            "Advanced Automation",
            "AI API Integration",
            "Enterprise Software",
            "Cloud Deployment",
            "Advanced Database Architecture",
            "Dedicated Support",
        ],
        popular: false,
    },
];

/* =========================================================
   WEB DEVELOPMENT PRICING
========================================================= */

const webPricingPlans = [
    {
        name: "Starter",
        price: "₹9,999",
        subtitle: "For small businesses that need a professional website.",
        features: [
            "Professional Business Website",
            "Up to 5 Pages",
            "Responsive Design",
            "Contact Form",
            "WhatsApp Integration",
            "Basic SEO",
            "Social Media Links",
            "Basic Performance Optimization",
        ],
        popular: false,
    },
    {
        name: "Business",
        price: "₹19,999",
        subtitle:
            "For growing businesses that need a stronger online presence.",
        features: [
            "Everything in Starter",
            "Up to 10 Pages",
            "Custom UI Design",
            "Advanced Contact Forms",
            "Google Maps Integration",
            "On-Page SEO",
            "Blog Integration",
            "Analytics Integration",
            "Performance Optimization",
        ],
        popular: true,
    },
    {
        name: "Professional",
        price: "₹34,999",
        subtitle:
            "For businesses requiring custom web applications and systems.",
        features: [
            "Everything in Business",
            "Custom Web Application",
            "React Development",
            "Node.js / Express Backend",
            "Database Integration",
            "REST API Development",
            "Authentication System",
            "Admin Dashboard",
            "Advanced Security",
        ],
        popular: false,
    },
    {
        name: "Custom",
        price: "Let's Talk",
        subtitle:
            "For advanced software, e-commerce and enterprise requirements.",
        features: [
            "Custom Software Development",
            "E-Commerce Development",
            "Advanced Admin Panel",
            "Payment Gateway Integration",
            "Third-Party API Integration",
            "Cloud Deployment",
            "Database Architecture",
            "Advanced Security",
            "Dedicated Support",
        ],
        popular: false,
    },
];

/* =========================================================
   COMPARISON DATA
========================================================= */

const aiComparisonData = [
    {
        feature: "AI Consultation",
        starter: "✓",
        business: "✓",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "AI Chatbot",
        starter: "Basic",
        business: "✓",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "AI Integration",
        starter: "Basic",
        business: "Advanced",
        professional: "Advanced",
        custom: "Custom",
    },
    {
        feature: "Business Automation",
        starter: "—",
        business: "✓",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "API Integration",
        starter: "Basic",
        business: "✓",
        professional: "✓",
        custom: "Advanced",
    },
    {
        feature: "Custom UI",
        starter: "—",
        business: "✓",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "Database",
        starter: "—",
        business: "✓",
        professional: "Advanced",
        custom: "Enterprise",
    },
    {
        feature: "Web Application",
        starter: "—",
        business: "—",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "Authentication",
        starter: "—",
        business: "—",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "Admin Dashboard",
        starter: "—",
        business: "Basic",
        professional: "✓",
        custom: "Advanced",
    },
    {
        feature: "Cloud Deployment",
        starter: "—",
        business: "—",
        professional: "Optional",
        custom: "✓",
    },
    {
        feature: "Dedicated Support",
        starter: "Basic",
        business: "✓",
        professional: "✓",
        custom: "✓",
    },
];

const webComparisonData = [
    {
        feature: "Business Website",
        starter: "✓",
        business: "✓",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "Pages",
        starter: "Up to 5",
        business: "Up to 10",
        professional: "Custom",
        custom: "Custom",
    },
    {
        feature: "Responsive Design",
        starter: "✓",
        business: "✓",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "Custom UI",
        starter: "Basic",
        business: "✓",
        professional: "✓",
        custom: "Advanced",
    },
    {
        feature: "Contact Forms",
        starter: "Basic",
        business: "Advanced",
        professional: "Custom",
        custom: "Custom",
    },
    {
        feature: "SEO",
        starter: "Basic",
        business: "On-Page",
        professional: "Advanced",
        custom: "Advanced",
    },
    {
        feature: "Blog",
        starter: "—",
        business: "✓",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "Analytics",
        starter: "—",
        business: "✓",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "React",
        starter: "—",
        business: "Optional",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "Backend",
        starter: "—",
        business: "Optional",
        professional: "Node.js / Express",
        custom: "Custom",
    },
    {
        feature: "Database",
        starter: "—",
        business: "Optional",
        professional: "✓",
        custom: "Advanced",
    },
    {
        feature: "REST API",
        starter: "—",
        business: "—",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "Authentication",
        starter: "—",
        business: "—",
        professional: "✓",
        custom: "✓",
    },
    {
        feature: "Admin Dashboard",
        starter: "—",
        business: "—",
        professional: "✓",
        custom: "Advanced",
    },
    {
        feature: "Payment Gateway",
        starter: "—",
        business: "—",
        professional: "Optional",
        custom: "✓",
    },
    {
        feature: "Cloud Deployment",
        starter: "—",
        business: "—",
        professional: "Optional",
        custom: "✓",
    },
];

/* =========================================================
   DIFFERENCE DATA
========================================================= */

const differenceData = [
    {
        title: "AI Website",
        icon: "🤖",
        description:
            "AI websites are designed around artificial intelligence, automation and intelligent user experiences.",
        points: [
            "AI Chatbot",
            "AI API Integration",
            "Business Automation",
            "Custom AI Applications",
            "AI-powered User Experience",
            "Intelligent Data Processing",
        ],
    },
    {
        title: "Web Development",
        icon: "💻",
        description:
            "Web development focuses on building professional websites, web applications and business management systems.",
        points: [
            "Business Website",
            "Custom Web Application",
            "React Development",
            "Node.js / Express",
            "Database Integration",
            "Admin Dashboard",
        ],
    },
];

/* =========================================================
   FAQ
========================================================= */

const faqData = [
    {
        question: "What is the difference between AI Website and Web Development?",
        answer:
            "AI Website development focuses on AI, automation, chatbots and intelligent integrations. Web Development focuses primarily on websites, web applications, backend systems and business software.",
    },
    {
        question: "Can I add AI to an existing website?",
        answer:
            "Yes. AI chatbots, AI APIs, automation systems and other AI features can be integrated into an existing website depending on its technology and architecture.",
    },
    {
        question: "Can you build a custom AI application?",
        answer:
            "Yes. Professional and Custom AI solutions can include custom AI applications, API integrations, backend systems, databases, authentication and admin dashboards.",
    },
    {
        question: "Can you develop an AI chatbot for my business?",
        answer:
            "Yes. AI chatbot development and integration is available in the AI Website packages, with more advanced chatbot and automation requirements handled through custom solutions.",
    },
    {
        question: "Are these fixed prices?",
        answer:
            "The displayed prices are starting prices. Final pricing depends on project scope, integrations, number of features, APIs, database requirements, deployment and customization.",
    },
    {
        question: "Can I request a custom package?",
        answer:
            "Yes. Custom AI and Custom Web Development solutions can be designed according to your business requirements.",
    },
];

/* =========================================================
   PRICING CARD
========================================================= */

const PricingCard = ({ plan }) => {
    return (
        <div
            className={`pricing-ai-card ${
                plan.popular ? "pricing-ai-card-popular" : ""
            }`}
        >
            {plan.popular && (
                <div className="pricing-ai-popular-badge">
                    Popular
                </div>
            )}

            <div className="pricing-ai-card-header">
                <h3>{plan.name}</h3>

                <div className="pricing-ai-price">
                    {plan.price !== "Let's Talk" && (
                        <span className="pricing-ai-from">From</span>
                    )}

                    <strong>{plan.price}</strong>
                </div>

                <p>{plan.subtitle}</p>
            </div>

            <div className="pricing-ai-features">
                {plan.features.map((feature, index) => (
                    <div className="pricing-ai-feature" key={index}>
                        <span className="pricing-ai-check">✓</span>
                        <span>{feature}</span>
                    </div>
                ))}
            </div>

            <Link
                to="/contactai"
                className="pricing-ai-button"
            >
                Get Started
            </Link>
        </div>
    );
};

/* =========================================================
   COMPARISON TABLE
========================================================= */

const ComparisonTable = ({ data }) => {
    return (
        <div className="pricing-ai-table-wrapper">
            <table className="pricing-ai-table">
                <thead>
                    <tr>
                        <th>Features</th>
                        <th>Starter</th>
                        <th>Business</th>
                        <th>Professional</th>
                        <th>Custom</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.feature}</td>
                            <td>{item.starter}</td>
                            <td>{item.business}</td>
                            <td>{item.professional}</td>
                            <td>{item.custom}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const PricingAI = () => {
    const [activePricing, setActivePricing] = useState("ai");

    const isAI = activePricing === "ai";

    const activePlans = isAI
        ? aiPricingPlans
        : webPricingPlans;

    return (

        <>
        
        <SEO {...pricingSEO} />        

        <main className="pricing-ai-page">


            {/* =================================================
                HERO
            ================================================= */}

            <section
                className="pricing-ai-hero"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(4, 15, 38, 0.78),
                            rgba(4, 15, 38, 0.78)
                        ),
                        url("https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2000&q=85")
                    `,
                }}
            >
                <div className="pricing-ai-container">

                    <div className="pricing-ai-badge">
                        AI Website Pricing
                    </div>

                    <h1>
                        Pricing That Fits Your{" "}
                        <span>Business</span>
                    </h1>

                    <p>
                        Choose the right solution for your business.
                        From AI-powered websites and automation to
                        professional web development and custom software.
                    </p>

                </div>
            </section>



            {/* =================================================
                PRICING SWITCH
            ================================================= */}

            <section className="pricing-ai-selector-section">
                <div className="pricing-ai-container">

                    <div className="pricing-ai-selector">

                        <button
                            type="button"
                            className={
                                isAI
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setActivePricing("ai")
                            }
                        >
                            🤖 AI Website Pricing
                        </button>

                        <button
                            type="button"
                            className={
                                !isAI
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setActivePricing("web")
                            }
                        >
                            💻 Web Development Pricing
                        </button>

                    </div>

                </div>
            </section>

            {/* =================================================
                ACTIVE PRICING
            ================================================= */}

            <section className="pricing-ai-plans-section">
                <div className="pricing-ai-container">

                    <div className="pricing-ai-section-heading">

                        <span className="pricing-ai-small-title">
                            {isAI
                                ? "AI PRICING"
                                : "WEB DEVELOPMENT PRICING"}
                        </span>

                        <h2>
                            {isAI
                                ? "AI Solutions For Different Business Needs"
                                : "Web Development Plans For Every Business"}
                        </h2>

                        <p>
                            {isAI
                                ? "Lakshmi Narayan And Company offers flexible AI development packages for businesses starting with AI as well as organizations requiring advanced custom AI solutions."
                                : "Professional website and web application development packages designed for startups, growing businesses and organizations."}
                        </p>

                    </div>

                    <div className="pricing-ai-grid">
                        {activePlans.map((plan, index) => (
                            <PricingCard
                                key={index}
                                plan={plan}
                            />
                        ))}
                    </div>

                </div>
            </section>

            {/* =================================================
                COMPARISON
            ================================================= */}

            <section className="pricing-ai-comparison-section">
                <div className="pricing-ai-container">

                    <div className="pricing-ai-section-heading">

                        <span className="pricing-ai-small-title">
                            PLAN COMPARISON
                        </span>

                        <h2>
                            Compare{" "}
                            {isAI
                                ? "AI Website Plans"
                                : "Web Development Plans"}
                        </h2>

                        <p>
                            See what is included in each package before
                            choosing your solution.
                        </p>

                    </div>

                    <ComparisonTable
                        data={
                            isAI
                                ? aiComparisonData
                                : webComparisonData
                        }
                    />

                </div>
            </section>

            {/* =================================================
                AI VS WEB DEVELOPMENT
            ================================================= */}

            <section className="pricing-ai-difference-section">

                <div className="pricing-ai-container">

                    <div className="pricing-ai-section-heading">

                        <span className="pricing-ai-small-title">
                            CHOOSE THE RIGHT SOLUTION
                        </span>

                        <h2>
                            AI Website vs Web Development
                        </h2>

                        <p>
                            Understand which type of development is
                            suitable for your business requirements.
                        </p>

                    </div>

                    <div className="pricing-ai-difference-grid">

                        {differenceData.map(
                            (item, index) => (
                                <div
                                    className="pricing-ai-difference-card"
                                    key={index}
                                >
                                    <div className="pricing-ai-difference-icon">
                                        {item.icon}
                                    </div>

                                    <h3>{item.title}</h3>

                                    <p>
                                        {item.description}
                                    </p>

                                    <ul>
                                        {item.points.map(
                                            (point, pointIndex) => (
                                                <li
                                                    key={
                                                        pointIndex
                                                    }
                                                >
                                                    <span>✓</span>
                                                    {point}
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    <Link
                                        to="/contactai"
                                        className="pricing-ai-difference-button"
                                    >
                                        Discuss Your Project
                                    </Link>
                                </div>
                            )
                        )}

                    </div>

                </div>

            </section>

            {/* =================================================
                CUSTOM AI CTA
            ================================================= */}

            <section className="pricing-ai-custom-section">

                <div className="pricing-ai-container">

                    <div className="pricing-ai-custom-box">

                        <div className="pricing-ai-custom-content">

                            <span className="pricing-ai-small-title">
                                CUSTOM SOLUTIONS
                            </span>

                            <h2>
                                Need a Custom AI Solution?
                            </h2>

                            <p>
                                If your business requires advanced
                                AI automation, enterprise software,
                                custom AI applications, multiple API
                                integrations or cloud deployment,
                                we can build a solution around your
                                exact requirements.
                            </p>

                            <div className="pricing-ai-custom-points">

                                <span>
                                    ✓ Custom AI Development
                                </span>

                                <span>
                                    ✓ Advanced Automation
                                </span>

                                <span>
                                    ✓ Enterprise Applications
                                </span>

                                <span>
                                    ✓ Cloud Deployment
                                </span>

                            </div>

                            <Link
                                to="/contactai"
                                className="pricing-ai-main-button"
                            >
                                Let's Talk
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            {/* =================================================
                FAQ
            ================================================= */}

            <section className="pricing-ai-faq-section">

                <div className="pricing-ai-container">

                    <div className="pricing-ai-section-heading">

                        <span className="pricing-ai-small-title">
                            FAQ
                        </span>

                        <h2>
                            Frequently Asked Questions
                        </h2>

                        <p>
                            Everything you need to know about our
                            AI and web development pricing.
                        </p>

                    </div>

                    <div className="pricing-ai-faq-grid">

                        {faqData.map(
                            (faq, index) => (
                                <details
                                    className="pricing-ai-faq-item"
                                    key={index}
                                >
                                    <summary>
                                        <span>
                                            {faq.question}
                                        </span>

                                        <span className="pricing-ai-faq-icon">
                                            +
                                        </span>
                                    </summary>

                                    <p>
                                        {faq.answer}
                                    </p>
                                </details>
                            )
                        )}

                    </div>

                </div>

            </section>

            {/* =================================================
                FINAL CTA
            ================================================= */}

            <section className="pricing-ai-final-cta">

                <div className="pricing-ai-container">

                    <h2>
                        Ready To Build Your Next Project?
                    </h2>

                    <p>
                        Whether you need an AI-powered website,
                        business website, web application or
                        custom software, let's discuss your
                        requirements.
                    </p>

                    <div className="pricing-ai-final-buttons">

                        <Link
                            to="/contactai"
                            className="pricing-ai-main-button"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/servicesai"
                            className="pricing-ai-outline-button"
                        >
                            Explore Services
                        </Link>

                    </div>

                </div>

            </section>

        </main>

        </>
    );
};

export default PricingAI;

