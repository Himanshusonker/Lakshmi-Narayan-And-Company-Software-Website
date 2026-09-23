import React from "react";

const SectionTitleAI = ({
    eyebrow,
    title,
    description,
    align = "center",
    className = ""
}) => {

    return (
        <div
            className={`section-title-wrapper section-title-${align} ${className}`}
        >

            {eyebrow && (
                <span className="section-eyebrow">
                    {eyebrow}
                </span>
            )}

            {title && (
                <h2 className="section-title">
                    {title}
                </h2>
            )}

            {description && (
                <p className="section-description">
                    {description}
                </p>
            )}

        </div>
    );
};

export default SectionTitleAI;