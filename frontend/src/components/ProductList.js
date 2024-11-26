import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Liste des produits
  const [error, setError] = useState(null); // Gestion des erreurs
  const [filters, setFilters] = useState({
    category: "",
    price_min: "",
    price_max: "",
  });

  useEffect(() => {
    fetchProducts(); // Charger les produits dès le chargement de la page
  }, []);

  // Fonction pour récupérer les produits filtrés
  const fetchProducts = async () => {
    const { category, price_min, price_max } = filters;
    let url = "http://127.0.0.1:8000/api/products/";
    const params = [];

    if (category) params.push(`category=${category}`);
    if (price_min) params.push(`min_price=${price_min}`);
    if (price_max) params.push(`max_price=${price_max}`);
    if (params.length > 0) url += `?${params.join("&")}`;

    console.log(url);
    // console.log(params);
    // console.log(params.join("&"));

    try {
      const response = await axios.get(url);
      console.log(response.data.results.products);
      if (response.data && response.data.results.products) {
        console.log(response.data);
        setProducts(response.data.results.products);
        setError(null); // Réinitialiser les erreurs
      } else {
        setProducts([]);
        setError("Aucun produit trouvé.");
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur s'est produite lors du chargement des produits.");
    }
  };

  console.log(products);

  // Mise à jour des filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Application des filtres
  const handleApplyFilters = () => {
    fetchProducts();
  };

  // Réinitialiser les filtres
  const handleResetFilters = () => {
    setFilters({ category: "", price_min: "", price_max: "" });
    fetchProducts(); // Recharger tous les produits
  };

  return (
    <div className="product-list">
      <h1>Catalogue de Produits</h1>

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
          placeholder="Prix minimum"
          value={filters.price_min}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="price_max"
          placeholder="Prix maximum"
          value={filters.price_max}
          onChange={handleFilterChange}
        />
        <button onClick={handleApplyFilters}>Appliquer les Filtres</button>
        <button onClick={handleResetFilters}>Réinitialiser</button>
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
                  <p>Prix: {product.price} €</p>
                </div>
              </Link>
            ))
          : !error && <p>Aucun produit disponible pour le moment.</p>}
      </div>
    </div>
  );
};

export default ProductList;
