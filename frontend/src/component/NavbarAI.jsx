import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavbarAI = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="ai-navbar">

            <div className="ai-navbar-container">

                {/* =====================================================
                    LOGO
                ===================================================== */}

                <NavLink
                    to="/"
                    className="ai-navbar-logo"
                    onClick={closeMenu}
                >
                    <span className="ai-navbar-logo-ai">
                        AI
                    </span>

                    <span className="ai-navbar-logo-text">
                        Website
                    </span>
                </NavLink>


                {/* =====================================================
                    DESKTOP / MOBILE NAVIGATION
                ===================================================== */}

                <nav
                    className={
                        menuOpen
                            ? "ai-navbar-menu active"
                            : "ai-navbar-menu"
                    }
                >

                    <NavLink
                        to="/homeai"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "ai-nav-link active"
                                : "ai-nav-link"
                        }
                    >
                        Home
                    </NavLink>


                    <NavLink
                        to="/ai-assistant"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "ai-nav-link active"
                                : "ai-nav-link"
                        }
                    >
                        AI Assistant
                    </NavLink>


                    <NavLink
                        to="/servicesai"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "ai-nav-link active"
                                : "ai-nav-link"
                        }
                    >
                        Services
                    </NavLink>


                    <NavLink
                        to="/ai-solutions"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "ai-nav-link active"
                                : "ai-nav-link"
                        }
                    >
                        AI Solutions
                    </NavLink>


                    <NavLink
                        to="/projectsai"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "ai-nav-link active"
                                : "ai-nav-link"
                        }
                    >
                        Projects
                    </NavLink>


                    <NavLink
                        to="/pricingai"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "ai-nav-link active"
                                : "ai-nav-link"
                        }
                    >
                        Pricing
                    </NavLink>

                    <NavLink
                        to="/resourcesai"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "ai-nav-link active"
                                : "ai-nav-link"
                        }
                    >
                        Resources
                    </NavLink>

                    <NavLink
                        to="/aboutai"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "ai-nav-link active"
                                : "ai-nav-link"
                        }
                    >
                        About
                    </NavLink>


                    <NavLink
                        to="/contactai"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive
                                ? "ai-nav-link active"
                                : "ai-nav-link"
                        }
                    >
                        Contact
                    </NavLink>


                    {/* CTA */}

                    <NavLink
                        to="/contactai"
                        onClick={closeMenu}
                        className="ai-navbar-cta"
                    >
                        Get Started
                    </NavLink>

                </nav>


                {/* =====================================================
                    MOBILE HAMBURGER
                ===================================================== */}

                <button
                    type="button"
                    className={
                        menuOpen
                            ? "ai-mobile-menu-button open"
                            : "ai-mobile-menu-button"
                    }
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >

                    <span></span>
                    <span></span>
                    <span></span>

                </button>

            </div>

        </header>
    );
};

export default NavbarAI;