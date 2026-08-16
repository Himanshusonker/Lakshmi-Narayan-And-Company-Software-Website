import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const blogArticles={
  "professional-website-2026": {
    category: "Web Development",
    date: "August 10, 2026",
    readTime: "6 min read",
    title: "Why Every Business Needs a Professional Website in 2026",
    image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85",

    intro:"In today's digital-first business environment, a professional website is no longer optional. It is one of the most important assets a business can have for building trust, generating leads and reaching customers online.",

    sections: [
      {
        heading: "1. Build Trust With Your Customers",
        content:"Customers often search for a business online before making a purchase or contacting the company. A modern, professional and well-designed website helps establish credibility and gives visitors confidence that they are dealing with a legitimate business.",
      },
      {
        heading: "2. Reach Customers 24/7",
        content:"Unlike a physical office, your website can provide information about your business at any time. Customers can learn about your services, products, company and contact options whenever they need them.",
      },
      {
        heading: "3. Generate More Business Leads",
        content:"A properly structured website can become an important lead-generation channel. Contact forms, enquiry buttons, WhatsApp integration, service pages and strong calls-to-action can help convert visitors into potential customers.",
      },
      {
        heading: "4. Improve Your Online Visibility",
        content:"A search-engine-friendly website gives your business a foundation for SEO. Optimized page titles, useful content, fast performance, responsive design and a clear website structure can help search engines understand your website.",
      },
      {
        heading: "5. Showcase Your Services",
        content:"Your website gives you complete control over how your products and services are presented. You can explain your expertise, display projects, publish customer information and clearly communicate your value proposition.",
      },
      {
        heading: "6. Stay Competitive",
        content:"If competitors have a strong online presence while your business does not, potential customers may choose them simply because they are easier to find and evaluate online. A professional website helps your business compete in the digital marketplace.",
      },
    ],

    conclusion:"A professional website can become the foundation of your digital presence. Whether you are a startup, small business or established company, investing in a reliable website can support your marketing, branding, customer communication and long-term growth.",
  },

  "react-nodejs-modern-web-applications": {
    category: "Technology",
    date: "August 7, 2026",
    readTime: "7 min read",
    title:"React and Node.js: A Powerful Combination for Modern Web Applications",
    image:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85",

    intro:"Modern web applications require responsive user interfaces, reliable APIs and scalable backend systems. React and Node.js provide a powerful JavaScript-based technology stack for building such applications.",

    sections: [
      {
        heading: "React for Modern User Interfaces",
        content:"React allows developers to create reusable UI components and dynamic user interfaces. It is particularly useful for dashboards, e-commerce applications, SaaS products and other interactive web applications.",
      },
      {
        heading: "Node.js for Backend Development",
        content:"Node.js allows JavaScript to be used on the server side. With frameworks such as Express.js, developers can create APIs, authentication systems, business logic and database integrations.",
      },
      {
        heading: "Connecting React and Node.js",
        content:"React can communicate with a Node.js backend through REST APIs. This separation between frontend and backend makes applications easier to maintain and expand.",
      },
      {
        heading: "Scalable Application Architecture",
        content:"A properly structured React and Node.js application can be organized into reusable components, APIs, services and database layers. This architecture can make future development easier.",
      },
    ],

    conclusion:"React and Node.js are suitable technologies for many modern business applications. The right architecture should always be selected according to the project's requirements, expected traffic, security needs and long-term maintenance.",
  },

  "seo-small-business": {
    category: "SEO",
    date: "August 4, 2026",
    readTime: "5 min read",
    title: "How SEO Helps Small Businesses Get More Customers",
    image:"https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=85",

    intro:"Search Engine Optimization helps businesses improve the visibility and usability of their websites. For small businesses, SEO can become an important long-term digital marketing channel.",

    sections: [
      {
        heading: "Create Useful Website Content",
        content:"Your website should answer the questions customers are actually searching for. Service pages, FAQs, guides and useful articles can help communicate your expertise.",
      },
      {
        heading: "Optimize Important Page Elements",
        content:"Page titles, headings, meta descriptions, URLs and internal links help create a clear website structure and make your content easier to understand.",
      },
      {
        heading: "Focus on Website Performance",
        content:"A fast, responsive and accessible website provides a better experience for visitors. Performance should therefore be considered as part of the overall website development process.",
      },
      {
        heading: "Build Long-Term Visibility",
        content:"SEO generally requires consistent effort. Creating useful content and maintaining a technically healthy website can help establish long-term organic visibility.",
      },
    ],

    conclusion:"SEO should be considered an ongoing process rather than a one-time activity. A technically sound website combined with useful content provides a strong foundation for organic growth.",
  },

  "choose-right-website-development-company": {
  category: "Business",
  date: "August 1, 2026",
  readTime: "6 min read",
  title: "How to Choose the Right Website Development Company",
  image:"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85",

  intro:"Choosing the right website development company is an important decision for any business. Your website represents your brand online, communicates with your customers and can become an important source of leads and sales. Before selecting a development company, it is important to evaluate its technical expertise, communication, security practices, support and ability to understand your business requirements.",

  sections: [
    {
      heading: "1. Understand Your Business Requirements",
      content:"Before contacting a website development company, clearly define what you want to achieve with your website. Consider your target audience, services, products, required features, number of pages, integrations and future expansion plans. A good development company should take the time to understand your business instead of simply offering a standard website package.",
    },

    {
      heading: "2. Check Their Technology Expertise",
      content:"Technology selection can have a significant impact on the performance, scalability and maintenance of your website. Ask the development company which technologies they use and why those technologies are suitable for your project. Depending on the requirements, modern solutions may use technologies such as React, JavaScript, Node.js, Express.js, MongoDB and REST APIs.",
    },

    {
      heading: "3. Review Their Previous Work",
      content:"A company's previous projects can provide useful information about its design quality, development capabilities and attention to detail. Review websites or applications they have built and check whether the projects are responsive, easy to navigate, visually professional and functional on different devices.",
    },

    {
      heading: "4. Consider Website Performance",
      content:"A beautiful website is not enough if it loads slowly or performs poorly on mobile devices. Ask the development company how they approach performance optimization. Image optimization, efficient code, responsive layouts, caching and proper server configuration can all contribute to a better user experience.",
    },

    {
      heading: "5. Ask About SEO",
      content:"Your website should be developed with search engines in mind from the beginning. Discuss technical SEO requirements such as page titles, meta descriptions, heading structure, clean URLs, responsive design, sitemap configuration, internal linking and website performance.",
    },

    {
      heading: "6. Check Security Practices",
      content:"Website security is especially important when your application handles customer accounts, contact information, payments or business data. Ask about HTTPS, authentication, authorization, input validation, secure API development, environment variables and dependency updates.",
    },

    {
      heading: "7. Understand Post-Launch Support",
      content:"A website often requires updates after it goes live. Ask what type of support the development company provides after deployment. Support may include bug fixes, content updates, technical improvements, security updates and future feature development.",
    },

    {
      heading: "8. Discuss Scalability",
      content:"Your website should be able to grow with your business. If you expect more products, users, pages or functionality in the future, discuss scalability during the initial planning stage. A well-structured architecture can make future development easier and reduce unnecessary redevelopment costs.",
    },

    {
      heading: "9. Compare Value Instead of Only Price",
      content:"The cheapest development quote is not always the best option. Consider the overall value including design, technology, security, performance, SEO, support and future scalability. A reliable website can become a long-term business asset, so the quality of development should be considered alongside the initial cost.",
    },
  ],

  conclusion:"Choosing the right website development company requires more than comparing prices. Look for a development partner who understands your business, communicates clearly, uses appropriate technology, follows good security practices and can support your website as your business grows. The right development team can help turn your website from a simple online presence into a valuable business platform.",
},

"essential-features-modern-ecommerce-website": {
  category: "E-Commerce",
  date: "July 28, 2026",
  readTime: "8 min read",
  title: "Essential Features of a Modern E-Commerce Website",
  image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85",

  intro:"A modern e-commerce website needs to do much more than display products. Customers expect a fast, secure and convenient shopping experience across mobile and desktop devices. From product discovery to checkout and order management, every part of the shopping journey can affect customer satisfaction and business growth.",

  sections: [
    {
      heading: "1. Responsive Design",
      content:"A large number of online shoppers use smartphones and tablets. An e-commerce website should therefore provide a consistent and easy-to-use experience across mobile, tablet and desktop devices. Product images, navigation, filters, buttons and checkout pages should adapt properly to different screen sizes.",
    },

    {
      heading: "2. Product Catalog",
      content:"A well-organized product catalog helps customers quickly find what they are looking for. Products should have clear names, descriptions, images, prices, categories and relevant information. Categories and filters can make large product catalogs easier to navigate.",
    },

    {
      heading: "3. Product Search and Filtering",
      content:"Customers should be able to search for products quickly. Search suggestions, category filters, price ranges and other relevant filters can improve product discovery and reduce the time required to find a suitable product.",
    },

    {
      heading: "4. Shopping Cart",
      content:"The shopping cart is one of the most important parts of an e-commerce website. Customers should be able to add products, change quantities, remove items and clearly see the subtotal, shipping charges and final amount before completing their purchase.",
    },

    {
      heading: "5. Secure Checkout",
      content:"The checkout process should be simple and trustworthy. Customers should be able to enter their delivery information, review their order and select an available payment method without unnecessary steps. HTTPS and secure handling of sensitive information are essential for a trustworthy shopping experience.",
    },

    {
      heading: "6. Payment Gateway Integration",
      content:"Modern e-commerce websites often require online payment integration. The selected payment provider should be integrated according to its official security and API requirements. Payment verification should be performed securely on the backend rather than relying only on frontend information.",
    },

    {
      heading: "7. Order Management",
      content:"An effective order management system allows administrators to view orders, update order status and manage customer and delivery information. Customers should also be able to receive useful information about their orders.",
    },

    {
      heading: "8. User Accounts",
      content:"Customer accounts can provide features such as login, registration, saved addresses, order history and profile management. Authentication should be implemented securely with appropriate access controls.",
    },

    {
      heading: "9. Admin Dashboard",
      content:"An admin dashboard can make it easier for a business to manage products, users, orders, categories and other website data. A well-designed dashboard can reduce manual work and provide better control over the e-commerce operation.",
    },

    {
      heading: "10. SEO-Friendly Product Pages",
      content:"Product pages should be structured so that search engines can understand the content. Clear product titles, useful descriptions, descriptive URLs, relevant headings and optimized images can provide a stronger foundation for organic search visibility.",
    },

    {
      heading: "11. Website Performance",
      content:"E-commerce websites often contain many images and dynamic components. Optimizing images, reducing unnecessary JavaScript, using efficient APIs and configuring the server correctly can help improve loading performance and user experience.",
    },

    {
      heading: "12. Security",
      content:"Security should be considered throughout the e-commerce application. Authentication, authorization, input validation, secure API endpoints, HTTPS, protected credentials and regular dependency updates can help reduce common security risks.",
    },
  ],

  conclusion:"A successful e-commerce website combines a smooth customer experience with reliable backend functionality. Responsive design, product management, search, cart, secure checkout, payments, order management, SEO, performance and security should all be considered when building a modern online store. The exact features should be selected according to the business model and customer requirements.",
},

"why-website-security-should-be-business-priority": {
  category: "Cyber Security",
  date: "July 25, 2026",
  readTime: "7 min read",
  title: "Why Website Security Should Be a Business Priority",
  image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=85",

  intro:"A website is often one of the most important digital assets of a modern business. It may contain customer information, contact details, user accounts, business data and integrations with external services. Protecting this information and keeping the application secure should therefore be an important part of website development.",

  sections: [
    {
      heading: "1. Protect Customer Information",
      content:"Web applications can collect information through registration forms, contact forms, orders and other features. Businesses should take appropriate measures to protect customer information and avoid exposing sensitive data unnecessarily.",
    },

    {
      heading: "2. Use HTTPS",
      content:"HTTPS encrypts communication between the user's browser and the website server. A valid SSL/TLS configuration helps protect information transmitted between the client and server and also provides visitors with greater confidence when using the website.",
    },

    {
      heading: "3. Secure Authentication",
      content:"Applications that provide user accounts should implement authentication securely. Passwords should never be stored as plain text. Appropriate password hashing, secure session or token handling and account access controls should be used.",
    },

    {
      heading: "4. Protect APIs",
      content:"Modern websites frequently communicate with backend APIs. API endpoints should validate incoming data and enforce appropriate authentication and authorization. Sensitive operations should never rely solely on information supplied by the frontend.",
    },

    {
      heading: "5. Validate User Input",
      content:"User-provided data should be validated before it is processed or stored. Validation helps prevent malformed data and can reduce the risk of several common application vulnerabilities.",
    },

    {
      heading: "6. Protect Environment Variables",
      content:"Sensitive credentials such as database connection strings, API keys, payment credentials and authentication secrets should not be hard-coded into publicly accessible frontend code. These values should be stored securely using appropriate server-side environment configuration.",
    },

    {
      heading: "7. Keep Dependencies Updated",
      content:"Modern applications depend on many third-party packages. Developers should regularly review dependencies and address known security vulnerabilities when updates or patches are available.",
    },

    {
      heading: "8. Implement Access Control",
      content:"Different users should only be allowed to perform actions appropriate to their roles. For example, administrative functions should not be accessible to ordinary customers. Authorization should be enforced on the backend rather than only hiding frontend controls.",
    },

    {
      heading: "9. Secure Database Access",
      content:"Database credentials should be protected and database access should be restricted appropriately. Applications should use controlled database queries and validate data before storing it.",
    },

    {
      heading: "10. Backup and Recovery",
      content:"Security also includes preparing for unexpected incidents. Appropriate backups and a recovery plan can help a business restore important information if data is accidentally deleted, corrupted or affected by an incident.",
    },

    {
      heading: "11. Monitor the Application",
      content:"Monitoring server activity, application errors and unusual behavior can help identify problems earlier. Logs should be configured carefully so that they provide useful diagnostic information without unnecessarily exposing sensitive data.",
    },

    {
      heading: "12. Security Should Be Continuous",
      content:"Website security is not a one-time task. As applications change, new features are added and dependencies are updated, security requirements also evolve. Regular reviews and maintenance are therefore important for long-term protection.",
    },
  ],

  conclusion:"Website security should be treated as an ongoing part of software development rather than something added at the end of a project. Secure authentication, protected APIs, input validation, HTTPS, access control, dependency management, database protection and proper server configuration can help create a stronger security foundation for business websites and web applications.",
},
};

function BlogDetail() {
  const { slug }=useParams();

  const article=blogArticles[slug];

  useEffect(()=>{
    if (article) {
      document.title= `${article.title} | Lakshmi Narayan And Company`;
    } else {
      document.title= "Blog | Lakshmi Narayan And Company";
    }

    window.scrollTo(0, 0);
  }, [article]);

  if (!article) {
    return (
      <div className="blog-detail-not-found">
        <h1>Article Not Found</h1>
        <p>The blog article you are looking for does not exist.</p>

        <Link to="/blog">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">

                                                {/* HERO */}

      <section className="blog-detail-hero">
        <img src={article.image} alt={article.title} />

        <div className="blog-detail-overlay"></div>

        <div className="blog-detail-hero-content">

          <span>{article.category}</span>

          <h1>{article.title}</h1>

          <div className="blog-detail-meta">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

        </div>
      </section>

                                                {/* ARTICLE */}
      <main className="blog-detail-main">

        <div className="blog-detail-container">

          <Link to="/blog" className="back-blog">
            ← Back to Blog
          </Link>

          <article className="blog-article">

            <p className="article-intro">
              {article.intro}
            </p>

            {article.sections.map((section, index)=>(
              <section className="article-section" key={index}>
                <h2>{section.heading}</h2>

                <p>{section.content}</p>
              </section>
            ))}

            <div className="article-conclusion">
              <h2>Conclusion</h2>
              <p>{article.conclusion}</p>
            </div>

          </article>

                                                {/* CTA */}
          <div className="article-cta">

            <div>
              <span>HAVE A PROJECT IN MIND?</span>

              <h2>
                Let's Build Your
                <strong> Digital Future.</strong>
              </h2>

              <p>
                Talk to Lakshmi Narayan And Company about your
                website or software development requirements.
              </p>
            </div>

            <Link to="/contact">
              Contact Us →
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
}
export default BlogDetail;