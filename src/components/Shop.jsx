import React, { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

const PHONE_NUMBER = "5551991084114";

const fetchProducts = async () => {
  const supabaseConnection = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const { data, error } = await supabaseConnection.from("products").select("*");

  if (error) {
    console.error("Error fetching from products table", error);
    return {};
  } else {
    console.log("Successfuly retrieved data");
    return data;
  }
};

const filterProducts = (filterState, products) => {
  return products.filter((product) => {
    const anyTypeSelected = Object.values(filterState.type).some(
      (selected) => selected
    );
    const typeFilter =
      !anyTypeSelected ||
      Object.keys(filterState.type).some(
        (type) => filterState.type[type] && product.type === type
      );

    return typeFilter;
  });
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterState, setFilterState] = useState({
    type: {
      camiseta: false,
      ecobag: false,
      adesivo: false,
      bottom: false,
      imã: false,
      cheirinho: false,
      chaveiro: false,
    },
  });
  const [productsArrayReady, setProductsArrayReady] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    setProductsArrayReady(false);

    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProducts(filterState, products);
  }, [filterState, products]);

  // Recalculate totalPages and currentProducts whenever filteredProducts changes
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const total = Math.ceil(filteredProducts.length / productsPerPage);
      setTotalPages(total);

      const indexOfLastItem = currentPage * productsPerPage;
      const indexOfFirstItem = indexOfLastItem - productsPerPage;

      setCurrentProducts(
        filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
      );

      setProductsArrayReady(true);
    } else {
      setTotalPages(0);
      setCurrentProducts([]);
    }
  }, [filteredProducts, currentPage, productsPerPage]);

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
    setProductsPerPage(window.innerWidth <= 1350 ? 8 : 12);
  };

  useEffect(() => {
    // Set productsPerPage initially based on the current screen width
    handleResize();

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!productsArrayReady) {
    return (
      <div className="loading">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <main>
      <section>
        <h1 className="title title-adoption">Lojinha dos Caramelos</h1>
        <p className="description-title">
          Verifique os tamanhos de camisetas disponíveis através do nosso
          WhatsApp
        </p>
      </section>
      <section id="show-products" className="show-products">
        <Filter
          filterState={filterState}
          handleFilterStateChange={handleFilterStateChange}
        />
        <section className="product-pages">
          {currentProducts.length ? (
            <div className="product-cards">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} productInfo={product} />
              ))}
            </div>
          ) : (
            <p>
              Não há produtos disponíveis com os filtros selecionados.
            </p>
          )}
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
            <b>Tipo</b>
          </p>
          <label htmlFor="shirt-desktop">
            <input
              type="checkbox"
              id="shirt-desktop"
              name="type"
              checked={filterState.type.camiseta}
              onChange={() => handleFilterStateChange("type", "camiseta")}
            />
            <span className="checkbox"></span>Camisetas
          </label>
          <label htmlFor="ecobag-desktop">
            <input
              type="checkbox"
              id="ecobag-desktop"
              name="type"
              checked={filterState.type.ecobag}
              onChange={() => handleFilterStateChange("type", "ecobag")}
            />
            <span className="checkbox"></span>Ecobags
          </label>
          <label htmlFor="sticker-desktop">
            <input
              type="checkbox"
              id="sticker-desktop"
              name="type"
              checked={filterState.type.adesivo}
              onChange={() => handleFilterStateChange("type", "adesivo")}
            />
            <span className="checkbox"></span>Adesivos
          </label>
          <label htmlFor="bottom-desktop">
            <input
              type="checkbox"
              id="bottom-desktop"
              name="type"
              checked={filterState.type.bottom}
              onChange={() => handleFilterStateChange("type", "bottom")}
            />
            <span className="checkbox"></span>Bottons
          </label>
          <label htmlFor="magnet-desktop">
            <input
              type="checkbox"
              id="magnet-desktop"
              name="type"
              checked={filterState.type.imã}
              onChange={() => handleFilterStateChange("type", "imã")}
            />
            <span className="checkbox"></span>Imã
          </label>
          <label htmlFor="air_freshener-desktop">
            <input
              type="checkbox"
              id="air_freshener-desktop"
              name="type"
              checked={filterState.type.cheirinho}
              onChange={() => handleFilterStateChange("type", "cheirinho")}
            />
            <span className="checkbox"></span>Cheirinho para carro
          </label>
          <label htmlFor="keychain-desktop">
            <input
              type="checkbox"
              id="keychain-desktop"
              name="type"
              checked={filterState.type.chaveiro}
              onChange={() => handleFilterStateChange("type", "chaveiro")}
            />
            <span className="checkbox"></span>Chaveiros
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
                    <b>Tipo</b>
                  </p>
                  <label htmlFor="shirt-mobile">
                    <input
                      type="checkbox"
                      id="shirt-mobile"
                      name="type"
                      checked={filterState.type.camiseta}
                      onChange={() =>
                        handleFilterStateChange("type", "camiseta")
                      }
                    />
                    <span className="checkbox"></span>Camisetas
                  </label>
                  <label htmlFor="ecobag-mobile">
                    <input
                      type="checkbox"
                      id="ecobag-mobile"
                      name="type"
                      checked={filterState.type.ecobag}
                      onChange={() => handleFilterStateChange("type", "ecobag")}
                    />
                    <span className="checkbox"></span>Ecobags
                  </label>
                  <label htmlFor="sticker-mobile">
                    <input
                      type="checkbox"
                      id="sticker-mobile"
                      name="type"
                      checked={filterState.type.adesivo}
                      onChange={() =>
                        handleFilterStateChange("type", "adesivo")
                      }
                    />
                    <span className="checkbox"></span>Adesivos
                  </label>
                  <label htmlFor="bottom-mobile">
                    <input
                      type="checkbox"
                      id="bottom-mobile"
                      name="type"
                      checked={filterState.type.bottom}
                      onChange={() => handleFilterStateChange("type", "bottom")}
                    />
                    <span className="checkbox"></span>Bottons
                  </label>
                  <label htmlFor="magnet-mobile">
                    <input
                      type="checkbox"
                      id="magnet-mobile"
                      name="type"
                      checked={filterState.type.imã}
                      onChange={() => handleFilterStateChange("type", "imã")}
                    />
                    <span className="checkbox"></span>Imã
                  </label>
                  <label htmlFor="air_freshener-mobile">
                    <input
                      type="checkbox"
                      id="air_freshener-mobile"
                      name="type"
                      checked={filterState.type.cheirinho}
                      onChange={() =>
                        handleFilterStateChange("type", "cheirinho")
                      }
                    />
                    <span className="checkbox"></span>Cheirinho para carro
                  </label>
                  <label htmlFor="keychain-mobile">
                    <input
                      type="checkbox"
                      id="keychain-mobile"
                      name="type"
                      checked={filterState.type.chaveiro}
                      onChange={() =>
                        handleFilterStateChange("type", "chaveiro")
                      }
                    />
                    <span className="checkbox"></span>Chaveiros
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

const ProductCard = ({ productInfo }) => {
  return (
    <div className="card product-card">
      <img src={productInfo.img_link} />
      <div>
        <p>
          <b>{productInfo.name}</b>
        </p>
        <p>{productInfo.type}</p>
        {productInfo.material ? <p>{productInfo.material}</p> : <></>}
        {productInfo.size ? <p>consulte os tamanhos disponíveis</p> : <></>}
        <p>R${productInfo.price}</p>
      </div>
      <a
        className="link button-secondary"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://wa.me/${PHONE_NUMBER}?text=Olá,%20tenho%20interesse%20em%adquirir%20o%20produto%20${productInfo.name}`}
      >
        Encomende por WhatsApp
        <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
      </a>
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
    const targetElement = document.getElementById("show-products");
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
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Próximo
        <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
      </button>
    </section>
  );
};

export default Shop;
