import React from 'react';
import { Grid, Box, Typography, CircularProgress, Pagination } from '@mui/material';
import ProductCard from './ProductCard';
import { Motor } from '../../services/api';

interface ProductGridProps {
  products: Motor[];
  loading: boolean;
  error: unknown;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
}) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (onPageChange) {
      onPageChange(page);
      // Прокрутка вверх страницы при смене страницы
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="error">
          Произошла ошибка при загрузке товаров
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Пожалуйста, попробуйте обновить страницу
        </Typography>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Товары не найдены
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Попробуйте изменить параметры поиска
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid; 