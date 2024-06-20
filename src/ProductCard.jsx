import React, { useState } from "react";
import "./ProductCard.css";

const ProductCard = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let randomNumber = Math.floor(Math.random() * 194) + 1;
  const fetchProduct = () => {
    setLoading(true);
    fetch("https://dummyjson.com/products/" + randomNumber)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div className="product-container">
      <button className="load-button" onClick={fetchProduct}>
        Load Product
      </button>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error.message}</div>}
      {product && (
        <div className="product-card">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
          />
          <div className="product-info">
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
