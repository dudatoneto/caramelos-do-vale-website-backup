import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const navLinks = [
    { path: "/", label: "Página Inicial", bold: true },
    { path: "/about-us", label: "Sobre Nós" },
    { path: "/for-adoption", label: "Adoção e Apadrinhamento" },
    { path: "/donations", label: "Como Ajudar" },
    { path: "/volunteering", label: "Voluntariado" },
    { path: "/shop", label: "Loja" },
    { path: "/events", label: "Eventos" },
    { path: "/contact", label: "Contato" },
  ];

  return (
    <footer>
      <div className="footer-left">
        <img
          className="logo img-footer"
          src="logo-caramelos-do-vale.png"
          alt="Imagem do logo da Associação Caramelos do Vale"
        />
        <div>
          <a href="https://www.instagram.com/caramelosdovale/">
            <FontAwesomeIcon icon={faInstagram} className="icon footer-icon" />
          </a>
          <a href="https://www.tiktok.com/@caramelosdovale">
            <FontAwesomeIcon icon={faTiktok} className="icon footer-icon" />
          </a>
        </div>
      </div>
      <div className="footer-right">
        {[0, 4].map((startIndex) => (
          <nav key={startIndex} className="nav-footer">
            {navLinks
              .slice(startIndex, startIndex + 4)
              .map(({ path, label, bold }) => (
                <Link key={path} to={path} className="link nav-footer-link">
                  {bold ? <b>{label}</b> : label}
                </Link>
              ))}
          </nav>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
