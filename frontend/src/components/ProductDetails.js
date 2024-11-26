import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((response) => setProduct(response.data.product))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Prix: {product.price} €</p>
          <p>Catégorie: {product.category}</p>
          <p>Marque: {product.brand}</p>
        </>
      ) : (
        <p>Chargement...</p>
      )}

      <div className="back-button-container">
        <Link to="/products" className="back-button">
          Retour au Catalogue
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
