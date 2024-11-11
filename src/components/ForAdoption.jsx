import React, { useState, useEffect, useMemo } from "react";
import { Link, useActionData } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

const fetchPetsInfo = async () => {
  const supabaseConnection = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const { data, error } = await supabaseConnection
    .from("pets_info")
    .select("*");

  if (error) {
    console.error("Error fetching from pets_info table", error);
    return {};
  } else {
    console.log("Successfuly retrieved data");
    return data;
  }
};

const petInfoParsing = (petInfo) => {
  petInfo.name = petInfo.pet_name;
  delete petInfo.pet_name;

  petInfo.size = petInfo.size.toUpperCase();

  if (petInfo.gender == "m") {
    petInfo.gender = "Macho";
  } else if (petInfo.gender == "f") {
    petInfo.gender = "Fêmea";
  } else {
    petInfo.gender = "-";
  }

  if (parseInt(petInfo.age) == 1) {
    petInfo.age = petInfo.age + " ano";
  } else if (parseInt(petInfo.age) > 1) {
    petInfo.age = petInfo.age + " anos";
  } else if (parseFloat(petInfo.age) < 1 && parseFloat(petInfo.age) > 0) {
    petInfo.age = (parseFloat(petInfo.age) * 12).toString() + " meses";
  } else {
    petInfo.age = "-";
  }

  petInfo.castrated ? (petInfo.castrated = "sim") : (petInfo.castrated = "não");
  petInfo.dewormed ? (petInfo.dewormed = "sim") : (petInfo.dewormed = "não");
  petInfo.hosted ? (petInfo.hosted = "sim") : (petInfo.hosted = "não");
  petInfo.need_sponsorship
    ? (petInfo.need_sponsorship = "sim")
    : (petInfo.need_sponsorship = "não");
  petInfo.vaccinated
    ? (petInfo.vaccinated = "sim")
    : (petInfo.vaccinated = "não");

  return petInfo;
};

const filterPets = (filterState, pets) => {
  return pets.filter((pet) => {
    // Size Filter
    const anySizeSelected = Object.values(filterState.size).some(
      (selected) => selected
    );
    const sizeFilter =
      !anySizeSelected ||
      Object.keys(filterState.size).some(
        (size) =>
          filterState.size[size] &&
          (pet.size === size || pet.size.includes(size))
      );

    // Gender Filter
    const anyGenderSelected = Object.values(filterState.gender).some(
      (selected) => selected
    );
    const genderFilter = !anyGenderSelected || filterState.gender[pet.gender];

    // Age Filter
    const anyAgeSelected = Object.values(filterState.age).some(
      (selected) => selected
    );
    const ageFilter =
      !anyAgeSelected ||
      Object.keys(filterState.age).some((age) => {
        if (!filterState.age[age]) return false;
        switch (age) {
          case "Filhote":
            return pet.age.includes("meses") || pet.age.includes("mês");
          case "Jovem":
            return (
              parseInt(pet.age) >= 1 &&
              parseInt(pet.age) <= 5 &&
              pet.age.includes("ano")
            );
          case "Adulto":
            return (
              parseInt(pet.age) >= 5 &&
              parseInt(pet.age) <= 10 &&
              pet.age.includes("ano")
            );
          case "Sênior":
            return parseInt(pet.age) >= 10 && pet.age.includes("ano");
          default:
            return false;
        }
      });

    // Sponsorship Filter
    const sponsorshipFilter =
      (!filterState.sponsorship.sim && !filterState.sponsorship.não) || // No filter applied
      (filterState.sponsorship.sim && pet.need_sponsorship == "sim") ||
      (filterState.sponsorship.não && pet.need_sponsorship == "não");

    // Hosting Filter
    const hostingFilter =
      (!filterState.hosting.sim && !filterState.hosting.não) || // No filter applied
      (filterState.hosting.sim && pet.hosted == "não") ||
      (filterState.hosting.não && pet.hosted == "sim");

    // Combine all filters, return true only if all conditions match
    return (
      sizeFilter &&
      genderFilter &&
      ageFilter &&
      sponsorshipFilter &&
      hostingFilter
    );
  });
};

const ForAdoption = () => {
  const [petsInfo, setPetsInfo] = useState([]);
  const [petsPerPage, setPetsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterState, setFilterState] = useState({
    size: { P: false, M: false, G: false },
    gender: { Fêmea: false, Macho: false },
    age: { Filhote: false, Jovem: false, Adulto: false, Sênior: false },
    sponsorship: { sim: false, não: false },
    hosting: { sim: false, não: false },
  });
  const [petsArrayReady, setPetsArrayReady] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPets, setCurrentPets] = useState([]);

  useEffect(() => {
    setPetsArrayReady(false);

    const loadPetsInfo = async () => {
      const data = await fetchPetsInfo();
      setPetsInfo(data);
    };

    loadPetsInfo();
  }, []);

  const parsedPets = useMemo(() => {
    return petsInfo.map((pet) => petInfoParsing(pet));
  }, [petsInfo]);

  const filteredPets = useMemo(() => {
    return filterPets(filterState, parsedPets);
  }, [filterState, parsedPets]);

  // Recalculate totalPages and currentPets whenever filteredPets changes
  useEffect(() => {
    if (filteredPets.length > 0) {
      const total = Math.ceil(filteredPets.length / petsPerPage);
      setTotalPages(total);

      const indexOfLastItem = currentPage * petsPerPage;
      const indexOfFirstItem = indexOfLastItem - petsPerPage;

      setCurrentPets(filteredPets.slice(indexOfFirstItem, indexOfLastItem));
      setPetsArrayReady(true);
    }
  }, [filteredPets, currentPage, petsPerPage]);

  const handleFilterStateChange = (category, value) => {
    setFilterState((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: !prev[category][value],
      },
    }));

    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleResize = () => {
    setPetsPerPage(window.innerWidth <= 1350 ? 8 : 12);
  };

  useEffect(() => {
    // Set petsPerPage initially based on the current screen width
    handleResize();

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!petsArrayReady) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1 className="title title-adoption">
        Conheça nossos amigos disponíveis para adoção e apadrinhamento
      </h1>
      <section id="show-pets-adoption" className="show-pets-adoption">
        <Filter
          filterState={filterState}
          handleFilterStateChange={handleFilterStateChange}
        />
        <section className="pet-pages">
          <div className="pet-cards">
            {currentPets.length ? (
              currentPets.map((pet) => (
                <PetCard key={pet.pet_id} petInfo={pet} />
              ))
            ) : (
              <p>Não há animais disponíveis com os filtros selecionados.</p>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </section>
      </section>
    </main>
  );
};

const Filter = ({ filterState, handleFilterStateChange }) => {
  const [mobileFilter, setMobileFilter] = useState(false);

  const filterToggleHandler = () => {
    setMobileFilter(!mobileFilter);
  };

  return (
    <section>
      <section className="filter-desktop">
        <div>
          <p>
            <b>Porte</b>
          </p>
          <label htmlFor="p-desktop">
            <input
              type="checkbox"
              id="p-desktop"
              name="size"
              checked={filterState.size.p}
              onChange={() => handleFilterStateChange("size", "P")}
            />
            <span className="checkbox"></span>P (até 10kg)
          </label>
          <label htmlFor="m-desktop">
            <input
              type="checkbox"
              id="m-desktop"
              name="size"
              checked={filterState.size.m}
              onChange={() => handleFilterStateChange("size", "M")}
            />
            <span className="checkbox"></span>M (até 25kg)
          </label>
          <label htmlFor="g-desktop">
            <input
              type="checkbox"
              id="g-desktop"
              name="size"
              checked={filterState.size.g}
              onChange={() => handleFilterStateChange("size", "G")}
            />
            <span className="checkbox"></span>G (mais de 25kg)
          </label>
        </div>
        <div>
          <p>
            <b>Sexo</b>
          </p>
          <label htmlFor="female-desktop">
            <input
              type="checkbox"
              id="female-desktop"
              name="gender"
              checked={filterState.gender.f}
              onChange={() => handleFilterStateChange("gender", "Fêmea")}
            />
            <span className="checkbox"></span>Fêmea
          </label>
          <label htmlFor="male-desktop">
            <input
              type="checkbox"
              id="male-desktop"
              name="gender"
              checked={filterState.gender.m}
              onChange={() => handleFilterStateChange("gender", "Macho")}
            />
            <span className="checkbox"></span>Macho
          </label>
        </div>
        <div>
          <p>
            <b>Idade</b>
          </p>
          <label htmlFor="puppy-desktop">
            <input
              type="checkbox"
              id="puppy-desktop"
              name="age"
              checked={filterState.age.puppy}
              onChange={() => handleFilterStateChange("age", "Filhote")}
            />
            <span className="checkbox"></span>Menos de 1 ano
          </label>
          <label htmlFor="young-desktop">
            <input
              type="checkbox"
              id="young-desktop"
              name="age"
              checked={filterState.age.young}
              onChange={() => handleFilterStateChange("age", "Jovem")}
            />
            <span className="checkbox"></span>De 1 a 5 anos
          </label>
          <label htmlFor="adult-desktop">
            <input
              type="checkbox"
              id="adult-desktop"
              name="age"
              checked={filterState.age.adult}
              onChange={() => handleFilterStateChange("age", "Adulto")}
            />
            <span className="checkbox"></span>De 5 a 10 anos
          </label>
          <label htmlFor="senior-desktop">
            <input
              type="checkbox"
              id="senior-desktop"
              name="age"
              checked={filterState.age.senior}
              onChange={() => handleFilterStateChange("age", "Sênior")}
            />
            <span className="checkbox"></span>Mais de 10 anos
          </label>
        </div>
        <div>
          <p>
            <b>Precisando de apadrinhamento?</b>
          </p>
          <label htmlFor="yes_sponsorship-desktop">
            <input
              type="checkbox"
              id="yes_sponsorship-desktop"
              name="sponsorship"
              checked={filterState.sponsorship.yes}
              onChange={() => handleFilterStateChange("sponsorship", "sim")}
            />
            <span className="checkbox"></span>Sim
          </label>
          <label htmlFor="no_sponsorship-desktop">
            <input
              type="checkbox"
              id="no_sponsorship-desktop"
              name="sponsorship"
              checked={filterState.sponsorship.no}
              onChange={() => handleFilterStateChange("sponsorship", "não")}
            />
            <span className="checkbox"></span>Não
          </label>
        </div>
        <div>
          <p>
            <b>Precisando de lar temporário?</b>
          </p>
          <label htmlFor="yes_hosting-desktop">
            <input
              type="checkbox"
              id="yes_hosting-desktop"
              name="hosting"
              checked={filterState.hosting.yes}
              onChange={() => handleFilterStateChange("hosting", "sim")}
            />
            <span className="checkbox"></span>Sim
          </label>
          <label htmlFor="no_hosting-desktop">
            <input
              type="checkbox"
              id="no_hosting-desktop"
              name="hosting"
              checked={filterState.hosting.no}
              onChange={() => handleFilterStateChange("hosting", "não")}
            />
            <span className="checkbox"></span>Não
          </label>
        </div>
      </section>
      <section className="filter-mobile">
        {!mobileFilter ? (
          <button
            className="filter-toggle button-secondary"
            onClick={filterToggleHandler}
          >
            <b>Filtrar por:</b>
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        ) : (
          <div className="filter-mobile-open">
            <button
              className="filter-toggle button-secondary"
              onClick={filterToggleHandler}
            >
              <b>Filtrar por:</b>
              <FontAwesomeIcon icon={faCaretUp} />
            </button>
            <hr></hr>
            <div>
              <div className="filter-left">
                <div>
                  <p>
                    <b>Porte</b>
                  </p>
                  <label htmlFor="p-mobile">
                    <input
                      type="checkbox"
                      id="p-mobile"
                      name="size"
                      checked={filterState.size.p}
                      onChange={() => handleFilterStateChange("size", "P")}
                    />
                    <span className="checkbox"></span>P (até 10kg)
                  </label>
                  <label htmlFor="m-mobile">
                    <input
                      type="checkbox"
                      id="m-mobile"
                      name="size"
                      checked={filterState.size.m}
                      onChange={() => handleFilterStateChange("size", "M")}
                    />
                    <span className="checkbox"></span>M (até 25kg)
                  </label>
                  <label htmlFor="g-mobile">
                    <input
                      type="checkbox"
                      id="g-mobile"
                      name="size"
                      checked={filterState.size.g}
                      onChange={() => handleFilterStateChange("size", "G")}
                    />
                    <span className="checkbox"></span>G (mais de 25kg)
                  </label>
                </div>
                <div>
                  <p>
                    <b>Sexo</b>
                  </p>
                  <label htmlFor="female-mobile">
                    <input
                      type="checkbox"
                      id="female-mobile"
                      name="gender"
                      checked={filterState.gender.f}
                      onChange={() =>
                        handleFilterStateChange("gender", "Fêmea")
                      }
                    />
                    <span className="checkbox"></span>Fêmea
                  </label>
                  <label htmlFor="male-mobile">
                    <input
                      type="checkbox"
                      id="male-mobile"
                      name="gender"
                      checked={filterState.gender.m}
                      onChange={() =>
                        handleFilterStateChange("gender", "Macho")
                      }
                    />
                    <span className="checkbox"></span>Macho
                  </label>
                </div>
                <div>
                  <p>
                    <b>Idade</b>
                  </p>
                  <label htmlFor="puppy-mobile">
                    <input
                      type="checkbox"
                      id="puppy-mobile"
                      name="age"
                      checked={filterState.age.puppy}
                      onChange={() => handleFilterStateChange("age", "Filhote")}
                    />
                    <span className="checkbox"></span>Menos de 1 ano
                  </label>
                  <label htmlFor="young-mobile">
                    <input
                      type="checkbox"
                      id="young-mobile"
                      name="age"
                      checked={filterState.age.young}
                      onChange={() => handleFilterStateChange("age", "Jovem")}
                    />
                    <span className="checkbox"></span>De 1 a 5 anos
                  </label>
                  <label htmlFor="adult-mobile">
                    <input
                      type="checkbox"
                      id="adult-mobile"
                      name="age"
                      checked={filterState.age.adult}
                      onChange={() => handleFilterStateChange("age", "Adulto")}
                    />
                    <span className="checkbox"></span>De 5 a 10 anos
                  </label>
                  <label htmlFor="senior-mobile">
                    <input
                      type="checkbox"
                      id="senior-mobile"
                      name="age"
                      checked={filterState.age.senior}
                      onChange={() => handleFilterStateChange("age", "Sênior")}
                    />
                    <span className="checkbox"></span>Mais de 10 anos
                  </label>
                </div>
              </div>
              <div className="filter-right">
                <div>
                  <p>
                    <b>Precisando de apadrinhamento?</b>
                  </p>
                  <label htmlFor="yes_sponsorship-mobile">
                    <input
                      type="checkbox"
                      id="yes_sponsorship-mobile"
                      name="sponsorship"
                      checked={filterState.sponsorship.yes}
                      onChange={() =>
                        handleFilterStateChange("sponsorship", "sim")
                      }
                    />
                    <span className="checkbox"></span>Sim
                  </label>
                  <label htmlFor="no_sponsorship-mobile">
                    <input
                      type="checkbox"
                      id="no_sponsorship-mobile"
                      name="sponsorship"
                      checked={filterState.sponsorship.no}
                      onChange={() =>
                        handleFilterStateChange("sponsorship", "não")
                      }
                    />
                    <span className="checkbox"></span>Não
                  </label>
                </div>
                <div>
                  <p>
                    <b>Precisando de lar temporário?</b>
                  </p>
                  <label htmlFor="yes_hosting-mobile">
                    <input
                      type="checkbox"
                      id="yes_hosting-mobile"
                      name="hosting"
                      checked={filterState.hosting.yes}
                      onChange={() => handleFilterStateChange("hosting", "sim")}
                    />
                    <span className="checkbox"></span>Sim
                  </label>
                  <label htmlFor="no_hosting-mobile">
                    <input
                      type="checkbox"
                      id="no_hosting-mobile"
                      name="hosting"
                      checked={filterState.hosting.no}
                      onChange={() => handleFilterStateChange("hosting", "não")}
                    />
                    <span className="checkbox"></span>Não
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

const PetCard = ({ petInfo }) => {
  return (
    <div className="card">
      <img src={petInfo.profile_img} />
      <p>
        <b>{petInfo.name}</b>
      </p>
      <p>{petInfo.gender}</p>
      <p>Porte {petInfo.size}</p>
      <p>{petInfo.age}</p>
      <Link to="/" className="link button-secondary">
        Vem me conhecer
        <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
      </Link>
    </div>
  );
};

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const maxPagesToShow = 4;
  let pagination = [];

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const targetElement = document.getElementById("show-pets-adoption");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  // show all pages if total pages are less than maxPagesToShow
  if (totalPages <= maxPagesToShow) {
    for (let page = 1; page <= totalPages; page++) {
      pagination.push(
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={currentPage === page ? "button-active" : "button-inactive"}
        >
          {page}
        </button>
      );
    }
  } else if (
    currentPage > Math.floor(maxPagesToShow / 2) &&
    currentPage < totalPages - Math.floor(maxPagesToShow / 2) + 1
  ) {
    for (let page = 1; page <= Math.floor(maxPagesToShow / 2); page++) {
      pagination.push(
        <button
          key={page}
          onClick={() => goToPage(page)}
          className="button-inactive"
        >
          {page}
        </button>
      );
    }

    pagination.push(
      currentPage === Math.ceil(maxPagesToShow / 2) ||
        currentPage === maxPagesToShow / 2 + 1 ? (
        <button
          key={currentPage}
          onClick={() => goToPage(currentPage)}
          className="button-active"
        >
          {currentPage}
        </button>
      ) : (
        <React.Fragment key="unique-key-1">
          <p key="ellipsis-start" className="ellipsis">
            ...
          </p>
          <button
            key={currentPage}
            onClick={() => goToPage(currentPage)}
            className="button-active"
          >
            {currentPage}
          </button>
        </React.Fragment>
      ),

      currentPage + Math.floor(maxPagesToShow / 2) == totalPages ? (
        <React.Fragment key="unique-key-2"> </React.Fragment>
      ) : (
        <p key="ellipsis-end" className="ellipsis">
          ...
        </p>
      )
    );
    for (
      let page = totalPages - Math.floor(maxPagesToShow / 2) + 1;
      page <= totalPages;
      page++
    ) {
      pagination.push(
        <button
          key={page}
          onClick={() => goToPage(page)}
          className="button-inactive"
        >
          {page}
        </button>
      );
    }
  } else {
    for (let page = 1; page <= Math.ceil(maxPagesToShow / 2); page++) {
      pagination.push(
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={currentPage === page ? "button-active" : "button-inactive"}
        >
          {page}
        </button>
      );
    }
    pagination.push(
      <p key="ellipsis-start" className="ellipsis">
        ...
      </p>
    );
    for (
      let page = totalPages - Math.floor(maxPagesToShow / 2) + 1;
      page <= totalPages;
      page++
    ) {
      pagination.push(
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={currentPage === page ? "button-active" : "button-inactive"}
        >
          {page}
        </button>
      );
    }
  }

  return (
    <section className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1 || currentPage === 0}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="button-left" />
        Anterior
      </button>
      {pagination}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Próximo
        <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
      </button>
    </section>
  );
};

export default ForAdoption;
