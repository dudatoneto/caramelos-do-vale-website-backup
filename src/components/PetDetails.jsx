import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { petInfoParsing } from "./ForAdoption";

const PHONE_NUMBER = "5551991084114";

const fetchPet = async (petId) => {
  const supabaseConnection = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const { data, error } = await supabaseConnection
    .from("pets_info")
    .select("*")
    .eq("pet_id", petId)
    .single(); // Ensures only one result is returned as an object instead of an array

  if (error) {
    console.error(
      "Error fetching pet " + petId + " from pets_info table",
      error
    );
    return {};
  } else {
    console.log("Successfuly retrieved pet");
    return data;
  }
};

const fetchPetImages = async (petId) => {
  const supabaseConnection = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const { data, error } = await supabaseConnection
    .from("images_links")
    .select("*")
    .eq("pet_id", petId);

  if (error) {
    console.error(
      "Error fetching images links for pet " + petId + " from pets_info table",
      error
    );
    return {};
  } else {
    console.log("Successfuly retrieved images");
    return data;
  }
};

const PetDetails = () => {
  const { id } = useParams();
  const [petInfo, setPetInfo] = useState(null);
  const [petImages, setPetImages] = useState([]);

  useEffect(() => {
    const getPetInfoAndImages = async () => {
      const data = await fetchPet(id);
      if (data) {
        setPetInfo(petInfoParsing(data)); // Apply parsing before setting
      }

      const images = await fetchPetImages(id);
      setPetImages(images);
    };
    getPetInfoAndImages();
  }, []);

  if (!petInfo) {
    return (
      <div className="loading">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <main>
      <section>
        <h1>{petInfo.name}</h1>
        {<img src={petInfo.profile_img} className="img-round pet-img" />}
      </section>
      <section className="pet-info">
        <div className="general-info">
          <p>
            <b>Porte:</b> {petInfo.size}
          </p>
          <p>
            <b>Sexo:</b> {petInfo.gender}
          </p>
          <p>
            <b>Idade aproximada:</b> {petInfo.age}
          </p>
          <p>
            <b>Situação atual:</b>
          </p>
          <div>
            <p className="button-primary button-pet-info">
              {petInfo.castrated === "sim" ? (
                <FontAwesomeIcon icon={faCheck} className="icon-pet-info" />
              ) : (
                <FontAwesomeIcon icon={faXmark} className="icon-pet-info" />
              )}
              Castrado
            </p>
            <p className="button-primary button-pet-info">
              {petInfo.vaccinated === "sim" ? (
                <FontAwesomeIcon icon={faCheck} className="icon-pet-info" />
              ) : (
                <FontAwesomeIcon icon={faXmark} className="icon-pet-info" />
              )}
              Vacinado
            </p>
            <p className="button-primary button-pet-info">
              {petInfo.dewormed === "sim" ? (
                <FontAwesomeIcon icon={faCheck} className="icon-pet-info" />
              ) : (
                <FontAwesomeIcon icon={faXmark} className="icon-pet-info" />
              )}
              Vermifugado
            </p>
            <p className="button-primary button-pet-info">
              {petInfo.hosted === "sim" ? (
                <FontAwesomeIcon icon={faCheck} className="icon-pet-info" />
              ) : (
                <FontAwesomeIcon icon={faXmark} className="icon-pet-info" />
              )}
              Hospedado
            </p>
            <p className="button-primary button-pet-info">
              {!petInfo.need_sponsorship === "não" ? (
                <FontAwesomeIcon icon={faCheck} className="icon-pet-info" />
              ) : (
                <FontAwesomeIcon icon={faXmark} className="icon-pet-info" />
              )}
              Apadrinhado
            </p>
          </div>
        </div>
        <div className="pet-description">
          <p>
            <b>Um pouquinho sobre mim:</b>
          </p>
          <br />
          <p>{petInfo.description}</p>
          <div>
            <a
              className="button-primary button-pet-info"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/${PHONE_NUMBER}?text=Olá,%20tenho%20interesse%20em%20adotar%20${
                petInfo.gender === "Fêmea" ? "a" : "o"
              }%20${petInfo.name}`}
            >
              Mandar mensagem
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </a>
            <a
              className="button-primary button-pet-info"
              target="_blank"
              rel="noopener noreferrer"
              href="https://apoia.se/caramelosdovale"
            >
              Seja meu padrinho no APOIA.se
              <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
            </a>
          </div>
        </div>
      </section>
      <section className="pet-cards">
        {petImages.length ? (
          petImages.map((img) => (
            <img key={img.id} src={img.link} className="pet-photos" />
          ))
        ) : (
          <p>Não há fotos disponíveis para exibir.</p>
        )}
      </section>
    </main>
  );
};

export default PetDetails;
