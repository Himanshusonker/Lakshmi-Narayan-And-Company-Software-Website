import React from "react";
import { Link } from "react-router-dom";

const SEO=()=>{
  return (
                <div className="seo-page">

                                        {/* Hero Section */}

                <section className="seo-hero">
                    <div className="seo-hero-overlay"></div>

                    <div className="seo-hero-content">
                    <span className="seo-badge">SEO SERVICES</span>

                    <h1>
                        Search Engine Optimization
                        <span> That Helps Your Business Grow</span>
                    </h1>

                    <p>
                        Improve your online visibility, attract qualified visitors and
                        build a stronger digital presence with result-focused SEO
                        strategies from Lakshmi Narayan And Company.
                    </p>

                    <div className="seo-hero-buttons">
                        <Link to="/contact" className="seo-primary-btn">
                        Get SEO Consultation
                        </Link>

                        <Link to="/services" className="seo-secondary-btn">
                        Explore Services
                        </Link>
                    </div>
                    </div>
                </section>

                                        {/* Introduction */}

                <section className="seo-intro">
                    <div className="seo-container">

                    <div className="seo-section-heading">
                        <span>WHY SEO MATTERS</span>

                        <h2>
                            Get Found by the Right
                        <strong> Customers</strong>
                        </h2>

                        <p>
                            Having a website is only the first step. Your potential
                            customers need to find your business when they search online.
                            Our SEO approach focuses on improving the technical health,
                            content quality and search visibility of your website.
                        </p>
                    </div>

                    <div className="seo-feature-grid">

                        <div className="seo-feature-card">
                        <div className="seo-icon">🔍</div>
                        <h3>Better Search Visibility</h3>
                        <p>
                            Improve your website's visibility for relevant search queries
                            and business-related keywords.
                        </p>
                        </div>

                        <div className="seo-feature-card">
                        <div className="seo-icon">📈</div>
                        <h3>Organic Traffic</h3>
                        <p>
                            Build sustainable organic traffic by creating useful,
                            relevant and search-friendly website content.
                        </p>
                        </div>

                        <div className="seo-feature-card">
                        <div className="seo-icon">🎯</div>
                        <h3>Targeted Visitors</h3>
                        <p>
                            Focus on search terms that are relevant to your products,
                            services and target customers.
                        </p>
                        </div>

                        <div className="seo-feature-card">
                        <div className="seo-icon">🚀</div>
                        <h3>Long-Term Growth</h3>
                        <p>
                            Build a strong online foundation that can support your
                            business as your digital presence grows.
                        </p>
                        </div>

                    </div>
                    </div>
                </section>

                                    {/* SEO Services */}

                <section className="seo-services">
                    <div className="seo-container">

                    <div className="seo-section-heading center">
                        <span>OUR SEO APPROACH</span>

                        <h2>
                        Complete SEO Solutions for
                        <strong> Modern Websites</strong>
                        </h2>

                        <p>
                            We focus on the major areas that contribute to a technically
                            strong and search-friendly website.
                        </p>
                    </div>

                    <div className="seo-services-grid">

                        <div className="seo-service-card">
                        <span>01</span>
                        <h3>Technical SEO</h3>
                        <p>
                            Improve website structure, page performance, mobile
                            responsiveness, crawlability and technical configuration.
                        </p>
                        </div>

                        <div className="seo-service-card">
                        <span>02</span>
                        <h3>On-Page SEO</h3>
                        <p>
                            Optimize titles, headings, content structure, URLs,
                            descriptions and internal linking.
                        </p>
                        </div>

                        <div className="seo-service-card">
                        <span>03</span>
                        <h3>Keyword Research</h3>
                        <p>
                            Identify relevant search terms that match your products,
                            services and customer search intent.
                        </p>
                        </div>

                        <div className="seo-service-card">
                        <span>04</span>
                        <h3>Content Optimization</h3>
                        <p>
                            Improve website content so it provides useful information
                            while remaining relevant to search engines and users.
                        </p>
                        </div>

                        <div className="seo-service-card">
                        <span>05</span>
                        <h3>Local SEO</h3>
                        <p>
                            Improve your local online presence and help customers
                            discover your business in relevant geographic areas.
                        </p>
                        </div>

                        <div className="seo-service-card">
                        <span>06</span>
                        <h3>SEO Audit</h3>
                        <p>
                            Analyze important technical and content elements to identify
                            opportunities for improvement.
                        </p>
                        </div>

                    </div>
                    </div>
                </section>

                                    {/* Process */}
                <section className="seo-process">
                    <div className="seo-container">

                    <div className="seo-section-heading center">
                        <span>OUR PROCESS</span>

                        <h2>
                            A Structured Approach to
                        <strong> SEO Growth</strong>
                        </h2>
                    </div>

                    <div className="seo-process-grid">

                        <div className="seo-process-card">
                        <div>01</div>
                        <h3>Website Audit</h3>
                        <p>
                            Analyze your existing website and identify technical,
                            content and SEO opportunities.
                        </p>
                        </div>

                        <div className="seo-process-card">
                        <div>02</div>
                        <h3>Strategy</h3>
                        <p>
                            Create an SEO strategy based on your business objectives,
                            audience and search intent.
                        </p>
                        </div>

                        <div className="seo-process-card">
                        <div>03</div>
                        <h3>Optimization</h3>
                        <p>
                            Implement technical, on-page and content improvements
                            across the website.
                        </p>
                        </div>

                        <div className="seo-process-card">
                        <div>04</div>
                        <h3>Monitoring</h3>
                        <p>
                            Monitor important SEO indicators and continuously identify
                            opportunities for improvement.
                        </p>
                        </div>

                    </div>
                    </div>
                </section>

                                        {/* CTA */}
                <section className="seo-cta">
                    <div className="seo-container">

                    <h2>
                        Ready to Improve Your
                        <span> Online Visibility?</span>
                    </h2>

                    <p>
                        Let's discuss your website and create an SEO strategy aligned
                        with your business goals.
                    </p>

                    <Link to="/contact" className="seo-cta-btn">
                        Talk to Our Team
                    </Link>

                    </div>
                </section>

                </div>
  );
};

export default SEO;