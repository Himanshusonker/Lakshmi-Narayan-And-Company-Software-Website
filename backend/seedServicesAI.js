const mongoose = require("mongoose");
require("dotenv").config();

const Service = require("./models/serviceAIModel");


// ============================================================
// AI WEBSITE SERVICES
// ============================================================

const services = [

    // ========================================================
    // 1. AI DEVELOPMENT
    // ========================================================

    {
        title: "AI Development",

        slug: "ai-development",

        icon: "🤖",

        category: "AI Development",

        shortDescription:
            "Build custom AI solutions that make your business smarter, faster and more efficient.",

        description:
            "We develop custom artificial intelligence solutions that help businesses automate processes, analyze data, improve customer experiences and build intelligent digital products. From AI-powered applications to intelligent business tools, we create solutions around your specific requirements.",

        features: [
            "Custom AI Solutions",
            "Machine Learning Integration",
            "Generative AI Applications",
            "AI-powered Business Tools",
            "Intelligent Data Analysis",
            "AI API Integration",
            "AI-powered Web Applications",
            "Custom AI Assistants",
        ],

        technologies: [
            "OpenAI",
            "Python",
            "Node.js",
            "React",
            "MongoDB",
            "REST APIs",
            "Machine Learning",
            "Generative AI",
        ],

        priceFrom: 19999,

        isFeatured: true,

        isActive: true,

        process: [
            {
                title: "Requirement Analysis",
                description:
                    "We understand your business requirements and identify where artificial intelligence can create measurable value.",
            },
            {
                title: "AI Strategy",
                description:
                    "We select the appropriate AI technology, architecture, models and integration approach for your project.",
            },
            {
                title: "Solution Design",
                description:
                    "We design the user experience, backend architecture, data flow and AI workflow.",
            },
            {
                title: "Development",
                description:
                    "Our team develops the AI application and integrates the required APIs, databases and business systems.",
            },
            {
                title: "Testing",
                description:
                    "The solution is tested for functionality, response quality, security and performance.",
            },
            {
                title: "Deployment",
                description:
                    "We deploy the AI solution to the production environment and configure the required infrastructure.",
            },
            {
                title: "Support & Optimization",
                description:
                    "We monitor the solution and continuously improve its performance based on real-world usage.",
            },
        ],

        order: 1,
    },


    // ========================================================
    // 2. WEB DEVELOPMENT
    // ========================================================

    {
        title: "Web Development",

        slug: "web-development",

        icon: "🌐",

        category: "Web Development",

        shortDescription:
            "Modern, responsive and high-performance websites built for business growth.",

        description:
            "We create modern, responsive and high-performance websites for businesses, startups, organizations and professionals. Our websites are designed with clean user experiences, scalable architecture, SEO-friendly development and reliable backend integration.",

        features: [
            "Business Websites",
            "Corporate Websites",
            "Responsive Design",
            "SEO Friendly Development",
            "Admin Panels",
            "API Integration",
            "Contact & Lead Management",
            "Performance Optimization",
        ],

        technologies: [
            "React",
            "Node.js",
            "Express.js",
            "MongoDB",
            "HTML",
            "CSS",
            "JavaScript",
            "REST API",
        ],

        priceFrom: 9999,

        isFeatured: true,

        isActive: true,

        process: [
            {
                title: "Planning",
                description:
                    "We understand your business, target audience and website requirements before starting development.",
            },
            {
                title: "UI/UX Design",
                description:
                    "We create a modern, responsive and user-friendly interface that represents your brand.",
            },
            {
                title: "Frontend Development",
                description:
                    "We build the website using modern frontend technologies and responsive layouts.",
            },
            {
                title: "Backend Development",
                description:
                    "We develop APIs, database integration, authentication and required business functionality.",
            },
            {
                title: "Testing",
                description:
                    "We test the website across devices, browsers and different screen sizes.",
            },
            {
                title: "Launch",
                description:
                    "We deploy the website to the production environment and make it ready for customers.",
            },
        ],

        order: 2,
    },


    // ========================================================
    // 3. SOFTWARE DEVELOPMENT
    // ========================================================

    {
        title: "Software Development",

        slug: "software-development",

        icon: "💻",

        category: "Software Development",

        shortDescription:
            "Custom software applications designed around your unique business processes.",

        description:
            "We build scalable custom software applications designed around your unique business processes and requirements. From management systems and CRM platforms to enterprise dashboards, we create secure and maintainable software solutions.",

        features: [
            "Custom Business Software",
            "Management Systems",
            "Admin Dashboards",
            "CRM Solutions",
            "ERP Solutions",
            "Cloud Applications",
            "Authentication Systems",
            "Database Management",
        ],

        technologies: [
            "React",
            "Node.js",
            "Express.js",
            "MongoDB",
            "REST API",
            "JavaScript",
            "JWT",
            "Cloud Deployment",
        ],

        priceFrom: 34999,

        isFeatured: true,

        isActive: true,

        process: [
            {
                title: "Business Analysis",
                description:
                    "We analyze your workflow, business requirements and existing processes.",
            },
            {
                title: "Architecture",
                description:
                    "We create a scalable software architecture covering frontend, backend, database and APIs.",
            },
            {
                title: "UI/UX Design",
                description:
                    "We design intuitive dashboards and interfaces for administrators and users.",
            },
            {
                title: "Development",
                description:
                    "We develop the application module by module with proper API and database integration.",
            },
            {
                title: "Quality Testing",
                description:
                    "We test functionality, security, performance and different user workflows.",
            },
            {
                title: "Deployment",
                description:
                    "We deploy the software and configure the production environment.",
            },
            {
                title: "Support",
                description:
                    "We provide maintenance, updates and technical support after deployment.",
            },
        ],

        order: 3,
    },


    // ========================================================
    // 4. MOBILE APP DEVELOPMENT
    // ========================================================

    {
        title: "Mobile App Development",

        slug: "mobile-app-development",

        icon: "📱",

        category: "Software Development",

        shortDescription:
            "Powerful and user-friendly mobile applications for Android and iOS.",

        description:
            "We build modern mobile applications that help businesses reach customers through Android and iOS devices. Our applications can include authentication, APIs, payment integration, notifications and custom dashboards.",

        features: [
            "Android Applications",
            "iOS Applications",
            "Cross Platform Apps",
            "API Integration",
            "Authentication",
            "Push Notifications",
            "Payment Integration",
            "Admin Dashboard",
        ],

        technologies: [
            "React Native",
            "Flutter",
            "Node.js",
            "MongoDB",
            "REST API",
            "Firebase",
        ],

        priceFrom: 29999,

        isFeatured: false,

        isActive: true,

        process: [
            {
                title: "Requirement Analysis",
                description:
                    "We understand the application idea, target users and required features.",
            },
            {
                title: "App Architecture",
                description:
                    "We plan the application structure, APIs, database and technology stack.",
            },
            {
                title: "UI/UX Design",
                description:
                    "We design mobile-friendly screens and user journeys.",
            },
            {
                title: "Development",
                description:
                    "We develop the mobile application and connect it with backend APIs.",
            },
            {
                title: "Testing",
                description:
                    "We test the application across supported devices and operating systems.",
            },
            {
                title: "Deployment",
                description:
                    "We prepare and deploy the application for production use.",
            },
        ],

        order: 4,
    },


    // ========================================================
    // 5. AI CHATBOT
    // ========================================================

    {
        title: "AI Chatbot",

        slug: "ai-chatbot",

        icon: "💬",

        category: "AI Development",

        shortDescription:
            "Intelligent AI chatbots for customer support, lead generation and business automation.",

        description:
            "We create intelligent AI chatbots that can answer customer questions, provide support, generate leads and automate repetitive communication. Chatbots can be integrated into websites, business applications and supported communication channels.",

        features: [
            "AI Customer Support",
            "Website Chatbots",
            "Knowledge Base Chatbots",
            "Lead Generation",
            "FAQ Automation",
            "24/7 Automated Support",
            "Conversation History",
            "Business Requirement Analysis",
        ],

        technologies: [
            "OpenAI",
            "Node.js",
            "React",
            "MongoDB",
            "REST APIs",
            "JavaScript",
        ],

        priceFrom: 24999,

        isFeatured: true,

        isActive: true,

        process: [
            {
                title: "Requirement Analysis",
                description:
                    "We understand what customers ask and identify the tasks the chatbot needs to handle.",
            },
            {
                title: "Knowledge Planning",
                description:
                    "We organize FAQs, business information, documents and other knowledge sources.",
            },
            {
                title: "Conversation Design",
                description:
                    "We design the chatbot conversation flow and user experience.",
            },
            {
                title: "AI Integration",
                description:
                    "We connect the chatbot with the selected AI model and backend services.",
            },
            {
                title: "Testing",
                description:
                    "We test responses, conversation flows, fallback handling and security.",
            },
            {
                title: "Deployment",
                description:
                    "We integrate the chatbot into the website or required business platform.",
            },
        ],

        order: 5,
    },


    // ========================================================
    // 6. AI AUTOMATION
    // ========================================================

    {
        title: "AI Automation",

        slug: "ai-automation",

        icon: "⚡",

        category: "Automation",

        shortDescription:
            "Automate repetitive business processes using AI, APIs and intelligent workflows.",

        description:
            "We help businesses automate repetitive workflows using artificial intelligence, APIs and modern automation technologies. From lead processing and document handling to email workflows and data automation, we design solutions that reduce manual work.",

        features: [
            "Business Process Automation",
            "AI Workflow Automation",
            "Document Processing",
            "Email Automation",
            "Lead Automation",
            "Data Automation",
            "API-based Automation",
            "Workflow Integration",
        ],

        technologies: [
            "OpenAI",
            "Node.js",
            "REST API",
            "MongoDB",
            "Webhooks",
            "JavaScript",
        ],

        priceFrom: 29999,

        isFeatured: true,

        isActive: true,

        process: [
            {
                title: "Process Analysis",
                description:
                    "We identify repetitive tasks and business processes that can be automated.",
            },
            {
                title: "Automation Strategy",
                description:
                    "We define the workflow, triggers, actions and required integrations.",
            },
            {
                title: "AI Integration",
                description:
                    "We integrate AI capabilities wherever intelligent decision-making or content processing is required.",
            },
            {
                title: "Workflow Development",
                description:
                    "We develop the automation workflow and connect the required systems.",
            },
            {
                title: "Testing",
                description:
                    "We test different workflow scenarios, errors and fallback conditions.",
            },
            {
                title: "Deployment",
                description:
                    "We deploy the automation and configure monitoring and required integrations.",
            },
        ],

        order: 6,
    },


    // ========================================================
    // 7. API INTEGRATION
    // ========================================================

    {
        title: "API Integration",

        slug: "api-integration",

        icon: "🔗",

        category: "API Integration",

        shortDescription:
            "Connect your websites, software and applications with powerful third-party APIs.",

        description:
            "We integrate third-party APIs and services into websites, software and mobile applications. Our integration services can connect payment gateways, communication platforms, cloud services, CRMs and other external systems.",

        features: [
            "Payment Gateway Integration",
            "Google APIs",
            "WhatsApp APIs",
            "CRM Integration",
            "Cloud Services",
            "Third Party APIs",
            "Webhook Integration",
            "REST API Development",
        ],

        technologies: [
            "REST API",
            "Node.js",
            "Express.js",
            "Axios",
            "Webhooks",
            "JSON",
            "JavaScript",
        ],

        priceFrom: 9999,

        isFeatured: false,

        isActive: true,

        process: [
            {
                title: "API Requirement Analysis",
                description:
                    "We understand the required API, authentication method and business use case.",
            },
            {
                title: "API Documentation Review",
                description:
                    "We review the API documentation, endpoints, request formats and response structures.",
            },
            {
                title: "Integration Development",
                description:
                    "We integrate the API with your website, software or application.",
            },
            {
                title: "Authentication",
                description:
                    "We securely configure API keys, tokens, OAuth or other authentication methods.",
            },
            {
                title: "Testing",
                description:
                    "We test requests, responses, error handling and integration reliability.",
            },
            {
                title: "Deployment",
                description:
                    "We deploy the integration and monitor its production performance.",
            },
        ],

        order: 7,
    },


    // ========================================================
    // 8. AI ANALYTICS
    // ========================================================

    {
        title: "AI Analytics",

        slug: "ai-analytics",

        icon: "📊",

        category: "AI Development",

        shortDescription:
            "Turn business data into useful insights with AI-powered analytics.",

        description:
            "We develop AI-powered analytics solutions that help businesses understand data, identify patterns and generate useful insights. These solutions can be integrated into dashboards and business applications.",

        features: [
            "AI-powered Data Analysis",
            "Business Intelligence",
            "Automated Reports",
            "Data Visualization",
            "Pattern Detection",
            "Predictive Insights",
            "Dashboard Integration",
            "Custom Analytics",
        ],

        technologies: [
            "Python",
            "OpenAI",
            "Node.js",
            "React",
            "MongoDB",
            "REST APIs",
        ],

        priceFrom: 39999,

        isFeatured: false,

        isActive: true,

        process: [
            {
                title: "Data Analysis",
                description:
                    "We understand available data sources and define the required analytics objectives.",
            },
            {
                title: "Data Architecture",
                description:
                    "We design the data flow, storage and processing architecture.",
            },
            {
                title: "Analytics Development",
                description:
                    "We develop the required analytics features, dashboards and AI capabilities.",
            },
            {
                title: "Visualization",
                description:
                    "We present important information through clear and useful dashboards.",
            },
            {
                title: "Testing",
                description:
                    "We validate calculations, data processing and analytics results.",
            },
            {
                title: "Deployment",
                description:
                    "We deploy the analytics solution and configure the production environment.",
            },
        ],

        order: 8,
    },


    // ========================================================
    // 9. CUSTOM AI SOLUTION
    // ========================================================

    {
        title: "Custom AI Solution",

        slug: "custom-ai-solution",

        icon: "🧠",

        category: "AI Development",

        shortDescription:
            "Build a custom AI system designed specifically for your business requirements.",

        description:
            "Every business has different requirements. We design and develop custom AI solutions around your specific workflow, data, users and business goals. From AI assistants and intelligent automation to AI-powered business applications, we create solutions tailored to your needs.",

        features: [
            "Custom AI Architecture",
            "AI Assistant Development",
            "Generative AI Applications",
            "Business Automation",
            "AI API Integration",
            "Custom Knowledge Base",
            "AI-powered Dashboards",
            "Business-specific AI Workflows",
        ],

        technologies: [
            "OpenAI",
            "Python",
            "Node.js",
            "React",
            "MongoDB",
            "REST APIs",
            "Generative AI",
        ],

        priceFrom: 0,

        isFeatured: true,

        isActive: true,

        process: [
            {
                title: "Business Discovery",
                description:
                    "We understand your business goals, challenges, users and existing systems.",
            },
            {
                title: "AI Opportunity Analysis",
                description:
                    "We identify where artificial intelligence can solve problems or improve efficiency.",
            },
            {
                title: "Solution Architecture",
                description:
                    "We design the AI architecture, integrations, data flow and technology stack.",
            },
            {
                title: "Development",
                description:
                    "We develop the custom AI solution according to the approved requirements.",
            },
            {
                title: "Testing & Optimization",
                description:
                    "We test the solution and optimize AI responses, workflows and application performance.",
            },
            {
                title: "Production Deployment",
                description:
                    "We securely deploy the solution to the production environment.",
            },
            {
                title: "Continuous Improvement",
                description:
                    "We monitor the solution and improve it as business requirements evolve.",
            },
        ],

        order: 9,
    },


    // ========================================================
    // 10. AUTOMATION & API SOLUTIONS
    // ========================================================

    {
        title: "Business Automation",

        slug: "business-automation",

        icon: "⚙️",

        category: "Automation",

        shortDescription:
            "Streamline repetitive business tasks with reliable digital automation.",

        description:
            "We build business automation solutions that connect applications, APIs and internal workflows. The goal is to reduce repetitive manual work, improve operational efficiency and create consistent business processes.",

        features: [
            "Workflow Automation",
            "Lead Management Automation",
            "Email Automation",
            "Document Automation",
            "Data Synchronization",
            "API Automation",
            "Notification Systems",
            "Custom Business Workflows",
        ],

        technologies: [
            "Node.js",
            "Express.js",
            "MongoDB",
            "REST APIs",
            "Webhooks",
            "Axios",
            "JavaScript",
        ],

        priceFrom: 19999,

        isFeatured: false,

        isActive: true,

        process: [
            {
                title: "Workflow Analysis",
                description:
                    "We understand the existing manual workflow and identify repetitive tasks.",
            },
            {
                title: "Automation Planning",
                description:
                    "We define triggers, actions, integrations and required business rules.",
            },
            {
                title: "Development",
                description:
                    "We develop the automation workflow and required APIs.",
            },
            {
                title: "Integration",
                description:
                    "We connect the automation with your existing applications and services.",
            },
            {
                title: "Testing",
                description:
                    "We test normal workflows, edge cases and error handling.",
            },
            {
                title: "Deployment",
                description:
                    "We deploy the automation and configure the production environment.",
            },
        ],

        order: 10,
    },
];


// ============================================================
// SEED DATABASE
// ============================================================

const seedDatabase = async () => {

    try {

        const databaseUrl =
            process.env.DATABASE_URL;

        const databaseName =
            process.env.DATABASE_NAME;

        if (!databaseUrl) {
            throw new Error(
                "DATABASE_URL is missing in .env"
            );
        }

        if (!databaseName) {
            throw new Error(
                "DATABASE_NAME is missing in .env"
            );
        }


        await mongoose.connect(
            databaseUrl,
            {
                dbName: databaseName,
            }
        );


        console.log(
            `MongoDB Connected: ${databaseName}`
        );


        // ------------------------------------------------------
        // DELETE OLD SERVICES
        // ------------------------------------------------------

        await Service.deleteMany({});


        // ------------------------------------------------------
        // INSERT NEW SERVICES
        // ------------------------------------------------------

        await Service.insertMany(services);


        console.log(
            `${services.length} AI services inserted successfully`
        );


        console.log(
            "Service AI seed completed successfully."
        );


        process.exit(0);

    } catch (error) {

        console.error(
            "Service AI seed error:",
            error
        );

        process.exit(1);
    }
};


seedDatabase();
