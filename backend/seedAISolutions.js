const mongoose = require("mongoose");
require("dotenv").config();

const AISolution = require("./models/aiSolutionModel");

const solutions = [

  // =====================================================
  // AI CHATBOTS
  // =====================================================

  {
    title: "AI Chatbots",

    slug: "ai-chatbots",

    icon: "🤖",

    shortDescription:
      "Intelligent AI chatbots that communicate with customers 24/7.",

    problem:
      "Businesses often receive repetitive customer questions about products, services, pricing, orders and support. Handling these questions manually takes time and can delay customer responses.",

    solution:
      "We build intelligent AI chatbots that understand customer questions and provide relevant answers using your business knowledge, documents and data.",

    howItWorks: [
      {
        step: 1,
        title: "Customer Message",
        description:
          "A customer asks a question through your website or connected platform.",
      },
      {
        step: 2,
        title: "AI Understands",
        description:
          "The AI analyzes the user's message and identifies the required information.",
      },
      {
        step: 3,
        title: "Knowledge Retrieval",
        description:
          "The system retrieves relevant information from your business knowledge base.",
      },
      {
        step: 4,
        title: "AI Response",
        description:
          "The chatbot generates a natural and helpful response.",
      },
    ],

    benefits: [
      "24/7 Customer Support",
      "Faster Response Times",
      "Reduced Repetitive Work",
      "Automated Lead Generation",
      "Consistent Customer Communication",
      "Scalable Customer Support",
    ],

    technologies: [
      "OpenAI",
      "Node.js",
      "React",
      "MongoDB",
      "REST APIs",
      "Vector Database",
    ],

    useCases: [
      "Website Customer Support",
      "Product Questions",
      "Lead Generation",
      "FAQ Automation",
      "Internal Employee Assistant",
      "Knowledge Base Assistant",
    ],

    order: 1,
  },


  // =====================================================
  // BUSINESS AUTOMATION
  // =====================================================

  {
    title: "Business Automation",

    slug: "business-automation",

    icon: "⚡",

    shortDescription:
      "Automate repetitive business workflows using AI and intelligent systems.",

    problem:
      "Businesses spend significant time on repetitive tasks such as data entry, emails, lead processing, reporting and document handling.",

    solution:
      "We design AI-powered automation workflows that connect your existing systems and automatically execute repetitive business processes.",

    howItWorks: [
      {
        step: 1,
        title: "Identify Workflow",
        description:
          "We identify repetitive tasks and business processes suitable for automation.",
      },
      {
        step: 2,
        title: "Connect Systems",
        description:
          "Your applications, APIs and business tools are connected together.",
      },
      {
        step: 3,
        title: "Build Automation",
        description:
          "AI and automation logic is implemented according to your workflow.",
      },
      {
        step: 4,
        title: "Monitor",
        description:
          "The automated workflow is monitored and improved over time.",
      },
    ],

    benefits: [
      "Reduce Manual Work",
      "Save Operational Time",
      "Reduce Human Errors",
      "Faster Business Processes",
      "Automated Data Processing",
      "Improved Productivity",
    ],

    technologies: [
      "OpenAI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Webhooks",
      "MongoDB",
    ],

    useCases: [
      "Lead Processing",
      "Email Automation",
      "Data Entry",
      "Report Generation",
      "CRM Automation",
      "Business Notifications",
    ],

    order: 2,
  },


  // =====================================================
  // DOCUMENT AI
  // =====================================================

  {
    title: "Document AI",

    slug: "document-ai",

    icon: "📄",

    shortDescription:
      "Extract, understand and process information from business documents.",

    problem:
      "Businesses work with large numbers of invoices, forms, applications, contracts and other documents that require manual data extraction and verification.",

    solution:
      "Document AI uses intelligent processing to extract useful information from documents and convert unstructured content into structured business data.",

    howItWorks: [
      {
        step: 1,
        title: "Upload Document",
        description:
          "A document is uploaded into the system.",
      },
      {
        step: 2,
        title: "Document Processing",
        description:
          "The system processes the document and identifies important information.",
      },
      {
        step: 3,
        title: "Data Extraction",
        description:
          "Relevant fields and information are extracted automatically.",
      },
      {
        step: 4,
        title: "Business Integration",
        description:
          "Extracted information can be sent to your database or business application.",
      },
    ],

    benefits: [
      "Automated Data Extraction",
      "Faster Document Processing",
      "Reduced Manual Entry",
      "Structured Business Data",
      "Improved Workflow Efficiency",
      "Scalable Document Processing",
    ],

    technologies: [
      "OCR",
      "OpenAI",
      "Python",
      "Node.js",
      "MongoDB",
      "REST APIs",
    ],

    useCases: [
      "Invoice Processing",
      "KYC Document Processing",
      "Application Forms",
      "Contracts",
      "Receipts",
      "Business Reports",
    ],

    order: 3,
  },


  // =====================================================
  // CUSTOMER SUPPORT AI
  // =====================================================

  {
    title: "Customer Support AI",

    slug: "customer-support-ai",

    icon: "💬",

    shortDescription:
      "AI-powered customer support that provides fast and intelligent assistance.",

    problem:
      "Customer support teams handle repetitive questions and requests every day, making it difficult to provide fast responses as customer volume increases.",

    solution:
      "Customer Support AI helps answer common questions automatically while allowing complex conversations to be transferred to human support teams.",

    howItWorks: [
      {
        step: 1,
        title: "Customer Query",
        description:
          "The customer submits a question or support request.",
      },
      {
        step: 2,
        title: "AI Analysis",
        description:
          "AI identifies the customer's intent and required information.",
      },
      {
        step: 3,
        title: "Automated Response",
        description:
          "The AI provides a relevant response using your support knowledge base.",
      },
      {
        step: 4,
        title: "Human Escalation",
        description:
          "Complex issues can be transferred to a human support agent.",
      },
    ],

    benefits: [
      "24/7 Support Availability",
      "Faster Customer Responses",
      "Reduced Support Workload",
      "Consistent Answers",
      "Better Customer Experience",
      "Human Agent Escalation",
    ],

    technologies: [
      "OpenAI",
      "Node.js",
      "React",
      "MongoDB",
      "REST APIs",
      "WebSockets",
    ],

    useCases: [
      "Technical Support",
      "Product Support",
      "Order Support",
      "FAQ Automation",
      "Customer Queries",
      "Service Support",
    ],

    order: 4,
  },


  // =====================================================
  // RECOMMENDATION SYSTEMS
  // =====================================================

  {
    title: "Recommendation Systems",

    slug: "recommendation-systems",

    icon: "🎯",

    shortDescription:
      "Personalized recommendations powered by intelligent data analysis.",

    problem:
      "Businesses often have customer and product data but struggle to use that information to provide personalized experiences.",

    solution:
      "We develop recommendation systems that analyze user behavior, preferences and available data to generate relevant recommendations.",

    howItWorks: [
      {
        step: 1,
        title: "Collect Data",
        description:
          "Relevant user, product and interaction data is collected.",
      },
      {
        step: 2,
        title: "Analyze Behavior",
        description:
          "The system identifies patterns and preferences.",
      },
      {
        step: 3,
        title: "Generate Recommendations",
        description:
          "AI generates personalized recommendations.",
      },
      {
        step: 4,
        title: "Improve Results",
        description:
          "The recommendation system continuously improves using new data.",
      },
    ],

    benefits: [
      "Personalized User Experience",
      "Better Product Discovery",
      "Data-Driven Decisions",
      "Improved Customer Engagement",
      "Intelligent Personalization",
      "Scalable Recommendation Engine",
    ],

    technologies: [
      "Python",
      "Machine Learning",
      "Node.js",
      "React",
      "MongoDB",
      "AI APIs",
    ],

    useCases: [
      "E-commerce Products",
      "Content Recommendations",
      "Learning Platforms",
      "Entertainment Platforms",
      "Product Discovery",
      "Personalized Dashboards",
    ],

    order: 5,
  },


  // =====================================================
  // CUSTOM AI
  // =====================================================

  {
    title: "Custom AI Solutions",

    slug: "custom-ai-solutions",

    icon: "🧠",

    shortDescription:
      "Custom-built AI solutions designed around your unique business requirements.",

    problem:
      "Every business has different workflows, data and challenges. Generic AI tools may not always fit specific business requirements.",

    solution:
      "We design and develop custom AI systems around your business processes, data and objectives.",

    howItWorks: [
      {
        step: 1,
        title: "Business Discovery",
        description:
          "We understand your business objectives, workflow and requirements.",
      },
      {
        step: 2,
        title: "AI Architecture",
        description:
          "We design an AI architecture based on your specific use case.",
      },
      {
        step: 3,
        title: "Development",
        description:
          "The custom AI solution is developed and integrated with your systems.",
      },
      {
        step: 4,
        title: "Deployment",
        description:
          "The solution is deployed and optimized for production use.",
      },
    ],

    benefits: [
      "Business-Specific AI",
      "Custom AI Workflows",
      "System Integration",
      "Scalable Architecture",
      "Intelligent Automation",
      "Long-Term AI Strategy",
    ],

    technologies: [
      "OpenAI",
      "Python",
      "Node.js",
      "React",
      "MongoDB",
      "REST APIs",
      "Machine Learning",
    ],

    useCases: [
      "AI Business Applications",
      "Internal AI Tools",
      "Intelligent Automation",
      "AI Assistants",
      "Data Analysis",
      "Custom AI Platforms",
    ],

    order: 6,
  },

];


const seedDatabase = async () => {

  try {

    await mongoose.connect(
      process.env.DATABASE_URL,
      {
        dbName: process.env.DATABASE_NAME,
      }
    );

    console.log("MongoDB Connected");

    await AISolution.deleteMany();

    await AISolution.insertMany(solutions);

    console.log(
      "AI Solutions inserted successfully"
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "AI Solutions Seed Error:",
      error
    );

    process.exit(1);

  }

};


seedDatabase();