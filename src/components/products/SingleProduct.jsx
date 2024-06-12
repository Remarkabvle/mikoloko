import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./products.scss";

const API_URL = "https://dummyjson.com";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="root">
      <img src={product.images} width={100} alt={product.title} className="image" />
      <Typography variant="h2" className="title">{product.title}</Typography>
      <Typography variant="body1" className="description">{product.description}</Typography>
      <Typography variant="body1" className="price">Price: ${product.price}</Typography>
    </div>
  );
};

export default SingleProduct;
