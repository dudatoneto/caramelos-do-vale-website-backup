import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./styles.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Volunteering from "./components/Volunteering.jsx";
import Contact from "./components/Contact.jsx";
import Donations from "./components/Donations.jsx";
import ForAdoption from "./components/ForAdoption.jsx";
import PetDetails from "./components/PetDetails.jsx";
import Shop from "./components/Shop.jsx";
import Home from "./components/Home.jsx";

const App = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); // Track location changes

  // Toggle mobile menu on click
  const handleMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleResize = () => {
    if (window.innerWidth > 950) {
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
  }, []);

  useEffect(() => {
    const targetElement = document.getElementById("root");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location]);

  return (
    <>
      <Header menuToggleHandler={handleMenuToggle} mobileMenu={mobileMenu} />
      {!mobileMenu && (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="for-adoption" element={<ForAdoption />} />
            <Route path="/for-adoption/:id" element={<PetDetails />} />
            <Route path="/volunteering" element={<Volunteering />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
