import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faSuitcaseMedical,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  return (
    <main id="main">
      <section className="about-us large-margin">
        <img
          className="image1"
          src="../src/images/about-us1.jpg"
          alt="Foto da nossa voluntária Amanda com um dos cães sob cuidado do projeto"
        />
        <div className="description">
          <h1>Sobre Nós 🐾</h1>
          <p>
            Caramelos do Vale é uma ONG dedicada à proteção e ao cuidado de
            animais em situação de abandono e vulnerabilidade. Fundada com o
            objetivo de criar um mundo mais compassivo e responsável, nossa
            missão é resgatar, tratar e encontrar lares amorosos para animais
            que precisam de ajuda. Com o apoio de voluntários dedicados e
            doadores generosos, seguimos firmes em nossa luta para dar voz e
            esperança a esses seres indefesos, promovendo ações e campanhas que
            fazem a diferença.
          </p>
        </div>
      </section>
      <section className="large-margin">
        <div className="numbers">
          <div>
            <FontAwesomeIcon icon={faHeart} size="4x" className="icon" />
            <p>
              <b>89</b>
            </p>
            <p>Adoções</p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faSuitcaseMedical}
              size="4x"
              className="icon"
            />
            <p>
              <b>172</b>
            </p>
            <p>Resgates</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faHouse} size="4x" className="icon" />
            <p>
              <b>27</b>
            </p>
            <p>Animais atualmente em nossos cuidados</p>
          </div>
        </div>
        <p className="detail">
          *alguns dos animais resgatados tiveram os tutores posteriormente
          localizados e não fazem parte do número de adoções
        </p>
      </section>
      <section className="history large-margin">
        <h2 className="title-history">Lobo & Loba: onde tudo começou</h2>
        <div className="description-history">
          <img
            className="image2"
            src="../src/images/about-us2.jpg"
            alt="Foto dos dois cães caramelos que foram a inspiração para o início do projeto"
          />
          <div className="description">
            <p>
              Essa dupla foi responsável pela formação do grupo, e o nome
              "Caramelos do Vale" é em homenagem a eles. Há alguns anos, eles
              apareceram no campus do Vale da UFRGS. Ambos são castrados,
              vacinados, e já foram levados ao veterinário algumas vezes.
              Recebem ração diariamente e usam coleiras anti pulgas e
              carrapatos. Embora eles sejam um sucesso na UFRGS, estão
              disponíveis para uma adoção conjunta.
            </p>
          </div>
        </div>
      </section>
      <section className="operation large-margin">
        <h2>Como Atuamos</h2>
        <p>
          Há mais de dois anos estamos lutando para dar um futuro melhor aos
          cães que são vítimas de abandono na região do Campus do Vale da UFRGS
          - que são muitos! Também trabalhamos de forma intensa nas enchentes de
          Porto Alegre de maio/2024, onde fomos muito além da nossa área de
          atuação.
        </p>
        <p>
          Ao todo, já acolhemos e mudamos o futuro de mais de 150 animais.
          Também construímos do zero um espaço de acolhimento para abrigar cães
          provisória ou definitivamente, com todo conforto e cuidado que eles
          merecem.
        </p>
        <p>
          Nossa atuação depende da ajuda de voluntários, parceiros e doadores
          que compartilham da nossa causa. Além de resgates, realizamos eventos
          de adoção e campanhas de arrecadação de ração e medicamentos.
        </p>
        <p>
          Com a ajuda de uma equipe dedicada de voluntários e parceiros,
          trabalhamos sem descanso para garantir que cada animal receba o
          cuidado necessário. Para nós, cada vida importa, e cada adoção é uma
          vitória para todos💛.
        </p>
      </section>
      <section className="join-us large-margin">
        <div>
          <h2>Junte-se a Nós</h2>
          <p>
            Você também pode fazer parte dessa corrente de amor! Seja adotando,
            voluntariando ou fazendo uma doação, toda ajuda é fundamental para
            continuarmos nosso trabalho. Juntos, podemos transformar a realidade
            de muitos animais e fazer do mundo um lugar mais justo e seguro para
            todos.
          </p>
          <picture>
            <img
              className="image3 img-round img-join-us"
              src="../src/images/join-us1.jpg"
              alt="Imagem de um dos cães ajudado pelo projeto"
            />
          </picture>
          <picture>
            <img
              className="image4 img-round img-join-us"
              src="../src/images/join-us2.jpg"
              alt="Imagem de um dos cães ajudado pelo projeto"
            />
          </picture>
          <picture>
            <img
              className="image5 img-round img-join-us"
              src="../src/images/join-us3.jpg"
              alt="Imagem de um dos cães ajudado pelo projeto"
            />
          </picture>
          <picture>
            <img
              className="image6 img-round img-join-us"
              src="../src/images/join-us4.jpg"
              alt="Imagem de um dos cães ajudado pelo projeto"
            />
          </picture>
        </div>
        <picture>
          <img
            className="image7"
            src="../src/images/join-us5.jpg"
            alt="Foto dos nossos queridos voluntários do projeto no espaço que abriga os cães do projeto"
          />
        </picture>
      </section>
    </main>
  );
};

export default AboutUs;
