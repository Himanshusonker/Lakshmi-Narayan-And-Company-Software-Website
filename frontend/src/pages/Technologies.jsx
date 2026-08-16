import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const technologyGroups = [
  {
    title: "Frontend Development",
    icon: "⚛",
    description:
      "Modern, responsive and interactive user interfaces for web applications.",
    technologies: [
      {
        name: "React.js",
        short: "React",
        description:
          "Component-based JavaScript library for building modern user interfaces.",
      },
      {
        name: "JavaScript",
        short: "JS",
        description:
          "Core programming language used to create dynamic web experiences.",
      },
      {
        name: "HTML5",
        short: "HTML",
        description:
          "Semantic markup for creating structured and accessible web pages.",
      },
      {
        name: "CSS3",
        short: "CSS",
        description:
          "Modern styling, responsive layouts and visual interfaces.",
      },
      {
        name: "Bootstrap",
        short: "BS",
        description:
          "Responsive UI framework for developing mobile-friendly interfaces.",
      },
    ],
  },

  {
    title: "Backend Development",
    icon: "⚙",
    description:
      "Secure and scalable backend systems, APIs and business logic.",
    technologies: [
      {
        name: "Node.js",
        short: "Node",
        description:
          "JavaScript runtime for building scalable server-side applications.",
      },
      {
        name: "Express.js",
        short: "Express",
        description:
          "Backend framework for APIs, routes and server applications.",
      },
      {
        name: "REST API",
        short: "API",
        description:
          "Structured communication between frontend, backend and external services.",
      },
      {
        name: "JWT",
        short: "JWT",
        description:
          "Token-based authentication for web applications and APIs.",
      },
    ],
  },

  {
    title: "Database",
    icon: "◈",
    description:
      "Reliable database solutions for storing and managing application data.",
    technologies: [
      {
        name: "MongoDB",
        short: "MDB",
        description:
          "Flexible NoSQL database suitable for modern JavaScript applications.",
      },
      {
        name: "Mongoose",
        short: "M",
        description:
          "ODM library for structured MongoDB application development.",
      },
    ],
  },

  {
    title: "E-Commerce",
    icon: "🛒",
    description:
      "Technology solutions for modern online stores and digital commerce.",
    technologies: [
      {
        name: "Product Management",
        short: "PM",
        description:
          "Product catalog, categories, pricing and inventory functionality.",
      },
      {
        name: "Shopping Cart",
        short: "Cart",
        description:
          "Cart management and quantity handling for online stores.",
      },
      {
        name: "Payment Integration",
        short: "PAY",
        description:
          "Integration with supported online payment services.",
      },
      {
        name: "Order Management",
        short: "OMS",
        description:
          "Order processing, tracking and administration functionality.",
      },
    ],
  },

  {
    title: "Tools & Deployment",
    icon: "☁",
    description:
      "Development, version control and deployment technologies.",
    technologies: [
      {
        name: "Git",
        short: "Git",
        description:
          "Distributed version control for managing source code.",
      },
      {
        name: "GitHub",
        short: "GH",
        description:
          "Code hosting and collaborative software development platform.",
      },
      {
        name: "Nginx",
        short: "NG",
        description:
          "Web server and reverse proxy for production deployments.",
      },
      {
        name: "Linux",
        short: "Linux",
        description:
          "Server operating system used for application hosting and deployment.",
      },
      {
        name: "PM2",
        short: "PM2",
        description:
          "Process manager for running Node.js applications in production.",
      },
    ],
  },

  {
    title: "SEO & Web Performance",
    icon: "⌕",
    description:
      "Technologies and practices that help create search-friendly websites.",
    technologies: [
      {
        name: "Technical SEO",
        short: "SEO",
        description:
          "Website structure and technical optimization for search engines.",
      },
      {
        name: "Responsive Design",
        short: "RWD",
        description:
          "Layouts optimized for desktop, tablet and mobile devices.",
      },
      {
        name: "Performance Optimization",
        short: "WEB",
        description:
          "Techniques for improving loading speed and user experience.",
      },
    ],
  },
];

function Technologies() {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title= "Technologies | Lakshmi Narayan And Company";
  }, []);

  const visibleGroups= activeCategory === "All" ? technologyGroups : technologyGroups.filter((group) => group.title === activeCategory);

  return (
                <div className="technologies-page">

                                            {/* HERO */}

                <section className="technology-hero">

                    <div className="technology-overlay"></div>

                    <div className="technology-hero-content">

                    <span>OUR TECHNOLOGY STACK</span>

                    <h1>
                        Technology That
                        <strong> Builds Possibilities.</strong>
                    </h1>

                    <p>
                        We use modern technologies and development practices
                        to create scalable websites, web applications and
                        custom software solutions.
                    </p>

                    </div>

                </section>

                                                {/* INTRO */}

                <section className="technology-intro">

                    <div className="technology-container">

                    <div className="technology-heading">

                        <span>TECHNOLOGIES WE USE</span>

                        <h2>
                        Modern Stack.
                        <strong> Better Solutions.</strong>
                        </h2>

                        <p>
                        The technology stack for every project is selected
                        according to its requirements, scalability,
                        performance, security and maintenance needs.
                        </p>

                    </div>

                                                {/* FILTER */}

                    <div className="technology-filter">

                        <button className={activeCategory === "All" ? "active" : ""} onClick={() => setActiveCategory("All")}>
                            All
                        </button>

                        {technologyGroups.map((group) => (
                        <button key={group.title} className={activeCategory === group.title ? "active" : ""} onClick={() =>setActiveCategory(group.title)}>
                            {group.title}
                        </button>
                        ))}

                    </div>

                                                {/* GROUPS */}

                    <div className="technology-groups">

                        {visibleGroups.map((group) => (
                        <section className="technology-group" key={group.title}>

                            <div className="technology-group-heading">

                            <div className="technology-group-icon">
                                {group.icon}
                            </div>

                            <div>

                                <h3>{group.title}</h3>

                                <p>{group.description}</p>

                            </div>

                            </div>

                            <div className="technology-grid">

                            {group.technologies.map(
                                (technology) => (
                                <div className="technology-card" key={technology.name}>

                                    <div className="technology-logo">
                                        {technology.short}
                                    </div>

                                    <div>

                                    <h4>
                                        {technology.name}
                                    </h4>

                                    <p>
                                        {technology.description}
                                    </p>

                                    </div>

                                </div>
                                )
                            )}

                            </div>

                        </section>
                        ))}

                    </div>

                    </div>

                </section>

                                        {/* DEVELOPMENT PROCESS */}

                <section className="technology-process">

                    <div className="technology-container">

                    <div className="technology-heading light">

                        <span>
                            OUR APPROACH
                        </span>

                        <h2>
                            Technology With A
                        <strong>
                            Purpose.
                        </strong>
                        </h2>

                        <p>
                        We don't choose technologies simply because they
                        are popular. We choose the appropriate tools for
                        the project's requirements.
                        </p>

                    </div>

                    <div className="process-grid">

                        <div className="process-card">
                        <span>01</span>
                        <h3>Understand</h3>
                        <p>
                            Understand business requirements, users and
                            project objectives.
                        </p>
                        </div>

                        <div className="process-card">
                        <span>02</span>
                        <h3>Architect</h3>
                        <p>
                            Design an appropriate application and database
                            architecture.
                        </p>
                        </div>

                        <div className="process-card">
                        <span>03</span>
                        <h3>Develop</h3>
                        <p>
                            Build the solution using suitable modern
                            technologies.
                        </p>
                        </div>

                        <div className="process-card">
                        <span>04</span>
                        <h3>Deploy</h3>
                        <p>
                            Test, optimize and deploy the application for
                            production.
                        </p>
                        </div>

                    </div>

                    </div>

                </section>

                                                {/* CTA */}

                <section className="technology-cta">

                    <div>

                    <span>READY TO BUILD?</span>

                    <h2>
                        Let's Turn Your
                        <strong> Idea Into Reality.</strong>
                    </h2>

                    <p>
                        Tell us about your project and we'll help you
                        choose the right technology and development approach.
                    </p>

                    <Link to="/contact">
                        Start Your Project →
                    </Link>

                    </div>

                </section>

                </div>
  );
}
export default Technologies;