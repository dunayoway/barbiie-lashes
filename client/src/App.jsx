import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import logo from "./assets/images/logo.png";
import Navbar from "./components/Navbar/Navbar";
import Gallery from "./pages/Gallery/Gallery";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [renderNavbar, setRenderNavbar] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setTimeout(() => setRenderNavbar(false), 500);
    } else {
      setRenderNavbar(true);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClick = () => {
    if (isMenuOpen) {
      setTimeout(() => setRenderNavbar(false), 500);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <Router>
        {/* Header Starts Here */}
        <header className="header">
          <div className="container">
            <div className="row flex-wrap md:flex-nowrap">
              {/* Logo */}
              <Link to="/">
                <img className="logo" src={logo} alt="logo" />
              </Link>
              {/* Desktop Navbar */}
              <Navbar className="hidden md:block" />
              <div className="flex gap-6">
                <Link to="/#booking" className="nav-btn flex-1">
                  Book Now
                </Link>
                {/* Menu Icon */}
                <button className="md:hidden" onClick={toggleMenu}>
                  {isMenuOpen ? (
                    <i className="fa-solid fa-x menu-icon"></i>
                  ) : (
                    <i className="fa-solid fa-bars-staggered menu-icon"></i>
                  )}
                </button>
              </div>
              {/* Mobile  Navbar With Transition */}
              <div
                className={`basis-full md:hidden navbar-container ${
                  isMenuOpen ? "show" : ""
                }`}
              >
                {renderNavbar && <Navbar onLinkClick={navLinkClick} />}
              </div>
            </div>
          </div>
        </header>
        {/* Header Ends Here */}

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>

        {/* Footer Start */}
        <footer className="footer">
          <div id="contact" className="container mb-[100px]">
            <div className="footer-address">
              <h3>Contact Us</h3>
              <p className="flex items-center gap-[5px]">
                <ion-icon name="location-outline"></ion-icon> Shop 307B DBB
                Plaza, Gwarinpa, Abuja
              </p>
              <a href="tel:+2348125181154">
                <ion-icon name="call-outline"></ion-icon> 08125181154
              </a>
            </div>
            <div className="footer-social">
              <a
                href="https://wa.me/2348125181154?text=Hi%20Barbiie%21%20I%20just%20visited%20your%20website%20and%20I%E2%80%99m%20interested%20in%20[kindly%20mention%20the%20specific%20service%2C%20if%20applicable].%20Could%20you%20provide%20me%20with%20more%20information%3F%20Thank%20you%21"
                target="_blank"
                className="social-icon"
              >
                <ion-icon name="logo-whatsapp"></ion-icon> 08125181154
              </a>
              <a
                href="https://www.instagram.com/barbiielashes_abuja?igsh=b3VuZDZwdzl6OGVv"
                target="_blank"
                className="social-icon"
              >
                <ion-icon name="logo-instagram"></ion-icon> barbiielashes_abuja
              </a>
            </div>
          </div>
          <div className="container">
            <hr className="outline-0 border border-[#F7E7CE50]" />
          </div>
          <div className="container row py-4">
            <p className="footer__text">Copyright &copy; 2024 Barbiie Lashes</p>
          </div>
        </footer>
        {/* Footer End */}
      </Router>
    </>
  );
}

export default App;
