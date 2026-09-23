const rateLimit = require("express-rate-limit");

// ============================================================
// GENERAL API LIMITER
// ============================================================

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 300,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});


// ============================================================
// AI ASSISTANT LIMITER
// ============================================================

const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 50,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message:
            "Too many AI requests. Please wait a few minutes and try again.",
    },
});


// ============================================================
// LOGIN LIMITER
// ============================================================

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 10,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message:
            "Too many login attempts. Please try again later.",
    },
});


module.exports = {
    apiLimiter,
    aiLimiter,
    loginLimiter,
};
