import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = ({ menuToggleHandler, mobileMenu }) => {
  return (
    <>
      <header>
        <img
          className="logo img-header"
          src="../src/images/logo-caramelos-do-vale.png"
          alt="Imagem do logo da Associação Caramelos do Vale"
        />
        <nav className="nav-desktop">
          <a className="button">Como Ajudar</a>
          <a>Sobre Nós</a>
          <a>Animais para Adoção</a>
          <a>Loja</a>
          <a>Eventos</a>
          <a>Voluntariado</a>
          <a>Contato</a>
        </nav>
        <div className="burger">
          {!mobileMenu ? (
            <FontAwesomeIcon
              icon={faBars}
              className="icon burger-icon"
              onClick={menuToggleHandler}
            />
          ) : (
            <FontAwesomeIcon
              icon={faXmark}
              className="icon burger-icon"
              onClick={menuToggleHandler}
            />
          )}
        </div>
      </header>

      {mobileMenu && (
        <main className="menu-mobile">
          <nav className="nav-mobile">
            <a>Como Ajudar</a>
            <a>Sobre Nós</a>
            <a>Animais para Adoção</a>
            <a>Loja</a>
            <a>Eventos</a>
            <a>Voluntariado</a>
            <a>Contato</a>
          </nav>
        </main>
      )}
    </>
  );
};

export default Header;
