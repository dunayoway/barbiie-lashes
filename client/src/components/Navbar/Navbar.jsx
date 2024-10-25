import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = ({ className, onLinkClick }) => {
  return (
    <>
      {/* Nav Start */}
      <nav className={`nav ${className}`}>
        <ul className="nav__list">
          <li onClick={onLinkClick} className="nav__item">
            <NavLink className="nav__link" to="/">
              Home
            </NavLink>
          </li>
          <li onClick={onLinkClick} className="nav__item">
            <NavLink className="nav__link" to="/#about">
              About
            </NavLink>
          </li>
          <li onClick={onLinkClick} className="nav__item">
            <NavLink className="nav__link" to="/#service">
              Services
            </NavLink>
          </li>
          <li onClick={onLinkClick} className="nav__item">
            <NavLink className="nav__link" to="/gallery">
              Gallery
            </NavLink>
          </li>
          <li onClick={onLinkClick} className="nav__item">
            <a className="nav__link" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      {/* Nav End */}
    </>
  );
};

export default Navbar;
