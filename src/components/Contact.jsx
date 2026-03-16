import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import ReactGA from "react-ga4";

const Contact = () => {
  // evento: visualização da página de contato
  useEffect(() => {
    ReactGA.event({
      category: "contact",
      action: "view_contact_page",
    });
  }, []);

  return (
    <main>
      <section className="contact">
        <h1>Ficou com alguma dúvida? Fale com a gente!</h1>

        <section className="small-margin">
          <FontAwesomeIcon icon={faWhatsapp} size="6x" />
          <br />
          <a
            className="button-primary xsmall-margin"
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/5551991084114?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20a%20Associação%20Caramelos%20do%20Vale"
            onClick={() =>
              ReactGA.event({
                category: "contact",
                action: "click_whatsapp_contact",
              })
            }
          >
            Fale com a gente por WhatsApp
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </a>
        </section>

        <section className="small-margin">
          <FontAwesomeIcon icon={faInstagram} size="6x" />
          <br />
          <a
            className="button-primary xsmall-margin"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/caramelosdovale"
            onClick={() =>
              ReactGA.event({
                category: "contact",
                action: "click_instagram_contact",
              })
            }
          >
            Fale com a gente por Instagram
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </a>
        </section>

        <section className="small-margin">
          <FontAwesomeIcon icon={faEnvelope} size="6x" />
          <div className="xsmall-margin">
            <p>Fale com a gente por Email</p>

            <a
              href="mailto:caramelosdovale@gmail.com"
              onClick={() =>
                ReactGA.event({
                  category: "contact",
                  action: "click_email_contact",
                })
              }
            >
              caramelosdovale@gmail.com
            </a>
          </div>
        </section>

        <div className="contact-img contact-img1">
          <img
            className="image8 img-round"
            src="contact1.jpg"
            alt="Imagem do cão de nome Timóteo"
          />
          <p className="contact-img-description contact-description1">
            O Timóteo vai esclarecer todas as suas dúvidas💛
          </p>
        </div>

        <div className="contact-img contact-img2">
          <img
            className="image9 img-round"
            src="contact2.jpg"
            alt="Imagem do cão de nome Lobo"
          />
          <p className="contact-img-description contact-description2">
            O Lobo vai estar pronto para responder suas perguntas 🐾
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
