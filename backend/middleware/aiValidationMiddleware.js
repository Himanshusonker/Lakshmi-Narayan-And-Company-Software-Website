const { body, validationResult } = require("express-validator");


// ============================================================
// AI MESSAGE VALIDATION
// ============================================================

const validateAIMessage = [
    body("sessionId")
        .trim()
        .notEmpty()
        .withMessage("sessionId is required")
        .isLength({ max: 100 })
        .withMessage("sessionId is too long"),

    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ min: 1, max: 5000 })
        .withMessage("Message must be between 1 and 5000 characters"),

    body("userName")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("userName is too long"),

    body("userEmail")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });
        }

        next();
    },
];


module.exports = {
    validateAIMessage,
};
