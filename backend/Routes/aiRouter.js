const express = require("express");

const {chatWithAI, getConversation,} = require("../controllers/aiController");

const router = express.Router();

router.post("/chat", chatWithAI);

router.get("/conversation/:sessionId", getConversation);

module.exports = router;