import React from "react";

const LoadingAI = ({
    text = "Loading...",
    fullScreen = false
}) => {

    return (
        <div
            className={`loading-wrapper ${
                fullScreen ? "loading-fullscreen" : ""
            }`}
        >

            <div className="loading-spinner"></div>

            {text && (
                <p className="loading-text">
                    {text}
                </p>
            )}

        </div>
    );
};

export default LoadingAI;