import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = ({ menuToggleHandler, mobileMenu, currentLocation }) => {
  const navLinks = [
    { path: "/donations", label: "Como Ajudar" },
    { path: "/about-us", label: "Sobre Nós" },
    { path: "/for-adoption", label: "Adoção e Apadrinhamento", isParent: true },
    { path: "/shop", label: "Loja" },
    { path: "/events", label: "Eventos" },
    { path: "/volunteering", label: "Voluntariado" },
    { path: "/contact", label: "Contato" },
  ];

  const isActive = (path, isParent = false) => {
    return isParent
      ? currentLocation.startsWith(path)
      : currentLocation === path;
  };

  return (
    <>
      <header>
        <Link to="/">
          <img
            className="img-header"
            src="logo-caramelos-do-vale.png"
            alt="Imagem do logo da Associação Caramelos do Vale"
          />
        </Link>
        <nav className="nav-desktop">
          {navLinks.map(({ path, label, isParent }) => (
            <Link
              key={path}
              to={path}
              className={`link nav-desktop-link ${
                isActive(path, isParent) ? "button-primary" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="burger">
          <FontAwesomeIcon
            icon={mobileMenu ? faXmark : faBars}
            size="3x"
            className="icon burger-icon"
            onClick={menuToggleHandler}
          />
        </div>
      </header>

      {mobileMenu && (
        <main className="menu-mobile">
          <nav className="nav-mobile">
            {navLinks.map(({ path, label, isParent }) => (
              <Link
                key={path}
                to={path}
                className={`link nav-mobile-link ${
                  isActive(path, isParent) ? "button-primary" : ""
                }`}
                onClick={menuToggleHandler}
              >
                {label}
              </Link>
            ))}
          </nav>
        </main>
      )}
    </>
  );
};

export default Header;
