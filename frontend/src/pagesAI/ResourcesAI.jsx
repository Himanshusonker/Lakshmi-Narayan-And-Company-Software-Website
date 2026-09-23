import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../componentAI/SEOAI";
import { resourcesSEO } from "../DataAI/seoAIData";

const blogData = [
    {
        title: "How AI Helps Business",
        description:
            "Discover how artificial intelligence can improve business productivity, customer experience, automation and decision-making.",
        category: "AI for Business",
        path: "/blog/how-ai-helps-business",
    },
    {
        title: "AI Chatbot Guide",
        description:
            "Learn how AI chatbots work, how businesses use them and how you can integrate intelligent chat support into your website.",
        category: "AI Chatbots",
        path: "/blog/ai-chatbot-guide",
    },
];

const guideData = [
    {
        icon: "💼",
        title: "AI for Business",
        description:
            "Understand how AI can help businesses improve productivity, customer service, sales and decision-making.",
    },
    {
        icon: "⚙️",
        title: "AI Automation",
        description:
            "Explore how repetitive business processes can be automated using AI-powered workflows and intelligent systems.",
    },
    {
        icon: "🤖",
        title: "AI Chatbots",
        description:
            "Learn how AI chatbots can provide intelligent customer support, lead generation and 24/7 assistance.",
    },
    {
        icon: "🧠",
        title: "AI Development",
        description:
            "Explore AI development concepts including custom AI solutions, APIs, integrations and intelligent applications.",
    },
];

const caseStudies = [
    {
        title: "AI Business Automation",
        description:
            "How AI-powered automation can reduce repetitive tasks and improve business workflow efficiency.",
        tag: "Automation",
    },
    {
        title: "AI Customer Support",
        description:
            "How an AI chatbot can help businesses provide faster customer support and generate qualified leads.",
        tag: "AI Chatbot",
    },
    {
        title: "AI Software Integration",
        description:
            "How AI can be integrated with existing software systems to create smarter business applications.",
        tag: "Integration",
    },
];

const faqData = [
    {
        question: "What is AI development?",
        answer:
            "AI development is the process of building software applications that use artificial intelligence, machine learning, natural language processing or other intelligent technologies to perform tasks and solve business problems.",
    },
    {
        question: "How much does AI development cost?",
        answer:
            "The cost depends on the project requirements, complexity, integrations, AI models, features and development time. Simple AI integrations can cost less than a custom AI application.",
    },
    {
        question: "Can AI automate my business?",
        answer:
            "Yes. AI can automate many repetitive tasks such as customer support, lead qualification, document processing, content generation, data analysis and workflow management.",
    },
    {
        question: "Can you integrate AI with my existing software?",
        answer:
            "Yes. AI can often be integrated with existing websites, CRM systems, business software, databases and APIs depending on the system architecture and available integration options.",
    },
    {
        question: "How long does an AI project take?",
        answer:
            "Project duration depends on the scope. A small AI feature or API integration may take a few days or weeks, while a complete custom AI platform can require several weeks or months.",
    },
];

const ResourcesAI = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (

        <>
      
      <SEO {...resourcesSEO} />

        <main className="resources-ai-page">

            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="resources-ai-hero">
                <div className="resources-ai-hero-overlay"></div>

                <div className="resources-ai-container resources-ai-hero-content">
                    <span className="resources-ai-badge">
                        AI Resources
                    </span>

                    <h1>
                        Resources for
                        <span> Smarter AI Decisions</span>
                    </h1>

                    <p>
                        Explore AI guides, business insights, case studies,
                        chatbot resources and answers to common AI questions.
                    </p>

                    <div className="resources-ai-hero-buttons">
                        <a href="#blog" className="resources-ai-main-button">
                            Explore Resources
                        </a>

                        <Link
                            to="/contactai"
                            className="resources-ai-outline-button"
                        >
                            Talk to Our AI Team
                        </Link>
                    </div>
                </div>
            </section>

            {/* =====================================================
                RESOURCE NAVIGATION
            ====================================================== */}
            <section className="resources-ai-navigation">
                <div className="resources-ai-container">
                    <div className="resources-ai-nav-grid">

                        <a href="#blog" className="resources-ai-nav-card">
                            <span>📝</span>
                            <h3>Blog</h3>
                            <p>AI insights and business articles</p>
                        </a>

                        <a href="#guides" className="resources-ai-nav-card">
                            <span>📚</span>
                            <h3>AI Guides</h3>
                            <p>Practical guides for AI adoption</p>
                        </a>

                        <a href="#case-studies" className="resources-ai-nav-card">
                            <span>📊</span>
                            <h3>Case Studies</h3>
                            <p>Real-world AI use cases</p>
                        </a>

                        <a href="#faq" className="resources-ai-nav-card">
                            <span>❓</span>
                            <h3>FAQ</h3>
                            <p>Answers to common AI questions</p>
                        </a>

                    </div>
                </div>
            </section>

            {/* =====================================================
                BLOG
            ====================================================== */}
            <section
                id="blog"
                className="resources-ai-section resources-ai-blog-section"
            >
                <div className="resources-ai-container">

                    <div className="resources-ai-section-heading">
                        <span>OUR BLOG</span>

                        <h2>
                            Learn How AI Can
                            <strong> Transform Business</strong>
                        </h2>

                        <p>
                            Read practical AI articles designed to help
                            businesses understand and use artificial
                            intelligence effectively.
                        </p>
                    </div>

                    <div className="resources-ai-blog-grid">
                        {blogData.map((blog, index) => (
                            <article
                                className="resources-ai-blog-card"
                                key={index}
                            >
                                <div className="resources-ai-blog-image">
                                    <span>AI</span>
                                </div>

                                <div className="resources-ai-blog-content">

                                    <span className="resources-ai-blog-category">
                                        {blog.category}
                                    </span>

                                    <h3>{blog.title}</h3>

                                    <p>{blog.description}</p>

                                    <Link
                                        to={blog.path}
                                        className="resources-ai-read-more"
                                    >
                                        Read Article →
                                    </Link>

                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="resources-ai-center-button">
                        <Link
                            to="/blog"
                            className="resources-ai-secondary-button"
                        >
                            View All Blog Posts
                        </Link>
                    </div>

                </div>
            </section>

            {/* =====================================================
                AI GUIDES
            ====================================================== */}
            <section
                id="guides"
                className="resources-ai-section resources-ai-guides-section"
            >
                <div className="resources-ai-container">

                    <div className="resources-ai-section-heading">
                        <span>AI GUIDES</span>

                        <h2>
                            Practical Guides to
                            <strong> AI Technology</strong>
                        </h2>

                        <p>
                            Explore simple and practical resources to
                            understand AI and identify opportunities for
                            your business.
                        </p>
                    </div>

                    <div className="resources-ai-guides-grid">
                        {guideData.map((guide, index) => (
                            <article
                                className="resources-ai-guide-card"
                                key={index}
                            >
                                <div className="resources-ai-guide-icon">
                                    {guide.icon}
                                </div>

                                <h3>{guide.title}</h3>

                                <p>{guide.description}</p>

                                <Link
                                    to="/contactai"
                                    className="resources-ai-guide-link"
                                >
                                    Learn More →
                                </Link>
                            </article>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
                CASE STUDIES
            ====================================================== */}
            <section
                id="case-studies"
                className="resources-ai-section resources-ai-case-section"
            >
                <div className="resources-ai-container">

                    <div className="resources-ai-section-heading">
                        <span>CASE STUDIES</span>

                        <h2>
                            AI in
                            <strong> Real Business Scenarios</strong>
                        </h2>

                        <p>
                            Explore examples of how AI can be applied to
                            solve practical business challenges.
                        </p>
                    </div>

                    <div className="resources-ai-case-grid">
                        {caseStudies.map((item, index) => (
                            <article
                                className="resources-ai-case-card"
                                key={index}
                            >
                                <div className="resources-ai-case-number">
                                    0{index + 1}
                                </div>

                                <span className="resources-ai-case-tag">
                                    {item.tag}
                                </span>

                                <h3>{item.title}</h3>

                                <p>{item.description}</p>

                                <Link
                                    to="/contactai"
                                    className="resources-ai-case-link"
                                >
                                    Discuss Your Project →
                                </Link>
                            </article>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
                FAQ
            ====================================================== */}
            <section
                id="faq"
                className="resources-ai-section resources-ai-faq-section"
            >
                <div className="resources-ai-container">

                    <div className="resources-ai-section-heading">
                        <span>FAQ</span>

                        <h2>
                            Frequently Asked
                            <strong> AI Questions</strong>
                        </h2>

                        <p>
                            Find answers to common questions about AI
                            development, automation, integrations and
                            project timelines.
                        </p>
                    </div>

                    <div className="resources-ai-faq-list">

                        {faqData.map((faq, index) => (
                            <div
                                className={`resources-ai-faq-item ${
                                    openFAQ === index ? "active" : ""
                                }`}
                                key={index}
                            >
                                <button
                                    type="button"
                                    className="resources-ai-faq-question"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={openFAQ === index}
                                >
                                    <span>{faq.question}</span>

                                    <span className="resources-ai-faq-icon">
                                        {openFAQ === index ? "−" : "+"}
                                    </span>
                                </button>

                                {openFAQ === index && (
                                    <div className="resources-ai-faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* =====================================================
                FINAL CTA
            ====================================================== */}
            <section className="resources-ai-final-cta">
                <div className="resources-ai-container">

                    <div className="resources-ai-final-content">

                        <span className="resources-ai-badge">
                            BUILD WITH AI
                        </span>

                        <h2>
                            Ready to Turn AI Into
                            <span> Business Value?</span>
                        </h2>

                        <p>
                            Let's discuss your idea and explore how AI,
                            automation and intelligent software can help
                            your business grow.
                        </p>

                        <div className="resources-ai-final-buttons">

                            <Link
                                to="/contactai"
                                className="resources-ai-main-button"
                            >
                                Start Your AI Project
                            </Link>

                            <Link
                                to="/servicesai"
                                className="resources-ai-outline-button"
                            >
                                Explore AI Services
                            </Link>

                        </div>

                    </div>

                </div>
            </section>

        </main>

        </>
    );
};

export default ResourcesAI;



