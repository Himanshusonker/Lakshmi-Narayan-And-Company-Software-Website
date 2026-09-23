const mongoose = require("mongoose");

require("dotenv").config();

const Project = require("./models/projectAIModel");

const projects = [
  {
    projectName: "AI Customer Support Assistant",

    slug: "ai-customer-support-assistant",

    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",

    category: "AI Projects",

    shortDescription:
      "An AI-powered customer support assistant that handles customer questions automatically.",

    problem:
      "The business was receiving a large number of repetitive customer questions, which required support staff to spend significant time answering the same queries.",

    solution:
      "We developed an AI customer support assistant capable of understanding customer questions, searching business knowledge, generating useful responses, and escalating complex queries to human support.",

    technology: [
      "OpenAI",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
      "Vector Database",
    ],

    projectOverview:
      "A complete AI-powered support system designed to improve customer communication and reduce repetitive support workload.",

    features: [
      "AI-powered customer conversations",
      "Business knowledge integration",
      "FAQ automation",
      "Lead collection",
      "Human support escalation",
      "Conversation history",
    ],

    results: [
      "Automated repetitive customer questions",
      "Improved response speed",
      "Reduced manual support workload",
      "24/7 customer assistance",
    ],

    order: 1,
  },

  {
    projectName: "Business Website Development",

    slug: "business-website-development",

    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",

    category: "Web Projects",

    shortDescription:
      "A modern responsive business website designed to generate leads and establish a strong online presence.",

    problem:
      "The business needed a professional online presence where customers could understand its services, explore previous work, and easily request quotations.",

    solution:
      "We created a responsive business website with service pages, project showcase, contact forms, lead generation, SEO-friendly structure, and a modern user interface.",

    technology: [
      "React",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
      "CSS",
    ],

    projectOverview:
      "A complete business website focused on branding, performance, lead generation, and responsive user experience.",

    features: [
      "Responsive design",
      "Service management",
      "Project showcase",
      "Contact form",
      "Lead management",
      "SEO-friendly pages",
    ],

    results: [
      "Professional online presence",
      "Better customer engagement",
      "Improved lead generation",
      "Mobile-friendly experience",
    ],

    order: 2,
  },

  {
    projectName: "Business Management Software",

    slug: "business-management-software",

    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",

    category: "Software Projects",

    shortDescription:
      "Custom business management software for managing operations, clients, projects, and business data.",

    problem:
      "The organization was managing important business operations using multiple disconnected systems and manual processes.",

    solution:
      "We developed centralized business management software with authentication, dashboards, client management, project management, and administrative controls.",

    technology: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Authentication",
      "REST API",
    ],

    projectOverview:
      "A scalable software platform designed to centralize business operations and simplify administrative workflows.",

    features: [
      "Admin dashboard",
      "User authentication",
      "Client management",
      "Project management",
      "Data management",
      "Role-based access",
    ],

    results: [
      "Centralized business operations",
      "Reduced manual work",
      "Improved data organization",
      "Better administrative control",
    ],

    order: 3,
  },

  {
    projectName: "AI Document Processing System",

    slug: "ai-document-processing-system",

    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",

    category: "Case Studies",

    shortDescription:
      "AI-powered document processing system for extracting useful information from business documents.",

    problem:
      "Employees were manually reading documents and entering important information into business systems, resulting in repetitive work and slower processing.",

    solution:
      "We implemented an AI document processing workflow that reads documents, extracts relevant information, structures the data, and sends it to business applications.",

    technology: [
      "AI",
      "OCR",
      "OpenAI",
      "Node.js",
      "React",
      "MongoDB",
      "REST API",
    ],

    projectOverview:
      "An intelligent document automation solution designed to transform unstructured documents into structured business data.",

    features: [
      "Document upload",
      "OCR processing",
      "AI data extraction",
      "Structured data generation",
      "Document history",
      "API integration",
    ],

    results: [
      "Reduced manual data entry",
      "Faster document processing",
      "Improved information extraction",
      "Better workflow automation",
    ],

    order: 4,
  },

  {
    projectName: "AI Recommendation Platform",

    slug: "ai-recommendation-platform",

    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",

    category: "AI Projects",

    shortDescription:
      "Personalized recommendation platform that helps businesses provide relevant products and content to users.",

    problem:
      "Users were presented with the same products and content without considering their individual interests or previous interactions.",

    solution:
      "We designed an AI recommendation system that analyzes user behavior and business data to generate personalized recommendations.",

    technology: [
      "Python",
      "AI",
      "Machine Learning",
      "React",
      "Node.js",
      "MongoDB",
      "REST API",
    ],

    projectOverview:
      "An AI-driven personalization platform designed to improve user engagement through relevant recommendations.",

    features: [
      "Personalized recommendations",
      "User behavior analysis",
      "Product matching",
      "Recommendation API",
      "User preference tracking",
      "Analytics",
    ],

    results: [
      "Improved personalization",
      "Better user experience",
      "More relevant product discovery",
      "Data-driven recommendations",
    ],

    order: 5,
  },

  {
    projectName: "Custom AI Business Automation",

    slug: "custom-ai-business-automation",

    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",

    category: "Case Studies",

    shortDescription:
      "Custom AI automation system designed around a company's specific business workflow.",

    problem:
      "Multiple repetitive business processes required employees to manually move information between systems and perform routine tasks.",

    solution:
      "We analyzed the workflow and created an integrated AI automation system that connects business applications and automates repetitive operations.",

    technology: [
      "AI",
      "OpenAI",
      "Node.js",
      "React",
      "MongoDB",
      "REST APIs",
      "Automation",
    ],

    projectOverview:
      "A custom AI automation platform created to connect systems, process information, and automate repetitive business workflows.",

    features: [
      "Workflow automation",
      "AI processing",
      "API integrations",
      "Automated notifications",
      "Business data processing",
      "Admin dashboard",
    ],

    results: [
      "Reduced repetitive tasks",
      "Faster workflow execution",
      "Improved operational efficiency",
      "Centralized automation management",
    ],

    order: 6,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });

    console.log("MongoDB Connected");

    await Project.deleteMany();

    await Project.insertMany(projects);

    console.log("Projects inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error("Projects Seed Error:", error);

    process.exit(1);
  }
};

seedDatabase();