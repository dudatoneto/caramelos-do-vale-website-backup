import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHeart,
  faHome,
  faHandHoldingDollar,
  faHandshakeAngle,
} from "@fortawesome/free-solid-svg-icons";

const fetchPetsInfo = async () => {
  const supabaseConnection = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const { data, error } = await supabaseConnection
    .from("pets_info")
    .select("*")
    .eq("adopted", false)
    .limit(6);

  if (error) {
    console.error("Error fetching from pets_info table", error);
    return {};
  } else {
    console.log("Successfuly retrieved data");
    return data;
  }
};

const HERO_IMAGES = [
  {
    link: 'https://www.instagram.com/caramelosdovale/',
    src: "home2.png",
    alt: "Foto de animal resgatado e abrigado pelo projeto. Acompanhe os nossos eventos, novidades e muito mais pelas nossas redes sociais.",
  },
  {
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSd2H8sZQE5ytRxgycFujwL8XaOm2dwWag1b4_kT7hytksjvcA/viewform?usp=send_form',
    src: "home3.png",
    alt: "Foto de outro animal resgatado e abrigado pelo projeto. Inscreva-se como voluntário preenchendo o formulário!",
  },
];

const Home = () => {
  const [petsInfo, setPetsInfo] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const getPetsInfo = async () => {
      const data = await fetchPetsInfo();
      setPetsInfo(data);
    };

    getPetsInfo();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <a href={HERO_IMAGES[heroIndex].link} target="_blank" rel="noopener noreferrer">
        <img
          className="home-main-img"
          src={HERO_IMAGES[heroIndex].src}
          alt={HERO_IMAGES[heroIndex].alt}
        />
      </a>
      <main className="home">
        <section className="home-about-us">
          <img
            className="home-about-us-img"
            src="about-us2.jpg"
            alt="Foto dos dois cães caramelos que foram a inspiração para o início do projeto"
          />
          <div className="description-2">
            <h2>Conheça a Associação Caramelos do Vale</h2>
            <p>
              A Associação Caramelos do Vale atua resgatando, tratando e
              encaminhando para adoção animais abandonados no Campus do Vale da
              UFRGS, em Porto Alegre. Somos um grupo de voluntários formado
              majoritariamente por estudantes e servidores da universidade,
              embora atuemos de forma independente à instituição.
            </p>
            <Link to="/about-us" className="button-primary xsmall-margin">
              Veja mais
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </Link>
          </div>
        </section>
        <section className="large-margin">
          <h2>Já abrigamos e cuidamos de:</h2>
          <div className="xsmall-margin">
            <h1 className="home-pets-number">172</h1>
            <h2>animais</h2>
          </div>
        </section>
        <section className="large-margin">
          <h2 className="small-margin">
            E como posso ajudar o projeto Caramelos do Vale?
          </h2>
          <div className="help-types">
            <div>
              <FontAwesomeIcon icon={faHeart} size="4x" className="icon" />
              <p>adoção</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faHome} size="4x" className="icon" />
              <p>lar temporário</p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faHandHoldingDollar}
                size="4x"
                className="icon"
              />
              <p>doação</p>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faHandshakeAngle}
                size="4x"
                className="icon"
              />
              <p>voluntariado</p>
            </div>
          </div>
        </section>
        <section className="large-margin">
          <div className="pet-cards">
            {petsInfo.length ? (
              petsInfo.map((pet) => {
                return (
                  <PetSimpleCard
                    key={pet.pet_id}
                    petName={pet.pet_name}
                    petImgLink={pet.profile_img}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
          <Link to="/for-adoption" className="link button-primary small-margin">
            Veja todos
            <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
          </Link>
        </section>
      </main>
    </>
  );
};

const PetSimpleCard = ({ petName, petImgLink }) => {
  return (
    <div className="card">
      <img src={petImgLink} />
      <h3 className="card-title">
        <b>{petName}</b>
      </h3>
    </div>
  );
};

export default Home;
