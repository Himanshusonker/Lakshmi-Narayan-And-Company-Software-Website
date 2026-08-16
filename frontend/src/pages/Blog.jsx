import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const blogPosts=[
  {
    id: 1,
    slug: "professional-website-2026",
    category: "Web Development",
    date: "August 10, 2026",
    readTime: "6 min read",
    title: "Why Every Business Needs a Professional Website in 2026",
    excerpt:
      "A professional website helps businesses build trust, generate leads and establish a strong digital presence in today's competitive market.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    slug: "react-nodejs-modern-web-applications",
    category: "Technology",
    date: "August 7, 2026",
    readTime: "7 min read",
    title: "React and Node.js: A Powerful Combination for Modern Web Applications",
    excerpt:
      "Discover how React and Node.js can be combined to build fast, scalable and modern web applications for businesses and startups.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    slug: "seo-small-business",
    category: "SEO",
    date: "August 4, 2026",
    readTime: "5 min read",
    title: "How SEO Helps Small Businesses Get More Customers",
    excerpt:
      "Learn the fundamentals of SEO and how an optimized website can help your business become more visible on search engines.",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    slug: "choose-right-website-development-company",
    category: "Business",
    date: "August 1, 2026",
    readTime: "6 min read",
    title: "How to Choose the Right Website Development Company",
    excerpt:
      "Before hiring a software development company, understand the important factors you should consider including technology, support, security and scalability.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    slug: "essential-features-modern-ecommerce-website",
    category: "E-Commerce",
    date: "July 28, 2026",
    readTime: "8 min read",
    title: "Essential Features of a Modern E-Commerce Website",
    excerpt:
      "From secure payments to product management and responsive design, explore the features every successful e-commerce website should have.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    slug: "why-website-security-should-be-business-priority",
    category: "Cyber Security",
    date: "July 25, 2026",
    readTime: "7 min read",
    title: "Why Website Security Should Be a Business Priority",
    excerpt:
      "Website security protects customer information, business data and your online reputation. Learn the basic security practices businesses should follow.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
  },
];

const categories=[
  "All",
  "Web Development",
  "Technology",
  "SEO",
  "Business",
  "E-Commerce",
  "Cyber Security",
];

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(()=>{
    document.title="Blog | Lakshmi Narayan And Company - Software Development";
  }, []);

  const filteredPosts=blogPosts.filter((post)=>{
    const categoryMatch=selectedCategory === "All" || post.category === selectedCategory;

    const searchMatch=post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
                    <div className="blog-page">

                                          {/* Hero Section */}
                    <section className="blog-hero">
                        <div className="blog-hero-overlay"></div>

                        <div className="blog-hero-content">
                        <span className="blog-small-title">OUR BLOG</span>

                        <h1>
                            Insights, Ideas &{" "}
                            <span>Technology</span>
                        </h1>

                        <p>
                            Explore our latest insights on software development, web
                            technologies, SEO, e-commerce and digital business growth.
                        </p>
                        </div>
                    </section>

                                            {/* Blog Intro */}

                    <section className="blog-intro">
                        <div className="blog-container">

                        <div className="section-heading">
                            <span>KNOWLEDGE HUB</span>

                            <h2>
                            Learn. Build. <strong>Grow.</strong>
                            </h2>

                            <p>
                            Stay updated with practical technology insights and digital
                            solutions from Lakshmi Narayan And Company.
                            </p>
                        </div>

                                            {/* Search */}

                        <div className="blog-search-wrapper">
                            <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)}/>

                            <span>⌕</span>
                        </div>

                                            {/* Categories */}

                        <div className="blog-categories">

                            {categories.map((category)=>(
                            <button key={category} className={selectedCategory === category ? "active" : ""} onClick={() => setSelectedCategory(category)}>
                                {category}
                            </button>
                            ))}

                        </div>

                                            {/* Blog Cards */}

                        <div className="blog-grid">

                            {filteredPosts.length > 0 ? (
                            filteredPosts.map((post)=>(
                                <article className="blog-card" key={post.id}>

                                <div className="blog-image">
                                    <img src={post.image} alt={post.title} />

                                    <span className="blog-category">
                                    {post.category}
                                    </span>
                                </div>

                                <div className="blog-content">

                                    <div className="blog-meta">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                    </div>

                                    <h3>{post.title}</h3>

                                    <p>{post.excerpt}</p>

                                    <Link to={`/blog/${post.slug}`} className="read-more-btn">
                                        Read Article
                                        <span>→</span>
                                    </Link>

                                </div>
                                </article>
                            ))
                            ) : (
                            <div className="no-blog-result">
                                <h3>No articles found</h3>
                                <p>
                                Try searching with another keyword or select a
                                different category.
                                </p>
                            </div>
                            )}

                        </div>
                        </div>
                    </section>

                                            {/* CTA */}

                    <section className="blog-cta">
                        <div className="blog-cta-content">

                        <span>HAVE A PROJECT IN MIND?</span>

                        <h2>
                            Let's Build Something
                            <br />
                            <strong>Great Together.</strong>
                        </h2>

                        <p>
                            Have an idea for a website, web application or custom
                            software solution? Let's discuss your project.
                        </p>

                        <a href="/contact" className="blog-cta-btn">
                            Start a Conversation →
                        </a>

                        </div>
                    </section>

                    </div>
  );
}
export default Blog;