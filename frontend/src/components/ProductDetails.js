import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
          <p>${product.price}</p>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ProductDetails;
