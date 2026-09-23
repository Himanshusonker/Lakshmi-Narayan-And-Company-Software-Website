const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
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

    shortDescription: {
      type: String,
      default: "", 
      trim: true,
      // required: true,
    },

    description: {
      type: String,
      default: "", 
      trim: true,
      // required: true,
    },

    icon: {
      type: String,
      default: "💻",
    },

    category: { 
      type: String, 
      enum: [ "Web Development", "Software Development", "AI Development", "Automation", "API Integration", "Other", ], 
      default: "Other", 
    },

    features: {
        type: [String], 
        default: [],
      },

    technologies: {
        type: [String], 
        default: [],
      },

    priceFrom: { 
      type: Number, 
      default: 0, 
    }, 
    
    isFeatured: { 
      type: Boolean, 
      default: false, 
    },

    process: [
      {
        title: String,
        description: String,
      },
    ],

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

module.exports = mongoose.model("Serviceai", serviceSchema, "Servicesai");