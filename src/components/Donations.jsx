import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faHeart,
  faDroplet,
  faCalendarDays,
  faHandshake,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Donations = () => {
  useEffect(() => {
    ReactGA.event({
      category: "donations",
      action: "view_donations_page",
    });
  }, []);

  return (
    <main>
      <h1 className="title">E como posso ajudar os Caramelos do Vale?</h1>

      <section className="large-margin">
        <div className="donation">
          <div className="donation-title">
            <h2>Doações recorrentes através da plataforma APOIA.se</h2>
            <img
              className="logo"
              src="apoia-se.png"
              alt="Imagem do logo da plataforma APOIA.se"
            />
          </div>

          <div className="donation-description">
            <p>
              Agora você pode ajudar também por meio de doação recorrente na
              plataforma Apoia.se...
            </p>

            <a
              className="button-primary"
              target="_blank"
              rel="noopener noreferrer"
              href="https://apoia.se/caramelosdovale"
              onClick={() =>
                ReactGA.event({
                  category: "donations",
                  action: "click_apoia_se",
                })
              }
            >
              Página dos Caramelos do Vale no APOIA.se
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </a>
          </div>
        </div>
      </section>

      <section className="large-margin">
        <div className="donation">
          <div className="donation-title">
            <h2>Doações diretamente para a Associação Caramelos do Vale</h2>
            <img
              className="logo"
              src="logo-caramelos-do-vale.png"
              alt="Imagem do logo da Associação Caramelos do Vale"
            />
          </div>

          <p
            className="donation-description"
            onMouseEnter={() =>
              ReactGA.event({
                category: "donations",
                action: "view_pix_info",
              })
            }
          >
            Você pode contribuir com qualquer valor que desejar fazendo uma
            doação via Pix...
          </p>
        </div>

        <div className="donation-pix">
          <p>Chaves Pix para doar:</p>
          <p>
            <b>E-mail: </b>
            <span className="little-text">pix@caramelosdale.com.br</span>
          </p>
          <p>
            <b>CNPJ:</b> 56.319.404/0001-05
          </p>
        </div>
      </section>

      <section className="large-margin">
        <div className="donation">
          <div className="donation-title">
            <h2>Lar Temporário</h2>
            <FontAwesomeIcon
              icon={faHouse}
              size="10x"
              className="icon donation-icon"
            />
          </div>

          <div className="donation-description">
            <p>
              Abra seu coração! Quem sabe a sua casa possa ser o lugar onde eles
              vão finalmente se sentir completos e amados.
            </p>

            <a
              className="button-primary"
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfSMe661hJb0e4IzO7U-Xp-cN7bgngpna8lLutbdKjt6onCQA/viewform"
              onClick={() =>
                ReactGA.event({
                  category: "donations",
                  action: "click_foster_form",
                })
              }
            >
              Formulário para lar temporário
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </a>
          </div>
        </div>
      </section>

      <section className="large-margin">
        <div className="donation">
          <div className="donation-title">
            <h2>Apadrinhamento</h2>
            <FontAwesomeIcon
              icon={faHeart}
              size="10x"
              className="icon donation-icon"
            />
          </div>

          <div className="donation-description">
            <p>Ao apadrinhar um de nossos animais...</p>

            <a
              className="button-primary"
              target="_blank"
              rel="noopener noreferrer"
              href="https://wa.me/5551991084114?text=Olá,%20gostaria%20de%20apadrinhar%20um%20animal"
              onClick={() =>
                ReactGA.event({
                  category: "donations",
                  action: "click_sponsorship_whatsapp",
                })
              }
            >
              Fale com a gente por WhatsApp
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </a>
          </div>
        </div>
      </section>

      <section className="large-margin">
        <div className="donation">
          <div className="donation-title">
            <h2>Doadores de Sangue</h2>
            <FontAwesomeIcon
              icon={faDroplet}
              size="10x"
              className="icon donation-icon"
            />
          </div>

          <div className="donation-description">
            <p>Seu cão pode ser um super herói!</p>

            <a
              className="button-primary"
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/forms/d/1eUfCyNhckDq1DistBkEfSu-m5N3DR9YH0fjFBoKFKTg/viewform"
              onClick={() =>
                ReactGA.event({
                  category: "donations",
                  action: "click_blood_donor_form",
                })
              }
            >
              Formulário para o cadastro de cães doadores de sangue
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </a>
          </div>
        </div>
      </section>

      <section className="large-margin">
        <div className="donation">
          <div className="donation-title">
            <h2>Participe dos nossos eventos e campanhas</h2>
            <FontAwesomeIcon
              icon={faCalendarDays}
              size="10x"
              className="icon donation-icon"
            />
          </div>

          <div className="donation-description">
            <p>Venha participar de nossos cafés e feiras de adoção!</p>

            <Link
              to="/events"
              className="link button-primary"
              onClick={() =>
                ReactGA.event({
                  category: "donations",
                  action: "click_events_page",
                })
              }
            >
              Confira nossa página de eventos
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </Link>
          </div>
        </div>
      </section>

      <section className="large-margin">
        <div className="donation">
          <div className="donation-title">
            <h2>Parcerias</h2>
            <FontAwesomeIcon
              icon={faHandshake}
              size="10x"
              className="icon donation-icon"
            />
          </div>

          <div className="donation-description">
            <p>Se você ou sua empresa desejam contribuir...</p>

            <a
              className="button-primary"
              target="_blank"
              rel="noopener noreferrer"
              href="https://wa.me/5551991084114?text=Olá,%20gostaria%20de%20realizar%20uma%20parceria"
              onClick={() =>
                ReactGA.event({
                  category: "donations",
                  action: "click_partnership_whatsapp",
                })
              }
            >
              Fale com a gente por WhatsApp
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Donations;
