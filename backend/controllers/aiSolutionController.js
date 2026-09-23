const AISolution = require("../models/aiSolutionModel");

// ==========================================
// GET ALL AI SOLUTIONS
// ==========================================

const getAISolutions = async (req, res) => {
  try {
    const solutions = await AISolution.find({
      isActive: true,
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: solutions.length,
      solutions,
    });
  } catch (error) {
    console.error("Get AI Solutions Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch AI solutions",
    });
  }
};


// ==========================================
// GET SINGLE AI SOLUTION
// ==========================================

const getAISolutionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const solution = await AISolution.findOne({
      slug,
      isActive: true,
    });

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: "AI solution not found",
      });
    }

    res.status(200).json({
      success: true,
      solution,
    });
  } catch (error) {
    console.error(
      "Get AI Solution Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch AI solution",
    });
  }
};


module.exports = {
  getAISolutions,
  getAISolutionBySlug,
};