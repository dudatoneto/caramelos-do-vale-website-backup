import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
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

  const handleNavClick = (label) => {
    ReactGA.event({
      category: "navigation",
      action: "click_footer_navigation",
      label: label,
    });
  };

  return (
    <footer>
      <div className="footer-left">
        <img
          className="logo img-footer"
          src="logo-caramelos-do-vale.png"
          alt="Imagem do logo da Associação Caramelos do Vale"
        />

        <div>
          <a
            href="https://www.instagram.com/caramelosdovale/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              ReactGA.event({
                category: "social",
                action: "click_footer_instagram",
              })
            }
          >
            <FontAwesomeIcon icon={faInstagram} className="icon footer-icon" />
          </a>

          <a
            href="https://www.tiktok.com/@caramelosdovale"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              ReactGA.event({
                category: "social",
                action: "click_footer_tiktok",
              })
            }
          >
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
                <Link
                  key={path}
                  to={path}
                  className="link nav-footer-link"
                  onClick={() => handleNavClick(label)}
                >
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
