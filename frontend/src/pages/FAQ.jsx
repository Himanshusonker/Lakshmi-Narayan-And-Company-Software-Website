import React, { useEffect, useState } from "react";


const faqData=[
  {
    category: "General",
    question: "What does Lakshmi Narayan And Company do?",
    answer:
      "Lakshmi Narayan And Company provides software development and digital solutions for businesses, startups and organizations. Our services include website development, web applications, e-commerce solutions, custom software, UI development, SEO and technology solutions.",
  },
  {
    category: "General",
    question: "Do you work with startups and small businesses?",
    answer:
      "Yes. We work with startups, small businesses and established organizations. We can build solutions according to your business requirements, budget and future growth plans.",
  },
  {
    category: "Web Development",
    question: "What type of websites do you develop?",
    answer:
      "We develop business websites, corporate websites, portfolio websites, service websites, landing pages, e-commerce websites and custom web applications.",
  },
  {
    category: "Web Development",
    question: "Can you develop a custom website according to our requirements?",
    answer:
      "Yes. We can develop a custom website based on your business requirements, branding, features, target audience and future scalability needs.",
  },
  {
    category: "Web Development",
    question: "Do you create responsive websites?",
    answer:
      "Yes. Our websites are designed to work across desktop, laptop, tablet and mobile devices with a responsive user interface.",
  },
  {
    category: "Technology",
    question: "Which technologies do you use?",
    answer:
      "Depending on the project requirements, we work with modern technologies such as React, JavaScript, HTML, CSS, Node.js, Express.js, MongoDB, REST APIs and other tools required to build scalable web solutions.",
  },
  {
    category: "Technology",
    question: "Can you integrate APIs and third-party services?",
    answer:
      "Yes. We can integrate APIs and third-party services such as payment gateways, messaging services, authentication systems, maps, cloud services and other business APIs.",
  },
  {
    category: "E-Commerce",
    question: "Can you develop an e-commerce website?",
    answer:
      "Yes. We can develop e-commerce solutions with product management, shopping cart, user accounts, order management, payment integration and other features required by your business.",
  },
  {
    category: "E-Commerce",
    question: "Can payment gateways be integrated into an e-commerce website?",
    answer:
      "Yes. Payment gateway integration can be implemented according to the selected payment provider and project requirements.",
  },
  {
    category: "SEO",
    question: "Do you provide SEO services?",
    answer:
      "Yes. We can implement technical and on-page SEO practices including page titles, meta descriptions, structured content, responsive design, performance improvements and search-engine-friendly website architecture.",
  },
  {
    category: "SEO",
    question: "Will my website appear on Google immediately after development?",
    answer:
      "Website development and Google ranking are different processes. A properly optimized website provides a strong technical foundation, but search rankings depend on many factors including content quality, competition, authority and ongoing SEO efforts.",
  },
  {
    category: "Security",
    question: "How do you protect websites and web applications?",
    answer:
      "Security requirements depend on the project. Common practices include HTTPS, secure authentication, input validation, protected API endpoints, environment variables for sensitive credentials, access controls and regular dependency updates.",
  },
  {
    category: "Security",
    question: "Do you provide website maintenance and updates?",
    answer:
      "Yes. Maintenance requirements can be discussed based on the project. Support may include bug fixes, content or feature updates, dependency updates, security improvements and technical assistance.",
  },
  {
    category: "Pricing",
    question: "How much does a website cost?",
    answer:
      "The cost depends on the type of website, number of pages, design requirements, functionality, integrations and development complexity. Contact us with your requirements and we can discuss a suitable solution.",
  },
  {
    category: "Pricing",
    question: "How can I get a quotation for my project?",
    answer:
      "You can contact Lakshmi Narayan And Company through the Contact page and share your project requirements. We can then discuss the scope, features, timeline and estimated development cost.",
  },
  {
    category: "Support",
    question: "Do you provide support after the website is launched?",
    answer:
      "Yes. Post-launch support can be provided depending on the project and support requirements. We can assist with technical issues, updates, improvements and future feature development.",
  },
  {
    category: "Support",
    question: "How can I contact Lakshmi Narayan And Company?",
    answer:
      "You can contact us through the Contact page of our website. Share your requirements, and our team can get back to you regarding your project.",
  },
];

const categories=[
  "All",
  "General",
  "Web Development",
  "Technology",
  "E-Commerce",
  "SEO",
  "Security",
  "Pricing",
  "Support",
];

function FAQ(){

  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(()=>{
    document.title="FAQ | Lakshmi Narayan And Company - Software Development";
  }, []);

  const filteredFAQs= faqData.filter((faq)=>{
    const categoryMatch=selectedCategory === "All" || faq.category === selectedCategory;

    const searchMatch= faq.question.toLowerCase().includes(search.toLowerCase()) || faq.answer.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const toggleFAQ=(index)=>{ 
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
                    <div className="faq-page">

                                            {/* HERO */}

                    <section className="faq-hero">

                        <div className="faq-hero-overlay"></div>

                        <div className="faq-hero-content">

                        <span>HELP CENTER</span>

                        <h1>
                            Frequently Asked
                            <strong> Questions</strong>
                        </h1>

                        <p>
                            Find answers to common questions about our software
                            development services, technologies, pricing, SEO,
                            security and support.
                        </p>

                        </div>

                    </section>

                                        {/* FAQ SECTION */}

                    <section className="faq-section">

                        <div className="faq-container">

                        <div className="faq-heading">

                            <span>FAQ</span>

                            <h2>
                            How Can We <strong>Help?</strong>
                            </h2>

                            <p>
                            Browse the questions below or search for the information
                            you need.
                            </p>

                        </div>

                                            {/* SEARCH */}

                        <div className="faq-search">

                            <input type="text" placeholder="Search your question..." value={search} onChange={(e) => {setSearch(e.target.value); setActiveIndex(null);}}/>

                            <span>⌕</span>

                        </div>

                                            {/* CATEGORY */}

                        <div className="faq-categories">

                            {categories.map((category) => (
                            <button key={category} className={selectedCategory === category ? "active" : ""} onClick={() => {setSelectedCategory(category); setActiveIndex(null);}}>
                                {category}
                            </button>
                            ))}

                        </div>

                                            {/* FAQ LIST */}

                        <div className="faq-list">

                            {filteredFAQs.length > 0 ? (
                            filteredFAQs.map((faq, index)=>(
                                <div className={`faq-item ${activeIndex === index ? "open" : ""}`} key={`${faq.category}-${index}`}>

                                <button className="faq-question" onClick={() => toggleFAQ(index)} aria-expanded={activeIndex === index}>

                                    <div>
                                    <span className="faq-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span>{faq.question}</span>
                                    </div>

                                    <span className="faq-icon">
                                    {activeIndex === index ? "−" : "+"}
                                    </span>

                                </button>

                                <div className="faq-answer" style={{maxHeight: activeIndex === index ? "300px": "0px",}}>
                                    <p>{faq.answer}</p>
                                </div>

                                </div>
                            ))
                            ) : (
                            <div className="faq-no-result">
                                <h3>No question found</h3>

                                <p>
                                Try another keyword or select a different category.
                                </p>
                            </div>
                            )}

                        </div>

                        </div>

                    </section>

                                        {/* CONTACT CTA */}

                    <section className="faq-cta">

                        <div className="faq-cta-content">

                        <span>STILL HAVE QUESTIONS?</span>

                        <h2>
                            Let's Talk About
                            <br />
                            <strong>Your Project.</strong>
                        </h2>

                        <p>
                            If you couldn't find the answer you're looking for,
                            contact our team and tell us about your requirements.
                        </p>

                        <a href="/contact">
                            Contact Us →
                        </a>

                        </div>

                    </section>

                    </div>
  );
}
export default FAQ;