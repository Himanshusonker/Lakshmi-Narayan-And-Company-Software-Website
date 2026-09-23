const Service = require("../models/serviceAIModel");

// ==========================================
// GET ALL SERVICES
// ==========================================
const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
    }).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get Services Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

// ==========================================
// GET SINGLE SERVICE BY SLUG
// ==========================================
const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const service = await Service.findOne({
      slug,
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};

module.exports = {
  getServices,
  getServiceBySlug,
};