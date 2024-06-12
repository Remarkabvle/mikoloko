import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Model from '../model/Model'

const API_URL = "https://dummyjson.com";

const NextArrow = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} sx={{ color: 'black', position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}>
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} sx={{ color: 'black', position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let id = searchParams.get("detail");
  let limit = searchParams.get("limit") || 5;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/products`, { params: { limit } })
      .then((res) => {
        setData(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    return () => {
      setData([]); 
    };
  }, [limit]);

  useEffect(() => {
    if (id) {
      setDetailLoading(true);
      axios
        .get(`${API_URL}/products/${id}`)
        .then((res) => setDetailData(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setDetailLoading(false));
    }
  }, [id]);

  const closeDetailModel = useCallback(() => {
    setDetailData(null);
    setSearchParams({});
  }, [setSearchParams]);

  const handleSeeMore = () => {
    const newLimit = +limit + 5;
    setSearchParams({ limit: newLimit });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Products
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSeeMore} sx={{ mr: 2 }}>
          See More
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setSearchParams({})}>
          Reset Query
        </Button>
      </Box>
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>}
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        mt: 2,
        justifyContent: 'center',
        gap: 2,
        '@media (min-width: 600px)': {
          justifyContent: 'flex-start'
        }
      }}>
        {data?.map((product) => (
          <Card sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            width: '100%',
            '@media (min-width: 600px)': {
              width: 'calc(50% - 16px)'
            },
            '@media (min-width: 900px)': {
              width: 'calc(33.33% - 16px)'
            },
            marginBottom: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }} key={product.id}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <CardMedia
                component="img"
                sx={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                image={product.images[0]}
                alt={product.title}
                onClick={() => setSearchParams({ detail: product.id })}
              />
            </Box>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h6" color="text.primary" sx={{ mt: 1 }}>
                  ${product.price}
                </Typography>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Box>

      {id && (
        <Model width={"60%"} close={closeDetailModel}>
          {detailLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
          ) : detailData ? (
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                {detailData.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                {detailData.description}
              </Typography>
              <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                ${detailData.price}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <img src={detailData.images} alt={detailData.title} style={{ width: '100%', height: 'auto', maxWidth: '400px', maxHeight: '400px' }} />
              </Box>
            </Box>
          ) : (
            <Typography>No details available.</Typography>
          )}
        </Model>
      )}
    </Box>
  );
};

export default Products;
