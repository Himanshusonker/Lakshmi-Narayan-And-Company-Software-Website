const SITE_URL = "https://www.lakshminarayanandco.com";

const COMPANY_NAME = "Lakshmi Narayan And Company";

const COMPANY_DESCRIPTION = "Lakshmi Narayan And Company provides AI development, software development, website development, mobile apps, automation and digital solutions.";

const COMPANY_LOGO = `${SITE_URL}/logo.png`;


/* ================================
   ORGANIZATION SCHEMA
================================ */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: COMPANY_NAME,

  url: SITE_URL,

  logo: COMPANY_LOGO,

  description: COMPANY_DESCRIPTION,

  telephone: "+91-9335187678",

  email: "infolakshminarayanandco@gmail.com",

  address: {
    "@type": "PostalAddress",

    streetAddress:
      "76/229, Coolie Bazar",

    addressLocality: "Kanpur Nagar",

    addressRegion: "Uttar Pradesh",

    postalCode: "208001",

    addressCountry: "IN",
  },
};


/* ================================
   WEBSITE SCHEMA
================================ */

export const websiteSchema = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  name: COMPANY_NAME,

  url: SITE_URL,

  description: COMPANY_DESCRIPTION,

  publisher: {
    "@type": "Organization",

    name: COMPANY_NAME,

    url: SITE_URL,
  },
};


/* ================================
   HOME
================================ */

export const homeSEO = {
  title:
    "AI, Software & Digital Solutions",

  description:
    "Build smarter with AI. Lakshmi Narayan And Company provides AI development, software, website, mobile app, automation and digital solutions.",

  keywords:
    "AI development, AI company, software development, website development, AI automation, mobile app development, chatbot development, digital solutions",

  path: "/",
};


/* ================================
   AI ASSISTANT
================================ */

export const aiAssistantSEO = {
  title:
    "AI Assistant",

  description:
    "Talk with our AI Assistant to explore AI solutions, software development, automation, website development and digital solutions for your business.",

  keywords:
    "AI assistant, business AI assistant, AI chatbot, AI consultation, AI solutions",

  path: "/ai-assistant",
};


/* ================================
   SERVICES
================================ */

export const servicesSEO = {
  title:
    "AI & Software Development Services",

  description:
    "Explore AI development, web development, software development, mobile app development, AI chatbot, automation and API integration services.",

  keywords:
    "AI development services, web development, software development, mobile app development, AI chatbot, automation, API integration",

  path: "/servicesai",
};


/* ================================
   AI SOLUTIONS
================================ */

export const aiSolutionsSEO = {
  title:
    "AI Solutions for Business",

  description:
    "Discover AI chatbots, business automation, document AI, customer support AI, recommendation systems and custom AI solutions.",

  keywords:
    "AI solutions, business automation, AI chatbot, document AI, customer support AI, recommendation system, custom AI",

  path: "/ai-solutions",
};


/* ================================
   PROJECTS
================================ */

export const projectsSEO = {
  title:
    "AI, Web & Software Projects",

  description:
    "Explore AI projects, web applications, software projects, automation solutions and real-world digital use cases developed by Lakshmi Narayan And Company.",

  keywords:
    "AI projects, software projects, web development projects, AI case studies, automation projects",

  path: "/projectsai",
};


/* ================================
   PRICING
================================ */

export const pricingSEO = {
  title:
    "AI & Software Development Pricing",

  description:
    "Explore website, software, AI development and digital solution packages from Lakshmi Narayan And Company.",

  keywords:
    "AI development pricing, software development pricing, website pricing, AI chatbot cost, web development cost",

  path: "/pricingai",
};


/* ================================
   RESOURCES
================================ */

export const resourcesSEO = {
  title:
    "AI Resources, Guides, Blog & Case Studies",

  description:
    "Learn about artificial intelligence, AI automation, chatbots, software development and digital transformation through our resources and guides.",

  keywords:
    "AI resources, AI guides, AI blog, AI case studies, AI automation guide, software development resources",

  path: "/resourcesai",
};


/* ================================
   ABOUT
================================ */

export const aboutSEO = {
  title:
    "About Lakshmi Narayan And Company",

  description:
    "Learn about Lakshmi Narayan And Company, our AI, software, website development, automation and digital solution services.",

  keywords:
    "Lakshmi Narayan And Company, AI company, software company, web development company, digital solutions",

  path: "/aboutai",
};


/* ================================
   CONTACT
================================ */

export const contactSEO = {
  title:
    "Contact Us",

  description:
    "Contact Lakshmi Narayan And Company for AI development, software, website, mobile app, automation and digital solution requirements.",

  keywords:
    "contact AI company, software development contact, website development company Kanpur, AI solutions contact",

  path: "/contactai",
};