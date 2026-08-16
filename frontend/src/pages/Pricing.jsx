import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const pricingPlans=[
  {
    name: "Starter",
    description: "For individuals and small businesses starting online.",
    price: "₹9,999",
    period: "Starting from",
    popular: false,

    features: [
      "Professional Business Website",
      "Up to 5 Pages",
      "Responsive Design",
      "Contact Form",
      "WhatsApp Integration",
      "Basic SEO Setup",
      "Social Media Links",
      "Basic Performance Optimization",
    ],
  },

  {
    name: "Business",
    description: "For growing businesses that need a stronger online presence.",
    price: "₹19,999",
    period: "Starting from",
    popular: true,

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
  },

  {
    name: "Professional",
    description: "For businesses requiring custom functionality and web applications.",
    price: "₹34,999",
    period: "Starting from",
    popular: false,

    features: [
      "Everything in Business",
      "Custom Web Application",
      "React Development",
      "Node.js / Express Backend",
      "Database Integration",
      "REST API Integration",
      "Authentication System",
      "Admin Dashboard",
      "Advanced Security",
    ],
  },

  {
    name: "Custom",
    description: "For complex software, e-commerce and enterprise requirements.",
    price: "Let's Talk",
    period: "Custom Project",
    popular: false,

    features: [
      "Custom Software Development",
      "E-Commerce Solutions",
      "Advanced Admin Panel",
      "Payment Gateway Integration",
      "Third-Party API Integration",
      "Cloud Deployment",
      "Advanced Database Architecture",
      "Security Implementation",
      "Dedicated Support",
    ],
  },
];

const comparisonData=[
  {
    feature: "Responsive Website",
    starter: true,
    business: true,
    professional: true,
    custom: true,
  },
  {
    feature: "SEO Setup",
    starter: "Basic",
    business: "Advanced",
    professional: "Advanced",
    custom: "Custom",
  },
  {
    feature: "Blog",
    starter: false,
    business: true,
    professional: true,
    custom: true,
  },
  {
    feature: "Admin Dashboard",
    starter: false,
    business: false,
    professional: true,
    custom: true,
  },
  {
    feature: "Database",
    starter: false,
    business: false,
    professional: true,
    custom: true,
  },
  {
    feature: "API Integration",
    starter: false,
    business: "Basic",
    professional: true,
    custom: true,
  },
  {
    feature: "E-Commerce",
    starter: false,
    business: false,
    professional: "Optional",
    custom: true,
  },
  {
    feature: "Custom Software",
    starter: false,
    business: false,
    professional: true,
    custom: true,
  },
];

function Pricing() {
  const [billing, setBilling] = useState("project");

  useEffect(()=>{
    document.title="Pricing | Lakshmi Narayan And Company";
  }, []);

  return (
                <div className="pricing-page">

                                            {/* HERO */}
                <section className="pricing-hero">

                    <div className="pricing-hero-overlay"></div>

                    <div className="pricing-hero-content">

                    <span>OUR PRICING</span>

                    <h1>
                        Simple Pricing.
                        <strong> Powerful Solutions.</strong>
                    </h1>

                    <p>
                        Flexible software development solutions designed for
                        startups, small businesses and growing organizations.
                    </p>

                    </div>

                </section>

                                            {/* PRICING */}

                <section className="pricing-section">

                    <div className="pricing-container">

                    <div className="pricing-heading">

                        <span>CHOOSE YOUR PLAN</span>

                        <h2>
                        Solutions For
                        <strong> Every Business.</strong>
                        </h2>

                        <p>
                        Our pricing is project-based and depends on your
                        exact requirements, features and complexity.
                        </p>

                    </div>

                                            {/* TOGGLE */}

                    <div className="pricing-toggle">

                        <button className={billing === "project" ? "active" : ""} onClick={() => setBilling("project")}>
                            Project Based
                        </button>

                        <button className={billing === "custom" ? "active" : ""} onClick={() => setBilling("custom")}>
                            Custom Solution
                        </button>

                    </div>

                                            {/* CARDS */}

                    <div className="pricing-grid">

                        {pricingPlans.map((plan) => (
                        <div className={`pricing-card ${plan.popular ? "popular" : ""}`} key={plan.name}>

                            {plan.popular && (
                            <div className="popular-badge">
                                MOST POPULAR
                            </div>
                            )}

                            <div className="pricing-card-top">

                            <h3>{plan.name}</h3>

                            <p>{plan.description}</p>

                            <div className="pricing-price">

                                <small>{plan.period}</small>

                                <strong>{plan.price}</strong>

                            </div>

                            </div>

                            <div className="pricing-divider"></div>

                            <ul>

                            {plan.features.map((feature, index) => (
                                <li key={index}>
                                <span>✓</span>
                                {feature}
                                </li>
                            ))}

                            </ul>

                            <Link to="/contact" className="pricing-btn" >
                                Get Started →
                            </Link>

                        </div>
                        ))}

                    </div>

                    </div>

                </section>

                                            {/* COMPARISON */}

                <section className="comparison-section">

                    <div className="pricing-container">

                    <div className="pricing-heading">

                        <span>COMPARE</span>

                        <h2>
                            Find The Right
                        <strong> Solution.</strong>
                        </h2>

                    </div>

                    <div className="comparison-wrapper">

                        <table className="comparison-table">

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

                            {comparisonData.map((row, index) => (
                            <tr key={index}>

                                <td>{row.feature}</td>
                                <td>{formatValue(row.starter)}</td>
                                <td>{formatValue(row.business)}</td>
                                <td>{formatValue(row.professional)}</td>
                                <td>{formatValue(row.custom)}</td>

                            </tr>
                            ))}

                        </tbody>

                        </table>

                    </div>

                    </div>

                </section>

                                                  {/* CTA */}

                <section className="pricing-cta">

                    <div>

                    <span>NEED SOMETHING CUSTOM?</span>

                    <h2>
                        Let's Discuss Your
                        <strong> Project.</strong>
                    </h2>

                    <p>
                        Every business is different. Tell us what you want
                        to build and we can discuss the right technology,
                        features and development approach.
                    </p>

                    <Link to="/contact">
                        Request a Quote →
                    </Link>

                    </div>

                </section>

                </div>
  );
}

function formatValue(value){
    if (value === true) {
      return <span className="check">✓</span>;
    }

    if (value === false) {
      return <span className="cross">—</span>;
    }

    return <span className="text-value">{value}</span>;
}
export default Pricing;