import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="footer-left">
        <img
          className="logo img-footer"
          src="../src/images/logo-caramelos-do-vale.png"
          alt="Imagem do logo da Associação Caramelos do Vale"
        />
        <div>
          <a>
            <FontAwesomeIcon icon={faInstagram} className="icon footer-icon" />
          </a>
          <a>
            <FontAwesomeIcon icon={faTiktok} className="icon footer-icon" />
          </a>
        </div>
      </div>
      <div className="footer-right">
        <nav className="nav-footer">
          <a>
            <b>Página Inicial</b>
          </a>
          <a>Como Ajudar</a>
          <a>Sobre Nós</a>
          <a>Animais para Adoção</a>
        </nav>
        <nav className="nav-footer">
          <a>Loja</a>
          <a>Eventos</a>
          <a>Voluntariado</a>
          <a>Contato</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
