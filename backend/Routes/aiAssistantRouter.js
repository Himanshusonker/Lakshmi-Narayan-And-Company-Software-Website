const express = require("express");

const router = express.Router();

const {sendAssistantMessage, getConversation, closeConversation} = require("../controllers/aiAssistantController");

const { aiLimiter, } = require("../middleware/rateLimitAIMiddleware");

const { validateAIMessage, } = require("../middleware/aiValidationMiddleware");

// ============================================================
// SEND MESSAGE
// ============================================================

router.post("/message", aiLimiter, validateAIMessage, sendAssistantMessage);


// ============================================================
// GET CONVERSATION
// ============================================================

router.get("/conversation/:sessionId", aiLimiter, getConversation);


// ============================================================
// CLOSE CONVERSATION
// ============================================================

router.put("/conversation/:sessionId/close", aiLimiter, closeConversation);


module.exports = router;