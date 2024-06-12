import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

const API_URL = "https://dummyjson.com";

// CustomSlider Component
const CustomSlider = ({ images }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      breakpoints={{
        1024: { slidesPerView: 3 },
        600: { slidesPerView: 2 },
        0: { slidesPerView: 1 },
      }}
      pagination={{ clickable: true }}
      navigation
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: '100%' }}
              image={image}
              alt={`Slide ${index + 1}`}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

// Products Component
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
      setData([]); // Clean up data when the component unmounts
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
                sx={{ width: '50%', height: 'auto', cursor: 'pointer' }}
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
              <Typography variant="h6" color="text.primary" sx={{ mt: 1 }}>
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {id && detailData && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: '80%', backgroundColor: '#fff', padding: 2, borderRadius: '8px' }}>
            <Button onClick={closeDetailModel} sx={{ mb: 2 }}>Close</Button>
            {detailLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
            ) : (
              <Box>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {detailData.title}
                </Typography>
                <CustomSlider images={detailData.images} />
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                  {detailData.description}
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                  ${detailData.price}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Products;
