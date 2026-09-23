const mongoose = require("mongoose");


// ============================================================
// HERO
// ============================================================

const heroSchema = new mongoose.Schema({

    badge: {
        type: String,
        default: "AI-Powered Digital Solutions"
    },

    title: {
        type: String,
        required: true
    },

    highlightedTitle: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    buttonText: {
        type: String,
        default: "Start Your AI Project"
    },

    buttonLink: {
        type: String,
        default: "/contact"
    },

    secondaryButtonText: {
        type: String,
        default: "Talk With AI"
    },

    secondaryButtonLink: {
        type: String,
        default: "/ai-assistant"
    },

    image: {
        type: String,
        default: ""
    }

}, { _id: false });


// ============================================================
// INTRODUCTION
// ============================================================

const introductionSchema = new mongoose.Schema({

    smallTitle: String,

    title: String,

    description: String,

    image: String

}, { _id: false });


// ============================================================
// FEATURES
// ============================================================

const featureSchema = new mongoose.Schema({

    icon: String,

    title: String,

    description: String

}, { _id: false });


// ============================================================
// SERVICES
// ============================================================

const serviceSchema = new mongoose.Schema({

    icon: String,

    title: String,

    description: String,

    link: String

}, { _id: false });


// ============================================================
// HOW AI WORKS
// ============================================================

const aiWorkSchema = new mongoose.Schema({

    number: String,

    title: String,

    description: String

}, { _id: false });


// ============================================================
// AI DEMO
// ============================================================

const aiDemoSchema = new mongoose.Schema({

    title: String,

    description: String

}, { _id: false });


// ============================================================
// PROJECTS
// ============================================================

const projectSchema = new mongoose.Schema({

    image: String,

    category: String,

    title: String,

    description: String,

    link: String

}, { _id: false });


// ============================================================
// TESTIMONIALS
// ============================================================

const testimonialSchema = new mongoose.Schema({

    rating: {
        type: Number,
        default: 5
    },

    message: String,

    name: String,

    designation: String,

    image: String

}, { _id: false });


// ============================================================
// PRICING
// ============================================================

const pricingSchema = new mongoose.Schema({

    name: String,

    price: String,

    description: String,

    featured: {
        type: Boolean,
        default: false
    },

    features: [String]

}, { _id: false });


// ============================================================
// FAQ
// ============================================================

const faqSchema = new mongoose.Schema({

    question: String,

    answer: String

}, { _id: false });


// ============================================================
// CTA
// ============================================================

const ctaSchema = new mongoose.Schema({

    title: String,

    description: String,

    buttonText: String,

    buttonLink: String

}, { _id: false });


// ============================================================
// MAIN HOME MODEL
// ============================================================

const homeAISchema = new mongoose.Schema({

    hero: heroSchema,

    trustedText: String,

    introduction: introductionSchema,

    featuresTitle: String,

    featuresDescription: String,

    features: [featureSchema],

    servicesTitle: String,

    servicesDescription: String,

    services: [serviceSchema],

    howAiWorksTitle: String,

    howAiWorksDescription: String,

    howAiWorks: [aiWorkSchema],

    aiDemo: aiDemoSchema,

    projectsTitle: String,

    projects: [projectSchema],

    testimonialsTitle: String,

    testimonials: [testimonialSchema],

    pricingTitle: String,

    pricingDescription: String,

    pricing: [pricingSchema],

    faq: [faqSchema],

    cta: ctaSchema

}, {
    timestamps: true
});
module.exports = mongoose.model("HomeAI", homeAISchema);