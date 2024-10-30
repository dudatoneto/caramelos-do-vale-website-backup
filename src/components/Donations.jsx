import React from "react";
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
  return (
    <main>
      <h1 className="title">E como posso ajudar os Caramelos do Vale?</h1>
      <section class="large-margin">
        <div class="donation">
          <div class="donation-title">
            <h2>Doações recorrentes através da plataforma APOIA.se</h2>
            <img
              class="logo"
              src="../src/images/apoia-se.png"
              alt="Imagem do logo da plataforma APOIA.se"
            />
          </div>
          <p class="donation-description">
            Agora você pode ajudar também por meio de doação recorrente na
            plataforma Apoia.se. Estamos com uma campanha de contribuição
            mensal, que vai nos ajudar a garantir o mínimo em caixa para cuidar
            dos nossos resgatados e cobrir nossas despesas gerais. Considere se
            tornar um apoiador a partir de R$ 3,00 por mês!
          </p>
        </div>
        <a
          class="button"
          target="_blank"
          rel="noopener noreferrer"
          href="https://apoia.se/caramelosdovale"
        >
          Página dos Caramelos do Vale no APOIA.se
          <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
        </a>
      </section>
      <section class="large-margin">
        <div class="donation">
          <div class="donation-title">
            <h2>Doações diretamente para a Associação Caramelos do Vale</h2>
            <img
              class="logo"
              src="../src/images/logo-caramelos-do-vale.png"
              alt="Imagem do logo da Associação Caramelos do Vale"
            />
          </div>
          <p class="donation-description">
            Você pode contribuir com qualquer valor que desejar fazendo uma
            doação via Pix. Sua ajuda é fundamental para que possamos continuar
            nosso trabalho, já que cada animal resgatado gera despesas
            significativas, como custos com tratamento veterinário, exames,
            vacinas, castração, além de outros cuidados essenciais. Cada doação
            faz a diferença e nos ajuda a oferecer uma vida melhor para esses
            animais em situação de vulnerabilidade.
          </p>
        </div>
        <div class="donation-pix">
          <p>Chaves Pix para doar:</p>
          <p>
            <b>E-mail: </b>
            <span className="little-text">pix@caramelosdovale.com.br</span>
          </p>
          <p>
            <b>CNPJ:</b> 56.319.404/0001-05
          </p>
        </div>
      </section>
      <section class="large-margin">
        <div class="donation">
          <div class="donation-title">
            <h2>Lar Temporário</h2>
            <FontAwesomeIcon
              icon={faHouse}
              size="10x"
              className="icon donation-icon"
            />
          </div>
          <p class="donation-description">
            Abra seu coração! Quem sabe a sua casa possa ser o lugar onde eles
            vão finalmente se sentir completos e amados.
          </p>
        </div>
        <a
          class="button"
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfSMe661hJb0e4IzO7U-Xp-cN7bgngpna8lLutbdKjt6onCQA/viewform"
        >
          Formulário para lar temporário
          <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
        </a>
      </section>
      <section class="large-margin">
        <div class="donation">
          <div class="donation-title">
            <h2>Apadrinhamento</h2>
            <FontAwesomeIcon
              icon={faHeart}
              size="10x"
              className="icon donation-icon"
            />
          </div>
          <p class="donation-description">
            Ao apadrinhar um de nossos animais, você contribui diretamente para
            o bem-estar dele, ajudando a cobrir despesas como alimentação,
            cuidados veterinários, vacinas, e muito mais. Mesmo que não possa
            adotar, essa é uma maneira de fazer a diferença na vida de um animal
            resgatado.
          </p>
        </div>
        <a
          class="button"
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/5551991084114?text=Olá,%20gostaria%20de%20apadrinhar%20um%20animal%20da%20Associação%20Caramelos%20do%20Vale"
        >
          Fale com a gente por WhatsApp
          <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
        </a>
      </section>
      <section class="large-margin">
        <div class="donation">
          <div class="donation-title">
            <h2>Doadores de Sangue</h2>
            <FontAwesomeIcon
              icon={faDroplet}
              size="10x"
              className="icon donation-icon"
            />
          </div>
          <div class="donation-description">
            <p>
              Ao apadrinhar um de nossos animais, você contribui diretamente
              para o bem-estar dele, ajudando a cobrir despesas como
              alimentação, cuidados veterinários, vacinas, e muito mais. Mesmo
              que não possa adotar, essa é uma maneira de fazer a diferença na
              vida de um animal resgatado.
            </p>
            <p>Os pré-requisitos para um cão ser doador são:</p>
            <p>- Mínimo 20kg;</p>
            <p>- Vacinado e saudável;</p>
            <p>- Sem doenças ou cirurgias recentes;</p>
            <p>- De 1 a 8 anos.</p>
          </div>
        </div>
        <a
          class="button"
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.google.com/forms/d/1eUfCyNhckDq1DistBkEfSu-m5N3DR9YH0fjFBoKFKTg/viewform?edit_requested=true"
        >
          Formulário para o cadastro de cães doadores de sangue
          <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
        </a>
      </section>
      <section class="large-margin">
        <div class="donation">
          <div class="donation-title">
            <h2>Participe dos nossos eventos e campanhas</h2>
            <FontAwesomeIcon
              icon={faCalendarDays}
              size="10x"
              className="icon donation-icon"
            />
          </div>
          <p class="donation-description">
            Venha participar de nossos cafés, feiras de adoção e muitos outros
            eventos! Além de conhecer os animais resgatados e apoiar a causa,
            você pode adquirir produtos incríveis da nossa associação. Todo o
            valor arrecadado com as vendas é revertido para ajudar no cuidado e
            tratamento dos nossos peludos.
          </p>
        </div>
        <a
          class="button"
          target="_blank"
          rel="noopener noreferrer"
          href="https://caramelosdovale/eventos"
        >
          Confira nossa página de eventos
          <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
        </a>
      </section>
      <section class="large-margin">
        <div class="donation">
          <div class="donation-title">
            <h2>Parcerias</h2>
            <FontAwesomeIcon
              icon={faHandshake}
              size="10x"
              className="icon donation-icon"
            />
          </div>
          <div class="donation-description">
            <p>
              Se você ou sua empresa desejam contribuir para nossa causa,
              existem diversas formas de parcerias:
            </p>
            <p>- Atendimento veterinário;</p>
            <p>
              - Destinar uma porcentagem das vendas de produtos a favor da
              Caramelos do Vale;
            </p>
            <p>- Eventos e campanhas conjuntas;</p>
            <p>- Doação de produtos da empresa.</p>
          </div>
        </div>
        <a
          class="button"
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/5551991084114?text=Olá,%20gostaria%20de%20realizar%20uma%20parceria%20da%20minha%20empresa%20com%20a%20Associação%20Caramelos%20do%20Vale"
        >
          Fale com a gente por WhatsApp
          <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
        </a>
      </section>
    </main>
  );
};

export default Donations;
