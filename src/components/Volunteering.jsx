import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faMugHot,
  faMobileScreenButton,
  faHouse,
  faHandshake,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Volunteering = () => {
  return (
    <main>
      <section>
        <h2>
          Você ama animais e quer ajudar de alguma forma? Seja um voluntário
          dedicado a transformar vidas!
        </h2>
        <p className="description-title">
          Precisamos da sua força nos bastidores:
        </p>
        <section className="small-margin medium-width-p">
          <FontAwesomeIcon icon={faCarSide} size="6x" />
          <h3 className="icon-title">Transporte de Animais</h3>
          <p>
            Ajude a transportar nossos aumigos a lares temporários, sítio e
            clínica veterinária.
          </p>
          <a
            className="button-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/1tuDtWfqGCTWIJC2AnsDsrJr4a3y1IYpsU2MPc3zIjNQ/viewform?edit_requested=true"
          >
            Formulário para voluntários
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </a>
        </section>
        <section className="small-margin medium-width-p">
          <FontAwesomeIcon icon={faMugHot} size="6x" />
          <h3 className="icon-title">
            Participação e doação de comida para os Cafés
          </h3>
          <p>
            Doe lanchinhos e ajude na venda dos cafés no campus e eventos
            externos, que são um recurso muito importante para nossa causa.
          </p>
          <a
            className="button-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/1tuDtWfqGCTWIJC2AnsDsrJr4a3y1IYpsU2MPc3zIjNQ/viewform?edit_requested=true"
          >
            Formulário para voluntários
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </a>
        </section>
        <section className="small-margin medium-width-p">
          <FontAwesomeIcon icon={faMobileScreenButton} size="6x" />
          <h3 className="icon-title">Mídias Sociais</h3>
          <p>
            Use sua criatividade para dar voz aos que não podem falar, ajudando
            nas redes.
          </p>
          <a
            className="button-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/1tuDtWfqGCTWIJC2AnsDsrJr4a3y1IYpsU2MPc3zIjNQ/viewform?edit_requested=true"
          >
            Formulário para voluntários
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </a>
        </section>
        <section className="small-margin medium-width-p">
          <FontAwesomeIcon icon={faHouse} size="6x" />
          <h3 className="icon-title">Lar Temporário</h3>
          <p>
            Que tal abrir um espacinho para um dos nossos aumigos aí na sua
            casa?
          </p>
          <a
            className="button-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfSMe661hJb0e4IzO7U-Xp-cN7bgngpna8lLutbdKjt6onCQA/viewform"
          >
            Formulário para lar temporário
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </a>
        </section>
        <section className="small-margin medium-width-p">
          <FontAwesomeIcon icon={faHandshake} size="6x" />
          <h3 className="icon-title">Parcerias</h3>
          <p>
            Se você ou sua empresa desejam contribuir para nossa causa, existem
            diversas formas de parcerias:
          </p>
          <p>- Atendimento veterinário;</p>
          <p>
            - Destinar uma porcentagem das vendas de produtos a favor da
            Caramelos do Vale;
          </p>
          <p>- Eventos e campanhas conjuntas;</p>
          <p>- Doação de produtos da empresa.</p>
          <a
            className="button-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/5551991084114?text=Olá,%20gostaria%20de%20realizar%20uma%20parceria%20da%20minha%20empresa%20com%20a%20Associação%20Caramelos%20do%20Vale"
          >
            Fale com a gente por WhatsApp
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </a>
        </section>
        <h2 className="title-end">Ficou com alguma dúvida?</h2>
        <a
          className="button-primary"
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/5551991084114?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20sobre%20a%20Associação%20Caramelos%20do%20Vale"
        >
          Fale com a gente por WhatsApp
          <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
        </a>
      </section>
    </main>
  );
};

export default Volunteering;
