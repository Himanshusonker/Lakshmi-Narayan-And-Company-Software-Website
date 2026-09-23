import React from "react";

const AIMessage = ({ message }) => {
    const isUser = message.role === "user";

    return (
        <div
            className={`ai-message-row ${
                isUser
                    ? "ai-message-user"
                    : "ai-message-assistant"
            }`}
        >
            {!isUser && (
                <div className="ai-message-avatar">
                    AI
                </div>
            )}

            <div className="ai-message-content">
                <div className="ai-message-bubble">
                    {message.content}
                </div>
            </div>

            {isUser && (
                <div className="ai-message-avatar user-avatar">
                    You
                </div>
            )}
        </div>
    );
};

export default AIMessage;