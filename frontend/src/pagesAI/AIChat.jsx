import React, {useEffect, useState,} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SEO from "../componentAI/SEOAI";
import { aiAssistantSEO } from "../DataAI/seoAIData";

const API_URL =import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL || "http://localhost:7070";

const AIChat = () => {

    const [messages, setMessages] =
        useState([]);

    const [input, setInput] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [sessionId, setSessionId] =
        useState("");

    const [showQuoteButton, setShowQuoteButton] =
        useState(false);


    // ========================================================
    // SESSION
    // ========================================================

    useEffect(() => {

        let existingSession =
            localStorage.getItem(
                "aiSessionId"
            );

        if (!existingSession) {

            existingSession =
                `ai-${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(2, 10)}`;

            localStorage.setItem(
                "aiSessionId",
                existingSession
            );
        }

        setSessionId(
            existingSession
        );

    }, []);


    // ========================================================
    // SEND MESSAGE
    // ========================================================

    const sendMessage = async () => {

        if (
            !input.trim() ||
            loading ||
            !sessionId
        ) {
            return;
        }

        const userMessage =
            input.trim();

        setInput("");

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                message: userMessage,
            },
        ]);

        setLoading(true);


        try {

            const response =await axios.post(`${API_URL}/api/ai-assistant/message`,
                    {
                        sessionId,
                        message: userMessage,
                    }
                );


            if (
                response.data.success
            ) {

                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        message:
                            response.data
                                .message,
                    },
                ]);


                setShowQuoteButton(
                    response.data
                        .showQuoteButton
                );

            }

        } catch (error) {

            console.error(
                "AI Chat Error:",
                error
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    message:
                        "Sorry, I couldn't process your request right now. Please try again.",
                },
            ]);

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // ENTER KEY
    // ========================================================

    const handleKeyDown = (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            sendMessage();
        }

    };


    // ========================================================
    // CLEAR CHAT
    // ========================================================

    const clearChat = () => {

        localStorage.removeItem(
            "aiSessionId"
        );

        const newSession =
            `ai-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 10)}`;

        localStorage.setItem(
            "aiSessionId",
            newSession
        );

        setSessionId(
            newSession
        );

        setMessages([]);

        setShowQuoteButton(
            false
        );
    };


    // ========================================================
    // UI
    // ========================================================

    return (

        <>

      <SEO {...aiAssistantSEO} />

        <section className="ai-chat-section">

            <div className="ai-chat-container">

                {/* HEADER */}

                <div className="ai-chat-header">

                    <div className="ai-chat-title">

                        <div className="ai-chat-icon">
                            🤖
                        </div>

                        <div>

                            <span>
                                AI PROJECT
                                ASSISTANT
                            </span>

                            <h2>
                                Tell Us What
                                You Want To Build
                            </h2>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="ai-clear-button"
                        onClick={
                            clearChat
                        }
                    >
                        New Chat
                    </button>

                </div>


                {/* CHAT */}

                <div className="ai-chat-box">

                    {messages.length === 0 && (

                        <div className="ai-chat-welcome">

                            <div className="ai-welcome-icon">
                                ✨
                            </div>

                            <h3>
                                How can I help
                                with your project?
                            </h3>

                            <p>
                                Tell me what you
                                want to build.
                                I'll ask questions
                                and recommend a
                                suitable solution.
                            </p>

                            <div className="ai-suggestion-list">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setInput(
                                            "I need an ecommerce website"
                                        )
                                    }
                                >
                                    🛒 Ecommerce
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setInput(
                                            "I need a business website"
                                        )
                                    }
                                >
                                    🌐 Website
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setInput(
                                            "I need custom software"
                                        )
                                    }
                                >
                                    💻 Software
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setInput(
                                            "I need an AI chatbot"
                                        )
                                    }
                                >
                                    🤖 AI Chatbot
                                </button>

                            </div>

                        </div>

                    )}


                    {messages.map(
                        (
                            message,
                            index
                        ) => (

                            <div
                                key={index}
                                className={`ai-message-row ${
                                    message.role ===
                                    "user"
                                        ? "user-message-row"
                                        : "assistant-message-row"
                                }`}
                            >

                                <div
                                    className={`ai-message ${
                                        message.role ===
                                        "user"
                                            ? "user-message"
                                            : "assistant-message"
                                    }`}
                                >
                                    {
                                        message.message
                                    }
                                </div>

                            </div>

                        )
                    )}


                    {loading && (

                        <div className="ai-message-row assistant-message-row">

                            <div className="ai-message assistant-message">

                                <div className="ai-typing">

                                    <span></span>
                                    <span></span>
                                    <span></span>

                                </div>

                            </div>

                        </div>

                    )}

                </div>


                {/* QUOTE */}

                {showQuoteButton && (

                    <div className="ai-quote-box">

                        <div>

                            <strong>
                                Ready to discuss
                                your project?
                            </strong>

                            <p>
                                Send us your
                                requirements and
                                get a project quote.
                            </p>

                        </div>

                        <Link
                            to="/contactai"
                            className="ai-get-quote-button"
                        >
                            Get Quote →
                        </Link>

                    </div>

                )}


                {/* INPUT */}

                <div className="ai-chat-input-wrapper">

                    <textarea
                        value={input}
                        onChange={(event) =>
                            setInput(
                                event.target.value
                            )
                        }
                        onKeyDown={
                            handleKeyDown
                        }
                        placeholder="Tell me what you want to build..."
                        rows="2"
                        disabled={loading}
                    />

                    <button
                        type="button"
                        onClick={
                            sendMessage
                        }
                        disabled={
                            loading ||
                            !input.trim()
                        }
                    >
                        {loading
                            ? "..."
                            : "Send"}
                    </button>

                </div>

                <div className="ai-chat-note">
                    AI Project Assistant helps
                    understand your initial
                    requirements. Final pricing
                    is confirmed after project
                    discussion.
                </div>

            </div>

        </section>

    </>
    
    );
};

export default AIChat;
