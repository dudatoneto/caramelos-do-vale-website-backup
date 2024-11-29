import React, { useState, useEffect, useMemo } from "react";
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

const Home = () => {
  const [petsInfo, setPetsInfo] = useState([]);

  useEffect(() => {
    const getPetsInfo = async () => {
      const data = await fetchPetsInfo();
      setPetsInfo(data);
    };

    getPetsInfo();
  }, []);

  return (
    <>
      <img
        className="home-main-img"
        src="../src/images/home1.png"
        alt="Foto de um dos animais resgatado e abrigado pelol projeto"
      />
      <main className="home">
        <section className="home-about-us">
          <img
            className="home-about-us-img"
            src="../src/images/about-us2.jpg"
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
        <section className="xlarge-margin">
          <h2>Já abrigamos e cuidamos de:</h2>
          <div className="xsmall-margin">
          <h1 className="home-pets-number">172</h1>
          <h2>animais</h2></div>
        </section>
        <section className="xlarge-margin">
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
      <h3 className="xxsmall-margin">
        <b>{petName}</b>
      </h3>
    </div>
  );
};

export default Home;
