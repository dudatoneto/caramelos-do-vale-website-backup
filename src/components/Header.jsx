import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = ({ menuToggleHandler, mobileMenu }) => {
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
          <Link
            to="/donations"
            className="link nav-desktop-link button-primary"
          >
            Como Ajudar
          </Link>
          <Link to="/about-us" className="link nav-desktop-link">
            Sobre Nós
          </Link>
          <Link to="/for-adoption" className="link nav-desktop-link">
          Adoção e Apadrinhamento
          </Link>
          <Link to="/shop" className="link nav-desktop-link">
            Loja
          </Link>
          <Link to="/events" className="link nav-desktop-link">
            Eventos
          </Link>
          <Link to="/volunteering" className="link nav-desktop-link">
            Voluntariado
          </Link>
          <Link to="/contact" className="link nav-desktop-link">
            Contato
          </Link>
        </nav>
        <div className="burger">
          {!mobileMenu ? (
            <FontAwesomeIcon
              icon={faBars}
              size="3x"
              className="icon burger-icon"
              onClick={menuToggleHandler}
            />
          ) : (
            <FontAwesomeIcon
              icon={faXmark}
              size="3x"
              className="icon burger-icon"
              onClick={menuToggleHandler}
            />
          )}
        </div>
      </header>

      {mobileMenu && (
        <main className="menu-mobile">
          <nav className="nav-mobile">
            <Link
              to="/donations"
              className="link nav-mobile-link button-primary"
              onClick={menuToggleHandler}
            >
              Como Ajudar
            </Link>
            <Link
              to="/about-us"
              className="link nav-mobile-link"
              onClick={menuToggleHandler}
            >
              Sobre Nós
            </Link>
            <Link
              to="/for-adoption"
              className="link nav-mobile-link"
              onClick={menuToggleHandler}
            >
            Adoção e Apadrinhamento
            </Link>
            <Link
              to="/shop"
              className="link nav-mobile-link"
              onClick={menuToggleHandler}
            >
              Loja
            </Link>
            <Link
              to="/events"
              className="link nav-mobile-link"
              onClick={menuToggleHandler}
            >
              Eventos
            </Link>
            <Link
              to="/volunteering"
              className="link nav-mobile-link"
              onClick={menuToggleHandler}
            >
              Voluntariado
            </Link>
            <Link
              to="/contact"
              className="link nav-mobile-link"
              onClick={menuToggleHandler}
            >
              Contato
            </Link>
          </nav>
        </main>
      )}
    </>
  );
};

export default Header;
