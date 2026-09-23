import React from "react";
import { Link } from "react-router-dom";

const ButtonAI = ({
    children,
    to,
    href,
    type = "button",
    variant = "primary",
    className = "",
    onClick,
    disabled = false
}) => {

    const buttonClass = `common-button ${variant} ${className}`;

    // Internal React route
    if (to) {
        return (
            <Link
                to={to}
                className={buttonClass}
                onClick={onClick}
            >
                {children}
            </Link>
        );
    }

    // External URL
    if (href) {
        return (
            <a
                href={href}
                className={buttonClass}
                target="_blank"
                rel="noreferrer"
                onClick={onClick}
            >
                {children}
            </a>
        );
    }

    // Normal button
    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ButtonAI;