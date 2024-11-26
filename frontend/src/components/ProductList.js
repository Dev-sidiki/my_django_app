import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    price_min: "",
    price_max: "",
  });

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/products/")
  //     .then((response) => {
  //       // Vérification si les données existent
  //       if (response.data && response.data.products) {
  //         setProducts(response.data.products);
  //       } else {
  //         setError("Aucun produit trouvé.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setError("Une erreur s'est produite lors du chargement des produits.");
  //     });
  // }, []);

  // console.log(products);

  useEffect(() => {
    fetchProducts(); // Charger les produits dès le premier rendu
  }, []);

  // Fonction pour récupérer les produits
  const fetchProducts = () => {
    const { category, price_min, price_max } = filters;

    // Construction de l'URL avec les paramètres des filtres
    let url = "http://127.0.0.1:8000/api/products/";
    const params = [];
    if (category) params.push(`category=${category}`);
    if (price_min) params.push(`price_min=${price_min}`);
    if (price_max) params.push(`price_max=${price_max}`);
    if (params.length > 0) url += `?${params.join("&")}`;

    // Appel à l'API
    axios
      .get(url)
      .then((response) => {
        if (response.data && response.data.products) {
          setProducts(response.data.products); // Mettre à jour les produits
          setError(null); // Réinitialiser les erreurs
        } else {
          setError("Aucun produit trouvé."); // Message si aucun produit n'est trouvé
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Une erreur s'est produite lors du chargement des produits."); // Gestion des erreurs réseau
      });
  };

  // Mise à jour des filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Application des filtres (mise à jour des produits affichés)
  const handleApplyFilters = () => {
    fetchProducts();
  };

  return (
    <div className="product-list">
      <h1>Catalogue</h1>

      {/* Affichage des erreurs */}
      {error && <p className="error">{error}</p>}

      {/* Section des filtres */}
      <div className="filters">
        <input
          type="text"
          name="category"
          placeholder="Catégorie"
          value={filters.category}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="price_min"
          placeholder="Prix Min"
          value={filters.price_min}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="price_max"
          placeholder="Prix Max"
          value={filters.price_max}
          onChange={handleFilterChange}
        />
        <button onClick={handleApplyFilters}>Appliquer</button>
      </div>

      {/* Affichage des produits */}
      <div className="products">
        {products.length > 0
          ? products.map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="product-link"
              >
                <div className="product-card">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  ) : (
                    <div className="placeholder-image">
                      Image non disponible
                    </div>
                  )}
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                </div>
              </Link>
            ))
          : !error && <p>Aucun produit disponible pour le moment.</p>}
      </div>
    </div>
  );
};

export default ProductList;
