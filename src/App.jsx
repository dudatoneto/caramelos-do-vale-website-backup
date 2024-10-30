import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Volunteering from "./components/Volunteering.jsx";
import Contact from "./components/Contact.jsx";
import Donations from "./components/Donations.jsx";

const App = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  // Toggle mobile menu on click
  const handleMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleResize = () => {
    if (window.innerWidth > 850) {
      setMobileMenu(false);
    }
  };

  useEffect(() => {
    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Run once on mount

  return (
    <>
      <Header menuToggleHandler={handleMenuToggle} mobileMenu={mobileMenu} />
      {!mobileMenu && (
        <>
          <Routes>
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/volunteering" element={<Volunteering />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donations" element={<Donations />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
