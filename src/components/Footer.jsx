import React from "react";
import { Link } from "react-router-dom";
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
          <b>
            <Link to="/" className="link nav-footer-link">
              Página Inicial
            </Link>
          </b>
          <Link to="/donations" className="link nav-footer-link">
            Como Ajudar
          </Link>
          <Link to="/about-us" className="link nav-footer-link">
            Sobre Nós
          </Link>
          <Link to="/for-adoption" className="link nav-footer-link">
            Animais para Adoção
          </Link>
        </nav>
        <nav className="nav-footer">
          <Link to="/shop" className="link nav-footer-link">
            Loja
          </Link>
          <Link to="/events" className="link nav-footer-link">
            Eventos
          </Link>
          <Link to="/volunteering" className="link nav-footer-link">
            Volunteering
          </Link>
          <Link to="/contact" className="link nav-footer-link">
            Contato
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
