import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((response) => {
        // Vérification si les données existent
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          setError("Aucun produit trouvé.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Une erreur s'est produite lors du chargement des produits.");
      });
  }, []);

  console.log(products);

  return (
    <div className="product-list">
      <h1>Catalogue</h1>

      {/* Affichage du message d'erreur, si nécessaire */}
      {error && <p className="error">{error}</p>}

      {/* Affichage des produits */}
      <div className="products">
        {products.length > 0
          ? products.map((product) => (
              <div className="product-card" key={product.id}>
                {/* Affichage de l'image (URL vérifiée) */}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <div className="placeholder-image">Image non disponible</div>
                )}

                {/* Détails du produit */}
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            ))
          : // Message si aucun produit n'est disponible
            !error && <p>Aucun produit disponible pour le moment.</p>}
      </div>
    </div>
  );
};

export default ProductList;
