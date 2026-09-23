import { NavLink, Link, Outlet } from "react-router-dom";
import React, { useState } from "react";

const Navbar=()=>{

    const [menuOpen, setMenuOpen] = useState(false);


// ===================================================================================================
//                                          CLOSE MOBILE MENU
// ===================================================================================================

    const closeMenu=()=>{ setMenuOpen(false); };

    return(
        <>

            <header className="main-navbar">
                <div className="navbar-container">

{/* ============================================================================================== */}
                                                {/* LOGO */}
{/* ============================================================================================== */}

                <Link to="/" className="company-logo" onClick={closeMenu} >

                    <div className="logo-symbol">
                        LN
                    </div>

                    <div className="logo-text">
                        <strong>
                            LAKSHMI NARAYAN
                        </strong>

                        <span>
                            AND COMPANY
                        </span>
                    </div>

                </Link>



{/* =============================================================================================== */}
{/*                                         DESKTOP NAVIGATION                                      */}
{/* =============================================================================================== */}

                <nav className="desktop-navigation">

                    <NavLink to="/" className={({ isActive })=> isActive ? "nav-link active": "nav-link"}>
                        Home
                    </NavLink>

                    <NavLink to="/about-us" className={({ isActive })=> isActive ? "nav-link active": "nav-link"}>
                        About Us
                    </NavLink>

                    <NavLink to="/services" className={({ isActive })=> isActive ? "nav-link active": "nav-link"}>
                        Services
                    </NavLink>

                    <NavLink to="/our-work" className={({ isActive })=> isActive ? "nav-link active": "nav-link"}>
                        Our Work
                    </NavLink>

                    <NavLink to="/blog" className={({ isActive })=> isActive ? "nav-link active": "nav-link"}>
                        Blog
                    </NavLink>

                    <NavLink to="/faq" className={({ isActive })=> isActive ? "nav-link active": "nav-link"}>
                        FAQ
                    </NavLink>

                    <NavLink to="/contact" className={({ isActive })=> isActive ? "nav-link active": "nav-link"}>
                        Contact
                    </NavLink>

                </nav>

{/* =============================================================================================== */}
{/*                                             DESKTOP CTA                                         */}
{/* =============================================================================================== */}

                <div className="navbar-action">

                    <Link to="/contact" className="navbar-cta" >
                        Get Started

                        <span>
                            →
                        </span>

                    </Link>
                </div>

{/* =============================================================================================== */}
{/*                                          MOBILE HAMBURGER                                       */}
{/* =============================================================================================== */}

                <button className={ menuOpen ? "hamburger-button open": "hamburger-button"} onClick={()=> setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen} >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

            </div>

{/* =============================================================================================== */}
{/*                                         MOBILE NAVIGATION                                       */}
{/* =============================================================================================== */}

            <div className={menuOpen ? "mobile-navigation open": "mobile-navigation"}>

                <NavLink to="/" onClick={closeMenu} className={({ isActive })=> isActive ? "mobile-nav-link active": "mobile-nav-link"}>
                    <span>
                        Home
                    </span>

                    <span>
                        →
                    </span>
                </NavLink>

                <NavLink to="/about-us" onClick={closeMenu} className={({ isActive })=> isActive ? "mobile-nav-link active": "mobile-nav-link"}>

                    <span>
                        About Us
                    </span>

                    <span>
                        →
                    </span>

                </NavLink>

                <NavLink to="/services" onClick={closeMenu} className={({ isActive })=> isActive ? "mobile-nav-link active": "mobile-nav-link"}>

                    <span>
                        Services
                    </span>

                    <span>
                        →
                    </span>

                </NavLink>

                <NavLink to="/our-work" onClick={closeMenu} className={({ isActive })=> isActive ? "mobile-nav-link active": "mobile-nav-link"}>

                    <span>
                        Our Work
                    </span>

                    <span>
                        →
                    </span>

                </NavLink>

                <NavLink to="/blog" onClick={closeMenu} className={({ isActive })=> isActive ? "mobile-nav-link active": "mobile-nav-link"}>

                    <span>
                        Blog
                    </span>

                    <span>
                        →
                    </span>

                </NavLink>

                <NavLink to="/faq" onClick={closeMenu} className={({ isActive })=> isActive ? "mobile-nav-link active": "mobile-nav-link"}>

                    <span>
                        FAQ
                    </span>

                    <span>
                        →
                    </span>

                </NavLink>

                <NavLink to="/contact" onClick={closeMenu} className={({ isActive })=> isActive ? "mobile-nav-link active": "mobile-nav-link"}>

                    <span>
                        Contact
                    </span>

                    <span>
                        →
                    </span>

                </NavLink>

                <Link to="/contact" onClick={closeMenu} className="mobile-cta" >

                    Start Your Project

                    <span>
                        →
                    </span>

                </Link>
            </div>
            
        </header>

        </>
    );

}
export default Navbar;