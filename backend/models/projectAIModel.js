const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
      enum: [
        "AI Projects",
        "Web Projects",
        "Software Projects",
        "Case Studies",
        "Other",
      ],
      default: "Other",
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
    },

    problem: {
      type: String,
      required: true,
    },

    solution: {
      type: String,
      required: true,
    },

    technology: {
        type: [String], 
        default: [],
      },

    projectUrl: { 
      type: String, 
      default: "", 
    },

    client: { 
      type: String, 
      default: "", 
      trim: true, 
    },

    projectOverview: {
      type: String,
      default: "",
    },



    features: [
      {
        type: String, 
      },
    ],

    results: [
      {
        type: String,
      },
    ],

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

module.exports = mongoose.model("Projectai", projectSchema, "Projectsai");