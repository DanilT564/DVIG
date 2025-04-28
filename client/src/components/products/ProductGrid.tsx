import React from 'react';
import { Grid, Box, Typography, Pagination, CircularProgress, Alert, Paper } from '@mui/material';
import ProductCard from './ProductCard';
import { Motor } from '../../services/api';

interface ProductGridProps {
  products: Motor[];
  loading: boolean;
  error: any;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Обработчик изменения страницы
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
    // Прокрутка страницы вверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Если загрузка
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Если ошибка
  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ mb: 2 }}
      >
        Произошла ошибка при загрузке товаров. Пожалуйста, попробуйте обновить страницу.
      </Alert>
    );
  }

  // Если нет товаров
  if (products.length === 0) {
    return (
      <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f8f8', borderRadius: 1 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          По вашему запросу ничего не найдено
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Попробуйте изменить параметры фильтрации или поискать что-то другое
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid; 