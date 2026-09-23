const mongoose = require("mongoose");

const aiSolutionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    icon: {
      type: String,
      default: "🤖",
    },

    image: { 
      type: String, 
      default: "", 
    },

    category: { 
      type: String, 
      enum: [ "AI Chatbot", "AI Automation", "AI Assistant", "AI Analytics", "Machine Learning", "Generative AI", "Custom AI", "Other", ], 
      default: "Other", 
    },

    features: { 
      type: [String], 
      default: [], 
    },

    shortDescription: {
      type: String,
      default: "", 
      trim: true,
    },

    description: { 
      type: String, 
      default: "", 
      trim: true, 
    },

    problem: {
      type: String,
      required: true,
    },

    solution: {
      type: String,
      required: true,
    },

    howItWorks: [
      {
        step: Number,
        title: String,
        description: String,
      },
    ],

    benefits: [
      {
        type: String,
      },
    ],

    technologies: {
    type: [String],
    default: [],
    },

    useCases: {
        type: [String], 
        default: [],
      },

    isFeatured: { 
      type: Boolean, 
      default: false, 
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AISolution", aiSolutionSchema, "AISolutions");