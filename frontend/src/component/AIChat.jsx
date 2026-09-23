import React, {useEffect, useRef, useState,} from "react";
import axios from "axios";
import AIMessage from "./AIMessage";

const API_URL =import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL;

const AIChat = () => {
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hello! 👋 I'm the AI Assistant of Lakshmi Narayan And Company. Tell me about your project and I'll help you understand the right solution.",
        },
    ]);

    const [loading, setLoading] = useState(false);

    const [sessionId, setSessionId] = useState(
        () => localStorage.getItem("aiSessionId") || ""
    );

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const sendMessage = async (e) => {
        e?.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage || loading) {
            return;
        }

        const userMessage = {
            role: "user",
            content: trimmedMessage,
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${API_URL}/api/ai/chat`,
                {
                    message: trimmedMessage,
                    sessionId,
                }
            );

            const data = response.data;

            if (data.sessionId) {
                setSessionId(data.sessionId);

                localStorage.setItem(
                    "aiSessionId",
                    data.sessionId
                );
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        data.reply ||
                        "Sorry, I could not generate a response.",
                },
            ]);
        } catch (error) {
            console.error(
                "AI Chat Error:",
                error
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Sorry, something went wrong. Please try again or contact our support team.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestion = (text) => {
        setMessage(text);
    };

    const clearChat = () => {
        localStorage.removeItem("aiSessionId");

        setSessionId("");

        setMessages([
            {
                role: "assistant",
                content:
                    "Hello! 👋 I'm the AI Assistant of Lakshmi Narayan And Company. Tell me about your project and I'll help you understand the right solution.",
            },
        ]);
    };

    return (
        <div className="ai-chat-wrapper">

            <div className="ai-chat-header">
                <div>
                    <h3>AI Assistant</h3>
                    <span>
                        ● Online • Ready to help
                    </span>
                </div>

                <button
                    type="button"
                    onClick={clearChat}
                    className="ai-chat-clear"
                >
                    New Chat
                </button>
            </div>

            <div className="ai-chat-suggestions">

                <button
                    type="button"
                    onClick={() =>
                        handleSuggestion(
                            "I need a website for my business."
                        )
                    }
                >
                    🌐 Need a Website
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleSuggestion(
                            "I need a mobile application."
                        )
                    }
                >
                    📱 Mobile App
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleSuggestion(
                            "I want to add AI to my business."
                        )
                    }
                >
                    🤖 AI Solution
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleSuggestion(
                            "I want a project quotation."
                        )
                    }
                >
                    💰 Get Quote
                </button>

            </div>

            <div className="ai-chat-messages">

                {messages.map((item, index) => (
                    <AIMessage
                        key={`${index}-${item.role}`}
                        message={item}
                    />
                ))}

                {loading && (
                    <div className="ai-message-row ai-message-assistant">
                        <div className="ai-message-avatar">
                            AI
                        </div>

                        <div className="ai-message-bubble ai-typing">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />

            </div>

            <form
                className="ai-chat-input-area"
                onSubmit={sendMessage}
            >

                <input
                    type="text"
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    placeholder="Ask about your project..."
                    disabled={loading}
                />

                <button
                    type="submit"
                    disabled={
                        loading ||
                        !message.trim()
                    }
                >
                    {loading
                        ? "..."
                        : "Send"}
                </button>

            </form>

        </div>
    );
};

export default AIChat;